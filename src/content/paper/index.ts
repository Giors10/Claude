import type { ModuleId, Question } from '../types';
import { M1 } from './m1';
import { M2 } from './m2';
import { PH } from './ph';

export const PAPER: Record<ModuleId, Question[]> = { M1, PH, M2 };

/** All 81 questions in real exam order: Mathematics 1, Physics, Mathematics 2. */
export const ALL_QUESTIONS: Question[] = [...M1, ...PH, ...M2];

export const QUESTION_BY_ID: Map<string, Question> = new Map(ALL_QUESTIONS.map((q) => [q.id, q]));

export function getQuestion(id: string): Question | undefined {
  return QUESTION_BY_ID.get(id);
}
