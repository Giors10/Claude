import React from 'react';
import {
  AngleArc,
  ArrowDefs,
  Cell,
  Diode,
  Dot,
  Grid,
  Junction,
  Label,
  Lamp,
  Meter,
  Resistor,
  Sub,
  Svg,
  Wire,
  axesScales,
  polar,
  pts,
  range,
  samplePath,
  type AxesSpec,
  type Pt,
} from './kit';

/* Mock 2 · Physics diagrams ------------------------------------------------ */

const TAU = 2 * Math.PI;

/* Q7: displacement–time graph of a point on a rope ----------------------------- */
export function P2PhWave() {
  const spec: AxesSpec = { x: [0, 1.04], y: [-3, 3], box: { l: 62, r: 410, t: 16, b: 216 } };
  const { sx, sy } = axesScales(spec);
  const f = (t: number) => 2 * Math.cos((TAU * t) / 0.25);
  return (
    <Svg w={430} h={262} label="Displacement of one point on the rope against time: a cosine wave of amplitude 2.0 cm with peaks at 0, 0.25, 0.50, 0.75 and 1.00 seconds">
      <Grid spec={spec} xs={range(0.0625, 1.0, 0.0625)} ys={range(-3, 3, 1)} className="d-grid" />
      <Grid spec={spec} xs={range(0.25, 1.0, 0.25)} ys={[-2, 2]} className="d-grid-major" />
      <line x1={sx(0)} x2={sx(1.04)} y1={sy(0)} y2={sy(0)} className="d-line d-thin" />
      <line x1={sx(0)} x2={sx(0)} y1={sy(-3)} y2={sy(3)} className="d-line" />
      <path d={samplePath(f, 0, 1.0, sx, sy, { n: 500 })} className="d-line d-thick d-accent-stroke" fill="none" />
      {[0.25, 0.5, 0.75, 1.0].map((v) => (
        <Label key={v} x={sx(v)} y={sy(0) + 13} kind="num" size={12}>
          {v.toFixed(2)}
        </Label>
      ))}
      {[-2, 0, 2].map((v) => (
        <Label key={v} x={sx(0) - 8} y={sy(v)} anchor="end" kind="num" size={12}>
          {v < 0 ? '−' + -v : v}
        </Label>
      ))}
      <Label x={sx(1.04)} y={sy(0) + 30} anchor="end" kind="text" size={13}>
        time / s
      </Label>
      <text x={16} y={(sy(-3) + sy(3)) / 2} className="d-text" textAnchor="middle" transform={`rotate(-90 16 ${(sy(-3) + sy(3)) / 2})`}>
        displacement / cm
      </text>
    </Svg>
  );
}

/* Q10: lamps and diodes -------------------------------------------------------- */
export function P2PhDiodes() {
  const L = 50;
  const T = 44;
  const B = 250;
  const X = [196, 286, 376];
  const mid = (T + B) / 2;
  return (
    <Svg w={430} h={278} label="A cell whose longer (positive) plate is at the bottom. Lamp S is in the top wire. Three parallel branches: lamp P with a diode pointing down, lamp Q with a diode pointing up, and lamp R with one diode pointing up and one pointing down">
      <Wire p={[[L, T], [X[2], T], [X[2], B], [L, B], [L, T]]} />
      <Wire p={[[X[0], T], [X[0], B]]} />
      <Wire p={[[X[1], T], [X[1], B]]} />
      {/* the cell is drawn with its longer, positive plate at the bottom */}
      <g transform={`rotate(180 ${L} ${mid})`}>
        <Cell at={[L, mid]} o="v" />
      </g>
      <Lamp at={[120, T]} />
      <Label x={120} y={T - 22} kind="var">
        S
      </Label>
      <Lamp at={[X[0], 100]} />
      <Diode at={[X[0], 180]} dir="down" />
      <Label x={X[0] - 20} y={100} anchor="end" kind="var">
        P
      </Label>
      <Lamp at={[X[1], 100]} />
      <Diode at={[X[1], 180]} dir="up" />
      <Label x={X[1] - 20} y={100} anchor="end" kind="var">
        Q
      </Label>
      <Lamp at={[X[2], 90]} />
      <Diode at={[X[2], 150]} dir="up" />
      <Diode at={[X[2], 205]} dir="down" />
      <Label x={X[2] + 20} y={90} anchor="start" kind="var">
        R
      </Label>
      <Junction at={[X[0], T]} />
      <Junction at={[X[1], T]} />
      <Junction at={[X[0], B]} />
      <Junction at={[X[1], B]} />
    </Svg>
  );
}

