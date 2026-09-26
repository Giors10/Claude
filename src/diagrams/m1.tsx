import React from 'react';
import {
  AngleArc,
  ArrowDefs,
  Dot,
  Eq,
  Grid,
  Label,
  RightAngle,
  Svg,
  axesScales,
  polar,
  pts,
  range,
  samplePath,
  type AxesSpec,
  type Pt,
} from './kit';

/* M1-05: speed–time trapezium ------------------------------------------ */
export function M1SpeedTime() {
  const O: Pt = [58, 196];
  const sx = (t: number) => O[0] + t * 9.5; // drawn with T = 18 (not to scale)
  const sy = (v: number) => O[1] - v * 12;
  const T = 18;
  const P1: Pt = [sx(8), sy(12)];
  const P2: Pt = [sx(8 + T), sy(12)];
  const P3: Pt = [sx(12 + T), sy(0)];
  return (
    <Svg w={420} h={250} label="Speed–time graph of the cyclist">
      <ArrowDefs id="st-arrow" />
      <line x1={O[0]} y1={O[1]} x2={396} y2={O[1]} className="d-line" markerEnd="url(#st-arrow)" />
      <line x1={O[0]} y1={O[1]} x2={O[0]} y2={20} className="d-line" markerEnd="url(#st-arrow)" />
      <polygon points={pts([O, P1, P2, P3])} className="d-area" />
      <polyline points={pts([O, P1, P2, P3])} className="d-line d-accent-stroke d-thick" fill="none" />
      <line x1={O[0]} y1={P1[1]} x2={P1[0]} y2={P1[1]} className="d-line d-thin d-dash" />
      <line x1={P1[0]} y1={P1[1]} x2={P1[0]} y2={O[1]} className="d-line d-thin d-dash" />
      <line x1={P2[0]} y1={P2[1]} x2={P2[0]} y2={O[1]} className="d-line d-thin d-dash" />
      <Label x={O[0] - 8} y={P1[1]} anchor="end" kind="num">12</Label>
      <Label x={O[0] - 8} y={O[1] + 2} anchor="end" kind="num">0</Label>
      <Label x={O[0] + 4} y={14} anchor="start" kind="text">speed / m s⁻¹</Label>
      <Label x={396} y={O[1] + 16} anchor="end" kind="text">time / s</Label>
      {/* interval brackets under the axis */}
      <ArrowDefs id="st-dim" />
      {[
        [O[0], P1[0], '8 s'],
        [P1[0], P2[0], 'T s'],
        [P2[0], P3[0], '4 s'],
      ].map(([a, b, lab]) => (
        <g key={String(lab)}>
          <line x1={Number(a) + 2} x2={Number(b) - 2} y1={226} y2={226} className="d-line d-thin" markerStart="url(#st-dim)" markerEnd="url(#st-dim)" />
          <Label x={(Number(a) + Number(b)) / 2} y={240} kind="text" size={13}>
            {String(lab) === 'T s' ? (
              <>
                <tspan className="d-var">T</tspan> s
              </>
            ) : (
              String(lab)
            )}
          </Label>
        </g>
      ))}
      <line x1={O[0]} x2={O[0]} y1={O[1]} y2={232} className="d-line d-thin d-dash" />
      <line x1={P3[0]} x2={P3[0]} y1={O[1]} y2={232} className="d-line d-thin d-dash" />
    </Svg>
  );
}

