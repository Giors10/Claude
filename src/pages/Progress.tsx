import React, { useMemo } from 'react';
import { LEARN } from '../content/learn';
import { ALL_QUESTIONS } from '../content/paper';
import { MODULE_ORDER, MODULES } from '../content/types';
import { TrendChart } from '../components/Charts';
import { Icon } from '../components/Icon';
import { gradeByModule } from '../lib/exam';
import { fmtDate } from '../lib/format';
import { topicAccuracy } from '../lib/planner';
import { href, navigate } from '../lib/router';
import { getState, today, useStore } from '../lib/store';

const COLORS: Record<string, string> = { M1: 'var(--accent)', PH: 'var(--glow)', M2: 'var(--good)' };

function heatColor(a: number | null): string {
  if (a === null) return 'var(--surface)';
  if (a >= 0.8) return 'color-mix(in srgb, var(--good) 28%, var(--surface))';
  if (a >= 0.6) return 'color-mix(in srgb, var(--good) 14%, var(--surface))';
  if (a >= 0.4) return 'color-mix(in srgb, var(--glow) 18%, var(--surface))';
  return 'color-mix(in srgb, var(--bad) 18%, var(--surface))';
}

export function ProgressPage() {
  const attempts = useStore((s) => s.attempts);
  const qstats = useStore((s) => s.qstats);
  const cards = useStore((s) => s.cards);
  const drills = useStore((s) => s.drills);
  const activeDays = useStore((s) => s.activeDays);
  const acc = useMemo(() => topicAccuracy(getState()), [qstats]); // eslint-disable-line react-hooks/exhaustive-deps

  const mocks = attempts.filter((a) => a.kind === 'mock' && a.finishedAt).sort((a, b) => a.createdAt - b.createdAt);
  const series = MODULE_ORDER.map((m) => ({
    label: MODULES[m].name,
    color: COLORS[m],
    points: mocks
      .map((a) => ({ a, g: gradeByModule(a).find((g) => g.module === m) }))
      .filter((x) => x.g)
      .map((x) => ({ x: x.a.createdAt, y: x.g!.score.scaled, title: `${fmtDate(x.a.createdAt)}: ${x.g!.score.scaled.toFixed(1)} (${x.g!.raw}/27)` })),
  })).filter((s) => s.points.length > 0);

  const attempted = Object.values(qstats).filter((s) => s.attempts > 0);
  const totalAttempts = attempted.reduce((n, s) => n + s.attempts, 0);
  const totalCorrect = attempted.reduce((n, s) => n + s.correct, 0);
  const mastered = Object.values(cards).filter((c) => c.box >= 4).length;

  // Current streak of consecutive active days ending today or yesterday.
  const streak = useMemo(() => {
    const set = new Set(activeDays);
    let n = 0;
    const d = new Date();
    if (!set.has(today())) d.setDate(d.getDate() - 1);
    for (;;) {
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      if (!set.has(key)) break;
      n++;
      d.setDate(d.getDate() - 1);
    }
    return n;
  }, [activeDays]);

  const weeks = useMemo(() => {
    const set = new Set(activeDays);
    const out: { key: string; on: boolean; label: string }[][] = [];
    const end = new Date();
    const start = new Date(end);
    start.setDate(end.getDate() - 7 * 12 + 1 - ((end.getDay() + 6) % 7));
    for (let w = 0; w < 13; w++) {
      const col: { key: string; on: boolean; label: string }[] = [];
      for (let d = 0; d < 7; d++) {
        const day = new Date(start);
        day.setDate(start.getDate() + w * 7 + d);
        if (day > end) break;
        const key = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
        col.push({ key, on: set.has(key), label: day.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) });
      }
      out.push(col);
    }
    return out;
  }, [activeDays]);

  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">Progress</span>
        <h1>Your progress</h1>
        <p className="lede">Everything here is calculated from your activity in this browser.</p>
      </header>

      <section className="grid grid-4">
        <div className="card stat">
          <span className="stat-num">{mocks.length}</span>
          <span className="stat-label">papers completed</span>
        </div>
        <div className="card stat">
          <span className="stat-num">{totalAttempts ? Math.round((100 * totalCorrect) / totalAttempts) : 0}%</span>
          <span className="stat-label">
            accuracy over {totalAttempts} answer{totalAttempts === 1 ? '' : 's'}
          </span>
        </div>
        <div className="card stat">
          <span className="stat-num">{streak}</span>
          <span className="stat-label">day streak</span>
        </div>
        <div className="card stat">
          <span className="stat-num">{mastered}</span>
          <span className="stat-label">flashcards well known</span>
        </div>
      </section>

      <section className="card stack">
        <div className="row-between">
          <h3>Estimated ESAT score over time</h3>
          <a href={href('paper')}>Mock papers</a>
        </div>
        {series.length ? (
          <TrendChart series={series} />
        ) : (
          <div className="empty">
            Complete a mock paper to start your score history. <a href={href('paper')}>Choose a paper</a>
          </div>
        )}
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Topic mastery</h2>
          <span className="muted" style={{ fontSize: '0.84rem' }}>
            Accuracy on paper questions in each topic. Select one to open its notes.
          </span>
        </div>
        {MODULE_ORDER.map((m) => (
          <div key={m} className="stack" style={{ gap: 8 }}>
            <span className="eyebrow">{MODULES[m].name}</span>
            <div className="heat">
              {LEARN.filter((t) => t.module === m).map((t) => {
                const a = acc[t.code];
                const n = ALL_QUESTIONS.filter((q) => q.topic === t.code).length;
                return (
                  <button key={t.code} type="button" className="heat-cell" style={{ background: heatColor(a) }} onClick={() => navigate('learn', t.code)}>
                    <span className="code">
                      {t.code} · {n} q
                    </span>
                    <span className="name">{t.title}</span>
                    <span className="pct">{a === null ? '–' : `${Math.round(a * 100)}%`}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-2">
        <div className="card stack">
          <h3>Activity (last 13 weeks)</h3>
          <div className="row" style={{ gap: 3, flexWrap: 'nowrap', overflowX: 'auto' }} role="img" aria-label={`Active on ${activeDays.length} days`}>
            {weeks.map((col, i) => (
              <div key={i} className="stack" style={{ gap: 3 }}>
                {col.map((d) => (
                  <span
                    key={d.key}
                    title={`${d.label}${d.on ? ': active' : ''}`}
                    style={{ width: 14, height: 14, borderRadius: 3, background: d.on ? 'var(--accent)' : 'var(--surface-3)', border: '1px solid var(--rule)' }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="card stack">
          <h3>Speed drills</h3>
          {drills.length === 0 ? (
            <p className="muted">
              No drills yet. <a href={href('drills')}>Try one</a>. They take 60 seconds.
            </p>
          ) : (
            <p>
              {drills.length} session{drills.length === 1 ? '' : 's'}, {drills.reduce((n, d) => n + d.correct, 0)} correct answers. Best recent accuracy{' '}
              {Math.max(...drills.slice(-20).map((d) => (d.total ? Math.round((100 * d.correct) / d.total) : 0)))}%.
            </p>
          )}
          <a className="btn btn-sm" href={href('drills')} style={{ alignSelf: 'flex-start' }}>
            <Icon name="bolt" /> Speed drills
          </a>
        </div>
      </section>
    </div>
  );
}
