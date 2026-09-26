import React from 'react';
import {
  ArrowDefs,
  Battery,
  Dimension,
  Grid,
  Junction,
  Label,
  Meter,
  Resistor,
  SpringV,
  Svg,
  SwitchV,
  Thermistor,
  Wire,
  axesScales,
  pts,
  range,
  samplePath,
  type AxesSpec,
  type Pt,
} from './kit';

/* PH-04: U-tube with oil and water -------------------------------------- */
export function PhUtube() {
  const xL0 = 100;
  const xL1 = 136;
  const xR0 = 224;
  const xR1 = 260;
  const yBend = 240;
  const cx = (xL0 + xR1) / 2;
  const Ro = (xR1 - xL0) / 2;
  const Ri = (xR0 - xL1) / 2;
  const yI = 200; // oil–water boundary
  const yOil = yI - 120; // 12.0 cm at 10 px per cm
  const yWater = yI - 96; // 9.6 cm
  const water = `M${xL0} ${yI} L${xL1} ${yI} L${xL1} ${yBend} A${Ri} ${Ri} 0 0 0 ${xR0} ${yBend} L${xR0} ${yWater} L${xR1} ${yWater} L${xR1} ${yBend} A${Ro} ${Ro} 0 0 1 ${xL0} ${yBend} Z`;
  return (
    <Svg w={370} h={336} label="U-tube: 12.0 cm of oil above the water in the left arm; water in the right arm stands 9.6 cm above the level of the oil–water boundary">
      <ArrowDefs id="ut-dim" />
      <path d={water} className="d-water" />
      <rect x={xL0} y={yOil} width={xL1 - xL0} height={yI - yOil} className="d-oil" />
      <line x1={xL0} y1={yI} x2={xL1} y2={yI} className="d-line d-thin" />
      <line x1={xR0} y1={yWater} x2={xR1} y2={yWater} className="d-line d-thin" />
      <line x1={xL0} y1={yOil} x2={xL1} y2={yOil} className="d-line d-thin" />
      {/* tube walls */}
      <path d={`M${xL0} 30 L${xL0} ${yBend} A${Ro} ${Ro} 0 0 0 ${xR1} ${yBend} L${xR1} 30`} className="d-line d-thick" fill="none" />
      <path d={`M${xL1} 30 L${xL1} ${yBend} A${Ri} ${Ri} 0 0 0 ${xR0} ${yBend} L${xR0} 30`} className="d-line d-thick" fill="none" />
      {/* reference level */}
      <line x1={70} x2={300} y1={yI} y2={yI} className="d-line d-thin d-dash" />
      <Dimension a={[82, yOil + 2]} b={[82, yI - 2]} id="ut-dim" label="12.0 cm" side="left" />
      <Dimension a={[282, yWater + 2]} b={[282, yI - 2]} id="ut-dim" label="9.6 cm" side="right" />
      <line x1={70} x2={xL0} y1={yOil} y2={yOil} className="d-line d-thin d-dash" />
      <line x1={xR1} x2={300} y1={yWater} y2={yWater} className="d-line d-thin d-dash" />
      <Label x={(xL0 + xL1) / 2} y={(yOil + yI) / 2} kind="text" size={13}>oil</Label>
      <Label x={cx} y={yBend + 26} kind="text" size={13}>water</Label>
    </Svg>
  );
}

/* PH-06: thermistor potential divider ----------------------------------- */
export function PhThermistor() {
  const L = 64;
  const R = 320;
  const T = 60;
  const B = 220;
  return (
    <Svg w={370} h={306} label="A 9.0 V supply in series with a thermistor and a 2.0 kilohm resistor, with a voltmeter across the resistor">
      <Wire p={[[L, T], [R, T], [R, B], [L, B], [L, T]]} />
      <Wire p={[[130, B], [130, 276], [250, 276], [250, B]]} />
      <Battery at={[L, 140]} />
      <Label x={L - 22} y={140} anchor="end" kind="text">9.0 V</Label>
      <Thermistor at={[190, T]} />
      <Resistor at={[190, B]} />
      <Label x={190} y={B - 20} kind="text">2.0 kΩ</Label>
      <Meter at={[190, 276]} letter="V" />
      <Junction at={[130, B]} />
      <Junction at={[250, B]} />
    </Svg>
  );
}