/* Q20: generator output and six candidate graphs ----------------------------- */
function GenAxes({ id, f, w = 300, h = 170, dashed }: { id: string; f: (u: number) => number; w?: number; h?: number; dashed?: boolean }) {
  // u is time in units of T; the vertical scale is in units of V0.
  const spec: AxesSpec = { x: [0, 2.12], y: [-2.35, 2.35], box: { l: 40, r: w - 12, t: 8, b: h - 20 } };
  const { sx, sy } = axesScales(spec);
  return (
    <>
      <defs>
        <clipPath id={`clip-${id}`}>
          <rect x={spec.box.l} y={spec.box.t} width={spec.box.r - spec.box.l} height={spec.box.b - spec.box.t} />
        </clipPath>
      </defs>
      <Grid spec={spec} xs={range(0.25, 2, 0.25)} ys={[-2, -1, 1, 2]} className="d-grid" />
      <Grid spec={spec} xs={[1, 2]} ys={[]} className="d-grid-major" />
      <line x1={sx(0)} x2={sx(2.12)} y1={sy(0)} y2={sy(0)} className="d-line d-thin" />
      <line x1={sx(0)} x2={sx(0)} y1={sy(-2.35)} y2={sy(2.35)} className="d-line d-thin" />
      <g clipPath={`url(#clip-${id})`}>
        <path d={samplePath(f, 0, 2, sx, sy, { n: 600 })} className={'d-line d-thick d-accent-stroke' + (dashed ? ' d-dash' : '')} fill="none" />
      </g>
      <Sub x={sx(0) - 7} y={sy(1)} base="V" sub="0" anchor="end" size={13} />
      <text x={sx(0) - 7} y={sy(2)} textAnchor="end" dominantBaseline="central">
        <tspan className="d-num" style={{ fontSize: 13 }}>
          2
        </tspan>
        <tspan className="d-var" style={{ fontSize: 13 }}>
          V
        </tspan>
        <tspan className="d-num" dy={4} style={{ fontSize: 9 }}>
          0
        </tspan>
      </text>
      <Label x={sx(1)} y={spec.box.b + 11} kind="var" size={13}>
        T
      </Label>
      <text x={sx(2)} y={spec.box.b + 11} textAnchor="middle" dominantBaseline="central">
        <tspan className="d-num" style={{ fontSize: 13 }}>
          2
        </tspan>
        <tspan className="d-var" style={{ fontSize: 13 }}>
          T
        </tspan>
      </text>
    </>
  );
}

export function P2PhGenerator() {
  return (
    <Svg w={320} h={184} label="Output voltage of the generator against time: a sine wave of peak voltage V0 and period T, shown for two cycles">
      <GenAxes id="p2gen-stem" f={(u) => Math.sin(TAU * u)} w={320} h={184} />
    </Svg>
  );
}

const GEN_OPTIONS: Record<string, { f: (u: number) => number; label: string }> = {
  'p2-ph-gen-a': { f: (u) => 2 * Math.sin(TAU * u), label: 'Peak voltage 2V0, period T' },
  'p2-ph-gen-b': { f: (u) => Math.sin(2 * TAU * u), label: 'Peak voltage V0, period T/2' },
  'p2-ph-gen-c': { f: (u) => 2 * Math.sin(Math.PI * u), label: 'Peak voltage 2V0, period 2T' },
  'p2-ph-gen-d': { f: (u) => Math.sin(Math.PI * u), label: 'Peak voltage V0, period 2T' },
  'p2-ph-gen-e': { f: (u) => 2 * Math.sin(2 * TAU * u), label: 'Peak voltage 2V0, period T/2' },
  'p2-ph-gen-f': { f: (u) => Math.abs(2 * Math.sin(2 * TAU * u)), label: 'Voltage never negative, peaks of 2V0 every quarter of T' },
};

