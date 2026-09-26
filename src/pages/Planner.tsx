import React, { useMemo } from 'react';
import { learnTopic } from '../content/learn';
import { Icon } from '../components/Icon';
import { daysUntil, fmtDate } from '../lib/format';
import { buildPlan, topicAccuracy, topicPriority, type PlanTask } from '../lib/planner';
import { href, navigate } from '../lib/router';
import { getState, setState, today, updateSettings, useStore } from '../lib/store';

const KEY_DATES: { date: string; label: string; note: string }[] = [
  { date: '2026-09-28', label: 'October booking closes', note: 'Last day to register for the October 2026 sitting.' },
  { date: '2026-10-12', label: 'October sitting opens', note: 'The October 2026 ESAT runs from 12 to 16 October.' },
  { date: '2026-10-15', label: 'UCAS deadline', note: 'Deadline for Cambridge applications; applicants for this deadline sit the ESAT in October.' },
  { date: '2026-11-16', label: 'October results', note: 'October results are released through your UAT-UK account.' },
  { date: '2027-01-04', label: 'January sitting opens', note: 'Second sitting, 4 to 8 January 2027 (booking 26 October to 21 December 2026).' },
];

const SITTINGS: { date: string; label: string }[] = [
  { date: '2026-10-12', label: '12 Oct' },
  { date: '2026-10-13', label: '13 Oct' },
  { date: '2026-10-14', label: '14 Oct' },
  { date: '2026-10-15', label: '15 Oct' },
  { date: '2026-10-16', label: '16 Oct' },
  { date: '2027-01-04', label: '4 Jan 2027' },
];

const KIND_ICON: Record<PlanTask['kind'], string> = {
  learn: 'learn',
  practice: 'target',
  drill: 'bolt',
  cards: 'cards',
  mock: 'paper',
  review: 'refresh',
  rest: 'moon',
  strategy: 'compass',
  official: 'paper',
};

