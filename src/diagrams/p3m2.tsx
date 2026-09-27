import React from 'react';
import { AngleArc, Dot, Eq, Grid, Label, RightAngle, Svg, axesScales, polar, pts, range, samplePath, type AxesSpec, type Pt } from './kit';

/* Mock 3 · Mathematics 2 diagrams ---------------------------------------- */

/* Q11 solution: four points on x^2 + y^2 = 25 ------------------------------------ */
export function P3M2CircleSolution() {
  const spec: AxesSpec = { x: [-6.4, 6.4], y: [-6.4, 6.4], box: { l: 10, r: 330, t: 10, b: 330 } };
  const { sx, sy } = axesScales(spec);
  const P = (x: number, y: number): Pt => [sx(x), sy(y)];
  const O = P(0, 0);
  const A = P(3, 4);
  const B = P(4, -3);
  const Pp = P(-5, 0);
  const Q = P(0, 5);
  return (
    <Svg w={340} h={340} label="Circle x² + y² = 25 with A(3, 4), B(4, −3), P(−5, 0) and Q(0, 5). OA is perpendicular to OB, so angle AOB is 90 degrees; P and Q lie on the major arc, so angles APB and AQB are both 45 degrees">
      <Grid spec={spec} xs={range(-6, 6, 1)} ys={range(-6, 6, 1)} className="d-grid" />
      <line x1={sx(-6.4)} x2={sx(6.4)} y1={sy(0)} y2={sy(0)} className="d-line d-thin" />
      <line x1={sx(0)} x2={sx(0)} y1={sy(-6.4)} y2={sy(6.4)} className="d-line d-thin" />
      <circle cx={O[0]} cy={O[1]} r={sx(5) - sx(0)} className="d-line" fill="none" />
      <polyline points={pts([A, O, B])} className="d-line d-mark-stroke" fill="none" />
      <polyline points={pts([A, Pp, B])} className="d-line d-accent-stroke" fill="none" />
      <polyline points={pts([A, Q, B])} className="d-line d-thin d-accent-stroke d-dash" fill="none" />
      <AngleArc c={O} r={15} from={-36.87} to={53.13} className="d-line d-thin d-mark-stroke" />
      <AngleArc c={Pp} r={30} from={-18.43} to={26.57} className="d-line d-thin d-accent-stroke" />
      {[A, B, Pp, Q, O].map((p, i) => (
        <Dot key={i} at={p} r={3} />
      ))}
      <Label x={A[0] + 12} y={A[1] - 8} kind="var">
        A
      </Label>
      <Label x={B[0] + 12} y={B[1] + 8} kind="var">
        B
      </Label>
      <Label x={Pp[0] - 12} y={Pp[1] - 10} kind="var">
        P
      </Label>
      <Label x={Q[0] - 12} y={Q[1] - 10} kind="var">
        Q
      </Label>
      <Label x={O[0] - 10} y={O[1] + 12} kind="var">
        O
      </Label>
      <Label x={O[0] + 26} y={O[1] + 2} kind="num" size={12} className="d-accent-text">
        90°
      </Label>
      <Label x={Pp[0] + 42} y={Pp[1] + 1} kind="num" size={12}>
        45°
      </Label>
    </Svg>
  );
}

