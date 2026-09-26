import type { ModuleId } from '../content/types';

/**
 * Official ESAT score distributions for the October 2025 sitting, read from
 * the bar charts in UAT-UK's "ESAT Explanation of Results" (published
 * November 2025). Each array gives the percentage of candidates in the bars
 * centred on 1.0, 1.5, ..., 9.0. Values are read from the charts, so treat
 * them as accurate to roughly ±0.3 percentage points.
 */
export const SCORE_BINS = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9];

export const OCT_2025_DISTRIBUTION: Record<ModuleId, number[]> = {
  M1: [0.4, 0.8, 2.2, 3.2, 11.5, 10.0, 14.0, 14.1, 10.4, 9.5, 6.8, 5.8, 3.6, 2.8, 0.4, 2.1, 2.3],
  PH: [2.7, 1.9, 2.6, 7.3, 5.6, 11.3, 12.3, 13.6, 8.5, 12.7, 6.2, 5.4, 4.4, 0.6, 2.7, 0.3, 2.3],
  M2: [1.1, 1.4, 2.6, 4.7, 7.2, 12.5, 15.3, 7.5, 14.6, 8.4, 8.9, 4.5, 3.8, 1.3, 2.3, 0.6, 3.4],
};

export const DISTRIBUTION_SOURCE =
  'UAT-UK, Engineering and Science Admissions Test (ESAT): Explanation of Results, October 2025';

/**
 * Estimated percentile (0-100) of a scaled score among October 2025
 * candidates for that module. Each bar is treated as covering ±0.25 around
 * its centre, with candidates spread evenly within it.
 */
export function percentileOf(module: ModuleId, score: number): number {
  const dist = OCT_2025_DISTRIBUTION[module];
  const total = dist.reduce((a, b) => a + b, 0);
  let below = 0;
  for (let i = 0; i < SCORE_BINS.length; i++) {
    const lo = SCORE_BINS[i] - 0.25;
    const hi = SCORE_BINS[i] + 0.25;
    if (score >= hi) below += dist[i];
    else if (score > lo) below += (dist[i] * (score - lo)) / (hi - lo);
  }
  return Math.max(0, Math.min(100, (100 * below) / total));
}

/** Plain-English band for a scaled score, based on UAT-UK's description of the scale. */
export function scoreBand(score: number): { label: string; tone: 'low' | 'mid' | 'good' | 'great' | 'top' } {
  if (score >= 8) return { label: 'Exceptional', tone: 'top' };
  if (score >= 7) return { label: 'Excellent · top 10%', tone: 'great' };
  if (score >= 5.5) return { label: 'Strong', tone: 'good' };
  if (score >= 4) return { label: 'Around typical', tone: 'mid' };
  return { label: 'Below typical', tone: 'low' };
}
