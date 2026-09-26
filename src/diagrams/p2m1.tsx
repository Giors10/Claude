import React from 'react';
import {
  AngleArc,
  ArrowDefs,
  Dimension,
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

/* Mock 2 · Mathematics 1 diagrams ---------------------------------------- */

const rad = (d: number) => (d * Math.PI) / 180;

/** Direction of the ray p → q in degrees, measured anticlockwise on screen. */
function dir(p: Pt, q: Pt): number {
  return (Math.atan2(-(q[1] - p[1]), q[0] - p[0]) * 180) / Math.PI;
}

/** The minor arc between two ray directions, as AngleArc wants it (from < to, less than 180° apart). */
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

/* Q9: y = 1 − 2cos x ----------------------------------------------------- */
export function P2M1Trig() {
  const spec: AxesSpec = { x: [0, 372], y: [-1.7, 3.6], box: { l: 44, r: 420, t: 14, b: 236 } };
  const { sx, sy } = axesScales(spec);
  const f = (x: number) => 1 - 2 * Math.cos(rad(x));
  return (
    <Svg w={440} h={262} label="Graph of y = f(x) for x from 0 to 360 degrees: it starts at y = −1, rises through y = 0 at 60 degrees and y = 1 at 90 degrees to a maximum of 3 at 180 degrees, then falls through 1 at 270 degrees and 0 at 300 degrees back to −1 at 360 degrees">
      <ArrowDefs id="p2trig-arrow" />
      <Grid spec={spec} xs={range(30, 360, 30)} ys={range(-1.5, 3.5, 0.5)} className="d-grid" />
      <Grid spec={spec} xs={range(90, 360, 90)} ys={[-1, 1, 2, 3]} className="d-grid-major" />
      <line x1={sx(0)} x2={sx(372)} y1={sy(0)} y2={sy(0)} className="d-line d-thin" markerEnd="url(#p2trig-arrow)" />
      <line x1={sx(0)} x2={sx(0)} y1={sy(-1.7)} y2={sy(3.6)} className="d-line d-thin" markerEnd="url(#p2trig-arrow)" />
      <path d={samplePath(f, 0, 360, sx, sy, { n: 360 })} className="d-line d-thick d-accent-stroke" fill="none" />
      {[90, 180, 270, 360].map((v) => (
        <Label key={v} x={sx(v)} y={sy(0) + 13} kind="num" size={12}>
          {v}°
        </Label>
      ))}
      {[-1, 1, 2, 3].map((v) => (
        <Label key={v} x={sx(0) - 8} y={sy(v)} anchor="end" kind="num" size={12}>
          {v < 0 ? '−' + -v : v}
        </Label>
      ))}
      <Label x={sx(0) - 8} y={sy(0) + 10} anchor="end" kind="num" size={12}>
        O
      </Label>
      <Label x={sx(372) - 2} y={sy(0) - 12} kind="var" size={15}>
        x
      </Label>
      <Label x={sx(0) + 12} y={sy(3.6) + 4} kind="var" size={15}>
        y
      </Label>
    </Svg>
  );
}

/* Q13 solution: the two lines and the triangle ------------------------------ */
export function P2M1LinesSolution() {
  const spec: AxesSpec = { x: [-2.2, 3.4], y: [-2.2, 3.2], box: { l: 10, r: 380, t: 10, b: 368 } };
  const { sx, sy } = axesScales(spec);
  const X: Pt = [sx(0.4), sy(-0.8)];
  const O: Pt = [sx(0), sy(0)];
  const Y1: Pt = [sx(0), sy(-1)];
  return (
    <Svg w={390} h={378} label="The line x − 2y = 2 crosses the y-axis at (0, −1); the perpendicular line y = −2x passes through (−1, 2) and the origin; they meet at (2/5, −4/5), and the shaded triangle between them and the y-axis has base 1 and height 2/5">
      <Grid spec={spec} xs={range(-2, 3, 1)} ys={range(-2, 3, 1)} className="d-grid" />
      <line x1={sx(-2.2)} x2={sx(3.4)} y1={sy(0)} y2={sy(0)} className="d-line d-thin" />
      <line x1={sx(0)} x2={sx(0)} y1={sy(-2.2)} y2={sy(3.2)} className="d-line d-thin" />
      <polygon points={pts([O, Y1, X])} className="d-area-strong" />
      <path d={samplePath((x) => x / 2 - 1, -2.2, 3.4, sx, sy, { ymin: -2.2, ymax: 3.2 })} className="d-line d-thick" fill="none" />
      <path d={samplePath((x) => -2 * x, -1.6, 1.1, sx, sy, { ymin: -2.2, ymax: 3.2 })} className="d-line d-thick d-accent-stroke" fill="none" />
      <RightAngle c={X} a={[sx(2), sy(0)]} b={O} s={9} />
      <Dot at={[sx(-1), sy(2)]} r={3.2} className="d-accent-fill" />
      <Dot at={X} r={3} />
      <Dot at={Y1} r={3} />
      <Label x={sx(-1) + 10} y={sy(2) - 2} anchor="start" kind="num" size={13}>
        (−1, 2)
      </Label>
      <Label x={sx(0.4) + 10} y={sy(-0.8) + 12} anchor="start" kind="num" size={13}>
        (0.4, −0.8)
      </Label>
      <Label x={sx(0) - 8} y={sy(-1) - 13} anchor="end" kind="num" size={13}>
        (0, −1)
      </Label>
      <Eq x={sx(2.2)} y={sy(0.55) - 12} tex="x - 2y = 2" size={14} />
      <Eq x={sx(0.98) + 8} y={sy(-1.96)} tex="y = -2x" anchor="start" size={14} className="d-accent-text" />
    </Svg>
  );
}

/* Q17 solution: the voyage ---------------------------------------------------- */
export function P2M1BearingsSolution() {
  const k = 14; // px per km
  const H: Pt = [52, 142];
  const move = (p: Pt, dist: number, bearing: number): Pt => [p[0] + dist * k * Math.sin(rad(bearing)), p[1] - dist * k * Math.cos(rad(bearing))];
  const P = move(H, 10, 60);
  const E = move(P, 10 * Math.sqrt(3), 150);
  const north = (p: Pt) => <line x1={p[0]} y1={p[1]} x2={p[0]} y2={p[1] - 46} className="d-line d-thin" markerEnd="url(#p2brg-arrow)" />;
  const mid = (a: Pt, b: Pt): Pt => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  return (
    <Svg w={360} h={300} label="The ship sails 10 km on a bearing of 060 degrees, turns through a right angle and sails 10√3 km on 150 degrees; it ends 20 km from the harbour H on a bearing of 120 degrees, so the return bearing is 300 degrees">
      <ArrowDefs id="p2brg-arrow" />
      {north(H)}
      {north(P)}
      {north(E)}
      <Label x={H[0]} y={H[1] - 54} kind="text" size={12}>
        N
      </Label>
      <Label x={P[0]} y={P[1] - 54} kind="text" size={12}>
        N
      </Label>
      <Label x={E[0]} y={E[1] - 54} kind="text" size={12}>
        N
      </Label>
      <polyline points={pts([H, P, E])} className="d-line d-thick d-accent-stroke" fill="none" />
      <line x1={H[0]} y1={H[1]} x2={E[0]} y2={E[1]} className="d-line d-dash" />
      <RightAngle c={P} a={H} b={E} s={10} />
      <AngleArc c={H} r={24} from={30} to={90} />
      <AngleArc c={H} r={34} from={-30} to={30} className="d-line d-thin d-mark-stroke" />
      <Label {...lp(polar(H, 36, 62))} kind="num" size={12}>
        60°
      </Label>
      <Label {...lp(polar(H, 50, 2))} kind="num" size={12} className="d-accent-text">
        60°
      </Label>
      <Dot at={H} />
      <Label x={H[0] - 12} y={H[1] + 4} kind="var">
        H
      </Label>
      <Label x={mid(H, P)[0] - 9} y={mid(H, P)[1] - 14} kind="num" size={13}>
        10
      </Label>
      <Label x={mid(P, E)[0] + 14} y={mid(P, E)[1]} kind="num" size={13} anchor="start">
        10√3
      </Label>
      <Label x={mid(H, E)[0] - 10} y={mid(H, E)[1] + 12} kind="num" size={13} anchor="end">
        20
      </Label>
    </Svg>
  );
}

function lp(p: Pt) {
  return { x: p[0], y: p[1] };
}

/* Q19: vertical line chart with two lines missing ---------------------------- */
export function P2M1Goals() {
  const spec: AxesSpec = { x: [-0.6, 5.6], y: [0, 6.4], box: { l: 56, r: 404, t: 16, b: 222 } };
  const { sx, sy } = axesScales(spec);
  const shown: [number, number][] = [
    [0, 3],
    [2, 5],
    [4, 2],
    [5, 1],
  ];
  return (
    <Svg w={420} h={270} label="Vertical line chart: 0 goals in 3 matches, 2 goals in 5 matches, 4 goals in 2 matches and 5 goals in 1 match; the lines for 1 goal and 3 goals are missing">
      <Grid spec={spec} xs={[]} ys={range(1, 6, 1)} className="d-grid" />
      <line x1={sx(-0.6)} x2={sx(5.6)} y1={sy(0)} y2={sy(0)} className="d-line" />
      <line x1={sx(-0.6)} x2={sx(-0.6)} y1={sy(0)} y2={sy(6.4)} className="d-line" />
      {shown.map(([x, f]) => (
        <g key={x}>
          <line x1={sx(x)} x2={sx(x)} y1={sy(0)} y2={sy(f)} className="d-line d-thick d-accent-stroke" />
          <Dot at={[sx(x), sy(f)]} r={3.4} className="d-accent-fill" />
        </g>
      ))}
      {[1, 3].map((x) => (
        <Label key={x} x={sx(x)} y={sy(0) - 12} kind="text" size={14} className="d-accent-text">
          ?
        </Label>
      ))}
      {range(0, 5, 1).map((v) => (
        <Label key={v} x={sx(v)} y={sy(0) + 14} kind="num" size={13}>
          {v}
        </Label>
      ))}
      {range(0, 6, 1).map((v) => (
        <Label key={v} x={sx(-0.6) - 8} y={sy(v)} anchor="end" kind="num" size={13}>
          {v}
        </Label>
      ))}
      <Label x={(sx(-0.6) + sx(5.6)) / 2} y={258} kind="text">
        number of goals in a match
      </Label>
      <text x={16} y={(sy(0) + sy(6.4)) / 2} className="d-text" textAnchor="middle" transform={`rotate(-90 16 ${(sy(0) + sy(6.4)) / 2})`}>
        number of matches
      </text>
    </Svg>
  );
}

/* Q22 solution: the region and its lattice points ------------------------------ */
export function P2M1RegionSolution() {
  const spec: AxesSpec = { x: [-1.4, 6.6], y: [-0.6, 6.6], box: { l: 10, r: 410, t: 10, b: 370 } };
  const { sx, sy } = axesScales(spec);
  const inside: Pt[] = [];
  const boundaryOut: Pt[] = [];
  for (let y = 1; y <= 6; y++) {
    for (let x = -1; x <= 6; x++) {
      const ok = y < 2 * x + 1 && x + y <= 6 && y >= 1;
      if (ok) inside.push([x, y]);
      else if (y === 2 * x + 1 && x + y <= 6) boundaryOut.push([x, y]);
    }
  }
  const tri: Pt[] = [
    [0, 1],
    [5, 1],
    [5 / 3, 13 / 3],
  ];
  return (
    <Svg w={420} h={380} label="The region above y = 1, below x + y = 6 and strictly below y = 2x + 1 is a triangle; it contains 12 lattice points: 5 on y = 1, 4 on y = 2, 2 on y = 3 and 1 on y = 4. The points (0, 1) and (1, 3) lie on the dashed boundary and are excluded">
      <Grid spec={spec} xs={range(-1, 6, 1)} ys={range(0, 6, 1)} className="d-grid" />
      <line x1={sx(-1.4)} x2={sx(6.6)} y1={sy(0)} y2={sy(0)} className="d-line d-thin" />
      <line x1={sx(0)} x2={sx(0)} y1={sy(-0.6)} y2={sy(6.6)} className="d-line d-thin" />
      <polygon points={pts(tri.map(([x, y]) => [sx(x), sy(y)]))} className="d-area" />
      <path d={samplePath((x) => 2 * x + 1, -0.8, 2.8, sx, sy, { ymin: -0.6, ymax: 6.6 })} className="d-line d-dash d-accent-stroke" fill="none" />
      <path d={samplePath((x) => 6 - x, -0.4, 6.6, sx, sy, { ymin: -0.6, ymax: 6.6 })} className="d-line" fill="none" />
      <line x1={sx(-1.4)} x2={sx(6.6)} y1={sy(1)} y2={sy(1)} className="d-line" />
      {inside.map(([x, y]) => (
        <Dot key={x + ',' + y} at={[sx(x), sy(y)]} r={4.2} className="d-accent-fill" />
      ))}
      {boundaryOut.map(([x, y]) => (
        <circle key={x + ',' + y} cx={sx(x)} cy={sy(y)} r={4.2} className="d-line d-bg-fill" />
      ))}
      {range(1, 5, 1).map((v) => (
        <Label key={'x' + v} x={sx(v)} y={sy(0) + 13} kind="num" size={12}>
          {v}
        </Label>
      ))}
      {range(2, 5, 1).map((v) => (
        <Label key={'y' + v} x={sx(0) - 10} y={sy(v)} anchor="end" kind="num" size={12}>
          {v}
        </Label>
      ))}
      <Eq x={sx(2.6) + 8} y={sy(6.2)} tex="y = 2x + 1" anchor="start" size={13} className="d-accent-text" />
      <Eq x={sx(5.1)} y={sy(1.9)} tex="x + y = 6" anchor="start" size={13} />
      <Eq x={sx(-1.3)} y={sy(1) - 12} tex="y = 1" anchor="start" size={13} />
    </Svg>
  );
}

/* Q23: cyclic quadrilateral ------------------------------------------------------- */
export function P2M1Cyclic() {
  const O: Pt = [180, 158];
  const R = 124;
  const A = polar(O, R, 110);
  const B = polar(O, R, 34);
  const C = polar(O, R, -76);
  const D = polar(O, R, 184);
  const angleAt = (v: Pt, p: Pt, q: Pt, r: number, text: string, off = 18, cls?: string, labelDeg?: number) => {
    const g = between(dir(v, p), dir(v, q));
    return (
      <g>
        <AngleArc c={v} r={r} from={g.from} to={g.to} className={cls} />
        <Label {...lp(polar(v, r + off, labelDeg ?? g.mid))} kind={text === 'x' ? 'var' : 'num'} size={text === 'x' ? 16 : 13}>
          {text}
        </Label>
      </g>
    );
  };
  return (
    <Svg w={360} h={316} label="Cyclic quadrilateral ABCD with diagonals AC and BD; angle BAD is 105 degrees, angle ADB is 38 degrees and angle ACD is marked x">
      <circle cx={O[0]} cy={O[1]} r={R} className="d-line" fill="none" />
      <polygon points={pts([A, B, C, D])} className="d-line" fill="none" />
      <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} className="d-line d-thin" />
      <line x1={B[0]} y1={B[1]} x2={D[0]} y2={D[1]} className="d-line d-thin" />
      {/* the diagonal AC runs through the middle of angle BAD, so its label sits between AB and AC */}
      {angleAt(A, B, D, 26, '105°', 20, undefined, dir(A, B) - 26)}
      {angleAt(D, A, B, 36, '38°', 16)}
      {angleAt(C, A, D, 30, 'x', 14, 'd-line d-accent-stroke')}
      {[A, B, C, D].map((p, i) => (
        <Dot key={i} at={p} r={2.8} />
      ))}
      <Label x={A[0] - 8} y={A[1] - 12} kind="var">
        A
      </Label>
      <Label x={B[0] + 14} y={B[1] - 6} kind="var">
        B
      </Label>
      <Label x={C[0] + 6} y={C[1] + 15} kind="var">
        C
      </Label>
      <Label x={D[0] - 14} y={D[1] + 2} kind="var">
        D
      </Label>
    </Svg>
  );
}

