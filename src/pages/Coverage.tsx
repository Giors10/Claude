import React, { useMemo, useState } from 'react';
import { ALL_QUESTIONS, PAPERS, paperOf } from '../content/paper';
import { SPEC, type SpecPoint } from '../content/spec';
import { MODULE_ORDER, MODULES, type ModuleId, type Question } from '../content/types';
import { Icon } from '../components/Icon';
import { createPractice } from '../lib/exam';
import { shuffle } from '../lib/format';
import { href, navigate } from '../lib/router';
import { useStore, type QuestionStats } from '../lib/store';

type Status = 'secure' | 'work' | 'new';
type Filter = 'all' | Status;

const STATUS_LABEL: Record<Status, string> = {
  secure: 'Secure: your last answer to every question on it was right',
  work: 'Needs work: you got a question on it wrong last time',
  new: 'Not attempted yet',
};

/** Questions testing each specification point, in paper order. */
const QUESTIONS_FOR: Map<string, Question[]> = (() => {
  const map = new Map<string, Question[]>();
  for (const q of ALL_QUESTIONS) {
    for (const code of q.spec) {
      const list = map.get(code) ?? [];
      list.push(q);
      map.set(code, list);
    }
  }
  return map;
})();

function pointStatus(point: SpecPoint, qstats: Record<string, QuestionStats>): Status {
  const tried = (QUESTIONS_FOR.get(point.code) ?? []).map((q) => qstats[q.id]).filter((s) => s && s.attempts > 0);
  if (!tried.length) return 'new';
  return tried.some((s) => s.lastCorrect === false) ? 'work' : 'secure';
}

function questionStatus(q: Question, qstats: Record<string, QuestionStats>): Status {
  const s = qstats[q.id];
  if (!s || s.attempts === 0) return 'new';
  return s.lastCorrect ? 'secure' : 'work';
}

export function CoveragePage({ module }: { module?: string }) {
  const qstats = useStore((s) => s.qstats);
  const activeId = useStore((s) => s.activeId);
  const mod: ModuleId = MODULE_ORDER.includes(module as ModuleId) ? (module as ModuleId) : 'M1';
  const [filter, setFilter] = useState<Filter>('all');
  const [needle, setNeedle] = useState('');

  const points = useMemo(() => SPEC.filter((p) => p.module === mod).map((p) => ({ point: p, status: pointStatus(p, qstats) })), [mod, qstats]);
  const counts = useMemo(() => {
    const c: Record<Status, number> = { secure: 0, work: 0, new: 0 };
    points.forEach((p) => c[p.status]++);
    return c;
  }, [points]);
  const moduleQuestions = ALL_QUESTIONS.filter((q) => q.module === mod).length;
  const covered = points.filter((p) => (QUESTIONS_FOR.get(p.point.code) ?? []).length > 0).length;

  const shown = points.filter(({ point, status }) => {
    if (filter !== 'all' && status !== filter) return false;
    const n = needle.trim().toLowerCase();
    return !n || `${point.code} ${point.text}`.toLowerCase().includes(n);
  });

  const practiseGaps = () => {
    const ids = new Set<string>();
    for (const { point, status } of points) {
      if (status === 'secure') continue;
      const qs = (QUESTIONS_FOR.get(point.code) ?? []).filter((q) => questionStatus(q, qstats) !== 'secure');
      if (qs.length) ids.add(shuffle(qs)[0].id);
    }
    const chosen = shuffle([...ids]).slice(0, 15);
    if (!chosen.length) return;
    createPractice({ questionIds: chosen, title: `Specification gaps: ${MODULES[mod].name}`, timed: false, instant: true });
    navigate('exam');
  };

  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">Specification map · {SPEC.length} points</span>
        <h1>Every point of the ESAT specification</h1>
        <p className="lede">
          The content specification for the October 2026 and January 2027 sittings, point by point, with the mock-paper questions that test each
          one. All {SPEC.length} points are tested at least once across the {PAPERS.length} papers, and your answers colour each point so gaps show
          at a glance.
        </p>
      </header>

      <section className="card stack">
        <div className="row-between">
          <div className="seg" role="group" aria-label="Module">
            {MODULE_ORDER.map((m) => (
              <button key={m} type="button" aria-pressed={m === mod} onClick={() => navigate('coverage', m)}>
                {MODULES[m].name}
              </button>
            ))}
          </div>
          <button type="button" className="btn btn-primary" onClick={practiseGaps} disabled={!!activeId || counts.secure === points.length}>
            <Icon name="target" /> Practise my gaps
          </button>
        </div>
        <div className="grid grid-4">
          <div className="stat">
            <span className="stat-num">
              {covered}/{points.length}
            </span>
            <span className="stat-label">points tested by {moduleQuestions} questions</span>
          </div>
          <div className="stat">
            <span className="stat-num" style={{ color: 'var(--good)' }}>
              {counts.secure}
            </span>
            <span className="stat-label">secure</span>
          </div>
          <div className="stat">
            <span className="stat-num" style={{ color: 'var(--bad)' }}>
              {counts.work}
            </span>
            <span className="stat-label">need work</span>
          </div>
          <div className="stat">
            <span className="stat-num">{counts.new}</span>
            <span className="stat-label">not attempted</span>
          </div>
        </div>
        <div className="row">
          <div className="field" style={{ flex: '1 1 220px' }}>
            <label htmlFor="spec-q">Search this module</label>
            <input id="spec-q" className="input" placeholder="e.g. bounds, P6.3, tangent" value={needle} onChange={(e) => setNeedle(e.target.value)} />
          </div>
          <div className="field">
            <span className="field-label">Show</span>
            <div className="seg" role="group" aria-label="Show points">
              {(['all', 'work', 'new', 'secure'] as Filter[]).map((f) => (
                <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>
                  {f === 'all' ? 'All' : f === 'work' ? 'Needs work' : f === 'new' ? 'Not attempted' : 'Secure'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {MODULES[mod].topics.map((t) => {
        const rows = shown.filter((p) => p.point.topic === t.code);
        if (!rows.length) return null;
        return (
          <section key={t.code} className="section spec-topic" aria-labelledby={`spec-${t.code}`}>
            <div className="section-head">
              <h2 id={`spec-${t.code}`} className="row" style={{ gap: 10 }}>
                <span className="chip chip-mono">{t.code}</span> {t.name}
              </h2>
              <a href={href('learn', t.code)} style={{ fontSize: '0.86rem' }}>
                Topic notes
              </a>
            </div>
            <ol className="spec-list">
              {rows.map(({ point, status }) => (
                <li key={point.code} className="spec-row" data-status={status}>
                  <span className="spec-dot" title={STATUS_LABEL[status]} aria-label={STATUS_LABEL[status]} role="img" />
                  <span className="spec-code">{point.code}</span>
                  <span className="spec-text">{point.text}</span>
                  <span className="spec-qs">
                    {(QUESTIONS_FOR.get(point.code) ?? []).map((q) => (
                      <a key={q.id} className="qchip" data-status={questionStatus(q, qstats)} href={href('question', q.id)} title={q.title}>
                        {paperOf(q).label} Q{q.n}
                      </a>
                    ))}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        );
      })}
      {shown.length === 0 && <div className="empty">No points match. Try another filter.</div>}
    </div>
  );
}