/* M1-11: circle theorem ------------------------------------------------- */
export function M1CircleTheorem() {
  const O: Pt = [180, 150];
  const R = 115;
  const A = polar(O, R, -90);
  const B = polar(O, R, 26);
  const C = polar(O, R, 120);
  return (
    <Svg w={360} h={300} label="Circle with centre O, tangent TA, and points A, B, C">
      <circle cx={O[0]} cy={O[1]} r={R} className="d-line" fill="none" />
      <line x1={70} y1={A[1]} x2={322} y2={A[1]} className="d-line" />
      <polyline points={pts([A, B, C, A])} className="d-line" fill="none" />
      <line x1={O[0]} y1={O[1]} x2={B[0]} y2={B[1]} className="d-line d-thin" />
      <line x1={O[0]} y1={O[1]} x2={C[0]} y2={C[1]} className="d-line d-thin" />
      <AngleArc c={A} r={30} from={0} to={58} />
      <AngleArc c={A} r={22} from={58} to={105} />
      <Label {...lp(polar(A, 50, 26))} kind="num" size={13}>58°</Label>
      <Label {...lp(polar(A, 40, 82))} kind="num" size={13}>47°</Label>
      <Dot at={O} r={2.6} />
      <Label x={O[0] - 12} y={O[1] + 4} kind="var">O</Label>
      <Label x={A[0]} y={A[1] + 17} kind="var">A</Label>
      <Label x={B[0] + 13} y={B[1] - 6} kind="var">B</Label>
      <Label x={C[0] - 10} y={C[1] - 10} kind="var">C</Label>
      <Label x={334} y={A[1]} kind="var">T</Label>
    </Svg>
  );
}

function lp(p: Pt) {
  return { x: p[0], y: p[1] };
}

/* M1-13: cumulative frequency ------------------------------------------ */
const CF_POINTS: [number, number][] = [
  [0, 0],
  [10, 2],
  [20, 6],
  [30, 12],
  [40, 20],
  [50, 40],
  [60, 54],
  [70, 66],
  [80, 74],
  [90, 78],
  [100, 80],
];

export function M1CumFreq() {
  const spec: AxesSpec = { x: [0, 100], y: [0, 80], box: { l: 64, r: 414, t: 30, b: 270 } };
  const { sx, sy } = axesScales(spec);
  return (
    <Svg w={440} h={318} label="Cumulative frequency graph of marks for 80 students">
      <Grid spec={spec} xs={range(0, 100, 5)} ys={range(0, 80, 5)} className="d-grid" />
      <Grid spec={spec} xs={range(0, 100, 10)} ys={range(0, 80, 10)} className="d-grid-major" />
      <line x1={sx(0)} y1={sy(0)} x2={sx(100)} y2={sy(0)} className="d-line" />
      <line x1={sx(0)} y1={sy(0)} x2={sx(0)} y2={sy(80)} className="d-line" />
      <polyline points={pts(CF_POINTS.map(([x, y]) => [sx(x), sy(y)]))} className="d-line d-accent-stroke d-thick" fill="none" />
      {CF_POINTS.map(([x, y]) => (
        <Dot key={x} at={[sx(x), sy(y)]} r={2.4} className="d-accent-fill" />
      ))}
      {range(0, 100, 10).map((v) => (
        <Label key={'x' + v} x={sx(v)} y={sy(0) + 14} kind="num" size={12}>
          {v}
        </Label>
      ))}
      {range(0, 80, 10).map((v) => (
        <Label key={'y' + v} x={sx(0) - 8} y={sy(v)} anchor="end" kind="num" size={12}>
          {v}
        </Label>
      ))}
      <Label x={(sx(0) + sx(100)) / 2} y={306} kind="text">mark</Label>
      <text x={18} y={(sy(0) + sy(80)) / 2} className="d-text" textAnchor="middle" transform={`rotate(-90 18 ${(sy(0) + sy(80)) / 2})`}>
        cumulative frequency
      </text>
    </Svg>
  );
}

