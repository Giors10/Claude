import React from 'react';
import {
  ArrowDefs,
  Battery,
  Dot,
  Grid,
  Junction,
  Label,
  Resistor,
  Svg,
  SwitchV,
  Wire,
  axesScales,
  range,
  samplePath,
  type AxesSpec,
  type Pt,
} from './kit';

/* Mock 3 · Physics diagrams -------------------------------------------------- */

/* Q6: a current-carrying wire between magnetic poles ---------------------------- */
export function P3PhMotor() {
  const cx = 200;
  const cy = 110;
  return (
    <Svg w={400} h={220} label="A north pole on the left faces a south pole on the right. Between them is a wire at right angles to the page, carrying a current into the page (shown by a cross in a circle). Dashed field lines run from the north pole to the south pole">
      <ArrowDefs id="p3mot-arrow" cls="d-ink-fill" />
      <rect x={20} y={40} width={90} height={140} rx={6} className="d-line d-area-strong" />
      <rect x={290} y={40} width={90} height={140} rx={6} className="d-line d-area-alt" />
      <Label x={65} y={110} kind="text" size={30}>
        N
      </Label>
      <Label x={335} y={110} kind="text" size={30}>
        S
      </Label>
      {[62, 86, 134, 158].map((y) => (
        <line key={y} x1={114} x2={286} y1={y} y2={y} className="d-line d-thin d-dash d-muted-stroke" markerEnd="url(#p3mot-arrow)" />
      ))}
      <circle cx={cx} cy={cy} r={16} className="d-line d-bg-fill" />
      <line x1={cx - 10} y1={cy - 10} x2={cx + 10} y2={cy + 10} className="d-line" />
      <line x1={cx - 10} y1={cy + 10} x2={cx + 10} y2={cy - 10} className="d-line" />
      <Label x={cx} y={206} kind="small">
        current into the page
      </Label>
    </Svg>
  );
}

/* Q15: six ray diagrams through a glass block --------------------------------- */
type RayPath = { inside: 'toward' | 'away' | 'straight'; exit: 'parallel' | 'straight' | 'toward' | 'wider' };

const BLOCKS: Record<string, { path: RayPath; label: string }> = {
  'p3-ph-block-a': { path: { inside: 'straight', exit: 'straight' }, label: 'The ray passes straight through the block without changing direction' },
  'p3-ph-block-b': { path: { inside: 'away', exit: 'parallel' }, label: 'The ray bends away from the normal as it enters the block and leaves parallel to its original direction' },
  'p3-ph-block-c': { path: { inside: 'toward', exit: 'straight' }, label: 'The ray bends towards the normal as it enters, then leaves the block without changing direction again' },
  'p3-ph-block-d': { path: { inside: 'toward', exit: 'toward' }, label: 'The ray bends towards the normal as it enters and bends towards the normal again as it leaves' },
  'p3-ph-block-e': { path: { inside: 'toward', exit: 'wider' }, label: 'The ray bends towards the normal as it enters and leaves at a larger angle to the normal than it arrived at' },
  'p3-ph-block-f': { path: { inside: 'toward', exit: 'parallel' }, label: 'The ray bends towards the normal as it enters and bends away from the normal as it leaves, parallel to its original direction' },
};

export function makeBlockOption(id: string) {
  const o = BLOCKS[id];
  return function BlockOption() {
    const top = 36;
    const bottom = 106;
    const x0 = 40;
    const x1 = 200;
    const hit: Pt = [70, top];
    const deg = Math.PI / 180;
    const i = 45;
    const r = o.path.inside === 'toward' ? 28 : o.path.inside === 'away' ? 58 : 45;
    // the incoming ray travels down and to the right at angle i to the (vertical) normal
    const start: Pt = [hit[0] - 32 * Math.tan(i * deg), top - 32];
    const exitPt: Pt = [hit[0] + (bottom - top) * Math.tan(r * deg), bottom];
    const outAngle = o.path.exit === 'parallel' ? i : o.path.exit === 'straight' ? r : o.path.exit === 'toward' ? Math.max(8, r - 14) : i + 14;
    const L = 36;
    const end: Pt = [exitPt[0] + L * Math.tan(outAngle * deg), bottom + L];
    return (
      <svg viewBox="0 0 230 150" className="diagram diagram-option" role="img" aria-label={o.label}>
        <ArrowDefs id={`arr-${id}`} cls="d-accent-fill" />
        <rect x={x0} y={top} width={x1 - x0} height={bottom - top} className="d-line d-water" />
        <line x1={hit[0]} x2={hit[0]} y1={top - 26} y2={top + 26} className="d-line d-thin d-dash d-muted-stroke" />
        <line x1={exitPt[0]} x2={exitPt[0]} y1={bottom - 26} y2={bottom + 26} className="d-line d-thin d-dash d-muted-stroke" />
        <line x1={start[0]} y1={start[1]} x2={hit[0]} y2={hit[1]} className="d-line d-accent-stroke" markerEnd={`url(#arr-${id})`} />
        <line x1={hit[0]} y1={hit[1]} x2={exitPt[0]} y2={exitPt[1]} className="d-line d-accent-stroke" />
        <line x1={exitPt[0]} y1={exitPt[1]} x2={end[0]} y2={end[1]} className="d-line d-accent-stroke" markerEnd={`url(#arr-${id})`} />
        <Label x={x1 - 6} y={top + 12} anchor="end" kind="small">
          glass
        </Label>
        <Label x={x1 + 5} y={top - 12} anchor="start" kind="small">
          air
        </Label>
      </svg>
    );
  };
}

/* Q20: I–V graph of a filament lamp ------------------------------------------ */
export const lampCurrent = (v: number) => 0.4 * Math.sign(v) * Math.pow(Math.abs(v) / 6, 0.6);

