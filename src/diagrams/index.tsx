import React from 'react';
import * as M1 from './m1';
import * as M2 from './m2';
import * as PH from './ph';

type DiagramComponent = () => React.ReactElement;

/** Every diagram used by the paper, keyed by the id referenced in the content. */
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
};

export function Diagram({ id }: { id: string }) {
  const C = DIAGRAMS[id];
  if (!C) return <div className="diagram-missing">Missing diagram: {id}</div>;
  return <C />;
}
