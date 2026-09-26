import React from 'react';
import { ScoreRuler } from '../components/Charts';
import { DISTRIBUTION_SOURCE } from '../lib/distributions';
import { DIFFICULTY_LOGIT, SLOPE, STANDARD_ITEMS, THETA_SD, conversionTable } from '../lib/rasch';
import { Rich } from '../lib/rich';
import { href } from '../lib/router';

const t = String.raw;

export function AboutPage() {
  const std = conversionTable(STANDARD_ITEMS);
  return (
    <div className="page page-narrow">
      <header className="page-head">
        <span className="eyebrow">About</span>
        <h1>About ESAT Crucible</h1>
        <p className="lede">
          A free, independent preparation site for the Engineering and Science Admissions Test, built around one deliberately hard predicted paper
          covering Mathematics 1, Mathematics 2 and Physics.
        </p>
      </header>

      <section className="card stack">
        <h2 style={{ fontSize: '1.3rem' }}>How the questions were written and checked</h2>
        <Rich
          text={t`Every question was written from scratch to the **2026 ESAT content specification** (for the October 2026 and January 2027 sittings), and uses only the knowledge listed for its module. For example, Mathematics 1 never needs the sine or cosine rule, Mathematics 2 calculus only uses powers of $x$, and Physics force calculations are one-dimensional, exactly as the specification states.

Each answer was checked three independent ways before publication:

1. **Worked by hand** when the question and its full solution were written, including an explanation of why each tempting wrong option is wrong.
2. **Recomputed by computer algebra** (exact arithmetic in sympy), confirming that exactly one option equals the correct value and that it is the option marked correct.
3. **Re-derived by a different method**: brute-force enumeration, numerical integration, a physical simulation, Monte Carlo sampling or a geometric construction, depending on the question.

Every formula is rendered with KaTeX and checked in strict mode, and every diagram is drawn from the question's actual numbers (for example, the circle-theorem figure places each point at its true angle) and then visually reviewed.`}
        />
      </section>

      <section className="card stack">
        <h2 style={{ fontSize: '1.3rem' }}>How scores are estimated</h2>
        <Rich
          text={t`The real ESAT uses the **Rasch model** from item response theory. Each module is scored separately on a scale from 1.0 to 9.0, with the median October candidate at **4.5** and the 90th percentile at **7.0**; scores are capped at 1.0 and 9.0. UAT-UK does not publish conversion tables, because different questions have different difficulties.

This site follows the same approach:

- Each question has a difficulty on the Rasch (logit) scale, set from its rating: ${Object.entries(DIFFICULTY_LOGIT)
            .map(([k, v]) => `rating ${k} → ${v.toFixed(1)}`)
            .join(', ')}.
- Your ability $\theta$ is the maximum-likelihood estimate given your raw mark. In the Rasch model the raw mark is a sufficient statistic, so, as in the real test, it does not matter *which* questions you got right.
- $\theta$ is mapped linearly onto the reported scale with $\text{score} = 4.5 + ${SLOPE.toFixed(3)}\,\theta$, which puts the 90th percentile of a population with standard deviation ${THETA_SD} logits at exactly 7.0.
- The constants were calibrated so that a **typical** ESAT module reproduces widely reported conversions: ${[12, 17, 20, 25].map((r) => `${r}/27 → ${std[r].toFixed(1)}`).join(', ')}.
- The **likely range** shown with each score is ±1 standard error of $\theta$.
- **Percentiles** use UAT-UK's published October 2025 score distributions for each module.

Because the Crucible paper is harder than a real ESAT paper, the same raw mark converts to a higher score. The results page also shows the raw mark you would expect on a typical paper at the same ability.

**Limitations.** Real question difficulties are measured from thousands of candidates; these are expert estimates. Treat every score as an estimate of about ±0.5, and use it to track your own progress rather than to predict an offer.`}
        />
        <ScoreRuler module="M1" />
        <p className="muted" style={{ fontSize: '0.82rem' }}>
          Bars: the distribution of Mathematics 1 scores in October 2025. Source: {DISTRIBUTION_SOURCE}.
        </p>
      </section>

      <section className="card stack">
        <h2 style={{ fontSize: '1.3rem' }}>Sources</h2>
        <ul className="stack" style={{ margin: 0, paddingLeft: '1.2em' }}>
          <li>UAT-UK, ESAT Content Specification for assessment in October 2026 and January 2027.</li>
          <li>{DISTRIBUTION_SOURCE}.</li>
          <li>UAT-UK and University of Cambridge information on test dates, format and module requirements.</li>
        </ul>
        <p className="muted" style={{ fontSize: '0.88rem' }}>
          Free official preparation materials, including practice papers, are on the{' '}
          <a href="https://esat-tmua.ac.uk/esat-preparation-materials/" target="_blank" rel="noreferrer">
            UAT-UK website
          </a>
          .
        </p>
      </section>

      <section className="card stack">
        <h2 style={{ fontSize: '1.3rem' }}>Privacy and independence</h2>
        <p>
          Your progress is stored only in your browser. There are no accounts, adverts or trackers. You can save or delete everything from{' '}
          <a href={href('settings')}>Settings</a>.
        </p>
        <p className="muted" style={{ fontSize: '0.9rem' }}>
          ESAT Crucible is not affiliated with or endorsed by UAT-UK, the University of Cambridge or Imperial College London. "ESAT" is used only to
          describe the test this site helps you prepare for.
        </p>
      </section>
    </div>
  );
}
