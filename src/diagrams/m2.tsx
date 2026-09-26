import React from 'react';
import { Dot, Eq, Frac, Grid, Label, Svg, axesScales, range, samplePath, type AxesSpec, type Pt } from './kit';

/* M2-20: six candidate graphs ------------------------------------------- */

interface LogOption {
  f: (x: number) => number;
  dom: [number, number];
  asym: number;
  dots: Pt[];
  label: string;
}

const LOG2 = (v: number) => Math.log(v) / Math.LN2;

const LOG_OPTIONS: Record<string, LogOption> = {
  'm2-log-a': { f: (x) => LOG2(x + 4), dom: [-4, 7], asym: -4, dots: [[-3, 0], [0, 2]], label: 'y = log2(x + 4)' },
  'm2-log-b': { f: (x) => -LOG2(4 - x), dom: [-7, 4], asym: 4, dots: [[3, 0], [0, -2]], label: 'y = −log2(4 − x)' },
  'm2-log-c': { f: (x) => LOG2(4 - x), dom: [-7, 4], asym: 4, dots: [[3, 0], [0, 2]], label: 'y = log2(4 − x)' },
  'm2-log-d': { f: (x) => LOG2(x - 4), dom: [4, 7], asym: 4, dots: [[5, 0]], label: 'y = log2(x − 4)' },
  'm2-log-e': { f: (x) => LOG2(-x - 4), dom: [-7, -4], asym: -4, dots: [[-5, 0]], label: 'y = log2(−x − 4)' },
  'm2-log-f': { f: (x) => 2 - LOG2(x), dom: [0, 7], asym: 0, dots: [[4, 0], [1, 2]], label: 'y = 2 − log2 x' },
};

export function makeLogOption(id: string) {
  const o = LOG_OPTIONS[id];
  return function LogOptionGraph() {
    const spec: AxesSpec = { x: [-7, 7], y: [-4, 4], box: { l: 8, r: 196, t: 8, b: 150 } };
    const { sx, sy } = axesScales(spec);
    const eps = 1e-6;
    // Sample densely near the asymptote so the curve reaches the plot edge.
    const [a, b] = o.dom;
    const lo = a === o.asym ? a + eps : a;
    const hi = b === o.asym ? b - eps : b;
    const path = samplePath(o.f, lo, hi, sx, sy, { n: 900, ymin: -4.6, ymax: 4.6 });
    return (
      <svg viewBox="0 0 204 158" className="diagram diagram-option" role="img" aria-label="Graph option">
        <defs>
          <clipPath id={`clip-${id}`}>
            <rect x={spec.box.l} y={spec.box.t} width={spec.box.r - spec.box.l} height={spec.box.b - spec.box.t} />
          </clipPath>
        </defs>
        <Grid spec={spec} xs={range(-7, 7, 1)} ys={range(-4, 4, 1)} className="d-grid" />
        <line x1={sx(-7)} x2={sx(7)} y1={sy(0)} y2={sy(0)} className="d-line d-thin" />
        <line x1={sx(0)} x2={sx(0)} y1={sy(-4)} y2={sy(4)} className="d-line d-thin" />
        <line x1={sx(o.asym)} x2={sx(o.asym)} y1={sy(-4)} y2={sy(4)} className="d-line d-dash d-asym" />
        <g clipPath={`url(#clip-${id})`}>
          <path d={path} className="d-line d-thick d-accent-stroke" fill="none" />
        </g>
        {o.dots.map(([x, y]) => (
          <Dot key={x + ',' + y} at={[sx(x), sy(y)]} r={2.8} />
        ))}
        {[4, -4].map((v) => {
          // A tick on the asymptote moves to the side the curve does not
          // occupy, so the dashed line never runs through the number.
          const side = v !== o.asym ? 0 : o.dom[0] === o.asym ? -1 : 1;
          return (
            <Label key={v} x={sx(v) + side * 3} y={sy(0) + 9} anchor={side < 0 ? 'end' : side > 0 ? 'start' : 'middle'} kind="num" size={10}>
              {v < 0 ? '−' + -v : v}
            </Label>
          );
        })}
        <Label x={sx(0) - 7} y={sy(2)} kind="num" size={10}>2</Label>
        <Label x={sx(0) - 9} y={sy(-2)} kind="num" size={10}>−2</Label>
        <Label x={sx(7) - 4} y={sy(0) - 7} kind="var" size={11}>x</Label>
        <Label x={sx(0) + 7} y={sy(4) + 6} kind="var" size={11}>y</Label>
      </svg>
    );
  };
}

