import React, { useState } from 'react';
import { PAPER } from '../content/paper';
import { MODULE_ORDER, MODULES, type ModuleId } from '../content/types';
import { Icon } from '../components/Icon';
import { createMock, gradeByModule } from '../lib/exam';
import { fmtDateTime } from '../lib/format';
import { href, navigate } from '../lib/router';
import { updateSettings, useStore } from '../lib/store';

export function PaperPage() {
  const attempts = useStore((s) => s.attempts);
  const activeId = useStore((s) => s.activeId);
  const settings = useStore((s) => s.settings);
  const seen = useStore((s) => Object.keys(s.qstats).filter((id) => s.qstats[id].attempts > 0).length);
  const [mods, setMods] = useState<ModuleId[]>(['M1', 'PH', 'M2']);
  const [strict, setStrict] = useState(true);
  const mocks = attempts.filter((a) => a.kind === 'mock' && a.finishedAt).sort((a, b) => b.createdAt - a.createdAt);

  const toggle = (m: ModuleId) => {
    if (m === 'M1') return;
    setMods((cur) => (cur.includes(m) ? cur.filter((x) => x !== m) : [...cur, m]));
  };

  const start = () => {
    createMock(mods, strict);
    navigate('exam');
  };

  const minutes = mods.length * 40;

  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">Predicted paper · for the October 2026 and January 2027 sittings</span>
        <h1>The Crucible paper</h1>
        <p className="lede">
          Three full ESAT modules written to the 2026 specification and deliberately set harder than the real test. Every question has a worked
          solution, an explanation of each tempting wrong answer and an estimated score on the official 1.0–9.0 scale.
        </p>
      </header>

      {activeId && (
        <div className="note note-warn row-between">
          <span>You already have a paper in progress. Resume it or abandon it from the exam screen before starting another.</span>
          <a className="btn btn-sm btn-glow" href={href('exam')}>
            <Icon name="play" /> Resume
          </a>
        </div>
      )}

      <section className="grid grid-3">
        {MODULE_ORDER.map((m) => {
          const info = MODULES[m];
          const on = mods.includes(m);
          const qs = PAPER[m];
          const hard = qs.filter((q) => q.difficulty >= 4).length;
          return (
            <label key={m} className="module-card" style={{ cursor: m === 'M1' ? 'default' : 'pointer', borderColor: on ? 'var(--accent)' : undefined }}>
              <div className="row-between">
                <span className="module-code">{m === 'PH' ? 'Physics' : info.short}</span>
                <input
                  type="checkbox"
                  checked={on}
                  disabled={m === 'M1'}
                  onChange={() => toggle(m)}
                  aria-label={`Include ${info.name}`}
                  style={{ width: 18, height: 18, accentColor: 'var(--accent)' }}
                />
              </div>
              <h3>{info.name}</h3>
              <p className="muted" style={{ fontSize: '0.9rem' }}>
                27 questions · 40 minutes · {hard} rated hard or very hard
                {m === 'M1' ? ' · compulsory for every candidate' : ''}
              </p>
              <div className="topic-list">
                {info.topics.map((t) => (
                  <span key={t.code} className="chip chip-mono" title={t.name}>
                    {t.code}
                  </span>
                ))}
              </div>
            </label>
          );
        })}
      </section>

      <section className="grid grid-2">
        <div className="card stack-l">
          <h3>Exam conditions</h3>
          <div className="seg" role="group" aria-label="Exam mode">
            <button type="button" aria-pressed={strict} onClick={() => setStrict(true)}>
              Strict (real rules)
            </button>
            <button type="button" aria-pressed={!strict} onClick={() => setStrict(false)}>
              Relaxed (pausable)
            </button>
          </div>
          <ul className="steps">
            {strict ? (
              <>
                <li>Each module has its own 40-minute clock. Unused time is not carried over.</li>
                <li>The clock cannot be paused and keeps running if you leave the page.</li>
                <li>Once a module ends you cannot go back to it, just like the real computer-based test.</li>
              </>
            ) : (
              <>
                <li>Each module still has a 40-minute clock, shown for pacing.</li>
                <li>You can pause, and the clock stops automatically when you switch tabs.</li>
                <li>Use this for a first attempt at a module; switch to strict for a true score.</li>
              </>
            )}
            <li>No calculator. Use paper, or the built-in scratchpad (press S).</li>
            <li>No negative marking: answer every question.</li>
          </ul>
          <label className="check">
            <input type="checkbox" checked={settings.showTimer} onChange={(e) => updateSettings({ showTimer: e.target.checked })} />
            Show the countdown timer
          </label>
          <label className="check">
            <input type="checkbox" checked={settings.confidence} onChange={(e) => updateSettings({ confidence: e.target.checked })} />
            Ask how confident I am after each answer (enables calibration feedback)
          </label>
          <label className="check">
            <input type="checkbox" checked={settings.timeWarnings} onChange={(e) => updateSettings({ timeWarnings: e.target.checked })} />
            Warn me at 10, 5 and 1 minutes remaining
          </label>
        </div>

        <div className="card stack-l">
          <h3>Before you start</h3>
          <div className="hero-spec">
            <div>
              <div className="v tnum">{mods.length * 27}</div>
              <div className="k">questions</div>
            </div>
            <div>
              <div className="v tnum">{minutes}</div>
              <div className="k">minutes</div>
            </div>
            <div>
              <div className="v tnum">89s</div>
              <div className="k">per question</div>
            </div>
          </div>
          <dl className="keys" aria-label="Keyboard shortcuts">
            <div>
              <dt>
                <span className="kbd">A</span>–<span className="kbd">H</span>
              </dt>
              <dd>choose an answer</dd>
            </div>
            <div>
              <dt>
                <span className="kbd">←</span> <span className="kbd">→</span>
              </dt>
              <dd>previous / next</dd>
            </div>
            <div>
              <dt>
                <span className="kbd">M</span>
              </dt>
              <dd>flag for review</dd>
            </div>
            <div>
              <dt>
                <span className="kbd">S</span>
              </dt>
              <dd>scratchpad</dd>
            </div>
            <div>
              <dt>
                <span className="kbd">N</span>
              </dt>
              <dd>question navigator</dd>
            </div>
          </dl>
          {seen > 0 && (
            <p className="note note-warn" style={{ margin: 0 }}>
              You have already answered {seen} of these questions in practice, so your score will read a little high.
            </p>
          )}
          <button type="button" className="btn btn-primary btn-lg" onClick={start} disabled={!!activeId}>
            <Icon name="play" /> Start {mods.length === 3 ? 'the full paper' : mods.map((m) => MODULES[m].short).join(' + ')}
          </button>
          <p className="muted" style={{ fontSize: '0.82rem' }}>
            Modules run in the real ESAT order: Mathematics 1, then Physics, then Mathematics 2. Engineering at Cambridge requires all three.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Your attempts</h2>
          {mocks.length > 0 && <a href={href('progress')}>See progress</a>}
        </div>
        {mocks.length === 0 ? (
          <div className="empty">No completed attempts yet. Your scores and full analysis will appear here.</div>
        ) : (
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Mode</th>
                  {MODULE_ORDER.map((m) => (
                    <th key={m} className="num">
                      {MODULES[m].short}
                    </th>
                  ))}
                  <th />
                </tr>
              </thead>
              <tbody>
                {mocks.map((a) => {
                  const graded = gradeByModule(a);
                  return (
                    <tr key={a.id} className="clickable" onClick={() => navigate('results', a.id)}>
                      <td>{fmtDateTime(a.createdAt)}</td>
                      <td>{a.strict ? 'Strict' : 'Relaxed'}</td>
                      {MODULE_ORDER.map((m) => {
                        const g = graded.find((x) => x.module === m);
                        return (
                          <td key={m} className="num">
                            {g ? (
                              <>
                                <strong>{g.score.scaled.toFixed(1)}</strong> <span className="muted">({g.raw}/27)</span>
                              </>
                            ) : (
                              <span className="muted">–</span>
                            )}
                          </td>
                        );
                      })}
                      <td className="num">
                        <a href={href('results', a.id)} onClick={(e) => e.stopPropagation()}>
                          Results
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
