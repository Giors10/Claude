import React from 'react';
import { Icon } from '../components/Icon';
import { Rich } from '../lib/rich';
import { href } from '../lib/router';

const t = String.raw;

export const STRATEGY_SECTIONS: { title: string; body: string }[] = [
  {
    title: 'Pacing: 89 seconds is an average, not a rule',
    body: t`Each module is 27 questions in 40 minutes, about **89 seconds per question**, and time does not carry over between modules. Use checkpoints rather than watching every second:

| Question | Aim to be there by |
|---|---|
| 9 | 13:20 used (26:40 left) |
| 18 | 26:40 used (13:20 left) |
| 27 | 37:00 used, leaving 3 minutes for flagged questions and blanks |

**Two passes.** On the first pass answer everything you can do in about 2 minutes, flagging anything longer. On the second pass return to the flagged questions. In the final minute make sure *every* question has an answer: there is no negative marking.`,
  },
  {
    title: 'Triage: when to walk away',
    body: t`The costliest mistake in the ESAT is sinking four minutes into one question. Give yourself a hard limit of about $2\tfrac12$ minutes. If you have not got a clear route, eliminate what you can, choose the most likely option, **flag it** and move on. Difficulty is not strictly increasing, so there are easy marks late in every module.`,
  },
  {
    title: 'Use the options',
    body: t`The answer is on the screen, so use it:
- **Back-solve.** Substitute an option into the question, especially for "what is $n$?" questions.
- **Estimate.** Many options differ by powers of 10 or are well separated: a rough estimate eliminates most of them.
- **Check units and dimensions.** An expression for a length must have units of length. This removes half the options in algebraic unit questions.
- **Try extreme or special cases.** Put $x = 0$, $k = 1$ or a symmetrical case into an algebraic answer and see which option survives.
- **"Which statements are true?"** Test the easiest statement first. Often one result eliminates most of the options, so you never need to test the hardest statement.`,
  },
  {
    title: 'Arithmetic without a calculator',
    body: t`Keep numbers as fractions and surds until the end, cancel early, and write powers of 10 separately. Know squares to $25^2$, cubes to $10^3$, powers of 2 to $2^{12}$, and $\sqrt2 \approx 1.414$, $\sqrt3 \approx 1.732$, $\pi \approx 3.14$. Multiply by 5 by halving and multiplying by 10; divide by 0.25 by multiplying by 4. The Speed drills page trains exactly these skills.`,
  },
  {
    title: 'Mathematics 1',
    body: t`Mathematics 1 rewards algebraic fluency more than anything: rearranging, factorising, fractions, simultaneous equations and quadratics appear everywhere, including in the geometry, probability and statistics questions. Learn the circle theorems and exact trig values until they are automatic. Remember that Mathematics 1 never needs the sine or cosine rule: if you reach for them, look for a right-angled triangle instead.`,
  },
  {
    title: 'Mathematics 2',
    body: t`**Sketch first**: graphs answer "how many solutions" questions faster than algebra. Watch for the parameter that makes the leading coefficient zero, for domain restrictions in logs and square roots, and for solutions that fall outside an interval (including its endpoints). Calculus is only ever powers of $x$, so expand or divide before differentiating or integrating.`,
  },
  {
    title: 'Physics',
    body: t`Write down the equation before you substitute. Convert to SI units first (g to kg, cm to m, kJ to J, mA to A). Use $g = 10\ \text{N kg}^{-1}$. Force questions are one-dimensional: choose a positive direction and keep to it. When a question involves speeds, heights and losses, an **energy** method is usually quicker than forces. Momentum is a vector: rebounds add speeds. Read graph axes and units carefully.`,
  },
  {
    title: 'The trap patterns setters love',
    body: t`- Diameter used as radius; area and volume unit conversions ($\text{cm}^2 \to \text{m}^2$ is $\div 10^4$).
- Reversing a percentage by subtracting it instead of dividing by the multiplier.
- Off-by-one errors in sequences, fence-posts and half-lives.
- A conditional probability turned the wrong way round.
- Forgetting the negative root, or including a root the question's conditions forbid.
- A "maximum" that becomes a "minimum" after multiplying by a negative number.
- Ignoring atmospheric pressure, or the direction of a force or velocity.`,
  },
  {
    title: 'The last week',
    body: t`Do not start new topics. Sit a full paper under strict timing, review every mistake, and clear your flashcard and mistake-review queues each day. Do a short speed drill every day to keep your arithmetic sharp. Sleep matters more than one more past paper the night before.`,
  },
  {
    title: 'On the day',
    body: t`The ESAT is taken on computer at a test centre. You get an erasable booklet and pen for working, not paper, so practise writing on a small wipeable board beforehand. Bring the photo ID your booking confirmation asks for and arrive early. Each module starts fresh with its own clock: if one goes badly, reset and attack the next.`,
  },
];

export function StrategyPage() {
  return (
    <div className="page page-narrow">
      <header className="page-head">
        <span className="eyebrow">Exam strategy</span>
        <h1>How to take the ESAT</h1>
        <p className="lede">Knowing the content gets you to a 5 or 6. Technique, pacing and trap-awareness are what reliably add the extra point.</p>
      </header>
      {STRATEGY_SECTIONS.map((s, i) => (
        <section key={s.title} className="card stack">
          <div className="row" style={{ gap: 12, flexWrap: 'nowrap', alignItems: 'baseline' }}>
            <span className="mono muted">{String(i + 1).padStart(2, '0')}</span>
            <h2 style={{ fontSize: '1.25rem' }}>{s.title}</h2>
          </div>
          <Rich text={s.body} />
        </section>
      ))}
      <div className="row">
        <a className="btn btn-primary" href={href('paper')}>
          <Icon name="paper" /> Put it into practice
        </a>
        <a className="btn" href={href('drills')}>
          <Icon name="bolt" /> Speed drills
        </a>
      </div>
    </div>
  );
}