/* Q17 solution: y = |2x − 3| and lines y = x + k ------------------------------------ */
export function P3M2AbsSolution() {
  const spec: AxesSpec = { x: [-2.4, 5.4], y: [-2.6, 5.6], box: { l: 12, r: 322, t: 10, b: 330 } };
  const { sx, sy } = axesScales(spec);
  const lines: { k: number; tex: string; note: string; cls: string }[] = [
    { k: 1, tex: 'k > -3/2', note: ': 2 solutions', cls: 'd-accent-stroke' },
    { k: -1.5, tex: 'k = -3/2', note: ': 1 solution', cls: 'd-mark-stroke d-dash' },
    { k: -2.4, tex: 'k < -3/2', note: ': none', cls: 'd-muted-stroke d-dash' },
  ];
  return (
    <Svg w={500} h={340} label="The V-shaped graph y = |2x − 3| with its vertex at (1.5, 0) and three lines of gradient 1: a line above the vertex meets the V twice, the line through the vertex meets it once, and a line below the vertex misses it">
      <Grid spec={spec} xs={range(-2, 5, 1)} ys={range(-2, 5, 1)} className="d-grid" />
      <line x1={sx(-2.4)} x2={sx(5.4)} y1={sy(0)} y2={sy(0)} className="d-line d-thin" />
      <line x1={sx(0)} x2={sx(0)} y1={sy(-2.6)} y2={sy(5.6)} className="d-line d-thin" />
      <path d={samplePath((x) => Math.abs(2 * x - 3), -1.2, 4.3, sx, sy, { ymax: 5.6, n: 400 })} className="d-line d-thick" fill="none" />
      {lines.map((l) => (
        <g key={l.k}>
          <path d={samplePath((x) => x + l.k, -2.4, 5.4, sx, sy, { ymin: -2.6, ymax: 5.6 })} className={'d-line ' + l.cls} fill="none" />
          <Eq x={sx(5.4) + 8} y={sy(Math.min(5.4 + l.k, 5.3))} anchor="start" tex={l.tex} note={l.note} size={13} />
        </g>
      ))}
      <Dot at={[sx(1.5), sy(0)]} r={3.4} />
      <Label x={sx(1.5) - 15} y={sy(0) - 10} anchor="end" kind="num" size={12}>
        (1.5, 0)
      </Label>
    </Svg>
  );
}

/* Q22: y = f(x) and six candidate transformations ------------------------------------ */
const F_POINTS: Pt[] = [
  [-2, 0],
  [0, 2],
  [2, 0],
  [3, -1],
];

const TF: Record<string, { map: (p: Pt) => Pt; label: string }> = {
  'p3-m2-tf-a': { map: ([x, y]) => [x + 1, 2 * y - 1], label: 'Joins (−1, −1), (1, 3), (3, −1) and (4, −3)' },
  'p3-m2-tf-b': { map: ([x, y]) => [x - 1, 2 * y - 2], label: 'Joins (−3, −2), (−1, 2), (1, −2) and (2, −4)' },
  'p3-m2-tf-c': { map: ([x, y]) => [x, 2 * y - 1], label: 'Joins (−2, −1), (0, 3), (2, −1) and (3, −3)' },
  'p3-m2-tf-d': { map: ([x, y]) => [x - 1, y / 2 - 1], label: 'Joins (−3, −1), (−1, 0), (1, −1) and (2, −1.5)' },
  'p3-m2-tf-e': { map: ([x, y]) => [x - 1, 2 * y + 1], label: 'Joins (−3, 1), (−1, 5), (1, 1) and (2, −1)' },
  'p3-m2-tf-f': { map: ([x, y]) => [x - 1, 2 * y - 1], label: 'Joins (−3, −1), (−1, 3), (1, −1) and (2, −3)' },
};

const LABEL_AT: [number, number, 'start' | 'middle' | 'end'][] = [
  [0, 15, 'middle'],
  [8, -11, 'start'],
  [7, -11, 'start'],
  [10, 0, 'start'],
];

function PolyGraph({ id, points, w, h, labels }: { id: string; points: Pt[]; w: number; h: number; labels?: boolean }) {
  const spec: AxesSpec = { x: [-4.4, 5.4], y: [-4.6, 5.6], box: { l: 8, r: w - 8, t: 6, b: h - 6 } };
  const { sx, sy } = axesScales(spec);
  return (
    <>
      <Grid spec={spec} xs={range(-4, 5, 1)} ys={range(-4, 5, 1)} className="d-grid" />
      <line x1={sx(-4.4)} x2={sx(5.4)} y1={sy(0)} y2={sy(0)} className="d-line d-thin" />
      <line x1={sx(0)} x2={sx(0)} y1={sy(-4.6)} y2={sy(5.6)} className="d-line d-thin" />
      <polyline points={pts(points.map(([x, y]) => [sx(x), sy(y)]))} className="d-line d-thick d-accent-stroke" fill="none" />
      {points.map(([x, y]) => (
        <Dot key={`${id}${x},${y}`} at={[sx(x), sy(y)]} r={labels ? 3.4 : 2.6} className="d-accent-fill" />
      ))}
      {labels &&
        points.map(([x, y], i) => {
          // below (−2, 0); above and to the right of (0, 2) and (2, 0); to the right of (3, −1)
          const [dx, dy, anchor] = LABEL_AT[i];
          return (
            <Label key={i} x={sx(x) + dx} y={sy(y) + dy} anchor={anchor} kind="num" size={13}>
              ({x < 0 ? '−' + -x : x}, {y < 0 ? '−' + -y : y})
            </Label>
          );
        })}
      {(labels ? [-4, 4] : [-4, -2, 2, 4]).map((v) => (
        <Label key={v} x={sx(v)} y={sy(0) + (labels ? 13 : 9)} kind="num" size={labels ? 12 : 9}>
          {v < 0 ? '−' + -v : v}
        </Label>
      ))}
      {(labels ? [-4, -2, 4] : [-4, -2, 2, 4]).map((v) => (
        <Label key={'y' + v} x={sx(0) - (labels ? 8 : 6)} y={sy(v)} anchor="end" kind="num" size={labels ? 12 : 9}>
          {v < 0 ? '−' + -v : v}
        </Label>
      ))}
    </>
  );
}

