import type { ModuleId } from '../types';

export interface LearnTopic {
  code: string;
  module: ModuleId;
  title: string;
  /** One-sentence summary. */
  summary: string;
  /** What the specification covers, in brief. */
  specNote: string;
  sections: { heading: string; body: string }[];
  formulas: { name: string; tex: string }[];
  traps: string[];
  tips: string[];
  example: { question: string; solution: string };
}
