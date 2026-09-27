import React from 'react';
import { LETTERS, MODULES, topicName, type Question } from '../content/types';
import { Diagram } from '../diagrams';
import { Rich, RichInline } from '../lib/rich';
import { Icon } from './Icon';

export function DifficultyPips({ d, label = true }: { d: number; label?: boolean }) {
  return (
    <span className="diff" title={`Difficulty ${d} of 5`} aria-label={label ? `Difficulty ${d} of 5` : undefined}>
      {[1, 2, 3, 4, 5].map((i) => (
        <i key={i} className={i <= d ? 'on' : ''} />
      ))}
    </span>
  );
}

export function QuestionMeta({ q }: { q: Question }) {
  return (
    <>
      <span className="chip chip-mono chip-accent" title={topicName(q.topic)}>
        {q.spec[0]}
      </span>
      <span className="chip">{topicName(q.topic)}</span>
      <DifficultyPips d={q.difficulty} />
      <span className="chip chip-mono" title="Target time for a strong candidate">
        <Icon name="clock" size={13} /> {Math.round(q.time)}s
      </span>
    </>
  );
}

function optionLayout(q: Question): string {
  if (q.options.some((o) => typeof o !== 'string')) return 'options options-diagrams';
  const plain = q.options.map((o) => (typeof o === 'string' ? o.replace(/\\[a-z]+/gi, 'x').replace(/[${}]/g, '') : ''));
  const short = plain.every((s) => s.length <= 22) && !q.options.some((o) => typeof o === 'string' && o.includes('$$'));
  return short && q.options.length >= 5 && !q.statements ? 'options options-grid' : 'options';
}

export interface QuestionViewProps {
  q: Question;
  number?: number;
  showMeta?: boolean;
  selected: number | null;
  struck?: number[];
  onSelect?: (i: number) => void;
  onStrike?: (i: number) => void;
  /** Show correct/incorrect colouring. */
  reveal?: boolean;
  headExtra?: React.ReactNode;
  moduleLabel?: boolean;
}

export function QuestionView({ q, number, showMeta, selected, struck = [], onSelect, onStrike, reveal, headExtra, moduleLabel }: QuestionViewProps) {
  const interactive = !!onSelect && !reveal;
  const layout = optionLayout(q);
  const radioRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (!interactive) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect!(i);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      radioRefs.current[(i + 1) % q.options.length]?.focus();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      radioRefs.current[(i - 1 + q.options.length) % q.options.length]?.focus();
    }
  };

  return (
    <article className="question" aria-labelledby={`q-${q.id}-title`}>
      <header className="q-head">
        <h2 className="q-number" id={`q-${q.id}-title`}>
          {moduleLabel ? `${MODULES[q.module].short} · ` : ''}Question {number ?? q.n}
        </h2>
        {showMeta && <QuestionMeta q={q} />}
        {headExtra}
      </header>

      <div className="q-stem">
        <Rich text={q.stem} />
      </div>

      {q.diagram && (
        <figure className="q-diagram" style={{ margin: 0 }}>
          <div className="diagram-frame">
            <Diagram id={q.diagram} />
          </div>
          {q.diagramAlt && <figcaption className="visually-hidden">{q.diagramAlt}</figcaption>}
        </figure>
      )}

      {q.statements && (
        <ol className="statements">
          {q.statements.map((s, i) => (
            <li key={i}>
              <span className="sn">{i + 1}</span>
              <div>
                <Rich text={s} />
              </div>
            </li>
          ))}
        </ol>
      )}

      {q.prompt && (
        <div className="q-prompt">
          <Rich text={q.prompt} />
        </div>
      )}

      <div role="radiogroup" aria-label="Answer options">
        <ul className={layout}>
          {q.options.map((o, i) => {
            const isSel = selected === i;
            const isStruck = struck.includes(i);
            let cls = 'opt';
            let tag: string | null = null;
            if (reveal) {
              if (i === q.answer) {
                cls += ' correct';
                tag = isSel ? 'Your answer · correct' : 'Correct answer';
              } else if (isSel) {
                cls += ' wrong';
                tag = 'Your answer';
              }
            } else if (isSel) {
              cls += ' selected';
            }
            if (isStruck && !reveal) cls += ' struck';
            if (typeof o !== 'string') cls += ' opt-diagram';
            return (
              <li key={i} className={'opt-wrap' + (typeof o === 'string' ? '' : ' opt-wrap-diagram')}>
                <div
                  ref={(el) => {
                    radioRefs.current[i] = el;
                  }}
                  role="radio"
                  aria-checked={isSel}
                  aria-disabled={!interactive}
                  tabIndex={interactive ? (isSel || (selected === null && i === 0) ? 0 : -1) : -1}
                  className={cls}
                  onClick={() => interactive && onSelect!(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  style={onStrike && interactive && typeof o === 'string' ? { paddingRight: 44 } : undefined}
                >
                  <span className="letter">{LETTERS[i]}</span>
                  {typeof o === 'string' ? (
                    // The tag wraps below a long answer instead of squeezing it.
                    <span className="opt-main">
                      <span className="opt-body">
                        <RichInline text={o} />
                      </span>
                      {tag && <span className="opt-tag">{tag}</span>}
                    </span>
                  ) : (
                    <>
                      <span className="opt-body">
                        <Diagram id={o.diagram} />
                        <span className="visually-hidden">{o.alt}</span>
                      </span>
                      {tag && <span className="opt-tag">{tag}</span>}
                    </>
                  )}
                </div>
                {onStrike && interactive && (
                  <button
                    type="button"
                    className="strike-btn"
                    aria-pressed={isStruck}
                    aria-label={`${isStruck ? 'Restore' : 'Cross out'} option ${LETTERS[i]}`}
                    title={isStruck ? 'Restore option' : 'Cross out option'}
                    onClick={(e) => {
                      e.stopPropagation();
                      onStrike(i);
                    }}
                  >
                    <Icon name="strike" size={16} />
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