export function makeGenOption(id: string) {
  const o = GEN_OPTIONS[id];
  return function GenOption() {
    return (
      <svg viewBox="0 0 230 150" className="diagram diagram-option" role="img" aria-label={o.label}>
        <GenAxes id={id} f={o.f} w={230} h={150} />
      </svg>
    );
  };
}

/* Q21: two mirrors at 70° ------------------------------------------------------ */
function mirrorGeometry() {
  const O: Pt = [40, 262];
  const deg = Math.PI / 180;
  const w: Pt = [Math.cos(70 * deg), -Math.sin(70 * deg)]; // along the second mirror (screen coordinates)
  const P: Pt = [O[0] + 250, O[1]];
  const u: Pt = [Math.cos(140 * deg), -Math.sin(140 * deg)]; // reflected ray leaving the first mirror
  // P + t u lies on the line O + s w
  const det = u[0] * -w[1] - u[1] * -w[0];
  const t = ((O[0] - P[0]) * -w[1] - (O[1] - P[1]) * -w[0]) / det;
  const Q: Pt = [P[0] + t * u[0], P[1] + t * u[1]];
  // unit normal to the second mirror, pointing into the gap between the mirrors
  const n: Pt = [Math.sin(70 * deg), Math.cos(70 * deg)];
  const dot = u[0] * n[0] + u[1] * n[1];
  const r: Pt = [u[0] - 2 * dot * n[0], u[1] - 2 * dot * n[1]];
  const S: Pt = [P[0] + 120 * Math.cos(40 * deg), P[1] - 120 * Math.sin(40 * deg)];
  const end: Pt = [Q[0] + 120 * r[0], Q[1] + 120 * r[1]];
  const M2end: Pt = [O[0] + 250 * w[0], O[1] + 250 * w[1]];
  return { O, P, Q, S, end, w, n, M2end };
}

function Hatch({ a, b, side, n = 12 }: { a: Pt; b: Pt; side: Pt; n?: number }) {
  const lines: React.ReactNode[] = [];
  for (let i = 0; i <= n; i++) {
    const x = a[0] + ((b[0] - a[0]) * i) / n;
    const y = a[1] + ((b[1] - a[1]) * i) / n;
    lines.push(<line key={i} x1={x} y1={y} x2={x + side[0] * 9 - (b[0] - a[0]) / n / 2} y2={y + side[1] * 9 - (b[1] - a[1]) / n / 2} className="d-line d-thin" />);
  }
  return <g>{lines}</g>;
}