/* PH-10: lift velocity–time graph --------------------------------------- */
export function PhLift() {
  const spec: AxesSpec = { x: [0, 12], y: [0, 4], box: { l: 58, r: 400, t: 28, b: 226 } };
  const { sx, sy } = axesScales(spec);
  const path: Pt[] = [
    [0, 0],
    [2, 3],
    [8, 3],
    [11, 0],
  ];
  return (
    <Svg w={420} h={270} label="Velocity of the lift against time">
      <Grid spec={spec} xs={range(0, 12, 1)} ys={range(0, 4, 0.5)} className="d-grid" />
      <Grid spec={spec} xs={[]} ys={range(0, 4, 1)} className="d-grid-major" />
      <line x1={sx(0)} y1={sy(0)} x2={sx(12)} y2={sy(0)} className="d-line" />
      <line x1={sx(0)} y1={sy(0)} x2={sx(0)} y2={sy(4)} className="d-line" />
      <polyline points={pts(path.map(([x, y]) => [sx(x), sy(y)]))} className="d-line d-thick d-accent-stroke" fill="none" />
      {range(0, 12, 1).map((v) => (
        <Label key={v} x={sx(v)} y={sy(0) + 14} kind="num" size={12}>
          {v}
        </Label>
      ))}
      {range(0, 4, 1).map((v) => (
        <Label key={'y' + v} x={sx(0) - 9} y={sy(v)} anchor="end" kind="num" size={12}>
          {v}
        </Label>
      ))}
      <Label x={(sx(0) + sx(12)) / 2} y={260} kind="text">time / s</Label>
      <Label x={sx(0) + 4} y={14} anchor="start" kind="text">velocity / m s⁻¹</Label>
    </Svg>
  );
}

/* PH-12: switch in a parallel branch ------------------------------------ */
export function PhSwitchCircuit() {
  const L = 70;
  const T = 50;
  const B = 250;
  const X1 = 256;
  const X2 = 360;
  return (
    <Svg w={420} h={290} label="A 12 V battery in series with a 4 ohm resistor and a parallel section of a 6 ohm resistor and a 12 ohm resistor with an open switch S">
      <Wire p={[[L, T], [X2, T], [X2, B], [L, B], [L, T]]} />
      <Wire p={[[X1, T], [X1, B]]} />
      <Battery at={[L, 150]} />
      <Label x={L - 24} y={150} anchor="end" kind="text">12 V</Label>
      <Resistor at={[160, T]} />
      <Label x={160} y={T - 20} kind="text">4 Ω</Label>
      <Resistor at={[X1, 150]} o="v" />
      <Label x={X1 - 18} y={150} anchor="end" kind="text">6 Ω</Label>
      <Resistor at={[X2, 110]} o="v" />
      <Label x={X2 + 18} y={110} anchor="start" kind="text">12 Ω</Label>
      <SwitchV at={[X2, 196]} />
      <Label x={X2 + 26} y={192} anchor="start" kind="var">S</Label>
      <Junction at={[X1, T]} />
      <Junction at={[X1, B]} />
    </Svg>
  );
}

/* PH-21: springs in series and in parallel ------------------------------ */
function Support({ x0, x1, y }: { x0: number; x1: number; y: number }) {
  const hatch = [];
  for (let x = x0 + 4; x <= x1; x += 10) hatch.push(<line key={x} x1={x} y1={y} x2={x - 8} y2={y - 9} className="d-line d-thin" />);
  return (
    <g>
      <line x1={x0} y1={y} x2={x1} y2={y} className="d-line d-thick" />
      {hatch}
    </g>
  );
}

export function PhSprings() {
  return (
    <Svg w={380} h={290} label="Two springs in series supporting a 4.0 kg mass, and two springs in parallel supporting the same mass">
      <Support x0={40} x1={120} y={32} />
      <SpringV x={80} y0={32} y1={110} />
      <circle cx={80} cy={110} r={3} className="d-ink-fill" />
      <SpringV x={80} y0={110} y1={188} />
      <rect x={56} y={188} width={48} height={40} rx={3} className="d-line d-mass" />
      <Label x={80} y={208} kind="text" size={13}>4.0 kg</Label>
      <Label x={80} y={262} kind="text">series</Label>

      <Support x0={210} x1={330} y={32} />
      <SpringV x={240} y0={32} y1={112} />
      <SpringV x={300} y0={32} y1={112} />
      <line x1={228} y1={112} x2={312} y2={112} className="d-line d-thick" />
      <line x1={270} y1={112} x2={270} y2={138} className="d-line" />
      <rect x={246} y={138} width={48} height={40} rx={3} className="d-line d-mass" />
      <Label x={270} y={158} kind="text" size={13}>4.0 kg</Label>
      <Label x={270} y={262} kind="text">parallel</Label>
    </Svg>
  );
}

/* PH-24: a voltmeter with finite resistance ----------------------------- */
export function PhVoltmeter() {
  const L = 70;
  const T = 50;
  const R = 280;
  const B = 230;
  return (
    <Svg w={420} h={276} label="A 12 V supply in series with two 10 kilohm resistors; a voltmeter of resistance 10 kilohms is connected across the second resistor">
      <Wire p={[[L, T], [R, T], [R, B], [L, B], [L, T]]} />
      <Wire p={[[R, 90], [340, 90], [340, 190], [R, 190]]} />
      <Battery at={[L, 140]} />
      <Label x={L - 24} y={140} anchor="end" kind="text">12 V</Label>
      <Resistor at={[170, T]} />
      <Label x={170} y={T - 20} kind="text">10 kΩ</Label>
      <Resistor at={[R, 140]} o="v" />
      <Label x={R - 18} y={140} anchor="end" kind="text">10 kΩ</Label>
      <Meter at={[340, 140]} letter="V" />
      <Label x={362} y={140} anchor="start" kind="text">10 kΩ</Label>
      <Junction at={[R, 90]} />
      <Junction at={[R, 190]} />
    </Svg>
  );
}

