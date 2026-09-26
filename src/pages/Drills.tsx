import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '../components/Icon';
import { DRILLS, checkTyped, drillById, type DrillQuestion, type DrillType } from '../lib/drills';
import { fmtDateTime } from '../lib/format';
import { RichInline } from '../lib/rich';
import { markActive, setState, useStore } from '../lib/store';

type Length = 60 | 120 | 20;

export function DrillsPage() {
  const drills = useStore((s) => s.drills);
  const [active, setActive] = useState<{ type: string; length: Length } | null>(null);
  const [length, setLength] = useState<Length>(60);

  const best = (id: string) => drills.filter((d) => d.type === id).reduce((b, d) => Math.max(b, d.correct), 0);

  if (active) return <DrillSession typeId={active.type} length={active.length} onExit={() => setActive(null)} />;

  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">Speed drills · no calculator</span>
        <h1>Speed drills</h1>
        <p className="lede">
          The ESAT gives you 89 seconds per question and no calculator, so arithmetic speed matters. Each drill generates unlimited fresh questions,
          correct by construction.
        </p>
      </header>

      <div className="row">
        <span className="field-label">Session length</span>
        <div className="seg" role="group" aria-label="Session length">
          {(
            [
              [60, '60 seconds'],
              [120, '2 minutes'],
              [20, '20 questions'],
            ] as [Length, string][]
          ).map(([v, label]) => (
            <button key={v} type="button" aria-pressed={length === v} onClick={() => setLength(v)}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <section className="grid grid-3">
        <button type="button" className="card stack" style={{ textAlign: 'left', cursor: 'pointer', borderColor: 'var(--accent)' }} onClick={() => setActive({ type: 'mixed', length })}>
          <div className="row-between">
            <strong>Mixed</strong>
            <Icon name="bolt" />
          </div>
          <span className="muted" style={{ fontSize: '0.9rem' }}>
            A random mix of every drill type, the best warm-up before a paper.
          </span>
          <span className="chip chip-mono" style={{ alignSelf: 'flex-start' }}>
            best {best('mixed')}
          </span>
        </button>
        {DRILLS.map((d) => (
          <button key={d.id} type="button" className="card stack" style={{ textAlign: 'left', cursor: 'pointer' }} onClick={() => setActive({ type: d.id, length })}>
            <strong>{d.title}</strong>
            <span className="muted" style={{ fontSize: '0.9rem' }}>
              {d.desc}
            </span>
            <span className="chip chip-mono" style={{ alignSelf: 'flex-start' }}>
              best {best(d.id)}
            </span>
          </button>
        ))}
      </section>

      {drills.length > 0 && (
        <section className="section">
          <h2>Recent sessions</h2>
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>When</th>
                  <th>Drill</th>
                  <th className="num">Correct</th>
                  <th className="num">Accuracy</th>
                  <th className="num">Per question</th>
                </tr>
              </thead>
              <tbody>
                {[...drills]
                  .reverse()
                  .slice(0, 12)
                  .map((d) => (
                    <tr key={d.at}>
                      <td>{fmtDateTime(d.at)}</td>
                      <td>{d.type === 'mixed' ? 'Mixed' : drillById(d.type)?.title ?? d.type}</td>
                      <td className="num mono">
                        {d.correct}/{d.total}
                      </td>
                      <td className="num mono">{d.total ? Math.round((100 * d.correct) / d.total) : 0}%</td>
                      <td className="num mono">{d.total ? (d.seconds / d.total).toFixed(1) : '–'}s</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}

function DrillSession({ typeId, length, onExit }: { typeId: string; length: Length; onExit: () => void }) {
  const timed = length !== 20;
  const [q, setQ] = useState<DrillQuestion>(() => gen(typeId));
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<{ ok: boolean; answer: string } | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [start] = useState(Date.now());
  const [now, setNow] = useState(Date.now());
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const saved = useRef(false);

  const elapsed = (now - start) / 1000;
  const remaining = timed ? Math.max(0, length - elapsed) : Infinity;

  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 200);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    if (!done && ((timed && remaining <= 0) || (!timed && score.total >= length))) setDone(true);
  }, [remaining, timed, score.total, length, done]);

  useEffect(() => {
    if (done && !saved.current && score.total > 0) {
      saved.current = true;
      setState((s) => ({ ...s, drills: [...s.drills, { type: typeId, at: Date.now(), correct: score.correct, total: score.total, seconds: Math.round(elapsed) }].slice(-200) }));
      markActive();
    }
  }, [done, score, typeId, elapsed]);

  useEffect(() => {
    if (!feedback) inputRef.current?.focus();
  }, [q, feedback]);

  const next = useCallback(() => {
    setFeedback(null);
    setInput('');
    setQ(gen(typeId));
  }, [typeId]);

  const answer = useCallback(
    (ok: boolean) => {
      setScore((s) => ({ correct: s.correct + (ok ? 1 : 0), total: s.total + 1 }));
      setFeedback({ ok, answer: q.answer });
      window.setTimeout(next, ok ? 450 : 1400);
    },
    [q, next],
  );

  useEffect(() => {
    if (!q.choices || feedback || done) return;
    const onKey = (e: KeyboardEvent) => {
      const i = Number(e.key) - 1;
      if (i >= 0 && i < (q.choices?.length ?? 0)) answer(i === q.correct);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [q, feedback, done, answer]);

  const title = typeId === 'mixed' ? 'Mixed drill' : drillById(typeId)?.title;

  if (done) {
    const acc = score.total ? Math.round((100 * score.correct) / score.total) : 0;
    return (
      <div className="page page-narrow">
        <div className="drill-stage">
          <span className="eyebrow">{title}</span>
          <div className="big-score">{score.correct}</div>
          <p className="muted">
            correct out of {score.total} · {acc}% accuracy · {score.total ? (elapsed / score.total).toFixed(1) : '–'} s per question
          </p>
          <div className="row">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                saved.current = false;
                onExit();
              }}
            >
              Back to drills
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page page-narrow">
      <div className="row-between">
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setDone(true)}>
          <Icon name="x" /> Stop
        </button>
        <span className="eyebrow">{title}</span>
        <span className="timer" style={{ fontSize: '0.95rem' }}>
          <Icon name="clock" />
          {timed ? `${Math.ceil(remaining)}s` : `${score.total}/${length}`}
        </span>
      </div>
      <div className="drill-stage">
        <div className="row" style={{ gap: 16 }}>
          <span className="chip chip-good">{score.correct} correct</span>
          <span className="chip">{score.total - score.correct} wrong</span>
        </div>
        <div className="drill-prompt" aria-live="polite">
          <RichInline text={q.prompt} />
        </div>
        {q.choices ? (
          <div className="drill-choices">
            {q.choices.map((c, i) => (
              <button
                key={i}
                type="button"
                className={'opt' + (feedback ? (i === q.correct ? ' correct' : '') : '')}
                disabled={!!feedback}
                onClick={() => answer(i === q.correct)}
              >
                <span className="letter">{i + 1}</span>
                <span className="opt-body">
                  <RichInline text={c} />
                </span>
              </button>
            ))}
          </div>
        ) : (
          <form
            className="stack"
            style={{ alignItems: 'center', width: '100%' }}
            onSubmit={(e) => {
              e.preventDefault();
              if (feedback || !input.trim()) return;
              answer(checkTyped(q, input));
            }}
          >
            <label htmlFor="drill-answer" className="visually-hidden">
              Your answer
            </label>
            <input
              id="drill-answer"
              ref={inputRef}
              className="input drill-input"
              inputMode="text"
              autoComplete="off"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={q.unit === '%' ? 'e.g. 12.5' : 'answer'}
              disabled={!!feedback}
            />
            <button type="submit" className="btn btn-primary" disabled={!!feedback || !input.trim()}>
              Submit <span className="kbd">Enter</span>
            </button>
          </form>
        )}
        <div className="drill-feedback" role="status">
          {feedback &&
            (feedback.ok ? (
              <span style={{ color: 'var(--good)' }}>Correct</span>
            ) : (
              <span style={{ color: 'var(--bad)' }}>
                Answer: <RichInline text={feedback.answer} />
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}

function gen(typeId: string): DrillQuestion {
  const type: DrillType = typeId === 'mixed' ? DRILLS[Math.floor(Math.random() * DRILLS.length)] : drillById(typeId) ?? DRILLS[0];
  return type.gen(Math.random);
}
