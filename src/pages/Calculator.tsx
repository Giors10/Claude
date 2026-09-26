import React, { useMemo, useState } from 'react';
import { PAPER } from '../content/paper';
import { MODULE_ORDER, MODULES, type ModuleId } from '../content/types';
import { ScoreRuler } from '../components/Charts';
import { percentileOf, scoreBand } from '../lib/distributions';
import { ordinal } from '../lib/format';
import { STANDARD_ITEMS, conversionTable, itemDifficulty, rawNeeded, scoreModule } from '../lib/rasch';
import { href } from '../lib/router';

type PaperKind = 'standard' | 'crucible';

export function CalculatorPage() {
  const [mod, setMod] = useState<ModuleId>('M1');
  const [kind, setKind] = useState<PaperKind>('standard');
  const [raw, setRaw] = useState(16);
  const [target, setTarget] = useState(7);

  const items = useMemo(() => (kind === 'standard' ? STANDARD_ITEMS : PAPER[mod].map(itemDifficulty)), [kind, mod]);
  const score = scoreModule(raw, items);
  const table = useMemo(() => conversionTable(items), [items]);
  const band = scoreBand(score.scaled);
  const needStd = rawNeeded(target, STANDARD_ITEMS);
  const needCru = rawNeeded(target, PAPER[mod].map(itemDifficulty));

  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">Score calculator</span>
        <h1>Raw mark to ESAT score</h1>
        <p className="lede">
          Convert a raw mark out of 27 into an estimated 1.0–9.0 score using the Rasch method, for either a typical ESAT paper or this site's harder
          Crucible paper. Percentiles come from UAT-UK's published October 2025 distributions.
        </p>
      </header>

      <section className="card stack-l">
        <div className="grid grid-2">
          <div className="stack">
            <span className="field-label">Module</span>
            <div className="seg" role="group" aria-label="Module">
              {MODULE_ORDER.map((m) => (
                <button key={m} type="button" aria-pressed={mod === m} onClick={() => setMod(m)}>
                  {MODULES[m].name}
                </button>
              ))}
            </div>
          </div>
          <div className="stack">
            <span className="field-label">Paper difficulty</span>
            <div className="seg" role="group" aria-label="Paper difficulty">
              <button type="button" aria-pressed={kind === 'standard'} onClick={() => setKind('standard')}>
                Typical ESAT paper
              </button>
              <button type="button" aria-pressed={kind === 'crucible'} onClick={() => setKind('crucible')}>
                Crucible paper
              </button>
            </div>
          </div>
        </div>

        <div className="field">
          <label htmlFor="raw-mark">
            Raw mark: <strong className="mono">{raw}</strong> / 27
          </label>
          <input id="raw-mark" type="range" min={0} max={27} value={raw} onChange={(e) => setRaw(Number(e.target.value))} style={{ accentColor: 'var(--accent)' }} />
        </div>

        <div className="grid grid-4">
          <div className="stat">
            <span className="big-score">{score.scaled.toFixed(1)}</span>
            <span className="stat-label">estimated score</span>
          </div>
          <div className="stat">
            <span className="stat-num">
              {score.low.toFixed(1)}–{score.high.toFixed(1)}
            </span>
            <span className="stat-label">likely range</span>
          </div>
          <div className="stat">
            <span className="stat-num">{ordinal(Math.max(1, Math.min(99, Math.round(percentileOf(mod, score.scaled)))))}</span>
            <span className="stat-label">percentile, October 2025</span>
          </div>
          <div className="stat">
            <span className="stat-num" style={{ fontSize: '1.2rem' }}>
              {band.label}
            </span>
            <span className="stat-label">band</span>
          </div>
        </div>
        <ScoreRuler module={mod} score={score.scaled} low={score.low} high={score.high} />
      </section>

      <section className="grid grid-2">
        <div className="card stack">
          <h3>What do I need?</h3>
          <div className="field">
            <label htmlFor="target">
              Target score: <strong className="mono">{target.toFixed(1)}</strong>
            </label>
            <input id="target" type="range" min={3} max={9} step={0.1} value={target} onChange={(e) => setTarget(Number(e.target.value))} style={{ accentColor: 'var(--accent)' }} />
          </div>
          <p>
            About <strong>{needStd ?? 'more than 27'}/27</strong> on a typical ESAT {MODULES[mod].name} paper, or{' '}
            <strong>{needCru ?? 'more than 27'}/27</strong> on the Crucible {MODULES[mod].name} paper.
          </p>
          <p className="muted" style={{ fontSize: '0.86rem' }}>
            Real papers vary in difficulty from sitting to sitting, and UAT-UK does not publish conversion tables, so treat these as guides of about
            ±1 mark.
          </p>
        </div>
        <div className="card stack">
          <h3>Conversion table</h3>
          <p className="muted" style={{ fontSize: '0.84rem', margin: 0 }}>
            Each cell shows a raw mark out of 27 and the score it converts to. Select one to see it on the scale.
          </p>
          <ol className="conv-grid" aria-label="Raw mark to score conversion">
            {table.map((v, r) => (
              <li key={r}>
                <button type="button" aria-pressed={r === raw} onClick={() => setRaw(r)} aria-label={`${r} out of 27 converts to ${v.toFixed(1)}`}>
                  <span className="conv-raw">{r}</span>
                  <span className="conv-score">{v.toFixed(1)}</span>
                </button>
              </li>
            ))}
          </ol>
          <a href={href('about')} style={{ fontSize: '0.88rem' }}>
            How these conversions are calculated
          </a>
        </div>
      </section>
    </div>
  );
}
