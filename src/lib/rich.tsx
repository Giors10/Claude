import React, { useLayoutEffect, useRef, useState } from 'react';
import { texToHtml } from './tex';
import { alignedTex, groupInlineOperands, layoutTexLines } from './texLayout';

/**
 * A deliberately small rich-text format for question content:
 *   paragraphs separated by blank lines; $inline$ and $$display$$ maths;
 *   **bold** and *italic*; "- " bullet lists; "1. " numbered lists;
 *   "| a | b |" tables (first row is the header); "> " callouts.
 */

export type InlinePart =
  | { t: 'text'; v: string }
  | { t: 'bold'; v: InlinePart[] }
  | { t: 'em'; v: InlinePart[] }
  | { t: 'math'; v: string }
  | { t: 'dmath'; v: string };

export type Block =
  | { kind: 'p'; parts: InlinePart[] }
  | { kind: 'ul'; items: InlinePart[][] }
  | { kind: 'ol'; items: InlinePart[][]; start: number }
  | { kind: 'table'; head: InlinePart[][]; rows: InlinePart[][][] }
  | { kind: 'callout'; parts: InlinePart[] };

const MATH_RE = /\$\$([\s\S]+?)\$\$|\$((?:\\\$|[^$])+?)\$/g;
const PLACEHOLDER_RE = /\u0000(\d+)\u0000/;

interface MathRef {
  tex: string;
  display: boolean;
}

export function parseInline(src: string): InlinePart[] {
  const maths: MathRef[] = [];
  const protectedSrc = src.replace(MATH_RE, (_m, d: string | undefined, i: string | undefined) => {
    maths.push({ tex: (d ?? i ?? '').trim(), display: d !== undefined });
    return `\u0000${maths.length - 1}\u0000`;
  });
  return parseEmphasis(protectedSrc, maths);
}

function parseEmphasis(s: string, maths: MathRef[]): InlinePart[] {
  const out: InlinePart[] = [];
  const re = /\*\*([\s\S]+?)\*\*|\*([^*\n]+?)\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) {
    if (m.index > last) out.push(...expandMath(s.slice(last, m.index), maths));
    if (m[1] !== undefined) out.push({ t: 'bold', v: parseEmphasis(m[1], maths) });
    else out.push({ t: 'em', v: parseEmphasis(m[2], maths) });
    last = re.lastIndex;
  }
  if (last < s.length) out.push(...expandMath(s.slice(last), maths));
  return out;
}

function expandMath(s: string, maths: MathRef[]): InlinePart[] {
  const out: InlinePart[] = [];
  const pieces = s.split(PLACEHOLDER_RE);
  pieces.forEach((piece, i) => {
    if (i % 2 === 1) {
      const ref = maths[Number(piece)];
      out.push({ t: ref.display ? 'dmath' : 'math', v: ref.tex });
    } else if (piece) {
      out.push({ t: 'text', v: piece.replace(/\s*\n\s*/g, ' ') });
    }
  });
  return out;
}

type LineKind = 'ul' | 'ol' | 'table' | 'callout' | 'text';

function lineKind(line: string): LineKind {
  if (/^- /.test(line)) return 'ul';
  if (/^\d+\.\s/.test(line)) return 'ol';
  if (line.startsWith('|')) return 'table';
  if (line.startsWith('> ')) return 'callout';
  return 'text';
}

function toBlock(kind: LineKind, lines: string[]): Block {
  switch (kind) {
    case 'ul':
      return { kind: 'ul', items: lines.map((l) => parseInline(l.slice(2))) };
    case 'ol':
      return { kind: 'ol', start: parseInt(lines[0], 10), items: lines.map((l) => parseInline(l.replace(/^\d+\.\s+/, ''))) };
    case 'table': {
      const rows = lines
        .filter((l) => !/^\|\s*:?-{2,}/.test(l))
        .map((l) =>
          l
            .replace(/^\||\|$/g, '')
            .split('|')
            .map((c) => parseInline(c.trim())),
        );
      return { kind: 'table', head: rows[0], rows: rows.slice(1) };
    }
    case 'callout':
      return { kind: 'callout', parts: parseInline(lines.map((l) => l.replace(/^>\s?/, '')).join('\n')) };
    case 'text':
      return { kind: 'p', parts: parseInline(lines.join('\n')) };
  }
}

