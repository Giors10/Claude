import React, { useMemo, useState } from 'react';
import { ALL_QUESTIONS } from '../content/paper';
import { MODULE_ORDER, MODULES, topicName, type ModuleId } from '../content/types';
import { Icon } from '../components/Icon';
import { DifficultyPips } from '../components/QuestionView';
import { href, navigate } from '../lib/router';
import { useStore } from '../lib/store';

type Status = 'any' | 'unseen' | 'right' | 'wrong' | 'bookmarked';

export function BankPage() {
  const qstats = useStore((s) => s.qstats);
  const [mod, setMod] = useState<ModuleId | 'all'>('all');
  const [topic, setTopic] = useState('all');
  const [status, setStatus] = useState<Status>('any');
  const [minDiff, setMinDiff] = useState(1);
  const [q, setQ] = useState('');

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ALL_QUESTIONS.filter((x) => mod === 'all' || x.module === mod)
      .filter((x) => topic === 'all' || x.topic === topic)
      .filter((x) => x.difficulty >= minDiff)
      .filter((x) => {
        const st = qstats[x.id];
        if (status === 'unseen') return !st || st.attempts === 0;
        if (status === 'right') return !!st && st.lastCorrect === true;
        if (status === 'wrong') return !!st && st.lastCorrect === false;
        if (status === 'bookmarked') return !!st?.bookmarked;
        return true;
      })
      .filter((x) => !needle || [x.title, x.id, topicName(x.topic), ...x.skills, ...x.spec].join(' ').toLowerCase().includes(needle));
  }, [mod, topic, status, minDiff, q, qstats]);

  const topicOptions = mod === 'all' ? MODULE_ORDER.flatMap((m) => MODULES[m].topics) : MODULES[mod].topics;

  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">Question bank · {ALL_QUESTIONS.length} questions</span>
        <h1>Question bank</h1>
        <p className="lede">Every Crucible question, searchable by module, topic, specification point, skill and difficulty, with your history on each.</p>
      </header>

      <section className="card stack">
        <div className="grid grid-4">
          <div className="field">
            <label htmlFor="bank-q">Search</label>
            <input id="bank-q" className="input" placeholder="e.g. surds, MM6.3, momentum" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="bank-mod">Module</label>
            <select
              id="bank-mod"
              className="input"
              value={mod}
              onChange={(e) => {
                setMod(e.target.value as ModuleId | 'all');
                setTopic('all');
              }}
            >
              <option value="all">All modules</option>
              {MODULE_ORDER.map((m) => (
                <option key={m} value={m}>
                  {MODULES[m].name}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="bank-topic">Topic</label>
            <select id="bank-topic" className="input" value={topic} onChange={(e) => setTopic(e.target.value)}>
              <option value="all">All topics</option>
              {topicOptions.map((t) => (
                <option key={t.code} value={t.code}>
                  {t.code} · {t.name}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="bank-status">Status</label>
            <select id="bank-status" className="input" value={status} onChange={(e) => setStatus(e.target.value as Status)}>
              <option value="any">Any</option>
              <option value="unseen">Not attempted</option>
              <option value="right">Last attempt correct</option>
              <option value="wrong">Last attempt wrong</option>
              <option value="bookmarked">Bookmarked</option>
            </select>
          </div>
        </div>
        <div className="row">
          <span className="field-label">Minimum difficulty</span>
          <div className="seg" role="group" aria-label="Minimum difficulty">
            {[1, 2, 3, 4, 5].map((d) => (
              <button key={d} type="button" aria-pressed={minDiff === d} onClick={() => setMinDiff(d)}>
                {d}+
              </button>
            ))}
          </div>
          <span className="muted" style={{ marginLeft: 'auto' }}>
            {rows.length} shown
          </span>
        </div>
      </section>

      <div className="table-wrap">
        <table className="data">
          <thead>
            <tr>
              <th>ID</th>
              <th>Question</th>
              <th className="hide-sm">Topic</th>
              <th>Difficulty</th>
              <th className="hide-sm">Your history</th>
              <th className="hide-sm" />
            </tr>
          </thead>
          <tbody>
            {rows.map((x) => {
              const st = qstats[x.id];
              return (
                <tr key={x.id} className="clickable" onClick={() => navigate('question', x.id)}>
                  <td className="mono nowrap">{x.id}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{x.title}</div>
                    <div className="muted" style={{ fontSize: '0.8rem' }}>
                      {x.spec.join(', ')}
                      {x.diagram ? ' · diagram' : ''}
                    </div>
                    <div className="show-sm muted" style={{ fontSize: '0.8rem' }}>
                      {topicName(x.topic)}
                      {st && st.attempts > 0 ? ` · ${st.correct}/${st.attempts} correct` : ''}
                      {st?.bookmarked ? ' · bookmarked' : ''}
                    </div>
                  </td>
                  <td className="hide-sm">
                    <span className="topic-cell">
                      <span className="chip chip-mono">{x.topic}</span>
                      <span>{topicName(x.topic)}</span>
                    </span>
                  </td>
                  <td className="nowrap">
                    <DifficultyPips d={x.difficulty} />
                  </td>
                  <td className="nowrap hide-sm">
                    {!st || st.attempts === 0 ? (
                      <span className="muted">not attempted</span>
                    ) : (
                      <span className={st.lastCorrect ? 'chip chip-good' : 'chip chip-bad'}>
                        {st.correct}/{st.attempts} correct
                      </span>
                    )}
                    {st?.bookmarked && <Icon name="star" size={14} className="muted" />}
                  </td>
                  <td className="num hide-sm">
                    <a href={href('question', x.id)} onClick={(e) => e.stopPropagation()}>
                      Open
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {rows.length === 0 && <div className="empty">No questions match. Try clearing a filter.</div>}
    </div>
  );
}
