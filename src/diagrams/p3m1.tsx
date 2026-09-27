import React from 'react';
import { AngleArc, ArrowDefs, Dot, Eq, Grid, Label, Svg, axesScales, polar, pts, range, samplePath, type AxesSpec, type Pt } from './kit';

/* Mock 3 · Mathematics 1 diagrams ---------------------------------------- */

function lp(p: Pt) {
  return { x: p[0], y: p[1] };
}

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

/* Q7: six candidate cubic graphs ---------------------------------------------- */
const CUBICS: Record<string, { f: (x: number) => number; label: string }> = {
  'p3-m1-cubic-a': { f: (x) => (x - 1) * (x + 2) ** 2, label: 'Rises from the bottom left to touch the x-axis at −2, falls to a minimum at x = 0, then rises through the x-axis at 1 to the top right' },
  'p3-m1-cubic-b': { f: (x) => (1 - x) ** 2 * (x + 2), label: 'Rises from bottom left, crosses the x-axis at −2, turns at a maximum, touches the x-axis at 1 and rises to the top right' },
  'p3-m1-cubic-c': { f: (x) => (1 - x) * (x + 2), label: 'A parabola opening downwards that crosses the x-axis at −2 and 1' },
  'p3-m1-cubic-d': { f: (x) => (1 + x) * (x - 2) ** 2, label: 'Rises from bottom left, crosses the x-axis at −1, turns at a maximum, touches the x-axis at 2 and rises to the top right' },
  'p3-m1-cubic-e': { f: (x) => (1 - x) * (x - 2) ** 2, label: 'Falls from top left, crosses the x-axis at 1, touches the x-axis at 2 and falls to the bottom right' },
  'p3-m1-cubic-f': { f: (x) => (1 - x) * (x + 2) ** 2, label: 'Falls from top left, touches the x-axis at −2, rises to a maximum at x = 0, crosses the x-axis at 1 and falls to the bottom right' },
};

export function makeCubicOption(id: string) {
  const o = CUBICS[id];
  return function CubicOption() {
    const spec: AxesSpec = { x: [-3.4, 3.4], y: [-7, 7], box: { l: 8, r: 222, t: 6, b: 144 } };
    const { sx, sy } = axesScales(spec);
    return (
      <svg viewBox="0 0 230 152" className="diagram diagram-option" role="img" aria-label={o.label}>
        <defs>
          <clipPath id={`clip-${id}`}>
            <rect x={spec.box.l} y={spec.box.t} width={spec.box.r - spec.box.l} height={spec.box.b - spec.box.t} />
          </clipPath>
        </defs>
        <Grid spec={spec} xs={range(-3, 3, 1)} ys={range(-6, 6, 2)} className="d-grid" />
        <line x1={sx(-3.4)} x2={sx(3.4)} y1={sy(0)} y2={sy(0)} className="d-line d-thin" />
        <line x1={sx(0)} x2={sx(0)} y1={sy(-7)} y2={sy(7)} className="d-line d-thin" />
        <g clipPath={`url(#clip-${id})`}>
          <path d={samplePath(o.f, -3.4, 3.4, sx, sy, { n: 500, ymin: -9, ymax: 9 })} className="d-line d-thick d-accent-stroke" fill="none" />
        </g>
        {[-2, -1, 1, 2].map((v) => (
          <Label key={v} x={sx(v)} y={sy(0) + 10} kind="num" size={10}>
            {v < 0 ? '−' + -v : v}
          </Label>
        ))}
        <Label x={sx(3.4) - 5} y={sy(0) - 8} kind="var" size={11}>
          x
        </Label>
        <Label x={sx(0) + 7} y={sy(7) + 6} kind="var" size={11}>
          y
        </Label>
      </svg>
    );
  };
}

/* Q11: quarterly sales over three years ------------------------------------------ */
const SALES = [30, 45, 60, 25, 35, 50, 65, 30, 35, 55, 70, 40];

