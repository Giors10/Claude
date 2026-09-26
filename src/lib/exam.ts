import { PAPER, getQuestion } from '../content/paper';
import { MODULE_ORDER, type ModuleId, type Question } from '../content/types';
import { itemDifficulty, scoreModule, type ModuleScore } from './rasch';
import {
  emptyAnswer,
  getState,
  markActive,
  setState,
  uid,
  type AnswerRecord,
  type Attempt,
  type ModuleRun,
  type QuestionStats,
  type State,
} from './store';

export const MODULE_SECONDS = 40 * 60;

/* ---------------------------------------------------------------------- */
/* Creating attempts                                                      */
/* ---------------------------------------------------------------------- */

function newRun(module: ModuleId, questionIds: string[], limit: number): ModuleRun {
  return {
    module,
    questionIds,
    answers: Object.fromEntries(questionIds.map((id) => [id, emptyAnswer()])),
    segmentStart: null,
    used: 0,
    limit,
    done: false,
    timedOut: false,
  };
}

export function createMock(modules: ModuleId[], strict: boolean): string {
  const ordered = MODULE_ORDER.filter((m) => modules.includes(m));
  const attempt: Attempt = {
    id: uid(),
    kind: 'mock',
    strict,
    instant: false,
    title: ordered.length === 3 ? 'Crucible predicted paper' : 'Crucible paper: ' + ordered.join(' + '),
    createdAt: Date.now(),
    finishedAt: null,
    modules: ordered.map((m) => newRun(m, PAPER[m].map((q) => q.id), MODULE_SECONDS)),
    pos: { m: 0, q: 0 },
    interstitial: true,
  };
  setState((s) => ({ ...s, attempts: [...s.attempts, attempt], activeId: attempt.id }));
  markActive();
  return attempt.id;
}

export function createPractice(opts: { questionIds: string[]; title: string; timed: boolean; instant: boolean }): string {
  const qs = opts.questionIds.map((id) => getQuestion(id)).filter(Boolean) as Question[];
  const counts = new Map<ModuleId, number>();
  qs.forEach((q) => counts.set(q.module, (counts.get(q.module) ?? 0) + 1));
  const main = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'M1';
  const limit = opts.timed ? Math.round(qs.length * (MODULE_SECONDS / 27)) : 0;
  const attempt: Attempt = {
    id: uid(),
    kind: 'practice',
    strict: false,
    instant: opts.instant,
    title: opts.title,
    createdAt: Date.now(),
    finishedAt: null,
    modules: [newRun(main, qs.map((q) => q.id), limit)],
    pos: { m: 0, q: 0 },
    interstitial: false,
  };
  attempt.modules[0].segmentStart = Date.now();
  setState((s) => ({ ...s, attempts: [...s.attempts, attempt], activeId: attempt.id }));
  markActive();
  return attempt.id;
}

/* ---------------------------------------------------------------------- */
/* Reading attempts                                                       */
/* ---------------------------------------------------------------------- */

export function getAttempt(id: string | null | undefined, s: State = getState()): Attempt | undefined {
  return id ? s.attempts.find((a) => a.id === id) : undefined;
}

export function usedSeconds(run: ModuleRun, now = Date.now()): number {
  return run.used + (run.segmentStart !== null ? (now - run.segmentStart) / 1000 : 0);
}

export function remainingSeconds(run: ModuleRun, now = Date.now()): number {
  if (!run.limit) return Infinity;
  return Math.max(0, run.limit - usedSeconds(run, now));
}

/* ---------------------------------------------------------------------- */
/* Mutations                                                              */
/* ---------------------------------------------------------------------- */

function patchAttempt(id: string, fn: (a: Attempt) => Attempt) {
  setState((s) => ({ ...s, attempts: s.attempts.map((a) => (a.id === id ? fn(a) : a)) }));
}

function patchRun(id: string, m: number, fn: (r: ModuleRun) => ModuleRun) {
  patchAttempt(id, (a) => ({ ...a, modules: a.modules.map((r, i) => (i === m ? fn(r) : r)) }));
}