/* Q24: trough cross-section ------------------------------------------------------ */
export function P2M1Trough() {
  const s = 3.6; // px per cm
  const x0 = 60;
  const top = 44;
  const bottom = top + 30 * s;
  const TL: Pt = [x0, top];
  const TR: Pt = [x0 + 80 * s, top];
  const BR: Pt = [x0 + 60 * s, bottom];
  const BL: Pt = [x0 + 20 * s, bottom];
  const hw = 0.42; // drawn water depth as a fraction of the full depth (not to scale)
  const wy = bottom - 30 * s * hw;
  const wl: Pt = [BL[0] - 20 * s * hw, wy];
  const wr: Pt = [BR[0] + 20 * s * hw, wy];
  return (
    <Svg w={420} h={214} label="Cross-section of the trough: an isosceles trapezium 80 cm wide at the top, 40 cm wide at the bottom and 30 cm deep, with water to an unknown depth h; not drawn to scale">
      <ArrowDefs id="p2tr-dim" />
      <polygon points={pts([BL, BR, wr, wl])} className="d-water" />
      <polygon points={pts([TL, TR, BR, BL])} className="d-line" fill="none" />
      <line x1={wl[0]} x2={wr[0]} y1={wy} y2={wy} className="d-line d-thin d-accent-stroke" />
      <Dimension a={[TL[0], top - 18]} b={[TR[0], top - 18]} label="80 cm" id="p2tr-dim" side="above" />
      <line x1={TL[0]} x2={TL[0]} y1={top - 24} y2={top - 4} className="d-line d-thin" />
      <line x1={TR[0]} x2={TR[0]} y1={top - 24} y2={top - 4} className="d-line d-thin" />
      <Dimension a={[BL[0], bottom + 18]} b={[BR[0], bottom + 18]} label="40 cm" id="p2tr-dim" side="below" />
      <line x1={BL[0]} x2={BL[0]} y1={bottom + 4} y2={bottom + 24} className="d-line d-thin" />
      <line x1={BR[0]} x2={BR[0]} y1={bottom + 4} y2={bottom + 24} className="d-line d-thin" />
      <Dimension a={[TR[0] + 22, top]} b={[TR[0] + 22, bottom]} label="30 cm" id="p2tr-dim" side="right" />
      <line x1={BR[0] + 4} x2={TR[0] + 28} y1={bottom} y2={bottom} className="d-line d-thin d-dash" />
      <line x1={BL[0] - 30} x2={BL[0] - 30} y1={wy + 1} y2={bottom - 1} className="d-line d-thin" markerStart="url(#p2tr-dim)" markerEnd="url(#p2tr-dim)" />
      <line x1={BL[0] - 36} x2={BL[0] - 4} y1={bottom} y2={bottom} className="d-line d-thin d-dash" />
      <Label x={BL[0] - 40} y={(wy + bottom) / 2} kind="var" anchor="end">
        h
      </Label>
      <Label x={TR[0] + 44} y={bottom + 44} anchor="end" kind="small">
        not to scale
      </Label>
    </Svg>
  );
}

