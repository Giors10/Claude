import React, { useMemo, useState } from 'react';
import { LEARN } from '../content/learn';
import { MODULE_ORDER, MODULES } from '../content/types';
import { Icon } from '../components/Icon';
import { canPrint } from '../lib/platform';
import { RichInline } from '../lib/rich';
import { href } from '../lib/router';

const t = String.raw;

export const CONSTANTS: { name: string; tex: string }[] = [
  { name: 'Gravitational field strength (ESAT value)', tex: t`g = 10\ \text{N kg}^{-1}` },
  { name: 'Speed of light in a vacuum', tex: t`c = 3.0 \times 10^8\ \text{m s}^{-1}` },
  { name: 'Density of water', tex: t`1000\ \text{kg m}^{-3} = 1\ \text{g cm}^{-3}` },
  { name: 'Range of human hearing', tex: t`20\ \text{Hz} \text{ to } 20\ \text{kHz}` },
  { name: 'UK mains frequency', tex: t`50\ \text{Hz}` },
  { name: 'SI prefixes', tex: t`\text{n}\,10^{-9},\ \mu\,10^{-6},\ \text{m}\,10^{-3},\ \text{c}\,10^{-2},\ \text{k}\,10^{3},\ \text{M}\,10^{6},\ \text{G}\,10^{9}` },
];

export function FormulasPage() {
  const [q, setQ] = useState('');
  const needle = q.trim().toLowerCase();
  const topics = useMemo(
    () =>
      LEARN.map((tp) => ({
        ...tp,
        formulas: tp.formulas.filter((f) => !needle || (tp.title + ' ' + tp.code + ' ' + f.name + ' ' + f.tex).toLowerCase().includes(needle)),
      })).filter((tp) => tp.formulas.length > 0),
    [needle],
  );

  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">Formula sheet · everything you must memorise</span>
        <h1>Formula sheet</h1>
        <p className="lede">
          The ESAT gives no formula booklet (only a few mensuration formulas are supplied when needed), so every formula below must be memorised.
        </p>
      </header>

      <div className="row">
        <div className="field" style={{ flex: 1, minWidth: 220 }}>
          <label htmlFor="formula-search" className="visually-hidden">
            Search formulas
          </label>
          <input id="formula-search" className="input" placeholder="Search, e.g. sector, momentum, discriminant" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        {canPrint() && (
          <button type="button" className="btn no-print" onClick={() => window.print()}>
            <Icon name="download" /> Print or save as PDF
          </button>
        )}
      </div>

      {!needle && (
        <section className="formula-box">
          <h4>Constants and data</h4>
          <div className="formula-rows">
            {CONSTANTS.map((c) => (
              <div key={c.name} className="formula-row">
                <span className="fname">
                  <RichInline text={c.name} />
                </span>
                <span className="fexpr">
                  <RichInline text={`$${c.tex}$`} />
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {MODULE_ORDER.map((m) => {
        const list = topics.filter((tp) => tp.module === m);
        if (!list.length) return null;
        return (
          <section key={m} className="section">
            <h2>{MODULES[m].name}</h2>
            <div className="grid grid-2">
              {list.map((tp) => (
                <div key={tp.code} className="formula-box">
                  <h4>
                    <a href={href('learn', tp.code)} style={{ color: 'inherit', textDecoration: 'none' }}>
                      <span className="mono muted" style={{ marginRight: 8 }}>
                        {tp.code}
                      </span>
                      {tp.title}
                    </a>
                  </h4>
                  <div className="formula-rows">
                    {tp.formulas.map((f) => (
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
                </div>
              ))}
            </div>
          </section>
        );
      })}
      {topics.length === 0 && <div className="empty">No formulas match “{q}”.</div>}
    </div>
  );
}