/* Solution diagrams ------------------------------------------------------ */

/** M2-11: y = |x^2 - 4x| against horizontal lines. */
export function M2ModulusSolution() {
  const spec: AxesSpec = { x: [-1.2, 5.2], y: [-0.4, 6.2], box: { l: 16, r: 330, t: 10, b: 232 } };
  const { sx, sy } = axesScales(spec);
  const f = (x: number) => Math.abs(x * x - 4 * x);
  const lines: { k: number; cls: string; tex: string; note: string }[] = [
    { k: 2, cls: 'd-accent-stroke', tex: '0 < k < 4', note: ': 4 solutions' },
    { k: 4, cls: 'd-mark-stroke d-dash', tex: 'k = 4', note: ': 3 solutions' },
    { k: 5.3, cls: 'd-muted-stroke d-dash', tex: 'k > 4', note: ': 2 solutions' },
  ];
  return (
    <Svg w={488} h={246} label="Graph of y = |x² − 4x| with a hump of height 4 between x = 0 and x = 4, and horizontal lines y = k: four crossings for 0 < k < 4, three for k = 4, two for k > 4">
      <Grid spec={spec} xs={range(-1, 5, 1)} ys={range(0, 6, 1)} className="d-grid" />
      <line x1={sx(-1.2)} x2={sx(5.2)} y1={sy(0)} y2={sy(0)} className="d-line d-thin" />
      <line x1={sx(0)} x2={sx(0)} y1={sy(-0.4)} y2={sy(6.2)} className="d-line d-thin" />
      <path d={samplePath(f, -1.2, 5.2, sx, sy, { ymax: 6.2, n: 400 })} className="d-line d-thick" fill="none" />
      {lines.map((l) => (
        <g key={l.k}>
          <line x1={sx(-1.2)} x2={sx(5.2)} y1={sy(l.k)} y2={sy(l.k)} className={'d-line ' + l.cls} />
          <Eq x={sx(5.2) + 10} y={sy(l.k)} anchor="start" tex={l.tex} note={l.note} size={13} />
        </g>
      ))}
      {[2 - Math.sqrt(2), 2 + Math.sqrt(2), 2 - Math.sqrt(6), 2 + Math.sqrt(6)].map((x) => (
        <Dot key={x} at={[sx(x), sy(2)]} r={3.4} className="d-accent-fill" />
      ))}
      {[0, 4].map((v) => (
        <Label key={v} x={sx(v) + (v === 0 ? -8 : 0)} y={sy(0) + 12} kind="num" size={11}>
          {v}
        </Label>
      ))}
    </Svg>
  );
}