/* M1-16: cone cut into three -------------------------------------------- */
export function M1ConeSlices() {
  const V: Pt = [150, 26];
  const baseY = 236;
  const RX = 105;
  const RY = 20;
  const levels = [1, 2, 3].map((k) => ({ y: V[1] + ((baseY - V[1]) * k) / 3, rx: (RX * k) / 3, ry: (RY * k) / 3 }));
  const half = (cx: number, cy: number, rx: number, ry: number, front: boolean) =>
    `M${cx - rx} ${cy} A${rx} ${ry} 0 0 ${front ? 0 : 1} ${cx + rx} ${cy}`;
  return (
    <Svg w={320} h={272} label="A cone cut by two planes parallel to its base into three pieces of equal height">
      <ArrowDefs id="cone-dim" />
      <path d={`M${V[0]} ${V[1]} L${V[0] - RX} ${baseY} ${half(V[0], baseY, RX, RY, true).replace('M', 'L')} L${V[0]} ${V[1]} Z`} className="d-area" />
      {levels.map((l, i) => (
        <g key={i}>
          <path d={half(V[0], l.y, l.rx, l.ry, false)} className="d-line d-thin d-dash" fill="none" />
          <path d={half(V[0], l.y, l.rx, l.ry, true)} className={'d-line' + (i < 2 ? ' d-accent-stroke' : '')} fill="none" />
        </g>
      ))}
      <line x1={V[0]} y1={V[1]} x2={V[0] - RX} y2={baseY} className="d-line" />
      <line x1={V[0]} y1={V[1]} x2={V[0] + RX} y2={baseY} className="d-line" />
      {[V[1], ...levels.map((l) => l.y)].map((y, i, arr) =>
        i < arr.length - 1 ? (
          <g key={'d' + i}>
            <line x1={284} x2={284} y1={y + 2} y2={arr[i + 1] - 2} className="d-line d-thin" markerStart="url(#cone-dim)" markerEnd="url(#cone-dim)" />
            <Label x={296} y={(y + arr[i + 1]) / 2} kind="var">h</Label>
          </g>
        ) : null,
      )}
      {[V[1], ...levels.map((l) => l.y)].map((y, i) => (
        <line key={'t' + i} x1={276} x2={292} y1={y} y2={y} className="d-line d-thin" />
      ))}
    </Svg>
  );
}

/* M1-17: vectors in a parallelogram ------------------------------------- */
export function M1Vectors() {
  const O: Pt = [60, 210];
  const A: Pt = [290, 210];
  const C: Pt = [120, 60];
  const B: Pt = [A[0] + C[0] - O[0], A[1] + C[1] - O[1]];
  const M: Pt = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
  const P: Pt = [O[0] + (2 / 3) * (M[0] - O[0]), O[1] + (2 / 3) * (M[1] - O[1])];
  const mid = (p: Pt, q: Pt): Pt => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  return (
    <Svg w={400} h={240} label="Parallelogram OABC with M the midpoint of AB and P where OM crosses AC">
      <ArrowDefs id="vec-arrow" cls="d-accent-fill" />
      <polygon points={pts([O, A, B, C])} className="d-area" />
      <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} className="d-line" />
      <line x1={B[0]} y1={B[1]} x2={C[0]} y2={C[1]} className="d-line" />
      <line x1={O[0]} y1={O[1]} x2={A[0]} y2={A[1]} className="d-line d-accent-stroke" />
      <line x1={O[0]} y1={O[1]} x2={mid(O, A)[0] + 6} y2={O[1]} className="d-line d-accent-stroke" markerEnd="url(#vec-arrow)" />
      <line x1={O[0]} y1={O[1]} x2={C[0]} y2={C[1]} className="d-line d-accent-stroke" />
      <line x1={O[0]} y1={O[1]} x2={mid(O, C)[0] + 2} y2={mid(O, C)[1] - 4} className="d-line d-accent-stroke" markerEnd="url(#vec-arrow)" />
      <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} className="d-line d-thin d-dash" />
      <line x1={O[0]} y1={O[1]} x2={M[0]} y2={M[1]} className="d-line d-thin" />
      <Dot at={M} r={2.8} />
      <Dot at={P} r={2.8} />
      <Label x={O[0] - 10} y={O[1] + 12} kind="var">O</Label>
      <Label x={A[0] + 8} y={A[1] + 12} kind="var">A</Label>
      <Label x={B[0] + 10} y={B[1] - 8} kind="var">B</Label>
      <Label x={C[0] - 10} y={C[1] - 8} kind="var">C</Label>
      <Label x={M[0] + 14} y={M[1]} kind="var">M</Label>
      <Label x={P[0] + 18} y={P[1] + 4} kind="var">P</Label>
      <Label x={mid(O, A)[0]} y={O[1] + 16} kind="text" className="d-vec">a</Label>
      <Label x={mid(O, C)[0] - 14} y={mid(O, C)[1]} kind="text" className="d-vec">c</Label>
    </Svg>
  );
}

