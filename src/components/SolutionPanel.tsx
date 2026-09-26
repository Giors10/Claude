import React, { useState } from 'react';
import { LETTERS, topicName, type Question } from '../content/types';
import { Diagram } from '../diagrams';
import { Rich } from '../lib/rich';
import { href } from '../lib/router';
import { setState, useStore, type AnswerRecord } from '../lib/store';
import { fmtDuration } from '../lib/format';
import { Icon } from './Icon';
import { Tutor } from './Tutor';

type Tab = 'solution' | 'traps' | 'hints' | 'notes';

export function Verdict({ q, ans }: { q: Question; ans?: AnswerRecord | null }) {
  if (!ans || ans.choice === null) {
    return (
      <span className="verdict skip">
        <Icon name="info" size={18} /> Not answered · correct answer {LETTERS[q.answer]}
      </span>
    );
  }
  if (ans.choice === q.answer) {
    return (
      <span className="verdict good">
        <Icon name="check" size={18} /> Correct · {LETTERS[q.answer]}
      </span>
    );
  }
  return (
    <span className="verdict bad">
      <Icon name="x" size={18} /> You chose {LETTERS[ans.choice]} · correct answer {LETTERS[q.answer]}
    </span>
  );
}

export function SolutionPanel({ q, ans, showVerdict = true }: { q: Question; ans?: AnswerRecord | null; showVerdict?: boolean }) {
  const [tab, setTab] = useState<Tab>('solution');
  const stats = useStore((s) => s.qstats[q.id]);
  const chosen = ans?.choice ?? null;
  const trapEntries = Object.entries(q.traps).map(([k, v]) => [Number(k), v] as const);
  const yourTrap = chosen !== null && chosen !== q.answer ? q.traps[chosen] : undefined;

  const setNote = (note: string) =>
    setState((s) => {
      const prev = s.qstats[q.id] ?? { attempts: 0, correct: 0, lastCorrect: null, lastAt: 0, box: 0, due: 0, note: '', bookmarked: false };
      if (prev.note === note) return s;
      return { ...s, qstats: { ...s.qstats, [q.id]: { ...prev, note } } };
    });
  const toggleBookmark = () =>
    setState((s) => {
      const prev = s.qstats[q.id] ?? { attempts: 0, correct: 0, lastCorrect: null, lastAt: 0, box: 0, due: 0, note: '', bookmarked: false };
      return { ...s, qstats: { ...s.qstats, [q.id]: { ...prev, bookmarked: !prev.bookmarked } } };
    });

  return (
    <section className="solution" aria-label="Solution">
      <div className="solution-head">
        {showVerdict ? <Verdict q={q} ans={ans} /> : <strong>Answer: {LETTERS[q.answer]}</strong>}
        <div className="row" style={{ gap: 8 }}>
          {ans && ans.time > 0 && (
            <span className={'chip chip-mono' + (ans.time > q.time * 1.5 ? ' chip-warn' : '')} title="Your time compared with the target time">
              <Icon name="clock" size={13} /> {fmtDuration(ans.time)} / target {fmtDuration(q.time)}
            </span>
          )}
          <button type="button" className="icon-btn" aria-pressed={!!stats?.bookmarked} onClick={toggleBookmark} title={stats?.bookmarked ? 'Remove bookmark' : 'Bookmark this question'}>
            <Icon name="star" />
          </button>
        </div>
      </div>
      <div className="solution-body">
        {yourTrap && (
          <div className="note note-warn">
            <strong>Why {LETTERS[chosen!]} is tempting:</strong> <Rich text={yourTrap} className="inline-rich" />
          </div>
        )}
        <div className="tabs" role="tablist" aria-label="Solution sections">
          {(
            [
              ['solution', 'Worked solution'],
              ['traps', `Why not the others${trapEntries.length ? ` (${trapEntries.length})` : ''}`],
              ['hints', 'Hints'],
              ['notes', 'My notes'],
            ] as [Tab, string][]
          ).map(([k, label]) => (
            <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)}>
              {label}
            </button>
          ))}
        </div>

        {tab === 'solution' && (
          <div className="stack-l" role="tabpanel">
            <Rich text={q.solution} />
            {q.solutionDiagram && (
              <div className="diagram-frame" style={{ maxWidth: 520 }}>
                <Diagram id={q.solutionDiagram} />
              </div>
            )}
          </div>
        )}

        {tab === 'traps' && (
          <div className="traps" role="tabpanel">
            {trapEntries.length === 0 && <p className="muted">No common traps recorded for this question.</p>}
            {trapEntries.map(([i, text]) => (
              <div key={i} className="trap">
                <span className="letter">{LETTERS[i]}</span>
                <Rich text={text} />
              </div>
            ))}
          </div>
        )}

        {tab === 'hints' && (
          <ol className="hint-list" role="tabpanel" style={{ margin: 0, paddingLeft: 0, listStyle: 'none' }}>
            {q.hints.map((h, i) => (
              <li key={i} className="hint">
                <span className="eyebrow">Hint {i + 1}</span>
                <Rich text={h} />
              </li>
            ))}
          </ol>
        )}

        {tab === 'notes' && (
          <div className="field" role="tabpanel">
            <label htmlFor={`note-${q.id}`}>Notes for future you (saved in this browser)</label>
            <textarea
              id={`note-${q.id}`}
              className="input"
              placeholder="What tripped you up? What will you do differently?"
              defaultValue={stats?.note ?? ''}
              onBlur={(e) => setNote(e.target.value)}
            />
          </div>
        )}

        <div className="insight">
          <Icon name="bulb" />
          <div>
            <strong>Key insight.</strong> <Rich text={q.insight} className="inline-rich" />
          </div>
        </div>

        <div className="row">
          <a className="btn btn-sm" href={href('learn', q.topic)}>
            <Icon name="learn" /> Revise {topicName(q.topic)}
          </a>
          <span className="muted" style={{ fontSize: '0.84rem' }}>
            Skills: {q.skills.join(' · ')}
          </span>
        </div>

        <Tutor q={q} chosen={chosen} />
      </div>
    </section>
  );
}
