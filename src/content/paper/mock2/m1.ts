import type { Question } from '../../types';
import { STATEMENT_OPTIONS, ST } from '../shared';

const t = String.raw;

/**
 * Mock 2 (Forge) — Mathematics 1.
 * 27 questions, 40 minutes, no calculator. Built to feel like a real ESAT
 * Mathematics 1 module, pitched a little above real difficulty, and inside
 * the M1–M7 specification (no sine or cosine rule).
 */
export const M1: Question[] = [
  {
    id: '2-M1-01',
    module: 'M1',
    n: 1,
    topic: 'M1',
    spec: ['M1.1', 'M3.6'],
    title: 'Best buy with multi-buy offers',
    difficulty: 1,
    time: 65,
    stem: t`A shop sells the same rice in four sizes.

| Pack | Price |
|---|---|
| 500 g bag | £1.26 |
| 750 g bag | £1.65 |
| 1 kg bag | £2.30 |
| 5 kg sack | £10.75 |

This week there are also two offers:
- 500 g bags: **3 for the price of 2**
- 1 kg bags: **buy one, get a second half price**`,
    prompt: t`Which way of buying the rice gives the lowest cost per kilogram?`,
    options: [
      t`one 500 g bag`,
      t`one 750 g bag`,
      t`one 1 kg bag`,
      t`one 5 kg sack`,
      t`three 500 g bags on the 3 for 2 offer`,
      t`two 1 kg bags on the half-price offer`,
    ],
    answer: 4,
    hints: [t`Work out what 1 kg costs in each case.`, t`Three 500 g bags weigh 1.5 kg but cost the price of two bags.`],
    solution: t`Compare the cost of 1 kg in each case.

| Way of buying | Cost | Mass | Cost per kg |
|---|---|---|---|
| one 500 g bag | £1.26 | 0.5 kg | £2.52 |
| one 750 g bag | £1.65 | 0.75 kg | £2.20 |
| one 1 kg bag | £2.30 | 1 kg | £2.30 |
| one 5 kg sack | £10.75 | 5 kg | £2.15 |
| 3 for 2 on 500 g bags | £2.52 | 1.5 kg | £1.68 |
| half price on 1 kg bags | £3.45 | 2 kg | £1.725 |

The 3 for 2 offer is cheapest at £1.68 per kg, just ahead of the half-price offer at £1.725 per kg.`,
    traps: {
      3: t`The 5 kg sack is the cheapest *single* pack (£2.15 per kg), but both offers beat it.`,
      5: t`Half price on the second bag is only a quarter off overall: £2.30 + £1.15 = £3.45 for 2 kg, which is £1.725 per kg, slightly more than £1.68.`,
      1: t`£1.65 for 0.75 kg is £2.20 per kg, dearer than the sack and both offers.`,
    },
    insight: t`Turn every deal into one unit price before comparing. A multi-buy changes the quantity as well as the price.`,
    skills: ['unit pricing', 'best buy', 'proportion'],
  },
  {
    id: '2-M1-02',
    module: 'M1',
    n: 2,
    topic: 'M2',
    spec: ['M2.2', 'M2.4'],
    title: 'Order of operations with negative fractions',
    difficulty: 1,
    time: 70,
    stem: t`What is the value of
$$\frac{2\frac{1}{4} - 3 \times \left(-\frac{1}{2}\right)^{2}}{1\frac{1}{2} - \frac{3}{4} \div \left(-\frac{1}{2}\right)}\ ?$$`,
    options: [t`$-1$`, t`$0$`, t`$\dfrac{1}{2}$`, t`$\dfrac{4}{5}$`, t`$1$`, t`$2$`],
    answer: 2,
    hints: [t`Powers first, then multiplication and division, then addition and subtraction, separately in the numerator and in the denominator.`],
    solution: t`**Numerator.** Squaring comes first: $\left(-\tfrac{1}{2}\right)^2 = \tfrac{1}{4}$, so
$$2\tfrac{1}{4} - 3 \times \tfrac{1}{4} = 2\tfrac{1}{4} - \tfrac{3}{4} = 1\tfrac{1}{2}.$$

**Denominator.** Division comes before subtraction: $\tfrac{3}{4} \div \left(-\tfrac{1}{2}\right) = \tfrac{3}{4} \times (-2) = -\tfrac{3}{2}$, so
$$1\tfrac{1}{2} - \left(-\tfrac{3}{2}\right) = 3.$$

The value is $\dfrac{1\frac{1}{2}}{3} = \dfrac{1}{2}$.`,
    traps: {
      4: t`Takes $\left(-\tfrac{1}{2}\right)^2$ as $-\tfrac{1}{4}$, making the numerator $3$. A negative number squared is positive.`,
      1: t`Squares $3 \times \left(-\tfrac{1}{2}\right)$ instead of just $-\tfrac{1}{2}$: the power applies only to the bracket.`,
      0: t`Works the denominator from left to right, $(1\tfrac{1}{2} - \tfrac{3}{4}) \div (-\tfrac{1}{2}) = -\tfrac{3}{2}$, instead of dividing first.`,
      3: t`Multiplies by $-\tfrac{1}{2}$ in the denominator instead of dividing by it.`,
      5: t`This is the reciprocal of the correct value: the fraction has been turned upside down.`,
    },
    insight: t`Apply the order of operations separately above and below a fraction line, and remember that a squared negative is positive.`,
    skills: ['order of operations', 'fractions', 'negative numbers'],
  },
  {
    id: '2-M1-03',
    module: 'M1',
    n: 3,
    topic: 'M3',
    spec: ['M3.1', 'M1.2'],
    title: 'Real area from a map',
    difficulty: 2,
    time: 75,
    stem: t`On a map with scale $1 : 25\,000$, a lake has an area of $12\ \text{cm}^2$.

What is the actual area of the lake?`,
    options: [t`$0.03\ \text{km}^2$`, t`$0.075\ \text{km}^2$`, t`$0.3\ \text{km}^2$`, t`$0.75\ \text{km}^2$`, t`$3\ \text{km}^2$`, t`$7.5\ \text{km}^2$`],
    answer: 3,
    hints: [t`First find the real length that 1 cm on the map represents.`, t`Areas scale by the *square* of the length scale factor.`],
    solution: t`1 cm on the map represents $25\,000$ cm $= 250$ m $= 0.25$ km.

So $1\ \text{cm}^2$ on the map represents a square $0.25$ km by $0.25$ km:
$$0.25^2 = 0.0625\ \text{km}^2.$$

The lake's real area is
$$12 \times 0.0625 = 0.75\ \text{km}^2.$$

(In square metres: $12 \times 250^2 = 750\,000\ \text{m}^2$, and $1\ \text{km}^2 = 10^6\ \text{m}^2$.)`,
    traps: {
      4: t`Multiplies by the length scale only, $12 \times 0.25 = 3$. Areas scale by the square of the scale factor.`,
      5: t`Converts $750\,000\ \text{m}^2$ using $1\ \text{km}^2 = 100\,000\ \text{m}^2$; in fact $1\ \text{km}^2 = 1000^2 = 10^6\ \text{m}^2$.`,
    },
    insight: t`Convert the map scale to a real length per centimetre first, then square it for areas (cube it for volumes).`,
    skills: ['map scales', 'area scale factor', 'unit conversion'],
  },
  {
    id: '2-M1-04',
    module: 'M1',
    n: 4,
    topic: 'M2',
    spec: ['M2.7', 'M2.8'],
    title: 'Standard form with a fractional index',
    difficulty: 2,
    time: 80,
    stem: t`What is the value of
$$\frac{\sqrt{6.4 \times 10^{5}} \times 125^{-\frac{2}{3}}}{4 \times 10^{-2}}\ ?$$`,
    options: [t`$8 \times 10^{-2}$`, t`$1.28$`, t`$3.2 \times 10^{1}$`, t`$8 \times 10^{2}$`, t`$4 \times 10^{3}$`, t`$5 \times 10^{5}$`],
    answer: 3,
    hints: [t`Before taking the square root, rewrite $6.4 \times 10^5$ with an even power of 10.`, t`$125^{-\frac{2}{3}} = \dfrac{1}{\left(\sqrt[3]{125}\right)^2}$.`],
    solution: t`Rewrite with an even power of 10 before square-rooting:
$$\sqrt{6.4 \times 10^5} = \sqrt{64 \times 10^4} = 8 \times 10^2 = 800.$$

The negative fractional index means "cube root, square, then reciprocal":
$$125^{-\frac{2}{3}} = \frac{1}{5^2} = \frac{1}{25}.$$

So the numerator is $800 \div 25 = 32$, and
$$\frac{32}{4 \times 10^{-2}} = 8 \times 10^{2}.$$`,
    traps: {
      4: t`Uses $125^{-\frac{2}{3}} = \tfrac{1}{5}$: the cube root has been taken but not squared.`,
      5: t`Ignores the minus sign in the index, multiplying by $25$ instead of dividing.`,
      2: t`$32$ is the numerator; it still has to be divided by $4 \times 10^{-2}$.`,
      1: t`Multiplies by $4 \times 10^{-2}$ instead of dividing by it.`,
      0: t`Divides by $4 \times 10^{2}$ instead of $4 \times 10^{-2}$.`,
    },
    insight: t`To square-root a number in standard form, first make the power of 10 even: $6.4 \times 10^5 = 64 \times 10^4$.`,
    skills: ['standard form', 'fractional indices', 'negative indices'],
  },
  {
    id: '2-M1-05',
    module: 'M1',
    n: 5,
    topic: 'M4',
    spec: ['M4.7', 'M4.3'],
    title: 'Magnification from the lens formula',
    difficulty: 2,
    time: 80,
    stem: t`For a lens of focal length $f$, the distance $u$ of an object from the lens and the distance $v$ of its image satisfy
$$\frac{1}{f} = \frac{1}{u} + \frac{1}{v}.$$

The magnification is $m = \dfrac{v}{u}$.

Which of the following is an expression for $m$ in terms of $u$ and $f$?`,
    options: [
      t`$\dfrac{f}{u-f}$`,
      t`$\dfrac{f}{f-u}$`,
      t`$\dfrac{u}{u-f}$`,
      t`$\dfrac{u-f}{f}$`,
      t`$\dfrac{uf}{u-f}$`,
      t`$\dfrac{f}{u+f}$`,
    ],
    answer: 0,
    hints: [t`Make $\dfrac{1}{v}$ the subject and combine the two fractions on the right.`],
    solution: t`Rearrange for $\dfrac{1}{v}$ and combine over a common denominator:
$$\frac{1}{v} = \frac{1}{f} - \frac{1}{u} = \frac{u - f}{uf}, \qquad v = \frac{uf}{u-f}.$$

Then
$$m = \frac{v}{u} = \frac{uf}{u(u-f)} = \frac{f}{u-f}.$$

Check with $u = 3f$: the formula gives $m = \dfrac{f}{2f} = \dfrac{1}{2}$, and directly $\dfrac{1}{v} = \dfrac{1}{f} - \dfrac{1}{3f} = \dfrac{2}{3f}$, so $v = \dfrac{3f}{2}$ and $m = \dfrac{3f/2}{3f} = \dfrac{1}{2}$ ✓`,
    traps: {
      4: t`This is $v$, not $m$: it still has to be divided by $u$.`,
      1: t`Comes from $\dfrac{1}{v} = \dfrac{1}{u} - \dfrac{1}{f}$, a sign slip when rearranging.`,
      3: t`This is $\dfrac{1}{m}$: the fraction has been inverted.`,
    },
    insight: t`With reciprocal formulas, isolate the reciprocal, combine into a single fraction, and only then flip both sides.`,
    skills: ['rearranging formulae', 'algebraic fractions', 'substitution'],
  },
  {
    id: '2-M1-06',
    module: 'M1',
    n: 6,
    topic: 'M6',
    spec: ['M6.1a', 'M3.2'],
    title: 'Redrawing a pie chart',
    difficulty: 2,
    time: 75,
    stem: t`A pie chart shows how the 240 students in a year group travel to school. The sector for students who walk has an angle of $105°$.

Later, 60 more students join the year group, and **none** of them walk. The pie chart is redrawn to show all the students.

What is the angle of the sector for students who walk in the new pie chart?`,
    options: [t`$70°$`, t`$84°$`, t`$87.5°$`, t`$105°$`, t`$126°$`, t`$156°$`],
    answer: 1,
    hints: [t`First find how many students walk.`],
    solution: t`The number who walk is
$$\frac{105}{360} \times 240 = 70.$$

After the new students join there are $300$ students, and still $70$ walkers, so the new angle is
$$\frac{70}{300} \times 360° = 84°.$$

(Equivalently, the same sector is now a share of a larger whole: $105° \times \dfrac{240}{300} = 84°$.)`,
    traps: {
      3: t`The number of walkers stays the same, but they are now a smaller share of a larger group, so their angle shrinks.`,
      4: t`Scales the angle by $\dfrac{300}{240}$ instead of $\dfrac{240}{300}$.`,
      5: t`Assumes the 60 new students walk: $\dfrac{130}{300} \times 360° = 156°$.`,
      0: t`$70$ is the number of students who walk, not an angle.`,
    },
    insight: t`A pie-chart angle is a share of the total: when the total changes, convert the angle back to a frequency first.`,
    skills: ['pie charts', 'fractions of amounts'],
  },
  {
    id: '2-M1-07',
    module: 'M1',
    n: 7,
    topic: 'M3',
    spec: ['M3.3', 'M3.7', 'M3.2'],
    title: 'Fraction who take the bus',
    difficulty: 2,
    time: 75,
    stem: t`In a school, the ratio of boys to girls is $5 : 4$. Three-fifths of the boys and three-quarters of the girls travel to school by bus.

What fraction of all the pupils in the school travel by bus?`,
    options: [t`$\dfrac{9}{20}$`, t`$\dfrac{1}{2}$`, t`$\dfrac{5}{9}$`, t`$\dfrac{3}{5}$`, t`$\dfrac{2}{3}$`, t`$\dfrac{27}{40}$`],
    answer: 4,
    hints: [t`Let there be $5k$ boys and $4k$ girls.`],
    solution: t`Let there be $5k$ boys and $4k$ girls, so $9k$ pupils in all.

- Boys on the bus: $\tfrac{3}{5} \times 5k = 3k$.
- Girls on the bus: $\tfrac{3}{4} \times 4k = 3k$.

So $6k$ of the $9k$ pupils take the bus, a fraction of
$$\frac{6k}{9k} = \frac{2}{3}.$$`,
    traps: {
      5: t`Averages $\tfrac{3}{5}$ and $\tfrac{3}{4}$ without weighting them: there are more boys than girls.`,
      0: t`Multiplies $\tfrac{3}{5}$ by $\tfrac{3}{4}$; the two fractions apply to different groups.`,
      1: t`This is the fraction of the *bus users* who are boys, not the fraction of pupils who use the bus.`,
      2: t`This is the fraction of pupils who are boys.`,
    },
    insight: t`Turn a ratio into actual amounts ($5k$ and $4k$) so that fractions of each part can be added fairly.`,
    skills: ['ratio', 'fractions of amounts', 'weighted fractions'],
  },
  {
    id: '2-M1-08',
    module: 'M1',
    n: 8,
    topic: 'M4',
    spec: ['M4.11'],
    title: 'Turning point on the line y = x',
    difficulty: 2,
    time: 80,
    stem: t`The turning point of the curve $y = 2x^2 - 12x + k$ lies on the line $y = x$.

What is the value of $k$?`,
    options: [t`$-15$`, t`$6$`, t`$12$`, t`$15$`, t`$18$`, t`$21$`],
    answer: 5,
    hints: [t`Complete the square: take out the factor 2 from the $x$ terms first.`],
    solution: t`Complete the square, taking out the factor 2 first:
$$2x^2 - 12x + k = 2(x^2 - 6x) + k = 2(x-3)^2 - 18 + k.$$

The turning point is $(3,\ k - 18)$. It lies on $y = x$, so
$$k - 18 = 3 \quad\Rightarrow\quad k = 21.$$`,
    traps: {
      2: t`Forgets the factor 2 when completing the square, getting $(x-3)^2 - 9 + k$.`,
      1: t`Uses $x = -\dfrac{b}{a} = 6$ for the turning point; it is at $x = -\dfrac{b}{2a} = 3$.`,
      0: t`Sign slip: writes the turning point as $(3,\ k + 18)$.`,
      4: t`Makes the $y$-coordinate of the turning point $0$, as if the vertex were on the $x$-axis.`,
    },
    insight: t`For $y = a(x-p)^2 + q$ the turning point is $(p, q)$; with $a \neq 1$, factor $a$ out of the $x$ terms before completing the square.`,
    skills: ['completing the square', 'turning points'],
  },
  {
    id: '2-M1-09',
    module: 'M1',
    n: 9,
    topic: 'M4',
    spec: ['M4.12f'],
    title: 'Identify the trigonometric graph',
    difficulty: 2,
    time: 70,
    stem: t`The diagram shows the graph of $y = \mathrm{f}(x)$ for $0° \le x \le 360°$.`,
    diagram: 'p2-m1-trig',
    diagramAlt: 'A wave that starts at y = −1 when x = 0, reaches a maximum of 3 at x = 180 degrees and returns to −1 at x = 360 degrees. It crosses y = 0 at 60 and 300 degrees and passes through y = 1 at 90 and 270 degrees.',
    prompt: t`Which of the following could be $\mathrm{f}(x)$?`,
    options: [t`$2\cos x - 1$`, t`$1 - 2\cos x$`, t`$1 + 2\cos x$`, t`$1 - 2\sin x$`, t`$2 - \cos x$`, t`$1 - \cos 2x$`],
    answer: 1,
    hints: [t`Read off the value at $x = 0$ and where the maximum is.`],
    solution: t`The graph starts at $y = -1$ when $x = 0$, has its maximum $3$ at $x = 180°$, and repeats every $360°$.

Test $x = 0$ in each option: $2\cos 0 - 1 = 1$, $1 - 2\cos 0 = -1$, $1 + 2\cos 0 = 3$, $1 - 2\sin 0 = 1$, $2 - \cos 0 = 1$ and $1 - \cos 0 = 0$. Only $1 - 2\cos x$ gives $-1$.

It fits everywhere else too: at $x = 180°$, $1 - 2(-1) = 3$; at $90°$ and $270°$, $1 - 0 = 1$; and it is zero when $\cos x = \tfrac{1}{2}$, at $60°$ and $300°$.`,
    traps: {
      0: t`$2\cos x - 1$ is the reflection in the $x$-axis: it starts at $+1$ and has a minimum of $-3$ at $180°$.`,
      4: t`$2 - \cos x$ also peaks at $3$ when $x = 180°$, but its minimum is $1$, not $-1$.`,
      3: t`$1 - 2\sin x$ has its minimum at $90°$, not at $0°$.`,
      5: t`$1 - \cos 2x$ repeats every $180°$ and starts at $0$.`,
    },
    insight: t`To match a trig graph, test a few easy angles ($0°$, $90°$, $180°$) and check the period, the maximum and the minimum.`,
    skills: ['trigonometric graphs', 'transformations'],
  },
  {
    id: '2-M1-10',
    module: 'M1',
    n: 10,
    topic: 'M7',
    spec: ['M7.4', 'M7.2'],
    title: 'Expected number of blues on a biased spinner',
    difficulty: 2,
    time: 75,
    stem: t`A biased spinner can land on red, blue, green or yellow.

- The probability of red is $0.25$.
- The probability of blue is twice the probability of green.
- The probability of yellow is $0.05$ more than the probability of green.

The spinner is spun 400 times. How many times would you expect it to land on blue?`,
    options: [t`$70$`, t`$90$`, t`$100$`, t`$120$`, t`$140$`, t`$150$`],
    answer: 4,
    hints: [t`Let the probability of green be $g$; the four probabilities add up to 1.`],
    solution: t`Let $P(\text{green}) = g$. Then $P(\text{blue}) = 2g$ and $P(\text{yellow}) = g + 0.05$. The outcomes are exhaustive and mutually exclusive, so
$$0.25 + 2g + g + (g + 0.05) = 1 \quad\Rightarrow\quad 4g = 0.7 \quad\Rightarrow\quad g = 0.175.$$

So $P(\text{blue}) = 0.35$, and the expected number of blues in 400 spins is
$$0.35 \times 400 = 140.$$`,
    traps: {
      5: t`Leaves out the extra $0.05$ for yellow, giving $4g = 0.75$.`,
      0: t`$70$ is the expected number of greens.`,
      1: t`$90$ is the expected number of yellows.`,
      2: t`$100$ is the expected number of reds.`,
    },
    insight: t`The probabilities of exhaustive, mutually exclusive outcomes sum to 1; expected frequency = probability × number of trials.`,
    skills: ['probability', 'expected frequency', 'forming equations'],
  },
  {
    id: '2-M1-11',
    module: 'M1',
    n: 11,
    topic: 'M4',
    spec: ['M4.2', 'M4.1'],
    title: 'Negative and fractional powers in algebra',
    difficulty: 2,
    time: 80,
    stem: t`Given that $x > 0$ and $y > 0$, simplify
$$\left(27x^{6}y^{-3}\right)^{-\frac{2}{3}} \times \left(9x^{2}y\right)^{\frac{1}{2}}.$$`,
    options: [
      t`$\dfrac{y^{5/2}}{3x^{3}}$`,
      t`$\dfrac{y^{5/2}}{x^{3}}$`,
      t`$\dfrac{y^{5/2}}{9x^{3}}$`,
      t`$\dfrac{y^{5/2}}{3x^{4}}$`,
      t`$\dfrac{1}{3x^{3}y^{3/2}}$`,
      t`$\dfrac{27x^{5}}{y^{3/2}}$`,
    ],
    answer: 0,
    hints: [t`Apply the power to each factor: the number, the power of $x$ and the power of $y$.`, t`$27^{-\frac{2}{3}} = \dfrac{1}{9}$.`],
    solution: t`Raise each factor to the power:
$$\left(27x^{6}y^{-3}\right)^{-\frac{2}{3}} = 27^{-\frac{2}{3}}\,x^{-4}\,y^{2} = \frac{y^2}{9x^4},$$
$$\left(9x^{2}y\right)^{\frac{1}{2}} = 3\,x\,y^{\frac{1}{2}}.$$

Multiplying,
$$\frac{y^2}{9x^4} \times 3xy^{\frac{1}{2}} = \frac{3\,y^{5/2}}{9\,x^{3}} = \frac{y^{5/2}}{3x^{3}}.$$`,
    traps: {
      1: t`Takes $27^{-\frac{2}{3}}$ as $\tfrac{1}{3}$: the cube root has been found but not squared.`,
      2: t`Forgets to take the square root of the 9 in the second bracket.`,
      3: t`Forgets the factor $x$ from the second bracket.`,
      4: t`Sign slip with $y$: $\left(y^{-3}\right)^{-\frac{2}{3}} = y^{2}$, not $y^{-2}$.`,
      5: t`Ignores the minus sign in the first power, using $\tfrac{2}{3}$ instead of $-\tfrac{2}{3}$.`,
    },
    insight: t`A power outside a bracket multiplies every index inside it, and applies to the number too.`,
    skills: ['index laws', 'fractional indices', 'negative indices'],
  },
  {
    id: '2-M1-12',
    module: 'M1',
    n: 12,
    topic: 'M2',
    spec: ['M2.1', 'M2.9'],
    title: 'Ordering five close numbers',
    difficulty: 3,
    time: 95,
    stem: t`Five numbers are defined as follows:
$$p = \frac{5}{7}, \quad q = 0.7\dot{1}, \quad r = 0.\dot{7}\dot{1}, \quad s = \frac{12}{17}, \quad t = \frac{1}{\sqrt{2}}.$$

Which of the following lists them in increasing order?`,
    options: [
      t`$t < s < q < p < r$`,
      t`$s < t < q < p < r$`,
      t`$s < q < t < p < r$`,
      t`$s < t < p < q < r$`,
      t`$s < t < r < p < q$`,
      t`$t < s < p < q < r$`,
    ],
    answer: 1,
    hints: [t`In $0.7\dot{1}$ only the 1 recurs; in $0.\dot{7}\dot{1}$ the block "71" recurs.`, t`$s$ and $t$ are very close. Compare their squares exactly.`],
    solution: t`Write each as a decimal:

- $q = 0.7111\ldots$ and $r = 0.717171\ldots$
- $p = \dfrac{5}{7} = 0.714285\ldots$
- $s = \dfrac{12}{17} = 0.7058\ldots$ and $t = \dfrac{1}{\sqrt{2}} = 0.7071\ldots$

$s$ and $t$ agree to two decimal places, so compare them exactly using squares:
$$s^2 = \frac{144}{289}, \qquad t^2 = \frac{1}{2} = \frac{144.5}{289}.$$

So $s^2 < t^2$, and since both are positive, $s < t$. In increasing order:
$$s < t < q < p < r.$$`,
    traps: {
      0: t`$\dfrac{12}{17}$ is just *below* $\dfrac{1}{\sqrt{2}}$: $\left(\tfrac{12}{17}\right)^2 = \tfrac{144}{289}$, which is less than $\tfrac{1}{2}$.`,
      3: t`$\dfrac{5}{7} = 0.7142\ldots$ is larger than $0.7\dot{1} = 0.7111\ldots$`,
      4: t`Reads the recurring decimals the wrong way round: $0.7\dot{1} = 0.7111\ldots$ but $0.\dot{7}\dot{1} = 0.7171\ldots$`,
    },
    insight: t`When two numbers agree to several decimal places, compare them exactly: square both, or cross-multiply.`,
    skills: ['ordering numbers', 'recurring decimals', 'surds'],
  },
  {
    id: '2-M1-13',
    module: 'M1',
    n: 13,
    topic: 'M4',
    spec: ['M4.10', 'M4.9', 'M5.10'],
    title: 'Triangle between perpendicular lines',
    difficulty: 3,
    time: 100,
    stem: t`The line $L_1$ has equation $x - 2y = 2$.

The line $L_2$ passes through the point $(-1, 2)$ and is perpendicular to $L_1$.

What is the area of the triangle enclosed by $L_1$, $L_2$ and the $y$-axis?`,
    options: [t`$\dfrac{1}{5}$`, t`$\dfrac{2}{5}$`, t`$\dfrac{4}{5}$`, t`$1$`, t`$\dfrac{25}{8}$`, t`$\dfrac{25}{3}$`],
    answer: 0,
    hints: [t`Write $L_1$ as $y = mx + c$. Perpendicular gradients multiply to $-1$.`, t`Use the side along the $y$-axis as the base of the triangle.`],
    solution: t`$L_1$ is $y = \tfrac{1}{2}x - 1$: gradient $\tfrac{1}{2}$, crossing the $y$-axis at $(0, -1)$.

$L_2$ has gradient $-2$ and passes through $(-1, 2)$:
$$y - 2 = -2(x + 1) \quad\Rightarrow\quad y = -2x,$$
so it crosses the $y$-axis at the origin.

The lines meet where $x - 2(-2x) = 2$, so $x = \tfrac{2}{5}$ and $y = -\tfrac{4}{5}$.

The triangle has vertices $(0, 0)$, $(0, -1)$ and $\left(\tfrac{2}{5}, -\tfrac{4}{5}\right)$. Its base on the $y$-axis has length 1 and its height (the horizontal distance to the third vertex) is $\tfrac{2}{5}$:
$$\text{area} = \frac{1}{2} \times 1 \times \frac{2}{5} = \frac{1}{5}.$$`,
    solutionDiagram: 'p2-m1-lines-sol',
    traps: {
      1: t`Forgets the $\tfrac{1}{2}$ in the area of a triangle.`,
      2: t`This is the triangle enclosed with the $x$-axis instead of the $y$-axis.`,
      3: t`This is the triangle cut off by $L_1$ and both axes.`,
      4: t`Uses gradient $-\tfrac{1}{2}$ for $L_2$: a perpendicular gradient is the *negative reciprocal*, $-2$.`,
      5: t`Uses gradient $2$ for $L_2$: the negative reciprocal of $\tfrac{1}{2}$ is $-2$.`,
    },
    insight: t`Perpendicular gradients multiply to $-1$. For a triangle with one side on an axis, use that side as the base and the other coordinate of the far vertex as the height.`,
    skills: ['perpendicular lines', 'intersections', 'area on coordinate axes'],
  },
  {
    id: '2-M1-14',
    module: 'M1',
    n: 14,
    topic: 'M2',
    spec: ['M2.5'],
    title: 'Counting multiples of 5 with distinct digits',
    difficulty: 3,
    time: 95,
    stem: t`How many three-digit numbers are multiples of 5 and have three different digits?`,
    options: [t`$72$`, t`$128$`, t`$136$`, t`$144$`, t`$162$`, t`$180$`],
    answer: 2,
    hints: [t`Split into two cases: numbers ending in 0 and numbers ending in 5.`, t`In each case, choose the first digit before the middle one.`],
    solution: t`A multiple of 5 ends in 0 or 5. Count each case, choosing the first digit and then the middle digit.

**Ending in 0.** First digit: any of 1–9 (9 ways). Middle digit: any digit except the first digit and 0 (8 ways). That is $9 \times 8 = 72$ numbers.

**Ending in 5.** First digit: 1–9 but not 5 (8 ways). Middle digit: any digit except the first digit and 5 (8 ways). That is $8 \times 8 = 64$ numbers.

Total: $72 + 64 = 136$.`,
    traps: {
      3: t`Treats "ending in 5" like "ending in 0", allowing 9 first digits; but the first digit can be neither 0 nor 5.`,
      5: t`$180$ counts every three-digit multiple of 5, ignoring the rule that the digits must differ.`,
      0: t`Counts only the numbers ending in 0.`,
      4: t`$9 \times 9 \times 2$ only makes the middle digit differ from the first, not from the last.`,
    },
    insight: t`With "all digits different" and a restricted first digit, split into cases and fill the most restricted place first.`,
    skills: ['counting', 'product rule', 'case analysis'],
  },
  {
    id: '2-M1-15',
    module: 'M1',
    n: 15,
    topic: 'M3',
    spec: ['M3.11', 'M3.8'],
    title: 'Original value after depreciation',
    difficulty: 3,
    time: 100,
    stem: t`The value of a car falls by 20% during its first year and by 15% during each year after that.

After 3 years the car is worth £13 872. What was it worth when new?`,
    options: [t`£20 400`, t`£22 015`, t`£22 588`, t`£24 000`, t`£24 771`, t`£27 744`],
    answer: 3,
    hints: [t`Each year multiplies the value by a fixed factor: 0.8 for the first year and 0.85 for each later year.`, t`Undo the years one at a time by dividing.`],
    solution: t`After 3 years the value is
$$V \times 0.8 \times 0.85 \times 0.85 = 0.578\,V.$$

Work backwards by dividing, one year at a time:
$$13\,872 \div 0.85 = 16\,320, \qquad 16\,320 \div 0.85 = 19\,200, \qquad 19\,200 \div 0.8 = 24\,000.$$

The car was worth **£24 000** when new. (Check: $24\,000 \times 0.578 = 13\,872$ ✓)`,
    traps: {
      1: t`Increases the value by 15%, 15% and 20% instead of dividing by the multipliers: undoing a 15% fall is not the same as a 15% rise.`,
      2: t`Uses a 15% fall for all three years.`,
      4: t`Treats the two 15% falls as a single 30% fall, dividing by $0.8 \times 0.7$.`,
      5: t`Adds the percentages ($20 + 15 + 15 = 50\%$) and halves: compound changes multiply.`,
      0: t`Undoes only two of the three years.`,
    },
    insight: t`To reverse a percentage change, divide by the multiplier. Successive changes multiply; they never simply add.`,
    skills: ['reverse percentages', 'compound decay', 'multipliers'],
  },
  {
    id: '2-M1-16',
    module: 'M1',
    n: 16,
    topic: 'M4',
    spec: ['M4.8', 'M4.4'],
    title: 'Which are identities?',
    difficulty: 3,
    time: 100,
    stem: t`Consider the following statements.`,
    statements: [
      t`$(x+3)^2 - (x-3)^2 \equiv 12x$`,
      t`$(2x-1)(x+4) - (x+2)^2 \equiv x^2 + 3x - 6$`,
      t`$x(x+1)(x+2) - (x+1)^3 \equiv -x - 1$`,
    ],
    prompt: t`Which of these are identities (true for every value of $x$)?`,
    options: STATEMENT_OPTIONS,
    answer: ST.s13,
    hints: [t`An identity must hold for every $x$; a single value where the two sides differ is enough to reject it. Try $x = 0$.`],
    solution: t`**Statement 1.** Use the difference of two squares:
$$(x+3)^2 - (x-3)^2 = \big[(x+3) - (x-3)\big]\big[(x+3) + (x-3)\big] = 6 \times 2x = 12x. \quad ✓$$

**Statement 2.** Expand: $(2x-1)(x+4) = 2x^2 + 7x - 4$ and $(x+2)^2 = x^2 + 4x + 4$, so the left side is $x^2 + 3x - 8$, not $x^2 + 3x - 6$. (At $x = 0$ the sides are $-8$ and $-6$.) ✗

**Statement 3.** Since $x(x+2) = x^2 + 2x = (x+1)^2 - 1$,
$$x(x+1)(x+2) = (x+1)\big[(x+1)^2 - 1\big] = (x+1)^3 - (x+1),$$
so the left side equals $-(x+1) = -x - 1$. ✓

Statements 1 and 3 only.`,
    traps: {
      [ST.all]: t`Statement 2 fails: the constant term is $-4 - 4 = -8$, not $-6$. Substituting $x = 0$ shows it immediately.`,
      [ST.s1]: t`Statement 3 is also an identity: $x(x+2) = (x+1)^2 - 1$.`,
    },
    insight: t`To disprove an identity, one counterexample is enough; to prove one, rearrange one side into the other exactly.`,
    skills: ['identities', 'expanding brackets', 'difference of two squares'],
  },
  {
    id: '2-M1-17',
    module: 'M1',
    n: 17,
    topic: 'M5',
    spec: ['M5.13', 'M5.18', 'M5.7'],
    title: 'Returning to harbour',
    difficulty: 3,
    time: 100,
    stem: t`A ship leaves a harbour $H$ and sails $10$ km on a bearing of $060°$. It then sails $10\sqrt{3}$ km on a bearing of $150°$.

How far is the ship from $H$, and on what bearing must it sail to return directly to $H$?`,
    options: [
      t`20 km on a bearing of $120°$`,
      t`20 km on a bearing of $240°$`,
      t`20 km on a bearing of $270°$`,
      t`$(10 + 10\sqrt{3})$ km on a bearing of $120°$`,
      t`20 km on a bearing of $300°$`,
      t`$(10 + 10\sqrt{3})$ km on a bearing of $300°$`,
    ],
    answer: 4,
    hints: [t`The change of direction from $060°$ to $150°$ is $90°$.`, t`$\tan 60° = \sqrt{3}$.`],
    solution: t`The ship turns from $060°$ to $150°$, a change of $90°$, so the two legs are perpendicular.

**Distance.** By Pythagoras, $\sqrt{10^2 + (10\sqrt{3})^2} = \sqrt{400} = 20$ km.

**Bearing.** In the right-angled triangle, the angle at $H$ between the first leg and the line to the ship satisfies
$$\tan\theta = \frac{10\sqrt{3}}{10} = \sqrt{3} \quad\Rightarrow\quad \theta = 60°.$$

So the ship is on a bearing of $060° + 60° = 120°$ from $H$. The bearing of $H$ from the ship is the back bearing:
$$120° + 180° = 300°.$$`,
    solutionDiagram: 'p2-m1-bearings-sol',
    traps: {
      0: t`$120°$ is the bearing of the ship from $H$; the return journey is the back bearing, $300°$.`,
      1: t`$240°$ reverses only the first leg.`,
      2: t`Takes the angle at $H$ as $30°$, mixing up the opposite and adjacent sides.`,
      3: t`Adds the lengths of the two legs; the direct distance comes from Pythagoras.`,
      5: t`Adds the lengths of the two legs; the direct distance comes from Pythagoras.`,
    },
    insight: t`Check the angle between successive bearings: a $90°$ turn gives a right-angled triangle. A back bearing differs by $180°$.`,
    skills: ['bearings', 'Pythagoras', 'exact trigonometric values'],
  },
  {
    id: '2-M1-18',
    module: 'M1',
    n: 18,
    topic: 'M4',
    spec: ['M4.16', 'M4.1'],
    title: 'Three consecutive odd numbers',
    difficulty: 3,
    time: 90,
    stem: t`The squares of three consecutive odd numbers add up to 515.

What is the product of the smallest and the largest of the three numbers?`,
    options: [t`$143$`, t`$165$`, t`$168$`, t`$169$`, t`$195$`, t`$2145$`],
    answer: 1,
    hints: [t`Call the middle number $m$, so the others are $m - 2$ and $m + 2$.`],
    solution: t`Let the numbers be $m - 2$, $m$ and $m + 2$. Then
$$(m-2)^2 + m^2 + (m+2)^2 = 3m^2 + 8 = 515 \quad\Rightarrow\quad m^2 = 169.$$

The product required is
$$(m-2)(m+2) = m^2 - 4 = 165.$$

(The numbers are $11, 13, 15$, or $-15, -13, -11$; either way the product is $165$.)`,
    traps: {
      0: t`$143 = 11 \times 13$ multiplies the two smallest numbers.`,
      4: t`$195 = 13 \times 15$ multiplies the two largest numbers.`,
      3: t`$169$ is the square of the middle number.`,
      5: t`$2145$ is the product of all three numbers.`,
    },
    insight: t`Put the unknown in the middle of a symmetric set: the cross terms cancel and $m^2 - 4$ appears without finding $m$.`,
    skills: ['forming equations', 'quadratics', 'difference of two squares'],
  },
  {
    id: '2-M1-19',
    module: 'M1',
    n: 19,
    topic: 'M6',
    spec: ['M6.1b', 'M6.3', 'M4.15'],
    title: 'Missing lines on a vertical line chart',
    difficulty: 3,
    time: 105,
    stem: t`The vertical line chart shows the number of goals scored in each of 20 football matches. The lines for 1 goal and for 3 goals have been left out.

The mean number of goals per match is $2.1$.`,
    diagram: 'p2-m1-goals',
    diagramAlt: 'Vertical line chart of goals per match: 0 goals in 3 matches, 2 goals in 5 matches, 4 goals in 2 matches, 5 goals in 1 match. The lines for 1 goal and 3 goals are missing and marked with question marks.',
    prompt: t`In what fraction of the matches were more goals scored than the mean?`,
    options: [t`$\dfrac{3}{10}$`, t`$\dfrac{7}{20}$`, t`$\dfrac{2}{5}$`, t`$\dfrac{9}{20}$`, t`$\dfrac{1}{2}$`, t`$\dfrac{13}{20}$`],
    answer: 2,
    hints: [t`Let $a$ matches have 1 goal and $b$ matches have 3 goals. Write one equation for the number of matches and one for the total number of goals.`],
    solution: t`Let $a$ matches have 1 goal and $b$ matches have 3 goals. The chart shows $3 + 5 + 2 + 1 = 11$ matches, so
$$a + b = 9.$$

The total number of goals is $2.1 \times 20 = 42$:
$$0 \times 3 + 1 \times a + 2 \times 5 + 3 \times b + 4 \times 2 + 5 \times 1 = 42 \quad\Rightarrow\quad a + 3b = 19.$$

Subtracting, $2b = 10$, so $b = 5$ and $a = 4$.

More goals than the mean ($2.1$) means 3, 4 or 5 goals: $5 + 2 + 1 = 8$ matches, which is $\dfrac{8}{20} = \dfrac{2}{5}$.`,
    traps: {
      1: t`Swaps the two missing frequencies ($b = 4$, $a = 5$).`,
      5: t`Includes the matches with 2 goals, but $2 < 2.1$.`,
    },
    insight: t`Two unknown frequencies need two equations: one from the total frequency and one from the total of the data (mean × frequency).`,
    skills: ['vertical line charts', 'mean from frequencies', 'simultaneous equations'],
  },
  {
    id: '2-M1-20',
    module: 'M1',
    n: 20,
    topic: 'M4',
    spec: ['M4.18', 'M4.16'],
    title: 'Unknown multiplier in a term-to-term rule',
    difficulty: 3,
    time: 100,
    stem: t`A sequence is defined by
$$u_1 = 2, \qquad u_{n+1} = k\,u_n + 3,$$
where $k$ is a constant. Given that $u_3 = 23$, what is the sum of all the possible values of $k$?`,
    options: [t`$-10$`, t`$-4$`, t`$-\dfrac{3}{2}$`, t`$\dfrac{3}{2}$`, t`$\dfrac{5}{2}$`, t`$\dfrac{13}{2}$`],
    answer: 2,
    hints: [t`Write $u_2$ and then $u_3$ in terms of $k$.`],
    solution: t`Apply the rule twice:
$$u_2 = 2k + 3, \qquad u_3 = k(2k + 3) + 3 = 2k^2 + 3k + 3.$$

Setting $u_3 = 23$:
$$2k^2 + 3k - 20 = 0 \quad\Rightarrow\quad (2k - 5)(k + 4) = 0,$$
so $k = \dfrac{5}{2}$ or $k = -4$. Both work: with $k = \tfrac{5}{2}$ the sequence is $2, 8, 23$, and with $k = -4$ it is $2, -5, 23$.

The sum of the possible values is $\dfrac{5}{2} + (-4) = -\dfrac{3}{2}$.`,
    traps: {
      4: t`This is only one of the two values; $k = -4$ also gives $u_3 = 23$.`,
      1: t`This is only one of the two values; $k = \tfrac{5}{2}$ also gives $u_3 = 23$.`,
      3: t`Sign slip: the roots of $2k^2 + 3k - 20 = 0$ add up to $-\tfrac{3}{2}$.`,
      0: t`$-10$ is the product of the two values, not their sum.`,
    },
    insight: t`An unknown in a term-to-term rule can lead to a quadratic: check both roots, since both may give valid sequences.`,
    skills: ['term-to-term rules', 'quadratic equations'],
  },
  {
    id: '2-M1-21',
    module: 'M1',
    n: 21,
    topic: 'M5',
    spec: ['M5.3', 'M5.5', 'M5.4'],
    title: 'What must the quadrilateral be?',
    difficulty: 3,
    time: 100,
    stem: t`Consider the following statements about quadrilaterals.`,
    statements: [
      t`If the diagonals of a quadrilateral are perpendicular and equal in length, it must be a square.`,
      t`If a quadrilateral has one pair of parallel sides and its other two sides are equal in length, it must be a parallelogram.`,
      t`If the diagonals of a parallelogram are equal in length, it must be a rectangle.`,
    ],
    prompt: t`Which of the statements is/are correct?`,
    options: STATEMENT_OPTIONS,
    answer: ST.s3,
    hints: [t`For each "must be", look for a counterexample: think about kites and isosceles trapezia.`],
    solution: t`**Statement 1.** False. The diagonals of a square also *bisect* each other. A kite can have perpendicular diagonals of equal length that do not bisect each other: for example, the quadrilateral with vertices $(-1, 0)$, $(0, 0.5)$, $(1, 0)$, $(0, -1.5)$. ✗

**Statement 2.** False. An isosceles trapezium has one pair of parallel sides and its other two sides equal, but it is not a parallelogram. ✗

**Statement 3.** True. In parallelogram $ABCD$ with $AC = BD$, triangles $ABC$ and $DCB$ have $AB = DC$, $BC$ in common and $AC = DB$, so they are congruent (SSS). Hence $\angle ABC = \angle DCB$. These are co-interior angles between the parallel sides $AB$ and $DC$, so they add to $180°$: each is $90°$, and the parallelogram is a rectangle. ✓

Statement 3 only.`,
    traps: {
      [ST.s13]: t`Statement 1 is false: a kite can have equal, perpendicular diagonals. A square's diagonals must also bisect each other.`,
      [ST.s23]: t`Statement 2 is false: an isosceles trapezium is a counterexample.`,
      [ST.all]: t`Statements 1 and 2 both have counterexamples: a kite and an isosceles trapezium.`,
    },
    insight: t`"Must be" statements fall to a single counterexample. Kites and isosceles trapezia break most tempting rules.`,
    skills: ['properties of quadrilaterals', 'congruence', 'counterexamples'],
  },
  {
    id: '2-M1-22',
    module: 'M1',
    n: 22,
    topic: 'M4',
    spec: ['M4.17'],
    title: 'Lattice points in a region',
    difficulty: 3,
    time: 100,
    stem: t`How many points $(x, y)$, where $x$ and $y$ are both integers, satisfy all three of these inequalities?
$$y < 2x + 1, \qquad x + y \le 6, \qquad y \ge 1$$`,
    options: [t`$7$`, t`$8$`, t`$10$`, t`$12$`, t`$14$`, t`$15$`],
    answer: 3,
    hints: [t`For each integer value of $y$ from 1 upwards, find the range of allowed $x$.`, t`$y < 2x + 1$ means $x > \dfrac{y-1}{2}$, strictly.`],
    solution: t`Rewrite the first two inequalities as bounds on $x$: $x > \dfrac{y-1}{2}$ and $x \le 6 - y$. Then go row by row:

| $y$ | $x$ must satisfy | integer $x$ | points |
|---|---|---|---|
| 1 | $0 < x \le 5$ | 1 to 5 | 5 |
| 2 | $0.5 < x \le 4$ | 1 to 4 | 4 |
| 3 | $1 < x \le 3$ | 2, 3 | 2 |
| 4 | $1.5 < x \le 2$ | 2 | 1 |
| 5 | $2 < x \le 1$ | none | 0 |

Total: $5 + 4 + 2 + 1 = 12$ points.`,
    solutionDiagram: 'p2-m1-region-sol',
    traps: {
      4: t`Treats $y < 2x + 1$ as $\le$, wrongly including $(0, 1)$ and $(1, 3)$, which lie on that boundary.`,
      1: t`Treats $x + y \le 6$ as a strict inequality, losing the points on that line.`,
      0: t`Treats $y \ge 1$ as $y > 1$, losing the whole bottom row.`,
    },
    insight: t`Count lattice points row by row, and check every boundary: strict inequalities (dashed lines) exclude the points on them.`,
    skills: ['inequalities', 'regions', 'systematic counting'],
  },
  {
    id: '2-M1-23',
    module: 'M1',
    n: 23,
    topic: 'M5',
    spec: ['M5.9c', 'M5.9f'],
    title: 'Angle in a cyclic quadrilateral',
    difficulty: 3,
    time: 100,
    stem: t`The points $A$, $B$, $C$ and $D$ lie on a circle, and the diagonals $AC$ and $BD$ are drawn.

Angle $BAD = 105°$ and angle $ADB = 38°$.`,
    diagram: 'p2-m1-cyclic',
    diagramAlt: 'A circle through A (upper left), B (upper right), C (bottom) and D (left), with quadrilateral ABCD and diagonals AC and BD. Angle BAD is marked 105 degrees, angle ADB is marked 38 degrees, and angle ACD is marked x.',
    prompt: t`What is the size of angle $ACD$, marked $x$?`,
    options: [t`$37°$`, t`$38°$`, t`$43°$`, t`$52°$`, t`$67°$`, t`$75°$`],
    answer: 0,
    hints: [t`Find angle $BCD$ first.`, t`Angles $ACB$ and $ADB$ stand on the same chord $AB$.`],
    solution: t`Opposite angles of a cyclic quadrilateral add up to $180°$:
$$\angle BCD = 180° - 105° = 75°.$$

Angles $ACB$ and $ADB$ are both subtended by the chord $AB$, in the same segment, so they are equal:
$$\angle ACB = \angle ADB = 38°.$$

Therefore
$$x = \angle ACD = \angle BCD - \angle ACB = 75° - 38° = 37°.$$`,
    traps: {
      5: t`$75°$ is the whole of angle $BCD$; angle $ACB$ must be taken away.`,
      1: t`Angle $ADB$ is equal to angle $ACB$ (same chord $AB$), not to angle $ACD$.`,
      4: t`$105° - 38°$ combines angles that are not related by any circle theorem.`,
    },
    insight: t`Name the chord each angle stands on: angles subtended by the same chord in the same segment are equal.`,
    skills: ['circle theorems', 'cyclic quadrilaterals', 'angles in the same segment'],
  },
  {
    id: '2-M1-24',
    module: 'M1',
    n: 24,
    topic: 'M5',
    spec: ['M5.14', 'M4.16', 'M1.2'],
    title: 'Depth of water in a trough',
    difficulty: 4,
    time: 120,
    stem: t`A water trough is a prism of length 1 m. Its cross-section is an isosceles trapezium that is 40 cm wide at the bottom, 80 cm wide at the top and 30 cm deep.`,
    diagram: 'p2-m1-trough',
    diagramAlt: 'Cross-section of the trough: an isosceles trapezium with a 40 cm bottom, an 80 cm top and a depth of 30 cm, holding water to an unknown depth h. Not to scale.',
    prompt: t`The trough contains 75 litres of water. How deep is the water?`,
    options: [t`9.375 cm`, t`12.5 cm`, t`15 cm`, t`18.75 cm`, t`20 cm`, t`22.5 cm`],
    answer: 2,
    hints: [t`75 litres in a 100 cm long prism means a cross-section of water of $750\ \text{cm}^2$.`, t`Each sloping side moves out 20 cm over the 30 cm depth, so at depth $h$ the water surface is $40 + \tfrac{4}{3}h$ cm wide.`],
    solution: t`75 litres $= 75\,000\ \text{cm}^3$. The trough is 100 cm long, so the water's cross-section has area $750\ \text{cm}^2$.

Each sloping side moves outwards 20 cm over the full 30 cm depth, so at depth $h$ cm the water surface is
$$40 + 2 \times \tfrac{20}{30}h = 40 + \tfrac{4}{3}h \ \text{cm wide}.$$

The water's cross-section is a trapezium:
$$\tfrac{1}{2}\left(40 + 40 + \tfrac{4}{3}h\right)h = 40h + \tfrac{2}{3}h^2 = 750.$$

Multiply by $\tfrac{3}{2}$: $h^2 + 60h - 1125 = 0$, so $(h - 15)(h + 75) = 0$ and $h = 15$ cm.

Check: at 15 cm deep the surface is 60 cm wide, and $\tfrac{1}{2}(40 + 60) \times 15 = 750\ \text{cm}^2$ ✓`,
    traps: {
      1: t`Assumes the depth is proportional to the volume ($\tfrac{75}{180} \times 30$), or uses the average width of the whole trough. The trough widens upwards, so neither works.`,
      3: t`Treats the water as a cuboid 40 cm wide: $750 \div 40 = 18.75$. The sides slope outwards.`,
      0: t`Treats the water as a cuboid 80 cm wide.`,
    },
    insight: t`When a container widens, volume is not proportional to depth: express the cross-section in terms of the depth and solve.`,
    skills: ['prisms', 'trapezium area', 'quadratic equations', 'unit conversion'],
  },
  {
    id: '2-M1-25',
    module: 'M1',
    n: 25,
    topic: 'M5',
    spec: ['M5.12'],
    title: 'Least number of cubes from three views',
    difficulty: 4,
    time: 120,
    stem: t`A solid is made of identical cubes stacked in columns on a flat table. The diagram shows its plan, its front elevation and its side elevation viewed from the right.`,
    diagram: 'p2-m1-views',
    diagramAlt: 'Plan: a rectangle of 3 by 2 squares, all filled, with the front along the bottom edge and the right side on the right. Front elevation: three columns of heights 2, 3 and 1 from left to right. Side elevation from the right: the front column is 3 cubes high and the back column is 2 cubes high.',
    prompt: t`What is the least number of cubes the solid could contain?`,
    options: [t`$6$`, t`$7$`, t`$8$`, t`$9$`, t`$10$`, t`$11$`],
    answer: 3,
    hints: [t`The plan shows six columns, each with at least one cube.`, t`Which single column can be 3 cubes high? Can one column of height 2 satisfy both the front and the side views?`],
    solution: t`The plan shows 6 columns (3 across, 2 deep), so there are at least 6 cubes.

The front elevation gives the tallest column in each of the left, middle and right positions: 2, 3 and 1. The side elevation gives the tallest column in the front and back rows: 3 and 2.

- A column 3 high must be in the middle position *and* in the front row, so the middle-front column has 3 cubes: 2 extra.
- The left position needs a column 2 high, and so does the back row. The left-back column can do both at once: 1 extra.

| | left | middle | right |
|---|---|---|---|
| back | 2 | 1 | 1 |
| front | 1 | 3 | 1 |

This gives all three views, using $6 + 2 + 1 = 9$ cubes, and no arrangement can use fewer. (The greatest possible number is 11, when every column is as tall as both views allow.)`,
    traps: {
      5: t`$11$ is the *greatest* possible number, with every column as tall as the views allow.`,
      0: t`$2 + 3 + 1 = 6$ uses only the front elevation and ignores the depth shown by the plan.`,
      4: t`Places the extra cube for the left position in the front row, which then forces another cube in the back row.`,
    },
    insight: t`Each elevation fixes the tallest column in each line of sight. For the least number of cubes, make one column meet several views at once.`,
    skills: ['plans and elevations', '3D visualisation', 'optimisation'],
  },
  {
    id: '2-M1-26',
    module: 'M1',
    n: 26,
    topic: 'M2',
    spec: ['M2.13', 'M2.12'],
    title: 'Error interval after truncating and rounding',
    difficulty: 4,
    time: 120,
    stem: t`The number $x$ is **truncated** to 2 decimal places, giving $7.36$.

The number $y$ is **rounded** to 1 decimal place, giving $2.4$.

Which of the following is the error interval for $x - y$?`,
    options: [
      t`$4.905 < x - y < 5.015$`,
      t`$4.91 \le x - y < 5.02$`,
      t`$4.91 < x - y < 5.02$`,
      t`$4.91 < x - y \le 5.02$`,
      t`$4.91 \le x - y \le 5.02$`,
      t`$4.92 < x - y < 5.01$`,
    ],
    answer: 2,
    hints: [t`Truncating to 7.36 means $7.36 \le x < 7.37$.`, t`For the smallest difference, take the smallest $x$ and the largest $y$. Can each bound actually be reached?`],
    solution: t`**Error intervals.** Truncation chops off digits, so $7.36 \le x < 7.37$. Rounding gives $2.35 \le y < 2.45$.

**Smallest value of $x - y$.** Take $x$ as small as possible and $y$ as large as possible: $7.36 - 2.45 = 4.91$. But $y$ can never equal $2.45$ (that rounds to $2.5$), so $x - y$ is always greater than $4.91$: the lower inequality is strict.

**Largest value of $x - y$.** Take $x$ as large as possible and $y$ as small as possible: $7.37 - 2.35 = 5.02$. But $x$ can never equal $7.37$, so this inequality is strict too.

$$4.91 < x - y < 5.02$$`,
    traps: {
      0: t`Treats $x$ as rounded ($7.355 \le x < 7.365$). Truncation gives $7.36 \le x < 7.37$.`,
      1: t`$x - y = 4.91$ would need $y = 2.45$, which rounds to $2.5$, not $2.4$.`,
      3: t`$x - y = 5.02$ would need $x = 7.37$, which truncates to $7.37$, not $7.36$.`,
      5: t`Subtracts lower bound from lower bound and upper from upper. For a difference, pair the lower bound of $x$ with the upper bound of $y$, and vice versa.`,
    },
    insight: t`Truncation and rounding give different intervals. For $x - y$, pair opposite bounds, and a bound is only included if both numbers can reach theirs.`,
    skills: ['error intervals', 'truncation', 'bounds'],
  },
  {
    id: '2-M1-27',
    module: 'M1',
    n: 27,
    topic: 'M7',
    spec: ['M7.6', 'M7.7a', 'M7.5'],
    title: 'Product of three dice is a multiple of 6',
    difficulty: 5,
    time: 150,
    stem: t`Three fair six-sided dice are rolled and the three scores are multiplied together.

What is the probability that the product is a multiple of 6?`,
    options: [t`$\dfrac{5}{12}$`, t`$\dfrac{91}{216}$`, t`$\dfrac{1}{2}$`, t`$\dfrac{13}{24}$`, t`$\dfrac{125}{216}$`, t`$\dfrac{133}{216}$`],
    answer: 5,
    hints: [
      t`Count the outcomes where the product is *not* a multiple of 6: it is odd, or it has no factor 3, or both.`,
      t`All odd: $3^3$ outcomes. No 3 or 6: $4^3$. Both: every die shows 1 or 5.`,
    ],
    solution: t`There are $6^3 = 216$ equally likely outcomes. Count the complement: the product is **not** a multiple of 6 when it is odd, or when it has no factor 3.

- All three dice odd: $3^3 = 27$ outcomes.
- No die shows 3 or 6: $4^3 = 64$ outcomes.
- Both (every die shows 1 or 5): $2^3 = 8$ outcomes, counted in both lists above.

So $27 + 64 - 8 = 83$ outcomes fail, and
$$P(\text{multiple of } 6) = \frac{216 - 83}{216} = \frac{133}{216}.$$

**Check.** $P(\text{some die even}) = 1 - \tfrac{1}{8} = \tfrac{7}{8}$ and $P(\text{some die a multiple of 3}) = 1 - \tfrac{8}{27} = \tfrac{19}{27}$. On a single die, "even" and "multiple of 3" are independent ($P(6) = \tfrac{1}{6} = \tfrac{1}{2} \times \tfrac{1}{3}$), so these two events are independent too, and
$$\frac{7}{8} \times \frac{19}{27} = \frac{133}{216}. \ ✓$$`,
    traps: {
      4: t`Subtracts the "all odd" and "no factor 3" outcomes but forgets to add back the 8 outcomes counted in both.`,
      3: t`Subtracts the 8 overlapping outcomes a third time instead of adding them back: $216 - 27 - 64 - 8 = 117$.`,
      1: t`$\tfrac{91}{216}$ is the probability of at least one six. A product can be a multiple of 6 without a six, e.g. $2 \times 3 \times 1$.`,
      0: t`$\tfrac{5}{12} = \tfrac{15}{36}$ is the answer for two dice.`,
    },
    insight: t`For "at least one of each kind", count the complement and use inclusion–exclusion: add back what you subtracted twice.`,
    skills: ['probability', 'sample spaces', 'complements', 'inclusion–exclusion'],
  },
];