/* M1-18: histogram with unlabelled density axis ------------------------- */
export function M1Histogram() {
  const spec: AxesSpec = { x: [0, 50], y: [0, 9], box: { l: 58, r: 408, t: 33, b: 258 } };
  const { sx, sy } = axesScales(spec);
  const bars: [number, number, number][] = [
    [0, 10, 2],
    [10, 15, 6],
    [15, 20, 8],
    [20, 30, 5],
    [30, 50, 1],
  ];
  return (
    <Svg w={440} h={300} label="Histogram of puzzle times with unequal class widths">
      <Grid spec={spec} xs={range(0, 50, 5)} ys={range(0, 9, 1)} className="d-grid" />
      {bars.map(([a, b, h]) => (
        <rect key={a} x={sx(a)} y={sy(h)} width={sx(b) - sx(a)} height={sy(0) - sy(h)} className="d-bar" />
      ))}
      <line x1={sx(0)} y1={sy(0)} x2={sx(50)} y2={sy(0)} className="d-line" />
      <line x1={sx(0)} y1={sy(0)} x2={sx(0)} y2={sy(9)} className="d-line" />
      {range(0, 50, 5).map((v) => (
        <Label key={v} x={sx(v)} y={sy(0) + 14} kind="num" size={12}>
          {v}
        </Label>
      ))}
      <Label x={(sx(0) + sx(50)) / 2} y={292} kind="text">time (minutes)</Label>
      <text x={22} y={(sy(0) + sy(9)) / 2} className="d-text" textAnchor="middle" transform={`rotate(-90 22 ${(sy(0) + sy(9)) / 2})`}>
        frequency density
      </text>
    </Svg>
  );
}

/* M1-19: circle inscribed in a quarter-circle --------------------------- */
function QuarterBase({ construction }: { construction?: boolean }) {
  const O: Pt = [44, 256];
  const R = 210;
  const r = (2 * Math.SQRT2 - 2) * (R / 2);
  const c: Pt = [O[0] + r, O[1] - r];
  const touch: Pt = [O[0] + R / Math.SQRT2, O[1] - R / Math.SQRT2];
  return (
    <>
      <path d={`M${O[0]} ${O[1]} L${O[0] + R} ${O[1]} A${R} ${R} 0 0 0 ${O[0]} ${O[1] - R} Z`} className="d-area d-line" />
      <circle cx={c[0]} cy={c[1]} r={r} className="d-line d-accent-stroke d-thick d-area-strong" />
      <RightAngle c={O} a={[O[0] + 1, O[1]]} b={[O[0], O[1] - 1]} s={12} />
      <Dot at={O} r={2.6} />
      <Label x={O[0] - 12} y={O[1] + 10} kind="var">O</Label>
      <Label x={O[0] + R / 2} y={O[1] + 16} kind="num">2</Label>
      <Label x={O[0] - 12} y={O[1] - R / 2} kind="num">2</Label>
      {construction && (
        <>
          <line x1={O[0]} y1={O[1]} x2={touch[0]} y2={touch[1]} className="d-line d-thin d-dash" />
          <line x1={c[0]} y1={c[1]} x2={c[0]} y2={O[1]} className="d-line d-thin d-accent-stroke" />
          <line x1={c[0]} y1={c[1]} x2={O[0]} y2={c[1]} className="d-line d-thin d-accent-stroke" />
          <Dot at={c} r={2.6} className="d-accent-fill" />
          <Label x={c[0] + 9} y={(c[1] + O[1]) / 2} kind="var">r</Label>
          <Label x={(c[0] + O[0]) / 2} y={c[1] - 9} kind="var">r</Label>
          <Eq x={(O[0] + c[0]) / 2 + 18} y={(O[1] + c[1]) / 2 + 8} tex="r√2" size={14} />
          <Dot at={touch} r={2.6} />
        </>
      )}
    </>
  );
}

export function M1InscribedCircle() {
  return (
    <Svg w={290} h={290} label="Quarter-circle of radius 2 with a circle inside touching both edges and the arc">
      <QuarterBase />
    </Svg>
  );
}

export function M1InscribedCircleSolution() {
  return (
    <Svg w={290} h={290} label="Construction: the centre of the small circle is at (r, r), a distance r√2 from O, on the line from O to the point of contact">
      <QuarterBase construction />
    </Svg>
  );
}

