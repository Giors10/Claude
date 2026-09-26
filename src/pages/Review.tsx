import React, { useEffect, useMemo } from 'react';
import { MODULES } from '../content/types';
import { Icon } from '../components/Icon';
import { QuestionView } from '../components/QuestionView';
import { SolutionPanel } from '../components/SolutionPanel';
import { getAttempt, gradeByModule, type GradedQuestion } from '../lib/exam';
import { href, navigate } from '../lib/router';
import { useStore } from '../lib/store';

type Filter = 'all' | 'wrong' | 'blank' | 'flagged' | 'right';

const FILTERS: [Filter, string][] = [
  ['all', 'All'],
  ['wrong', 'Wrong'],
  ['blank', 'Not answered'],
  ['flagged', 'Flagged'],
  ['right', 'Correct'],
];

function matches(f: Filter, it: GradedQuestion) {
  switch (f) {
    case 'all':
      return true;
    case 'wrong':
      return !it.correct;
    case 'blank':
      return !it.answered;
    case 'flagged':
      return it.ans.flagged;
    case 'right':
      return it.correct;
  }
}

export function ReviewPage({ attemptId, qid }: { attemptId?: string; qid?: string }) {
  const attempt = useStore((s) => getAttempt(attemptId, s));
  const graded = useMemo(() => (attempt ? gradeByModule(attempt) : []), [attempt]);
  const all = useMemo(() => graded.flatMap((g) => g.items), [graded]);

  // The second route argument is either a question id or a filter name.
  const isFilter = qid && FILTERS.some(([f]) => f === qid);
  const [filter, setFilter] = React.useState<Filter>(isFilter ? (qid as Filter) : 'all');
  const list = all.filter((it) => matches(filter, it));
  const currentId = !isFilter && qid ? qid : list[0]?.q.id;
  const idx = list.findIndex((it) => it.q.id === currentId);
  const current = all.find((it) => it.q.id === currentId);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) return;
      if (e.key === 'ArrowRight' && idx < list.length - 1) navigate('review', attemptId!, list[idx + 1].q.id);
      if (e.key === 'ArrowLeft' && idx > 0) navigate('review', attemptId!, list[idx - 1].q.id);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [idx, list, attemptId]);

  if (!attempt) {
    return (
      <div className="page">
        <div className="empty">This attempt could not be found.</div>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="row-between">
        <div className="stack" style={{ gap: 4 }}>
          <a href={href('results', attempt.id)} className="row" style={{ gap: 4, fontSize: '0.9rem' }}>
            <Icon name="left" size={16} /> Back to results
          </a>
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>Review: {attempt.title}</h1>
        </div>
        <div className="seg" role="group" aria-label="Filter questions">
          {FILTERS.map(([f, label]) => {
            const count = all.filter((it) => matches(f, it)).length;
            return (
              <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)} disabled={count === 0 && f !== 'all'}>
                {label} <span className="muted">{count}</span>
              </button>
            );
          })}
        </div>
      </header>

      <div className="stack">
        {graded.map((g) => (
          <div key={g.module} className="row" style={{ gap: 6 }}>
            <span className="eyebrow" style={{ width: 70 }}>
              {MODULES[g.module].short}
            </span>
            {g.items.map((it, i) => {
              const visible = matches(filter, it);
              const cls = 'nav-cell' + (!it.answered ? '' : it.correct ? ' good' : ' bad') + (it.q.id === currentId ? ' current' : '') + (it.ans.flagged ? ' flagged' : '');
              return (
                <button
                  key={it.q.id}
                  type="button"
                  className={cls}
                  style={{ width: 34, height: 32, opacity: visible ? 1 : 0.3 }}
                  onClick={() => navigate('review', attempt.id, it.q.id)}
                  aria-label={`${MODULES[g.module].short} question ${i + 1}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {!current ? (
        <div className="empty">No questions match this filter.</div>
      ) : (
        <div className="stack-l" style={{ maxWidth: 860 }}>
          <div className="card">
            <QuestionView q={current.q} number={current.q.n} showMeta selected={current.ans.choice} reveal moduleLabel />
          </div>
          <SolutionPanel q={current.q} ans={current.ans} />
          <div className="row-between">
            <button type="button" className="btn" disabled={idx <= 0} onClick={() => navigate('review', attempt.id, list[idx - 1].q.id)}>
              <Icon name="left" /> Previous
            </button>
            <span className="muted mono">
              {idx >= 0 ? idx + 1 : '–'} / {list.length}
            </span>
            <button type="button" className="btn btn-primary" disabled={idx < 0 || idx >= list.length - 1} onClick={() => navigate('review', attempt.id, list[idx + 1].q.id)}>
              Next <Icon name="right" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
