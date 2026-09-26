# ESAT Crucible

A preparation site for the **Engineering and Science Admissions Test (ESAT)**, built around one deliberately hard predicted paper for **Mathematics 1, Physics and Mathematics 2**, the three modules Cambridge Engineering requires. It scores you on the official **1.0–9.0 scale** and teaches the specification content with notes, flashcards and drills.

It is a single static page: no server, no accounts, no trackers. Progress is saved in the browser and can be exported.

## What is inside

**The Crucible paper**
- 81 original questions (27 per module), written to the 2026 content specification for the October 2026 and January 2027 sittings and set **harder than a typical real paper**.
- Real test conditions: 40 minutes per module, separately timed, run in the real order (Mathematics 1, Physics, Mathematics 2), with a question navigator, flags, cross-out, a scratchpad, time warnings and keyboard shortcuts.
- Question styles from the real test: calculations, "which statements are true" (8 options), graph-matching with drawn options, and questions built on circuits, graphs and geometry diagrams.

**Scoring and analysis**
- A Rasch (item response theory) estimate on the 1.0–9.0 scale for each module, with a likely range and the percentile against UAT-UK's published October 2025 distribution.
- The raw mark you would expect on a typical ESAT paper at the same ability.
- Pacing against the 89-second average, time per question, accuracy by topic, and an "engineering profile" across the three modules.

**Learning**
- Every question has a full worked solution, an explanation of why each tempting wrong answer is wrong, hints, a key insight, your notes and bookmarks.
- Notes on all 22 specification topics: the ideas, must-know formulas, common traps, exam technique and a worked example each.
- A searchable formula sheet, 104 flashcards with spaced repetition, and unlimited non-calculator speed drills in 11 skills (arithmetic, powers, fractions, surds, standard form, exact trig values, units, percentages, logarithms, physics quantities, estimation).
- Exam strategy: pacing checkpoints, two-pass triage, option-led techniques and recurring traps.
- A day-by-day study planner to your test date, built from your weakest topics, with the 2026–27 key dates.
- Practice by module, topic and difficulty; quick sets; a spaced-repetition review of past mistakes; a question bank with search and filters; progress tracking over time; and a raw-mark ↔ score calculator.
- When opened in the claude.ai artifact viewer, an **AI tutor** can explain any question. It is given the verified solution and told never to contradict it.

## How the questions were checked

Every answer was checked three independent ways:

1. **By hand** while writing the question and its full solution, including the working behind each wrong option.
2. **By computer algebra**: [`scripts/verify_answers.py`](scripts/verify_answers.py) recomputes every answer exactly with sympy and confirms that exactly one option matches and that it is the one marked correct.
3. **By a different method** in the same script: brute-force enumeration, numerical integration, simulation, Monte Carlo sampling or a geometric construction, depending on the question.

The content is also tested automatically ([`tests/`](tests)): every formula in the questions, notes and flashcards must render in KaTeX **strict mode**, no maths notation may appear outside the maths renderer, every diagram must exist and have alternative text, and answers must be spread across the letters. Every question was then reviewed visually in Chromium, with its solution, traps and hints, and spot-checked in the dark theme and at phone width. [`scripts/check-overflow.mjs`](scripts/check-overflow.mjs) confirms that no formula, option or table overflows at phone and tablet widths (360, 375 and 768 px).

Long display equations re-typeset themselves on narrow screens, breaking at implications first and then at relations ([`src/lib/texLayout.ts`](src/lib/texLayout.ts)). Diagrams are drawn in SVG from each question's actual numbers.

## How scores are estimated

The ESAT is scored with the Rasch model, and UAT-UK does not publish conversion tables. This site uses the same model: each question has a difficulty in logits set from its rating, your ability θ is the maximum-likelihood estimate from your raw mark, and θ maps linearly onto the reported scale (score = 4.5 + 1.50 θ, placing the 90th percentile at 7.0). The constants reproduce widely reported conversions for typical papers. Because this paper is harder, the same raw mark earns a higher score here. Treat every score as an estimate of about ±0.5. The site's About page has the details.

## Running it

```bash
npm ci
npm run dev            # development server
npm run build          # typecheck, run the tests, build dist/index.html
```

`dist/index.html` is one self-contained file, with fonts and KaTeX included, so it works offline. You can open it directly or host it anywhere.

Quality checks:

```bash
npm run check          # TypeScript and unit tests
npm run verify:answers # recompute all 81 answers (needs Python 3 with sympy)
npm run check:layout   # phone and tablet overflow check in Chromium (after a build)
npm run shots -- build/shots --questions --tabs   # screenshots of every question for review
```

### Deploying

- **GitHub Pages**: [`.github/workflows/pages.yml`](.github/workflows/pages.yml) checks, verifies and publishes the site on every push to `main`. Enable it under *Settings → Pages → Source: GitHub Actions*. [`ci.yml`](.github/workflows/ci.yml) runs the same checks on every branch.
- **claude.ai artifact**: `npm run build:artifact` writes `build/esat-crucible.html`, a page fragment that loads React, ReactDOM and KaTeX from jsDelivr. `npm run verify:artifact` loads it in Chromium the way the viewer does and checks that it renders.

## Project layout

```
src/
  content/paper/      the 81 questions (m1.ts, ph.ts, m2.ts)
  content/learn/      topic notes;  content/flashcards.ts
  diagrams/           SVG diagrams for questions, options and solutions
  lib/                scoring (rasch.ts), exam engine, planner, drills, store, rich text and maths layout
  pages/, components/ the interface
tests/                content, rendering, scoring, drills and layout tests
scripts/              answer verification, screenshots, overflow check, artifact packaging
```

## Sources

- UAT-UK, *ESAT Content Specification* for assessment in October 2026 and January 2027.
- UAT-UK, *ESAT Explanation of Results*, October 2025 (score scale and distributions).
- UAT-UK and University of Cambridge information on dates, format and module requirements. Free official preparation materials are on the [UAT-UK website](https://esat-tmua.ac.uk/esat-preparation-materials/).

ESAT Crucible is independent. It is not affiliated with or endorsed by UAT-UK, the University of Cambridge or Imperial College London. The questions are original, and scores are model-based estimates.