export function P3M1Sales() {
  const spec: AxesSpec = { x: [0.4, 12.6], y: [0, 80], box: { l: 58, r: 412, t: 14, b: 214 } };
  const { sx, sy } = axesScales(spec);
  const P: Pt[] = SALES.map((v, i) => [sx(i + 1), sy(v)]);
  return (
    <Svg w={430} h={278} label="Quarterly sales in thousands of pounds. Year 1: 30, 45, 60, 25. Year 2: 35, 50, 65, 30. Year 3: 35, 55, 70, 40">
      <Grid spec={spec} xs={range(1, 12, 1)} ys={range(5, 80, 5)} className="d-grid" />
      <Grid spec={spec} xs={[4.5, 8.5]} ys={range(10, 80, 10)} className="d-grid-major" />
      <line x1={sx(0.4)} x2={sx(12.6)} y1={sy(0)} y2={sy(0)} className="d-line" />
      <line x1={sx(0.4)} x2={sx(0.4)} y1={sy(0)} y2={sy(80)} className="d-line" />
      <polyline points={pts(P)} className="d-line d-thick d-accent-stroke" fill="none" />
      {P.map((p, i) => (
        <Dot key={i} at={p} r={3.2} className="d-accent-fill" />
      ))}
      {SALES.map((_, i) => (
        <Label key={i} x={sx(i + 1)} y={sy(0) + 13} kind="small">
          Q{(i % 4) + 1}
        </Label>
      ))}
      {[1, 2, 3].map((yr) => (
        <Label key={yr} x={sx(4 * yr - 1.5)} y={sy(0) + 31} kind="text" size={13}>
          Year {yr}
        </Label>
      ))}
      {range(0, 80, 10).map((v) => (
        <Label key={v} x={sx(0.4) - 8} y={sy(v)} anchor="end" kind="num" size={12}>
          {v}
        </Label>
      ))}
      <text x={16} y={(sy(0) + sy(80)) / 2} className="d-text" textAnchor="middle" transform={`rotate(-90 16 ${(sy(0) + sy(80)) / 2})`}>
        sales / £ thousand
      </text>
    </Svg>
  );
}

/* Q18: scatter graph of revision time and test score ------------------------------ */
const SCATTER: Pt[] = [
  [1, 34],
  [1.5, 44],
  [2, 38],
  [3, 50],
  [3.5, 43],
  [4, 55],
  [5, 52],
  [5.5, 63],
  [6, 58],
  [7, 68],
  [7.5, 62],
  [8, 73],
  [9, 70],
  [10, 82],
  [11, 84],
];

export function P3M1Scatter() {
  const spec: AxesSpec = { x: [0, 12], y: [0, 100], box: { l: 56, r: 408, t: 14, b: 226 } };
  const { sx, sy } = axesScales(spec);
  return (
    <Svg w={420} h={270} label="Scatter graph of test score against hours of revision for 15 students, from 1 to 11 hours; the points rise from about 35% to about 85% and a straight line of best fit is drawn through them">
      <Grid spec={spec} xs={range(1, 12, 1)} ys={range(10, 100, 10)} className="d-grid" />
      <line x1={sx(0)} x2={sx(12)} y1={sy(0)} y2={sy(0)} className="d-line" />
      <line x1={sx(0)} x2={sx(0)} y1={sy(0)} y2={sy(100)} className="d-line" />
      <line x1={sx(0.5)} y1={sy(31.5)} x2={sx(11.5)} y2={sy(86.5)} className="d-line d-dash d-muted-stroke" />
      {SCATTER.map(([x, y]) => (
        <g key={x} className="d-accent-fill">
          <line x1={sx(x) - 4} y1={sy(y) - 4} x2={sx(x) + 4} y2={sy(y) + 4} className="d-line d-accent-stroke" />
          <line x1={sx(x) - 4} y1={sy(y) + 4} x2={sx(x) + 4} y2={sy(y) - 4} className="d-line d-accent-stroke" />
        </g>
      ))}
      {range(0, 12, 2).map((v) => (
        <Label key={v} x={sx(v)} y={sy(0) + 13} kind="num" size={12}>
          {v}
        </Label>
      ))}
      {range(0, 100, 20).map((v) => (
        <Label key={v} x={sx(0) - 8} y={sy(v)} anchor="end" kind="num" size={12}>
          {v}
        </Label>
      ))}
      <Label x={(sx(0) + sx(12)) / 2} y={sy(0) + 34} kind="text" size={13}>
        hours of revision
      </Label>
      <text x={16} y={(sy(0) + sy(100)) / 2} className="d-text" textAnchor="middle" transform={`rotate(-90 16 ${(sy(0) + sy(100)) / 2})`}>
        test score / %
      </text>
    </Svg>
  );
}