export function patchAnswer(id: string, m: number, qid: string, fn: (a: AnswerRecord) => AnswerRecord) {
  patchRun(id, m, (r) => ({ ...r, answers: { ...r.answers, [qid]: fn(r.answers[qid] ?? emptyAnswer()) } }));
}

export function selectAnswer(id: string, m: number, qid: string, choice: number | null) {
  patchAnswer(id, m, qid, (a) => {
    if (a.checked) return a;
    const first = a.first === null ? choice : a.first;
    const changed = a.choice !== null && choice !== a.choice;
    return { ...a, choice, first, changes: a.changes + (changed ? 1 : 0), struck: a.struck.filter((x) => x !== choice) };
  });
}

export function toggleFlag(id: string, m: number, qid: string) {
  patchAnswer(id, m, qid, (a) => ({ ...a, flagged: !a.flagged }));
}

export function toggleStrike(id: string, m: number, qid: string, option: number) {
  patchAnswer(id, m, qid, (a) => {
    if (a.checked) return a;
    const struck = a.struck.includes(option) ? a.struck.filter((x) => x !== option) : [...a.struck, option];
    return { ...a, struck, choice: a.choice === option ? null : a.choice };
  });
}

export function setConfidence(id: string, m: number, qid: string, c: AnswerRecord['confidence']) {
  patchAnswer(id, m, qid, (a) => ({ ...a, confidence: a.confidence === c ? null : c }));
}

export function addTime(id: string, m: number, qid: string, seconds: number) {
  if (!(seconds > 0)) return;
  patchAnswer(id, m, qid, (a) => ({ ...a, time: a.time + Math.min(seconds, 3600) }));
}

export function revealHint(id: string, m: number, qid: string) {
  patchAnswer(id, m, qid, (a) => ({ ...a, hints: a.hints + 1 }));
}

export function checkAnswer(id: string, m: number, qid: string) {
  patchAnswer(id, m, qid, (a) => ({ ...a, checked: true }));
  const a = getAttempt(id);
  const ans = a?.modules[m].answers[qid];
  const q = getQuestion(qid);
  if (q && ans && ans.choice !== null) recordOutcome([{ q, correct: ans.choice === q.answer }]);
}

export function goTo(id: string, m: number, q: number) {
  patchAttempt(id, (a) => ({ ...a, pos: { m, q } }));
}

export function startModule(id: string) {
  patchAttempt(id, (a) => ({
    ...a,
    interstitial: false,
    modules: a.modules.map((r, i) => (i === a.pos.m && r.segmentStart === null && !r.done ? { ...r, segmentStart: Date.now() } : r)),
  }));
}

/** Relaxed mode only: stop the clock. */
export function pause(id: string) {
  patchAttempt(id, (a) => ({
    ...a,
    modules: a.modules.map((r) => (r.segmentStart !== null ? { ...r, used: usedSeconds(r), segmentStart: null } : r)),
  }));
}

export function resume(id: string) {
  patchAttempt(id, (a) => ({
    ...a,
    modules: a.modules.map((r, i) => (i === a.pos.m && !r.done && r.segmentStart === null && !a.interstitial ? { ...r, segmentStart: Date.now() } : r)),
  }));
}

export function endModule(id: string, timedOut = false) {
  const now = Date.now();
  let finished = false;
  patchAttempt(id, (a) => {
    const m = a.pos.m;
    const modules = a.modules.map((r, i) =>
      i === m ? { ...r, used: Math.min(r.limit || Infinity, usedSeconds(r, now)), segmentStart: null, done: true, timedOut } : r,
    );
    const next = m + 1;
    if (next >= modules.length) {
      finished = true;
      return { ...a, modules, finishedAt: now, interstitial: false };
    }
    return { ...a, modules, pos: { m: next, q: 0 }, interstitial: a.kind === 'mock' };
  });
  if (finished) finalise(id);
  return finished;
}

export function abandon(id: string) {
  setState((s) => ({ ...s, attempts: s.attempts.filter((a) => a.id !== id), activeId: s.activeId === id ? null : s.activeId }));
}

