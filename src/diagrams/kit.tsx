import React from 'react';

/**
 * Small drawing kit shared by every diagram. Colours come from CSS custom
 * properties (see styles/diagrams.css) so diagrams follow the light/dark theme.
 */

export type Pt = [number, number];

/** Linear map from a data interval to an SVG interval. */
export function lin(d0: number, d1: number, r0: number, r1: number) {
  const k = (r1 - r0) / (d1 - d0);
  return (v: number) => r0 + (v - d0) * k;
}

export const pts = (p: Pt[]) => p.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');

/** Sample a function into a polyline path, splitting where it leaves [ymin, ymax] or is undefined. */
export function samplePath(
  f: (x: number) => number,
  x0: number,
  x1: number,
  sx: (v: number) => number,
  sy: (v: number) => number,
  opts: { n?: number; ymin?: number; ymax?: number } = {},
): string {
  const n = opts.n ?? 240;
  const ymin = opts.ymin ?? -Infinity;
  const ymax = opts.ymax ?? Infinity;
  let d = '';
  let pen = false;
  for (let i = 0; i <= n; i++) {
    const x = x0 + ((x1 - x0) * i) / n;
    const y = f(x);
    if (!Number.isFinite(y) || y < ymin || y > ymax) {
      pen = false;
      continue;
    }
    d += `${pen ? 'L' : 'M'}${sx(x).toFixed(2)} ${sy(y).toFixed(2)} `;
    pen = true;
  }
  return d.trim();
}

export function Svg({
  w,
  h,
  label,
  className,
  children,
}: {
  w: number;
  h: number;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={'diagram' + (className ? ' ' + className : '')}
      role="img"
      aria-label={label}
      style={{ maxWidth: w + 'px' }}
    >
      {children}
    </svg>
  );
}

/** Arrowhead marker; give each diagram its own id prefix. */
export function ArrowDefs({ id, cls = 'd-ink-fill' }: { id: string; cls?: string }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" className={cls} />
      </marker>
    </defs>
  );
}

export function Label({
  x,
  y,
  children,
  anchor = 'middle',
  kind = 'text',
  size,
  baseline = 'middle',
  className,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: 'start' | 'middle' | 'end';
  kind?: 'text' | 'var' | 'num' | 'small';
  size?: number;
  baseline?: 'middle' | 'auto' | 'hanging';
  className?: string;
}) {
  const cls = { text: 'd-text', var: 'd-var', num: 'd-num', small: 'd-small' }[kind];
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      dominantBaseline={baseline === 'auto' ? undefined : baseline === 'hanging' ? 'hanging' : 'central'}
      className={cls + (className ? ' ' + className : '')}
      style={size ? { fontSize: size } : undefined}
    >
      {children}
    </text>
  );
}

/**
 * A formula label, typeset like the maths in the text: letters italic
 * (KaTeX_Math), digits and operators upright (KaTeX_Main), "-" as a true
 * minus sign. A caret raises the next character or {group}: "y = x^3",
 * "y = 2^x". An optional plain-text note follows in the body font.
 */
export function Eq({
  x,
  y,
  tex,
  note,
  anchor = 'middle',
  size = 14,
  className,
}: {
  x: number;
  y: number;
  tex: string;
  note?: string;
  anchor?: 'start' | 'middle' | 'end';
  size?: number;
  className?: string;
}) {
  type Run = { s: string; italic: boolean; sup: boolean };
  const runs: Run[] = [];
  const add = (text: string, sup: boolean) => {
    for (const raw of text) {
      const ch = raw === '-' ? '\u2212' : raw;
      const italic = /[A-Za-z\u03b1-\u03c9]/.test(ch);
      const last = runs[runs.length - 1];
      if (last && last.italic === italic && last.sup === sup) last.s += ch;
      else runs.push({ s: ch, italic, sup });
    }
  };
  for (let i = 0; i < tex.length; ) {
    if (tex[i] === '^' && tex[i + 1] === '{') {
      const j = tex.indexOf('}', i + 2);
      add(tex.slice(i + 2, j), true);
      i = j + 1;
    } else if (tex[i] === '^') {
      add(tex[i + 1], true);
      i += 2;
    } else {
      add(tex[i], false);
      i += 1;
    }
  }
  const shift = Math.round(size * 0.42 * 10) / 10;
  const nodes: React.ReactNode[] = [];
  let raised = false;
  runs.forEach((r, i) => {
    const dy = r.sup && !raised ? -shift : !r.sup && raised ? shift : undefined;
    raised = r.sup;
    nodes.push(
      <tspan key={i} dy={dy} className={r.italic ? 'd-var' : 'd-num'} style={{ fontSize: r.sup ? Math.round(size * 0.72) : size }}>
        {r.s}
      </tspan>,
    );
  });
  if (note) {
    nodes.push(
      <tspan key="note" dy={raised ? shift : undefined} className="d-text" style={{ fontSize: Math.round(size * 0.85) }}>
        {note}
      </tspan>,
    );
  }
  return (
    <text x={x} y={y} textAnchor={anchor} dominantBaseline="central" className={className}>
      {nodes}
    </text>
  );
}