/* Q19: diameter, tangent and a chord extended ---------------------------------- */
export function P3M1Tangent() {
  const O: Pt = [168, 244];
  const R = 88;
  const A: Pt = [O[0] - R, O[1]];
  const B: Pt = [O[0] + R, O[1]];
  const k = Math.tan((50 * Math.PI) / 180);
  const T: Pt = [A[0], A[1] - 2 * R * k];
  // C: second intersection of line BT with the circle
  const d: Pt = [T[0] - B[0], T[1] - B[1]];
  const s = (-2 * ((B[0] - O[0]) * d[0] + (B[1] - O[1]) * d[1])) / (d[0] * d[0] + d[1] * d[1]);
  const C: Pt = [B[0] + s * d[0], B[1] + s * d[1]];
  const g1 = between(dir(T, A), dir(T, B));
  const g2 = between(dir(A, T), dir(A, C));
  return (
    <Svg w={330} h={350} label="Circle with diameter AB. The tangent at A is vertical and meets the line from B through C, extended, at T above A. Angle ATB is 40 degrees and angle TAC is marked x">
      <circle cx={O[0]} cy={O[1]} r={R} className="d-line" fill="none" />
      <line x1={A[0]} y1={T[1] - 16} x2={A[0]} y2={O[1] + 70} className="d-line" />
      <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} className="d-line" />
      <line x1={B[0]} y1={B[1]} x2={T[0]} y2={T[1]} className="d-line" />
      <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} className="d-line" />
      <AngleArc c={T} r={34} from={g1.from} to={g1.to} />
      <Label {...lp(polar(T, 50, g1.mid))} kind="num" size={13}>
        40°
      </Label>
      <AngleArc c={A} r={30} from={g2.from} to={g2.to} className="d-line d-accent-stroke" />
      <Label {...lp(polar(A, 44, g2.mid))} kind="var" size={16}>
        x
      </Label>
      <Dot at={O} r={2.6} />
      {[A, B, C, T].map((p, i) => (
        <Dot key={i} at={p} r={2.8} />
      ))}
      <Label x={O[0]} y={O[1] + 14} kind="var">
        O
      </Label>
      <Label x={A[0] - 14} y={A[1] + 4} kind="var">
        A
      </Label>
      <Label x={B[0] + 14} y={B[1] + 4} kind="var">
        B
      </Label>
      <Label x={C[0] + 8} y={C[1] - 12} kind="var">
        C
      </Label>
      <Label x={T[0] - 14} y={T[1]} kind="var">
        T
      </Label>
    </Svg>
  );
}

