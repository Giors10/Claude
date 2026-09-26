import React, { useMemo } from 'react';
import { LEARN } from '../content/learn';
import { FLASHCARDS } from '../content/flashcards';
import { MODULE_ORDER, MODULES } from '../content/types';
import { ScoreRuler } from '../components/Charts';
import { Icon } from '../components/Icon';
import { gradeByModule, mistakesDue } from '../lib/exam';
import { daysUntil, fmtDate } from '../lib/format';
import { buildPlan, topicAccuracy } from '../lib/planner';
import { href, navigate } from '../lib/router';
import { getState, useStore } from '../lib/store';

const TOOLS: { route: string; icon: string; title: string; desc: string }[] = [
  { route: 'learn', icon: 'learn', title: 'Topic notes', desc: 'All 22 specification topics, with traps and worked examples.' },
  { route: 'formulas', icon: 'formula', title: 'Formula sheet', desc: 'Everything you must memorise, searchable.' },
  { route: 'cards', icon: 'cards', title: 'Flashcards', desc: `${FLASHCARDS.length} cards with spaced repetition.` },
  { route: 'drills', icon: 'bolt', title: 'Speed drills', desc: 'Unlimited non-calculator arithmetic, surds, trig and logs.' },
  { route: 'strategy', icon: 'compass', title: 'Exam strategy', desc: 'Pacing checkpoints, triage and trap patterns.' },
  { route: 'bank', icon: 'bank', title: 'Question bank', desc: 'Every question, searchable by spec point and skill.' },
  { route: 'planner', icon: 'calendar', title: 'Study planner', desc: 'A day-by-day plan built from your weakest topics.' },
  { route: 'calculator', icon: 'calculator', title: 'Score calculator', desc: 'Raw mark to 1.0–9.0 with official percentiles.' },
];

