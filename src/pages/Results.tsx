import React, { useMemo, useState } from 'react';
import { LETTERS, MODULES, topicName } from '../content/types';
import { AccuracyBars, PacingChart, ScoreRuler, TimeBars } from '../components/Charts';
import { Icon } from '../components/Icon';
import { DifficultyPips } from '../components/QuestionView';
import { percentileOf, scoreBand } from '../lib/distributions';
import { createPractice, getAttempt, gradeByModule, type GradedModule } from '../lib/exam';
import { fmtDateTime, fmtDuration, ordinal } from '../lib/format';
import { moduleInsights, type Insight } from '../lib/insights';
import { conversionTable, itemDifficulty } from '../lib/rasch';
import { href, navigate } from '../lib/router';
import { useStore } from '../lib/store';

const TONE_ICON: Record<Insight['tone'], string> = { good: 'check', warn: 'clock', bad: 'x', info: 'bulb' };
const TONE_COLOR: Record<Insight['tone'], string> = { good: 'var(--good)', warn: 'var(--warn)', bad: 'var(--bad)', info: 'var(--accent-text)' };

export function ResultsPage({ attemptId }: { attemptId?: string }) {
  const attempt = useStore((s) => getAttempt(attemptId, s));
  const graded = useMemo(() => (attempt ? gradeByModule(attempt) : []), [attempt]);
  const [tab, setTab] = useState(0);

  if (!attempt) {
    return (
      <div className="page">
        <div className="empty">
          This attempt could not be found. It may have been deleted. <a href={href('paper')}>Go to the paper</a>
        </div>
      </div>
    );
  }
  if (!attempt.finishedAt) {
    return (
      <div className="page">
        <div className="note note-warn row-between">
          <span>This attempt is still in progress.</span>
          <a className="btn btn-sm btn-glow" href={href('exam')}>
            Resume
          </a>
        </div>
      </div>
    );
  }

  const isMock = attempt.kind === 'mock';
  const current = graded[Math.min(tab, graded.length - 1)];
  const wrongIds = graded.flatMap((g) => g.items.filter((i) => !i.correct).map((i) => i.q.id));

  const practiseMistakes = () => {
    createPractice({ questionIds: wrongIds, title: 'Mistakes from ' + attempt.title, timed: false, instant: true });
    navigate('exam');
  };

  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">
          {isMock ? 'Crucible paper' : 'Practice set'} · {fmtDateTime(attempt.createdAt)}
          {isMock ? ` · ${attempt.strict ? 'strict rules' : 'relaxed rules'}` : ''}
        </span>
        <h1>{isMock ? 'Your estimated ESAT scores' : attempt.title}</h1>
        <p className="lede">
          Scores use the same Rasch method as the real ESAT, placed on the official 1.0–9.0 scale (typical candidate 4.5, top 10% above 7.0).
          Because this paper is harder than the real test, the same raw mark earns a higher score. <a href={href('about')}>How scoring works</a>
        </p>
      </header>

      <section className={'grid ' + (graded.length >= 3 ? 'grid-3' : graded.length === 2 ? 'grid-2' : '')}>
        {graded.map((g) => (
          <ScoreCard key={g.module} g={g} small={!isMock && g.items.length < 8} />
        ))}
      </section>

      {isMock && graded.length === 3 && <ProfileSummary graded={graded} />}

      <div className="row">
        <a className="btn btn-primary" href={href('review', attempt.id)}>
          <Icon name="eye" /> Review every answer
        </a>
        {wrongIds.length > 0 && (
          <>
            <a className="btn" href={href('review', attempt.id, 'wrong')}>
              Review {wrongIds.length} mistakes
            </a>
            <button type="button" className="btn" onClick={practiseMistakes}>
              <Icon name="refresh" /> Redo my mistakes
            </button>
          </>
        )}
        {isMock && (
          <a className="btn btn-ghost" href={href('paper')}>
            Sit again
          </a>
        )}
      </div>

      {graded.length > 1 && (
        <div className="tabs" role="tablist" aria-label="Module">
          {graded.map((g, i) => (
            <button key={g.module} type="button" role="tab" aria-selected={i === tab} onClick={() => setTab(i)}>
              {MODULES[g.module].name}
            </button>
          ))}
        </div>
      )}

      <ModuleDetail g={current} attemptId={attempt.id} timed={current.run.limit > 0} />
    </div>
  );
}

