/**
 * Procedurally generated non-calculator drills. Every answer is computed
 * from the same numbers used to build the prompt, so drills are correct by
 * construction and never run out.
 */

export interface DrillQuestion {
  prompt: string;
  /** Canonical answer shown after answering (rich text). */
  answer: string;
  /** Numeric answer for typed questions. */
  value?: number;
  /** Multiple-choice options (rich text) and the index of the correct one. */
  choices?: string[];
  correct?: number;
  unit?: string;
}

export interface DrillType {
  id: string;
  title: string;
  desc: string;
  gen: (rnd: () => number) => DrillQuestion;
}

const pick = <T,>(rnd: () => number, arr: T[]): T => arr[Math.floor(rnd() * arr.length)];
const int = (rnd: () => number, a: number, b: number) => a + Math.floor(rnd() * (b - a + 1));

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a || 1;
}

function fracTex(n: number, d: number): string {
  const g = gcd(n, d);
  n /= g;
  d /= g;
  if (d < 0) {
    n = -n;
    d = -d;
  }
  if (d === 1) return String(n);
  return `${n < 0 ? '-' : ''}\\tfrac{${Math.abs(n)}}{${d}}`;
}

function shuffleWithAnswer(rnd: () => number, correct: string, distractors: string[]): { choices: string[]; correct: number } {
  const uniq = Array.from(new Set(distractors.filter((d) => d !== correct))).slice(0, 3);
  const all = [correct, ...uniq];
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return { choices: all, correct: all.indexOf(correct) };
}

/** Parse a typed numeric answer: integers, decimals, fractions a/b, optional %, unicode minus. */
export function parseNumber(input: string): number | null {
  const s = input.replace(/\s+/g, '').replace(/[−–]/g, '-').replace(/,/g, '').replace(/%$/, '');
  if (!s) return null;
  const frac = /^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/.exec(s);
  if (frac) {
    const d = Number(frac[2]);
    return d === 0 ? null : Number(frac[1]) / d;
  }
  if (/^-?(\d+\.?\d*|\.\d+)(e-?\d+)?$/i.test(s)) return Number(s);
  return null;
}

export function checkTyped(q: DrillQuestion, input: string): boolean {
  const v = parseNumber(input);
  if (v === null || q.value === undefined) return false;
  return Math.abs(v - q.value) <= 1e-9 * Math.max(1, Math.abs(q.value));
}

function fmt(n: number): string {
  // Plain decimal without floating-point noise.
  const r = Math.round(n * 1e9) / 1e9;
  return String(r);
}

/* ---------------------------------------------------------------------- */
/* Drill types                                                            */
/* ---------------------------------------------------------------------- */

const times: DrillType = {
  id: 'times',
  title: 'Mental multiplication',
  desc: 'Two-digit products without writing anything down.',
  gen: (rnd) => {
    const a = int(rnd, 12, 29);
    const b = int(rnd, 3, 19);
    return { prompt: `$${a} \\times ${b}$`, value: a * b, answer: `$${a * b}$` };
  },
};

const powers: DrillType = {
  id: 'powers',
  title: 'Squares, cubes and powers',
  desc: 'Squares to 25², cubes to 10³, powers of 2 and 3.',
  gen: (rnd) => {
    const kind = int(rnd, 0, 3);
    if (kind === 0) {
      const n = int(rnd, 11, 25);
      return { prompt: `$${n}^2$`, value: n * n, answer: `$${n * n}$` };
    }
    if (kind === 1) {
      const n = int(rnd, 2, 10);
      return { prompt: `$${n}^3$`, value: n ** 3, answer: `$${n ** 3}$` };
    }
    if (kind === 2) {
      const n = int(rnd, 5, 12);
      return { prompt: `$2^{${n}}$`, value: 2 ** n, answer: `$${2 ** n}$` };
    }
    const n = int(rnd, 3, 7);
    return { prompt: `$3^{${n}}$`, value: 3 ** n, answer: `$${3 ** n}$` };
  },
};