/* Q20 solution: Venn diagram --------------------------------------------------- */
export function P3M1VennSolution() {
  return (
    <Svg w={360} h={232} label="Venn diagram for 40 students: 16 study French only, 8 study both, 10 study Spanish only and 6 study neither">
      <rect x={10} y={10} width={340} height={212} rx={10} className="d-line" fill="none" />
      <circle cx={140} cy={130} r={72} className="d-line d-area" />
      <circle cx={222} cy={130} r={72} className="d-line d-area-alt" />
      <Label x={112} y={36} kind="text" size={13}>
        French (24)
      </Label>
      <Label x={252} y={36} kind="text" size={13}>
        Spanish (18)
      </Label>
      <Label x={108} y={132} kind="num" size={18}>
        16
      </Label>
      <Label x={181} y={132} kind="num" size={18}>
        8
      </Label>
      <Label x={254} y={132} kind="num" size={18}>
        10
      </Label>
      <Label x={326} y={206} kind="num" size={16}>
        6
      </Label>
    </Svg>
  );
}

/* Q22: cuboid and its diagonal ---------------------------------------------------- */
export function P3M1Cuboid() {
  // oblique projection: x to the right, depth up-right, height up
  const ox = 70;
  const oy = 236;
  const sc = 38;
  const h = (5 / Math.sqrt(3)) * sc;
  const dep: Pt = [0.62 * sc, -0.5 * sc];
  const P = (x: number, depth: number, up: number): Pt => [ox + x * sc + depth * dep[0], oy + depth * dep[1] - up];
  const A = P(0, 0, 0);
  const B = P(3, 0, 0);
  const C = P(3, 4, 0);
  const D = P(0, 4, 0);
  const E = P(0, 0, h);
  const F = P(3, 0, h);
  const G = P(3, 4, h);
  const H = P(0, 4, h);
  const g = between(dir(A, C), dir(A, G));
  return (
    <Svg w={330} h={270} label="Cuboid ABCDEFGH with base ABCD, AB = 3 cm and BC = 4 cm. The diagonal AG makes an angle of 30 degrees with the base diagonal AC">
      <polyline points={pts([A, B, F, E, A])} className="d-line" fill="none" />
      <polyline points={pts([B, C, G, F])} className="d-line" fill="none" />
      <polyline points={pts([E, H, G])} className="d-line" fill="none" />
      <polyline points={pts([A, D, C])} className="d-line d-thin d-dash" fill="none" />
      <line x1={D[0]} y1={D[1]} x2={H[0]} y2={H[1]} className="d-line d-thin d-dash" />
      <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} className="d-line d-thin d-dash d-mark-stroke" />
      <line x1={A[0]} y1={A[1]} x2={G[0]} y2={G[1]} className="d-line d-thick d-accent-stroke" />
      <AngleArc c={A} r={46} from={g.from} to={g.to} />
      <Label {...lp(polar(A, 60, g.mid))} kind="num" size={13}>
        30°
      </Label>
      {(
        [
          [A, 'A', -12, 10],
          [B, 'B', 10, 12],
          [C, 'C', 14, 4],
          [D, 'D', 9, 12],
          [E, 'E', -14, -2],
          [F, 'F', 4, -16],
          [G, 'G', 12, -8],
          [H, 'H', -12, -8],
        ] as [Pt, string, number, number][]
      ).map(([p, n, dx, dy]) => (
        <Label key={n} x={p[0] + dx} y={p[1] + dy} kind="var" size={15}>
          {n}
        </Label>
      ))}
      <Label x={(A[0] + B[0]) / 2} y={A[1] + 16} kind="text" size={13}>
        3 cm
      </Label>
      <Label x={(B[0] + C[0]) / 2 + 20} y={(B[1] + C[1]) / 2 + 6} kind="text" size={13}>
        4 cm
      </Label>
    </Svg>
  );
}