function ScoreCard({ g, small }: { g: GradedModule; small: boolean }) {
  const band = scoreBand(g.score.scaled);
  const pctile = Math.round(percentileOf(g.module, g.score.scaled));
  const n = g.items.length;
  return (
    <div className="card stack" style={{ gap: 12 }}>
      <div className="row-between">
        <span className="module-code">{MODULES[g.module].name}</span>
        {g.run.timedOut && <span className="chip chip-warn">time ran out</span>}
      </div>
      {small ? (
        <>
          <div className="big-score">
            {g.raw}
            <span className="muted" style={{ fontSize: '0.45em' }}>
              /{n}
            </span>
          </div>
          <p className="muted" style={{ fontSize: '0.88rem' }}>
            Answer at least 8 questions from a module to get a reliable scaled score.
          </p>
        </>
      ) : (
        <>
          <div className="row" style={{ alignItems: 'baseline', gap: 12 }}>
            <span className="big-score">{g.score.scaled.toFixed(1)}</span>
            <span className={`chip ${band.tone === 'top' || band.tone === 'great' ? 'chip-good' : band.tone === 'low' ? 'chip-bad' : band.tone === 'good' ? 'chip-accent' : ''}`}>{band.label}</span>
          </div>
          <div className="grid grid-2" style={{ gap: 10 }}>
            <div className="stat">
              <span className="stat-num" style={{ fontSize: '1.25rem' }}>
                {g.raw}/{n}
              </span>
              <span className="stat-label">raw mark</span>
            </div>
            <div className="stat">
              <span className="stat-num" style={{ fontSize: '1.25rem' }}>
                {g.score.low.toFixed(1)}–{g.score.high.toFixed(1)}
              </span>
              <span className="stat-label">likely range</span>
            </div>
            <div className="stat">
              <span className="stat-num" style={{ fontSize: '1.25rem' }}>{ordinal(Math.max(1, Math.min(99, pctile)))}</span>
              <span className="stat-label">percentile (Oct 2025)</span>
            </div>
            <div className="stat">
              <span className="stat-num" style={{ fontSize: '1.25rem' }}>≈{Math.min(27, g.score.standardEquivalent)}/27</span>
              <span className="stat-label">on a typical paper</span>
            </div>
          </div>
          <ScoreRuler module={g.module} score={g.score.scaled} low={g.score.low} high={g.score.high} compact />
        </>
      )}
      <span className="muted" style={{ fontSize: '0.82rem' }}>
        {g.answered}/{n} answered · {fmtDuration(g.seconds)} used
      </span>
    </div>
  );
}

function ProfileSummary({ graded }: { graded: GradedModule[] }) {
  const scores = graded.map((g) => g.score.scaled);
  const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
  const weakest = graded.reduce((a, b) => (b.score.scaled < a.score.scaled ? b : a));
  const strongest = graded.reduce((a, b) => (b.score.scaled > a.score.scaled ? b : a));
  return (
    <section className="card stack">
      <div className="row-between">
        <h3>Engineering profile</h3>
        <span className="chip chip-mono">Maths 1 + Physics + Maths 2</span>
      </div>
      <p style={{ maxWidth: '72ch' }}>
        Your average across the three modules is <strong>{mean.toFixed(1)}</strong>. Your strongest module is {MODULES[strongest.module].name} ({strongest.score.scaled.toFixed(1)}) and the one with most room to grow is{' '}
        {MODULES[weakest.module].name} ({weakest.score.scaled.toFixed(1)}).{' '}
        {mean >= 7
          ? 'That is a top-10% profile. Keep it sharp with timed drills and mistake reviews.'
          : mean >= 5.5
            ? 'That is a strong profile. The fastest gains usually come from your weakest module and from eliminating slips.'
            : 'Focus on the fundamentals in your weakest module first; the notes and flashcards target exactly the specification content.'}
      </p>
      <p className="muted" style={{ fontSize: '0.84rem' }}>
        Universities do not publish ESAT cut-offs. They look at your scores alongside the rest of your application.
      </p>
    </section>
  );
}

