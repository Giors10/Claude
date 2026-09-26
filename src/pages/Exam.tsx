import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getQuestion } from '../content/paper';
import { LETTERS, MODULES, type Question } from '../content/types';
import { Icon } from '../components/Icon';
import { Modal, useToast } from '../components/Modal';
import { QuestionView } from '../components/QuestionView';
import { Scratchpad } from '../components/Scratchpad';
import { SolutionPanel } from '../components/SolutionPanel';
import {
  abandon,
  addTime,
  checkAnswer,
  endModule,
  getAttempt,
  goTo,
  pause,
  remainingSeconds,
  resume,
  revealHint,
  selectAnswer,
  setConfidence,
  startModule,
  toggleFlag,
  toggleStrike,
  usedSeconds,
} from '../lib/exam';
import { fmtClock } from '../lib/format';
import { Rich } from '../lib/rich';
import { href, navigate } from '../lib/router';
import { useStore, type Attempt, type ModuleRun } from '../lib/store';

export function ExamPage() {
  const attempt = useStore((s) => getAttempt(s.activeId, s));
  const lastFinished = useStore((s) => [...s.attempts].filter((a) => a.finishedAt).sort((a, b) => (b.finishedAt ?? 0) - (a.finishedAt ?? 0))[0]);

  if (!attempt) {
    return (
      <div className="exam" style={{ placeItems: 'center', display: 'grid' }}>
        <div className="card stack-l" style={{ maxWidth: 480, margin: 16 }}>
          <h2>No paper in progress</h2>
          <p className="muted">Start a mock paper or build a practice set.</p>
          <div className="row">
            {lastFinished && (
              <a className="btn btn-primary" href={href('results', lastFinished.id)}>
                See your latest results
              </a>
            )}
            <a className="btn" href={href('paper')}>
              Mock papers
            </a>
            <a className="btn" href={href('practice')}>
              Practice
            </a>
          </div>
        </div>
      </div>
    );
  }
  if (attempt.interstitial) return <ModuleIntro attempt={attempt} />;
  return <ExamRunner key={attempt.id} attempt={attempt} />;
}