function MirrorBase({ solution }: { solution?: boolean }) {
  const { O, P, Q, S, end, w, n, M2end } = mirrorGeometry();
  const dir = (p: Pt, q: Pt) => (Math.atan2(-(q[1] - p[1]), q[0] - p[0]) * 180) / Math.PI;
  const nQ: Pt = [Q[0] + 84 * n[0], Q[1] + 84 * n[1]];
  return (
    <>
      <ArrowDefs id={solution ? 'p2mir-arrow-s' : 'p2mir-arrow'} cls="d-accent-fill" />
      <line x1={O[0]} y1={O[1]} x2={420} y2={O[1]} className="d-line d-thick" />
      <Hatch a={[O[0] + 4, O[1]]} b={[416, O[1]]} side={[0, 1]} n={30} />
      <line x1={O[0]} y1={O[1]} x2={M2end[0]} y2={M2end[1]} className="d-line d-thick" />
      <Hatch a={[O[0] + 4 * w[0], O[1] + 4 * w[1]]} b={M2end} side={[-n[0], -n[1]]} n={20} />
      <line x1={P[0]} y1={P[1]} x2={P[0]} y2={P[1] - 70} className="d-line d-thin d-dash" />
      <line x1={Q[0]} y1={Q[1]} x2={nQ[0]} y2={nQ[1]} className="d-line d-thin d-dash" />
      <line x1={S[0]} y1={S[1]} x2={P[0]} y2={P[1]} className="d-line d-accent-stroke" markerEnd={`url(#${solution ? 'p2mir-arrow-s' : 'p2mir-arrow'})`} />
      <line x1={P[0]} y1={P[1]} x2={Q[0]} y2={Q[1]} className="d-line d-accent-stroke" />
      <line x1={Q[0]} y1={Q[1]} x2={end[0]} y2={end[1]} className="d-line d-accent-stroke" markerEnd={`url(#${solution ? 'p2mir-arrow-s' : 'p2mir-arrow'})`} />
      <AngleArc c={O} r={30} from={0} to={70} />
      <Label {...lp(polar(O, 44, 35))} kind="num" size={13}>
        70°
      </Label>
      <AngleArc c={P} r={34} from={40} to={90} />
      <Label {...lp(polar(P, 48, 65))} kind="num" size={13}>
        50°
      </Label>
      {(() => {
        const a = dir(Q, nQ);
        const b = dir(Q, end);
        const from = Math.min(a, b);
        const to = Math.max(a, b);
        return (
          <>
            <AngleArc c={Q} r={46} from={from} to={to} className="d-line d-accent-stroke" />
            <Label {...lp(polar(Q, 60, (from + to) / 2))} kind="var" size={16}>
              θ
            </Label>
          </>
        );
      })()}
      {solution && (
        <>
          <AngleArc c={P} r={24} from={140} to={180} className="d-line d-mark-stroke" />
          <Label {...lp(polar(P, 38, 160))} kind="num" size={13} className="d-accent-text">
            40°
          </Label>
          {(() => {
            const a = dir(Q, O);
            const b = dir(Q, P);
            const from = Math.min(a, b);
            const to = Math.max(a, b);
            return (
              <>
                <AngleArc c={Q} r={20} from={from} to={to} className="d-line d-mark-stroke" />
                <Label {...lp(polar(Q, 33, (from + to) / 2))} kind="num" size={13} className="d-accent-text">
                  70°
                </Label>
              </>
            );
          })()}
        </>
      )}
      <Label x={O[0] - 4} y={O[1] + 16} kind="var">
        O
      </Label>
      <Label x={P[0] + 2} y={P[1] + 18} kind="var">
        P
      </Label>
      <Label x={Q[0] + 12} y={Q[1] - 14} kind="var">
        Q
      </Label>
    </>
  );
}

export function P2PhMirrors() {
  return (
    <Svg w={430} h={292} label="Two plane mirrors meet at O at an angle of 70 degrees. A ray strikes the first mirror at P with an angle of incidence of 50 degrees, reflects to the second mirror at Q, and reflects again; the angle of reflection at Q is marked theta">
      <MirrorBase />
    </Svg>
  );
}

export function P2PhMirrorsSolution() {
  return (
    <Svg w={430} h={292} label="In triangle OPQ the angle at O is 70 degrees and the ray leaves the first mirror at 40 degrees to its surface, so it meets the second mirror at 70 degrees to its surface: the angle of incidence there is 20 degrees">
      <MirrorBase solution />
    </Svg>
  );
}

function lp(p: Pt) {
  return { x: p[0], y: p[1] };
}

/* Q23: force–extension graph ----------------------------------------------------- */
export function P2PhSpring() {
  const spec: AxesSpec = { x: [0, 7.4], y: [0, 14], box: { l: 58, r: 404, t: 16, b: 224 } };
  const { sx, sy } = axesScales(spec);
  // linear to P(5, 10), then a smooth curve with decreasing gradient
  const f = (x: number) => (x <= 5 ? 2 * x : 10 + 2 * (x - 5) - 0.35 * (x - 5) ** 2);
  return (
    <Svg w={420} h={266} label="Force against extension for a spring: a straight line through the origin up to point P at 5.0 centimetres and 10 newtons, then a curve that becomes less steep">
      <Grid spec={spec} xs={range(0.5, 7, 0.5)} ys={range(1, 14, 1)} className="d-grid" />
      <Grid spec={spec} xs={range(1, 7, 1)} ys={range(2, 14, 2)} className="d-grid-major" />
      <line x1={sx(0)} x2={sx(7.4)} y1={sy(0)} y2={sy(0)} className="d-line" />
      <line x1={sx(0)} x2={sx(0)} y1={sy(0)} y2={sy(14)} className="d-line" />
      <path d={samplePath(f, 0, 7, sx, sy, { n: 300 })} className="d-line d-thick d-accent-stroke" fill="none" />
      <Dot at={[sx(5), sy(10)]} r={3.4} />
      <Label x={sx(5) - 10} y={sy(10) - 12} kind="var">
        P
      </Label>
      {range(1, 7, 1).map((v) => (
        <Label key={v} x={sx(v)} y={sy(0) + 13} kind="num" size={12}>
          {v}
        </Label>
      ))}
      {range(2, 14, 2).map((v) => (
        <Label key={v} x={sx(0) - 8} y={sy(v)} anchor="end" kind="num" size={12}>
          {v}
        </Label>
      ))}
      <Label x={sx(7.4)} y={sy(0) + 32} anchor="end" kind="text" size={13}>
        extension / cm
      </Label>
      <text x={18} y={(sy(0) + sy(14)) / 2} className="d-text" textAnchor="middle" transform={`rotate(-90 18 ${(sy(0) + sy(14)) / 2})`}>
        force / N
      </text>
    </Svg>
  );
}