const fractions: DrillType = {
  id: 'fractions',
  title: 'Fractions, decimals, percentages',
  desc: 'Convert exactly in both directions.',
  gen: (rnd) => {
    const d = pick(rnd, [4, 5, 8, 16, 20, 25, 40]);
    let n = int(rnd, 1, d - 1);
    while (gcd(n, d) !== 1) n = int(rnd, 1, d - 1);
    const dec = n / d;
    const kind = int(rnd, 0, 2);
    if (kind === 0) return { prompt: `Write $\\dfrac{${n}}{${d}}$ as a decimal`, value: dec, answer: `$${fmt(dec)}$` };
    if (kind === 1) return { prompt: `Write $\\dfrac{${n}}{${d}}$ as a percentage`, value: dec * 100, answer: `$${fmt(dec * 100)}\\%$`, unit: '%' };
    return { prompt: `Write $${fmt(dec)}$ as a fraction (type a/b)`, value: dec, answer: `$${fracTex(n, d)}$` };
  },
};

const SQUAREFREE = [2, 3, 5, 6, 7, 10, 11];

const surds: DrillType = {
  id: 'surds',
  title: 'Surds',
  desc: 'Simplify and rationalise quickly.',
  gen: (rnd) => {
    if (rnd() < 0.6) {
      const a = int(rnd, 2, 9);
      const b = pick(rnd, SQUAREFREE);
      const n = a * a * b;
      const correct = `$${a}\\sqrt{${b}}$`;
      const alts = [`$${b}\\sqrt{${a}}$`, `$${a + 1}\\sqrt{${b}}$`, `$${a - 1 || a + 2}\\sqrt{${b}}$`, `$${a}\\sqrt{${b * 2}}$`, `$${a * 2}\\sqrt{${b}}$`];
      return { prompt: `Simplify $\\sqrt{${n}}$`, answer: correct, ...shuffleWithAnswer(rnd, correct, alts) };
    }
    const b = pick(rnd, [2, 3, 5, 7]);
    const a = int(rnd, 1, 4);
    let d = a * a - b;
    let num = `${a} - \\sqrt{${b}}`;
    let wrongNum = `${a} + \\sqrt{${b}}`;
    if (d < 0) {
      d = -d;
      num = `\\sqrt{${b}} - ${a}`;
      wrongNum = `-${a} - \\sqrt{${b}}`;
    }
    const wrap = (n: string, den: number) => (den === 1 ? `$${n}$` : `$\\dfrac{${n}}{${den}}$`);
    const correct = wrap(num, d);
    const alts = [wrap(wrongNum, d), wrap(num, a * a + b), wrap(`${a} + \\sqrt{${b}}`, a * a + b), wrap(num, d + 1)];
    return { prompt: `Rationalise $\\dfrac{1}{${a} + \\sqrt{${b}}}$`, answer: correct, ...shuffleWithAnswer(rnd, correct, alts) };
  },
};

const standard: DrillType = {
  id: 'standard',
  title: 'Standard form',
  desc: 'Multiply and divide powers of ten in your head.',
  gen: (rnd) => {
    const a = pick(rnd, [1.5, 2, 2.5, 3, 4, 5, 6, 8]);
    const b = pick(rnd, [2, 3, 4, 5, 6, 8]);
    const m = int(rnd, -6, 8);
    const n = int(rnd, -8, 6);
    const divide = rnd() < 0.4;
    let mant = divide ? a / b : a * b;
    let exp = divide ? m - n : m + n;
    while (mant >= 10) {
      mant /= 10;
      exp += 1;
    }
    while (mant < 1) {
      mant *= 10;
      exp -= 1;
    }
    mant = Math.round(mant * 1e6) / 1e6;
    const show = (x: number, e: number) => `$${fmt(Math.round(x * 1e4) / 1e4)} \\times 10^{${e}}$`;
    const correct = show(mant, exp);
    const alts = [show(mant, exp + 1), show(mant, exp - 1), show(mant, exp + 2), show(mant, divide ? m + n : m - n)];
    const op = divide ? '\\div' : '\\times';
    return { prompt: `$(${fmt(a)} \\times 10^{${m}}) ${op} (${b} \\times 10^{${n}})$`, answer: correct, ...shuffleWithAnswer(rnd, correct, alts) };
  },
};