/**
 * Paragraphs are separated by blank lines. Inside a paragraph, runs of list,
 * table or callout lines become their own blocks, so a list may follow its
 * introductory sentence directly. An indented line continues a list item.
 */
export function parseRich(src: string): Block[] {
  const blocks: Block[] = [];
  const chunks = src
    .replace(/\r\n?/g, '\n')
    .trim()
    .split(/\n[ \t]*\n/);
  for (const raw of chunks) {
    const chunk = raw.trim();
    if (!chunk) continue;
    let kind: LineKind | null = null;
    let run: string[] = [];
    for (const line of chunk.split('\n')) {
      const k = lineKind(line);
      if (k === 'text' && /^\s/.test(line) && (kind === 'ul' || kind === 'ol') && run.length) {
        run[run.length - 1] += ' ' + line.trim();
        continue;
      }
      if (k !== kind && run.length) {
        blocks.push(toBlock(kind!, run));
        run = [];
      }
      kind = k;
      run.push(k === 'text' ? line.trim() : line);
    }
    if (run.length && kind) blocks.push(toBlock(kind, run));
  }
  return blocks;
}

/** Every formula in a rich-text string (used by the content tests). */
export function extractMath(src: string): MathRef[] {
  const out: MathRef[] = [];
  src.replace(MATH_RE, (_m, d: string | undefined, i: string | undefined) => {
    out.push({ tex: (d ?? i ?? '').trim(), display: d !== undefined });
    return '';
  });
  return out;
}

/** Short inline formulas never wrap internally ("g = 10 N kg⁻¹" stays on one line); long ones may break after relations. */
const NOWRAP_MAX = 32;

function Math_({ tex, display }: { tex: string; display: boolean }) {
  const short = tex.length <= NOWRAP_MAX;
  const cls = display ? 'md' : short ? 'm nobr' : 'm';
  // A long inline formula may wrap, but only at its relations (see groupInlineOperands).
  const src = display || short ? tex : groupInlineOperands(tex);
  return <span className={cls} dangerouslySetInnerHTML={{ __html: texToHtml(src, display) }} />;
}

/**
 * A display formula that fits its column: when the one-line version is wider
 * than the space available (typically on a phone), it is re-typeset over
 * several lines, breaking at implications first and then at relations.
 */
export function DisplayMath({ tex }: { tex: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [lines, setLines] = useState<string[] | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    let lastAvail = -1;
    let alive = true;
    const compute = () => {
      if (!alive) return;
      const cs = getComputedStyle(el);
      const avail = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) - 8;
      if (avail <= 0 || Math.abs(avail - lastAvail) < 1) return;
      lastAvail = avail;
      const probe = document.createElement('span');
      probe.setAttribute('aria-hidden', 'true');
      probe.style.cssText = 'position:absolute;left:-10000px;top:0;visibility:hidden;white-space:nowrap;pointer-events:none';
      probe.style.fontSize = cs.fontSize;
      document.body.appendChild(probe);
      const widths = new Map<string, number>();
      const fits = (line: string, continuation: boolean) => {
        const src = (continuation ? '\\quad ' : '') + line;
        let w = widths.get(src);
        if (w === undefined) {
          probe.innerHTML = texToHtml('\\displaystyle ' + src, false);
          w = probe.getBoundingClientRect().width;
          widths.set(src, w);
        }
        return w <= avail;
      };
      let next: string[] | null = null;
      try {
        next = layoutTexLines(tex, fits);
      } finally {
        probe.remove();
      }
      setLines((prev) => (prev === next || (prev && next && prev.join('\n') === next.join('\n')) ? prev : next));
    };
    compute();
    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(compute);
    ro?.observe(el);
    // Widths change once the maths fonts have loaded.
    document.fonts?.ready
      .then(() => {
        lastAvail = -1;
        compute();
      })
      .catch(() => undefined);
    return () => {
      alive = false;
      ro?.disconnect();
    };
  }, [tex]);

  const src = lines ? alignedTex(lines) : tex;
  return <span ref={ref} className={'md' + (lines ? ' md-split' : '')} dangerouslySetInnerHTML={{ __html: texToHtml(src, true) }} />;
}

