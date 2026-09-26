import { describe, expect, it } from 'vitest';
import { PAPER } from '../src/content/paper';
import { OCT_2025_DISTRIBUTION, percentileOf } from '../src/lib/distributions';
import {
  STANDARD_ITEMS,
  conversionTable,
  expectedRaw,
  itemDifficulty,
  rawNeeded,
  scaledFromTheta,
  scoreModule,
  thetaForRaw,
} from '../src/lib/rasch';

describe('Rasch scoring', () => {
  it('reproduces widely reported conversions on a typical ESAT module', () => {
    const table = conversionTable(STANDARD_ITEMS);
    expect(table[12]).toBeCloseTo(4.5, 1);
    expect(table[17]).toBeCloseTo(6.0, 1);
    expect(table[20]).toBeCloseTo(7.0, 1);
    expect(table[26]).toBe(9);
    expect(table[0]).toBe(1);
  });

  it('is monotonic in the raw mark', () => {
    for (const qs of Object.values(PAPER)) {
      const table = conversionTable(qs.map(itemDifficulty));
      for (let r = 1; r < table.length; r++) expect(table[r]).toBeGreaterThanOrEqual(table[r - 1]);
    }
  });

  it('gives a higher score for the same raw mark on the harder Crucible paper', () => {
    for (const qs of Object.values(PAPER)) {
      const items = qs.map(itemDifficulty);
      for (const raw of [8, 12, 16, 20]) {
        expect(scoreModule(raw, items).scaled).toBeGreaterThan(scoreModule(raw, STANDARD_ITEMS).scaled);
      }
    }
  });

  it('inverts expected raw score', () => {
    const theta = thetaForRaw(15, STANDARD_ITEMS);
    expect(expectedRaw(theta, STANDARD_ITEMS)).toBeCloseTo(15, 6);
  });

  it('caps the scale at 1.0 and 9.0', () => {
    expect(scaledFromTheta(-20)).toBe(1);
    expect(scaledFromTheta(20)).toBe(9);
  });

  it('reports a likely range that contains the estimate', () => {
    const s = scoreModule(14, PAPER.M1.map(itemDifficulty));
    expect(s.low).toBeLessThanOrEqual(s.scaled);
    expect(s.high).toBeGreaterThanOrEqual(s.scaled);
    expect(s.standardEquivalent).toBeGreaterThan(14);
  });

  it('finds the raw mark needed for a target score', () => {
    expect(rawNeeded(7.0, STANDARD_ITEMS)).toBe(20);
    expect(rawNeeded(9.5, STANDARD_ITEMS)).toBeNull();
  });
});

describe('official distributions', () => {
  it('each sums to about 100%', () => {
    for (const d of Object.values(OCT_2025_DISTRIBUTION)) {
      const total = d.reduce((a, b) => a + b, 0);
      expect(total).toBeGreaterThan(99);
      expect(total).toBeLessThan(101);
    }
  });

  it('places 4.5 near the median and 7.0 near the 90th percentile', () => {
    for (const mod of ['M1', 'PH', 'M2'] as const) {
      expect(percentileOf(mod, 4.5)).toBeGreaterThan(40);
      expect(percentileOf(mod, 4.5)).toBeLessThan(62);
      expect(percentileOf(mod, 7.25)).toBeGreaterThan(86);
      expect(percentileOf(mod, 7.25)).toBeLessThan(96);
    }
  });

  it('is monotonic', () => {
    let prev = -1;
    for (let s = 1; s <= 9; s += 0.1) {
      const p = percentileOf('M1', s);
      expect(p).toBeGreaterThanOrEqual(prev);
      prev = p;
    }
  });
});
