import { describe, expect, it } from 'vitest';
import { ALL_QUESTIONS, PAPERS } from '../src/content/paper';
import { SPEC, SPEC_BY_CODE } from '../src/content/spec';
import { MODULES, MODULE_ORDER, type Question } from '../src/content/types';
import { DIAGRAMS } from '../src/diagrams';
import { extractMath, parseRich } from '../src/lib/rich';
import { assertTex } from '../src/lib/tex';

/** Every rich-text string attached to a question, labelled for error messages. */
function richFields(q: Question): [string, string][] {
  const out: [string, string][] = [
    ['stem', q.stem],
    ['solution', q.solution],
    ['insight', q.insight],
  ];
  if (q.prompt) out.push(['prompt', q.prompt]);
  q.statements?.forEach((s, i) => out.push([`statement ${i + 1}`, s]));
  q.hints.forEach((h, i) => out.push([`hint ${i + 1}`, h]));
  q.options.forEach((o, i) => {
    if (typeof o === 'string') out.push([`option ${i}`, o]);
  });
  Object.entries(q.traps).forEach(([k, v]) => out.push([`trap ${k}`, v]));
  return out;
}

/** Every module of every paper, labelled "Mock 2 M1" for error messages. */
const MODULE_SETS: [string, Question[]][] = PAPERS.flatMap((p) => MODULE_ORDER.map((m) => [`${p.label} ${m}`, p.modules[m]] as [string, Question[]]));

describe('paper structure', () => {
  it('has three papers of 27 questions per module, numbered 1-27 with prefixed ids', () => {
    expect(PAPERS).toHaveLength(3);
    for (const p of PAPERS) {
      for (const mod of MODULE_ORDER) {
        const qs = p.modules[mod];
        expect(qs, `${p.label} ${mod}`).toHaveLength(27);
        qs.forEach((q, i) => {
          expect(q.n, q.id).toBe(i + 1);
          expect(q.module, q.id).toBe(mod);
          expect(q.id, q.id).toBe(`${p.idPrefix}${mod}-${String(i + 1).padStart(2, '0')}`);
        });
      }
    }
  });

  it('has unique ids and unique titles within each paper', () => {
    const ids = new Set(ALL_QUESTIONS.map((q) => q.id));
    expect(ids.size).toBe(ALL_QUESTIONS.length);
    expect(ALL_QUESTIONS.length).toBe(243);
    for (const p of PAPERS) {
      const titles = MODULE_ORDER.flatMap((m) => p.modules[m].map((q) => q.title));
      expect(new Set(titles).size, p.label).toBe(titles.length);
    }
  });

  it('tags every question with real specification points', () => {
    for (const q of ALL_QUESTIONS) {
      expect(q.spec.length, q.id).toBeGreaterThanOrEqual(1);
      for (const code of q.spec) {
        const point = SPEC_BY_CODE.get(code);
        expect(point, `${q.id} spec ${code} is not a specification point`).toBeTruthy();
        expect(point?.module, `${q.id} spec ${code}`).toBe(q.module);
      }
      expect(q.spec.some((c) => SPEC_BY_CODE.get(c)?.topic === q.topic), `${q.id}: topic ${q.topic} should match one of its spec points`).toBe(true);
    }
  });

  it('tests every point of the specification at least once across the three papers', () => {
    const covered = new Set(ALL_QUESTIONS.flatMap((q) => q.spec));
    const missing = SPEC.filter((s) => !covered.has(s.code)).map((s) => s.code);
    expect(missing).toEqual([]);
  });

  it('uses topics that belong to the module', () => {
    for (const q of ALL_QUESTIONS) {
      const codes = MODULES[q.module].topics.map((t) => t.code);
      expect(codes, q.id).toContain(q.topic);
      for (const s of q.spec) {
        const prefix = s.split('.')[0];
        const ok = MODULES[q.module].topics.some((t) => t.code === prefix) || /^M\d$/.test(prefix);
        expect(ok, `${q.id} spec ${s}`).toBe(true);
      }
    }
  });

  it('has a valid answer, distinct options and sensible metadata', () => {
    for (const q of ALL_QUESTIONS) {
      expect(q.options.length, q.id).toBeGreaterThanOrEqual(5);
      expect(q.options.length, q.id).toBeLessThanOrEqual(8);
      expect(q.answer, q.id).toBeGreaterThanOrEqual(0);
      expect(q.answer, q.id).toBeLessThan(q.options.length);
      const keys = q.options.map((o) => (typeof o === 'string' ? o.replace(/\s+/g, ' ').trim() : o.diagram));
      expect(new Set(keys).size, `${q.id} options must be distinct`).toBe(keys.length);
      expect(q.hints.length, q.id).toBeGreaterThanOrEqual(1);
      expect(q.skills.length, q.id).toBeGreaterThanOrEqual(1);
      expect(q.time, q.id).toBeGreaterThanOrEqual(60);
      expect(q.time, q.id).toBeLessThanOrEqual(150);
      expect([1, 2, 3, 4, 5], q.id).toContain(q.difficulty);
      for (const k of Object.keys(q.traps)) {
        const idx = Number(k);
        expect(Number.isInteger(idx) && idx >= 0 && idx < q.options.length, `${q.id} trap ${k}`).toBe(true);
        expect(idx, `${q.id}: a trap cannot explain the correct answer`).not.toBe(q.answer);
      }
      if (q.statements) {
        expect(q.statements.length, q.id).toBe(3);
        expect(q.options.length, q.id).toBe(8);
      }
    }
  });

  it('references only diagrams that exist', () => {
    for (const q of ALL_QUESTIONS) {
      if (q.diagram) {
        expect(DIAGRAMS[q.diagram], `${q.id} diagram ${q.diagram}`).toBeTypeOf('function');
        expect(q.diagramAlt, `${q.id} needs alt text`).toBeTruthy();
      }
      if (q.solutionDiagram) expect(DIAGRAMS[q.solutionDiagram], `${q.id} solution diagram`).toBeTypeOf('function');
      for (const o of q.options) {
        if (typeof o !== 'string') {
          expect(DIAGRAMS[o.diagram], `${q.id} option diagram ${o.diagram}`).toBeTypeOf('function');
          expect(o.alt.length, q.id).toBeGreaterThan(10);
        }
      }
    }
  });

  it('spreads correct answers across the letters', () => {
    for (const [mod, qs] of MODULE_SETS) {
      const counts = new Map<number, number>();
      qs.forEach((q) => counts.set(q.answer, (counts.get(q.answer) ?? 0) + 1));
      for (const [letter, n] of counts) expect(n, `${mod} letter ${letter}`).toBeLessThanOrEqual(7);
      for (let letter = 0; letter < 6; letter++) expect(counts.get(letter) ?? 0, `${mod} letter ${letter}`).toBeGreaterThanOrEqual(3);
    }
  });
});