/* M1-25: square-based pyramid ------------------------------------------- */
function PyramidBase({ construction }: { construction?: boolean }) {
  // Oblique projection drawn to scale: base side 220 px, depth vector d
  // (receding edges at about 35 degrees, half length), height 220 / sqrt(2).
  const A: Pt = [40, 214];
  const B: Pt = [260, 214];
  const d: Pt = [80, -56];
  const C: Pt = [B[0] + d[0], B[1] + d[1]];
  const D: Pt = [A[0] + d[0], A[1] + d[1]];
  const M: Pt = [(A[0] + C[0]) / 2, (A[1] + C[1]) / 2];
  const V: Pt = [M[0], M[1] - 220 / Math.SQRT2];
  const N: Pt = [(B[0] + C[0]) / 2, (B[1] + C[1]) / 2];
  const tick = (p: Pt) => <Dot at={p} r={2.8} className="d-accent-fill" />;
  return (
    <>
      <polygon points={pts([V, A, B])} className="d-area" />
      <polygon points={pts([V, B, C])} className="d-area-strong" />
      <line x1={A[0]} y1={A[1]} x2={D[0]} y2={D[1]} className="d-line d-thin d-dash" />
      <line x1={D[0]} y1={D[1]} x2={C[0]} y2={C[1]} className="d-line d-thin d-dash" />
      <line x1={V[0]} y1={V[1]} x2={D[0]} y2={D[1]} className="d-line d-thin d-dash" />
      <polyline points={pts([A, B, C])} className="d-line" fill="none" />
      <line x1={V[0]} y1={V[1]} x2={A[0]} y2={A[1]} className="d-line" />
      <line x1={V[0]} y1={V[1]} x2={B[0]} y2={B[1]} className="d-line" />
      <line x1={V[0]} y1={V[1]} x2={C[0]} y2={C[1]} className="d-line" />
      <Label x={V[0]} y={V[1] - 13} kind="var">V</Label>
      <Label x={A[0] - 11} y={A[1] + 8} kind="var">A</Label>
      <Label x={B[0] + 4} y={B[1] + 16} kind="var">B</Label>
      <Label x={C[0] + 12} y={C[1]} kind="var">C</Label>
      <Label x={D[0] - 11} y={D[1] - 8} kind="var">D</Label>
      {!construction && (
        <>
          <Label x={(A[0] + B[0]) / 2} y={A[1] + 16} kind="num">2</Label>
          <Label x={(V[0] + B[0]) / 2 + 13} y={(V[1] + B[1]) / 2 + 2} kind="num">2</Label>
        </>
      )}
      {construction && (
        <>
          <line x1={V[0]} y1={V[1]} x2={M[0]} y2={M[1]} className="d-line d-accent-stroke d-dash" />
          <line x1={M[0]} y1={M[1]} x2={N[0]} y2={N[1]} className="d-line d-accent-stroke d-dash" />
          <line x1={V[0]} y1={V[1]} x2={N[0]} y2={N[1]} className="d-line d-accent-stroke d-thick" />
          <RightAngle c={M} a={V} b={N} s={10} />
          <AngleArc c={N} r={26} from={angleDeg(N, V)} to={angleDeg(N, M)} className="d-line d-thin d-accent-stroke" />
          {tick(M)}
          {tick(N)}
          <Label x={M[0] - 12} y={M[1] + 10} kind="var">M</Label>
          <Label x={N[0] + 13} y={N[1] + 8} kind="var">N</Label>
          <Eq x={M[0] - 16} y={(V[1] + M[1]) / 2 + 6} anchor="middle" tex="√2" size={14} />
          <Label x={(M[0] + N[0]) / 2} y={M[1] + 12} kind="num" size={14}>1</Label>
          <Label x={polar(N, 40, 152)[0]} y={polar(N, 40, 152)[1]} kind="var" size={15}>θ</Label>
        </>
      )}
    </>
  );
}

function angleDeg(from: Pt, to: Pt) {
  return (Math.atan2(from[1] - to[1], to[0] - from[0]) * 180) / Math.PI;
}

export function M1Pyramid() {
  return (
    <Svg w={372} h={238} label="Square-based pyramid VABCD with all edges of length 2">
      <PyramidBase />
    </Svg>
  );
}