/** Exact trig values; value stored as [sign, kind] where kind indexes BASE. */
const BASE = ['0', '\\tfrac12', '\\tfrac{\\sqrt2}{2}', '\\tfrac{\\sqrt3}{2}', '1', '\\tfrac{1}{\\sqrt3}', '\\sqrt3', '\\text{undefined}'];
const BASE_NUM = [0, 0.5, Math.SQRT2 / 2, Math.sqrt(3) / 2, 1, 1 / Math.sqrt(3), Math.sqrt(3), NaN];

function trigLabel(v: number): string {
  if (!Number.isFinite(v)) return '$\\text{undefined}$';
  const idx = BASE_NUM.findIndex((b) => Math.abs(Math.abs(v) - b) < 1e-9);
  const body = BASE[idx];
  return `$${v < -1e-12 ? '-' : ''}${body}$`;
}

const trig: DrillType = {
  id: 'trig',
  title: 'Exact trig values',
  desc: 'Any multiple of 30° or 45°, in degrees or radians.',
  gen: (rnd) => {
    const deg = pick(rnd, [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330]);
    const fn = pick(rnd, ['sin', 'cos', 'tan'] as const);
    const rad = (deg * Math.PI) / 180;
    let v = fn === 'sin' ? Math.sin(rad) : fn === 'cos' ? Math.cos(rad) : Math.tan(rad);
    if (fn === 'tan' && (deg === 90 || deg === 270)) v = NaN;
    if (Math.abs(v) < 1e-12) v = 0;
    const useRad = rnd() < 0.45 && deg > 0;
    const radTex = (() => {
      const g = gcd(deg, 180);
      const num = deg / g;
      const den = 180 / g;
      return den === 1 ? (num === 1 ? '\\pi' : `${num}\\pi`) : `\\tfrac{${num === 1 ? '' : num}\\pi}{${den}}`;
    })();
    const angle = useRad ? radTex : `${deg}^\\circ`;
    const correct = trigLabel(v);
    const pool = ['0', '\\tfrac12', '-\\tfrac12', '\\tfrac{\\sqrt3}{2}', '-\\tfrac{\\sqrt3}{2}', '\\tfrac{\\sqrt2}{2}', '-\\tfrac{\\sqrt2}{2}', '1', '-1', '\\sqrt3', '-\\sqrt3', '\\tfrac{1}{\\sqrt3}', '-\\tfrac{1}{\\sqrt3}'].map((s) => `$${s}$`);
    const alts = pool.filter((p) => p !== correct).sort(() => rnd() - 0.5);
    // Put the "sign-flipped" value first: it is the most instructive distractor.
    const flippable = v !== 0 && Number.isFinite(v);
    const flipped = correct.startsWith('$-') ? correct.replace('$-', '$') : correct.replace('$', '$-');
    const lead = flippable ? [flipped] : [];
    return { prompt: `$\\${fn}\\left(${angle}\\right)$`, answer: correct, ...shuffleWithAnswer(rnd, correct, [...lead, ...alts]) };
  },
};