/* Q24: velocity–time graph that crosses zero ------------------------------------ */
const VT: Pt[] = [
  [0, 0],
  [2, 6],
  [6, 6],
  [8, 0],
  [10, -6],
  [16, -6],
];

function VtBase({ solution }: { solution?: boolean }) {
  const spec: AxesSpec = { x: [0, 16.6], y: [-8, 8], box: { l: 58, r: 404, t: 14, b: 250 } };
  const { sx, sy } = axesScales(spec);
  const fwd: Pt[] = [[0, 0], [2, 6], [6, 6], [8, 0]];
  const back: Pt[] = [[8, 0], [10, -6], [15, -6], [15, 0]];
  return (
    <>
      <Grid spec={spec} xs={range(1, 16, 1)} ys={range(-8, 8, 1)} className="d-grid" />
      <Grid spec={spec} xs={range(2, 16, 2)} ys={range(-8, 8, 2)} className="d-grid-major" />
      {solution && (
        <>
          <polygon points={pts(fwd.map(([x, y]) => [sx(x), sy(y)]))} className="d-area-strong" />
          <polygon points={pts(back.map(([x, y]) => [sx(x), sy(y)]))} className="d-area-alt" />
          <line x1={sx(15)} x2={sx(15)} y1={sy(-8)} y2={sy(8)} className="d-line d-thin d-dash d-mark-stroke" />
          <Label x={sx(4.3)} y={sy(3)} kind="num" size={13}>
            +36 m
          </Label>
          <Label x={sx(11.6)} y={sy(-3)} kind="num" size={13}>
            −36 m
          </Label>
        </>
      )}
      <line x1={sx(0)} x2={sx(16.6)} y1={sy(0)} y2={sy(0)} className="d-line" />
      <line x1={sx(0)} x2={sx(0)} y1={sy(-8)} y2={sy(8)} className="d-line" />
      <polyline points={pts(VT.map(([x, y]) => [sx(x), sy(y)]))} className="d-line d-thick d-accent-stroke" fill="none" />
      {/* time labels sit below the plot, clear of the line where it crosses the axis */}
      {range(0, 16, 2).map((v) => (
        <Label key={v} x={sx(v)} y={sy(-8) + 13} kind="num" size={12}>
          {v}
        </Label>
      ))}
      {range(-8, 8, 2).map((v) => (
        <Label key={v} x={sx(0) - 8} y={sy(v)} anchor="end" kind="num" size={12}>
          {v < 0 ? '−' + -v : v}
        </Label>
      ))}
      <Label x={(sx(0) + sx(16.6)) / 2} y={sy(-8) + 32} kind="text" size={13}>
        time / s
      </Label>
      <text x={18} y={(sy(-8) + sy(8)) / 2} className="d-text" textAnchor="middle" transform={`rotate(-90 18 ${(sy(-8) + sy(8)) / 2})`}>
        velocity / m s⁻¹
      </text>
    </>
  );
}

export function P2PhVt() {
  return (
    <Svg w={420} h={292} label="Velocity against time: rising from 0 to 6 metres per second in the first 2 seconds, constant until 6 seconds, falling through zero at 8 seconds to −6 metres per second at 10 seconds, then constant at −6 until 16 seconds">
      <VtBase />
    </Svg>
  );
}

