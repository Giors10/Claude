import { MODULE_ORDER, type ModuleId, type Question } from '../types';
import * as mock1 from './mock1';
import * as mock2 from './mock2';
import * as mock3 from './mock3';

export type PaperId = 'crucible' | 'forge' | 'anvil';

export interface PaperInfo {
  id: PaperId;
  /** 1, 2, 3: the order in which the papers are listed and suggested. */
  num: number;
  /** Short label, e.g. "Mock 2". */
  label: string;
  /** The paper's name, e.g. "Forge". */
  name: string;
  /** One line shown on paper cards. */
  tagline: string;
  /** A short paragraph describing the paper and when to sit it. */
  about: string;
  /** Prefix of every question id in the paper ("" for Mock 1, "2-" for Mock 2). */
  idPrefix: string;
  modules: Record<ModuleId, Question[]>;
}

export const PAPERS: PaperInfo[] = [
  {
    id: 'crucible',
    num: 1,
    label: 'Mock 1',
    name: 'Crucible',
    tagline: 'The hardest paper: pitched above the real ESAT',
    about:
      'Every question is set harder than a typical real question, so it rewards speed and insight. A good score here means you are ready for anything the real test can ask.',
    idPrefix: '',
    modules: { M1: mock1.M1, PH: mock1.PH, M2: mock1.M2 },
  },
  {
    id: 'forge',
    num: 2,
    label: 'Mock 2',
    name: 'Forge',
    tagline: 'Realistic, set a little harder than the real ESAT',
    about:
      'Built to feel like the real test, with its mix of quick wins, long calculations and "which statements are correct" questions, pitched slightly above real difficulty.',
    idPrefix: '2-',
    modules: { M1: mock2.M1, PH: mock2.PH, M2: mock2.M2 },
  },
  {
    id: 'anvil',
    num: 3,
    label: 'Mock 3',
    name: 'Anvil',
    tagline: 'Realistic, a little harder, with a fresh topic balance',
    about:
      'A second realistic paper with a different spread of topics. Together the three mocks test every point of the ESAT specification at least once.',
    idPrefix: '3-',
    modules: { M1: mock3.M1, PH: mock3.PH, M2: mock3.M2 },
  },
];

export const PAPER_BY_ID: Record<PaperId, PaperInfo> = Object.fromEntries(PAPERS.map((p) => [p.id, p])) as Record<PaperId, PaperInfo>;

/** Papers that have all three modules written (all of them once the content is complete). */
export const READY_PAPERS: PaperInfo[] = PAPERS.filter((p) => MODULE_ORDER.every((m) => p.modules[m].length === 27));

/** Every question in every paper, paper by paper, each in real exam order (Maths 1, Physics, Maths 2). */
export const ALL_QUESTIONS: Question[] = PAPERS.flatMap((p) => MODULE_ORDER.flatMap((m) => p.modules[m]));

export const QUESTION_BY_ID: Map<string, Question> = new Map(ALL_QUESTIONS.map((q) => [q.id, q]));

const PAPER_OF: Map<string, PaperInfo> = new Map(PAPERS.flatMap((p) => MODULE_ORDER.flatMap((m) => p.modules[m].map((q) => [q.id, p] as const))));

export function getQuestion(id: string): Question | undefined {
  return QUESTION_BY_ID.get(id);
}

/** The paper a question belongs to. */
export function paperOf(q: Question | string): PaperInfo {
  return PAPER_OF.get(typeof q === 'string' ? q : q.id) ?? PAPERS[0];
}

/** e.g. "Mock 2 · Physics Q14". */
export function questionLabel(q: Question): string {
  const moduleShort = q.module === 'PH' ? 'Physics' : q.module === 'M1' ? 'Maths 1' : 'Maths 2';
  return `${paperOf(q).label} · ${moduleShort} Q${q.n}`;
}