/** Leitner intervals in days for boxes 0-5. */
const INTERVALS = [0, 1, 3, 7, 14, 30];
const DAY = 86_400_000;

function recordOutcome(items: { q: Question; correct: boolean }[]) {
  const now = Date.now();
  setState((s) => {
    const qstats = { ...s.qstats };
    for (const { q, correct } of items) {
      const prev: QuestionStats = qstats[q.id] ?? { attempts: 0, correct: 0, lastCorrect: null, lastAt: 0, box: 0, due: 0, note: '', bookmarked: false };
      const box = correct ? Math.min(5, prev.box + 1) : 0;
      qstats[q.id] = {
        ...prev,
        attempts: prev.attempts + 1,
        correct: prev.correct + (correct ? 1 : 0),
        lastCorrect: correct,
        lastAt: now,
        box,
        due: now + INTERVALS[box] * DAY,
      };
    }
    return { ...s, qstats };
  });
}

/** Record the outcome of a question answered outside an attempt (single-question practice). */
export function recordSingle(qid: string, correct: boolean) {
  const q = getQuestion(qid);
  if (q) recordOutcome([{ q, correct }]);
  markActive();
}

function finalise(id: string) {
  const a = getAttempt(id);
  if (!a) return;
  const items: { q: Question; correct: boolean }[] = [];
  for (const run of a.modules) {
    for (const qid of run.questionIds) {
      const q = getQuestion(qid);
      const ans = run.answers[qid];
      if (!q || !ans || ans.checked) continue; // practice answers were recorded when checked
      if (ans.choice === null && a.kind === 'practice') continue;
      items.push({ q, correct: ans.choice === q.answer });
    }
  }
  recordOutcome(items);
  setState((s) => ({ ...s, activeId: s.activeId === id ? null : s.activeId }));
  markActive();
}

/* ---------------------------------------------------------------------- */
/* Grading                                                                */
/* ---------------------------------------------------------------------- */

export interface GradedQuestion {
  q: Question;
  ans: AnswerRecord;
  correct: boolean;
  answered: boolean;
}

export interface GradedModule {
  run: ModuleRun;
  module: ModuleId;
  items: GradedQuestion[];
  raw: number;
  answered: number;
  score: ModuleScore;
  seconds: number;
}

export function gradeRun(run: ModuleRun): GradedModule {
  const items: GradedQuestion[] = run.questionIds.map((id) => {
    const q = getQuestion(id)!;
    const ans = run.answers[id] ?? emptyAnswer();
    return { q, ans, answered: ans.choice !== null, correct: ans.choice === q.answer };
  });
  const raw = items.filter((i) => i.correct).length;
  return {
    run,
    module: run.module,
    items,
    raw,
    answered: items.filter((i) => i.answered).length,
    score: scoreModule(raw, items.map((i) => itemDifficulty(i.q))),
    seconds: Math.round(run.used),
  };
}

/** For practice sets spanning several modules, grade each module's questions separately. */
export function gradeByModule(a: Attempt): GradedModule[] {
  if (a.kind === 'mock') return a.modules.map(gradeRun);
  const run = a.modules[0];
  const groups = new Map<ModuleId, string[]>();
  for (const id of run.questionIds) {
    const q = getQuestion(id);
    if (!q) continue;
    groups.set(q.module, [...(groups.get(q.module) ?? []), id]);
  }
  return MODULE_ORDER.filter((m) => groups.has(m)).map((m) => {
    const ids = groups.get(m)!;
    const sub: ModuleRun = { ...run, module: m, questionIds: ids };
    const g = gradeRun(sub);
    g.seconds = Math.round(ids.reduce((s, id) => s + (run.answers[id]?.time ?? 0), 0));
    return g;
  });
}

export function mistakesDue(s: State, now = Date.now()): string[] {
  // A question stays in the review queue from the moment it is answered wrongly
  // until it has been answered correctly three times at growing intervals.
  return Object.entries(s.qstats)
    .filter(([, st]) => st.attempts > st.correct && st.box < 3 && st.due <= now)
    .map(([id]) => id);
}
