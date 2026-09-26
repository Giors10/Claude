import React, { useLayoutEffect, useRef, useState } from 'react';
import type { ModuleId } from '../content/types';
import { OCT_2025_DISTRIBUTION, SCORE_BINS } from '../lib/distributions';
import type { GradedQuestion } from '../lib/exam';

/**
 * Charts are drawn at the width they are displayed at (one SVG unit per CSS
 * pixel), so labels stay legible in narrow cards and on phones instead of
 * being scaled down with the drawing.
 */
function useChartWidth(fallback = 640, min = 280, max = 1000): [React.RefObject<HTMLDivElement>, number] {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(fallback);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const cw = Math.round(el.getBoundingClientRect().width);
      if (cw > 0) setW((prev) => (Math.abs(prev - cw) >= 2 ? cw : prev));
    };
    update();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, Math.max(min, Math.min(max, w))];
}

/* ---------------------------------------------------------------------- */
/* The 1.0–9.0 scale with the official distribution behind it             */
/* ---------------------------------------------------------------------- */
export function ScoreRuler({
  module,
  score,
  low,
  high,
  label = 'You',
  compact,
}: {
  module: ModuleId;
  score?: number;
  low?: number;
  high?: number;
  label?: string;
  compact?: boolean;
}) {
  const [ref, W] = useChartWidth();
  const H = compact ? 92 : 128;
  const L = 22;
  const R = W - 22;
  const axisY = H - 30;
  const sx = (v: number) => L + ((v - 1) / 8) * (R - L);
  const dist = OCT_2025_DISTRIBUTION[module];
  const maxP = Math.max(...dist);
  const barMax = axisY - (compact ? 26 : 42);
  const bw = ((R - L) / 16) * 0.72;
  const markerY = axisY;
  return (
    <div className="ruler" ref={ref}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`ESAT scale from 1.0 to 9.0${score !== undefined ? `, ${label.toLowerCase()} at ${score.toFixed(1)}` : ''}, with the October 2025 distribution of candidates' scores`}>
        {SCORE_BINS.map((b, i) => {
          const h = (dist[i] / maxP) * barMax;
          const hi = score !== undefined && b <= score + 1e-9;
          return <rect key={b} x={sx(b) - bw / 2} y={axisY - h} width={bw} height={h} rx={2} className={hi ? 'r-bar-hi' : 'r-bar'} />;
        })}
        {low !== undefined && high !== undefined && <rect x={sx(low)} y={axisY - 5} width={Math.max(2, sx(high) - sx(low))} height={10} rx={5} className="r-range" />}
        <line x1={L} x2={R} y1={axisY} y2={axisY} className="r-axis" />
        {Array.from({ length: 17 }, (_, i) => 1 + i * 0.5).map((v) => (
          <line key={v} x1={sx(v)} x2={sx(v)} y1={axisY} y2={axisY + (Number.isInteger(v) ? 7 : 4)} className={Number.isInteger(v) ? 'r-tick' : 'r-minor'} />
        ))}
        {Array.from({ length: 9 }, (_, i) => i + 1).map((v) => (
          <text key={v} x={sx(v)} y={axisY + 20} textAnchor="middle" className="r-num">
            {v.toFixed(1)}
          </text>
        ))}
        {[
          [4.5, 'median'],
          [7, 'top 10%'],
        ].map(([v, t]) => (
          <g key={String(t)}>
            <line x1={sx(Number(v))} x2={sx(Number(v))} y1={compact ? 6 : 12} y2={axisY} className="r-anchor" />
            {!compact && (
              <text x={sx(Number(v)) + 4} y={20} className="r-anchor-label">
                {t} {Number(v).toFixed(1)}
              </text>
            )}
          </g>
        ))}
        {score !== undefined && (
          <g>
            <circle cx={sx(score)} cy={markerY} r={7.5} className="r-marker" />
            {!compact && (
              <text x={Math.min(R - 30, Math.max(L + 30, sx(score)))} y={axisY - barMax - 4 < 26 ? 38 : axisY - barMax - 6} textAnchor="middle" className="r-marker-label">
                {label} {score.toFixed(1)}
              </text>
            )}
          </g>
        )}
      </svg>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Pacing: cumulative time against the 89 s per question pace line        */
/* ---------------------------------------------------------------------- */
export function PacingChart({ items, limit }: { items: GradedQuestion[]; limit: number }) {
  const [ref, W] = useChartWidth();
  const H = 230;
  const L = 44;
  const R = W - 14;
  const T = 14;
  const B = H - 34;
  const n = items.length;
  const cum: number[] = [];
  items.reduce((acc, it) => {
    const v = acc + it.ans.time;
    cum.push(v);
    return v;
  }, 0);
  const maxT = Math.max(limit, cum[cum.length - 1] ?? 0, 60);
  const sx = (i: number) => L + (i / n) * (R - L);
  const sy = (t: number) => B - (t / maxT) * (B - T);
  const minutes = Math.ceil(maxT / 60);
  const step = minutes > 30 ? 10 : 5;
  const path = cum.map((t, i) => `${i === 0 ? 'M' : 'L'}${sx(i + 1).toFixed(1)} ${sy(t).toFixed(1)}`).join(' ');
  return (
    <div className="chart" ref={ref}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Cumulative time spent against question number, compared with an even pace">
        {Array.from({ length: Math.floor(minutes / step) + 1 }, (_, k) => k * step).map((m) => (
          <g key={m}>
            <line x1={L} x2={R} y1={sy(m * 60)} y2={sy(m * 60)} className="c-grid" />
            <text x={L - 8} y={sy(m * 60) + 3.5} textAnchor="end" className="c-label">
              {m}m
            </text>
          </g>
        ))}
        {[1, 5, 10, 15, 20, 25, n]
          .filter((v, i, a) => v <= n && a.indexOf(v) === i && (v === n || sx(n) - sx(v) >= 34))
          .map((i) => (
          <text key={i} x={sx(i)} y={B + 18} textAnchor="middle" className="c-label">
            Q{i}
          </text>
        ))}
        <line x1={sx(0)} y1={sy(0)} x2={sx(n)} y2={sy(limit)} className="c-line-ideal" />
        <path d={path} className="c-line" />
        {cum.map((t, i) => (
          <circle
            key={i}
            cx={sx(i + 1)}
            cy={sy(t)}
            r={3.6}
            className={!items[i].answered ? 'c-dot-skip' : items[i].correct ? 'c-dot-good' : 'c-dot-bad'}
          >
            <title>{`Q${i + 1}: ${Math.round(items[i].ans.time)}s (${!items[i].answered ? 'unanswered' : items[i].correct ? 'correct' : 'wrong'})`}</title>
          </circle>
        ))}
      </svg>
      <div className="legend">
        <span>
          <i style={{ background: 'var(--good)' }} />
          correct
        </span>
        <span>
          <i style={{ background: 'var(--bad)' }} />
          wrong
        </span>
        <span>
          <i style={{ background: 'var(--surface)', border: '1.5px solid var(--faint)' }} />
          unanswered
        </span>
        <span>
          <i style={{ background: 'transparent', borderTop: '2px dashed var(--faint)', borderRadius: 0, height: 0, width: 16 }} />
          even pace (89 s per question)
        </span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Time per question against the target time                              */
/* ---------------------------------------------------------------------- */
export function TimeBars({ items }: { items: GradedQuestion[] }) {
  const [ref, W] = useChartWidth();
  const H = 180;
  const L = 36;
  const R = W - 8;
  const T = 10;
  const B = H - 26;
  const n = items.length;
  const maxT = Math.max(180, ...items.map((i) => i.ans.time), ...items.map((i) => i.q.time));
  const bw = ((R - L) / n) * 0.7;
  const sx = (i: number) => L + ((i + 0.5) / n) * (R - L);
  const sy = (t: number) => B - (t / maxT) * (B - T);
  return (
    <div className="chart" ref={ref}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Seconds spent on each question compared with its target time">
        {[0, 60, 120, 180, 240, 300, 360, 420].filter((t) => t <= maxT).map((t) => (
          <g key={t}>
            <line x1={L} x2={R} y1={sy(t)} y2={sy(t)} className="c-grid" />
            <text x={L - 6} y={sy(t) + 3.5} textAnchor="end" className="c-label">
              {t / 60}m
            </text>
          </g>
        ))}
        {items.map((it, i) => (
          <g key={it.q.id}>
            <rect
              x={sx(i) - bw / 2}
              y={sy(it.ans.time)}
              width={bw}
              height={Math.max(0, B - sy(it.ans.time))}
              rx={2}
              className={it.ans.time > it.q.time * 1.5 ? 'c-bar c-bar-over' : 'c-bar'}
            >
              <title>{`Q${i + 1}: ${Math.round(it.ans.time)}s (target ${it.q.time}s)`}</title>
            </rect>
            <line x1={sx(i) - bw / 2 - 1} x2={sx(i) + bw / 2 + 1} y1={sy(it.q.time)} y2={sy(it.q.time)} stroke="var(--ink)" strokeWidth={1.4} />
            {(i === 0 || (i + 1) % 5 === 0) && (
              <text x={sx(i)} y={B + 16} textAnchor="middle" className="c-label">
                {i + 1}
              </text>
            )}
          </g>
        ))}
      </svg>
      <div className="legend">
        <span>
          <i style={{ background: 'var(--accent)' }} />
          your time
        </span>
        <span>
          <i style={{ background: 'var(--glow)' }} />
          more than 1.5× target
        </span>
        <span>
          <i style={{ background: 'var(--ink)', height: 2, borderRadius: 0 }} />
          target time
        </span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Score trend across attempts                                            */
/* ---------------------------------------------------------------------- */
export function TrendChart({ series }: { series: { label: string; color: string; points: { x: number; y: number; title: string }[] }[] }) {
  const [ref, W] = useChartWidth();
  const H = 220;
  const L = 34;
  const R = W - 12;
  const T = 12;
  const B = H - 28;
  const n = Math.max(2, ...series.map((s) => s.points.length));
  const sx = (i: number) => L + (i / (n - 1)) * (R - L);
  const sy = (v: number) => B - ((v - 1) / 8) * (B - T);
  return (
    <div className="chart" ref={ref}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Estimated ESAT score over successive attempts">
        {[1, 3, 4.5, 5, 7, 9].map((v) => (
          <g key={v}>
            <line x1={L} x2={R} y1={sy(v)} y2={sy(v)} className="c-grid" strokeDasharray={v === 4.5 || v === 7 ? '4 4' : undefined} />
            <text x={L - 6} y={sy(v) + 3.5} textAnchor="end" className="c-label">
              {v.toFixed(1)}
            </text>
          </g>
        ))}
        {series.map((s) => (
          <g key={s.label}>
            <path
              d={s.points.map((p, i) => `${i === 0 ? 'M' : 'L'}${sx(i).toFixed(1)} ${sy(p.y).toFixed(1)}`).join(' ')}
              fill="none"
              stroke={s.color}
              strokeWidth={2.2}
              strokeLinejoin="round"
            />
            {s.points.map((p, i) => (
              <circle key={i} cx={sx(i)} cy={sy(p.y)} r={4.5} fill="var(--surface)" stroke={s.color} strokeWidth={2}>
                <title>{p.title}</title>
              </circle>
            ))}
          </g>
        ))}
      </svg>
      <div className="legend">
        {series.map((s) => (
          <span key={s.label}>
            <i style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Horizontal accuracy bars                                               */
/* ---------------------------------------------------------------------- */
export function AccuracyBars({ rows }: { rows: { key: string; label: string; correct: number; total: number; onClick?: () => void }[] }) {
  return (
    <div className="stack" style={{ gap: 8 }}>
      {rows.map((r) => {
        const p = r.total ? r.correct / r.total : 0;
        const cls = p >= 0.75 ? 'bar-good' : p >= 0.45 ? '' : p > 0 ? 'bar-warn' : 'bar-bad';
        return (
          <div key={r.key} className="row" style={{ gap: 12, flexWrap: 'nowrap' }}>
            <button type="button" className="btn btn-ghost btn-sm" style={{ width: 'clamp(128px, 40%, 230px)', justifyContent: 'flex-start', flex: 'none', whiteSpace: 'normal', textAlign: 'left' }} onClick={r.onClick} disabled={!r.onClick}>
              <span className="mono" style={{ color: 'var(--muted)', width: 38, flex: 'none' }}>
                {r.key}
              </span>
              {r.label}
            </button>
            <div className={'bar ' + cls} style={{ flex: 1 }} aria-hidden="true">
              <span style={{ width: `${Math.max(3, p * 100)}%` }} />
            </div>
            <span className="mono" style={{ width: 54, textAlign: 'right', flex: 'none' }}>
              {r.correct}/{r.total}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function Sparkline({ values, width = 120, height = 32 }: { values: number[]; width?: number; height?: number }) {
  if (values.length < 2) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const sx = (i: number) => 2 + (i / (values.length - 1)) * (width - 4);
  const sy = (v: number) => height - 3 - ((v - min) / (max - min || 1)) * (height - 6);
  const d = values.map((v, i) => `${i ? 'L' : 'M'}${sx(i).toFixed(1)} ${sy(v).toFixed(1)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} aria-hidden="true">
      <path d={d} fill="none" stroke="var(--accent)" strokeWidth={2} strokeLinejoin="round" />
      <circle cx={sx(values.length - 1)} cy={sy(values[values.length - 1])} r={3} fill="var(--accent)" />
    </svg>
  );
}
