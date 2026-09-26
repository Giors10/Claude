import { LETTERS, MODULES, topicName, type Question } from '../content/types';
import { capability } from './platform';

/**
 * AI tutor, available only inside the claude.ai artifact viewer through the
 * `sample` capability. Elsewhere `getSampler()` resolves to null and the
 * tutor UI stays hidden.
 */

export interface SampleResult {
  text: string;
  truncated?: boolean;
}

export type Turn = { role: 'user' | 'assistant'; content: string };

export type Sampler = ((
  input: string | Turn[],
  opts?: { onText?: (p: { text: string; delta: string }) => void; signal?: AbortSignal; modelTier?: 'quick' | 'default' | 'complex'; cache?: boolean },
) => Promise<SampleResult>) & { limits?: () => Promise<unknown> };

export function getSampler(): Promise<Sampler | null> {
  return capability<Sampler>('sample');
}

function optionText(q: Question, i: number): string {
  const o = q.options[i];
  return typeof o === 'string' ? o : `[graph] ${o.alt}`;
}

export function questionContext(q: Question, chosen: number | null): string {
  const parts = [
    `ESAT ${MODULES[q.module].name}, question ${q.n} (topic ${q.topic}: ${topicName(q.topic)}; specification ${q.spec.join(', ')}).`,
    `QUESTION:\n${q.stem}`,
  ];
  if (q.diagramAlt) parts.push(`DIAGRAM (description): ${q.diagramAlt}`);
  if (q.statements) parts.push('STATEMENTS:\n' + q.statements.map((s, i) => `${i + 1}. ${s}`).join('\n'));
  if (q.prompt) parts.push(q.prompt);
  parts.push('OPTIONS:\n' + q.options.map((_, i) => `${LETTERS[i]}: ${optionText(q, i)}`).join('\n'));
  parts.push(`CORRECT ANSWER: ${LETTERS[q.answer]}`);
  parts.push(`STUDENT'S ANSWER: ${chosen === null ? 'not answered' : LETTERS[chosen]}`);
  parts.push(`VERIFIED WORKED SOLUTION:\n${q.solution}`);
  const traps = Object.entries(q.traps)
    .map(([k, v]) => `${LETTERS[Number(k)]}: ${v}`)
    .join('\n');
  if (traps) parts.push(`WHY SOME WRONG OPTIONS ARE TEMPTING:\n${traps}`);
  return parts.join('\n\n');
}

export const TUTOR_RULES = `You are a friendly, expert tutor for the ESAT (Engineering and Science Admissions Test, used by Cambridge and Imperial). Candidates may not use a calculator, so show mental-arithmetic-friendly working. The worked solution below has been checked and is correct: never contradict it. Write for a strong 17-year-old. Be concise: short paragraphs or "- " bullet lists, no headings, no tables. Write maths in LaTeX between single dollar signs ($x^2$) or double dollar signs for displayed equations. If the student asks something unrelated to this question or to ESAT preparation, briefly steer them back.`;

export function firstTurn(q: Question, chosen: number | null, request: string): string {
  return `${TUTOR_RULES}\n\n---\n${questionContext(q, chosen)}\n---\n\nSTUDENT: ${request}`;
}

export const QUICK_PROMPTS: { label: string; text: (chosen: number | null, q: Question) => string }[] = [
  {
    label: 'Explain the key step',
    text: () => 'Explain the single key idea that unlocks this question, then walk me through the solution step by step.',
  },
  {
    label: 'Why was my answer wrong?',
    text: (chosen, q) =>
      chosen === null
        ? 'I did not answer this. What should my first move have been?'
        : chosen === q.answer
          ? 'I got this right. Is there a faster way I could have done it under time pressure?'
          : `I chose ${LETTERS[chosen]}. What mistake leads to that answer, and how do I avoid it next time?`,
  },
  {
    label: 'Show a faster method',
    text: () => 'Show me the fastest way to get this answer in an exam, including any shortcuts or elimination tricks.',
  },
  {
    label: 'Give me a similar question',
    text: () =>
      'Write one new multiple-choice question that tests the same idea at a similar difficulty, with options A-F. Do not show the answer until I reply with my choice.',
  },
];
