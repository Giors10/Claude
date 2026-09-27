import React from 'react';
import * as M1 from './m1';
import * as M2 from './m2';
import * as PH from './ph';
import * as P2M1 from './p2m1';
import * as P2PH from './p2ph';
import * as P2M2 from './p2m2';
import * as P3M1 from './p3m1';
import * as P3PH from './p3ph';
import * as P3M2 from './p3m2';

type DiagramComponent = () => React.ReactElement;

/** Every diagram used by the papers, keyed by the id referenced in the content. */
export const DIAGRAMS: Record<string, DiagramComponent> = {
  'm1-speed-time': M1.M1SpeedTime,
  'm1-circle-theorem': M1.M1CircleTheorem,
  'm1-cumfreq': M1.M1CumFreq,
  'm1-cone-slices': M1.M1ConeSlices,
  'm1-vectors': M1.M1Vectors,
  'm1-histogram': M1.M1Histogram,
  'm1-inscribed-circle': M1.M1InscribedCircle,
  'm1-inscribed-circle-sol': M1.M1InscribedCircleSolution,
  'm1-pyramid': M1.M1Pyramid,
  'm1-pyramid-sol': M1.M1PyramidSolution,
  'm1-lattice-sol': M1.M1LatticeSolution,
  'm1-exp-quad-sol': M1.M1ExpQuadSolution,

  'm2-log-a': M2.makeLogOption('m2-log-a'),
  'm2-log-b': M2.makeLogOption('m2-log-b'),
  'm2-log-c': M2.makeLogOption('m2-log-c'),
  'm2-log-d': M2.makeLogOption('m2-log-d'),
  'm2-log-e': M2.makeLogOption('m2-log-e'),
  'm2-log-f': M2.makeLogOption('m2-log-f'),
  'm2-modulus-sol': M2.M2ModulusSolution,
  'm2-tangent-area-sol': M2.M2TangentAreaSolution,
  'm2-cubic-area-sol': M2.M2CubicAreaSolution,

  'ph-utube': PH.PhUtube,
  'ph-thermistor': PH.PhThermistor,
  'ph-lift': PH.PhLift,
  'ph-switch-circuit': PH.PhSwitchCircuit,
  'ph-springs': PH.PhSprings,
  'ph-voltmeter': PH.PhVoltmeter,
  'ph-iv-graph': PH.PhIvGraph,
  'ph-emf-a': PH.makeEmfOption('ph-emf-a'),
  'ph-emf-b': PH.makeEmfOption('ph-emf-b'),
  'ph-emf-c': PH.makeEmfOption('ph-emf-c'),
  'ph-emf-d': PH.makeEmfOption('ph-emf-d'),
  'ph-emf-e': PH.makeEmfOption('ph-emf-e'),
  'ph-emf-f': PH.makeEmfOption('ph-emf-f'),

  // Mock 2 (Forge)
  'p2-m1-trig': P2M1.P2M1Trig,
  'p2-m1-lines-sol': P2M1.P2M1LinesSolution,
  'p2-m1-bearings-sol': P2M1.P2M1BearingsSolution,
  'p2-m1-goals': P2M1.P2M1Goals,
  'p2-m1-region-sol': P2M1.P2M1RegionSolution,
  'p2-m1-cyclic': P2M1.P2M1Cyclic,
  'p2-m1-trough': P2M1.P2M1Trough,
  'p2-m1-views': P2M1.P2M1Views,
  'p2-ph-wave': P2PH.P2PhWave,
  'p2-ph-diodes': P2PH.P2PhDiodes,
  'p2-ph-gen': P2PH.P2PhGenerator,
  'p2-ph-gen-a': P2PH.makeGenOption('p2-ph-gen-a'),
  'p2-ph-gen-b': P2PH.makeGenOption('p2-ph-gen-b'),
  'p2-ph-gen-c': P2PH.makeGenOption('p2-ph-gen-c'),
  'p2-ph-gen-d': P2PH.makeGenOption('p2-ph-gen-d'),
  'p2-ph-gen-e': P2PH.makeGenOption('p2-ph-gen-e'),
  'p2-ph-gen-f': P2PH.makeGenOption('p2-ph-gen-f'),
  'p2-ph-mirrors': P2PH.P2PhMirrors,
  'p2-ph-mirrors-sol': P2PH.P2PhMirrorsSolution,
  'p2-ph-spring': P2PH.P2PhSpring,
  'p2-ph-vt': P2PH.P2PhVt,
  'p2-ph-vt-sol': P2PH.P2PhVtSolution,
  'p2-ph-heating': P2PH.P2PhHeating,
  'p2-ph-circuit': P2PH.P2PhCircuit,
  'p2-m2-circle': P2M2.P2M2Circle,
  'p2-m2-parabola': P2M2.P2M2Parabola,
  'p2-m2-quartic-sol': P2M2.P2M2QuarticSolution,

  // Mock 3 (Anvil)
  'p3-m1-cubic-a': P3M1.makeCubicOption('p3-m1-cubic-a'),
  'p3-m1-cubic-b': P3M1.makeCubicOption('p3-m1-cubic-b'),
  'p3-m1-cubic-c': P3M1.makeCubicOption('p3-m1-cubic-c'),
  'p3-m1-cubic-d': P3M1.makeCubicOption('p3-m1-cubic-d'),
  'p3-m1-cubic-e': P3M1.makeCubicOption('p3-m1-cubic-e'),
  'p3-m1-cubic-f': P3M1.makeCubicOption('p3-m1-cubic-f'),
  'p3-m1-sales': P3M1.P3M1Sales,
  'p3-m1-scatter': P3M1.P3M1Scatter,
  'p3-m1-tangent': P3M1.P3M1Tangent,
  'p3-m1-venn-sol': P3M1.P3M1VennSolution,
  'p3-m1-cuboid': P3M1.P3M1Cuboid,
  'p3-m1-transform-sol': P3M1.P3M1TransformSolution,
  'p3-m1-vectors': P3M1.P3M1Vectors,
  'p3-m1-trapezium': P3M1.P3M1Trapezium,
  'p3-m1-trapezium-sol': P3M1.P3M1TrapeziumSolution,
  'p3-ph-motor': P3PH.P3PhMotor,
  'p3-ph-block-a': P3PH.makeBlockOption('p3-ph-block-a'),
  'p3-ph-block-b': P3PH.makeBlockOption('p3-ph-block-b'),
  'p3-ph-block-c': P3PH.makeBlockOption('p3-ph-block-c'),
  'p3-ph-block-d': P3PH.makeBlockOption('p3-ph-block-d'),
  'p3-ph-block-e': P3PH.makeBlockOption('p3-ph-block-e'),
  'p3-ph-block-f': P3PH.makeBlockOption('p3-ph-block-f'),
  'p3-ph-iv': P3PH.P3PhIV,
  'p3-ph-network': P3PH.P3PhNetwork,
  'p3-ph-pulley': P3PH.P3PhPulley,
  'p3-m2-circle-sol': P3M2.P3M2CircleSolution,
  'p3-m2-abs-sol': P3M2.P3M2AbsSolution,
  'p3-m2-apollonius-sol': P3M2.P3M2ApolloniusSolution,
  'p3-m2-tn-sol': P3M2.P3M2TangentNormalSolution,
  'p3-m2-rect': P3M2.P3M2Rect,
  'p3-m2-cubic-trap-sol': P3M2.P3M2CubicTrapSolution,
  'p3-m2-sector': P3M2.P3M2Sector,
  'p3-m2-sector-sol': P3M2.P3M2SectorSolution,
  'p3-m2-halve-sol': P3M2.P3M2HalveSolution,
  'p3-m2-tangents-sol': P3M2.P3M2TangentsSolution,
  'p3-m2-f': P3M2.P3M2F,
  'p3-m2-tf-a': P3M2.makeTransformOption('p3-m2-tf-a'),
  'p3-m2-tf-b': P3M2.makeTransformOption('p3-m2-tf-b'),
  'p3-m2-tf-c': P3M2.makeTransformOption('p3-m2-tf-c'),
  'p3-m2-tf-d': P3M2.makeTransformOption('p3-m2-tf-d'),
  'p3-m2-tf-e': P3M2.makeTransformOption('p3-m2-tf-e'),
  'p3-m2-tf-f': P3M2.makeTransformOption('p3-m2-tf-f'),
};

export function Diagram({ id }: { id: string }) {
  const C = DIAGRAMS[id];
  if (!C) return <div className="diagram-missing">Missing diagram: {id}</div>;
  return <C />;
}
