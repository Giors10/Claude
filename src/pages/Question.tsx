import React, { useEffect, useState } from 'react';
import { ALL_QUESTIONS, getQuestion, questionLabel } from '../content/paper';
import { Icon } from '../components/Icon';
import { QuestionView } from '../components/QuestionView';
import { SolutionPanel } from '../components/SolutionPanel';
import { recordSingle } from '../lib/exam';
import { Rich } from '../lib/rich';
import { href, navigate } from '../lib/router';
import { emptyAnswer, type AnswerRecord } from '../lib/store';

export function QuestionPage({ qid }: { qid?: string }) {
  const q = qid ? getQuestion(qid) : undefined;
  const [ans, setAns] = useState<AnswerRecord>(emptyAnswer());
  const [revealed, setRevealed] = useState(false);
  const [startedAt, setStartedAt] = useState(Date.now());

  useEffect(() => {
    setAns(emptyAnswer());
    setRevealed(false);
    setStartedAt(Date.now());
  }, [qid]);

  if (!q) {
    return (
      <div className="page">
        <div className="empty">
          Question not found. <a href={href('bank')}>Back to the question bank</a>
        </div>
      </div>
    );
  }

  const idx = ALL_QUESTIONS.findIndex((x) => x.id === q.id);
  const prev = ALL_QUESTIONS[idx - 1];
  const next = ALL_QUESTIONS[idx + 1];

  const check = () => {
    if (ans.choice === null) return;
    const time = (Date.now() - startedAt) / 1000;
    setAns((a) => ({ ...a, checked: true, time }));
    setRevealed(true);
    recordSingle(q.id, ans.choice === q.answer);
  };

  return (
    <div className="page page-narrow">
      <div className="row-between">
        <a href={href('bank')} className="row" style={{ gap: 4, fontSize: '0.9rem' }}>
          <Icon name="left" size={16} /> Question bank
        </a>
        <span className="eyebrow">
          {questionLabel(q)}
        </span>
      </div>

      <div className="card">
        <QuestionView
          q={q}
          showMeta
          selected={ans.choice}
          struck={ans.struck}
          reveal={revealed}
          onSelect={(i) => setAns((a) => ({ ...a, choice: i, struck: a.struck.filter((x) => x !== i) }))}
          onStrike={(i) => setAns((a) => ({ ...a, struck: a.struck.includes(i) ? a.struck.filter((x) => x !== i) : [...a.struck, i], choice: a.choice === i ? null : a.choice }))}
        />
      </div>

      {!revealed && (
        <div className="stack">
          {ans.hints > 0 && (
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
            <button type="button" className="btn btn-primary" onClick={check} disabled={ans.choice === null}>
              <Icon name="check" /> Check answer
            </button>
            {ans.hints < q.hints.length && (
              <button type="button" className="btn" onClick={() => setAns((a) => ({ ...a, hints: a.hints + 1 }))}>
                <Icon name="bulb" /> Hint ({q.hints.length - ans.hints} left)
              </button>
            )}
            <button type="button" className="btn btn-ghost" onClick={() => setRevealed(true)}>
              Show solution without answering
            </button>
          </div>
        </div>
      )}

      {revealed && <SolutionPanel q={q} ans={ans.checked ? ans : null} showVerdict={ans.checked} />}

      <div className="row-between">
        <button type="button" className="btn" disabled={!prev} onClick={() => prev && navigate('question', prev.id)}>
          <Icon name="left" /> {prev ? questionLabel(prev) : 'Previous'}
        </button>
        <button type="button" className="btn btn-primary" disabled={!next} onClick={() => next && navigate('question', next.id)}>
          {next ? questionLabel(next) : 'Next'} <Icon name="right" />
        </button>
      </div>
    </div>
  );
}
