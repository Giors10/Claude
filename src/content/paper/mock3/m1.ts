import type { Question } from '../../types';
import { STATEMENT_OPTIONS, ST } from '../shared';

const t = String.raw;

/**
 * Mock 3 (Anvil) — Mathematics 1.
 * 27 questions, 40 minutes, no calculator. A second realistic paper with a
 * different topic balance from Mock 2, pitched a little above real
 * difficulty and inside the M1–M7 specification.
 */
export const M1: Question[] = [
  {
    id: '3-M1-01',
    module: 'M1',
    n: 1,
    topic: 'M2',
    spec: ['M2.14'],
    title: 'Estimating with π and a square root',
    difficulty: 1,
    time: 60,
    stem: t`Which of the following is closest to the value of
$$\frac{\pi\sqrt{48.9}}{0.0198 \times 36.2}\ ?$$`,
    options: [t`$3$`, t`$10$`, t`$30$`, t`$100$`, t`$300$`, t`$3000$`],
    answer: 2,
    hints: [t`Round each number to one significant figure (or to a nearby square number under the root).`],
    solution: t`Round each number to something easy to work with:
$$\pi \approx 3, \qquad \sqrt{48.9} \approx \sqrt{49} = 7, \qquad 0.0198 \times 36.2 \approx 0.02 \times 36 = 0.72.$$

So the value is about
$$\frac{3 \times 7}{0.72} = \frac{21}{0.72} \approx 29,$$
and the closest option is **30**. (The exact value is about 30.6.)`,
    traps: {
      1: t`Leaves out the factor $\pi$.`,
      3: t`Halves 48.9 instead of taking its square root.`,
      0: t`Takes $0.0198 \times 36.2$ as about 7 instead of about 0.7.`,
      4: t`Takes $0.0198 \times 36.2$ as about 0.07 instead of about 0.7.`,
    },
    insight: t`Estimate by rounding to one significant figure, using the nearest perfect square under a root, and keep careful track of the powers of 10.`,
    skills: ['estimation', 'surds', 'powers of ten'],
  },
  {
    id: '3-M1-02',
    module: 'M1',
    n: 2,
    topic: 'M5',
    spec: ['M5.1', 'M5.2'],
    title: 'Symmetry of a regular polygon',
    difficulty: 1,
    time: 60,
    stem: t`Each interior angle of a regular polygon is five times the size of each exterior angle.

How many lines of symmetry does the polygon have?`,
    options: [t`$6$`, t`$12$`, t`$15$`, t`$24$`, t`$30$`, t`$60$`],
    answer: 1,
    hints: [t`An interior angle and an exterior angle add up to $180°$.`],
    solution: t`An interior angle and the exterior angle next to it add up to $180°$. If the exterior angle is $e$, then $5e + e = 180°$, so $e = 30°$.

The exterior angles of any polygon add up to $360°$, so the polygon has
$$\frac{360°}{30°} = 12 \text{ sides}.$$

A regular 12-sided polygon has **12** lines of symmetry: 6 through pairs of opposite vertices and 6 through the midpoints of pairs of opposite sides.`,
    traps: {
      0: t`Counts only the lines through opposite vertices; there are also 6 lines through the midpoints of opposite sides.`,
      4: t`$30°$ is the size of each exterior angle, not the number of lines of symmetry.`,
      3: t`A regular $n$-sided polygon has $n$ lines of symmetry, not $2n$.`,
    },
    insight: t`Interior + exterior = $180°$ and the exterior angles total $360°$. A regular $n$-gon has $n$ lines of symmetry and rotational symmetry of order $n$.`,
    skills: ['polygons', 'exterior angles', 'symmetry'],
  },
  {
    id: '3-M1-03',
    module: 'M1',
    n: 3,
    topic: 'M2',
    spec: ['M2.6'],
    title: 'Integers bounded by a square and a cube',
    difficulty: 2,
    time: 75,
    stem: t`How many integers $n$ satisfy both $n^2 < 150$ and $n^3 > -30$?`,
    options: [t`$12$`, t`$13$`, t`$15$`, t`$16$`, t`$17$`, t`$25$`],
    answer: 3,
    hints: [t`$n^2 < 150$ allows negative values of $n$ as well as positive ones.`, t`Is $(-3)^3$ greater than $-30$?`],
    solution: t`**$n^2 < 150$.** Since $12^2 = 144 < 150$ but $13^2 = 169$, this allows $-12 \le n \le 12$.

**$n^3 > -30$.** Since $(-3)^3 = -27 > -30$ but $(-4)^3 = -64$, this allows $n \ge -3$.

Both conditions hold for $-3 \le n \le 12$, which is $12 - (-3) + 1 = 16$ integers.`,
    traps: {
      5: t`Uses only the first condition ($-12$ to $12$).`,
      2: t`Leaves out $n = -3$; but $(-3)^3 = -27$, which *is* greater than $-30$.`,
      1: t`Forgets the negative values of $n$ ($0$ to $12$).`,
      0: t`Counts only the positive integers.`,
    },
    insight: t`A square has two square roots, $\pm$; a cube root keeps the sign. Check the boundary values exactly.`,
    skills: ['squares and cubes', 'inequalities', 'negative numbers'],
  },
  {
    id: '3-M1-04',
    module: 'M1',
    n: 4,
    topic: 'M1',
    spec: ['M1.1', 'M1.2'],
    title: 'Fuel cost per mile',
    difficulty: 2,
    time: 80,
    stem: t`A car uses 6.4 litres of fuel for every 100 km it travels. Fuel costs £1.50 per litre, and 1 mile is 1.6 km.

Which of the following is closest to the cost of the fuel used per mile?`,
    options: [t`6.0p`, t`9.6p`, t`10.2p`, t`15.4p`, t`24.6p`, t`154p`],
    answer: 3,
    hints: [t`Find the cost per kilometre first; a mile is longer than a kilometre.`],
    solution: t`**Per kilometre.** The car uses $\dfrac{6.4}{100} = 0.064$ litres, costing $0.064 \times 150\text{p} = 9.6\text{p}$.

**Per mile.** A mile is 1.6 km, so the cost is
$$9.6 \times 1.6 = 15.36\text{p} \approx 15.4\text{p}.$$`,
    traps: {
      0: t`Divides by 1.6 instead of multiplying: a mile is *longer* than a kilometre, so it costs more.`,
      1: t`$9.6$p is the cost per kilometre.`,
      2: t`$0.1024$ litres per mile has been read as pence: the price per litre has been left out.`,
      4: t`Multiplies by 1.6 twice.`,
      5: t`A factor of 10 slip.`,
    },
    insight: t`Chain compound units one step at a time (litres per km, then pence per km, then pence per mile), checking at each step whether the number should grow or shrink.`,
    skills: ['compound units', 'unit conversion', 'rates'],
  },
  {
    id: '3-M1-05',
    module: 'M1',
    n: 5,
    topic: 'M2',
    spec: ['M2.9', 'M2.10'],
    title: 'Adding two recurring decimals',
    difficulty: 2,
    time: 80,
    stem: t`What is
$$0.\dot{4}\dot{5} + 0.1\dot{3}$$
as a fraction in its simplest form?`,
    options: [t`$\dfrac{29}{50}$`, t`$\dfrac{7}{12}$`, t`$\dfrac{58}{99}$`, t`$\dfrac{97}{165}$`, t`$\dfrac{13}{22}$`, t`$\dfrac{593}{990}$`],
    answer: 3,
    hints: [t`$0.\dot{4}\dot{5} = 0.454545\ldots$ but $0.1\dot{3} = 0.1333\ldots$`],
    solution: t`**$0.\dot{4}\dot{5}$.** Both digits recur: $100x - x = 45$, so $x = \dfrac{45}{99} = \dfrac{5}{11}$.

**$0.1\dot{3}$.** Only the 3 recurs: $100y - 10y = 13.3\dot{3} - 1.3\dot{3} = 12$, so $y = \dfrac{12}{90} = \dfrac{2}{15}$.

**Sum.**
$$\frac{5}{11} + \frac{2}{15} = \frac{75 + 22}{165} = \frac{97}{165}.$$`,
    traps: {
      0: t`Treats both decimals as terminating: $0.45 + 0.13$.`,
      1: t`Treats $0.\dot{4}\dot{5}$ as the terminating decimal $0.45$.`,
      2: t`Treats $0.1\dot{3}$ as $0.\dot{1}\dot{3} = \tfrac{13}{99}$.`,
      5: t`Writes $0.1\dot{3}$ as $\tfrac{13}{90}$; the correct numerator is $13 - 1 = 12$.`,
    },
    insight: t`Multiply by powers of 10 that line up the recurring blocks exactly before subtracting; a non-recurring digit needs an extra factor of 10.`,
    skills: ['recurring decimals', 'fractions'],
  },
  {
    id: '3-M1-06',
    module: 'M1',
    n: 6,
    topic: 'M3',
    spec: ['M3.4', 'M3.5'],
    title: 'Changing the sharing ratio',
    difficulty: 2,
    time: 85,
    stem: t`A sum of money is to be shared between Asha and Ben in the ratio $5 : 3$. If it were shared in the ratio $3 : 2$ instead, Ben would receive £10 more.

How much money is being shared?`,
    options: [t`£50`, t`£80`, t`£150`, t`£240`, t`£400`, t`£1200`],
    answer: 4,
    hints: [t`Write Ben's share in each case as a fraction of the total.`],
    solution: t`Let the total be $T$. Ben's share changes from $\dfrac{3}{8}T$ to $\dfrac{2}{5}T$, an increase of
$$\left(\frac{2}{5} - \frac{3}{8}\right)T = \frac{16 - 15}{40}T = \frac{T}{40}.$$

This is £10, so $T = £400$.

Check: $5 : 3$ gives £250 and £150; $3 : 2$ gives £240 and £160, so Ben gets £10 more ✓`,
    traps: {
      1: t`Assumes one part of the $5 : 3$ split is worth £10.`,
      2: t`Compares Ben's share with Asha's ($\tfrac{2}{3} - \tfrac{3}{5}$) instead of with the total.`,
    },
    insight: t`Convert each ratio to fractions of the whole before comparing: $a : b$ gives $\dfrac{a}{a+b}$ and $\dfrac{b}{a+b}$.`,
    skills: ['ratio', 'fractions of amounts'],
  },
  {
    id: '3-M1-07',
    module: 'M1',
    n: 7,
    topic: 'M4',
    spec: ['M4.12c'],
    title: 'Sketch of a cubic with a repeated root',
    difficulty: 2,
    time: 80,
    stem: t`Which of the following could be the graph of $y = (1 - x)(x + 2)^2$?`,
    options: [
      { diagram: 'p3-m1-cubic-a', alt: 'Rises from the bottom left to touch the x-axis at −2, falls to a minimum at x = 0, then rises through the x-axis at 1 to the top right' },
      { diagram: 'p3-m1-cubic-b', alt: 'Rises from the bottom left, crosses the x-axis at −2, turns at a maximum, touches the x-axis at 1 and rises to the top right' },
      { diagram: 'p3-m1-cubic-c', alt: 'A parabola opening downwards that crosses the x-axis at −2 and 1' },
      { diagram: 'p3-m1-cubic-d', alt: 'Rises from the bottom left, crosses the x-axis at −1, turns at a maximum, touches the x-axis at 2 and rises to the top right' },
      { diagram: 'p3-m1-cubic-e', alt: 'Falls from the top left, crosses the x-axis at 1, touches the x-axis at 2 and falls to the bottom right' },
      { diagram: 'p3-m1-cubic-f', alt: 'Falls from the top left, touches the x-axis at −2, rises to a maximum at x = 0, crosses the x-axis at 1 and falls to the bottom right' },
    ],
    answer: 5,
    hints: [t`A squared factor gives a root where the graph touches the axis without crossing.`, t`Expand just enough to find the $x^3$ term: is it positive or negative?`],
    solution: t`- **Roots.** $y = 0$ at $x = 1$ and at $x = -2$. The factor $(x + 2)^2$ is squared, so the graph *touches* the $x$-axis at $x = -2$; at $x = 1$ it *crosses*.
- **Shape.** The $x^3$ term is $(-x)(x^2) = -x^3$, so $y \to -\infty$ as $x \to \infty$ and $y \to +\infty$ as $x \to -\infty$: the graph falls from the top left to the bottom right.
- **$y$-intercept.** At $x = 0$, $y = 1 \times 4 = 4$.

Only graph F has all three features.`,
    traps: {
      0: t`This is $y = (x - 1)(x + 2)^2$: the $x^3$ term is positive, not negative.`,
      1: t`Swaps the roles of the roots: the squared factor $(x + 2)^2$ makes the graph touch at $x = -2$, not at $x = 1$.`,
      2: t`This is $y = (1 - x)(x + 2)$, a quadratic; the square makes the equation a cubic.`,
      3: t`Reverses the signs of the roots: $(x + 2)$ is zero at $x = -2$, not $x = 2$.`,
      4: t`Puts the repeated root at $x = 2$; the factor $(x + 2)^2$ is zero at $x = -2$.`,
    },
    insight: t`To sketch a factorised cubic: find the roots (touch at repeated roots, cross at single ones), the sign of the $x^3$ term, and the $y$-intercept.`,
    skills: ['cubic graphs', 'repeated roots', 'sketching'],
  },
  {
    id: '3-M1-08',
    module: 'M1',
    n: 8,
    topic: 'M7',
    spec: ['M7.3', 'M7.2', 'M7.4'],
    title: 'Using relative frequency to predict',
    difficulty: 2,
    time: 75,
    stem: t`A spinner with four colours is spun 200 times. The results are shown.

| Colour | red | blue | green | yellow |
|---|---|---|---|---|
| Frequency | 34 | 51 | 45 | 70 |

The spinner is spun another 600 times. Using these results, estimate how many of the 600 spins will land on green or yellow.`,
    options: [t`$57.5$`, t`$115$`, t`$230$`, t`$300$`, t`$345$`, t`$450$`],
    answer: 4,
    hints: [t`The best estimate of each probability is its relative frequency.`],
    solution: t`Green or yellow came up $45 + 70 = 115$ times in 200 spins, a relative frequency of
$$\frac{115}{200} = 0.575.$$

This is the best estimate of the probability, so in 600 spins we expect about
$$0.575 \times 600 = 345.$$`,
    traps: {
      3: t`Assumes the spinner is fair (a probability of $\tfrac{2}{4}$); the results suggest it is not.`,
      1: t`$115$ is the number in the first 200 spins; 600 spins is three times as many.`,
      2: t`Scales by 2 instead of 3.`,
    },
    insight: t`Estimated probability = relative frequency from the trials; expected number = estimated probability × number of new trials.`,
    skills: ['relative frequency', 'expected frequency'],
  },
  {
    id: '3-M1-09',
    module: 'M1',
    n: 9,
    topic: 'M3',
    spec: ['M3.8'],
    title: 'Price before two discounts',
    difficulty: 2,
    time: 80,
    stem: t`In a sale, all prices are reduced by 30%. Members get a further 10% off the sale price.

A member pays £50.40 for a jacket. What was the price of the jacket before the sale?`,
    options: [t`£56.00`, t`£70.56`, t`£72.00`, t`£72.07`, t`£80.00`, t`£84.00`],
    answer: 4,
    hints: [t`The price was multiplied by 0.7 and then by 0.9.`],
    solution: t`The original price $P$ was multiplied by $0.7$ and then by $0.9$:
$$0.7 \times 0.9 \times P = 0.63P = 50.40.$$

So
$$P = \frac{50.40}{0.63} = £80.00.$$

Check: $80 \times 0.7 = 56$, and $56 \times 0.9 = 50.40$ ✓`,
    traps: {
      5: t`Treats the two discounts as a single 40% reduction: $50.40 \div 0.6$. Successive percentage changes multiply.`,
      1: t`Increases £50.40 by 40%; reversing a decrease means dividing by the multiplier.`,
      3: t`Increases by 10% and then by 30%; reversing a decrease means dividing by the multiplier, not increasing by the same percentage.`,
      0: t`Undoes only the 10% member discount.`,
      2: t`Undoes only the 30% sale reduction.`,
    },
    insight: t`To undo percentage changes, divide by the overall multiplier: here $0.7 \times 0.9 = 0.63$, a 37% reduction, not 40%.`,
    skills: ['reverse percentages', 'multipliers'],
  },
  {
    id: '3-M1-10',
    module: 'M1',
    n: 10,
    topic: 'M2',
    spec: ['M2.3'],
    title: 'LCM divided by HCF',
    difficulty: 2,
    time: 75,
    stem: t`Given that
$$A = 2^3 \times 3^2 \times 5 \qquad\text{and}\qquad B = 2^2 \times 3^4 \times 7,$$
what is the lowest common multiple of $A$ and $B$ divided by their highest common factor?`,
    options: [t`$35$`, t`$70$`, t`$315$`, t`$630$`, t`$1260$`, t`$22\,680$`],
    answer: 3,
    hints: [t`The LCM takes the highest power of every prime; the HCF takes the lowest power of each prime they share.`],
    solution: t`- **LCM:** the highest power of each prime that appears: $2^3 \times 3^4 \times 5 \times 7$.
- **HCF:** the lowest power of each prime in both: $2^2 \times 3^2$ (5 and 7 each appear in only one number).

So
$$\frac{\text{LCM}}{\text{HCF}} = \frac{2^3 \times 3^4 \times 5 \times 7}{2^2 \times 3^2} = 2 \times 3^2 \times 5 \times 7 = 630.$$`,
    traps: {
      5: t`$22\,680$ is the LCM itself; it still has to be divided by the HCF, 36.`,
      0: t`Keeps only the primes that appear in one number; the powers of 2 and 3 do not cancel completely.`,
      2: t`Forgets the extra factor of 2: $2^3 \div 2^2 = 2$.`,
    },
    insight: t`With prime factorisations: LCM = highest powers of all primes, HCF = lowest powers of shared primes. (Also, LCM × HCF = $A \times B$.)`,
    skills: ['prime factorisation', 'HCF and LCM'],
  },
  {
    id: '3-M1-11',
    module: 'M1',
    n: 11,
    topic: 'M6',
    spec: ['M6.1c'],
    title: 'Reading a time series',
    difficulty: 2,
    time: 80,
    stem: t`The time series graph shows the quarterly sales of a shop, in thousands of pounds, over three years.`,
    diagram: 'p3-m1-sales',
    diagramAlt: 'Quarterly sales in thousands of pounds. Year 1: Q1 30, Q2 45, Q3 60, Q4 25. Year 2: 35, 50, 65, 30. Year 3: 35, 55, 70, 40.',
    prompt: t`By what percentage did the total sales for the year rise from Year 1 to Year 3?`,
    options: [t`16.7%`, t`20%`, t`25%`, t`40%`, t`60%`, t`80%`],
    answer: 2,
    hints: [t`Add up the four quarters of each year.`, t`A percentage increase is measured against the *starting* value.`],
    solution: t`Add up the four quarters in each year (in £ thousand):

- Year 1: $30 + 45 + 60 + 25 = 160$
- Year 3: $35 + 55 + 70 + 40 = 200$

The increase is $40$ thousand, and as a percentage of the Year 1 total:
$$\frac{40}{160} \times 100\% = 25\%.$$`,
    traps: {
      1: t`Divides the increase by the Year 3 total instead of the Year 1 total.`,
      0: t`Compares only the first quarters (30 to 35).`,
      4: t`Compares only the fourth quarters (25 to 40).`,
      3: t`40 is the increase in thousands of pounds, not a percentage.`,
    },
    insight: t`Read a time series for the whole period you need, and measure a percentage change against the original value.`,
    skills: ['time series', 'percentage change', 'reading graphs'],
  },
  {
    id: '3-M1-12',
    module: 'M1',
    n: 12,
    topic: 'M3',
    spec: ['M3.9'],
    title: 'Inverse square proportion',
    difficulty: 3,
    time: 90,
    stem: t`$y$ is inversely proportional to the square of $x$.

When $x$ increases by 25%, by what percentage does $y$ decrease?`,
    options: [t`20%`, t`25%`, t`36%`, t`44%`, t`50%`, t`56.25%`],
    answer: 2,
    hints: [t`Write $y = \dfrac{k}{x^2}$ and replace $x$ by $1.25x$.`],
    solution: t`Write $y = \dfrac{k}{x^2}$. When $x$ becomes $1.25x$,
$$y_\text{new} = \frac{k}{(1.25x)^2} = \frac{y}{1.5625} = 0.64\,y,$$
since $\dfrac{1}{1.5625} = \dfrac{16}{25} = 0.64$.

So $y$ decreases by $1 - 0.64 = 0.36$, which is **36%**.`,
    traps: {
      0: t`This is the answer for $y$ inversely proportional to $x$: $\tfrac{1}{1.25} = 0.8$.`,
      1: t`Assumes $y$ falls by the same percentage as $x$ rises.`,
      4: t`Doubles the 25%; the multiplier $1.25$ is squared, not the percentage doubled.`,
      5: t`$56.25\%$ is the *increase* in $x^2$.`,
    },
    insight: t`Work with multipliers: a 25% increase is $\times 1.25$; squaring gives $\times 1.5625$; inverting gives $\times 0.64$, a 36% decrease.`,
    skills: ['inverse proportion', 'percentage change', 'multipliers'],
  },
  {
    id: '3-M1-13',
    module: 'M1',
    n: 13,
    topic: 'M4',
    spec: ['M4.12d', 'M4.15'],
    title: 'A shifted reciprocal graph',
    difficulty: 3,
    time: 95,
    stem: t`The curve $y = \dfrac{a}{x} + b$, where $a$ and $b$ are constants, passes through the points $(1, 5)$ and $(3, 1)$.

Where does the curve cross the $x$-axis?`,
    options: [t`$x = -6$`, t`$x = -\dfrac{3}{2}$`, t`$x = \dfrac{1}{6}$`, t`$x = \dfrac{3}{2}$`, t`$x = 6$`, t`it does not cross the $x$-axis`],
    answer: 4,
    hints: [t`Substitute both points to get two simultaneous equations in $a$ and $b$.`],
    solution: t`Substituting the two points:
$$a + b = 5, \qquad \frac{a}{3} + b = 1.$$

Subtracting, $\dfrac{2a}{3} = 4$, so $a = 6$ and $b = -1$. The curve is $y = \dfrac{6}{x} - 1$.

It crosses the $x$-axis where $\dfrac{6}{x} = 1$, i.e. at $x = 6$.

(The curve is $y = \dfrac{6}{x}$ moved down 1 unit, so its horizontal asymptote is $y = -1$ and it does cross the $x$-axis.)`,
    traps: {
      0: t`Sign slip, using $b = +1$.`,
      2: t`Solves $6x - 1 = 0$, treating $\dfrac{6}{x}$ as $6x$.`,
      5: t`$y = \dfrac{a}{x}$ never meets the axes, but adding $b$ moves the curve down, so it does cross the $x$-axis.`,
    },
    insight: t`$y = \dfrac{a}{x} + b$ is the reciprocal graph shifted by $b$: its asymptotes are $x = 0$ and $y = b$, so it can cross the $x$-axis.`,
    skills: ['reciprocal graphs', 'simultaneous equations'],
  },
  {
    id: '3-M1-14',
    module: 'M1',
    n: 14,
    topic: 'M5',
    spec: ['M5.4', 'M5.5'],
    title: 'When must two triangles be congruent?',
    difficulty: 3,
    time: 90,
    stem: t`Consider the following statements about two triangles.`,
    statements: [
      t`If the three angles of one triangle are equal to the three angles of the other, the triangles must be congruent.`,
      t`If two sides and a non-included angle of one triangle are equal to two sides and the corresponding non-included angle of the other, the triangles must be congruent.`,
      t`If both triangles are right-angled, and their hypotenuses are equal and one other pair of sides are equal, the triangles must be congruent.`,
    ],
    prompt: t`Which of the statements is/are correct?`,
    options: STATEMENT_OPTIONS,
    answer: ST.s3,
    hints: [t`The congruence conditions are SSS, SAS, ASA (or AAS) and RHS.`],
    solution: t`**Statement 1.** False. Equal angles only make the triangles *similar*: one can be an enlargement of the other. ✗

**Statement 2.** False. Two sides and a *non-included* angle (SSA) is not a congruence condition: the third side can often take two different lengths, giving two different triangles. ✗

**Statement 3.** True. This is the RHS condition (right angle, hypotenuse, side). ✓

Statement 3 only.`,
    traps: {
      [ST.s13]: t`Equal angles give similar triangles, which need not be the same size.`,
      [ST.s23]: t`SSA is not a congruence condition; only the right-angled case (RHS) is.`,
      [ST.all]: t`Statements 1 and 2 describe AAA and SSA, neither of which guarantees congruence.`,
    },
    insight: t`Congruence needs SSS, SAS, ASA/AAS or RHS. AAA gives similarity only, and SSA can give two different triangles.`,
    skills: ['congruence', 'geometric reasoning'],
  },
  {
    id: '3-M1-15',
    module: 'M1',
    n: 15,
    topic: 'M3',
    spec: ['M3.10', 'M5.17'],
    title: 'Capacities of similar bottles',
    difficulty: 3,
    time: 95,
    stem: t`Two mathematically similar bottles have surface areas of $180\ \text{cm}^2$ and $405\ \text{cm}^2$. The larger bottle holds 540 ml.

How much does the smaller bottle hold?`,
    options: [t`120 ml`, t`160 ml`, t`240 ml`, t`360 ml`, t`1215 ml`, t`1822.5 ml`],
    answer: 1,
    hints: [t`Find the ratio of the areas, then the ratio of the lengths, then the ratio of the volumes.`],
    solution: t`**Areas.** $180 : 405 = 4 : 9$.

**Lengths.** The square root of the area ratio: $2 : 3$.

**Volumes.** The cube of the length ratio: $8 : 27$.

So the smaller bottle holds
$$540 \times \frac{8}{27} = 160\ \text{ml}.$$`,
    traps: {
      2: t`Uses the area ratio $4 : 9$ for the volumes.`,
      3: t`Uses the length ratio $2 : 3$ for the volumes.`,
      4: t`Scales up instead of down, using the area ratio.`,
      5: t`Scales up instead of down: the smaller bottle must hold less.`,
    },
    insight: t`For similar shapes with length scale factor $k$: areas scale by $k^2$ and volumes by $k^3$. Go through the length ratio.`,
    skills: ['similarity', 'area and volume scale factors'],
  },
  {
    id: '3-M1-16',
    module: 'M1',
    n: 16,
    topic: 'M5',
    spec: ['M5.8', 'M5.16'],
    title: 'From a minor sector to the major sector',
    difficulty: 3,
    time: 95,
    stem: t`The perimeter of a minor sector of a circle of radius 6 cm is $(12 + 4\pi)$ cm.

What is the area of the major sector of the same circle?`,
    options: [t`$12\pi\ \text{cm}^2$`, t`$24\pi\ \text{cm}^2$`, t`$30\pi\ \text{cm}^2$`, t`$32\pi\ \text{cm}^2$`, t`$36\pi\ \text{cm}^2$`, t`$48\pi\ \text{cm}^2$`],
    answer: 1,
    hints: [t`The perimeter of a sector is two radii plus the arc.`],
    solution: t`The perimeter of a sector is two radii plus the arc, so the minor arc is $4\pi$ cm.

The whole circumference is $12\pi$ cm, so the minor sector is $\dfrac{4\pi}{12\pi} = \dfrac{1}{3}$ of the circle (an angle of $120°$), with area
$$\frac{1}{3} \times \pi \times 6^2 = 12\pi\ \text{cm}^2.$$

The major sector is the rest of the circle:
$$36\pi - 12\pi = 24\pi\ \text{cm}^2.$$`,
    traps: {
      0: t`$12\pi$ is the area of the minor sector.`,
      4: t`$36\pi$ is the area of the whole circle.`,
      5: t`Adds the minor sector's area to the circle's instead of subtracting it.`,
    },
    insight: t`A sector's perimeter includes two radii. The minor and major sectors together make the whole circle.`,
    skills: ['arc length', 'sector area', 'circle vocabulary'],
  },
  {
    id: '3-M1-17',
    module: 'M1',
    n: 17,
    topic: 'M4',
    spec: ['M4.19'],
    title: 'Twentieth term of a quadratic sequence',
    difficulty: 3,
    time: 95,
    stem: t`The first four terms of a quadratic sequence are
$$3, \quad 10, \quad 21, \quad 36.$$

What is the 20th term?`,
    options: [t`$780$`, t`$800$`, t`$820$`, t`$840$`, t`$1504$`, t`$1640$`],
    answer: 2,
    hints: [t`The second difference is $2a$, where $an^2$ is the leading term of the $n$th term.`],
    solution: t`The first differences are $7, 11, 15$ and the second difference is $4$. The second difference equals $2a$, so the $n$th term is $2n^2 + bn + c$.

Subtract $2n^2$ from the terms: $3 - 2 = 1$, $10 - 8 = 2$, $21 - 18 = 3$, $36 - 32 = 4$. What remains is just $n$, so the $n$th term is
$$2n^2 + n = n(2n + 1).$$

The 20th term is $20 \times 41 = 820$.`,
    traps: {
      4: t`Takes the coefficient of $n^2$ to be the second difference, 4; it is half of that.`,
      1: t`Leaves out the linear part: the $n$th term is $2n^2 + n$, not $2n^2$.`,
      0: t`Sign slip in the linear part: $2n^2 - n$.`,
    },
    insight: t`For a quadratic sequence, the coefficient of $n^2$ is half the second difference; subtract $an^2$ and find the linear rule for what is left.`,
    skills: ['quadratic sequences', 'nth term'],
  },
  {
    id: '3-M1-18',
    module: 'M1',
    n: 18,
    topic: 'M6',
    spec: ['M6.4'],
    title: 'Interpreting a scatter graph',
    difficulty: 3,
    time: 85,
    stem: t`The scatter graph shows the number of hours that 15 students spent revising and their scores in a test. A line of best fit has been drawn.`,
    diagram: 'p3-m1-scatter',
    diagramAlt: 'Scatter graph of test score against hours of revision for 15 students, between 1 and 11 hours; scores rise from about 35% to about 85% and a line of best fit runs up through the points.',
    statements: [
      t`The graph shows positive correlation between revision time and test score.`,
      t`The line of best fit gives a reliable estimate of the score of a student who revised for 30 hours.`,
      t`The graph proves that revising for longer causes students to score higher.`,
    ],
    prompt: t`Which of the statements is/are correct?`,
    options: STATEMENT_OPTIONS,
    answer: ST.s1,
    hints: [t`Is 30 hours inside the range of the data?`, t`Does correlation show cause and effect?`],
    solution: t`**Statement 1.** True: the points rise from left to right, close to a straight line. ✓

**Statement 2.** False: the data only go up to about 11 hours. Using the line at 30 hours is *extrapolation* and is not reliable; the line would even predict a score above 100%. ✗

**Statement 3.** False: correlation does not prove causation. Other factors (for example, interest in the subject) could affect both. ✗

Statement 1 only.`,
    traps: {
      [ST.s12]: t`30 hours is far outside the data (1 to 11 hours), so the estimate is an unreliable extrapolation.`,
      [ST.s13]: t`A correlation, however strong, does not prove that one variable causes the other.`,
    },
    insight: t`Lines of best fit are for interpolation within the data, not extrapolation. Correlation is not causation.`,
    skills: ['scatter graphs', 'correlation', 'lines of best fit'],
  },
  {
    id: '3-M1-19',
    module: 'M1',
    n: 19,
    topic: 'M5',
    spec: ['M5.9b', 'M5.9d', 'M5.9e'],
    title: 'Tangent, diameter and a chord extended',
    difficulty: 3,
    time: 95,
    stem: t`$AB$ is a diameter of a circle with centre $O$, and $C$ is a point on the circle. The tangent to the circle at $A$ meets the line $BC$, extended beyond $C$, at $T$.

Angle $ATB = 40°$.`,
    diagram: 'p3-m1-tangent',
    diagramAlt: 'A circle with horizontal diameter AB. The tangent at A is vertical. The line from B through C, a point on the upper part of the circle, is extended to meet the tangent at T above A. Angle ATB is 40 degrees and angle TAC is marked x.',
    prompt: t`What is the size of angle $TAC$, marked $x$?`,
    options: [t`$20°$`, t`$25°$`, t`$30°$`, t`$40°$`, t`$45°$`, t`$50°$`],
    answer: 5,
    hints: [t`The tangent at $A$ is perpendicular to the diameter $AB$.`, t`The angle in a semicircle is $90°$.`],
    solution: t`The tangent at $A$ is perpendicular to the radius, so angle $TAB = 90°$. In triangle $ABT$,
$$\angle ABT = 180° - 90° - 40° = 50°.$$

**Alternate segment theorem.** The angle between the tangent $AT$ and the chord $AC$ equals the angle subtended by $AC$ in the alternate segment, which is angle $ABC$:
$$x = \angle ABC = 50°.$$

**Check using the semicircle.** $AB$ is a diameter, so $\angle ACB = 90°$, and so $\angle ACT = 90°$ too. In triangle $ACT$: $x = 180° - 90° - 40° = 50°$ ✓`,
    traps: {
      3: t`$40°$ is angle $CAB$ (and angle $ATB$), not angle $TAC$.`,
      0: t`Halves the $40°$ angle; no theorem halves this angle.`,
    },
    insight: t`At a point where a tangent meets a chord, look for the alternate segment theorem; with a diameter, also use the right angle in the semicircle.`,
    skills: ['circle theorems', 'alternate segment theorem', 'tangents'],
  },
  {
    id: '3-M1-20',
    module: 'M1',
    n: 20,
    topic: 'M7',
    spec: ['M7.5', 'M7.7b'],
    title: 'Conditional probability from a Venn diagram',
    difficulty: 3,
    time: 90,
    stem: t`In a class of 40 students, 24 study French, 18 study Spanish and 6 study neither language.

A student who studies Spanish is chosen at random. What is the probability that this student also studies French?`,
    options: [t`$\dfrac{1}{5}$`, t`$\dfrac{1}{3}$`, t`$\dfrac{4}{9}$`, t`$\dfrac{9}{20}$`, t`$\dfrac{3}{5}$`, t`$\dfrac{17}{20}$`],
    answer: 2,
    hints: [t`First find how many students study both languages.`, t`The student is chosen from the Spanish students only.`],
    solution: t`$40 - 6 = 34$ students study at least one language, so the number who study both is
$$24 + 18 - 34 = 8.$$

The student is chosen from the 18 who study Spanish, of whom 8 also study French:
$$P(\text{French} \mid \text{Spanish}) = \frac{8}{18} = \frac{4}{9}.$$`,
    solutionDiagram: 'p3-m1-venn-sol',
    traps: {
      0: t`$\tfrac{8}{40}$ is the probability that a student chosen from the whole class studies both.`,
      1: t`$\tfrac{8}{24}$ is the probability that a *French* student also studies Spanish.`,
      3: t`$\tfrac{18}{40}$ is the probability that a student studies Spanish.`,
      4: t`$\tfrac{24}{40}$ ignores the information that the student studies Spanish.`,
      5: t`$\tfrac{34}{40}$ is the probability of studying French or Spanish.`,
    },
    insight: t`"Given that" shrinks the sample space: divide by the number in the given group, not the whole class.`,
    skills: ['Venn diagrams', 'conditional probability'],
  },
  {
    id: '3-M1-21',
    module: 'M1',
    n: 21,
    topic: 'M5',
    spec: ['M5.11'],
    title: 'Faces, edges and vertices of a truncated cube',
    difficulty: 3,
    time: 90,
    stem: t`Each of the eight corners of a cube is cut off by a plane through points on the three edges that meet at that corner. The cuts do not meet one another.

How many faces, edges and vertices does the new solid have?`,
    options: [
      t`14 faces, 36 edges, 24 vertices`,
      t`14 faces, 24 edges, 36 vertices`,
      t`8 faces, 36 edges, 24 vertices`,
      t`14 faces, 36 edges, 32 vertices`,
      t`14 faces, 30 edges, 18 vertices`,
      t`6 faces, 24 edges, 24 vertices`,
    ],
    answer: 0,
    hints: [t`Each cut adds one triangular face with three new edges and three new vertices, and removes one vertex of the cube.`],
    solution: t`- **Faces.** The 6 faces of the cube remain (now octagons), and each of the 8 cuts adds a triangle: $6 + 8 = 14$.
- **Vertices.** Each corner of the cube is replaced by the 3 corners of a triangle: $8 \times 3 = 24$.
- **Edges.** The 12 edges of the cube remain (shorter), and each triangle adds 3 new edges: $12 + 8 \times 3 = 36$.

Check with Euler's formula: $V - E + F = 24 - 36 + 14 = 2$ ✓`,
    traps: {
      1: t`Swaps the numbers of edges and vertices.`,
      2: t`Counts only the new triangular faces; the cube's six faces are still there.`,
      3: t`The cube's 8 original corners are cut off, so they are no longer vertices.`,
      5: t`Forgets the eight new triangular faces.`,
    },
    insight: t`Track what each cut adds and removes; Euler's formula $V - E + F = 2$ is a quick check for a solid like this.`,
    skills: ['3D shapes', 'faces, edges and vertices', "Euler's formula"],
  },
  {
    id: '3-M1-22',
    module: 'M1',
    n: 22,
    topic: 'M5',
    spec: ['M5.18', 'M5.7'],
    title: 'Height of a cuboid from the angle of its diagonal',
    difficulty: 3,
    time: 95,
    stem: t`$ABCDEFGH$ is a cuboid with base $ABCD$, where $AB = 3$ cm and $BC = 4$ cm. The diagonal $AG$ makes an angle of $30°$ with the base.`,
    diagram: 'p3-m1-cuboid',
    diagramAlt: 'Cuboid ABCDEFGH with base ABCD and top EFGH; AB is 3 cm and BC is 4 cm. The diagonal AG runs from A to the opposite top corner G, and the angle between AG and the base diagonal AC is 30 degrees.',
    prompt: t`What is the height of the cuboid?`,
    options: [t`$\dfrac{5}{2}$ cm`, t`$\dfrac{5\sqrt{3}}{3}$ cm`, t`$\dfrac{5\sqrt{3}}{2}$ cm`, t`$\dfrac{10\sqrt{3}}{3}$ cm`, t`$5\sqrt{3}$ cm`, t`$10$ cm`],
    answer: 1,
    hints: [t`The angle between $AG$ and the base is angle $GAC$, where $AC$ is the diagonal of the base.`, t`$\tan 30° = \dfrac{1}{\sqrt{3}}$.`],
    solution: t`The angle between $AG$ and the base is the angle between $AG$ and its projection $AC$ on the base.

By Pythagoras in the base, $AC = \sqrt{3^2 + 4^2} = 5$ cm.

Triangle $ACG$ has a right angle at $C$, with $CG$ equal to the height $h$:
$$\tan 30° = \frac{h}{5} \quad\Rightarrow\quad h = \frac{5}{\sqrt{3}} = \frac{5\sqrt{3}}{3}\ \text{cm}.$$`,
    traps: {
      0: t`Uses $\sin 30°$ with $AC$ as the hypotenuse; $AC$ is the side adjacent to the $30°$ angle.`,
      2: t`Uses $\cos 30°$; the height is opposite the angle and $AC$ is adjacent, so use tangent.`,
      3: t`$\tfrac{10\sqrt{3}}{3}$ cm is the length of the diagonal $AG$.`,
      4: t`Divides by $\tan 30°$ instead of multiplying.`,
    },
    insight: t`The angle between a line and a plane is the angle between the line and its projection onto the plane; find that projection with Pythagoras first.`,
    skills: ['3D trigonometry', 'Pythagoras in 3D', 'exact values'],
  },
  {
    id: '3-M1-23',
    module: 'M1',
    n: 23,
    topic: 'M4',
    spec: ['M4.10', 'M4.12a', 'M4.15'],
    title: 'Lines that meet in the first quadrant',
    difficulty: 4,
    time: 115,
    stem: t`The line $L$ has equation $2x + 3y = 12$ and the line $M$ has equation $y = mx + 1$.

For which values of $m$ do $L$ and $M$ meet at a point with $x > 0$ and $y > 0$?`,
    options: [t`$m > 0$`, t`$m > -\dfrac{2}{3}$`, t`$m < -\dfrac{1}{6}$`, t`$-\dfrac{2}{3} < m < -\dfrac{1}{6}$`, t`$m \ne -\dfrac{2}{3}$`, t`$m > -\dfrac{1}{6}$`],
    answer: 5,
    hints: [t`$M$ always passes through $(0, 1)$. $L$ crosses the axes at $(6, 0)$ and $(0, 4)$.`, t`Sketch the part of $L$ that lies in the first quadrant, and turn $M$ about $(0, 1)$.`],
    solution: t`**Graphically.** $L$ crosses the axes at $(6, 0)$ and $(0, 4)$, and $M$ always passes through $(0, 1)$, which lies between the origin and $(0, 4)$. The lines meet in the first quadrant exactly when $M$ hits the segment of $L$ between $(6, 0)$ and $(0, 4)$.

- The line through $(0, 1)$ and $(6, 0)$ has gradient $-\tfrac{1}{6}$.
- Any line through $(0, 1)$ with a greater gradient, including every positive gradient, meets that segment.

**Algebraically.** Substituting $y = mx + 1$ into $2x + 3y = 12$:
$$x = \frac{9}{2 + 3m}, \qquad y = \frac{12m + 2}{2 + 3m}.$$

$x > 0$ needs $2 + 3m > 0$, and then $y > 0$ needs $12m + 2 > 0$, i.e. $m > -\tfrac{1}{6}$. (If $2 + 3m < 0$, then $x < 0$.)

So the condition is $m > -\dfrac{1}{6}$.`,
    traps: {
      1: t`$m > -\tfrac{2}{3}$ only ensures $x > 0$; for $-\tfrac{2}{3} < m \le -\tfrac{1}{6}$ the lines meet on or below the $x$-axis.`,
      0: t`Negative gradients between $-\tfrac{1}{6}$ and $0$ also give a meeting point in the first quadrant.`,
      4: t`$m \ne -\tfrac{2}{3}$ only guarantees that the lines are not parallel, so they meet somewhere.`,
      3: t`For these gradients the lines meet with $x > 0$ but $y < 0$, below the $x$-axis.`,
    },
    insight: t`For a family of lines through a fixed point, sketch and rotate: the boundary cases are the lines through the ends of the target segment.`,
    skills: ['straight-line graphs', 'simultaneous equations', 'inequalities'],
  },
  {
    id: '3-M1-24',
    module: 'M1',
    n: 24,
    topic: 'M5',
    spec: ['M5.6'],
    title: 'Two reflections make a rotation',
    difficulty: 4,
    time: 110,
    stem: t`A shape is reflected in the line $x = 1$, and then the image is reflected in the line $y = x$.

Which single transformation has the same effect?`,
    options: [
      t`a rotation of $90°$ clockwise about $(1, 1)$`,
      t`a rotation of $90°$ anticlockwise about $(1, 1)$`,
      t`a rotation of $90°$ clockwise about $(0, 0)$`,
      t`a rotation of $180°$ about $(1, 1)$`,
      t`a reflection in the line $y = 1$`,
      t`a translation`,
    ],
    answer: 0,
    hints: [t`Follow a general point $(x, y)$: reflecting in $x = 1$ gives $(2 - x, y)$.`, t`Which point is left unchanged by both reflections?`],
    solution: t`Follow a general point:
$$(x, y) \xrightarrow{\ x = 1\ } (2 - x,\ y) \xrightarrow{\ y = x\ } (y,\ 2 - x).$$

The point where the mirror lines cross, $(1, 1)$, stays fixed, so this is a rotation about $(1, 1)$. Measured from $(1, 1)$, the displacement $(a, b) = (x - 1, y - 1)$ becomes $(y - 1, 1 - x) = (b, -a)$, which is a turn of $90°$ **clockwise**.

Check with a point: $(2, 1)$ goes to $(0, 1)$ and then to $(1, 0)$. Relative to $(1, 1)$, that is $(1, 0)$ turning to $(0, -1)$: $90°$ clockwise ✓

(Two reflections in lines that cross at an angle $\theta$ give a rotation through $2\theta$; here the lines cross at $45°$.)`,
    solutionDiagram: 'p3-m1-transform-sol',
    traps: {
      1: t`Does the reflections in the other order; the order matters, and swapping it reverses the direction of rotation.`,
      2: t`The centre of rotation is where the mirror lines cross, $(1, 1)$, not the origin.`,
      3: t`Two reflections give a half-turn only if the mirror lines are perpendicular; these lines cross at $45°$.`,
      5: t`Two reflections give a translation only if the mirror lines are parallel.`,
    },
    insight: t`Two reflections combine into a rotation about the point where the mirrors cross, through twice the angle between them (or a translation if the mirrors are parallel).`,
    skills: ['transformations', 'reflections', 'rotations'],
  },
  {
    id: '3-M1-25',
    module: 'M1',
    n: 25,
    topic: 'M7',
    spec: ['M7.7b', 'M4.16'],
    title: 'How many counters of each colour?',
    difficulty: 4,
    time: 115,
    stem: t`A bag contains 10 counters. Some are red and the rest are blue, and there are more red counters than blue ones. Two counters are taken at random without replacement.

The probability that the two counters are the same colour is $\dfrac{7}{15}$. How many blue counters are in the bag?`,
    options: [t`$4$`, t`$5$`, t`$6$`, t`$7$`, t`$8$`, t`$9$`],
    answer: 0,
    hints: [t`With $r$ red counters, $P(\text{both red}) = \dfrac{r}{10} \times \dfrac{r - 1}{9}$.`],
    solution: t`Let there be $r$ red counters and $10 - r$ blue ones. Without replacement,
$$P(\text{same colour}) = \frac{r(r-1) + (10 - r)(9 - r)}{10 \times 9} = \frac{7}{15}.$$

Multiplying by 90: $r^2 - r + 90 - 19r + r^2 = 42$, so
$$2r^2 - 20r + 48 = 0 \quad\Rightarrow\quad r^2 - 10r + 24 = 0 \quad\Rightarrow\quad (r - 4)(r - 6) = 0.$$

There are more red counters than blue, so $r = 6$ and there are **4** blue counters.

Check: $\dfrac{6 \times 5 + 4 \times 3}{90} = \dfrac{42}{90} = \dfrac{7}{15}$ ✓`,
    traps: {
      2: t`6 is the number of *red* counters.`,
      1: t`With 5 of each colour the probability would be $\tfrac{40}{90} = \tfrac{4}{9}$, not $\tfrac{7}{15}$.`,
    },
    insight: t`"Without replacement" means the second fraction has one fewer counter in total (and of that colour). An unknown number of counters leads to a quadratic.`,
    skills: ['probability without replacement', 'quadratic equations'],
  },
  {
    id: '3-M1-26',
    module: 'M1',
    n: 26,
    topic: 'M5',
    spec: ['M5.19'],
    title: 'Where two lines cross in a triangle',
    difficulty: 4,
    time: 120,
    stem: t`$OAB$ is a triangle with $\overrightarrow{OA} = \mathbf{a}$ and $\overrightarrow{OB} = \mathbf{b}$. $P$ is the point on $OA$ with $OP : PA = 1 : 2$, and $Q$ is the midpoint of $AB$. The lines $BP$ and $OQ$ meet at $R$.`,
    diagram: 'p3-m1-vectors',
    diagramAlt: 'Triangle OAB with vectors a along OA and b along OB. P is a third of the way from O to A, Q is the midpoint of AB, and the lines BP and OQ cross at R.',
    prompt: t`What is the ratio $BR : RP$?`,
    options: [t`$1 : 3$`, t`$1 : 2$`, t`$1 : 1$`, t`$2 : 1$`, t`$3 : 1$`, t`$4 : 1$`],
    answer: 4,
    hints: [
      t`Write $\overrightarrow{OR}$ in two ways: as $\lambda\overrightarrow{OQ}$, and as $\overrightarrow{OB} + \mu\overrightarrow{BP}$.`,
      t`$\mathbf{a}$ and $\mathbf{b}$ are not parallel, so you can compare the coefficients of $\mathbf{a}$ and of $\mathbf{b}$.`,
    ],
    solution: t`We have $\overrightarrow{OP} = \tfrac{1}{3}\mathbf{a}$ and $\overrightarrow{OQ} = \tfrac{1}{2}(\mathbf{a} + \mathbf{b})$.

**Along $OQ$.** $\overrightarrow{OR} = \lambda\overrightarrow{OQ} = \tfrac{\lambda}{2}\mathbf{a} + \tfrac{\lambda}{2}\mathbf{b}$.

**Along $BP$.** $\overrightarrow{OR} = \mathbf{b} + \mu\left(\tfrac{1}{3}\mathbf{a} - \mathbf{b}\right) = \tfrac{\mu}{3}\mathbf{a} + (1 - \mu)\mathbf{b}$.

$\mathbf{a}$ and $\mathbf{b}$ are not parallel, so the coefficients must match:
$$\frac{\lambda}{2} = \frac{\mu}{3}, \qquad \frac{\lambda}{2} = 1 - \mu.$$

So $\tfrac{\mu}{3} = 1 - \mu$, giving $\mu = \tfrac{3}{4}$ (and $\lambda = \tfrac{1}{2}$).

$R$ is $\tfrac{3}{4}$ of the way from $B$ to $P$, so $BR : RP = 3 : 1$.`,
    traps: {
      0: t`This is $RP : BR$, the ratio the wrong way round.`,
      2: t`$1 : 1$ is the ratio $OR : RQ$ ($\lambda = \tfrac{1}{2}$), not $BR : RP$.`,
      3: t`Assumes $R$ divides $BP$ like the centroid divides a median; $BP$ is not a median here.`,
    },
    insight: t`To find where two lines cross, write the position vector of the crossing point two ways and equate the coefficients of the two non-parallel vectors.`,
    skills: ['vectors', 'ratios in geometry'],
  },
  {
    id: '3-M1-27',
    module: 'M1',
    n: 27,
    topic: 'M5',
    spec: ['M5.17', 'M5.5'],
    title: 'Area of a trapezium from one small triangle',
    difficulty: 5,
    time: 140,
    stem: t`$ABCD$ is a trapezium in which $AB$ is parallel to $DC$ and $AB = 3 \times DC$. The diagonals $AC$ and $BD$ meet at $X$.

The area of triangle $DXC$ is $4\ \text{cm}^2$.`,
    diagram: 'p3-m1-trapezium',
    diagramAlt: 'Trapezium ABCD with the long side AB at the bottom, parallel to the short side DC at the top, which is one third as long. The diagonals AC and BD cross at X.',
    prompt: t`What is the area of the trapezium?`,
    options: [t`$40\ \text{cm}^2$`, t`$48\ \text{cm}^2$`, t`$52\ \text{cm}^2$`, t`$64\ \text{cm}^2$`, t`$100\ \text{cm}^2$`, t`$112\ \text{cm}^2$`],
    answer: 3,
    hints: [t`Triangles $DXC$ and $BXA$ are similar. What is their scale factor?`, t`Triangles $AXD$ and $DXC$ share a height from $D$; compare their bases $AX$ and $XC$.`],
    solution: t`**Similar triangles.** $AB \parallel DC$, so triangles $DXC$ and $BXA$ have equal angles (alternate angles, and vertically opposite angles at $X$). They are similar with scale factor $\dfrac{AB}{DC} = 3$, so
$$\text{area } BXA = 3^2 \times 4 = 36\ \text{cm}^2,$$
and $AX : XC = BX : XD = 3 : 1$.

**The side triangles.** Triangles $AXD$ and $CXD$ have the same height from $D$ to the line $AC$, so their areas are in the ratio of their bases, $AX : XC = 3 : 1$:
$$\text{area } AXD = 3 \times 4 = 12\ \text{cm}^2.$$

In the same way, triangle $BXC$ has area $12\ \text{cm}^2$.

**Total.**
$$4 + 36 + 12 + 12 = 64\ \text{cm}^2.$$

(Check: the area of the trapezium is $\tfrac{1}{2}(DC + AB)h$. With $DC = d$ and $AB = 3d$, triangle $DXC$ has height $\tfrac{h}{4}$, so $\tfrac{1}{2}d \cdot \tfrac{h}{4} = 4$ gives $dh = 32$, and the trapezium is $\tfrac{1}{2} \times 4d \times h = 2dh = 64$ ✓)`,
    solutionDiagram: 'p3-m1-trapezium-sol',
    traps: {
      0: t`Uses the length ratio 3 for the areas of the similar triangles (giving 12 instead of 36), or leaves out the two side triangles.`,
      2: t`Includes only one of the two side triangles, $AXD$ and $BXC$.`,
      5: t`Gives the side triangles the area 36 as well; they are not similar to $BXA$, and their areas follow from the ratio of the bases.`,
    },
    insight: t`The diagonals of a trapezium make two similar triangles (areas in the ratio $k^2$) and two equal side triangles (each $k$ times the small one).`,
    skills: ['similar triangles', 'area ratios', 'geometric reasoning'],
  },
];