/** A small stacked fraction centred on (x, y). */
export function Frac({ x, y, n, d, size = 13, className }: { x: number; y: number; n: string; d: string; size?: number; className?: string }) {
  const w = Math.max(n.length, d.length) * size * 0.56 + 4;
  return (
    <g className={className}>
      <text x={x} y={y - size * 0.62} textAnchor="middle" dominantBaseline="central" className="d-num" style={{ fontSize: size }}>
        {n}
      </text>
      <line x1={x - w / 2} x2={x + w / 2} y1={y} y2={y} className="d-line d-thin" />
      <text x={x} y={y + size * 0.66} textAnchor="middle" dominantBaseline="central" className="d-num" style={{ fontSize: size }}>
        {d}
      </text>
    </g>
  );
}

/** Right-angle marker at corner c between directions towards a and b. */
export function RightAngle({ c, a, b, s = 10 }: { c: Pt; a: Pt; b: Pt; s?: number }) {
  const u = norm([a[0] - c[0], a[1] - c[1]]);
  const v = norm([b[0] - c[0], b[1] - c[1]]);
  const p1: Pt = [c[0] + u[0] * s, c[1] + u[1] * s];
  const p2: Pt = [c[0] + (u[0] + v[0]) * s, c[1] + (u[1] + v[1]) * s];
  const p3: Pt = [c[0] + v[0] * s, c[1] + v[1] * s];
  return <polyline points={pts([p1, p2, p3])} className="d-line d-thin" fill="none" />;
}

function norm([x, y]: Pt): Pt {
  const l = Math.hypot(x, y) || 1;
  return [x / l, y / l];
}

/** Arc for marking an angle; angles in degrees, measured anticlockwise on screen (y up). */
export function AngleArc({ c, r, from, to, className = 'd-line d-thin' }: { c: Pt; r: number; from: number; to: number; className?: string }) {
  const rad = (d: number) => (d * Math.PI) / 180;
  const p = (d: number): Pt => [c[0] + r * Math.cos(rad(d)), c[1] - r * Math.sin(rad(d))];
  const [x0, y0] = p(from);
  const [x1, y1] = p(to);
  const large = Math.abs(to - from) > 180 ? 1 : 0;
  const sweep = to > from ? 0 : 1;
  return <path d={`M${x0.toFixed(2)} ${y0.toFixed(2)} A${r} ${r} 0 ${large} ${sweep} ${x1.toFixed(2)} ${y1.toFixed(2)}`} className={className} fill="none" />;
}

/** Point on a ray from c at angle deg (y up), distance r. */
export function polar(c: Pt, r: number, deg: number): Pt {
  const a = (deg * Math.PI) / 180;
  return [c[0] + r * Math.cos(a), c[1] - r * Math.sin(a)];
}

export function Dot({ at, r = 3, className = 'd-ink-fill' }: { at: Pt; r?: number; className?: string }) {
  return <circle cx={at[0]} cy={at[1]} r={r} className={className} />;
}

/* ---------------------------------------------------------------------- */
/* Graph axes                                                              */
/* ---------------------------------------------------------------------- */

export interface AxesSpec {
  x: [number, number];
  y: [number, number];
  box: { l: number; r: number; t: number; b: number };
}

export function axesScales(a: AxesSpec) {
  return {
    sx: lin(a.x[0], a.x[1], a.box.l, a.box.r),
    sy: lin(a.y[0], a.y[1], a.box.b, a.box.t),
  };
}

