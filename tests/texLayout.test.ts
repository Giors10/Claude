import { describe, expect, it } from 'vitest';
import { ALL_QUESTIONS } from '../src/content/paper';
import { LEARN } from '../src/content/learn';
import { extractMath } from '../src/lib/rich';
import { assertTex } from '../src/lib/tex';
import { alignedTex, groupInlineOperands, layoutTexLines, texBreakPieces, trimSpace } from '../src/lib/texLayout';

const t = String.raw;
/** Width stand-in for tests: a line "fits" if its source is at most n characters. */
const fitsChars = (n: number) => (line: string) => line.length <= n;

describe('texBreakPieces', () => {
  it('reassembles to the original source', () => {
    const src = t`x^2 + (5 - 2x)^2 = 25 \;\Rightarrow\; 5x^2 - 20x = 0 \;\Rightarrow\; 5x(x - 4) = 0.`;
    expect(texBreakPieces(src).map((p) => p.text).join('')).toBe(src);
  });

  it('breaks before implications (strong) and relations (weak)', () => {
    const kinds = texBreakPieces(t`a = b \;\Rightarrow\; c = d`).map((p) => p.brk);
    expect(kinds).toEqual(['start', 'weak', 'strong', 'weak']);
  });

  it('never breaks inside braces, \left…\right or environments', () => {
    const src = t`\frac{a = b}{c} + \left( x = y \right) + \begin{aligned} p &= q \end{aligned}`;
    const pieces = texBreakPieces(src);
    // Only the two top-level plus signs are break points.
    expect(pieces.map((p) => p.text)).toEqual([t`\frac{a = b}{c}`, t` + \left( x = y \right)`, t` + \begin{aligned} p &= q \end{aligned}`]);
    expect(pieces.map((p) => p.brk)).toEqual(['start', 'op', 'op']);
  });

  it('treats a minus as binary only after an operand', () => {
    expect(texBreakPieces(t`a - b`).map((p) => p.brk)).toEqual(['start', 'op']);
    expect(texBreakPieces(t`-a = -b`).map((p) => p.brk)).toEqual(['start', 'weak']);
    expect(texBreakPieces(t`x \times -2`).map((p) => p.brk)).toEqual(['start']);
  });

  it('splits a long sum before its plus signs when nothing else fits', () => {
    const src = t`\frac{1}{\sqrt1 + \sqrt2} + \frac{1}{\sqrt2 + \sqrt3} + \frac{1}{\sqrt3 + \sqrt4} + \cdots + \frac{1}{\sqrt{99} + \sqrt{100}}`;
    const lines = layoutTexLines(src, fitsChars(70))!;
    expect(lines.length).toBeGreaterThan(1);
    expect(lines.slice(1).every((l) => l.startsWith('+'))).toBe(true);
  });

  it('treats \quad between items as a list break but not after a relation', () => {
    expect(texBreakPieces(t`V_A = 15,\qquad V_B = 10`).map((p) => p.brk)).toEqual(['start', 'weak', 'strong', 'weak']);
    const pieces = texBreakPieces(t`A \quad\Rightarrow\quad B`);
    expect(pieces.map((p) => p.brk)).toEqual(['start', 'strong']);
    expect(trimSpace(pieces[1].text)).toBe(t`\Rightarrow\quad B`);
  });
});

