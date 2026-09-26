import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FLASHCARDS, type Flashcard } from '../content/flashcards';
import { MODULE_ORDER, MODULES, topicName, type ModuleId } from '../content/types';
import { Icon } from '../components/Icon';
import { Rich } from '../lib/rich';
import { href, navigate } from '../lib/router';
import { markActive, setState, useStore, type CardState } from '../lib/store';

const DAY = 86_400_000;
const INTERVAL_DAYS = [0, 1, 3, 7, 14, 30];
const NEW_PER_SESSION = 20;

type Grade = 'again' | 'hard' | 'good' | 'easy';

function schedule(prev: CardState | undefined, grade: Grade, now: number): CardState {
  const box = prev?.box ?? 0;
  const next = grade === 'again' ? 0 : grade === 'hard' ? Math.max(1, box) : grade === 'good' ? Math.min(5, box + 1) : Math.min(5, box + 2);
  return {
    box: next,
    due: now + (grade === 'again' ? 60_000 : INTERVAL_DAYS[next] * DAY),
    seen: (prev?.seen ?? 0) + 1,
    lapses: (prev?.lapses ?? 0) + (grade === 'again' ? 1 : 0),
  };
}

function isDue(c: CardState | undefined, now: number) {
  return !!c && c.due <= now;
}