export function P2PhVtSolution() {
  return (
    <Svg w={420} h={292} label="The area above the axis up to 8 seconds is 36 metres; the area below the axis from 8 to 15 seconds is also 36 metres, so the object is back at the start at 15 seconds">
      <VtBase solution />
    </Svg>
  );
}

/* Q25: heating curve ------------------------------------------------------------- */
export function P2PhHeating() {
  const spec: AxesSpec = { x: [0, 37], y: [-20, 160], box: { l: 58, r: 408, t: 14, b: 236 } };
  const { sx, sy } = axesScales(spec);
  const curve: Pt[] = [
    [0, -10],
    [2, 30],
    [5, 30],
    [13, 110],
    [34, 110],
    [36, 150],
  ];
  return (
    <Svg w={420} h={276} label="Temperature of substance X against time: it rises from −10 °C to 30 °C in 2 minutes, stays at 30 °C until 5 minutes, rises to 110 °C at 13 minutes, stays at 110 °C until 34 minutes, then rises again">
      <Grid spec={spec} xs={range(1, 37, 1)} ys={range(-20, 160, 10)} className="d-grid" />
      <Grid spec={spec} xs={range(5, 35, 5)} ys={range(-20, 160, 20)} className="d-grid-major" />
      <line x1={sx(0)} x2={sx(37)} y1={sy(0)} y2={sy(0)} className="d-line d-thin" />
      <line x1={sx(0)} x2={sx(0)} y1={sy(-20)} y2={sy(160)} className="d-line" />
      <line x1={sx(0)} x2={sx(37)} y1={sy(-20)} y2={sy(-20)} className="d-line" />
      <polyline points={pts(curve.map(([x, y]) => [sx(x), sy(y)]))} className="d-line d-thick d-accent-stroke" fill="none" />
      {range(0, 35, 5).map((v) => (
        <Label key={v} x={sx(v)} y={sy(-20) + 13} kind="num" size={12}>
          {v}
        </Label>
      ))}
      {range(-20, 160, 20).map((v) => (
        <Label key={v} x={sx(0) - 8} y={sy(v)} anchor="end" kind="num" size={12}>
          {v < 0 ? '−' + -v : v}
        </Label>
      ))}
      <Label x={sx(37)} y={sy(-20) + 30} anchor="end" kind="text" size={13}>
        time / minutes
      </Label>
      <text x={16} y={(sy(-20) + sy(160)) / 2} className="d-text" textAnchor="middle" transform={`rotate(-90 16 ${(sy(-20) + sy(160)) / 2})`}>
        temperature / °C
      </text>
    </Svg>
  );
}

/* Q26: series resistor, parallel pair, ammeter and voltmeter --------------------- */
export function P2PhCircuit() {
  const L = 56;
  const T = 96;
  const B = 280;
  const X1 = 268;
  const X2 = 372;
  return (
    <Svg w={430} h={300} label="A supply in series with a 4.0 ohm resistor, which has a voltmeter connected across it, and then a parallel pair: a 6.0 ohm resistor in one branch and a 12 ohm resistor in series with an ammeter in the other">
      <Wire p={[[L, T], [X2, T], [X2, B], [L, B], [L, T]]} />
      <Wire p={[[X1, T], [X1, B]]} />
      <Wire p={[[112, T], [112, 36], [208, 36], [208, T]]} />
      <Cell at={[L, (T + B) / 2]} o="v" />
      <Resistor at={[160, T]} />
      <Label x={160} y={T + 22} kind="text">
        4.0 Ω
      </Label>
      <Meter at={[160, 36]} letter="V" />
      <Resistor at={[X1, 188]} o="v" />
      <Label x={X1 - 18} y={188} anchor="end" kind="text">
        6.0 Ω
      </Label>
      <Resistor at={[X2, 160]} o="v" />
      <Label x={X2 + 18} y={160} anchor="start" kind="text">
        12 Ω
      </Label>
      <Meter at={[X2, 232]} letter="A" />
      <Junction at={[112, T]} />
      <Junction at={[208, T]} />
      <Junction at={[X1, T]} />
      <Junction at={[X1, B]} />
    </Svg>
  );
}
