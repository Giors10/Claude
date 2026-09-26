import { useSyncExternalStore } from 'react';
import type { ModuleId } from '../content/types';

/* ---------------------------------------------------------------------- */
/* Types                                                                  */
/* ---------------------------------------------------------------------- */

export type Confidence = 'sure' | 'unsure' | 'guess';

export interface AnswerRecord {
  /** Final answer (option index) or null if unanswered. */
  choice: number | null;
  /** First answer given, to detect right→wrong changes. */
  first: number | null;
  /** How many times the answer was changed after first being set. */
  changes: number;
  /** Seconds spent on this question. */
  time: number;
  flagged: boolean;
  /** Options the candidate crossed out. */
  struck: number[];
  confidence: Confidence | null;
  /** Hints revealed (practice mode). */
  hints: number;
  /** In practice mode: answer has been checked. */
  checked: boolean;
}

export interface ModuleRun {
  module: ModuleId;
  questionIds: string[];
  answers: Record<string, AnswerRecord>;
  /** Wall-clock start of the current timing segment (ms), null when paused/not started. */
  segmentStart: number | null;
  /** Seconds used before the current segment. */
  used: number;
  /** Time limit in seconds (0 = untimed). */
  limit: number;
  done: boolean;
  timedOut: boolean;
}

export type AttemptKind = 'mock' | 'practice';

export interface Attempt {
  id: string;
  kind: AttemptKind;
  /** strict = real exam rules (no pause, no going back to earlier modules). */
  strict: boolean;
  /** practice: reveal the answer after each question. */
  instant: boolean;
  title: string;
  createdAt: number;
  finishedAt: number | null;
  modules: ModuleRun[];
  pos: { m: number; q: number };
  /** Between modules in a mock: waiting for the candidate to start the next one. */
  interstitial: boolean;
}

export interface QuestionStats {
  attempts: number;
  correct: number;
  lastCorrect: boolean | null;
  lastAt: number;
  /** Mistake-review scheduling (Leitner box 0-5 and due time). */
  box: number;
  due: number;
  note: string;
  bookmarked: boolean;
}

export interface CardState {
  box: number;
  due: number;
  seen: number;
  lapses: number;
}

export interface DrillRun {
  type: string;
  at: number;
  correct: number;
  total: number;
  seconds: number;
}

export interface Settings {
  theme: 'system' | 'light' | 'dark';
  textSize: 'm' | 'l' | 'xl';
  showTimer: boolean;
  confidence: boolean;
  timeWarnings: boolean;
  testDate: string;
  targets: Record<ModuleId, number>;
  hoursPerDay: number;
}

export interface State {
  version: 1;
  attempts: Attempt[];
  activeId: string | null;
  qstats: Record<string, QuestionStats>;
  cards: Record<string, CardState>;
  drills: DrillRun[];
  settings: Settings;
  planDone: Record<string, boolean>;
  learnRead: Record<string, number>;
  activeDays: string[];
}

/* ---------------------------------------------------------------------- */
/* Defaults & persistence                                                 */
/* ---------------------------------------------------------------------- */

const KEY = 'esat-crucible:v1';

export const DEFAULT_TEST_DATE = '2026-10-12';

export function defaultState(): State {
  return {
    version: 1,
    attempts: [],
    activeId: null,
    qstats: {},
    cards: {},
    drills: [],
    settings: {
      theme: 'system',
      textSize: 'm',
      showTimer: true,
      confidence: false,
      timeWarnings: true,
      testDate: DEFAULT_TEST_DATE,
      targets: { M1: 7, PH: 7, M2: 7 },
      hoursPerDay: 2,
    },
    planDone: {},
    learnRead: {},
    activeDays: [],
  };
}

function load(): State {
  const base = defaultState();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw) as Partial<State>;
    return mergeState(base, parsed);
  } catch {
    return base;
  }
}

export function mergeState(base: State, parsed: Partial<State>): State {
  return {
    ...base,
    ...parsed,
    version: 1,
    settings: { ...base.settings, ...(parsed.settings ?? {}), targets: { ...base.settings.targets, ...(parsed.settings?.targets ?? {}) } },
    attempts: Array.isArray(parsed.attempts) ? parsed.attempts : [],
    qstats: parsed.qstats ?? {},
    cards: parsed.cards ?? {},
    drills: Array.isArray(parsed.drills) ? parsed.drills : [],
    planDone: parsed.planDone ?? {},
    learnRead: parsed.learnRead ?? {},
    activeDays: Array.isArray(parsed.activeDays) ? parsed.activeDays : [],
  };
}

let state: State = typeof window === 'undefined' ? defaultState() : load();
const listeners = new Set<() => void>();
let saveTimer: number | undefined;
let storageOk = true;

function persist() {
  if (typeof window === 'undefined') return;
  window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
      storageOk = true;
    } catch {
      storageOk = false;
    }
  }, 250);
}

/** Save immediately (used before the page is hidden). */
export function flush() {
  if (typeof window === 'undefined') return;
  window.clearTimeout(saveTimer);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    storageOk = false;
  }
}

export function storageAvailable(): boolean {
  return storageOk;
}

export function getState(): State {
  return state;
}

export function setState(update: (s: State) => State): void {
  const next = update(state);
  if (next === state) return;
  state = next;
  listeners.forEach((l) => l());
  persist();
}

export function replaceState(next: State): void {
  state = next;
  listeners.forEach((l) => l());
  persist();
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useStore<T>(selector: (s: State) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => selector(state),
    () => selector(state),
  );
}

/* ---------------------------------------------------------------------- */
/* Helpers                                                                */
/* ---------------------------------------------------------------------- */

export function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function markActive(): void {
  const t = today();
  if (state.activeDays.includes(t)) return;
  setState((s) => ({ ...s, activeDays: [...s.activeDays, t].slice(-400) }));
}

export function emptyAnswer(): AnswerRecord {
  return { choice: null, first: null, changes: 0, time: 0, flagged: false, struck: [], confidence: null, hints: 0, checked: false };
}

export function updateSettings(patch: Partial<Settings>): void {
  setState((s) => ({ ...s, settings: { ...s.settings, ...patch } }));
}

export function exportJson(): string {
  return JSON.stringify({ app: 'esat-crucible', exportedAt: new Date().toISOString(), state }, null, 2);
}

export function importJson(text: string): { ok: true } | { ok: false; error: string } {
  try {
    const data = JSON.parse(text);
    const incoming = data?.state ?? data;
    if (!incoming || typeof incoming !== 'object' || !('attempts' in incoming)) {
      return { ok: false, error: 'That is not an ESAT Crucible backup.' };
    }
    replaceState(mergeState(defaultState(), incoming as Partial<State>));
    flush();
    return { ok: true };
  } catch {
    return { ok: false, error: 'The backup could not be read. Check that it was copied in full.' };
  }
}

export function resetAll(): void {
  replaceState(defaultState());
  flush();
}