export function FlashcardsPage({ deck }: { deck?: string }) {
  const cards = useStore((s) => s.cards);
  const [session, setSession] = useState<string[] | null>(null);
  const [browse, setBrowse] = useState(false);
  const selected: ModuleId | 'all' = deck === 'M1' || deck === 'M2' || deck === 'PH' ? deck : 'all';
  const pool = FLASHCARDS.filter((c) => selected === 'all' || c.deck === selected);
  const now = Date.now();
  const due = pool.filter((c) => isDue(cards[c.id], now));
  const fresh = pool.filter((c) => !cards[c.id]);
  const mastered = pool.filter((c) => (cards[c.id]?.box ?? 0) >= 4);

  const start = () => {
    const queue = [...due.sort((a, b) => (cards[a.id]?.due ?? 0) - (cards[b.id]?.due ?? 0)), ...fresh.slice(0, NEW_PER_SESSION)].map((c) => c.id);
    setSession(queue.length ? queue : pool.map((c) => c.id).slice(0, 20));
  };

  if (session) return <Session ids={session} onExit={() => setSession(null)} />;

  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">Flashcards · spaced repetition</span>
        <h1>Flashcards</h1>
        <p className="lede">
          {FLASHCARDS.length} cards covering the exact values, formulas and facts the ESAT expects you to know without a formula sheet. Cards you find
          hard come back sooner; cards you know are spaced out to 30 days.
        </p>
      </header>

      <div className="seg" role="group" aria-label="Deck">
        <button type="button" aria-pressed={selected === 'all'} onClick={() => navigate('cards')}>
          All decks
        </button>
        {MODULE_ORDER.map((m) => (
          <button key={m} type="button" aria-pressed={selected === m} onClick={() => navigate('cards', m)}>
            {MODULES[m].name}
          </button>
        ))}
      </div>

      <section className="grid grid-4">
        <div className="card stat">
          <span className="stat-num">{due.length}</span>
          <span className="stat-label">due for review</span>
        </div>
        <div className="card stat">
          <span className="stat-num">{fresh.length}</span>
          <span className="stat-label">not yet seen</span>
        </div>
        <div className="card stat">
          <span className="stat-num">{mastered.length}</span>
          <span className="stat-label">well known (box 4+)</span>
        </div>
        <div className="card stat">
          <span className="stat-num">{pool.length}</span>
          <span className="stat-label">cards in deck</span>
        </div>
      </section>

      <div className="row">
        <button type="button" className="btn btn-primary btn-lg" onClick={start}>
          <Icon name="play" /> {due.length ? `Review ${due.length} due` : fresh.length ? `Learn ${Math.min(NEW_PER_SESSION, fresh.length)} new cards` : 'Practise this deck'}
          {due.length > 0 && fresh.length > 0 ? ` + ${Math.min(NEW_PER_SESSION, fresh.length)} new` : ''}
        </button>
        <button type="button" className="btn" onClick={() => setBrowse((b) => !b)}>
          <Icon name="list" /> {browse ? 'Hide card list' : 'Browse all cards'}
        </button>
      </div>

      {browse && (
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Topic</th>
                <th>Front</th>
                <th>Back</th>
                <th className="num">Box</th>
              </tr>
            </thead>
            <tbody>
              {pool.map((c) => (
                <tr key={c.id}>
                  <td>
                    <span className="chip chip-mono" title={topicName(c.topic)}>
                      {c.topic}
                    </span>
                  </td>
                  <td>
                    <Rich text={c.front} />
                  </td>
                  <td>
                    <Rich text={c.back} />
                  </td>
                  <td className="num mono">{cards[c.id]?.box ?? '–'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Session({ ids, onExit }: { ids: string[]; onExit: () => void }) {
  const byId = useMemo(() => new Map(FLASHCARDS.map((c) => [c.id, c])), []);
  const [queue, setQueue] = useState(ids);
  const [flipped, setFlipped] = useState(false);
  const [stats, setStats] = useState({ reviewed: 0, again: 0 });
  const card: Flashcard | undefined = byId.get(queue[0]);

  const grade = useCallback(
    (g: Grade) => {
      if (!card) return;
      const now = Date.now();
      setState((s) => ({ ...s, cards: { ...s.cards, [card.id]: schedule(s.cards[card.id], g, now) } }));
      setStats((st) => ({ reviewed: st.reviewed + 1, again: st.again + (g === 'again' ? 1 : 0) }));
      setQueue((q) => (g === 'again' ? [...q.slice(1), q[0]] : q.slice(1)));
      setFlipped(false);
      markActive();
    },
    [card],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (flipped && ['1', '2', '3', '4'].includes(e.key)) {
        grade((['again', 'hard', 'good', 'easy'] as Grade[])[Number(e.key) - 1]);
      } else if (e.key === 'Escape') onExit();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [flipped, grade, onExit]);

  if (!card) {
    return (
      <div className="page page-narrow">
        <div className="card stack-l" style={{ textAlign: 'center' }}>
          <h2>Session complete</h2>
          <p className="muted">
            {stats.reviewed} review{stats.reviewed === 1 ? '' : 's'} · {stats.again} marked "again". Cards are rescheduled automatically.
          </p>
          <div className="row" style={{ justifyContent: 'center' }}>
            <button type="button" className="btn btn-primary" onClick={onExit}>
              Back to decks
            </button>
            <a className="btn" href={href('drills')}>
              <Icon name="bolt" /> Try a speed drill
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page page-narrow">
      <div className="row-between">
        <button type="button" className="btn btn-ghost btn-sm" onClick={onExit}>
          <Icon name="left" /> End session
        </button>
        <span className="muted mono">{queue.length} left</span>
      </div>
      <div
        className="flashcard"
        data-flipped={flipped}
        onClick={() => setFlipped((f) => !f)}
        role="button"
        tabIndex={0}
        aria-label={flipped ? 'Card back. Press space to flip.' : 'Card front. Press space to reveal the answer.'}
      >
        <div className="flashcard-inner">
          <div className="flashcard-face front" aria-hidden={flipped}>
            <span className="eyebrow" style={{ textAlign: 'center' }}>
              {MODULES[card.deck].short} · {topicName(card.topic)}
            </span>
            <div className="fc-text">
              <Rich text={card.front} />
            </div>
            <span className="muted" style={{ textAlign: 'center', fontSize: '0.84rem' }}>
              Tap or press <span className="kbd">Space</span> to reveal
            </span>
          </div>
          <div className="flashcard-face back" aria-hidden={!flipped}>
            <span className="eyebrow" style={{ textAlign: 'center' }}>
              Answer
            </span>
            <div className="fc-text">
              <Rich text={card.back} />
            </div>
          </div>
        </div>
      </div>
      {flipped ? (
        <div className="grid grid-4" style={{ gap: 8 }}>
          {(
            [
              ['again', 'Again', '1'],
              ['hard', 'Hard', '2'],
              ['good', 'Good', '3'],
              ['easy', 'Easy', '4'],
            ] as [Grade, string, string][]
          ).map(([g, label, key]) => (
            <button key={g} type="button" className={g === 'good' ? 'btn btn-primary' : g === 'again' ? 'btn btn-danger' : 'btn'} onClick={() => grade(g)}>
              {label} <span className="kbd">{key}</span>
            </button>
          ))}
        </div>
      ) : (
        <button type="button" className="btn btn-primary btn-lg" onClick={() => setFlipped(true)}>
          Show answer
        </button>
      )}
    </div>
  );
}