describe('rich text and maths', () => {
  it('contains no stray control characters or template leftovers', () => {
    for (const q of ALL_QUESTIONS) {
      for (const [label, text] of richFields(q)) {
        // eslint-disable-next-line no-control-regex
        expect(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(text), `${q.id} ${label} has a control character`).toBe(false);
        expect(text.includes('${'), `${q.id} ${label}`).toBe(false);
        const dollars = (text.replace(/\\\$/g, '').match(/\$/g) ?? []).length;
        expect(dollars % 2, `${q.id} ${label} has unbalanced $`).toBe(0);
      }
    }
  });

  it('renders every formula with KaTeX in strict mode', () => {
    let count = 0;
    for (const q of ALL_QUESTIONS) {
      for (const [label, text] of richFields(q)) {
        for (const m of extractMath(text)) {
          count++;
          try {
            assertTex(m.tex, m.display);
          } catch (e) {
            throw new Error(`${q.id} ${label}: ${(e as Error).message}\n  TeX: ${m.tex}`);
          }
        }
      }
    }
    expect(count).toBeGreaterThan(1500);
  });

  it('parses every field into blocks without leaving raw markup behind', () => {
    for (const q of ALL_QUESTIONS) {
      for (const [label, text] of richFields(q)) {
        const blocks = parseRich(text);
        expect(blocks.length, `${q.id} ${label}`).toBeGreaterThan(0);
        const flat = JSON.stringify(blocks);
        expect(flat.includes('**'), `${q.id} ${label} has unparsed bold`).toBe(false);
      }
    }
  });
});