export function HomePage() {
  const attempts = useStore((s) => s.attempts);
  const qstats = useStore((s) => s.qstats);
  const cards = useStore((s) => s.cards);
  const settings = useStore((s) => s.settings);
  const planDone = useStore((s) => s.planDone);
  const learnRead = useStore((s) => s.learnRead);

  const lastMock = useMemo(() => [...attempts].filter((a) => a.kind === 'mock' && a.finishedAt).sort((a, b) => b.createdAt - a.createdAt)[0], [attempts]);
  const graded = useMemo(() => (lastMock ? gradeByModule(lastMock) : null), [lastMock]);
  const due = useMemo(() => mistakesDue(getState()).length, [qstats]); // eslint-disable-line react-hooks/exhaustive-deps
  const cardsDue = useMemo(() => Object.values(cards).filter((c) => c.due <= Date.now()).length, [cards]);
  const acc = useMemo(() => topicAccuracy(getState()), [qstats]); // eslint-disable-line react-hooks/exhaustive-deps
  const todayPlan = useMemo(() => buildPlan(getState())[0], [settings, qstats, attempts, learnRead]); // eslint-disable-line react-hooks/exhaustive-deps
  const days = daysUntil(settings.testDate);
  const m1 = graded?.find((g) => g.module === 'M1');

  return (
    <div className="page">
      <section className="hero">
        <div className="stack-l">
          <span className="eyebrow">For the October 2026 and January 2027 ESAT</span>
          <h1>The hardest ESAT paper you’ll sit before the real one.</h1>
          <p className="lede">
            81 original questions across Mathematics 1, Physics and Mathematics 2, set harder than the real test. Every answer is triple-checked,
            every question has a full worked solution, and your result is scored on the official 1.0–9.0 scale.
          </p>
          <div className="row">
            <button type="button" className="btn btn-primary btn-lg" onClick={() => navigate('paper')}>
              <Icon name="play" /> Sit the Crucible paper
            </button>
            <button type="button" className="btn btn-lg" onClick={() => navigate('practice')}>
              <Icon name="target" /> Practise by topic
            </button>
          </div>
          <div className="hero-spec">
            <div>
              <div className="v tnum">81</div>
              <div className="k">questions, 27 per module</div>
            </div>
            <div>
              <div className="v tnum">3 × 40</div>
              <div className="k">minutes, separately timed</div>
            </div>
            <div>
              <div className="v tnum">1.0–9.0</div>
              <div className="k">Rasch-scaled score</div>
            </div>
          </div>
        </div>
        <div className="card stack" style={{ background: 'var(--surface)' }}>
          <span className="eyebrow">{m1 ? 'Your latest Mathematics 1 score' : 'Mathematics 1 scores, October 2025'}</span>
          <ScoreRuler module="M1" score={m1?.score.scaled} low={m1?.score.low} high={m1?.score.high} label="You" />
          <p className="muted" style={{ fontSize: '0.86rem' }}>
            {m1
              ? `${m1.raw}/27 on the Crucible paper. The bars show how October 2025 candidates scored.`
              : 'Every result is placed against the official distribution: the median candidate scores 4.5 and the top 10% score above 7.0.'}
          </p>
        </div>
      </section>

      <section className="grid grid-3">
        <a className="card stack" href={href('planner')} style={{ textDecoration: 'none', color: 'inherit' }}>
          <span className="eyebrow">Your ESAT</span>
          {days >= 0 ? (
            <>
              <span className="big-score">{days}</span>
              <span className="muted">
                day{days === 1 ? '' : 's'} to go · {fmtDate(new Date(settings.testDate + 'T00:00:00').getTime())}
              </span>
            </>
          ) : (
            <span className="muted">Choose your next test date in the planner.</span>
          )}
        </a>
        <div className="card stack">
          <span className="eyebrow">Due today</span>
          <div className="row-between">
            <span>Mistakes to review</span>
            <span className={'chip ' + (due ? 'chip-warn' : 'chip-good')}>{due}</span>
          </div>
          <div className="row-between">
            <span>Flashcards due</span>
            <span className={'chip ' + (cardsDue ? 'chip-warn' : 'chip-good')}>{cardsDue}</span>
          </div>
          <div className="row">
            <a className="btn btn-sm" href={href('practice')}>
              Review mistakes
            </a>
            <a className="btn btn-sm" href={href('cards')}>
              Flashcards
            </a>
          </div>
        </div>
        <div className="card stack">
          <div className="row-between">
            <span className="eyebrow">Today’s plan</span>
            <a href={href('planner')} style={{ fontSize: '0.84rem' }}>
              Full plan
            </a>
          </div>
          {todayPlan ? (
            <ul className="list-plain stack" style={{ gap: 6 }}>
              {todayPlan.tasks.slice(0, 4).map((t) => (
                <li key={t.id} className="row" style={{ gap: 8, flexWrap: 'nowrap', fontSize: '0.9rem' }}>
                  <Icon name={planDone[t.id] ? 'check' : 'right'} size={15} className="muted" />
                  <span style={{ textDecoration: planDone[t.id] ? 'line-through' : undefined }}>{t.title}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">Set a test date to generate a plan.</p>
          )}
        </div>
      </section>

      {graded && (
        <section className="card stack">
          <div className="row-between">
            <h3>Latest paper</h3>
            <a href={href('results', lastMock!.id)}>Full analysis</a>
          </div>
          <div className="grid grid-3">
            {graded.map((g) => (
              <div key={g.module} className="stat">
                <span className="stat-num">{g.score.scaled.toFixed(1)}</span>
                <span className="stat-label">
                  {MODULES[g.module].name} · {g.raw}/27
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <div className="section-head">
          <h2>The three modules</h2>
          <span className="muted" style={{ fontSize: '0.86rem' }}>
            Required for Engineering at Cambridge; check your own course's requirements.
          </span>
        </div>
        <div className="grid grid-3">
          {MODULE_ORDER.map((m) => (
            <div key={m} className="module-card">
              <span className="module-code">{m === 'PH' ? 'Physics' : MODULES[m].short}</span>
              <h3>{MODULES[m].name}</h3>
              <div className="stack" style={{ gap: 6 }}>
                {LEARN.filter((tp) => tp.module === m).map((tp) => {
                  const a = acc[tp.code];
                  return (
                    <a key={tp.code} href={href('learn', tp.code)} className="topic-row">
                      <span className="mono muted">{tp.code}</span>
                      <span>{tp.title}</span>
                      {a !== null && (
                        <span className={'chip chip-mono ' + (a >= 0.7 ? 'chip-good' : a >= 0.4 ? 'chip-warn' : 'chip-bad')} title="Your accuracy on this topic">
                          {Math.round(a * 100)}%
                        </span>
                      )}
                    </a>
                  );
                })}
              </div>
              <div className="row" style={{ marginTop: 'auto' }}>
                <a className="btn btn-sm" href={href('learn', MODULES[m].topics[0].code)}>
                  <Icon name="learn" /> Notes
                </a>
                <button type="button" className="btn btn-sm" onClick={() => navigate('practice')}>
                  <Icon name="target" /> Practise
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Your toolkit</h2>
        <div className="grid grid-4">
          {TOOLS.map((tool) => (
            <a key={tool.route} href={href(tool.route)} className="card stack" style={{ textDecoration: 'none', color: 'inherit', gap: 8 }}>
              <span style={{ color: 'var(--accent-text)' }}>
                <Icon name={tool.icon} size={22} />
              </span>
              <strong>{tool.title}</strong>
              <span className="muted" style={{ fontSize: '0.86rem' }}>
                {tool.desc}
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
