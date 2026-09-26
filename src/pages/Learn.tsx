import React, { useState } from 'react';
import { LEARN, learnTopic } from '../content/learn';
import { ALL_QUESTIONS, PAPERS } from '../content/paper';
import { MODULE_ORDER, MODULES } from '../content/types';
import { Icon } from '../components/Icon';
import { Rich, RichInline } from '../lib/rich';
import { href, navigate } from '../lib/router';
import { setState, useStore } from '../lib/store';

export function LearnPage({ topic }: { topic?: string }) {
  const t = topic ? learnTopic(topic) : undefined;
  if (!t) return <LearnIndex />;
  return <TopicArticle code={t.code} />;
}

function topicStats(qstats: Record<string, { attempts: number; correct: number }>, code: string) {
  const qs = ALL_QUESTIONS.filter((q) => q.topic === code);
  let a = 0;
  let c = 0;
  qs.forEach((q) => {
    const s = qstats[q.id];
    if (s) {
      a += s.attempts;
      c += s.correct;
    }
  });
  return { questions: qs.length, attempts: a, correct: c };
}

function LearnIndex() {
  const read = useStore((s) => s.learnRead);
  const qstats = useStore((s) => s.qstats);
  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">Learn · 22 topics · 2026 specification</span>
        <h1>Topic notes</h1>
        <p className="lede">
          Concise notes for every part of the Mathematics 1, Mathematics 2 and Physics specifications: the ideas that matter, the formulas to memorise,
          the traps that cost marks, and a worked example for each.
        </p>
      </header>
      {MODULE_ORDER.map((m) => (
        <section key={m} className="section">
          <div className="section-head">
            <h2>{MODULES[m].name}</h2>
            <span className="muted">
              {LEARN.filter((x) => x.module === m && read[x.code]).length}/{LEARN.filter((x) => x.module === m).length} read
            </span>
          </div>
          <div className="grid grid-3">
            {LEARN.filter((x) => x.module === m).map((x) => {
              const st = topicStats(qstats, x.code);
              return (
                <a key={x.code} href={href('learn', x.code)} className="card stack" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="row-between">
                    <span className="module-code">{x.code}</span>
                    {read[x.code] ? (
                      <span className="chip chip-good">
                        <Icon name="check" size={13} /> read
                      </span>
                    ) : (
                      <span className="chip">{x.sections.length} sections</span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '1.1rem' }}>{x.title}</h3>
                  <p className="muted" style={{ fontSize: '0.9rem' }}>
                    <RichInline text={x.summary} />
                  </p>
                  <span className="muted" style={{ fontSize: '0.8rem' }}>
                    {st.questions} paper question{st.questions === 1 ? '' : 's'}
                    {st.attempts > 0 && ` · you: ${st.correct}/${st.attempts} correct`}
                  </span>
                </a>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

function TopicArticle({ code }: { code: string }) {
  const t = learnTopic(code)!;
  const read = useStore((s) => !!s.learnRead[code]);
  const [showExample, setShowExample] = useState(false);
  const [showQs, setShowQs] = useState(false);
  const idx = LEARN.findIndex((x) => x.code === code);
  const prev = LEARN[idx - 1];
  const next = LEARN[idx + 1];
  const qs = ALL_QUESTIONS.filter((q) => q.topic === code);

  React.useEffect(() => {
    setShowExample(false);
    setShowQs(false);
  }, [code]);

  const toggleRead = () =>
    setState((s) => {
      const learnRead = { ...s.learnRead };
      if (learnRead[code]) delete learnRead[code];
      else learnRead[code] = Date.now();
      return { ...s, learnRead };
    });

  return (
    <div className="page">
      <div className="learn-layout">
        <nav className="learn-toc" aria-label="Topics">
          {MODULE_ORDER.map((m) => (
            <React.Fragment key={m}>
              <div className="nav-group-label">{MODULES[m].name}</div>
              {LEARN.filter((x) => x.module === m).map((x) => (
                <button key={x.code} type="button" aria-current={x.code === code} onClick={() => navigate('learn', x.code)}>
                  <span className="code">{x.code}</span>
                  {x.title}
                </button>
              ))}
            </React.Fragment>
          ))}
        </nav>

        <article className="learn-article">
          <header className="page-head">
            <a href={href('learn')} className="row" style={{ gap: 4, fontSize: '0.9rem' }}>
              <Icon name="left" size={16} /> All topics
            </a>
            <span className="eyebrow">
              {MODULES[t.module].name} · {t.code}
            </span>
            <h1>{t.title}</h1>
            <p className="lede">
              <RichInline text={t.summary} />
            </p>
            <p className="muted" style={{ fontSize: '0.88rem' }}>
              <strong>Specification:</strong> <RichInline text={t.specNote} />
            </p>
          </header>

          {t.sections.map((s) => (
            <section key={s.heading} className="stack">
              <h2 style={{ fontSize: '1.3rem' }}>{s.heading}</h2>
              <Rich text={s.body} />
            </section>
          ))}

          <section className="formula-box">
            <h4>Must-know formulas</h4>
            <div className="formula-rows">
              {t.formulas.map((f) => (
                <div key={f.name} className="formula-row">
                  <span className="fname">
                    <RichInline text={f.name} />
                  </span>
                  <span className="fexpr">
                    <RichInline text={`$${f.tex}$`} />
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="grid grid-2">
            <div className="card stack">
              <h3 style={{ fontSize: '1.05rem' }}>Traps that cost marks</h3>
              <ul className="stack" style={{ margin: 0, paddingLeft: '1.2em' }}>
                {t.traps.map((x, i) => (
                  <li key={i}>
                    <RichInline text={x} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="card stack">
              <h3 style={{ fontSize: '1.05rem' }}>Exam technique</h3>
              <ul className="stack" style={{ margin: 0, paddingLeft: '1.2em' }}>
                {t.tips.map((x, i) => (
                  <li key={i}>
                    <RichInline text={x} />
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="card stack">
            <span className="eyebrow">Worked example</span>
            <Rich text={t.example.question} />
            {showExample ? (
              <div className="note">
                <Rich text={t.example.solution} />
              </div>
            ) : (
              <div>
                <button type="button" className="btn btn-sm" onClick={() => setShowExample(true)}>
                  Try it, then show the solution
                </button>
              </div>
            )}
          </section>

          <section className="card stack">
            <div className="row-between">
              <h3 style={{ fontSize: '1.05rem' }}>Practise {t.title.toLowerCase()}</h3>
              <span className="chip chip-mono">{qs.length} paper questions</span>
            </div>
            <div className="row">
              <button type="button" className="btn btn-primary" onClick={() => navigate('practice', 'topic', code)}>
                <Icon name="target" /> Build a practice set
              </button>
              <button type="button" className="btn" onClick={() => setShowQs((v) => !v)}>
                {showQs ? 'Hide' : 'Show'} which paper questions test this
              </button>
            </div>
            {showQs && (
              <div className="stack" style={{ gap: 8 }}>
                {PAPERS.map((p) => {
                  const mine = qs.filter((q) => p.modules[q.module].includes(q));
                  if (!mine.length) return null;
                  return (
                    <p key={p.id} className="muted" style={{ fontSize: '0.9rem', margin: 0 }}>
                      <strong style={{ color: 'var(--ink-2)' }}>{p.label}:</strong>{' '}
                      {mine.map((q, i) => (
                        <React.Fragment key={q.id}>
                          {i > 0 && ' · '}
                          <a href={href('question', q.id)}>
                            Q{q.n} {q.title}
                          </a>
                        </React.Fragment>
                      ))}
                    </p>
                  );
                })}
              </div>
            )}
          </section>

          <div className="row-between">
            <button type="button" className={read ? 'btn' : 'btn btn-primary'} onClick={toggleRead}>
              <Icon name="check" /> {read ? 'Marked as read' : 'Mark as read'}
            </button>
            <div className="row">
              {prev && (
                <a className="btn" href={href('learn', prev.code)}>
                  <Icon name="left" /> {prev.code}: {prev.title}
                </a>
              )}
              {next && (
                <a className="btn" href={href('learn', next.code)}>
                  {next.code}: {next.title} <Icon name="right" />
                </a>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