/* Q25: plan and elevations --------------------------------------------------------- */
export function P2M1Views() {
  const u = 30;
  const base = 112; // ground line of the elevations
  const square = (x: number, y: number, key: string, cls = 'd-line d-area') => <rect key={key} x={x} y={y} width={u} height={u} className={cls} />;
  const planX = 24;
  const planY = base - 2 * u;
  const frontX = 184;
  const front = [2, 3, 1];
  const sideX = 332;
  const side = [3, 2];
  return (
    <Svg w={410} h={180} label="Three views of a solid made of cubes. Plan: a 3 by 2 rectangle of squares, all filled, with the front along the bottom edge. Front elevation: columns of heights 2, 3 and 1 from left to right. Side elevation viewed from the right: the front column is 3 high and the back column is 2 high">
      {[0, 1, 2].flatMap((i) => [0, 1].map((j) => square(planX + i * u, planY + j * u, `p${i}${j}`)))}
      {front.flatMap((h, i) => Array.from({ length: h }, (_, k) => square(frontX + i * u, base - (k + 1) * u, `f${i}${k}`)))}
      {side.flatMap((h, i) => Array.from({ length: h }, (_, k) => square(sideX + i * u, base - (k + 1) * u, `s${i}${k}`)))}
      <Label x={planX + 1.5 * u} y={base + 14} kind="small">
        front
      </Label>
      <Label x={planX + 3 * u + 6} y={planY + u} anchor="start" kind="small">
        right
      </Label>
      <Label x={sideX + u / 2} y={base + 14} kind="small">
        front
      </Label>
      <Label x={sideX + 1.5 * u} y={base + 14} kind="small">
        back
      </Label>
      <Label x={planX + 1.5 * u} y={base + 40} kind="text" size={13}>
        Plan
      </Label>
      <Label x={frontX + 1.5 * u} y={base + 40} kind="text" size={13}>
        Front elevation
      </Label>
      <Label x={sideX + u} y={base + 40} kind="text" size={13}>
        Side elevation
      </Label>
      <Label x={sideX + u} y={base + 56} kind="small">
        (from the right)
      </Label>
    </Svg>
  );
}