export function P3M2F() {
  return (
    <Svg w={380} h={300} label="The graph of y = f(x): straight-line segments joining (−2, 0), (0, 2), (2, 0) and (3, −1)">
      <PolyGraph id="p3m2f" points={F_POINTS} w={380} h={300} labels />
    </Svg>
  );
}

export function makeTransformOption(id: string) {
  const o = TF[id];
  return function TransformOption() {
    return (
      <svg viewBox="0 0 230 180" className="diagram diagram-option" role="img" aria-label={o.label}>
        <PolyGraph id={id} points={F_POINTS.map(o.map)} w={230} h={180} />
      </svg>
    );
  };
}


/* Q15 solution: the points P with PA = 2PB form a circle ----------------------------- */
export function P3M2ApolloniusSolution() {
  const spec: AxesSpec = { x: [-1, 7], y: [-3, 3], box: { l: 10, r: 410, t: 8, b: 308 } };
  const { sx, sy } = axesScales(spec);
  const P = (x: number, y: number): Pt => [sx(x), sy(y)];
  const A = P(0, 0);
  const B = P(3, 0);
  const C = P(4, 0);
  const Q = P(4, 2);
  const R = P(4 + Math.SQRT2, Math.SQRT2);
  return (
    <Svg w={420} h={316} label="A is the origin and B is (3, 0). The points P with PA = 2PB form the circle with centre (4, 0) and radius 2. For example, P(4, 2) has PA = 2√5 and PB = √5">
      <Grid spec={spec} xs={range(-1, 7, 1)} ys={range(-3, 3, 1)} className="d-grid" />
      <line x1={sx(-1)} x2={sx(7)} y1={sy(0)} y2={sy(0)} className="d-line d-thin" />
      <line x1={sx(0)} x2={sx(0)} y1={sy(-3)} y2={sy(3)} className="d-line d-thin" />
      <circle cx={C[0]} cy={C[1]} r={sx(2) - sx(0)} className="d-line d-thick d-accent-stroke" fill="none" />
      <polyline points={pts([A, Q, B])} className="d-line d-mark-stroke" fill="none" />
      <line x1={C[0]} y1={C[1]} x2={R[0]} y2={R[1]} className="d-line d-thin d-dash" />
      <Dot at={A} r={3.4} />
      <Dot at={B} r={3.4} />
      <Dot at={C} r={2.6} />
      <Dot at={Q} r={3.4} className="d-accent-fill" />
      <Label x={A[0] - 12} y={A[1] + 14} kind="var">
        A
      </Label>
      <Label x={B[0] - 4} y={B[1] + 16} kind="var">
        B
      </Label>
      <Label x={C[0] + 6} y={C[1] + 16} kind="num" size={12}>
        (4, 0)
      </Label>
      <Label x={Q[0] + 10} y={Q[1] - 12} anchor="start" kind="num" size={13}>
        P(4, 2)
      </Label>
      <Eq x={sx(1.55)} y={sy(1.45)} tex="2√5" size={13} anchor="end" />
      <Eq x={sx(3.72)} y={sy(0.62)} tex="√5" size={13} anchor="end" />
      <Label x={sx(5.0)} y={sy(0.46)} kind="num" size={12}>
        2
      </Label>
      <Eq x={sx(6.9)} y={sy(-2.55)} tex="PA = 2PB" anchor="end" size={14} />
    </Svg>
  );
}