export function P3PhIV() {
  const spec: AxesSpec = { x: [0, 7], y: [0, 0.5], box: { l: 60, r: 406, t: 14, b: 224 } };
  const { sx, sy } = axesScales(spec);
  return (
    <Svg w={420} h={268} label="Current against potential difference for a filament lamp: a curve through the origin that gets less steep, passing through 0.40 A at 6.0 V">
      <Grid spec={spec} xs={range(0.5, 7, 0.5)} ys={range(0.05, 0.5, 0.05)} className="d-grid" />
      <Grid spec={spec} xs={range(1, 7, 1)} ys={range(0.1, 0.5, 0.1)} className="d-grid-major" />
      <line x1={sx(0)} x2={sx(7)} y1={sy(0)} y2={sy(0)} className="d-line" />
      <line x1={sx(0)} x2={sx(0)} y1={sy(0)} y2={sy(0.5)} className="d-line" />
      <path d={samplePath(lampCurrent, 0, 7, sx, sy, { n: 300 })} className="d-line d-thick d-accent-stroke" fill="none" />
      {range(0, 7, 1).map((v) => (
        <Label key={v} x={sx(v)} y={sy(0) + 13} kind="num" size={12}>
          {v}
        </Label>
      ))}
      {range(0, 0.5, 0.1).map((v) => (
        <Label key={v} x={sx(0) - 8} y={sy(v)} anchor="end" kind="num" size={12}>
          {v.toFixed(1)}
        </Label>
      ))}
      <Label x={(sx(0) + sx(7)) / 2} y={sy(0) + 34} kind="text" size={13}>
        potential difference / V
      </Label>
      <text x={16} y={(sy(0) + sy(0.5)) / 2} className="d-text" textAnchor="middle" transform={`rotate(-90 16 ${(sy(0) + sy(0.5)) / 2})`}>
        current / A
      </text>
    </Svg>
  );
}

/* Q23: series resistor, parallel branches and a switch -------------------------- */
export function P3PhNetwork() {
  const L = 56;
  const T = 50;
  const B = 280;
  const X1 = 250;
  const X2 = 360;
  return (
    <Svg w={452} h={300} label="A 12 V battery in series with a 2.0 ohm resistor and a parallel section. One branch is a 6.0 ohm resistor. The other branch has two 3.0 ohm resistors in series, with a switch S connected across the lower one">
      <Wire p={[[L, T], [X2, T], [X2, B], [L, B], [L, T]]} />
      <Wire p={[[X1, T], [X1, B]]} />
      <Wire p={[[X2, 170], [X2 + 44, 170], [X2 + 44, 256], [X2, 256]]} />
      <Battery at={[L, 165]} />
      <Label x={L - 24} y={165} anchor="end" kind="text">
        12 V
      </Label>
      <Resistor at={[150, T]} />
      <Label x={150} y={T - 20} kind="text">
        2.0 Ω
      </Label>
      <Resistor at={[X1, 165]} o="v" />
      <Label x={X1 - 18} y={165} anchor="end" kind="text">
        6.0 Ω
      </Label>
      <Resistor at={[X2, 115]} o="v" />
      <Label x={X2 - 18} y={115} anchor="end" kind="text">
        3.0 Ω
      </Label>
      <Resistor at={[X2, 213]} o="v" />
      <Label x={X2 - 18} y={213} anchor="end" kind="text">
        3.0 Ω
      </Label>
      <rect x={X2 + 38} y={196} width={12} height={34} className="d-bg-fill" />
      <SwitchV at={[X2 + 44, 213]} len={30} />
      <Label x={X2 + 64} y={213} anchor="start" kind="var">
        S
      </Label>
      <Junction at={[X1, T]} />
      <Junction at={[X1, B]} />
      <Junction at={[X2, 170]} />
      <Junction at={[X2, 256]} />
    </Svg>
  );
}

/* Q27: block on a table pulled by a hanging mass ---------------------------------- */
export function P3PhPulley() {
  const tableY = 120;
  const edgeX = 300;
  const pulley: Pt = [edgeX + 14, tableY - 12];
  return (
    <Svg w={400} h={290} label="A 2.0 kg block on a horizontal table is tied to a string that runs over a pulley at the table's edge to a hanging 3.0 kg mass">
      <rect x={30} y={tableY} width={edgeX - 30} height={14} className="d-line d-area" />
      <line x1={50} y1={tableY + 14} x2={50} y2={270} className="d-line" />
      <line x1={edgeX - 20} y1={tableY + 14} x2={edgeX - 20} y2={270} className="d-line" />
      <rect x={120} y={tableY - 52} width={80} height={52} className="d-line d-mass" />
      <Label x={160} y={tableY - 26} kind="text" size={14}>
        2.0 kg
      </Label>
      <line x1={200} y1={tableY - 26} x2={pulley[0]} y2={tableY - 26} className="d-line d-thin" />
      <circle cx={pulley[0]} cy={pulley[1]} r={14} className="d-line d-bg-fill" />
      <Dot at={pulley} r={2.4} />
      <line x1={edgeX} y1={tableY} x2={pulley[0]} y2={pulley[1]} className="d-line d-thin" />
      <line x1={pulley[0] + 14} y1={pulley[1]} x2={pulley[0] + 14} y2={196} className="d-line d-thin" />
      <rect x={pulley[0] - 18} y={196} width={64} height={56} className="d-line d-mass" />
      <Label x={pulley[0] + 14} y={224} kind="text" size={14}>
        3.0 kg
      </Label>
      <Label x={160} y={tableY + 34} kind="small">
        friction 5.0 N on the block
      </Label>
    </Svg>
  );
}