const units: DrillType = {
  id: 'units',
  title: 'Unit conversions',
  desc: 'Speeds, areas, volumes and densities.',
  gen: (rnd) => {
    const kind = int(rnd, 0, 4);
    if (kind === 0) {
      const kmh = pick(rnd, [18, 36, 54, 72, 90, 108, 126, 144, 180]);
      return { prompt: `$${kmh}\\ \\text{km h}^{-1}$ in $\\text{m s}^{-1}$`, value: kmh / 3.6, answer: `$${fmt(kmh / 3.6)}\\ \\text{m s}^{-1}$` };
    }
    if (kind === 1) {
      const ms = pick(rnd, [5, 10, 15, 20, 25, 30, 40]);
      return { prompt: `$${ms}\\ \\text{m s}^{-1}$ in $\\text{km h}^{-1}$`, value: ms * 3.6, answer: `$${fmt(ms * 3.6)}\\ \\text{km h}^{-1}$` };
    }
    if (kind === 2) {
      const a = pick(rnd, [0.5, 1.2, 2.5, 3, 0.04]);
      return { prompt: `$${a}\\ \\text{m}^2$ in $\\text{cm}^2$`, value: a * 1e4, answer: `$${fmt(a * 1e4)}\\ \\text{cm}^2$` };
    }
    if (kind === 3) {
      const v = pick(rnd, [0.002, 0.004, 0.05, 0.25, 1.5]);
      return { prompt: `$${v}\\ \\text{m}^3$ in litres`, value: v * 1000, answer: `$${fmt(v * 1000)}$ litres` };
    }
    const d = pick(rnd, [0.8, 1.2, 2.7, 7.9, 11.3, 19.3]);
    return { prompt: `$${d}\\ \\text{g cm}^{-3}$ in $\\text{kg m}^{-3}$`, value: d * 1000, answer: `$${fmt(d * 1000)}\\ \\text{kg m}^{-3}$` };
  },
};

const percent: DrillType = {
  id: 'percent',
  title: 'Percentage changes',
  desc: 'Successive changes and reverse percentages as multipliers.',
  gen: (rnd) => {
    if (rnd() < 0.5) {
      const p1 = pick(rnd, [10, 20, 25, 50]);
      const p2 = pick(rnd, [10, 20, 25, 40, 50]);
      const s1 = rnd() < 0.5 ? 1 : -1;
      const s2 = s1 === 1 ? -1 : rnd() < 0.5 ? 1 : -1;
      const mult = (1 + (s1 * p1) / 100) * (1 + (s2 * p2) / 100);
      const change = Math.round((mult - 1) * 1e6) / 1e4;
      const word = (s: number) => (s > 0 ? 'increase' : 'decrease');
      return {
        prompt: `A ${p1}% ${word(s1)} followed by a ${p2}% ${word(s2)}. Overall percentage change? (use − for a decrease)`,
        value: change,
        answer: `$${fmt(change)}\\%$`,
        unit: '%',
      };
    }
    const p = pick(rnd, [10, 15, 20, 25, 40]);
    const up = rnd() < 0.5;
    const orig = 20 * int(rnd, 2, 12);
    const final = orig * (1 + ((up ? 1 : -1) * p) / 100);
    return {
      prompt: `After a ${p}% ${up ? 'increase' : 'decrease'} a price is £${fmt(final)}. What was it before?`,
      value: orig,
      answer: `£${orig}`,
    };
  },
};

const logs: DrillType = {
  id: 'logs',
  title: 'Logarithms',
  desc: 'Evaluate logs exactly; fractions allowed (type a/b).',
  gen: (rnd) => {
    const kind = int(rnd, 0, 2);
    if (kind < 2) {
      const base = pick(rnd, [2, 3, 5, 10]);
      const e = int(rnd, -3, base === 2 ? 7 : 4);
      const argTex = e >= 0 ? String(base ** e) : `\\tfrac{1}{${base ** -e}}`;
      return { prompt: `$\\log_{${base}} ${argTex}$`, value: e, answer: `$${e}$` };
    }
    const pairs: [number, number, number, number][] = [
      [4, 8, 3, 2],
      [8, 4, 2, 3],
      [9, 27, 3, 2],
      [27, 9, 2, 3],
      [8, 2, 1, 3],
      [16, 8, 3, 4],
      [4, 32, 5, 2],
      [25, 125, 3, 2],
    ];
    const [b, x, n, d] = pick(rnd, pairs);
    return { prompt: `$\\log_{${b}} ${x}$`, value: n / d, answer: `$${fracTex(n, d)}$` };
  },
};