/* Q16 solution: tangent and normal to y = √x at (4, 2) ------------------------------ */
export function P3M2TangentNormalSolution() {
  const spec: AxesSpec = { x: [-5, 6], y: [-1, 4.2], box: { l: 12, r: 440, t: 10, b: 213 } };
  const { sx, sy } = axesScales(spec);
  const P: Pt = [sx(4), sy(2)];
  const T: Pt = [sx(-4), sy(0)];
  const N: Pt = [sx(4.5), sy(0)];
  return (
    <Svg w={452} h={236} label="The curve y = √x with its tangent and normal at P(4, 2). The tangent meets the x-axis at T(−4, 0) and the normal meets it at N(4.5, 0). Triangle PTN has base 8.5 and height 2">
      <Grid spec={spec} xs={range(-5, 6, 1)} ys={range(-1, 4, 1)} className="d-grid" />
      <polygon points={pts([T, P, N])} className="d-area-strong" />
      <line x1={sx(-5)} x2={sx(6)} y1={sy(0)} y2={sy(0)} className="d-line d-thin" />
      <line x1={sx(0)} x2={sx(0)} y1={sy(-1)} y2={sy(4.2)} className="d-line d-thin" />
      <path d={samplePath((x) => Math.sqrt(x), 0, 6, sx, sy, { n: 300 })} className="d-line d-thick" fill="none" />
      <path d={samplePath((x) => x / 4 + 1, -5, 6, sx, sy)} className="d-line d-accent-stroke" fill="none" />
      <path d={samplePath((x) => 18 - 4 * x, 3.45, 4.75, sx, sy, { ymin: -1, ymax: 4.2 })} className="d-line d-mark-stroke" fill="none" />
      <line x1={P[0]} x2={P[0]} y1={P[1]} y2={sy(0)} className="d-line d-thin d-dash" />
      <RightAngle c={P} a={T} b={N} s={9} />
      <Dot at={P} r={3.4} />
      <Dot at={T} r={3.4} />
      <Dot at={N} r={3.4} />
      <Label x={P[0] - 14} y={P[1] - 14} anchor="end" kind="num" size={13}>
        P(4, 2)
      </Label>
      <Label x={T[0]} y={T[1] + 16} kind="num" size={13}>
        T(−4, 0)
      </Label>
      <Label x={N[0] + 12} y={N[1] + 16} anchor="start" kind="num" size={13}>
        N(4.5, 0)
      </Label>
      <Label x={sx(-2.2)} y={sy(0.95)} kind="small" className="d-accent-text">
        tangent
      </Label>
      <Label x={sx(3.4)} y={sy(3.7)} anchor="end" kind="small">
        normal
      </Label>
      <Eq x={sx(5.45)} y={sy(1.75)} tex="y = √x" size={14} />
      <Label x={P[0] - 7} y={sy(0.9)} anchor="end" kind="num" size={12}>
        2
      </Label>
    </Svg>
  );
}

/* Q20: a rectangle under y = 12 − x^2 ---------------------------------------------------- */
export function P3M2Rect() {
  const spec: AxesSpec = { x: [-4.2, 4.2], y: [-1.2, 13.6], box: { l: 12, r: 348, t: 10, b: 264 } };
  const { sx, sy } = axesScales(spec);
  const x0 = 1.8;
  const h = 12 - x0 * x0;
  const corners: Pt[] = [
    [sx(-x0), sy(0)],
    [sx(x0), sy(0)],
    [sx(x0), sy(h)],
    [sx(-x0), sy(h)],
  ];
  return (
    <Svg w={380} h={276} label="The parabola y = 12 − x², symmetric about the y-axis with its vertex at (0, 12). A rectangle stands on the x-axis with its two upper corners on the curve">
      <polygon points={pts(corners)} className="d-line d-area" />
      <line x1={sx(-4.2)} x2={sx(4.2)} y1={sy(0)} y2={sy(0)} className="d-line" />
      <line x1={sx(0)} x2={sx(0)} y1={sy(-1.2)} y2={sy(13.6)} className="d-line" />
      <path d={samplePath((x) => 12 - x * x, -3.8, 3.8, sx, sy, { ymin: -1.2, n: 300 })} className="d-line d-thick d-accent-stroke" fill="none" />
      {corners.map((c, i) => (
        <Dot key={i} at={c} r={3} />
      ))}
      <Eq x={sx(1.05)} y={sy(12.7)} tex="y = 12 - x^2" anchor="start" size={14} className="d-accent-text" />
      <Label x={sx(4.1)} y={sy(0) - 11} anchor="end" kind="var">
        x
      </Label>
      <Label x={sx(0) - 10} y={sy(13.2)} anchor="end" kind="var">
        y
      </Label>
      <Label x={sx(0) - 10} y={sy(0) + 12} kind="var">
        O
      </Label>
    </Svg>
  );
}