/* PH-25: I–V characteristics -------------------------------------------- */
export const lampCurrent = (v: number) => (3 * v) / (20 + 5 * v);

export function PhIvGraph() {
  const spec: AxesSpec = { x: [0, 10], y: [0, 0.5], box: { l: 64, r: 414, t: 36, b: 262 } };
  const { sx, sy } = axesScales(spec);
  return (
    <Svg w={440} h={312} label="Current against potential difference for a filament lamp and a fixed resistor">
      <Grid spec={spec} xs={range(0, 10, 0.5)} ys={range(0, 0.5, 0.025)} className="d-grid" />
      <Grid spec={spec} xs={range(0, 10, 1)} ys={range(0, 0.5, 0.05)} className="d-grid-major" />
      <line x1={sx(0)} y1={sy(0)} x2={sx(10)} y2={sy(0)} className="d-line" />
      <line x1={sx(0)} y1={sy(0)} x2={sx(0)} y2={sy(0.5)} className="d-line" />
      <line x1={sx(0)} y1={sy(0)} x2={sx(10)} y2={sy(0.5)} className="d-line d-thick" />
      <path d={samplePath(lampCurrent, 0, 10, sx, sy, { n: 300 })} className="d-line d-thick d-accent-stroke" fill="none" />
      {range(0, 10, 1).map((v) => (
        <Label key={v} x={sx(v)} y={sy(0) + 14} kind="num" size={12}>
          {v}
        </Label>
      ))}
      {range(0, 0.5, 0.1).map((v) => (
        <Label key={'y' + v} x={sx(0) - 8} y={sy(v)} anchor="end" kind="num" size={12}>
          {v.toFixed(1)}
        </Label>
      ))}
      <Label x={sx(8.55)} y={sy(0.47) - 2} anchor="end" kind="text" size={13}>resistor</Label>
      <Label x={sx(9.7)} y={sy(0.39)} anchor="end" kind="text" size={13} className="d-accent-text">lamp</Label>
      <Label x={(sx(0) + sx(10)) / 2} y={298} kind="text">potential difference / V</Label>
      <Label x={sx(0) + 4} y={20} anchor="start" kind="text">current / A</Label>
    </Svg>
  );
}

/* PH-27: induced-voltage graph options ---------------------------------- */
interface Pulse {
  c: number;
  a: number;
  w: number;
}

const EMF_OPTIONS: Record<string, Pulse[]> = {
  'ph-emf-a': [
    { c: 0.3, a: 0.5, w: 0.07 },
    { c: 0.7, a: -0.8, w: 0.044 },
  ],
  'ph-emf-b': [
    { c: 0.3, a: 0.6, w: 0.06 },
    { c: 0.7, a: 0.6, w: 0.06 },
  ],
  'ph-emf-c': [
    { c: 0.3, a: 0.6, w: 0.06 },
    { c: 0.7, a: -0.6, w: 0.06 },
  ],
  'ph-emf-d': [
    { c: 0.3, a: 0.8, w: 0.044 },
    { c: 0.7, a: -0.5, w: 0.07 },
  ],
  'ph-emf-e': [
    { c: 0.3, a: 0.5, w: 0.07 },
    { c: 0.7, a: 0.8, w: 0.044 },
  ],
  'ph-emf-f': [{ c: 0.5, a: 0.7, w: 0.07 }],
};

export function makeEmfOption(id: string) {
  const pulses = EMF_OPTIONS[id];
  return function EmfOptionGraph() {
    const spec: AxesSpec = { x: [0, 1], y: [-1, 1], box: { l: 20, r: 190, t: 12, b: 100 } };
    const { sx, sy } = axesScales(spec);
    const f = (t: number) => pulses.reduce((s, p) => s + p.a * Math.exp(-(((t - p.c) / p.w) ** 2)), 0);
    return (
      <svg viewBox="0 0 204 112" className="diagram diagram-option" role="img" aria-label="Voltage–time graph option">
        <ArrowDefs id={`${id}-arrow`} />
        <line x1={sx(0)} y1={sy(0)} x2={sx(1) + 8} y2={sy(0)} className="d-line d-thin" markerEnd={`url(#${id}-arrow)`} />
        <line x1={sx(0)} y1={sy(-1) + 6} x2={sx(0)} y2={sy(1) - 6} className="d-line d-thin" markerEnd={`url(#${id}-arrow)`} />
        <path d={samplePath(f, 0, 1, sx, sy, { n: 400 })} className="d-line d-thick d-accent-stroke" fill="none" />
        <Label x={sx(0) + 10} y={sy(1) - 2} kind="text" size={11}>V</Label>
        <Label x={sx(1) + 6} y={sy(0) + 11} kind="var" size={12}>t</Label>
      </svg>
    );
  };
}