const physics: DrillType = {
  id: 'physics',
  title: 'Physics quick-fire',
  desc: 'One-step calculations with the equations you must know.',
  gen: (rnd) => {
    const kind = int(rnd, 0, 5);
    if (kind === 0) {
      const f = pick(rnd, [50, 200, 500, 1000, 1700]);
      const l = pick(rnd, [0.2, 0.5, 1.5, 2, 3]);
      return { prompt: `A wave has frequency ${f} Hz and wavelength ${l} m. Speed in $\\text{m s}^{-1}$?`, value: f * l, answer: `$${fmt(f * l)}\\ \\text{m s}^{-1}$` };
    }
    if (kind === 1) {
      const m = pick(rnd, [0.5, 1, 2]);
      const dt = pick(rnd, [10, 20, 25, 50]);
      return { prompt: `Energy in kJ to warm ${m} kg of water by ${dt} °C ($c = 4200\\ \\text{J kg}^{-1}\\,^\\circ\\text{C}^{-1}$)?`, value: (m * 4200 * dt) / 1000, answer: `$${fmt((m * 4200 * dt) / 1000)}$ kJ` };
    }
    if (kind === 2) {
      const m = pick(rnd, [2, 4, 0.5, 1000]);
      const v = pick(rnd, [3, 4, 6, 10, 20]);
      return { prompt: `Kinetic energy in J of a ${m} kg mass moving at $${v}\\ \\text{m s}^{-1}$?`, value: 0.5 * m * v * v, answer: `$${fmt(0.5 * m * v * v)}$ J` };
    }
    if (kind === 3) {
      const V = pick(rnd, [6, 12, 230]);
      const I = pick(rnd, [0.5, 2, 3, 4]);
      return { prompt: `Power in W of a device drawing ${I} A from ${V} V?`, value: V * I, answer: `$${fmt(V * I)}$ W` };
    }
    if (kind === 4) {
      const n = int(rnd, 1, 5);
      return { prompt: `Fraction of a radioactive sample remaining after ${n} half-li${n === 1 ? 'fe' : 'ves'}? (type a/b)`, value: 1 / 2 ** n, answer: `$${fracTex(1, 2 ** n)}$` };
    }
    const m = pick(rnd, [2, 5, 20, 60]);
    const h = pick(rnd, [3, 5, 12, 20]);
    return { prompt: `Gain in GPE in J when ${m} kg is lifted ${h} m? ($g = 10\\ \\text{N kg}^{-1}$)`, value: m * 10 * h, answer: `$${m * 10 * h}$ J` };
  },
};

const estimate: DrillType = {
  id: 'estimate',
  title: 'Estimation',
  desc: 'Pick the closest value: rounding and orders of magnitude.',
  gen: (rnd) => {
    const n = Math.round(10 ** (1 + rnd() * 5));
    const v = Math.sqrt(n);
    const sig2 = (x: number) => {
      const p = 10 ** (Math.floor(Math.log10(x)) - 1);
      return Math.round(x / p) * p;
    };
    const correct = `$${fmt(sig2(v))}$`;
    const alts = [`$${fmt(sig2(v * Math.sqrt(10)))}$`, `$${fmt(sig2(v / Math.sqrt(10)))}$`, `$${fmt(sig2(v * 10))}$`, `$${fmt(sig2(v / 10))}$`];
    return { prompt: `Which is closest to $\\sqrt{${n.toLocaleString('en-GB').replace(/,/g, '\\,')}}$?`, answer: correct, ...shuffleWithAnswer(rnd, correct, alts) };
  },
};

export const DRILLS: DrillType[] = [times, powers, fractions, surds, standard, trig, units, percent, logs, physics, estimate];

export function drillById(id: string): DrillType | undefined {
  return DRILLS.find((d) => d.id === id);
}