/* Q21 solution: trapezium rule for y = x^3 on [−1, 1] ---------------------------------- */
export function P3M2CubicTrapSolution() {
  const spec: AxesSpec = { x: [-1.25, 1.25], y: [-1.15, 1.15], box: { l: 12, r: 352, t: 10, b: 290 } };
  const { sx, sy } = axesScales(spec);
  const f = (x: number) => x ** 3;
  const xs = [-1, -0.5, 0, 0.5, 1];
  const sliver = (a: number, b: number): Pt[] => {
    const out: Pt[] = [];
    for (let i = 0; i <= 40; i++) {
      const x = a + ((b - a) * i) / 40;
      out.push([sx(x), sy(f(x))]);
    }
    return out;
  };
  return (
    <Svg w={364} h={300} label="The curve y = x³ from −1 to 1 with four trapezia of width 0.5. On the right half the chords lie above the curve (an overestimate); on the left half they lie below it (an underestimate). By symmetry the two errors cancel, so the estimate equals the exact value, 0">
      <Grid spec={spec} xs={[-1, -0.5, 0.5, 1]} ys={[-1, -0.5, 0.5, 1]} className="d-grid" />
      {xs.slice(0, -1).map((a, i) => {
        const b = xs[i + 1];
        return (
          <g key={a}>
            <polygon points={pts(sliver(a, b))} className={a < 0 ? 'd-area-alt' : 'd-area-strong'} />
            <polygon
              points={pts([
                [sx(a), sy(0)],
                [sx(a), sy(f(a))],
                [sx(b), sy(f(b))],
                [sx(b), sy(0)],
              ])}
              className="d-line d-thin"
              fill="none"
            />
          </g>
        );
      })}
      <line x1={sx(-1.25)} x2={sx(1.25)} y1={sy(0)} y2={sy(0)} className="d-line d-thin" />
      <line x1={sx(0)} x2={sx(0)} y1={sy(-1.15)} y2={sy(1.15)} className="d-line d-thin" />
      <path d={samplePath(f, -1.08, 1.08, sx, sy)} className="d-line d-thick d-accent-stroke" fill="none" />
      {[-1, 1].map((v) => (
        <Label key={v} x={sx(v)} y={sy(0) + (v < 0 ? -12 : 13)} kind="num" size={12}>
          {v < 0 ? '−1' : '1'}
        </Label>
      ))}
      <Label x={sx(0.66)} y={sy(-0.55)} kind="small">
        chords above: over
      </Label>
      <Label x={sx(-0.66)} y={sy(0.55)} kind="small">
        chords below: under
      </Label>
      <Eq x={sx(0.52)} y={sy(0.92)} tex="y = x^3" size={14} className="d-accent-text" />
    </Svg>
  );
}

