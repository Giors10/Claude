import { describe, expect, it } from 'vitest';
import { DRILLS, checkTyped, parseNumber } from '../src/lib/drills';
import { extractMath } from '../src/lib/rich';
import { assertTex } from '../src/lib/tex';

function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}

describe('drills', () => {
  it('parses typed answers', () => {
    expect(parseNumber('3/8')).toBeCloseTo(0.375);
    expect(parseNumber(' −12 ')).toBe(-12);
    expect(parseNumber('45%')).toBe(45);
    expect(parseNumber('1,000')).toBe(1000);
    expect(parseNumber('abc')).toBeNull();
    expect(parseNumber('1/0')).toBeNull();
  });

  for (const d of DRILLS) {
    it(`${d.id}: generates well-formed questions`, () => {
      const rnd = seeded(d.id.length * 7919);
      for (let i = 0; i < 400; i++) {
        const q = d.gen(rnd);
        for (const text of [q.prompt, q.answer, ...(q.choices ?? [])]) {
          for (const m of extractMath(text)) assertTex(m.tex, m.display);
        }
        if (q.choices) {
          expect(q.choices.length).toBeGreaterThanOrEqual(3);
          expect(new Set(q.choices).size).toBe(q.choices.length);
          expect(q.choices[q.correct!]).toBe(q.answer);
        } else {
          expect(Number.isFinite(q.value)).toBe(true);
          // The displayed answer must be accepted when typed back in.
          const shown = q.answer.replace(/\$/g, '').replace(/\\tfrac\{(-?\d+)\}\{(\d+)\}/, '$1/$2').replace(/^-\\tfrac\{(\d+)\}\{(\d+)\}/, '-$1/$2').replace(/\\%|\\ .*$| kJ| J| W|£| litres/g, '').trim();
          expect(checkTyped(q, shown), `${d.id}: "${q.prompt}" -> "${shown}"`).toBe(true);
        }
      }
    });
  }

  it('surd simplifications are numerically right', () => {
    const rnd = seeded(42);
    const surds = DRILLS.find((d) => d.id === 'surds')!;
    for (let i = 0; i < 300; i++) {
      const q = surds.gen(rnd);
      const m = /Simplify \$\\sqrt\{(\d+)\}\$/.exec(q.prompt);
      if (!m) continue;
      const a = /\$(\d+)\\sqrt\{(\d+)\}\$/.exec(q.answer)!;
      expect(Number(a[1]) * Math.sqrt(Number(a[2]))).toBeCloseTo(Math.sqrt(Number(m[1])), 9);
    }
  });

  it('exact trig values are right', () => {
    const rnd = seeded(7);
    const trig = DRILLS.find((d) => d.id === 'trig')!;
    const val = (tex: string): number => {
      const t = tex.replace(/\$/g, '');
      if (t.includes('undefined')) return NaN;
      const neg = t.startsWith('-');
      const body = neg ? t.slice(1) : t;
      const map: Record<string, number> = {
        '0': 0,
        '1': 1,
        '\\tfrac12': 0.5,
        '\\tfrac{\\sqrt2}{2}': Math.SQRT2 / 2,
        '\\tfrac{\\sqrt3}{2}': Math.sqrt(3) / 2,
        '\\sqrt3': Math.sqrt(3),
        '\\tfrac{1}{\\sqrt3}': 1 / Math.sqrt(3),
      };
      return (neg ? -1 : 1) * map[body];
    };
    for (let i = 0; i < 400; i++) {
      const q = trig.gen(rnd);
      const m = /\\(sin|cos|tan)\\left\((.+)\\right\)/.exec(q.prompt)!;
      const arg = m[2];
      let deg: number;
      if (arg.includes('circ')) deg = Number(arg.replace('^\\circ', ''));
      else {
        const f = /^(?:\\tfrac\{(\d*)\\pi\}\{(\d+)\}|(\d*)\\pi)$/.exec(arg)!;
        deg = f[3] !== undefined ? 180 * (f[3] === '' ? 1 : Number(f[3])) : (180 * (f[1] === '' ? 1 : Number(f[1]))) / Number(f[2]);
      }
      const r = (deg * Math.PI) / 180;
      const expected = m[1] === 'sin' ? Math.sin(r) : m[1] === 'cos' ? Math.cos(r) : Math.abs(Math.cos(r)) < 1e-12 ? NaN : Math.tan(r);
      const got = val(q.answer);
      if (Number.isNaN(expected)) expect(Number.isNaN(got)).toBe(true);
      else expect(got).toBeCloseTo(expected, 9);
    }
  });
});