/* Q24 solution: two reflections make a rotation ------------------------------------ */
export function P3M1TransformSolution() {
  const spec: AxesSpec = { x: [-3.4, 5.4], y: [-3.4, 3.4], box: { l: 10, r: 410, t: 10, b: 318 } };
  const { sx, sy } = axesScales(spec);
  const tri = (p: Pt[]) => pts(p.map(([x, y]) => [sx(x), sy(y)]));
  const orig: Pt[] = [
    [2, 1],
    [4, 1],
    [2, 2],
  ];
  const mid: Pt[] = orig.map(([x, y]) => [2 - x, y]);
  const fin: Pt[] = mid.map(([x, y]) => [y, x]);
  return (
    <Svg w={420} h={328} label="A right-angled triangle is reflected in the line x = 1 and then in the line y = x. The final image is the original turned 90 degrees clockwise about the point (1, 1), where the two mirror lines cross">
      <Grid spec={spec} xs={range(-3, 5, 1)} ys={range(-3, 3, 1)} className="d-grid" />
      <line x1={sx(-3.4)} x2={sx(5.4)} y1={sy(0)} y2={sy(0)} className="d-line d-thin" />
      <line x1={sx(0)} x2={sx(0)} y1={sy(-3.4)} y2={sy(3.4)} className="d-line d-thin" />
      <line x1={sx(1)} x2={sx(1)} y1={sy(-3.4)} y2={sy(3.4)} className="d-line d-dash d-muted-stroke" />
      <line x1={sx(-3.4)} y1={sy(-3.4)} x2={sx(3.4)} y2={sy(3.4)} className="d-line d-dash d-muted-stroke" />
      <polygon points={tri(orig)} className="d-line d-accent-stroke d-area-strong" />
      <polygon points={tri(mid)} className="d-line d-thin d-dash d-area" />
      <polygon points={tri(fin)} className="d-line d-mark-stroke d-area-alt" />
      <Dot at={[sx(1), sy(1)]} r={3.4} />
      <Label x={sx(1) + 8} y={sy(1) + 16} anchor="start" kind="num" size={12}>
        (1, 1)
      </Label>
      <Eq x={sx(1) + 6} y={sy(3.1)} tex="x = 1" anchor="start" size={13} />
      <Eq x={sx(-2.72)} y={sy(-3.05)} tex="y = x" anchor="start" size={13} />
      <Label x={sx(3.7)} y={sy(2.15)} kind="text" size={12}>
        start
      </Label>
      <Label x={sx(-1.7)} y={sy(2.15)} kind="text" size={12}>
        after the first
      </Label>
      <Label x={sx(2.4)} y={sy(-1.9)} kind="text" size={12}>
        final
      </Label>
    </Svg>
  );
}

/* Q26: vectors in a triangle -------------------------------------------------------- */
export function P3M1Vectors() {
  const O: Pt = [44, 226];
  const A: Pt = [344, 226];
  const B: Pt = [150, 36];
  const P: Pt = [O[0] + (A[0] - O[0]) / 3, O[1] + (A[1] - O[1]) / 3];
  const Q: Pt = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
  const R: Pt = [(O[0] + Q[0]) / 2, (O[1] + Q[1]) / 2];
  const mid = (p: Pt, q: Pt): Pt => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  return (
    <Svg w={380} h={256} label="Triangle OAB. P is one third of the way from O to A, Q is the midpoint of AB, and the lines BP and OQ cross at R">
      <ArrowDefs id="p3vec-arrow" cls="d-accent-fill" />
      <polygon points={pts([O, A, B])} className="d-line d-area" />
      <line x1={B[0]} y1={B[1]} x2={P[0]} y2={P[1]} className="d-line d-thin" />
      <line x1={O[0]} y1={O[1]} x2={Q[0]} y2={Q[1]} className="d-line d-thin" />
      <line x1={O[0]} y1={O[1]} x2={mid(O, A)[0] + 20} y2={O[1]} className="d-line d-accent-stroke" markerEnd="url(#p3vec-arrow)" />
      <line x1={O[0]} y1={O[1]} x2={mid(O, B)[0] + 4} y2={mid(O, B)[1] + 7} className="d-line d-accent-stroke" markerEnd="url(#p3vec-arrow)" />
      {[P, Q, R].map((p, i) => (
        <Dot key={i} at={p} r={3} />
      ))}
      <Label x={O[0] - 10} y={O[1] + 12} kind="var">
        O
      </Label>
      <Label x={A[0] + 10} y={A[1] + 10} kind="var">
        A
      </Label>
      <Label x={B[0]} y={B[1] - 14} kind="var">
        B
      </Label>
      <Label x={P[0]} y={P[1] + 16} kind="var">
        P
      </Label>
      <Label x={Q[0] + 14} y={Q[1] - 4} kind="var">
        Q
      </Label>
      <Label x={R[0] + 4} y={R[1] - 14} kind="var">
        R
      </Label>
      <Label x={mid(O, A)[0] - 8} y={O[1] + 16} kind="text" className="d-vec">
        a
      </Label>
      <Label x={mid(O, B)[0] - 16} y={mid(O, B)[1]} kind="text" className="d-vec">
        b
      </Label>
    </Svg>
  );
}