/** Grid lines at the given data values. */
export function Grid({
  spec,
  xs,
  ys,
  className = 'd-grid',
}: {
  spec: AxesSpec;
  xs: number[];
  ys: number[];
  className?: string;
}) {
  const { sx, sy } = axesScales(spec);
  return (
    <g className={className}>
      {xs.map((v) => (
        <line key={'x' + v} x1={sx(v)} x2={sx(v)} y1={spec.box.t} y2={spec.box.b} />
      ))}
      {ys.map((v) => (
        <line key={'y' + v} x1={spec.box.l} x2={spec.box.r} y1={sy(v)} y2={sy(v)} />
      ))}
    </g>
  );
}

export function range(a: number, b: number, step: number): number[] {
  const out: number[] = [];
  for (let v = a; v <= b + 1e-9; v += step) out.push(Math.round(v * 1e6) / 1e6);
  return out;
}

/* ---------------------------------------------------------------------- */
/* Circuit symbols                                                         */
/* ---------------------------------------------------------------------- */

type Orient = 'h' | 'v';

export function Wire({ p }: { p: Pt[] }) {
  return <polyline points={pts(p)} className="d-line" fill="none" />;
}

export function Junction({ at }: { at: Pt }) {
  return <circle cx={at[0]} cy={at[1]} r={3.2} className="d-ink-fill" />;
}

export function Resistor({ at, o = 'h', len = 46, wid = 16 }: { at: Pt; o?: Orient; len?: number; wid?: number }) {
  const [x, y] = at;
  const w = o === 'h' ? len : wid;
  const h = o === 'h' ? wid : len;
  return <rect x={x - w / 2} y={y - h / 2} width={w} height={h} className="d-line d-bg-fill" />;
}

export function Thermistor({ at, o = 'h' }: { at: Pt; o?: Orient }) {
  const [x, y] = at;
  const len = 46;
  const wid = 16;
  const w = o === 'h' ? len : wid;
  const h = o === 'h' ? wid : len;
  // Diagonal with a short horizontal "foot" at the bottom-left (UK symbol).
  const d0: Pt = [x - w / 2 - 6, y + h / 2 + 8];
  const d1: Pt = [x + w / 2 + 6, y - h / 2 - 8];
  return (
    <g>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} className="d-line d-bg-fill" />
      <polyline points={pts([[d0[0] - 10, d0[1]], d0, d1])} className="d-line d-thin" fill="none" />
    </g>
  );
}

/** A single cell: long thin plate (positive) and short thick plate (negative). */
export function Cell({ at, o = 'v', gap = 10 }: { at: Pt; o?: Orient; gap?: number }) {
  const [x, y] = at;
  if (o === 'v') {
    return (
      <g>
        <rect x={x - 14} y={y - gap / 2} width={28} height={gap} className="d-bg-fill" />
        <line x1={x - 16} x2={x + 16} y1={y - gap / 2} y2={y - gap / 2} className="d-line" />
        <line x1={x - 8} x2={x + 8} y1={y + gap / 2} y2={y + gap / 2} className="d-line d-thick" />
      </g>
    );
  }
  return (
    <g>
      <rect x={x - gap / 2} y={y - 14} width={gap} height={28} className="d-bg-fill" />
      <line y1={y - 16} y2={y + 16} x1={x - gap / 2} x2={x - gap / 2} className="d-line" />
      <line y1={y - 8} y2={y + 8} x1={x + gap / 2} x2={x + gap / 2} className="d-line d-thick" />
    </g>
  );
}

/** Battery of two cells (vertical). */
export function Battery({ at }: { at: Pt }) {
  const [x, y] = at;
  return (
    <g>
      <rect x={x - 17} y={y - 16} width={34} height={32} className="d-bg-fill" />
      <line x1={x - 16} x2={x + 16} y1={y - 13} y2={y - 13} className="d-line" />
      <line x1={x - 8} x2={x + 8} y1={y - 4} y2={y - 4} className="d-line d-thick" />
      <line x1={x - 16} x2={x + 16} y1={y + 4} y2={y + 4} className="d-line" />
      <line x1={x - 8} x2={x + 8} y1={y + 13} y2={y + 13} className="d-line d-thick" />
      <line x1={x} x2={x} y1={y - 4} y2={y + 4} className="d-line d-dash" />
    </g>
  );
}

export function Meter({ at, letter }: { at: Pt; letter: string }) {
  return (
    <g>
      <circle cx={at[0]} cy={at[1]} r={14} className="d-line d-bg-fill" />
      <Label x={at[0]} y={at[1] + 0.5} kind="text" size={14}>
        {letter}
      </Label>
    </g>
  );
}