export function PlannerPage() {
  const settings = useStore((s) => s.settings);
  const done = useStore((s) => s.planDone);
  const qstats = useStore((s) => s.qstats);
  const attempts = useStore((s) => s.attempts);
  const learnRead = useStore((s) => s.learnRead);
  const plan = useMemo(() => buildPlan(getState()), [settings, qstats, attempts, learnRead]); // eslint-disable-line react-hooks/exhaustive-deps
  const priorities = useMemo(() => topicPriority(getState()).slice(0, 6), [qstats, learnRead]); // eslint-disable-line react-hooks/exhaustive-deps
  const acc = useMemo(() => topicAccuracy(getState()), [qstats]); // eslint-disable-line react-hooks/exhaustive-deps
  const days = daysUntil(settings.testDate);
  const todayIso = today();

  const toggle = (id: string) =>
    setState((s) => {
      const planDone = { ...s.planDone };
      if (planDone[id]) delete planDone[id];
      else planDone[id] = true;
      return { ...s, planDone };
    });

  const totalTasks = plan.reduce((n, d) => n + d.tasks.filter((t) => t.minutes > 0).length, 0);
  const doneTasks = plan.reduce((n, d) => n + d.tasks.filter((t) => done[t.id]).length, 0);

  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">Study planner</span>
        <h1>{days > 0 ? `${days} day${days === 1 ? '' : 's'} to your ESAT` : days === 0 ? 'Your ESAT is today' : 'Plan your next sitting'}</h1>
        <p className="lede">
          A day-by-day plan built from your own results: weaker and higher-weighted topics come first, with a diagnostic paper early and a full timed
          paper a few days before the test.
        </p>
      </header>

      <section className="grid grid-2">
        <div className="card stack-l">
          <h3>Your test date</h3>
          <div className="row">
            {SITTINGS.map((s) => (
              <button key={s.date} type="button" className="chip" aria-pressed={settings.testDate === s.date} onClick={() => updateSettings({ testDate: s.date })}>
                {s.label}
              </button>
            ))}
          </div>
          <div className="grid grid-2">
            <div className="field">
              <label htmlFor="test-date">Or pick a date</label>
              <input id="test-date" type="date" className="input" value={settings.testDate} onChange={(e) => e.target.value && updateSettings({ testDate: e.target.value })} />
            </div>
            <div className="field">
              <label htmlFor="hours">Study time per day</label>
              <select id="hours" className="input" value={settings.hoursPerDay} onChange={(e) => updateSettings({ hoursPerDay: Number(e.target.value) })}>
                {[0.75, 1, 1.5, 2, 2.5, 3, 4].map((h) => (
                  <option key={h} value={h}>
                    {h < 1 ? `${h * 60} minutes` : `${h} hour${h === 1 ? '' : 's'}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {totalTasks > 0 && (
            <div className="stack" style={{ gap: 6 }}>
              <div className="row-between">
                <span className="muted" style={{ fontSize: '0.88rem' }}>
                  Plan progress
                </span>
                <span className="mono">
                  {doneTasks}/{totalTasks}
                </span>
              </div>
              <div className="bar bar-good">
                <span style={{ width: `${(100 * doneTasks) / totalTasks}%` }} />
              </div>
            </div>
          )}
        </div>

        <div className="card stack">
          <h3>Focus topics</h3>
          <p className="muted" style={{ fontSize: '0.88rem' }}>
            Ranked by your accuracy, how much of the paper each topic typically covers, and whether you have read the notes.
          </p>
          <ol className="steps">
            {priorities.map((code) => {
              const tp = learnTopic(code)!;
              const a = acc[code];
              return (
                <li key={code}>
                  <div className="row-between">
                    <a href={href('learn', code)}>
                      {code}: {tp.title}
                    </a>
                    <span className="chip chip-mono">{a === null ? 'no data yet' : `${Math.round(a * 100)}% correct`}</span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="section">
        <h2>Key dates</h2>
        <div className="table-wrap">
          <table className="data">
            <tbody>
              {KEY_DATES.map((k) => {
                const d = daysUntil(k.date);
                return (
                  <tr key={k.date} style={{ opacity: d < 0 ? 0.55 : 1 }}>
                    <td className="mono" style={{ whiteSpace: 'nowrap' }}>
                      {fmtDate(new Date(k.date + 'T00:00:00').getTime())}
                    </td>
                    <td>
                      <strong>{k.label}</strong>
                      <div className="muted" style={{ fontSize: '0.84rem' }}>
                        {k.note}
                      </div>
                    </td>
                    <td className="num mono">{d > 0 ? `in ${d} days` : d === 0 ? 'today' : 'passed'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="muted" style={{ fontSize: '0.82rem' }}>
          Dates are from UAT-UK and Cambridge for 2027 entry. Always confirm on the official UAT-UK website.
        </p>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Day by day</h2>
          {plan.length > 43 && <span className="muted">Showing the next six weeks</span>}
        </div>
        {plan.length === 0 && <div className="empty">Your test date has passed. Choose your next sitting above to build a new plan.</div>}
        <div className="stack">
          {plan.map((day) => {
            const isToday = day.date === todayIso;
            return (
              <div
                key={day.date}
                className="card card-tight stack"
                style={{ borderColor: isToday ? 'var(--accent)' : day.special === 'test' ? 'var(--glow)' : undefined, gap: 8 }}
              >
                <div className="row-between">
                  <strong>
                    {day.label}
                    {isToday && <span className="chip chip-accent" style={{ marginLeft: 8 }}>today</span>}
                    {day.special === 'mock' && <span className="chip chip-warn" style={{ marginLeft: 8 }}>full paper</span>}
                    {day.special === 'test' && <span className="chip chip-warn" style={{ marginLeft: 8 }}>ESAT</span>}
                  </strong>
                  <span className="muted mono" style={{ fontSize: '0.82rem' }}>
                    {day.tasks.reduce((m, t) => m + t.minutes, 0)} min
                  </span>
                </div>
                {day.tasks.map((task) => (
                  <div key={task.id} className="row" style={{ gap: 10, flexWrap: 'nowrap' }}>
                    <input
                      type="checkbox"
                      checked={!!done[task.id]}
                      onChange={() => toggle(task.id)}
                      aria-label={`Mark "${task.title}" as done`}
                      style={{ width: 18, height: 18, accentColor: 'var(--accent)', flex: 'none' }}
                    />
                    <Icon name={KIND_ICON[task.kind]} size={16} className="muted" />
                    <span style={{ flex: 1, textDecoration: done[task.id] ? 'line-through' : undefined, color: done[task.id] ? 'var(--muted)' : undefined }}>
                      {task.external ? (
                        <a href={task.external} target="_blank" rel="noreferrer">
                          {task.title}
                        </a>
                      ) : task.route ? (
                        <a href={href(...(task.route as [string, ...string[]]))} onClick={(e) => { e.preventDefault(); navigate(...(task.route as [string, ...string[]])); }}>
                          {task.title}
                        </a>
                      ) : (
                        task.title
                      )}
                    </span>
                    {task.minutes > 0 && <span className="muted mono" style={{ fontSize: '0.8rem' }}>{task.minutes}m</span>}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
