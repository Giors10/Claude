/**
 * Line breaking for display formulas on narrow screens.
 *
 * KaTeX cannot wrap display maths, so a long chain such as
 * "a = b ⇒ c = d ⇒ e" would overflow a phone screen. These pure functions
 * find safe break points (outside every group, \left…\right pair and
 * environment) and pack the pieces into lines that fit, preferring to break
 * at implications and list separators and only then at relations.
 */

export interface TexPiece {
  /** Exact source text; concatenating every piece gives back the input. */
  text: string;
  /**
   * Break kind before this piece: 'strong' (⇒ or a \quad list separator),
   * 'weak' (=, <, ≈, …) or 'op' (a binary + or − in a long sum).
   */
  brk: 'start' | 'strong' | 'weak' | 'op';
}

const STRONG_CMDS = new Set(['Rightarrow', 'Longrightarrow', 'implies', 'iff', 'Leftrightarrow']);
const WEAK_CMDS = new Set(['approx', 'le', 'leq', 'ge', 'geq', 'ne', 'neq', 'equiv', 'lt', 'gt']);
const SPACE_CMDS = new Set([';', ',', ':', '!', ' ', 'quad', 'qquad']);

/** Split a TeX string at the top-level break points. */
export function texBreakPieces(tex: string): TexPiece[] {
  const breaks: { at: number; brk: 'strong' | 'weak' | 'op' }[] = [];
  // A + or − is binary (a safe break) only after an operand: not at the start, after a relation, or after another operator.
  let afterOperand = false;
  let depth = 0;
  let i = 0;
  // Index where a run of spacing commands started (so a break can sit before the spacing).
  let spaceRun = -1;
  // No list break straight after a relation: "⇒ \quad b" must not leave "⇒" alone on a line.
  let afterRelation = false;
  while (i < tex.length) {
    const ch = tex[i];
    if (ch === '\\') {
      const m = /^\\([A-Za-z]+|.)/.exec(tex.slice(i));
      const name = m ? m[1] : '';
      const len = m ? m[0].length : 1;
      if (name === 'left' || name === 'begin') depth++;
      else if (name === 'right' || name === 'end') depth = Math.max(0, depth - 1);
      if (depth === 0) {
        if (SPACE_CMDS.has(name)) {
          if (spaceRun < 0) spaceRun = i;
          if ((name === 'quad' || name === 'qquad') && i > 0 && !afterRelation) breaks.push({ at: spaceRun, brk: 'strong' });
          i += len;
          continue;
        }
        if (STRONG_CMDS.has(name)) breaks.push({ at: spaceRun >= 0 ? spaceRun : i, brk: 'strong' });
        else if (WEAK_CMDS.has(name)) breaks.push({ at: spaceRun >= 0 ? spaceRun : i, brk: 'weak' });
      }
      afterRelation = depth === 0 && (STRONG_CMDS.has(name) || WEAK_CMDS.has(name));
      afterOperand = !afterRelation && !['times', 'cdot', 'pm', 'mp', 'div'].includes(name);
      spaceRun = -1;
      i += len;
      continue;
    }
    if (ch === '{') depth++;
    else if (ch === '}') depth = Math.max(0, depth - 1);
    else if (depth === 0 && (ch === '=' || ch === '<' || ch === '>') && i > 0) {
      breaks.push({ at: spaceRun >= 0 ? spaceRun : i, brk: 'weak' });
    } else if (depth === 0 && (ch === '+' || ch === '-') && afterOperand) {
      breaks.push({ at: spaceRun >= 0 ? spaceRun : i, brk: 'op' });
    }
    if (!/\s/.test(ch)) {
      spaceRun = -1;
      afterRelation = depth === 0 && (ch === '=' || ch === '<' || ch === '>');
      afterOperand = !afterRelation && !'+-*/(['.includes(ch) && ch !== '{';
    } else if (spaceRun < 0) spaceRun = i;
    i++;
  }

  // Keep one break per position (strong wins), drop breaks at the very start.
  const rank = { op: 0, weak: 1, strong: 2 } as const;
  const byPos = new Map<number, 'strong' | 'weak' | 'op'>();
  for (const b of breaks) {
    if (b.at <= 0) continue;
    const had = byPos.get(b.at);
    if (!had || rank[b.brk] > rank[had]) byPos.set(b.at, b.brk);
  }
  const cuts = [...byPos.entries()].sort((a, b) => a[0] - b[0]);
  const pieces: TexPiece[] = [];
  let last = 0;
  let kind: TexPiece['brk'] = 'start';
  for (const [at, brk] of cuts) {
    if (at <= last) continue;
    pieces.push({ text: tex.slice(last, at), brk: kind });
    last = at;
    kind = brk;
  }
  pieces.push({ text: tex.slice(last), brk: kind });
  // Adjacent separators (e.g. "\qquad" then a relation) can leave a piece that is only spacing: fold it forward.
  const out: TexPiece[] = [];
  for (const p of pieces) {
    const prev = out[out.length - 1];
    if (prev && trimSpace(prev.text) === '' && prev.brk !== 'start') {
      const brk = prev.brk === 'strong' || p.brk === 'strong' ? 'strong' : prev.brk === 'weak' || p.brk === 'weak' ? 'weak' : 'op';
      out[out.length - 1] = { text: prev.text + p.text, brk };
    } else out.push({ ...p });
  }
  return out;
}