function ModuleDetail({ g, attemptId, timed }: { g: GradedModule; attemptId: string; timed: boolean }) {
  const insights = useMemo(() => moduleInsights(g, timed), [g, timed]);
  const table = useMemo(() => conversionTable(g.items.map((i) => itemDifficulty(i.q))), [g]);
  const topics = useMemo(() => {
    const m = new Map<string, { correct: number; total: number }>();
    g.items.forEach((i) => {
      const e = m.get(i.q.topic) ?? { correct: 0, total: 0 };
      e.total++;
      if (i.correct) e.correct++;
      m.set(i.q.topic, e);
    });
    return MODULES[g.module].topics.filter((t) => m.has(t.code)).map((t) => ({ key: t.code, label: t.name, ...m.get(t.code)!, onClick: () => navigate('learn', t.code) }));
  }, [g]);

  return (
    <div className="stack-l">
      {g.items.length >= 8 && (
        <section className="card stack">
          <div className="row-between">
            <h3>Where you sit on the scale</h3>
            <span className="muted" style={{ fontSize: '0.84rem' }}>
              Bars: October 2025 {MODULES[g.module].name} candidates (UAT-UK)
            </span>
          </div>
          <ScoreRuler module={g.module} score={g.score.scaled} low={g.score.low} high={g.score.high} />
        </section>
      )}

      <section className="section">
        <h2>What to work on</h2>
        <div className="grid grid-2">
          {insights.map((ins, i) => (
            <div key={i} className="card card-tight row" style={{ alignItems: 'flex-start', flexWrap: 'nowrap', gap: 12 }}>
              <span style={{ color: TONE_COLOR[ins.tone], marginTop: 2 }}>
                <Icon name={TONE_ICON[ins.tone]} size={20} />
              </span>
              <div className="stack" style={{ gap: 4 }}>
                <strong>{ins.title}</strong>
                <span style={{ fontSize: '0.92rem', color: 'var(--ink-2)' }}>{ins.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-2">
        <div className="card stack">
          <h3>Pacing</h3>
          <PacingChart items={g.items} limit={g.run.limit || 2400} />
        </div>
        <div className="card stack">
          <h3>Time per question</h3>
          <TimeBars items={g.items} />
        </div>
      </section>

      <section className="card stack">
        <div className="row-between">
          <h3>Accuracy by topic</h3>
          <span className="muted" style={{ fontSize: '0.84rem' }}>Select a topic to open its notes</span>
        </div>
        <AccuracyBars rows={topics} />
      </section>

      <section className="section">
        <h2>Question by question</h2>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Q</th>
                <th>Question</th>
                <th>Topic</th>
                <th>Difficulty</th>
                <th>You</th>
                <th>Answer</th>
                <th className="num">Time</th>
              </tr>
            </thead>
            <tbody>
              {g.items.map((it, i) => (
                <tr key={it.q.id} className="clickable" onClick={() => navigate('review', attemptId, it.q.id)}>
                  <td className="mono">{i + 1}</td>
                  <td>
                    {it.q.title} {it.ans.flagged && <Icon name="flag" size={13} className="muted" />}
                  </td>
                  <td>
                    <span className="chip chip-mono" title={topicName(it.q.topic)}>
                      {it.q.topic}
                    </span>
                  </td>
                  <td>
                    <DifficultyPips d={it.q.difficulty} />
                  </td>
                  <td>
                    {it.answered ? (
                      <span className={it.correct ? 'chip chip-good' : 'chip chip-bad'}>
                        {LETTERS[it.ans.choice!]} {it.correct ? '✓' : '✗'}
                      </span>
                    ) : (
                      <span className="chip chip-warn">blank</span>
                    )}
                  </td>
                  <td className="mono">{LETTERS[it.q.answer]}</td>
                  <td className="num mono" style={{ color: it.ans.time > it.q.time * 1.5 ? 'var(--warn)' : undefined }}>
                    {fmtDuration(it.ans.time)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <details className="card">
        <summary style={{ cursor: 'pointer', fontWeight: 600 }}>Raw mark to score conversion for this module</summary>
        <p className="muted" style={{ fontSize: '0.88rem', margin: '10px 0' }}>
          In the Rasch model your raw mark alone determines your ability estimate for a given set of questions. Your mark is highlighted.
        </p>
        <div className="table-wrap">
          <table className="data">
            <tbody>
              {[0, 1].map((row) => (
                <React.Fragment key={row}>
                  <tr>
                    <th>Raw</th>
                    {table.slice(row * 14, row * 14 + 14).map((_, j) => (
                      <th key={j} className="num" style={row * 14 + j === g.raw ? { background: 'var(--glow-soft)', color: 'var(--ink)' } : undefined}>
                        {row * 14 + j}
                      </th>
                    ))}
                  </tr>
                  <tr>
                    <td>Score</td>
                    {table.slice(row * 14, row * 14 + 14).map((v, j) => (
                      <td key={j} className="num mono" style={row * 14 + j === g.raw ? { background: 'var(--glow-soft)', fontWeight: 700 } : undefined}>
                        {v.toFixed(1)}
                      </td>
                    ))}
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