/** M2-27: y = x^3 and its tangent at (1, 1). */
export function M2TangentAreaSolution() {
  const spec: AxesSpec = { x: [-2.6, 1.8], y: [-10, 4], box: { l: 16, r: 330, t: 10, b: 236 } };
  const { sx, sy } = axesScales(spec);
  const cube = (x: number) => x * x * x;
  const tan = (x: number) => 3 * x - 2;
  const n = 120;
  const top: Pt[] = [];
  const bottom: Pt[] = [];
  for (let i = 0; i <= n; i++) {
    const x = -2 + (3 * i) / n;
    top.push([sx(x), sy(cube(x))]);
    bottom.push([sx(x), sy(tan(x))]);
  }
  const region = 'M' + top.map((p) => p.join(' ')).join(' L') + ' L' + bottom.reverse().map((p) => p.join(' ')).join(' L') + ' Z';
  return (
    <Svg w={346} h={250} label="The curve y = x cubed and its tangent y = 3x − 2 at (1, 1), meeting again at (−2, −8), with the enclosed region shaded">
      <Grid spec={spec} xs={range(-2, 1, 1)} ys={range(-10, 4, 2)} className="d-grid" />
      <path d={region} className="d-area-strong" />
      <line x1={sx(-2.6)} x2={sx(1.8)} y1={sy(0)} y2={sy(0)} className="d-line d-thin" />
      <line x1={sx(0)} x2={sx(0)} y1={sy(-10)} y2={sy(4)} className="d-line d-thin" />
      <path d={samplePath(cube, -2.6, 1.8, sx, sy, { ymin: -10, ymax: 4 })} className="d-line d-thick" fill="none" />
      <path d={samplePath(tan, -2.6, 1.8, sx, sy, { ymin: -10, ymax: 4 })} className="d-line d-thick d-accent-stroke" fill="none" />
      <Dot at={[sx(1), sy(1)]} r={3.4} className="d-mark-fill" />
      <Dot at={[sx(-2), sy(-8)]} r={3.4} className="d-mark-fill" />
      <Eq x={sx(1) - 8} y={sy(1) - 12} anchor="end" tex="(1, 1)" size={13} />
      <Eq x={sx(-2) + 10} y={sy(-8) + 4} anchor="start" tex="P(-2, -8)" size={13} />
      <Eq x={sx(1.28)} y={sy(3.3)} anchor="end" tex="y = x^3" size={14} />
      <Eq x={sx(0.35)} y={sy(-3.9)} anchor="start" tex="y = 3x - 2" size={14} className="d-accent-text" />
    </Svg>
  );
}

/** M2-21: the two regions between y = x^3 - x^2 - 2x and the x-axis. */
export function M2CubicAreaSolution() {
  const spec: AxesSpec = { x: [-1.5, 2.6], y: [-2.5, 1.3], box: { l: 16, r: 330, t: 10, b: 226 } };
  const { sx, sy } = axesScales(spec);
  const f = (x: number) => x * x * x - x * x - 2 * x;
  const regionPath = (a: number, b: number) => {
    const n = 80;
    let d = `M${sx(a)} ${sy(0)}`;
    for (let i = 0; i <= n; i++) {
      const x = a + ((b - a) * i) / n;
      d += ` L${sx(x).toFixed(2)} ${sy(f(x)).toFixed(2)}`;
    }
    return d + ` L${sx(b)} ${sy(0)} Z`;
  };
  return (
    <Svg w={346} h={240} label="The cubic y = x³ − x² − 2x, above the axis between −1 and 0 (area 5/12) and below it between 0 and 2 (area 8/3)">
      <Grid spec={spec} xs={range(-1, 2, 1)} ys={range(-2, 1, 1)} className="d-grid" />
      <path d={regionPath(-1, 0)} className="d-area-strong" />
      <path d={regionPath(0, 2)} className="d-area-alt" />
      <line x1={sx(-1.5)} x2={sx(2.6)} y1={sy(0)} y2={sy(0)} className="d-line d-thin" />
      <line x1={sx(0)} x2={sx(0)} y1={sy(-2.5)} y2={sy(1.3)} className="d-line d-thin" />
      <path d={samplePath(f, -1.5, 2.6, sx, sy, { ymin: -2.5, ymax: 1.3 })} className="d-line d-thick" fill="none" />
      <Frac x={sx(-0.5)} y={sy(0.3)} n="5" d="12" size={12} />
      <Frac x={sx(1.05)} y={sy(-1.0)} n="8" d="3" size={13} />
      {/* Each label sits on the side of the axis the curve is not on. */}
      <Label x={sx(-1) + 10} y={sy(0) + 12} kind="num" size={12}>
        −1
      </Label>
      <Label x={sx(1)} y={sy(0) - 11} kind="num" size={12}>
        1
      </Label>
      <Label x={sx(2) + 9} y={sy(0) + 12} kind="num" size={12}>
        2
      </Label>
    </Svg>
  );
}