/** Open switch drawn along a vertical wire between y-gap. */
export function SwitchV({ at, len = 30 }: { at: Pt; len?: number }) {
  const [x, y] = at;
  const top: Pt = [x, y - len / 2];
  const bot: Pt = [x, y + len / 2];
  return (
    <g>
      <rect x={x - 3} y={top[1] + 3} width={6} height={len - 6} className="d-bg-fill" />
      <circle cx={top[0]} cy={top[1]} r={2.6} className="d-line d-bg-fill" />
      <circle cx={bot[0]} cy={bot[1]} r={2.6} className="d-line d-bg-fill" />
      <line x1={bot[0]} y1={bot[1] - 2} x2={x + 16} y2={top[1] + 2} className="d-line" />
    </g>
  );
}

/** Zig-zag spring between two points (vertical). */
export function SpringV({ x, y0, y1, coils = 7, amp = 9 }: { x: number; y0: number; y1: number; coils?: number; amp?: number }) {
  const lead = 8;
  const a = y0 + lead;
  const b = y1 - lead;
  const n = coils * 2;
  const p: Pt[] = [[x, y0], [x, a]];
  for (let i = 1; i < n; i++) {
    p.push([x + (i % 2 ? amp : -amp), a + ((b - a) * i) / n]);
  }
  p.push([x, b], [x, y1]);
  return <polyline points={pts(p)} className="d-line" fill="none" strokeLinejoin="round" />;
}

/** Dimension arrow with label, drawn between two points. */
export function Dimension({ a, b, label, id, offset = 0, side = 'right' }: { a: Pt; b: Pt; label: React.ReactNode; id: string; offset?: number; side?: 'left' | 'right' | 'above' | 'below' }) {
  const mx = (a[0] + b[0]) / 2;
  const my = (a[1] + b[1]) / 2;
  const lx = side === 'right' ? mx + 8 + offset : side === 'left' ? mx - 8 - offset : mx;
  const ly = side === 'above' ? my - 10 - offset : side === 'below' ? my + 12 + offset : my;
  const anchor = side === 'right' ? 'start' : side === 'left' ? 'end' : 'middle';
  return (
    <g>
      <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} className="d-line d-thin" markerStart={`url(#${id})`} markerEnd={`url(#${id})`} />
      <Label x={lx} y={ly} anchor={anchor} kind="text" size={13}>
        {label}
      </Label>
    </g>
  );
}

/** Filament lamp: a circle with a cross, drawn over the wire. */
export function Lamp({ at, r = 12 }: { at: Pt; r?: number }) {
  const [x, y] = at;
  const d = r * Math.SQRT1_2;
  return (
    <g>
      <circle cx={x} cy={y} r={r} className="d-line d-bg-fill" />
      <line x1={x - d} y1={y - d} x2={x + d} y2={y + d} className="d-line d-thin" />
      <line x1={x - d} y1={y + d} x2={x + d} y2={y - d} className="d-line d-thin" />
    </g>
  );
}

/** Diode: the triangle points the way conventional current can flow; the bar marks the blocking side. */
export function Diode({ at, dir = 'right' }: { at: Pt; dir?: 'up' | 'down' | 'left' | 'right' }) {
  const [x, y] = at;
  const rot = { right: 0, down: 90, left: 180, up: -90 }[dir];
  return (
    <g transform={`rotate(${rot} ${x} ${y})`}>
      <rect x={x - 9} y={y - 11} width={18} height={22} className="d-bg-fill" />
      <polygon points={pts([[x - 8, y - 9], [x - 8, y + 9], [x + 7, y]])} className="d-line d-ink-fill" />
      <line x1={x + 7} x2={x + 7} y1={y - 10} y2={y + 10} className="d-line d-thick" />
    </g>
  );
}

/** A symbol with a subscript, e.g. V₀, set like the maths in the text. */
export function Sub({ x, y, base, sub, anchor = 'middle', size = 15 }: { x: number; y: number; base: string; sub: string; anchor?: 'start' | 'middle' | 'end'; size?: number }) {
  return (
    <text x={x} y={y} textAnchor={anchor} dominantBaseline="central">
      <tspan className="d-var" style={{ fontSize: size }}>
        {base}
      </tspan>
      <tspan className="d-num" dy={size * 0.3} style={{ fontSize: Math.round(size * 0.7) }}>
        {sub}
      </tspan>
    </text>
  );
}
