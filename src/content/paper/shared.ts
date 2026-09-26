/**
 * Answer options for "which of the statements is/are correct?" questions,
 * in the order the real ESAT uses (Mocks 2 and 3).
 */
export const STATEMENT_OPTIONS: string[] = [
  'none of them',
  '1 only',
  '2 only',
  '3 only',
  '1 and 2 only',
  '1 and 3 only',
  '2 and 3 only',
  '1, 2 and 3',
];

/** Index of each answer in STATEMENT_OPTIONS. */
export const ST = {
  none: 0,
  s1: 1,
  s2: 2,
  s3: 3,
  s12: 4,
  s13: 5,
  s23: 6,
  all: 7,
} as const;