export function M1PyramidSolution() {
  return (
    <Svg w={372} h={238} label="Construction: M is the centre of the base and N the midpoint of BC; triangle VMN has a right angle at M, VM = √2 and MN = 1, and θ is the angle at N">
      <PyramidBase construction />
    </Svg>
  );
}

/* Solution diagrams ------------------------------------------------------ */

/** M1-20: lattice points in the triangle. */
export function M1LatticeSolution() {
  const spec: AxesSpec = { x: [-0.5, 6.8], y: [-0.5, 4.8], box: { l: 20, r: 320, t: 12, b: 222 } };
  const { sx, sy } = axesScales(spec);
  const inR = (x: number, y: number) => y >= 0 && y <= 2 * x && x + y <= 6;
  const dots: Pt[] = [];
  for (let x = 0; x <= 6; x++) for (let y = 0; y <= 4; y++) if (inR(x, y)) dots.push([x, y]);
  return (
    <Svg w={340} h={236} label="The triangle with vertices (0,0), (2,4), (6,0) and the 19 lattice points inside it or on its boundary">
      <Grid spec={spec} xs={range(0, 6, 1)} ys={range(0, 4, 1)} className="d-grid" />
      <polygon points={pts([[sx(0), sy(0)], [sx(2), sy(4)], [sx(6), sy(0)]])} className="d-area-strong d-line d-accent-stroke" />
      <line x1={sx(-0.5)} y1={sy(0)} x2={sx(6.8)} y2={sy(0)} className="d-line d-thin" />
      <line x1={sx(0)} y1={sy(-0.5)} x2={sx(0)} y2={sy(4.8)} className="d-line d-thin" />
      {dots.map(([x, y]) => (
        <Dot key={x + ',' + y} at={[sx(x), sy(y)]} r={4} className="d-accent-fill" />
      ))}
      {range(1, 6, 1).map((v) => (
        <Label key={v} x={sx(v)} y={sy(0) + 13} kind="num" size={11}>
          {v}
        </Label>
      ))}
      {range(1, 4, 1).map((v) => (
        <Label key={'y' + v} x={sx(0) - 9} y={sy(v)} kind="num" size={11}>
          {v}
        </Label>
      ))}
    </Svg>
  );
}

/** M1-24: y = 2^x and y = x^2 cross three times. */
export function M1ExpQuadSolution() {
  const spec: AxesSpec = { x: [-2.2, 5], y: [-1, 18], box: { l: 16, r: 336, t: 10, b: 236 } };
  const { sx, sy } = axesScales(spec);
  const roots: Pt[] = [
    [-0.7666647, 0.5877747],
    [2, 4],
    [4, 16],
  ];
  return (
    <Svg w={350} h={250} label="Graphs of y = 2^x and y = x squared, crossing at x ≈ −0.77, x = 2 and x = 4">
      <Grid spec={spec} xs={range(-2, 5, 1)} ys={range(0, 18, 2)} className="d-grid" />
      <line x1={sx(-2.2)} y1={sy(0)} x2={sx(5)} y2={sy(0)} className="d-line d-thin" />
      <line x1={sx(0)} y1={sy(-1)} x2={sx(0)} y2={sy(18)} className="d-line d-thin" />
      <path d={samplePath((x) => x * x, -2.2, 5, sx, sy, { ymax: 18 })} className="d-line d-thick" fill="none" />
      <path d={samplePath((x) => 2 ** x, -2.2, 5, sx, sy, { ymax: 18 })} className="d-line d-thick d-accent-stroke" fill="none" />
      {roots.map((p) => (
        <Dot key={p[0]} at={[sx(p[0]), sy(p[1])]} r={4} className="d-mark-fill" />
      ))}
      <Eq x={sx(-2.05)} y={sy(5.3)} anchor="start" tex="y = x^2" size={14} />
      <Eq x={sx(3.75)} y={sy(11)} anchor="start" tex="y = 2^x" size={14} className="d-accent-text" />
      {range(-2, 5, 1)
        .filter((v) => v !== 0)
        .map((v) => (
          <Label key={v} x={sx(v)} y={sy(0) + 12} kind="num" size={11}>
            {v}
          </Label>
        ))}
    </Svg>
  );
}
