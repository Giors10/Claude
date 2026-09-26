import { describe, expect, it } from 'vitest';
import { LEARN } from '../src/content/learn';
import { FLASHCARDS } from '../src/content/flashcards';
import { ALL_QUESTIONS } from '../src/content/paper';
import { MODULES, type Question } from '../src/content/types';
import { extractMath, parseRich } from '../src/lib/rich';
import { assertTex } from '../src/lib/tex';
import { STRATEGY_SECTIONS } from '../src/pages/Strategy';
import { CONSTANTS } from '../src/pages/Formulas';

type Field = [label: string, text: string];

const MATH_RE = /\$\$([\s\S]+?)\$\$|\$((?:\\\$|[^$])+?)\$/g;

function questionFields(q: Question): Field[] {
  const out: Field[] = [
    [`${q.id} stem`, q.stem],
    [`${q.id} solution`, q.solution],
    [`${q.id} insight`, q.insight],
    [`${q.id} title`, q.title],
  ];
  if (q.prompt) out.push([`${q.id} prompt`, q.prompt]);
  if (q.diagramAlt) out.push([`${q.id} alt`, q.diagramAlt]);
  q.statements?.forEach((s, i) => out.push([`${q.id} statement ${i + 1}`, s]));
  q.hints.forEach((h, i) => out.push([`${q.id} hint ${i + 1}`, h]));
  q.options.forEach((o, i) => out.push([`${q.id} option ${i}`, typeof o === 'string' ? o : o.alt]));
  Object.entries(q.traps).forEach(([k, v]) => out.push([`${q.id} trap ${k}`, v]));
  return out;
}

function learnFields(): Field[] {
  const out: Field[] = [];
  for (const tp of LEARN) {
    out.push([`${tp.code} title`, tp.title], [`${tp.code} summary`, tp.summary], [`${tp.code} spec`, tp.specNote]);
    tp.sections.forEach((s) => out.push([`${tp.code} "${s.heading}" heading`, s.heading], [`${tp.code} "${s.heading}"`, s.body]));
    tp.formulas.forEach((f) => out.push([`${tp.code} formula name "${f.name}"`, f.name]));
    tp.traps.forEach((x, i) => out.push([`${tp.code} trap ${i + 1}`, x]));
    tp.tips.forEach((x, i) => out.push([`${tp.code} tip ${i + 1}`, x]));
    out.push([`${tp.code} example question`, tp.example.question], [`${tp.code} example solution`, tp.example.solution]);
  }
  return out;
}

function cardFields(): Field[] {
  return FLASHCARDS.flatMap((c): Field[] => [
    [`card ${c.id} front`, c.front],
    [`card ${c.id} back`, c.back],
  ]);
}

function otherFields(): Field[] {
  return [
    ...STRATEGY_SECTIONS.flatMap((s): Field[] => [
      [`strategy "${s.title}" title`, s.title],
      [`strategy "${s.title}"`, s.body],
    ]),
    ...CONSTANTS.map((c): Field => [`constant "${c.name}"`, c.name]),
  ];
}

const ALL_FIELDS: Field[] = [...ALL_QUESTIONS.flatMap(questionFields), ...learnFields(), ...cardFields(), ...otherFields()];

describe('learning content', () => {
  it('covers every specification topic exactly once', () => {
    const codes = LEARN.map((t) => t.code);
    expect(new Set(codes).size).toBe(codes.length);
    for (const m of Object.values(MODULES)) for (const t of m.topics) expect(codes, t.code).toContain(t.code);
  });

  it('gives every topic sections, formulas, traps, tips and a worked example', () => {
    for (const tp of LEARN) {
      expect(tp.sections.length, tp.code).toBeGreaterThanOrEqual(2);
      expect(tp.formulas.length, tp.code).toBeGreaterThanOrEqual(1);
      expect(tp.traps.length, tp.code).toBeGreaterThanOrEqual(1);
      expect(tp.tips.length, tp.code).toBeGreaterThanOrEqual(1);
      expect(tp.example.question.length, tp.code).toBeGreaterThan(20);
      expect(tp.example.solution.length, tp.code).toBeGreaterThan(40);
    }
  });

  it('has flashcards with unique ids and valid topics', () => {
    const ids = FLASHCARDS.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(FLASHCARDS.length).toBeGreaterThanOrEqual(90);
    for (const c of FLASHCARDS) {
      const codes = MODULES[c.deck].topics.map((t) => t.code);
      expect(codes, c.id).toContain(c.topic);
    }
  });
});

describe('maths rendering everywhere', () => {
  it('renders every formula in the notes, flashcards and strategy in KaTeX strict mode', () => {
    let count = 0;
    const fields = [...learnFields(), ...cardFields(), ...otherFields()];
    for (const [label, text] of fields) {
      for (const m of extractMath(text)) {
        count++;
        try {
          assertTex(m.tex, m.display);
        } catch (e) {
          throw new Error(`${label}: ${(e as Error).message}\n  TeX: ${m.tex}`);
        }
      }
    }
    for (const tp of LEARN) {
      for (const f of tp.formulas) {
        count++;
        try {
          assertTex(f.tex, true);
        } catch (e) {
          throw new Error(`${tp.code} formula "${f.name}": ${(e as Error).message}\n  TeX: ${f.tex}`);
        }
      }
    }
    for (const c of CONSTANTS) {
      count++;
      assertTex(c.tex, true);
    }
    expect(count).toBeGreaterThan(400);
  });

  it('balances $ delimiters and parses without leftover markup', () => {
    for (const [label, text] of ALL_FIELDS) {
      const dollars = (text.replace(/\\\$/g, '').match(/\$/g) ?? []).length;
      expect(dollars % 2, `${label} has unbalanced $`).toBe(0);
      expect(text.includes('${'), label).toBe(false);
      const flat = JSON.stringify(parseRich(text));
      expect(flat.includes('**'), `${label} has unparsed bold`).toBe(false);
    }
  });

  it('never leaves maths notation outside the maths renderer', () => {
    const problems: string[] = [];
    for (const [label, text] of ALL_FIELDS) {
      const outside = text.replace(/\\\$/g, '').replace(MATH_RE, ' ');
      const caret = outside.match(/.{0,20}\^.{0,20}/);
      if (caret) problems.push(`${label}: caret outside maths in "${caret[0]}"`);
      const sub = outside.match(/.{0,20}[A-Za-z0-9)]_[A-Za-z0-9{].{0,20}/);
      if (sub) problems.push(`${label}: subscript outside maths in "${sub[0]}"`);
      const cmd = outside.match(/.{0,20}\\[A-Za-z]+.{0,20}/);
      if (cmd) problems.push(`${label}: LaTeX command outside maths in "${cmd[0]}"`);
      const brace = outside.match(/.{0,20}\\?[{}].{0,20}/);
      if (brace) problems.push(`${label}: brace outside maths in "${brace[0]}"`);
    }
    expect(problems, problems.join('\n')).toEqual([]);
  });
});