/* Q27: trapezium and its diagonals ----------------------------------------------- */
function TrapeziumBase({ solution }: { solution?: boolean }) {
  const A: Pt = [30, 214];
  const B: Pt = [330, 214];
  const D: Pt = [120, 64];
  const C: Pt = [220, 64];
  // X divides DB and CA in the ratio 1 : 3 (from the short side)
  const X: Pt = [D[0] + (B[0] - D[0]) / 4, D[1] + (B[1] - D[1]) / 4];
  const cen = (p: Pt, q: Pt, r: Pt): Pt => [(p[0] + q[0] + r[0]) / 3, (p[1] + q[1] + r[1]) / 3];
  return (
    <>
      {solution && (
        <>
          <polygon points={pts([D, X, C])} className="d-area-strong" />
          <polygon points={pts([A, X, B])} className="d-area" />
          <polygon points={pts([A, X, D])} className="d-area-alt" />
          <polygon points={pts([B, X, C])} className="d-area-alt" />
        </>
      )}
      <polygon points={pts([A, B, C, D])} className="d-line" fill="none" />
      <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} className="d-line d-thin" />
      <line x1={B[0]} y1={B[1]} x2={D[0]} y2={D[1]} className="d-line d-thin" />
      {/* parallel marks */}
      <path d={`M${(A[0] + B[0]) / 2 - 6} ${A[1] - 5} l7 5 l-7 5`} className="d-line d-thin" fill="none" />
      <path d={`M${(D[0] + C[0]) / 2 - 6} ${D[1] - 5} l7 5 l-7 5`} className="d-line d-thin" fill="none" />
      <Dot at={X} r={2.8} />
      <Label x={A[0] - 8} y={A[1] + 12} kind="var">
        A
      </Label>
      <Label x={B[0] + 8} y={B[1] + 12} kind="var">
        B
      </Label>
      <Label x={C[0] + 10} y={C[1] - 8} kind="var">
        C
      </Label>
      <Label x={D[0] - 10} y={D[1] - 8} kind="var">
        D
      </Label>
      <Label x={X[0]} y={X[1] + 18} kind="var">
        X
      </Label>
      {solution && (
        <>
          <Label {...lp(cen(D, X, C))} kind="num" size={13}>
            4
          </Label>
          <Label {...lp(cen(A, X, B))} kind="num" size={15}>
            36
          </Label>
          <Label {...lp(cen(A, X, D))} kind="num" size={14}>
            12
          </Label>
          <Label {...lp(cen(B, X, C))} kind="num" size={14}>
            12
          </Label>
        </>
      )}
    </>
  );
}

export function P3M1Trapezium() {
  return (
    <Svg w={360} h={236} label="Trapezium ABCD with AB parallel to DC and AB three times as long as DC; the diagonals AC and BD cross at X">
      <TrapeziumBase />
    </Svg>
  );
}

export function P3M1TrapeziumSolution() {
  return (
    <Svg w={360} h={236} label="The four triangles made by the diagonals have areas 4 (DXC), 36 (AXB), and 12 and 12 (AXD and BXC), a total of 64">
      <TrapeziumBase solution />
    </Svg>
  );
}