/* ---------------------------------------------------------------------- */
/* Between modules                                                        */
/* ---------------------------------------------------------------------- */
function ModuleIntro({ attempt }: { attempt: Attempt }) {
  const [confirmAbandon, setConfirmAbandon] = useState(false);
  const m = attempt.pos.m;
  const run = attempt.modules[m];
  const info = MODULES[run.module];
  const prev = m > 0 ? attempt.modules[m - 1] : null;
  return (
    <div className="exam" style={{ display: 'grid', placeItems: 'center', overflowY: 'auto' }}>
      <div className="card stack-l" style={{ maxWidth: 620, margin: 16 }}>
        {prev && (
          <div className={prev.timedOut ? 'note note-warn' : 'note'}>
            <strong>{MODULES[prev.module].name} is complete.</strong>{' '}
            {prev.timedOut ? 'Time ran out, so your answers were submitted automatically.' : 'Your answers are saved and that module is now closed.'}
          </div>
        )}
        <span className="eyebrow">
          Module {m + 1} of {attempt.modules.length} · {attempt.strict ? 'strict rules' : 'relaxed rules'}
        </span>
        <h1>{info.name}</h1>
        <div className="hero-spec">
          <div>
            <div className="v tnum">{run.questionIds.length}</div>
            <div className="k">questions</div>
          </div>
          <div>
            <div className="v tnum">{Math.round(run.limit / 60)}</div>
            <div className="k">minutes</div>
          </div>
          <div>
            <div className="v">None</div>
            <div className="k">calculator</div>
          </div>
        </div>
        <ul className="steps">
          <li>The clock starts when you press Start and {attempt.strict ? 'cannot be paused' : 'can be paused'}.</li>
          <li>You can move freely between questions in this module and flag any to revisit.</li>
          <li>Time left over at the end is not carried into the next module.</li>
          {run.module === 'PH' && <li>Take g = 10 N kg⁻¹ unless a question says otherwise.</li>}
        </ul>
        <div className="row-between">
          <button type="button" className="btn btn-ghost btn-danger" onClick={() => setConfirmAbandon(true)}>
            Abandon attempt
          </button>
          <button type="button" className="btn btn-primary btn-lg" onClick={() => startModule(attempt.id)} autoFocus>
            <Icon name="play" /> Start {info.short}
          </button>
        </div>
      </div>
      {confirmAbandon && (
        <Modal
          title="Abandon this attempt?"
          onClose={() => setConfirmAbandon(false)}
          actions={
            <>
              <button type="button" className="btn" onClick={() => setConfirmAbandon(false)}>
                Keep it
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  abandon(attempt.id);
                  navigate('paper');
                }}
              >
                Abandon
              </button>
            </>
          }
        >
          <p>Your answers in this attempt will be deleted and it will not count towards your progress.</p>
        </Modal>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Running a module                                                       */
/* ---------------------------------------------------------------------- */
function useQuestionClock(attemptId: string, m: number, qid: string, running: boolean) {
  const started = useRef(Date.now());
  useEffect(() => {
    if (!running) return;
    started.current = Date.now();
    const flushTime = () => {
      const secs = (Date.now() - started.current) / 1000;
      started.current = Date.now();
      addTime(attemptId, m, qid, secs);
    };
    const onVis = () => {
      if (document.hidden) flushTime();
      else started.current = Date.now();
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      if (!document.hidden) flushTime();
    };
  }, [attemptId, m, qid, running]);
}

function ExamRunner({ attempt }: { attempt: Attempt }) {
  const settings = useStore((s) => s.settings);
  const [now, setNow] = useState(Date.now());
  const [padOpen, setPadOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [abandonOpen, setAbandonOpen] = useState(false);
  const [toast, showToast] = useToast();
  const warned = useRef<Set<number>>(new Set());
  const autoPaused = useRef(false);

  const m = attempt.pos.m;
  const run: ModuleRun = attempt.modules[m];
  const qIndex = Math.min(attempt.pos.q, run.questionIds.length - 1);
  const qid = run.questionIds[qIndex];
  const q = getQuestion(qid) as Question;
  const ans = run.answers[qid];
  const timed = run.limit > 0;
  const paused = run.segmentStart === null;
  const remaining = remainingSeconds(run, now);
  const isPractice = attempt.kind === 'practice';
  const n = run.questionIds.length;
  const moduleName = isPractice ? attempt.title : MODULES[run.module].name;

  useQuestionClock(attempt.id, m, qid, !paused);

  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(t);
  }, []);

  // Relaxed mode: stop the clock while the tab is hidden.
  useEffect(() => {
    if (attempt.strict) return;
    const onVis = () => {
      if (document.hidden) {
        if (run.segmentStart !== null) {
          autoPaused.current = true;
          pause(attempt.id);
        }
      } else if (autoPaused.current) {
        autoPaused.current = false;
        resume(attempt.id);
      }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [attempt.id, attempt.strict, run.segmentStart]);

  const finishModule = useCallback(
    (timedOut: boolean) => {
      const finished = endModule(attempt.id, timedOut);
      setEndOpen(false);
      setNavOpen(false);
      setPadOpen(false);
      warned.current = new Set();
      if (finished) navigate('results', attempt.id);
    },
    [attempt.id],
  );

  // Time up.
  useEffect(() => {
    if (!timed || run.done || paused) return;
    if (remaining <= 0) {
      finishModule(true);
    } else if (settings.timeWarnings) {
      for (const t of [600, 300, 60]) {
        if (remaining <= t && remaining > t - 5 && !warned.current.has(t)) {
          warned.current.add(t);
          showToast(t === 60 ? '1 minute left. Make sure every question has an answer.' : `${t / 60} minutes left`);
        }
      }
    }
  }, [remaining, timed, run.done, paused, finishModule, settings.timeWarnings, showToast]);

  const go = useCallback(
    (i: number) => {
      if (i < 0) return;
      if (i >= n) {
        setEndOpen(true);
        return;
      }
      goTo(attempt.id, m, i);
    },
    [attempt.id, m, n],
  );

  const checked = !!ans?.checked;
  const reveal = isPractice && attempt.instant && checked;

  // Keyboard shortcuts.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (padOpen || navOpen || endOpen || abandonOpen) return;
      const el = e.target as HTMLElement;
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      const idx = LETTERS.map((l) => l.toLowerCase()).indexOf(k);
      if (idx >= 0 && idx < q.options.length && !checked) {
        e.preventDefault();
        selectAnswer(attempt.id, m, qid, idx);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(qIndex + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(qIndex - 1);
      } else if (k === 'm') {
        toggleFlag(attempt.id, m, qid);
      } else if (k === 's') {
        setPadOpen(true);
      } else if (k === 'n') {
        setNavOpen(true);
      } else if (e.key === 'Enter' && isPractice && attempt.instant) {
        if (!checked && ans?.choice !== null) checkAnswer(attempt.id, m, qid);
        else if (checked) go(qIndex + 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [padOpen, navOpen, endOpen, abandonOpen, q, attempt.id, attempt.instant, m, qid, qIndex, go, checked, isPractice, ans]);

  const answeredCount = run.questionIds.filter((id) => run.answers[id]?.choice !== null && run.answers[id]?.choice !== undefined).length;
  const flagged = run.questionIds.map((id, i) => (run.answers[id]?.flagged ? i : -1)).filter((i) => i >= 0);
  const unanswered = run.questionIds.map((id, i) => (run.answers[id]?.choice === null || run.answers[id]?.choice === undefined ? i : -1)).filter((i) => i >= 0);

  const used = usedSeconds(run, now);
  const expected = timed ? (run.limit / n) * qIndex : 0;
  const behind = timed ? Math.round((used - expected) / 60) : 0;

  const timerCls = !timed ? 'timer' : remaining <= 60 ? 'timer crit' : remaining <= 300 ? 'timer warn' : 'timer';

  return (
    <div className="exam">
      <header className="exam-top">
        <div className="exam-title">
          <span className="t1">{moduleName}</span>
          <span className="t2">
            Question {qIndex + 1} of {n} · {answeredCount} answered
          </span>
        </div>
        <span className="spacer" />
        {timed && settings.showTimer && (
          <div className="row" style={{ gap: 8 }}>
            <span className={timerCls} role="timer" aria-live="off" aria-label={`${fmtClock(remaining)} remaining`}>
              <Icon name="clock" />
              {fmtClock(remaining)}
            </span>
            {!paused && (
              <span className={'pace hide-sm' + (behind >= 2 ? ' behind' : '')}>
                {behind >= 2 ? `${behind} min behind pace` : behind <= -2 ? `${-behind} min ahead` : 'on pace'}
              </span>
            )}
          </div>
        )}
        {timed && !settings.showTimer && (
          <button type="button" className="btn btn-sm" onClick={() => showToast(`${fmtClock(remaining)} remaining`)}>
            <Icon name="clock" /> Time
          </button>
        )}
        {!attempt.strict && timed && (
          <button type="button" className="icon-btn" onClick={() => (paused ? resume(attempt.id) : pause(attempt.id))} aria-label={paused ? 'Resume timer' : 'Pause timer'} title={paused ? 'Resume' : 'Pause'}>
            <Icon name={paused ? 'play' : 'pause'} />
          </button>
        )}
        <button type="button" className="icon-btn" onClick={() => setPadOpen(true)} aria-label="Open scratchpad" title="Scratchpad (S)">
          <Icon name="pen" />
        </button>
        <button type="button" className="icon-btn flag-btn" aria-pressed={!!ans?.flagged} onClick={() => toggleFlag(attempt.id, m, qid)} aria-label="Flag for review" title="Flag for review (M)">
          <Icon name="flag" />
        </button>
        <button type="button" className="btn btn-sm" onClick={() => setEndOpen(true)}>
          {isPractice ? 'Finish' : 'End module'}
        </button>
      </header>

      <main className="exam-body" id="exam-body">
        {paused && timed ? (
          <div className="card stack-l" style={{ maxWidth: 480, margin: '40px auto', textAlign: 'center' }}>
            <h2>Paused</h2>
            <p className="muted">The question is hidden while the clock is stopped.</p>
            <button type="button" className="btn btn-primary" onClick={() => resume(attempt.id)}>
              <Icon name="play" /> Resume
            </button>
          </div>
        ) : (
          <div className="stack-l" style={{ maxWidth: 820, margin: '0 auto' }}>
            <QuestionView
              q={q}
              number={qIndex + 1}
              showMeta={isPractice}
              moduleLabel={isPractice}
              selected={ans?.choice ?? null}
              struck={ans?.struck ?? []}
              onSelect={(i) => selectAnswer(attempt.id, m, qid, i)}
              onStrike={(i) => toggleStrike(attempt.id, m, qid, i)}
              reveal={reveal}
            />

            {settings.confidence && ans?.choice !== null && ans?.choice !== undefined && !reveal && (
              <div className="confidence" role="group" aria-label="How confident are you?">
                How sure are you?
                {(['sure', 'unsure', 'guess'] as const).map((c) => (
                  <button key={c} type="button" className="chip" aria-pressed={ans?.confidence === c} onClick={() => setConfidence(attempt.id, m, qid, c)}>
                    {c === 'sure' ? 'Sure' : c === 'unsure' ? 'Unsure' : 'Guess'}
                  </button>
                ))}
              </div>
            )}

            {isPractice && attempt.instant && !checked && (
              <div className="stack">
                {ans && ans.hints > 0 && (
                  <div className="hint-list">
                    {q.hints.slice(0, ans.hints).map((h, i) => (
                      <div key={i} className="hint">
                        <span className="eyebrow">Hint {i + 1}</span>
                        <Rich text={h} />
                      </div>
                    ))}
                  </div>
                )}
                <div className="row">
                  <button type="button" className="btn btn-primary" disabled={ans?.choice === null || ans?.choice === undefined} onClick={() => checkAnswer(attempt.id, m, qid)}>
                    <Icon name="check" /> Check answer
                  </button>
                  {(ans?.hints ?? 0) < q.hints.length && (
                    <button type="button" className="btn" onClick={() => revealHint(attempt.id, m, qid)}>
                      <Icon name="bulb" /> Show a hint ({q.hints.length - (ans?.hints ?? 0)} left)
                    </button>
                  )}
                  <span className="muted" style={{ fontSize: '0.84rem' }}>
                    or press <span className="kbd">Enter</span>
                  </span>
                </div>
              </div>
            )}

            {reveal && <SolutionPanel q={q} ans={ans} />}
          </div>
        )}
      </main>

      <footer className="exam-foot">
        <button type="button" className="btn" onClick={() => go(qIndex - 1)} disabled={qIndex === 0}>
          <Icon name="left" /> <span className="hide-sm">Previous</span>
        </button>
        <span className="spacer" />
        <button type="button" className="btn" onClick={() => setNavOpen(true)}>
          <Icon name="grid" /> {qIndex + 1} / {n}
          {flagged.length > 0 && <span className="chip chip-warn" style={{ height: 20 }}>{flagged.length} flagged</span>}
        </button>
        <span className="spacer" />
        <button type="button" className="btn btn-primary" onClick={() => go(qIndex + 1)}>
          <span className="hide-sm">{qIndex === n - 1 ? (isPractice ? 'Finish' : 'Review & end') : 'Next'}</span> <Icon name="right" />
        </button>
      </footer>

      {padOpen && <Scratchpad padKey={`${attempt.id}:${m}`} onClose={() => setPadOpen(false)} />}

      {navOpen && (
        <Modal title="Questions" onClose={() => setNavOpen(false)} wide>
          <Navigator run={run} current={qIndex} reveal={isPractice && attempt.instant} onPick={(i) => { go(i); setNavOpen(false); }} />
          <div className="legend">
            <span><i style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent-soft-2)' }} />answered</span>
            <span><i style={{ background: 'var(--surface)', border: '1px solid var(--rule-strong)' }} />not answered</span>
            <span><i style={{ background: 'var(--glow)', borderRadius: '50%' }} />flagged</span>
          </div>
          <div className="row-between">
            <button type="button" className="btn btn-ghost btn-danger btn-sm" onClick={() => { setNavOpen(false); setAbandonOpen(true); }}>
              Abandon attempt
            </button>
            <button type="button" className="btn" onClick={() => setNavOpen(false)}>Close</button>
          </div>
        </Modal>
      )}

      {endOpen && (
        <Modal
          title={isPractice ? 'Finish this practice set?' : `End ${MODULES[run.module].name}?`}
          onClose={() => setEndOpen(false)}
          actions={
            <>
              <button type="button" className="btn" onClick={() => setEndOpen(false)}>
                Keep working
              </button>
              <button type="button" className="btn btn-primary" onClick={() => finishModule(false)}>
                {isPractice ? 'Finish and see results' : attempt.pos.m === attempt.modules.length - 1 ? 'Submit and see results' : 'Submit module'}
              </button>
            </>
          }
        >
          <div className="grid grid-3" style={{ gap: 10 }}>
            <div className="stat">
              <span className="stat-num">{answeredCount}</span>
              <span className="stat-label">answered</span>
            </div>
            <div className="stat">
              <span className="stat-num" style={{ color: unanswered.length ? 'var(--bad)' : undefined }}>{unanswered.length}</span>
              <span className="stat-label">not answered</span>
            </div>
            <div className="stat">
              <span className="stat-num">{flagged.length}</span>
              <span className="stat-label">flagged</span>
            </div>
          </div>
          {unanswered.length > 0 && (
            <p className="note note-warn" style={{ margin: 0 }}>
              There is no negative marking, so guess any question you have not answered.
            </p>
          )}
          {(unanswered.length > 0 || flagged.length > 0) && (
            <div className="stack">
              {unanswered.length > 0 && (
                <div className="row">
                  <span className="muted" style={{ fontSize: '0.86rem' }}>Not answered:</span>
                  {unanswered.map((i) => (
                    <button key={i} type="button" className="chip" onClick={() => { go(i); setEndOpen(false); }}>
                      Q{i + 1}
                    </button>
                  ))}
                </div>
              )}
              {flagged.length > 0 && (
                <div className="row">
                  <span className="muted" style={{ fontSize: '0.86rem' }}>Flagged:</span>
                  {flagged.map((i) => (
                    <button key={i} type="button" className="chip chip-warn" onClick={() => { go(i); setEndOpen(false); }}>
                      Q{i + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          {!isPractice && attempt.strict && <p className="muted" style={{ fontSize: '0.88rem' }}>You cannot come back to this module after submitting it.</p>}
        </Modal>
      )}

      {abandonOpen && (
        <Modal
          title="Abandon this attempt?"
          onClose={() => setAbandonOpen(false)}
          actions={
            <>
              <button type="button" className="btn" onClick={() => setAbandonOpen(false)}>
                Keep going
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  abandon(attempt.id);
                  navigate(isPractice ? 'practice' : 'paper');
                }}
              >
                Abandon
              </button>
            </>
          }
        >
          <p>Your answers in this attempt will be deleted.</p>
        </Modal>
      )}

      {toast}
    </div>
  );
}

function Navigator({ run, current, reveal, onPick }: { run: ModuleRun; current: number; reveal: boolean; onPick: (i: number) => void }) {
  const items = useMemo(() => run.questionIds.map((id) => ({ id, a: run.answers[id], q: getQuestion(id)! })), [run]);
  return (
    <div className="navigator" role="list">
      {items.map(({ id, a, q }, i) => {
        let cls = 'nav-cell';
        if (reveal && a?.checked) cls += a.choice === q.answer ? ' good' : ' bad';
        else if (a && a.choice !== null) cls += ' answered';
        if (a?.flagged) cls += ' flagged';
        if (i === current) cls += ' current';
        return (
          <button
            key={id}
            type="button"
            role="listitem"
            className={cls}
            onClick={() => onPick(i)}
            aria-label={`Question ${i + 1}${a?.choice !== null && a?.choice !== undefined ? ', answered' : ', not answered'}${a?.flagged ? ', flagged' : ''}`}
            aria-current={i === current}
          >
            {i + 1}
          </button>
        );
      })}
    </div>
  );
}
