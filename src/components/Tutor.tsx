import React, { useEffect, useRef, useState } from 'react';
import type { Question } from '../content/types';
import { Rich } from '../lib/rich';
import { QUICK_PROMPTS, firstTurn, getSampler, type Sampler, type Turn } from '../lib/tutor';
import { Icon } from './Icon';

interface Msg {
  role: 'user' | 'assistant';
  shown: string;
  sent: string;
}

/** AI tutor panel. Renders nothing unless the viewer offers the `sample` capability. */
export function Tutor({ q, chosen }: { q: Question; chosen: number | null }) {
  const [sampler, setSampler] = useState<Sampler | null>(null);
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let live = true;
    getSampler().then((s) => {
      if (!live) return;
      setSampler(() => s);
      setChecked(true);
    });
    return () => {
      live = false;
      abortRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    setMsgs([]);
    setError(null);
    abortRef.current?.abort();
  }, [q.id]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [msgs]);

  if (!checked || !sampler || disabled) return null;

  const ask = async (shown: string) => {
    if (busy || !shown.trim()) return;
    setError(null);
    const sent = msgs.length === 0 ? firstTurn(q, chosen, shown) : shown;
    const history: Msg[] = [...msgs, { role: 'user', shown, sent }];
    setMsgs([...history, { role: 'assistant', shown: '', sent: '' }]);
    setDraft('');
    setBusy(true);
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    const turns: Turn[] = history.map((m) => ({ role: m.role, content: m.sent }));
    try {
      const res = await sampler(turns, {
        signal: ctrl.signal,
        cache: false,
        onText: ({ text }) => {
          setMsgs((cur) => {
            const next = cur.slice();
            next[next.length - 1] = { role: 'assistant', shown: text, sent: text };
            return next;
          });
        },
      });
      setMsgs((cur) => {
        const next = cur.slice();
        next[next.length - 1] = { role: 'assistant', shown: res.text, sent: res.text };
        return next;
      });
    } catch (e) {
      const code = (e as { code?: string })?.code;
      if (code === 'not_granted') {
        setDisabled(true);
        return;
      }
      setMsgs((cur) => cur.slice(0, -1));
      setError(code === 'rate_limited' ? 'The tutor is busy right now. Try again in a minute.' : code === 'cancelled' ? null : 'The tutor could not answer. Try again.');
    } finally {
      setBusy(false);
    }
  };

  if (!open) {
    return (
      <button type="button" className="btn" onClick={() => setOpen(true)}>
        <Icon name="sparkle" /> Ask the AI tutor about this question
      </button>
    );
  }

  return (
    <section className="tutor" aria-label="AI tutor">
      <div className="tutor-head">
        <Icon name="sparkle" size={18} />
        <strong>AI tutor</strong>
        <span className="muted" style={{ fontSize: '0.82rem' }}>
          Uses Claude. It knows the verified solution to this question.
        </span>
        <span style={{ flex: 1 }} />
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setOpen(false)}>
          Close
        </button>
      </div>
      <div className="tutor-log" ref={logRef} aria-live="polite">
        {msgs.length === 0 && <p className="muted">Pick a prompt or ask your own question.</p>}
        {msgs.map((m, i) => (
          <div key={i} className={'tutor-msg ' + m.role}>
            {m.role === 'assistant' ? m.shown ? <Rich text={m.shown} /> : <span className="muted">Thinking…</span> : m.shown}
          </div>
        ))}
        {error && <p className="muted">{error}</p>}
      </div>
      <div className="tutor-input">
        {msgs.length === 0 && (
          <div className="row">
            {QUICK_PROMPTS.map((p) => (
              <button key={p.label} type="button" className="chip" onClick={() => ask(p.text(chosen, q))} disabled={busy}>
                {p.label}
              </button>
            ))}
          </div>
        )}
        <form
          className="row"
          style={{ width: '100%' }}
          onSubmit={(e) => {
            e.preventDefault();
            ask(draft);
          }}
        >
          <label htmlFor={`tutor-${q.id}`} className="visually-hidden">
            Ask the tutor
          </label>
          <input
            id={`tutor-${q.id}`}
            className="input"
            style={{ flex: 1, minWidth: 180 }}
            placeholder="Ask about this question…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          {busy ? (
            <button type="button" className="btn" onClick={() => abortRef.current?.abort()}>
              Stop
            </button>
          ) : (
            <button type="submit" className="btn btn-primary" disabled={!draft.trim()}>
              Ask
            </button>
          )}
        </form>
      </div>
    </section>
  );
}