const LEAD_SPACE = /^(?:\s|\\[;,:! ]|\\q?quad(?![A-Za-z])|~)+/;
const TRAIL_SPACE = /(?:\s|\\[;,:! ]|\\q?quad(?![A-Za-z])|~)+$/;

export function trimSpace(s: string): string {
  return s.replace(LEAD_SPACE, '').replace(TRAIL_SPACE, '');
}

/**
 * Pack pieces into lines that fit. `fits(tex, continuation)` reports whether
 * a line fits the available width (continuation lines are indented).
 * Returns null when the formula fits on one line or cannot be improved.
 */
export function layoutTexLines(tex: string, fits: (line: string, continuation: boolean) => boolean): string[] | null {
  if (fits(tex, false)) return null;
  const pieces = texBreakPieces(tex);
  if (pieces.length < 2) return null;

  // Strong segments: a segment starts at 'start' or at every strong break.
  const segments: TexPiece[][] = [];
  for (const p of pieces) {
    if (p.brk !== 'strong' && p.brk !== 'start' && segments.length) segments[segments.length - 1].push(p);
    else segments.push([p]);
  }
  // A segment that is only a word such as \text{and} joins the next segment.
  for (let k = 0; k < segments.length - 1; k++) {
    const only = trimSpace(segments[k].map((p) => p.text).join(''));
    if (/^\\text\{[^{}]*\}$/.test(only)) {
      segments[k + 1] = [...segments[k], ...segments[k + 1]];
      segments.splice(k, 1);
      k--;
    }
  }

  const clean = (s: string, cont: boolean) => (cont ? trimSpace(s) : s.replace(TRAIL_SPACE, ''));
  const pack = (units: string[], firstIsContinuation: boolean): string[] => {
    const lines: string[] = [];
    let cur = '';
    for (const u of units) {
      if (!cur) {
        cur = u;
        continue;
      }
      const cont = lines.length > 0 || firstIsContinuation;
      if (fits(clean(cur + u, cont), cont)) cur += u;
      else {
        lines.push(cur);
        cur = u;
      }
    }
    if (cur) lines.push(cur);
    return lines;
  };

  // Pass 1: pack whole strong segments.
  const strongLines = pack(
    segments.map((seg) => seg.map((p) => p.text).join('')),
    false,
  );
  // Pass 2: a line that is still too wide is split at its relations (=, <, ≈);
  // pass 3: a line that is still too wide is split before + and − as well.
  const splitAt = (line: string, cont: boolean, kinds: TexPiece['brk'][]): string[] => {
    const units: string[] = [];
    for (const p of texBreakPieces(line)) {
      if (units.length && !kinds.includes(p.brk)) units[units.length - 1] += p.text;
      else units.push(p.text);
    }
    return pack(units, cont);
  };
  const out: string[] = [];
  strongLines.forEach((line, idx) => {
    const cont = idx > 0;
    if (fits(clean(line, cont), cont)) {
      out.push(line);
      return;
    }
    splitAt(line, cont, ['weak', 'strong']).forEach((sub, j) => {
      const c = cont || j > 0 || out.length > 0;
      if (fits(clean(sub, c), c)) out.push(sub);
      else out.push(...splitAt(sub, c, ['op', 'weak', 'strong']));
    });
  });
  if (out.length < 2) return null;
  return out.map((l, idx) => clean(l, idx > 0));
}

/** Typeset lines as one aligned block: the first line flush, the rest indented. */
export function alignedTex(lines: string[]): string {
  return '\\begin{aligned}' + lines.map((l, i) => (i === 0 ? '&' : '&\\quad ') + l).join('\\\\') + '\\end{aligned}';
}

const RELATION_HEAD = /^((?:\s|\\[;,:! ]|\\q?quad(?![A-Za-z])|~)*)(=|<|>|\\(?:Rightarrow|Longrightarrow|implies|iff|Leftrightarrow|approx|le|leq|ge|geq|ne|neq|equiv|lt|gt)(?![A-Za-z]))/;

/**
 * Inline formulas: KaTeX may break a long inline formula after any top-level
 * operator, even inside brackets ("(x −" / "1)²"). Wrapping each side of a
 * relation in braces leaves line breaks only at relations (=, ≤, ⇒, …), as in
 * printed mathematics. Sides longer than `maxSide` characters stay breakable,
 * so a formula can always fit its line.
 */
export function groupInlineOperands(tex: string, maxSide = 40): string {
  const pieces = texBreakPieces(tex);
  // Merge '+'/'−' pieces back: only relation-level breaks matter here.
  const parts: string[] = [];
  for (const p of pieces) {
    if (parts.length && p.brk === 'op') parts[parts.length - 1] += p.text;
    else parts.push(p.text);
  }
  if (parts.length < 2) return tex;
  return parts
    .map((part, i) => {
      let head = '';
      let body = part;
      if (i > 0) {
        const m = RELATION_HEAD.exec(part);
        if (!m) return part;
        head = m[0];
        body = part.slice(m[0].length);
      }
      const lead = /^(?:\s|\\[;,:! ]|\\q?quad(?![A-Za-z])|~)*/.exec(body)![0];
      const trail = /(?:\s|\\[;,:! ]|\\q?quad(?![A-Za-z])|~)*$/.exec(body.slice(lead.length))![0];
      const core = body.slice(lead.length, body.length - trail.length);
      if (!core || core.length > maxSide || /\\(?:begin|end)\b|&|\\\\/.test(core)) return part;
      return head + lead + '{' + core + '}' + trail;
    })
    .join('');
}
