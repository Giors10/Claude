import { LEARN } from '../content/learn';
import { ALL_QUESTIONS, PAPER_BY_ID, READY_PAPERS, type PaperId } from '../content/paper';
import type { State } from './store';
import { daysUntil } from './format';

export interface PlanTask {
  id: string;
  kind: 'learn' | 'practice' | 'drill' | 'cards' | 'mock' | 'review' | 'rest' | 'strategy' | 'official';
  title: string;
  minutes: number;
  route?: [string, ...string[]];
  external?: string;
}

export interface PlanDay {
  date: string;
  label: string;
  tasks: PlanTask[];
  special?: 'test' | 'eve' | 'mock';
}

export const OFFICIAL_PREP_URL = 'https://esat-tmua.ac.uk/esat-preparation-materials/';

/** Topic weights: how much of a typical module each topic tends to occupy. */
const WEIGHT: Record<string, number> = {
  M1: 0.6, M2: 1, M3: 0.9, M4: 1.6, M5: 1.4, M6: 0.7, M7: 0.8,
  MM1: 1.2, MM2: 0.9, MM3: 0.8, MM4: 1, MM5: 0.8, MM6: 1, MM7: 1, MM8: 0.9,
  P1: 1.3, P2: 0.8, P3: 1.6, P4: 0.6, P5: 0.8, P6: 0.8, P7: 0.7,
};

function iso(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Accuracy per topic from the question history (null = no data). */
export function topicAccuracy(s: State): Record<string, number | null> {
  const out: Record<string, number | null> = {};
  for (const t of LEARN) {
    let a = 0;
    let c = 0;
    for (const q of ALL_QUESTIONS) {
      if (q.topic !== t.code) continue;
      const st = s.qstats[q.id];
      if (st) {
        a += st.attempts;
        c += st.correct;
      }
    }
    out[t.code] = a ? c / a : null;
  }
  return out;
}

/** Topics ordered from highest to lowest priority. */
export function topicPriority(s: State): string[] {
  const acc = topicAccuracy(s);
  return LEARN.map((t) => {
    const a = acc[t.code];
    const need = a === null ? 0.55 : 1 - a; // unknown topics sit in the middle
    const unread = s.learnRead[t.code] ? 0 : 0.1;
    return { code: t.code, score: (need + unread) * WEIGHT[t.code] };
  })
    .sort((x, y) => y.score - x.score)
    .map((x) => x.code);
}

/** The order in which to sit the mock papers: the two realistic papers first, the hardest last. */
export const SUGGESTED_PAPER_ORDER: PaperId[] = ['forge', 'anvil', 'crucible'];

/** Mock papers not yet completed, in the suggested order. */
export function papersToSit(s: State): PaperId[] {
  const sat = new Set(s.attempts.filter((a) => a.kind === 'mock' && a.finishedAt).map((a) => a.paper ?? 'crucible'));
  return SUGGESTED_PAPER_ORDER.filter((id) => !sat.has(id) && READY_PAPERS.some((p) => p.id === id));
}

const DRILL_ROTATION = ['mixed', 'trig', 'surds', 'standard', 'fractions', 'logs', 'units', 'percent', 'physics', 'powers', 'estimate'];

export function buildPlan(s: State, today = new Date()): PlanDay[] {
  const days = daysUntil(s.settings.testDate, today);
  if (days < 0) return [];
  const minutes = Math.max(30, Math.round(s.settings.hoursPerDay * 60));
  const mocksTaken = s.attempts.filter((a) => a.kind === 'mock' && a.finishedAt).length;
  const priority = topicPriority(s);
  const horizon = Math.min(days, 42);
  const plan: PlanDay[] = [];
  let topicIdx = 0;

  // Mock days: an early diagnostic if none taken, a final full paper 3-4 days out and, with time to spare, one or two in between.
  const mockDays = new Set<number>();
  if (mocksTaken === 0 && days >= 3) mockDays.add(0);
  if (days >= 7) mockDays.add(days - 4);
  if (days >= 28) {
    mockDays.add(Math.floor(days / 3));
    mockDays.add(Math.floor((2 * days) / 3));
  } else if (days >= 14) {
    mockDays.add(Math.floor(days / 2));
  }
  const queue = papersToSit(s);

  for (let i = 0; i <= horizon; i++) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
    const date = iso(d);
    const label = d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
    const tasks: PlanTask[] = [];
    const add = (task: Omit<PlanTask, 'id'> & { key: string }) => {
      const { key, ...rest } = task;
      tasks.push({ id: `${date}:${key}`, ...rest });
    };

    if (i === days) {
      add({ key: 'test', kind: 'rest', title: 'ESAT day: light warm-up drill, then trust your preparation', minutes: 10, route: ['drills'] });
      plan.push({ date, label, tasks, special: 'test' });
      continue;
    }
    if (i === days - 1) {
      add({ key: 'cards', kind: 'cards', title: 'Flashcards: clear everything due', minutes: 20, route: ['cards'] });
      add({ key: 'formulas', kind: 'strategy', title: 'Skim the formula sheet', minutes: 15, route: ['formulas'] });
      add({ key: 'strategy', kind: 'strategy', title: 'Re-read the exam strategy page', minutes: 10, route: ['strategy'] });
      add({ key: 'rest', kind: 'rest', title: 'Stop early and sleep well', minutes: 0 });
      plan.push({ date, label, tasks, special: 'eve' });
      continue;
    }
    if (mockDays.has(i)) {
      const next = queue.shift();
      if (next) {
        const p = PAPER_BY_ID[next];
        const title =
          mocksTaken === 0 && i === 0
            ? `Diagnostic: sit ${p.label} (${p.name}) under strict timing`
            : `Full timed paper: ${p.label} (${p.name})${next === 'crucible' ? ', the hardest,' : ''} under strict timing`;
        add({ key: 'mock', kind: 'mock', title, minutes: 120, route: ['paper', next] });
      } else {
        add({ key: 'official', kind: 'official', title: 'Full timed paper: an official ESAT practice paper (free from UAT-UK)', minutes: 120, external: OFFICIAL_PREP_URL });
      }
      add({ key: 'review', kind: 'review', title: 'Review every mistake and write a note on each', minutes: Math.min(60, Math.max(20, minutes - 120)), route: ['practice'] });
      plan.push({ date, label, tasks, special: 'mock' });
      continue;
    }

    let budget = minutes;
    add({ key: 'drill', kind: 'drill', title: `Speed drill: ${DRILL_ROTATION[i % DRILL_ROTATION.length]}`, minutes: 10, route: ['drills'] });
    budget -= 10;
    add({ key: 'cards', kind: 'cards', title: 'Flashcards: due reviews and new cards', minutes: 15, route: ['cards'] });
    budget -= 15;
    if (mocksTaken > 0 || i > 0) {
      add({ key: 'review', kind: 'review', title: 'Mistake review queue', minutes: 15, route: ['practice'] });
      budget -= 15;
    }
    while (budget >= 45) {
      const code = priority[topicIdx % priority.length];
      topicIdx++;
      const topic = LEARN.find((t) => t.code === code)!;
      add({ key: `learn-${code}`, kind: 'learn', title: `Learn ${code}: ${topic.title}`, minutes: 25, route: ['learn', code] });
      add({ key: `practice-${code}`, kind: 'practice', title: `Practise ${code} questions with instant feedback`, minutes: 20, route: ['practice', 'topic', code] });
      budget -= 45;
    }
    plan.push({ date, label, tasks });
  }
  return plan;
}