describe('layoutTexLines', () => {
  it('leaves a formula alone when it fits', () => {
    expect(layoutTexLines('a = b', fitsChars(80))).toBeNull();
  });

  it('breaks at implications first, keeping each equation whole', () => {
    const src = t`x^2 + (5 - 2x)^2 = 25 \;\Rightarrow\; 5x^2 - 20x = 0 \;\Rightarrow\; 5x(x - 4) = 0.`;
    const lines = layoutTexLines(src, fitsChars(40))!;
    expect(lines).toEqual([t`x^2 + (5 - 2x)^2 = 25`, t`\Rightarrow\; 5x^2 - 20x = 0`, t`\Rightarrow\; 5x(x - 4) = 0.`]);
  });

  it('falls back to breaking at = inside a long equation', () => {
    const src = t`F(2) = \Big[t^3 - 2t^2 - 4t\Big]_1^2 = (8 - 8 - 8) - (1 - 2 - 4) = -8 + 5 = -3.`;
    const lines = layoutTexLines(src, fitsChars(40))!;
    expect(lines.length).toBeGreaterThan(1);
    expect(lines.slice(1).every((l) => l.startsWith('='))).toBe(true);
    expect(lines.join(' ').replace(/\s+/g, ' ')).toBe(src.replace(/\s+/g, ' '));
  });

  it('keeps a lone word such as \text{and} with the item after it', () => {
    const src = t`\frac{a}{1 - r} = 12 \qquad \text{and} \qquad \frac{a^2}{1 - r^2} = 48.`;
    const lines = layoutTexLines(src, fitsChars(46))!;
    expect(lines).toHaveLength(2);
    expect(lines[1].startsWith(t`\text{and}`)).toBe(true);
  });

  it('returns null when there is nowhere to break', () => {
    expect(layoutTexLines(t`\frac{\text{a very long numerator indeed}}{\text{and a long denominator}}`, fitsChars(10))).toBeNull();
  });
});

describe('every display formula in the content can be re-typeset safely', () => {
  it('produces valid KaTeX when split at every break point', () => {
    const fields: string[] = [];
    for (const q of ALL_QUESTIONS) fields.push(q.stem, q.solution, q.insight, ...q.hints, ...Object.values(q.traps));
    for (const tp of LEARN) fields.push(...tp.sections.map((s) => s.body), tp.example.solution);
    let tried = 0;
    for (const f of fields) {
      for (const m of extractMath(f)) {
        if (!m.display) continue;
        // Worst case: every piece on its own line.
        const lines = layoutTexLines(m.tex, () => false);
        if (!lines) continue;
        tried++;
        try {
          assertTex(alignedTex(lines), true);
        } catch (e) {
          throw new Error(`${(e as Error).message}\n  from: ${m.tex}\n  lines: ${lines.join(' | ')}`);
        }
      }
    }
    expect(tried).toBeGreaterThan(40);
  });
});

describe('groupInlineOperands', () => {
  it('groups each side of a relation so breaks happen only at relations', () => {
    expect(groupInlineOperands(t`x^3 - (3x - 2) = (x - 1)^2(x + 2) \ge 0`)).toBe(t`{x^3 - (3x - 2)} = {(x - 1)^2(x + 2)} \ge {0}`);
    expect(groupInlineOperands(t`a \;\Rightarrow\; b = c`)).toBe(t`{a} \;\Rightarrow\; {b} = {c}`);
  });

  it('leaves formulas without relations, and very long sides, unchanged', () => {
    expect(groupInlineOperands(t`(x - 1)(x + 2)`)).toBe(t`(x - 1)(x + 2)`);
    const long = t`a = 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 + 11 + 12 + 13 + 14`;
    expect(groupInlineOperands(long, 20)).toBe(t`{a} = 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 + 11 + 12 + 13 + 14`);
  });

  it('produces valid KaTeX for every inline formula in the content', () => {
    const fields: string[] = [];
    for (const q of ALL_QUESTIONS) {
      fields.push(q.stem, q.solution, q.insight, ...q.hints, ...Object.values(q.traps));
      if (q.prompt) fields.push(q.prompt);
      for (const o of q.options) if (typeof o === 'string') fields.push(o);
    }
    for (const tp of LEARN) fields.push(...tp.sections.map((s) => s.body), tp.example.question, tp.example.solution, ...tp.traps, ...tp.tips);
    let changed = 0;
    for (const f of fields) {
      for (const m of extractMath(f)) {
        if (m.display) continue;
        const g = groupInlineOperands(m.tex);
        if (g === m.tex) continue;
        changed++;
        try {
          assertTex(g, false);
        } catch (e) {
          throw new Error(`${(e as Error).message}\n  from: ${m.tex}\n  grouped: ${g}`);
        }
      }
    }
    expect(changed).toBeGreaterThan(100);
  });
});
