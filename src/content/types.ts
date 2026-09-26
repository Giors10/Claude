/** Shared content types for ESAT Crucible. */

export type ModuleId = 'M1' | 'M2' | 'PH';

export type Difficulty = 1 | 2 | 3 | 4 | 5;

/** An answer option is either rich text or a diagram (for "which graph" questions). */
export type Option = string | { diagram: string; alt: string };

export interface Question {
  /** Stable id, e.g. "M1-07". */
  id: string;
  module: ModuleId;
  /** Position within the module, 1-27. */
  n: number;
  /** Specification topic code, e.g. "M4", "MM6", "P3". */
  topic: string;
  /** Specification references, e.g. ["M4.16", "M4.15"]. */
  spec: string[];
  /** Short descriptive title used in review lists. */
  title: string;
  /** 1 (routine) to 5 (very hard), relative to real ESAT questions. */
  difficulty: Difficulty;
  /** Target time in seconds for a strong candidate. */
  time: number;
  /** Question stem (rich text). */
  stem: string;
  /** Optional diagram id rendered after the stem. */
  diagram?: string;
  /** Accessible description of the diagram. */
  diagramAlt?: string;
  /** Optional diagram shown with the worked solution. */
  solutionDiagram?: string;
  /** Numbered statements for "which is/are correct" questions. */
  statements?: string[];
  /** Text shown after the diagram/statements, usually the actual question. */
  prompt?: string;
  options: Option[];
  /** Index of the correct option. */
  answer: number;
  /** Progressive hints, gentlest first. */
  hints: string[];
  /** Full worked solution (rich text). */
  solution: string;
  /** Why tempting wrong options are wrong, keyed by option index. */
  traps: Record<number, string>;
  /** The one idea to remember. */
  insight: string;
  /** Skill tags used by analytics and the question bank. */
  skills: string[];
}

export interface ModuleInfo {
  id: ModuleId;
  name: string;
  short: string;
  minutes: number;
  /** Topic codes in specification order. */
  topics: { code: string; name: string }[];
}

export const MODULES: Record<ModuleId, ModuleInfo> = {
  M1: {
    id: 'M1',
    name: 'Mathematics 1',
    short: 'Maths 1',
    minutes: 40,
    topics: [
      { code: 'M1', name: 'Units' },
      { code: 'M2', name: 'Number' },
      { code: 'M3', name: 'Ratio and proportion' },
      { code: 'M4', name: 'Algebra' },
      { code: 'M5', name: 'Geometry' },
      { code: 'M6', name: 'Statistics' },
      { code: 'M7', name: 'Probability' },
    ],
  },
  PH: {
    id: 'PH',
    name: 'Physics',
    short: 'Physics',
    minutes: 40,
    topics: [
      { code: 'P1', name: 'Electricity' },
      { code: 'P2', name: 'Magnetism' },
      { code: 'P3', name: 'Mechanics' },
      { code: 'P4', name: 'Thermal physics' },
      { code: 'P5', name: 'Matter' },
      { code: 'P6', name: 'Waves' },
      { code: 'P7', name: 'Radioactivity' },
    ],
  },
  M2: {
    id: 'M2',
    name: 'Mathematics 2',
    short: 'Maths 2',
    minutes: 40,
    topics: [
      { code: 'MM1', name: 'Algebra and functions' },
      { code: 'MM2', name: 'Sequences and series' },
      { code: 'MM3', name: 'Coordinate geometry' },
      { code: 'MM4', name: 'Trigonometry' },
      { code: 'MM5', name: 'Exponentials and logarithms' },
      { code: 'MM6', name: 'Differentiation' },
      { code: 'MM7', name: 'Integration' },
      { code: 'MM8', name: 'Graphs of functions' },
    ],
  },
};

/** Real ESAT module order: Mathematics 1 first, then Physics, then Mathematics 2. */
export const MODULE_ORDER: ModuleId[] = ['M1', 'PH', 'M2'];

export const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export function topicName(code: string): string {
  for (const m of Object.values(MODULES)) {
    const t = m.topics.find((x) => x.code === code);
    if (t) return t.name;
  }
  return code;
}

export function moduleOfTopic(code: string): ModuleId {
  if (code.startsWith('MM')) return 'M2';
  if (code.startsWith('P')) return 'PH';
  return 'M1';
}
