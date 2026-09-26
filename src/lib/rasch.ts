import type { Difficulty, Question } from '../content/types';

/**
 * Rasch (one-parameter IRT) scoring, the method UAT-UK uses for the ESAT.
 *
 * The reported scale is linear in ability θ, fixed so that the median
 * October candidate scores 4.5 and the 90th percentile scores 7.0, with
 * scores capped to [1.0, 9.0]. Two constants are calibrated so that a
 * typical ESAT module reproduces widely reported conversions
 * (≈12/27 → 4.5, ≈17/27 → 6.0, ≈20/27 → 7.0, 25+/27 → 9.0):
 *   - the spread of candidate ability, THETA_SD (logits);
 *   - the item difficulties of a "standard" ESAT module.
 * Mock-paper questions are placed on the same scale from their difficulty
 * rating, so a typical raw mark on a (harder) mock converts to a higher
 * score than the same raw mark on a standard paper.
 */

export const MEDIAN_SCORE = 4.5;
export const P90_SCORE = 7.0;
const Z90 = 1.2815515655446004;
export const THETA_SD = 1.3;
/** Scaled-score points per logit. */
export const SLOPE = (P90_SCORE - MEDIAN_SCORE) / (Z90 * THETA_SD);

/** Logit difficulty for each Crucible difficulty rating. */
export const DIFFICULTY_LOGIT: Record<Difficulty, number> = {
  1: -0.9,
  2: -0.1,
  3: 0.7,
  4: 1.5,
  5: 2.3,
};

/** Item difficulties of a typical ESAT module (27 items, calibrated). */
export const STANDARD_ITEMS: number[] = Array.from({ length: 27 }, (_, i) => 0.3 + (2.0 * (i - 13)) / 13);

export function itemDifficulty(q: Pick<Question, 'difficulty'>): number {
  return DIFFICULTY_LOGIT[q.difficulty];
}

export function pCorrect(theta: number, b: number): number {
  return 1 / (1 + Math.exp(-(theta - b)));
}

export function expectedRaw(theta: number, items: number[]): number {
  return items.reduce((s, b) => s + pCorrect(theta, b), 0);
}

/**
 * Maximum-likelihood ability for a raw score. In the Rasch model the raw
 * score is a sufficient statistic, so this does not depend on *which*
 * questions were answered correctly. Zero and perfect scores use the usual
 * ±0.3 adjustment so the estimate stays finite.
 */
export function thetaForRaw(raw: number, items: number[]): number {
  const n = items.length;
  if (n === 0) return 0;
  const r = Math.min(Math.max(raw, 0.3), n - 0.3);
  let theta = 0;
  for (let i = 0; i < 100; i++) {
    let f = -r;
    let info = 0;
    for (const b of items) {
      const p = pCorrect(theta, b);
      f += p;
      info += p * (1 - p);
    }
    const step = f / info;
    theta -= Math.max(-2, Math.min(2, step));
    if (Math.abs(step) < 1e-10) break;
  }
  return theta;
}

export function thetaStandardError(theta: number, items: number[]): number {
  const info = items.reduce((s, b) => {
    const p = pCorrect(theta, b);
    return s + p * (1 - p);
  }, 0);
  return 1 / Math.sqrt(info);
}

export function clampScore(x: number): number {
  return Math.min(9, Math.max(1, x));
}

export function round1(x: number): number {
  return Math.round(x * 10) / 10;
}

export function scaledFromTheta(theta: number): number {
  return round1(clampScore(MEDIAN_SCORE + SLOPE * theta));
}

export function thetaFromScaled(score: number): number {
  return (score - MEDIAN_SCORE) / SLOPE;
}

export interface ModuleScore {
  raw: number;
  total: number;
  theta: number;
  scaled: number;
  /** Likely range (±1 standard error), capped to the scale. */
  low: number;
  high: number;
  /** Expected raw mark on a typical ESAT module at the same ability. */
  standardEquivalent: number;
}

export function scoreModule(raw: number, items: number[]): ModuleScore {
  const theta = thetaForRaw(raw, items);
  const se = thetaStandardError(theta, items);
  return {
    raw,
    total: items.length,
    theta,
    scaled: scaledFromTheta(theta),
    low: scaledFromTheta(theta - se),
    high: scaledFromTheta(theta + se),
    standardEquivalent: Math.round(expectedRaw(theta, STANDARD_ITEMS)),
  };
}

/** Raw → scaled conversion table for an item set (index = raw mark). */
export function conversionTable(items: number[]): number[] {
  return Array.from({ length: items.length + 1 }, (_, r) => scaledFromTheta(thetaForRaw(r, items)));
}

/** Smallest raw mark that reaches a target scaled score, or null if unreachable. */
export function rawNeeded(target: number, items: number[]): number | null {
  const table = conversionTable(items);
  const i = table.findIndex((s) => s >= target);
  return i === -1 ? null : i;
}