/* Q23: a circle inscribed in a sector ------------------------------------------------------ */
function SectorFigure({ solution }: { solution?: boolean }) {
  const O: Pt = [36, 262];
  const R = 216; // radius 9, so 24 px per unit
  const A = polar(O, R, 0);
  const B = polar(O, R, 60);
  const C = polar(O, (2 * R) / 3, 30); // OC = 6
  const r = R / 3; // radius 3
  const T: Pt = [C[0], O[1]];
  const touch = polar(O, R, 30);
  const label = solution
    ? 'The inscribed circle has centre C on the bisector of angle AOB. The radius CT to OA is perpendicular to OA, so in triangle OTC the angle at O is π/6 and OC = 2r. Since OC + r = 9, r = 3'
    : 'A sector OAB with centre O, radius 9 and angle π/3 at O. A circle inside the sector touches OA, OB and the arc AB';
  return (
    <Svg w={300} h={292} label={label}>
      <path d={`M${O[0]} ${O[1]} L${A[0].toFixed(2)} ${A[1].toFixed(2)} A${R} ${R} 0 0 0 ${B[0].toFixed(2)} ${B[1].toFixed(2)} Z`} className="d-line d-area" />
      <circle cx={C[0]} cy={C[1]} r={r} className="d-line d-thick d-accent-stroke d-area-strong" />
      {solution ? (
        <>
          <line x1={O[0]} y1={O[1]} x2={touch[0]} y2={touch[1]} className="d-line d-thin d-dash" />
          <line x1={C[0]} y1={C[1]} x2={T[0]} y2={T[1]} className="d-line d-mark-stroke" />
          <RightAngle c={T} a={O} b={C} s={9} />
          <AngleArc c={O} r={46} from={0} to={30} />
          <Eq x={polar(O, 66, 13)[0]} y={polar(O, 66, 13)[1]} tex="π/6" size={13} />
          <Dot at={C} r={3} />
          <Dot at={touch} r={2.6} />
          <Label x={C[0] - 4} y={C[1] - 14} kind="var">
            C
          </Label>
          <Label x={T[0]} y={T[1] + 15} kind="var">
            T
          </Label>
          <Eq x={T[0] + 9} y={(T[1] + C[1]) / 2} tex="r" anchor="start" size={14} />
          <Eq x={polar(polar(O, 42, 30), 12, 120)[0]} y={polar(polar(O, 42, 30), 12, 120)[1]} tex="2r" size={14} />
          <Eq x={polar(polar(O, (5 * R) / 6, 30), 13, 120)[0]} y={polar(polar(O, (5 * R) / 6, 30), 13, 120)[1]} tex="r" size={14} />
        </>
      ) : (
        <>
          <AngleArc c={O} r={34} from={0} to={60} />
          <Eq x={polar(O, 52, 30)[0]} y={polar(O, 52, 30)[1]} tex="π/3" size={13} />
          <Label x={O[0] + R / 2} y={O[1] + 15} kind="num" size={13}>
            9
          </Label>
        </>
      )}
      <Label x={O[0] - 12} y={O[1] + 8} kind="var">
        O
      </Label>
      <Label x={A[0] + 10} y={A[1] + 8} kind="var">
        A
      </Label>
      <Label x={B[0] + 8} y={B[1] - 10} kind="var">
        B
      </Label>
    </Svg>
  );
}

export function P3M2Sector() {
  return <SectorFigure />;
}

export function P3M2SectorSolution() {
  return <SectorFigure solution />;
}

