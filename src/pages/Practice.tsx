import React, { useMemo, useState } from 'react';
import { ALL_QUESTIONS } from '../content/paper';
import { MODULE_ORDER, MODULES, type ModuleId, type Question } from '../content/types';
import { Icon } from '../components/Icon';
import { createPractice, mistakesDue } from '../lib/exam';
import { shuffle } from '../lib/format';
import { href, navigate } from '../lib/router';
import { getState, useStore } from '../lib/store';

type Source = 'all' | 'unseen' | 'wrong' | 'bookmarked';

export function PracticePage({ preset, arg }: { preset?: string; arg?: string }) {
  const qstats = useStore((s) => s.qstats);
  const activeId = useStore((s) => s.activeId);
  const due = useMemo(() => mistakesDue(getState()), [qstats]); // eslint-disable-line react-hooks/exhaustive-deps
  const [topics, setTopics] = useState<string[]>(() => (preset === 'topic' && arg ? [arg] : []));
  const [mods, setMods] = useState<ModuleId[]>(() => (preset === 'topic' && arg ? [ALL_QUESTIONS.find((q) => q.topic === arg)?.module ?? 'M1'] : ['M1', 'PH', 'M2']));
  const [diff, setDiff] = useState<[number, number]>([1, 5]);
  const [count, setCount] = useState(10);
  const [source, setSource] = useState<Source>('all');
  const [timed, setTimed] = useState(false);
  const [instant, setInstant] = useState(true);
  const [shuffleOn, setShuffleOn] = useState(true);

  const pool = useMemo(
    () =>
      ALL_QUESTIONS.filter((q) => mods.includes(q.module))
        .filter((q) => topics.length === 0 || topics.includes(q.topic))
        .filter((q) => q.difficulty >= diff[0] && q.difficulty <= diff[1])
        .filter((q) => {
          const st = qstats[q.id];
          if (source === 'unseen') return !st || st.attempts === 0;
          if (source === 'wrong') return !!st && st.attempts > st.correct;
          if (source === 'bookmarked') return !!st?.bookmarked;
          return true;
        }),
    [mods, topics, diff, source, qstats],
  );

  const start = (qs: Question[], title: string, opts?: { timed?: boolean; instant?: boolean }) => {
    if (!qs.length) return;
    createPractice({ questionIds: qs.map((q) => q.id), title, timed: opts?.timed ?? timed, instant: opts?.instant ?? instant });
    navigate('exam');
  };

  const startCustom = () => {
    const chosen = (shuffleOn ? shuffle(pool) : pool).slice(0, count);
    const label = topics.length ? topics.join(' + ') : mods.map((m) => MODULES[m].short).join(' + ');
    start(chosen, `Practice: ${label}`);
  };

  const toggleTopic = (code: string) => setTopics((t) => (t.includes(code) ? t.filter((x) => x !== code) : [...t, code]));
  const toggleMod = (m: ModuleId) => {
    const next = mods.includes(m) ? mods.filter((x) => x !== m) : [...mods, m];
    if (!next.length) return;
    setMods(next);
    setTopics((t) => t.filter((code) => next.some((mm) => MODULES[mm].topics.some((x) => x.code === code))));
  };

  const presets: { title: string; desc: string; qs: () => Question[]; timed?: boolean; instant?: boolean }[] = [
    {
      title: 'The ten hardest',
      desc: 'The highest-rated questions across all three modules, with instant feedback.',
      qs: () => [...ALL_QUESTIONS].sort((a, b) => b.difficulty - a.difficulty || b.time - a.time).slice(0, 10),
    },
    {
      title: 'Physics sprint',
      desc: '9 physics questions in 13½ minutes, the real pace. Feedback at the end.',
      qs: () => shuffle(ALL_QUESTIONS.filter((q) => q.module === 'PH')).slice(0, 9),
      timed: true,
      instant: false,
    },
    {
      title: 'Calculus focus',
      desc: 'Every differentiation and integration question (MM6, MM7).',
      qs: () => ALL_QUESTIONS.filter((q) => q.topic === 'MM6' || q.topic === 'MM7'),
    },
    {
      title: 'Graphs and diagrams',
      desc: 'Every question with a graph, circuit or geometric figure.',
      qs: () => ALL_QUESTIONS.filter((q) => q.diagram || q.options.some((o) => typeof o !== 'string')),
    },
  ];

  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">Practice</span>
        <h1>Targeted practice</h1>
        <p className="lede">Build a set by module, topic and difficulty, choose instant feedback or exam timing, and let spaced review bring your mistakes back.</p>
      </header>

      {activeId && (
        <div className="note note-warn row-between">
          <span>Finish or abandon your current attempt before starting a new set.</span>
          <a className="btn btn-sm btn-glow" href={href('exam')}>
            Resume
          </a>
        </div>
      )}

      <section className="grid grid-2">
        <div className="card stack">
          <div className="row-between">
            <h3>Mistake review</h3>
            <span className={'chip ' + (due.length ? 'chip-warn' : 'chip-good')}>{due.length} due</span>
          </div>
          <p className="muted" style={{ fontSize: '0.92rem' }}>
            Every question you get wrong comes back today, then after 1 and 3 days, until you have answered it correctly three times.
          </p>
          <div>
            <button
              type="button"
              className="btn btn-primary"
              disabled={!due.length || !!activeId}
              onClick={() => start(due.map((id) => ALL_QUESTIONS.find((q) => q.id === id)!).filter(Boolean), 'Mistake review', { timed: false, instant: true })}
            >
              <Icon name="refresh" /> Review {due.length || ''} mistake{due.length === 1 ? '' : 's'}
            </button>
          </div>
        </div>
        <div className="card stack">
          <h3>About these questions</h3>
          <p className="muted" style={{ fontSize: '0.92rem' }}>
            Practice draws on the 81 Crucible questions. For an unbiased score, sit the full paper under strict conditions first, then practise.
            The speed drills generate unlimited fresh questions.
          </p>
          <div className="row">
            <a className="btn btn-sm" href={href('paper')}>
              <Icon name="paper" /> Crucible paper
            </a>
            <a className="btn btn-sm" href={href('drills')}>
              <Icon name="bolt" /> Speed drills
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Quick sets</h2>
        <div className="grid grid-4">
          {presets.map((p) => (
            <button
              key={p.title}
              type="button"
              className="card stack"
              style={{ textAlign: 'left', cursor: 'pointer' }}
              disabled={!!activeId}
              onClick={() => start(p.qs(), p.title, { timed: p.timed ?? false, instant: p.instant ?? true })}
            >
              <strong>{p.title}</strong>
              <span className="muted" style={{ fontSize: '0.88rem' }}>
                {p.desc}
              </span>
              <span className="chip chip-mono" style={{ alignSelf: 'flex-start' }}>
                {p.qs().length} questions
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="card stack-l">
        <h2>Custom set</h2>
        <div className="stack">
          <span className="field-label">Modules</span>
          <div className="row">
            {MODULE_ORDER.map((m) => (
              <button key={m} type="button" className="chip" aria-pressed={mods.includes(m)} onClick={() => toggleMod(m)}>
                {MODULES[m].name}
              </button>
            ))}
          </div>
        </div>
        <div className="stack">
          <span className="field-label">Topics {topics.length === 0 && <span className="muted">(all)</span>}</span>
          {MODULE_ORDER.filter((m) => mods.includes(m)).map((m) => (
            <div key={m} className="row" style={{ gap: 6 }}>
              <span className="eyebrow" style={{ width: 64 }}>
                {MODULES[m].short}
              </span>
              {MODULES[m].topics.map((t) => {
                const n = ALL_QUESTIONS.filter((q) => q.topic === t.code).length;
                return (
                  <button key={t.code} type="button" className="chip" aria-pressed={topics.includes(t.code)} onClick={() => toggleTopic(t.code)} title={t.name}>
                    {t.code} · {t.name} <span className="muted">{n}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div className="grid grid-3">
          <div className="field">
            <label htmlFor="diff-min">Difficulty</label>
            <div className="row" style={{ flexWrap: 'nowrap' }}>
              <select id="diff-min" className="input" value={diff[0]} onChange={(e) => setDiff([Number(e.target.value), Math.max(Number(e.target.value), diff[1])])}>
                {[1, 2, 3, 4, 5].map((d) => (
                  <option key={d} value={d}>
                    from {d}
                  </option>
                ))}
              </select>
              <select aria-label="Maximum difficulty" className="input" value={diff[1]} onChange={(e) => setDiff([Math.min(diff[0], Number(e.target.value)), Number(e.target.value)])}>
                {[1, 2, 3, 4, 5].map((d) => (
                  <option key={d} value={d}>
                    to {d}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="source">Questions</label>
            <select id="source" className="input" value={source} onChange={(e) => setSource(e.target.value as Source)}>
              <option value="all">All matching</option>
              <option value="unseen">Not yet attempted</option>
              <option value="wrong">Previously wrong</option>
              <option value="bookmarked">Bookmarked</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="count">Number of questions</label>
            <select id="count" className="input" value={count} onChange={(e) => setCount(Number(e.target.value))}>
              {[5, 9, 10, 15, 20, 27, 81].map((c) => (
                <option key={c} value={c}>
                  {c === 81 ? 'All' : c}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row" style={{ gap: 20 }}>
          <label className="check">
            <input type="checkbox" checked={instant} onChange={(e) => setInstant(e.target.checked)} />
            Instant feedback and hints
          </label>
          <label className="check">
            <input type="checkbox" checked={timed} onChange={(e) => setTimed(e.target.checked)} />
            Timed at exam pace (89 s per question)
          </label>
          <label className="check">
            <input type="checkbox" checked={shuffleOn} onChange={(e) => setShuffleOn(e.target.checked)} />
            Shuffle order
          </label>
        </div>
        <div className="row-between">
          <span className="muted">
            {pool.length} matching question{pool.length === 1 ? '' : 's'}
            {pool.length > 0 && ` · you'll get ${Math.min(count, pool.length)}`}
          </span>
          <button type="button" className="btn btn-primary btn-lg" disabled={!pool.length || !!activeId} onClick={startCustom}>
            <Icon name="play" /> Start practice
          </button>
        </div>
      </section>
    </div>
  );
}
