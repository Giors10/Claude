import { LEARN_M1 } from './m1';
import { LEARN_M2 } from './m2';
import { LEARN_PH } from './ph';
import type { LearnTopic } from './types';

export const LEARN: LearnTopic[] = [...LEARN_M1, ...LEARN_PH, ...LEARN_M2];

export function learnTopic(code: string): LearnTopic | undefined {
  return LEARN.find((t) => t.code === code);
}

export type { LearnTopic };
