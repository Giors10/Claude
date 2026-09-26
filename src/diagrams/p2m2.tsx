import React from 'react';
import { AngleArc, ArrowDefs, Dot, Eq, Grid, Label, Svg, axesScales, polar, pts, range, samplePath, type AxesSpec, type Pt } from './kit';

/* Mock 2 · Mathematics 2 diagrams ---------------------------------------- */

function dir(p: Pt, q: Pt): number {
  return (Math.atan2(-(q[1] - p[1]), q[0] - p[0]) * 180) / Math.PI;
}

function between(a: number, b: number): { from: number; to: number; mid: number } {
  let from = a;
  let to = b;
  while (to < from) to += 360;
  if (to - from > 180) {
    [from, to] = [b, a];
    while (to < from) to += 360;
  }
  return { from, to, mid: (from + to) / 2 };
}

function lp(p: Pt) {
  return { x: p[0], y: p[1] };
}

/* Q12: tangent, cyclic quadrilateral and the alternate segment ------------ */
export function P2M2Circle() {
  const O: Pt = [184, 146];
  const R = 112;
  const A = polar(O, R, -90);
  const B = polar(O, R, 14);
  const C = polar(O, R, 104);
  const D = polar(O, R, 174);
  const arc = (v: Pt, p: Pt, q: Pt, r: number, text: string, off: number, cls?: string) => {
    const g = between(dir(v, p), dir(v, q));
    return (
      <g>
        <AngleArc c={v} r={r} from={g.from} to={g.to} className={cls} />
        <Label {...lp(polar(v, r + off, g.mid))} kind={text === 'x' ? 'var' : 'num'} size={text === 'x' ? 16 : 13}>
          {text}
        </Label>
      </g>
    );
  };
  return (
    <Svg w={370} h={290} label="Circle through A, B, C and D with the tangent TS touching the circle at A. The angle between the tangent AS and the chord AB is 52 degrees, angle BCD is 100 degrees, and angle ABD is marked x">
      <circle cx={O[0]} cy={O[1]} r={R} className="d-line" fill="none" />
      <line x1={36} y1={A[1]} x2={334} y2={A[1]} className="d-line" />
      <polygon points={pts([A, B, C, D])} className="d-line" fill="none" />
      <line x1={B[0]} y1={B[1]} x2={D[0]} y2={D[1]} className="d-line d-thin" />
      {arc(A, [334, A[1]], B, 34, '52°', 16)}
      {arc(C, B, D, 26, '100°', 20)}
      {arc(B, A, D, 30, 'x', 14, 'd-line d-accent-stroke')}
      {[A, B, C, D].map((p, i) => (
        <Dot key={i} at={p} r={2.8} />
      ))}
      <Label x={A[0]} y={A[1] + 16} kind="var">
        A
      </Label>
      <Label x={B[0] + 14} y={B[1] + 2} kind="var">
        B
      </Label>
      <Label x={C[0] - 4} y={C[1] - 14} kind="var">
        C
      </Label>
      <Label x={D[0] - 14} y={D[1]} kind="var">
        D
      </Label>
      <Label x={40} y={A[1] - 12} kind="var">
        T
      </Label>
      <Label x={330} y={A[1] - 12} kind="var">
        S
      </Label>
    </Svg>
  );
}

/* Q26: y = a(x + b)^2 + c ---------------------------------------------------- */
export function P2M2Parabola() {
  const spec: AxesSpec = { x: [-2, 5.4], y: [-3.4, 4.2], box: { l: 12, r: 348, t: 10, b: 250 } };
  const { sx, sy } = axesScales(spec);
  const f = (x: number) => -0.5 * (x - 2) ** 2 + 3;
  return (
    <Svg w={360} h={260} label="A parabola opening downwards whose vertex is above the x-axis and to the right of the y-axis; it crosses the y-axis above the origin">
      <ArrowDefs id="p2par-arrow" />
      <line x1={sx(-2)} x2={sx(5.4)} y1={sy(0)} y2={sy(0)} className="d-line d-thin" markerEnd="url(#p2par-arrow)" />
      <line x1={sx(0)} x2={sx(0)} y1={sy(-3.4)} y2={sy(4.2)} className="d-line d-thin" markerEnd="url(#p2par-arrow)" />
      <path d={samplePath(f, -0.8, 4.8, sx, sy, { ymin: -3.4 })} className="d-line d-thick d-accent-stroke" fill="none" />
      <Label x={sx(0) - 10} y={sy(0) + 12} kind="var" size={15}>
        O
      </Label>
      <Label x={sx(5.4) - 4} y={sy(0) + 14} kind="var">
        x
      </Label>
      <Label x={sx(0) + 12} y={sy(4.2) + 6} kind="var">
        y
      </Label>
    </Svg>
  );
}

/* Q27 solution: the W-shaped quartic and three horizontal lines -------------- */
export function P2M2QuarticSolution() {
  const spec: AxesSpec = { x: [-1.4, 3.4], y: [-1.9, 4.6], box: { l: 12, r: 318, t: 10, b: 258 } };
  const { sx, sy } = axesScales(spec);
  const u = (x: number) => x * x - 2 * x;
  const f = (x: number) => u(x) ** 2 - 2 * u(x);
  const lines: { k: number; tex: string; note: string; cls: string }[] = [
    { k: 3, tex: 'k = 3', note: ': 3 roots', cls: 'd-mark-stroke d-dash' },
    { k: 1.2, tex: '-1 < k < 3', note: ': 4 roots', cls: 'd-accent-stroke' },
    { k: -1, tex: 'k = -1', note: ': 2 roots', cls: 'd-muted-stroke d-dash' },
  ];
  return (
    <Svg w={500} h={268} label="Graph of y = (x² − 2x)² − 2(x² − 2x): a W shape with minima of −1 at x = 1 − √2 and x = 1 + √2 and a local maximum of 3 at x = 1. A horizontal line y = k meets it four times when −1 < k < 3">
      <Grid spec={spec} xs={range(-1, 3, 1)} ys={range(-1, 4, 1)} className="d-grid" />
      <line x1={sx(-1.4)} x2={sx(3.4)} y1={sy(0)} y2={sy(0)} className="d-line d-thin" />
      <line x1={sx(0)} x2={sx(0)} y1={sy(-1.9)} y2={sy(4.6)} className="d-line d-thin" />
      <path d={samplePath(f, -1.4, 3.4, sx, sy, { ymax: 4.6, n: 500 })} className="d-line d-thick" fill="none" />
      {lines.map((l) => (
        <g key={l.k}>
          <line x1={sx(-1.4)} x2={sx(3.4)} y1={sy(l.k)} y2={sy(l.k)} className={'d-line ' + l.cls} />
          <Eq x={sx(3.4) + 8} y={sy(l.k)} anchor="start" tex={l.tex} note={l.note} size={13} />
        </g>
      ))}
      <Dot at={[sx(1), sy(3)]} r={3.2} />
      <Dot at={[sx(1 - Math.SQRT2), sy(-1)]} r={3.2} />
      <Dot at={[sx(1 + Math.SQRT2), sy(-1)]} r={3.2} />
      {[-1, 1, 2, 3].map((v) => (
        <Label key={v} x={sx(v)} y={sy(0) + 12} kind="num" size={11}>
          {v < 0 ? '−' + -v : v}
        </Label>
      ))}
    </Svg>
  );
}