/* Q25 solution: the line y = kx halves the region under y = 2x − x^2 ----------------------- */
export function P3M2HalveSolution() {
  const spec: AxesSpec = { x: [-0.3, 2.4], y: [-0.25, 1.3], box: { l: 14, r: 444, t: 10, b: 257 } };
  const { sx, sy } = axesScales(spec);
  const f = (x: number) => 2 * x - x * x;
  const c = Math.cbrt(4); // where the line meets the curve
  const k = 2 - c;
  const upper: Pt[] = [];
  for (let i = 0; i <= 60; i++) upper.push([sx((c * i) / 60), sy(f((c * i) / 60))]);
  upper.push([sx(0), sy(0)]);
  const lower: Pt[] = [[sx(0), sy(0)]];
  for (let i = 0; i <= 40; i++) {
    const x = c + ((2 - c) * i) / 40;
    lower.push([sx(x), sy(f(x))]);
  }
  return (
    <Svg w={458} h={268} label="The hump y = 2x − x² from x = 0 to 2 has area 4/3. The line y = kx, with k = 2 − ∛4, meets the curve again at x = ∛4 and cuts the region into two parts of area 2/3 each">
      <Grid spec={spec} xs={range(0.5, 2, 0.5)} ys={range(0.5, 1, 0.5)} className="d-grid" />
      <polygon points={pts(upper)} className="d-area-strong" />
      <polygon points={pts(lower)} className="d-area-alt" />
      <line x1={sx(-0.3)} x2={sx(2.4)} y1={sy(0)} y2={sy(0)} className="d-line d-thin" />
      <line x1={sx(0)} x2={sx(0)} y1={sy(-0.25)} y2={sy(1.3)} className="d-line d-thin" />
      <path d={samplePath(f, -0.12, 2.12, sx, sy, { ymin: -0.25 })} className="d-line d-thick" fill="none" />
      <path d={samplePath((x) => k * x, -0.2, 2.35, sx, sy)} className="d-line d-accent-stroke" fill="none" />
      <line x1={sx(c)} x2={sx(c)} y1={sy(k * c)} y2={sy(0)} className="d-line d-thin d-dash" />
      <Dot at={[sx(c), sy(k * c)]} r={3.2} />
      <Eq x={sx(0.72)} y={sy(0.6)} tex="2/3" size={15} />
      <Eq x={sx(1.35)} y={sy(0.22)} tex="2/3" size={15} />
      <Eq x={sx(1)} y={sy(1.14)} tex="y = 2x - x^2" size={14} />
      <Eq x={sx(2.1)} y={sy(k * 2.1) - 15} tex="y = kx" size={14} className="d-accent-text" />
      <Eq x={sx(c)} y={sy(0) + 15} tex="4^{1/3}" size={12} />
      <Label x={sx(2) - 7} y={sy(0) + 14} anchor="end" kind="num" size={12}>
        2
      </Label>
    </Svg>
  );
}

/* Q27 solution: three tangents to y = x^3 − 3x through (2, 0) -------------------------- */
export function P3M2TangentsSolution() {
  const spec: AxesSpec = { x: [-2.7, 3.3], y: [-4.2, 9.4], box: { l: 12, r: 400, t: 10, b: 330 } };
  const { sx, sy } = axesScales(spec);
  const f = (x: number) => x ** 3 - 3 * x;
  // the roots of t^3 − 3t^2 + 3 = 0 are 1 + 2cos 40°, 1 + 2cos 80° and 1 + 2cos 160°
  const ts = [40, 80, 160].map((d) => 1 + 2 * Math.cos((d * Math.PI) / 180));
  return (
    <Svg w={412} h={340} label="The curve y = x³ − 3x with the point (2, 0) on the x-axis. Three different tangents to the curve pass through (2, 0), touching it at x ≈ −0.88, 1.35 and 2.53">
      <Grid spec={spec} xs={range(-2, 3, 1)} ys={range(-4, 8, 2)} className="d-grid" />
      <line x1={sx(-2.7)} x2={sx(3.3)} y1={sy(0)} y2={sy(0)} className="d-line d-thin" />
      <line x1={sx(0)} x2={sx(0)} y1={sy(-4.2)} y2={sy(9.4)} className="d-line d-thin" />
      {ts.map((t) => {
        const m = 3 * t * t - 3;
        return <path key={t} d={samplePath((x) => m * (x - 2), -2.7, 3.3, sx, sy, { ymin: -4.2, ymax: 9.4, n: 600 })} className="d-line d-accent-stroke" fill="none" />;
      })}
      <path d={samplePath(f, -2.7, 3.3, sx, sy, { ymin: -4.2, ymax: 9.4, n: 600 })} className="d-line d-thick" fill="none" />
      {ts.map((t) => (
        <Dot key={t} at={[sx(t), sy(f(t))]} r={3.2} className="d-accent-fill" />
      ))}
      <Dot at={[sx(2), sy(0)]} r={3.8} className="d-mark-fill" />
      <Label x={sx(2) + 9} y={sy(0) + 15} anchor="start" kind="num" size={13}>
        (2, 0)
      </Label>
      <Eq x={sx(-2.55)} y={sy(8.4)} tex="y = x^3 - 3x" anchor="start" size={14} />
      <Label x={sx(-2.55)} y={sy(6.9)} anchor="start" kind="small">
        a = 2 &gt; √3: three tangents
      </Label>
      {[-2, -1, 1, 3].map((v) => (
        <Label key={v} x={sx(v) - 7} y={sy(0) - 9} kind="num" size={11}>
          {v < 0 ? '−' + -v : v}
        </Label>
      ))}
    </Svg>
  );
}