/**
 * Text that touches the end of an inline formula ("$n$th", "$x$-axis",
 * "$20$%", "$x$.") is kept on the same line as it: browsers otherwise allow
 * a line break between a formula and the characters that follow it.
 */
const GLUE_AFTER = /^[\p{L}\p{N}\-–’'%°.,;:!?)\]”"]+/u;

export function Inline({ parts }: { parts: InlinePart[] }) {
  const nodes: React.ReactNode[] = [];
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    switch (p.t) {
      case 'text':
        nodes.push(<React.Fragment key={i}>{p.v}</React.Fragment>);
        break;
      case 'bold':
        nodes.push(
          <strong key={i}>
            <Inline parts={p.v} />
          </strong>,
        );
        break;
      case 'em':
        nodes.push(
          <em key={i}>
            <Inline parts={p.v} />
          </em>,
        );
        break;
      case 'math': {
        const next = parts[i + 1];
        // Only short formulas are glued: a nowrap wrapper would stop KaTeX breaking a long one.
        const glue = next?.t === 'text' && p.v.length <= NOWRAP_MAX ? GLUE_AFTER.exec(next.v) : null;
        if (next?.t === 'text' && glue) {
          nodes.push(
            <span key={i} className="nobr">
              <Math_ tex={p.v} display={false} />
              {glue[0]}
            </span>,
          );
          const rest = next.v.slice(glue[0].length);
          if (rest) nodes.push(<React.Fragment key={i + 1}>{rest}</React.Fragment>);
          i++;
        } else {
          nodes.push(<Math_ key={i} tex={p.v} display={false} />);
        }
        break;
      }
      case 'dmath':
        nodes.push(<DisplayMath key={i} tex={p.v} />);
        break;
    }
  }
  return <>{nodes}</>;
}

const blockCache = new Map<string, Block[]>();

function blocksOf(text: string): Block[] {
  let b = blockCache.get(text);
  if (!b) {
    b = parseRich(text);
    blockCache.set(text, b);
  }
  return b;
}

/** Render a rich-text string as blocks. */
export function Rich({ text, className }: { text: string; className?: string }) {
  const blocks = blocksOf(text);
  return (
    <div className={'rich' + (className ? ' ' + className : '')}>
      {blocks.map((b, i) => {
        switch (b.kind) {
          case 'p':
            return (
              <p key={i}>
                <Inline parts={b.parts} />
              </p>
            );
          case 'callout':
            return (
              <p key={i} className="rich-callout">
                <Inline parts={b.parts} />
              </p>
            );
          case 'ul':
            return (
              <ul key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>
                    <Inline parts={it} />
                  </li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i} start={b.start}>
                {b.items.map((it, j) => (
                  <li key={j}>
                    <Inline parts={it} />
                  </li>
                ))}
              </ol>
            );
          case 'table':
            return (
              <div key={i} className="rich-table-wrap">
                <table className="rich-table">
                  <thead>
                    <tr>
                      {b.head.map((c, j) => (
                        <th key={j} scope="col">
                          <Inline parts={c} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j}>
                        {r.map((c, k) => (
                          <td key={k}>
                            <Inline parts={c} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}

/** Render a short rich-text string inline (options, labels). */
export function RichInline({ text }: { text: string }) {
  return <Inline parts={parseInline(text)} />;
}
