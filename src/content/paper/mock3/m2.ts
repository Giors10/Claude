import type { Question } from '../../types';
import { STATEMENT_OPTIONS, ST } from '../shared';

const t = String.raw;

/**
 * Mock 3 (Anvil) — Mathematics 2.
 * 27 questions, 40 minutes, no calculator. Realistic ESAT Mathematics 2
 * style, pitched a little above real difficulty, inside MM1–MM8. Every setup
 * is new: none repeats a question from the Crucible or Forge papers.
 */
export const M2: Question[] = [
  {
    id: '3-M2-01',
    module: 'M2',
    n: 1,
    topic: 'MM1',
    spec: ['MM1.2'],
    title: 'A product of conjugates minus a square',
    difficulty: 1,
    time: 60,
    stem: t`Simplify
$$(2\sqrt{3} + \sqrt{2})(2\sqrt{3} - \sqrt{2}) - (\sqrt{6} - 1)^2.$$`,
    options: [t`$-3 + 2\sqrt{6}$`, t`$3 - 2\sqrt{6}$`, t`$3 + 2\sqrt{6}$`, t`$5$`, t`$17 - 2\sqrt{6}$`, t`$17 + 2\sqrt{6}$`],
    answer: 2,
    hints: [t`The first product is a difference of two squares. The square has a middle term.`],
    solution: t`The first product is a difference of two squares:
$$(2\sqrt{3})^2 - (\sqrt{2})^2 = 12 - 2 = 10.$$

The square expands to
$$(\sqrt{6} - 1)^2 = 6 - 2\sqrt{6} + 1 = 7 - 2\sqrt{6}.$$

So the expression is $10 - (7 - 2\sqrt{6}) = 3 + 2\sqrt{6}$.`,
    traps: {
      3: t`Squares $\sqrt{6} - 1$ as $6 - 1$, missing the middle term $-2\sqrt{6}$.`,
      1: t`Subtracts only the 7. The minus sign in front of the bracket also turns $-2\sqrt{6}$ into $+2\sqrt{6}$.`,
      0: t`Squares $2\sqrt{3}$ as 6; in fact $(2\sqrt{3})^2 = 4 \times 3 = 12$.`,
      4: t`Adds the square instead of subtracting it.`,
    },
    insight: t`$(a - b)^2 = a^2 - 2ab + b^2$: forgetting the middle term is the commonest surd slip, and a minus sign in front of a bracket changes every sign inside it.`,
    skills: ['surds', 'difference of two squares', 'expanding brackets'],
  },
  {
    id: '3-M2-02',
    module: 'M2',
    n: 2,
    topic: 'MM7',
    spec: ['MM7.2', 'MM7.3a'],
    title: 'Integrating cube roots',
    difficulty: 1,
    time: 70,
    stem: t`Evaluate
$$\int_1^8 \left(\sqrt[3]{x} - \frac{1}{\sqrt[3]{x}}\right) \mathrm{d}x.$$`,
    options: [t`$\dfrac{15}{4}$`, t`$\dfrac{21}{4}$`, t`$6$`, t`$\dfrac{27}{4}$`, t`$\dfrac{63}{4}$`, t`$18$`],
    answer: 3,
    hints: [t`Write the integrand as $x^{\frac{1}{3}} - x^{-\frac{1}{3}}$. Add 1 to each power and divide by the new power.`],
    solution: t`Write the integrand as $x^{\frac{1}{3}} - x^{-\frac{1}{3}}$ and integrate each term:
$$\int \left(x^{\frac{1}{3}} - x^{-\frac{1}{3}}\right) \mathrm{d}x = \frac{3}{4}x^{\frac{4}{3}} - \frac{3}{2}x^{\frac{2}{3}}.$$

Since $8^{\frac{1}{3}} = 2$, we have $8^{\frac{4}{3}} = 16$ and $8^{\frac{2}{3}} = 4$. So the integral is
$$\left(\frac{3}{4} \times 16 - \frac{3}{2} \times 4\right) - \left(\frac{3}{4} - \frac{3}{2}\right) = 6 - \left(-\frac{3}{4}\right) = \frac{27}{4}.$$`,
    traps: {
      2: t`Evaluates only at the upper limit; the value at $x = 1$ is $-\tfrac{3}{4}$, not 0.`,
      1: t`Subtracts $\tfrac{3}{4}$ instead of subtracting $-\tfrac{3}{4}$.`,
      0: t`Slips a sign at the lower limit, subtracting $\tfrac{3}{4} + \tfrac{3}{2}$.`,
      4: t`Integrates $-x^{-\frac{1}{3}}$ to $+\tfrac{3}{2}x^{\frac{2}{3}}$; the minus sign stays.`,
      5: t`Multiplies by the new power instead of dividing: $\int x^{\frac{1}{3}}\,\mathrm{d}x$ is $\tfrac{3}{4}x^{\frac{4}{3}}$, not $\tfrac{4}{3}x^{\frac{4}{3}}$.`,
    },
    insight: t`Rewrite roots and reciprocals as powers before integrating, and evaluate a fractional power of a perfect cube by taking the cube root first.`,
    skills: ['integration', 'fractional indices', 'definite integrals'],
  },
  {
    id: '3-M2-03',
    module: 'M2',
    n: 3,
    topic: 'MM1',
    spec: ['MM1.6c'],
    title: 'Two divisors that leave the same remainder',
    difficulty: 2,
    time: 80,
    stem: t`The polynomial
$$p(x) = x^3 + ax^2 - 5x + 2,$$
where $a$ is a constant, leaves the same remainder when it is divided by $(x - 2)$ as when it is divided by $(x + 1)$.

What is the remainder when $p(x)$ is divided by $(x + 2)$?`,
    options: [t`$-8$`, t`$0$`, t`$2$`, t`$8$`, t`$12$`, t`$28$`],
    answer: 4,
    hints: [t`By the remainder theorem, dividing by $(x - c)$ leaves the remainder $p(c)$.`],
    solution: t`By the remainder theorem the two remainders are
$$p(2) = 8 + 4a - 10 + 2 = 4a \qquad \text{and} \qquad p(-1) = -1 + a + 5 + 2 = a + 6.$$

Setting them equal, $4a = a + 6$, so $a = 2$. The remainder on dividing by $(x + 2)$ is then
$$p(-2) = -8 + 4a + 10 + 2 = -8 + 8 + 10 + 2 = 12.$$`,
    traps: {
      3: t`This is $p(2)$, the common remainder. Dividing by $(x + 2)$ leaves $p(-2)$.`,
      2: t`Stops at $a = 2$; the question asks for a remainder.`,
      0: t`Substitutes $x = c$ for the divisor $(x + c)$ throughout: setting $p(-2) = p(1)$ gives $a = -2$, and then $p(2) = -8$.`,
      5: t`Takes $(-2)^3$ as $+8$.`,
    },
    insight: t`The remainder on dividing by $(x - c)$ is $p(c)$, so for $(x + 2)$ substitute $x = -2$: the sign flips.`,
    skills: ['remainder theorem', 'polynomials'],
  },
  {
    id: '3-M2-04',
    module: 'M2',
    n: 4,
    topic: 'MM8',
    spec: ['MM8.3'],
    title: 'Doubling the gradient, halving the intercept',
    difficulty: 2,
    time: 70,
    stem: t`The line $y = mx + c$, where $m$ and $c$ are non-zero constants, crosses the $x$-axis at $(8, 0)$.

The line $L$ has twice the gradient of this line and half its $y$-intercept.

Where does $L$ cross the $x$-axis?`,
    options: [t`$(-2, 0)$`, t`$(2, 0)$`, t`$(4, 0)$`, t`$(8, 0)$`, t`$(16, 0)$`, t`$(32, 0)$`],
    answer: 1,
    hints: [t`Find where $y = mx + c$ meets the $x$-axis, in terms of $m$ and $c$.`],
    solution: t`The line $y = mx + c$ meets the $x$-axis where $mx + c = 0$, at $x = -\dfrac{c}{m}$. So $-\dfrac{c}{m} = 8$.

$L$ is $y = 2mx + \tfrac{1}{2}c$, which meets the $x$-axis at
$$x = -\frac{\frac{1}{2}c}{2m} = \frac{1}{4}\left(-\frac{c}{m}\right) = \frac{1}{4} \times 8 = 2.$$

Doubling the gradient halves the $x$-intercept, and halving the $y$-intercept halves it again: $L$ crosses at $(2, 0)$.`,
    traps: {
      2: t`Applies only one of the two changes; each one halves the $x$-intercept.`,
      3: t`Assumes the two changes cancel out. Both move the intercept towards the origin.`,
      5: t`Uses $-\dfrac{m}{c}$ for the $x$-intercept; it is $-\dfrac{c}{m}$.`,
    },
    insight: t`The $x$-intercept of $y = mx + c$ is $-\dfrac{c}{m}$: it is proportional to $c$ and inversely proportional to $m$.`,
    skills: ['straight-line graphs', 'gradient and intercept'],
  },
  {
    id: '3-M2-05',
    module: 'M2',
    n: 5,
    topic: 'MM2',
    spec: ['MM2.2'],
    title: 'The greatest sum of a decreasing arithmetic series',
    difficulty: 2,
    time: 85,
    stem: t`An arithmetic series has first term $45$ and common difference $-3$. Let $S_n$ be the sum of its first $n$ terms.

What is the greatest value of $S_n$?`,
    options: [t`$337\tfrac{1}{2}$`, t`$351$`, t`$357$`, t`$360$`, t`$360\tfrac{3}{8}$`, t`$720$`],
    answer: 3,
    hints: [t`The sum keeps increasing for as long as the terms being added are positive.`],
    solution: t`The $n$th term is $45 - 3(n - 1) = 48 - 3n$. The terms are positive up to the 15th term (which is 3), the 16th term is 0, and after that they are negative.

So $S_n$ is greatest after 15 terms (adding the 16th term, 0, leaves it unchanged):
$$S_{15} = \frac{15}{2}(45 + 3) = 15 \times 24 = 360.$$

Check with the formula: $S_n = \dfrac{n}{2}\big(90 - 3(n - 1)\big) = \dfrac{3n(31 - n)}{2}$, a quadratic in $n$ whose vertex is at $n = 15.5$. The nearest whole numbers, $n = 15$ and $n = 16$, both give 360.`,
    traps: {
      4: t`Substitutes $n = 15.5$, the vertex of the quadratic; $n$ must be a whole number.`,
      2: t`Stops after 14 terms, or carries on to the first negative term: $S_{14} = S_{17} = 357$.`,
      0: t`Uses $a + nd$ for the $n$th term, so thinks the 15th term is 0 and works out $\tfrac{15}{2}(45 + 0)$.`,
      5: t`Forgets to halve in $\tfrac{n}{2}(a + l)$.`,
    },
    insight: t`A decreasing arithmetic series has its greatest sum when you stop just before the terms turn negative; a zero term does not change the sum.`,
    skills: ['arithmetic series', 'maximising a sum'],
  },
  {
    id: '3-M2-06',
    module: 'M2',
    n: 6,
    topic: 'MM1',
    spec: ['MM1.5'],
    title: 'A quadratic and a linear inequality together',
    difficulty: 2,
    time: 85,
    stem: t`Consider the two inequalities
$$2x^2 + 5x - 3 > 0 \qquad \text{and} \qquad 3x - 1 < 5.$$

What is the complete set of values of $x$ that satisfy both?`,
    options: [
      t`$x < -3$ or $\tfrac{1}{2} < x < 2$`,
      t`$\tfrac{1}{2} < x < 2$`,
      t`$x < -3$`,
      t`$-3 < x < \tfrac{1}{2}$`,
      t`$x < -3$ or $x > \tfrac{1}{2}$`,
      t`$-3 < x < 2$`,
    ],
    answer: 0,
    hints: [t`Factorise the quadratic and sketch it: where is the graph above the $x$-axis?`],
    solution: t`Factorise: $2x^2 + 5x - 3 = (2x - 1)(x + 3)$. The graph is a $\cup$-shaped parabola crossing the $x$-axis at $x = -3$ and $x = \tfrac{1}{2}$, so the quadratic is positive *outside* the roots:
$$x < -3 \quad \text{or} \quad x > \tfrac{1}{2}.$$

The linear inequality gives $3x < 6$, so $x < 2$.

Both hold when $x < -3$ (all of which is less than 2) or when $\tfrac{1}{2} < x < 2$.`,
    traps: {
      1: t`Loses the region $x < -3$, where the quadratic is positive and $x < 2$ also holds.`,
      3: t`Takes the region between the roots, where the quadratic is negative.`,
      4: t`Solves the quadratic inequality but ignores $x < 2$.`,
      5: t`The quadratic is negative between $-3$ and $\tfrac{1}{2}$, so most of this interval fails the first inequality.`,
    },
    insight: t`For $ax^2 + bx + c > 0$ with $a > 0$, the solution lies outside the roots. Then combine it with the other condition on a number line.`,
    skills: ['quadratic inequalities', 'linear inequalities', 'combining inequalities'],
  },
  {
    id: '3-M2-07',
    module: 'M2',
    n: 7,
    topic: 'MM5',
    spec: ['MM5.3', 'MM1.1'],
    title: 'An exponential equation with three bases',
    difficulty: 2,
    time: 85,
    stem: t`Solve the equation
$$2^x \times 3^{x+1} = 6^{2x-1}.$$`,
    options: [t`$x = -\log_6 2$`, t`$x = \log_6 2$`, t`$x = \log_6 3$`, t`$x = 2$`, t`$x = \log_{18} 6$`, t`$x = 1 + \log_6 3$`],
    answer: 5,
    hints: [t`$2^x \times 3^x = 6^x$. Write both sides in terms of $6^x$.`],
    solution: t`The left side is $3 \times 2^x \times 3^x = 3 \times 6^x$, and the right side is $6^{2x} \div 6 = \dfrac{(6^x)^2}{6}$. So
$$3 \times 6^x = \frac{(6^x)^2}{6} \quad\Rightarrow\quad 6^x = 18,$$
after dividing by $6^x$, which is never zero.

Hence $x = \log_6 18 = \log_6 6 + \log_6 3 = 1 + \log_6 3$.`,
    traps: {
      0: t`Writes $6^{2x-1}$ as $6 \times 6^{2x}$; the index $-1$ means divide by 6.`,
      1: t`Taking logarithms gives $x(\log 2 + \log 3 - 2\log 6) = -\log 6 - \log 3$; a sign slip here gives $x = \dfrac{\log 6 - \log 3}{\log 6}$.`,
      2: t`Treats $6^{2x-1}$ as $6^{2x}$.`,
      3: t`Equates the indices $x + 1$ and $2x - 1$, but the two sides are not powers of the same base.`,
      4: t`Inverts the logarithm: $6^x = 18$ means $x = \log_6 18$, not $\log_{18} 6$.`,
    },
    insight: t`Combine powers with equal indices, $a^x b^x = (ab)^x$, to reduce the equation to a single base; then one logarithm finishes it.`,
    skills: ['exponential equations', 'laws of indices', 'logarithms'],
  },
  {
    id: '3-M2-08',
    module: 'M2',
    n: 8,
    topic: 'MM7',
    spec: ['MM7.6', 'MM6.3'],
    title: 'From a gradient function to the other turning point',
    difficulty: 2,
    time: 85,
    stem: t`A curve has gradient function
$$\frac{\mathrm{d}y}{\mathrm{d}x} = 3x^2 - k,$$
where $k$ is a constant. The curve has a stationary point where $x = 2$, and it passes through the point $(0, 5)$.

What is the $y$-coordinate of the curve's other stationary point?`,
    options: [t`$-11$`, t`$-3$`, t`$5$`, t`$16$`, t`$21$`, t`$37$`],
    answer: 4,
    hints: [t`Use the stationary point to find $k$ first, then integrate.`],
    solution: t`At a stationary point the gradient is zero, so $3 \times 2^2 - k = 0$ and $k = 12$.

Integrating, $y = x^3 - 12x + c$, and the point $(0, 5)$ gives $c = 5$:
$$y = x^3 - 12x + 5.$$

The gradient $3x^2 - 12$ is zero at $x = \pm 2$, so the other stationary point is at $x = -2$, where
$$y = -8 + 24 + 5 = 21.$$`,
    traps: {
      0: t`This is the $y$-coordinate at $x = 2$, the stationary point you were given.`,
      3: t`Leaves out the constant of integration.`,
      1: t`Integrates the constant $-k$ as $-k$; it should be $-kx$.`,
      5: t`Takes $(-2)^3$ as $+8$.`,
    },
    insight: t`A stationary point gives an equation from $\dfrac{\mathrm{d}y}{\mathrm{d}x} = 0$; a point on the curve fixes the constant of integration.`,
    skills: ['differential equations', 'integration', 'stationary points'],
  },
  {
    id: '3-M2-09',
    module: 'M2',
    n: 9,
    topic: 'MM1',
    spec: ['MM1.3', 'MM8.4'],
    title: 'The largest possible minimum of a quadratic',
    difficulty: 3,
    time: 95,
    stem: t`For each value of the constant $k$, the expression
$$x^2 - 2kx + 3k + 4$$
has a minimum value $m$ as $x$ varies. The value of $m$ depends on $k$.

What is the greatest possible value of $m$?`,
    options: [t`$\dfrac{3}{2}$`, t`$4$`, t`$\dfrac{25}{4}$`, t`$\dfrac{17}{2}$`, t`$\dfrac{43}{4}$`, t`$\dfrac{25}{2}$`],
    answer: 2,
    hints: [t`Complete the square in $x$ to find $m$ in terms of $k$. Then complete the square again, in $k$.`],
    solution: t`Completing the square in $x$:
$$x^2 - 2kx + 3k + 4 = (x - k)^2 - k^2 + 3k + 4,$$
so the minimum value (at $x = k$) is
$$m = -k^2 + 3k + 4.$$

Completing the square again, this time in $k$:
$$m = \frac{25}{4} - \left(k - \frac{3}{2}\right)^2,$$
so the greatest possible value of $m$ is $\dfrac{25}{4}$, when $k = \dfrac{3}{2}$.`,
    traps: {
      0: t`This is the value of $k$ that makes $m$ greatest, not the value of $m$.`,
      1: t`Takes $k = 0$ (or $k = 3$); the vertex of $-k^2 + 3k + 4$ is at $k = \tfrac{3}{2}$.`,
      3: t`Evaluates the expression at $x = 0$ instead of at its minimum point $x = k$: $3k + 4 = \tfrac{17}{2}$ when $k = \tfrac{3}{2}$.`,
      4: t`Adds $k^2$ instead of subtracting it when completing the square: $(x - k)^2$ already contains $+k^2$.`,
    },
    insight: t`Completing the square gives the minimum of a quadratic directly; if that minimum depends on a parameter, optimise it the same way.`,
    skills: ['completing the square', 'minimum of a quadratic', 'parameters'],
  },
  {
    id: '3-M2-10',
    module: 'M2',
    n: 10,
    topic: 'MM2',
    spec: ['MM2.3'],
    title: 'A geometric series from its second term and its sum to infinity',
    difficulty: 3,
    time: 95,
    stem: t`A geometric series has second term $12$ and sum to infinity $64$. Its common ratio is greater than $\tfrac{1}{2}$.

What is the first term of the series?`,
    options: [t`$9$`, t`$12$`, t`$16$`, t`$24$`, t`$36$`, t`$48$`],
    answer: 2,
    hints: [t`Write $ar = 12$ and $\dfrac{a}{1 - r} = 64$, then eliminate $a$.`],
    solution: t`With first term $a$ and common ratio $r$,
$$ar = 12 \qquad \text{and} \qquad \frac{a}{1 - r} = 64.$$

Substituting $a = \dfrac{12}{r}$ into the second equation gives $12 = 64r(1 - r)$, so
$$16r^2 - 16r + 3 = 0 \quad\Rightarrow\quad (4r - 1)(4r - 3) = 0.$$

So $r = \tfrac{1}{4}$ or $r = \tfrac{3}{4}$. Both give a convergent series, but only $r = \tfrac{3}{4}$ is greater than $\tfrac{1}{2}$, and then
$$a = \frac{12}{\frac{3}{4}} = 16.$$

Check: $\dfrac{16}{1 - \frac{3}{4}} = 64$.`,
    traps: {
      5: t`Takes $r = \tfrac{1}{4}$, which fits both facts but is not greater than $\tfrac{1}{2}$.`,
      1: t`Uses the second term as the first term.`,
      0: t`Finds the third term, $12 \times \tfrac{3}{4}$, instead of the first.`,
    },
    insight: t`Two facts about a geometric series usually give a quadratic in $r$; the extra condition (and $|r| < 1$) picks the root.`,
    skills: ['geometric series', 'sum to infinity', 'quadratic equations'],
  },
  {
    id: '3-M2-11',
    module: 'M2',
    n: 11,
    topic: 'MM3',
    spec: ['MM3.3c', 'MM3.3e', 'MM3.2a'],
    title: 'Angles subtended by a chord of a circle',
    difficulty: 3,
    time: 100,
    stem: t`The points $A(3, 4)$, $B(4, -3)$, $P(-5, 0)$ and $Q(0, 5)$ all lie on the circle $x^2 + y^2 = 25$, whose centre is the origin $O$.

Consider the following statements.`,
    statements: [t`Angle $AOB = 90°$.`, t`Angle $APB$ is equal to angle $AQB$.`, t`Angle $APB = 90°$.`],
    prompt: t`Which of the statements is/are correct?`,
    options: STATEMENT_OPTIONS,
    answer: ST.s12,
    hints: [t`Find the gradients of $OA$ and $OB$. Then sketch the circle: are $P$ and $Q$ on the same side of the chord $AB$?`],
    solution: t`**Statement 1.** $OA$ has gradient $\tfrac{4}{3}$ and $OB$ has gradient $-\tfrac{3}{4}$. Their product is $-1$, so $OA$ is perpendicular to $OB$ and angle $AOB = 90°$. ✓

**Statement 2.** The chord $AB$ joins $A$, in the first quadrant, to $B$, in the fourth, and the minor arc $AB$ passes through $(5, 0)$. Both $P$ and $Q$ lie on the major arc, on the same side of $AB$, so angles $APB$ and $AQB$ are angles in the same segment and are equal. ✓

**Statement 3.** The angle at the centre is twice the angle at the circumference, so angle $APB = \tfrac{1}{2} \times 90° = 45°$, not $90°$. ✗ (A right angle at $P$ would need $AB$ to be a diameter.)

Statements 1 and 2 only.`,
    solutionDiagram: 'p3-m2-circle-sol',
    traps: {
      [ST.all]: t`Statement 3 confuses the angle at the circumference with the angle at the centre: angle $APB$ is half of $90°$.`,
      [ST.s1]: t`Statement 2 is true: $P$ and $Q$ are both on the major arc, so the angles are in the same segment.`,
      [ST.s13]: t`Angle $APB$ is half the angle at the centre, so it is $45°$.`,
    },
    insight: t`The angle at the centre is twice the angle at the circumference, and every point on the same arc sees a chord at the same angle.`,
    skills: ['circle theorems', 'coordinate geometry', 'perpendicular gradients'],
  },
  {
    id: '3-M2-12',
    module: 'M2',
    n: 12,
    topic: 'MM2',
    spec: ['MM2.4'],
    title: 'A coefficient in a product of two binomials',
    difficulty: 3,
    time: 90,
    stem: t`Consider the expansion of
$$(1 + x)^8(1 - x)^8.$$

What is the coefficient of $x^4$?`,
    options: [t`$-70$`, t`$-28$`, t`$0$`, t`$28$`, t`$70$`, t`$4900$`],
    answer: 3,
    hints: [t`Multiply the brackets before expanding: $(1 + x)(1 - x) = 1 - x^2$.`],
    solution: t`Since $(1 + x)(1 - x) = 1 - x^2$,
$$(1 + x)^8(1 - x)^8 = (1 - x^2)^8 = \sum_{r=0}^{8} \binom{8}{r}(-x^2)^r.$$

The $x^4$ term has $r = 2$: $\dbinom{8}{2}(-x^2)^2 = 28x^4$. The coefficient is $28$.

Expanding the two brackets separately gives the same answer, more slowly:
$$\binom{8}{4} - \binom{8}{1}\binom{8}{3} + \binom{8}{2}^2 - \binom{8}{3}\binom{8}{1} + \binom{8}{4} = 70 - 448 + 784 - 448 + 70 = 28.$$`,
    traps: {
      4: t`Takes $\dbinom{8}{4}$ from one bracket only.`,
      5: t`Multiplies the two $x^4$ coefficients, $70 \times 70$. Products such as $x \times x^3$ and $x^2 \times x^2$ also give $x^4$.`,
      1: t`Sign slip: $(-x^2)^2 = +x^4$.`,
      2: t`The terms cancel only for odd powers of $x$: $(1 - x^2)^8$ contains only even powers.`,
    },
    insight: t`Before expanding a product of binomials, look for a way to combine them: $(1 + x)^n(1 - x)^n = (1 - x^2)^n$.`,
    skills: ['binomial expansion', 'binomial coefficients'],
  },
  {
    id: '3-M2-13',
    module: 'M2',
    n: 13,
    topic: 'MM5',
    spec: ['MM5.2'],
    title: 'Simultaneous equations in logarithms',
    difficulty: 3,
    time: 90,
    stem: t`The positive numbers $x$ and $y$ satisfy
$$\log_2(xy) = 5 \qquad \text{and} \qquad \log_2\left(\frac{x}{y^2}\right) = -1.$$

What is the value of $x - y$?`,
    options: [t`$1$`, t`$4$`, t`$8$`, t`$12$`, t`$16$`, t`$32$`],
    answer: 1,
    hints: [t`Let $a = \log_2 x$ and $b = \log_2 y$, and use the laws of logarithms to get two linear equations.`],
    solution: t`Let $a = \log_2 x$ and $b = \log_2 y$. The laws of logarithms turn the equations into
$$a + b = 5 \qquad \text{and} \qquad a - 2b = -1.$$

Subtracting, $3b = 6$, so $b = 2$ and $a = 3$. Hence $x = 2^3 = 8$ and $y = 2^2 = 4$, and $x - y = 4$.

Without logarithms: $xy = 32$ and $\dfrac{x}{y^2} = \dfrac{1}{2}$, so $x = \dfrac{y^2}{2}$ and $\dfrac{y^3}{2} = 32$, giving $y = 4$ and $x = 8$.`,
    traps: {
      0: t`This is $\log_2 x - \log_2 y$, not $x - y$.`,
      2: t`This is $x$ on its own.`,
      3: t`This is $x + y$.`,
      5: t`This is $xy = 2^5$.`,
    },
    insight: t`Replacing $\log x$ and $\log y$ by letters turns logarithmic equations into linear simultaneous equations.`,
    skills: ['laws of logarithms', 'simultaneous equations'],
  },
  {
    id: '3-M2-14',
    module: 'M2',
    n: 14,
    topic: 'MM4',
    spec: ['MM4.1', 'MM4.3', 'MM1.3'],
    title: 'Consecutive sides and a 120° angle',
    difficulty: 3,
    time: 100,
    stem: t`The sides of a triangle have lengths $x$, $x + 1$ and $x + 2$, and its largest angle is $120°$.

What is the perimeter of the triangle?`,
    options: [t`$\dfrac{3}{2}$`, t`$\dfrac{7}{2}$`, t`$\dfrac{15}{2}$`, t`$9$`, t`$\dfrac{21}{2}$`, t`$12$`],
    answer: 2,
    hints: [t`The largest angle is opposite the longest side. Use the cosine rule with $\cos 120° = -\tfrac{1}{2}$.`],
    solution: t`The largest angle is opposite the longest side, $x + 2$. By the cosine rule, with $\cos 120° = -\tfrac{1}{2}$,
$$(x + 2)^2 = x^2 + (x + 1)^2 - 2x(x + 1)\cos 120° = x^2 + (x + 1)^2 + x(x + 1).$$

Expanding, $x^2 + 4x + 4 = 3x^2 + 3x + 1$, so
$$2x^2 - x - 3 = 0 \quad\Rightarrow\quad (2x - 3)(x + 1) = 0.$$

A length is positive, so $x = \tfrac{3}{2}$. The sides are $\tfrac{3}{2}$, $\tfrac{5}{2}$ and $\tfrac{7}{2}$, and the perimeter is $\tfrac{15}{2}$.

Check: $\left(\tfrac{3}{2}\right)^2 + \left(\tfrac{5}{2}\right)^2 + \tfrac{3}{2} \times \tfrac{5}{2} = \tfrac{9 + 25 + 15}{4} = \tfrac{49}{4} = \left(\tfrac{7}{2}\right)^2$.`,
    traps: {
      0: t`This is $x$, the shortest side, not the perimeter.`,
      1: t`This is the longest side.`,
      5: t`Guesses the $3, 4, 5$ triangle, whose largest angle is $90°$, not $120°$.`,
    },
    insight: t`The largest angle faces the longest side. For a $120°$ angle, the $-2ab\cos C$ term of the cosine rule becomes $+ab$.`,
    skills: ['cosine rule', 'exact trigonometric values', 'quadratic equations'],
  },
  {
    id: '3-M2-15',
    module: 'M2',
    n: 15,
    topic: 'MM3',
    spec: ['MM3.2b', 'MM3.2a'],
    title: 'A circle from a ratio of distances',
    difficulty: 3,
    time: 100,
    stem: t`The point $P$ moves in the $xy$-plane so that its distance from $A(0, 0)$ is always twice its distance from $B(3, 0)$.

$P$ moves on a circle. What is the radius of this circle?`,
    options: [t`$1$`, t`$2$`, t`$2\sqrt{3}$`, t`$4$`, t`$3\sqrt{2}$`, t`$2\sqrt{7}$`],
    answer: 1,
    hints: [t`Let $P$ be $(x, y)$ and square both sides of $PA = 2PB$ to avoid square roots.`],
    solution: t`Let $P$ be $(x, y)$. Then $PA = 2PB$ gives $PA^2 = 4PB^2$:
$$x^2 + y^2 = 4\big((x - 3)^2 + y^2\big) = 4x^2 - 24x + 36 + 4y^2.$$

Rearranging and dividing by 3:
$$x^2 + y^2 - 8x + 12 = 0 \quad\Rightarrow\quad (x - 4)^2 + y^2 = 16 - 12 = 4.$$

The circle has centre $(4, 0)$ and radius $2$. (Check: $(2, 0)$ and $(6, 0)$ lie on it, and $2 = 2 \times 1$, $6 = 2 \times 3$.)`,
    solutionDiagram: 'p3-m2-apollonius-sol',
    traps: {
      4: t`Squares only one side: $PA = 2PB$ gives $PA^2 = 4PB^2$, not $2PB^2$.`,
      3: t`This is the distance from the origin to the centre, $(4, 0)$.`,
      5: t`Sign slip completing the square: $r^2 = 16 - 12$, not $16 + 12$.`,
      2: t`Reads $r^2 = 12$ from the constant term without completing the square.`,
    },
    insight: t`To find a locus, let the point be $(x, y)$ and write the condition algebraically, squaring distances. An equation $x^2 + y^2 + \ldots = 0$ with equal coefficients of $x^2$ and $y^2$ is a circle.`,
    skills: ['equation of a circle', 'completing the square', 'loci'],
  },
  {
    id: '3-M2-16',
    module: 'M2',
    n: 16,
    topic: 'MM6',
    spec: ['MM6.3', 'MM6.2'],
    title: 'Triangle formed by a tangent, a normal and the x-axis',
    difficulty: 3,
    time: 100,
    stem: t`The tangent and the normal to the curve $y = \sqrt{x}$ at the point $P(4, 2)$ meet the $x$-axis at $T$ and $N$ respectively.

What is the area of triangle $PTN$?`,
    options: [t`$\dfrac{15}{2}$`, t`$8$`, t`$\dfrac{17}{2}$`, t`$9$`, t`$16$`, t`$17$`],
    answer: 2,
    hints: [t`$\dfrac{\mathrm{d}y}{\mathrm{d}x} = \dfrac{1}{2\sqrt{x}}$. The normal's gradient is $-1$ divided by the tangent's gradient.`],
    solution: t`Since $y = x^{\frac{1}{2}}$, $\dfrac{\mathrm{d}y}{\mathrm{d}x} = \dfrac{1}{2\sqrt{x}} = \dfrac{1}{4}$ at $x = 4$.

- **Tangent:** $y - 2 = \tfrac{1}{4}(x - 4)$. At $y = 0$, $x - 4 = -8$, so $T$ is $(-4, 0)$.
- **Normal:** gradient $-4$, so $y - 2 = -4(x - 4)$. At $y = 0$, $x - 4 = \tfrac{1}{2}$, so $N$ is $\left(\tfrac{9}{2}, 0\right)$.

The base $TN$ is $\tfrac{9}{2} - (-4) = \tfrac{17}{2}$ and the height is the $y$-coordinate of $P$, which is 2:
$$\text{area} = \frac{1}{2} \times \frac{17}{2} \times 2 = \frac{17}{2}.$$`,
    solutionDiagram: 'p3-m2-tn-sol',
    traps: {
      5: t`Forgets the $\tfrac{1}{2}$ in the area of a triangle.`,
      1: t`Uses the vertical line $x = 4$ instead of the normal, giving the triangle with vertices $(-4, 0)$, $(4, 0)$ and $P$.`,
      4: t`Takes the normal's gradient to be $-\tfrac{1}{4}$; it is $-1 \div \tfrac{1}{4} = -4$.`,
      0: t`Takes the normal's gradient to be $+4$, which puts $N$ at $\left(\tfrac{7}{2}, 0\right)$.`,
    },
    insight: t`The tangent and normal at a point have gradients $m$ and $-\dfrac{1}{m}$. With the $x$-axis they form a triangle whose height is the point's $y$-coordinate.`,
    skills: ['tangents and normals', 'differentiation', 'area of a triangle'],
  },
  {
    id: '3-M2-17',
    module: 'M2',
    n: 17,
    topic: 'MM1',
    spec: ['MM1.7', 'MM8.7'],
    title: 'Number of solutions of a modulus equation',
    difficulty: 3,
    time: 100,
    stem: t`For which values of the constant $k$ does the equation
$$|2x - 3| = x + k$$
have exactly two real solutions?`,
    options: [t`$k > -\tfrac{3}{2}$`, t`$k > \tfrac{3}{2}$`, t`$k < -\tfrac{3}{2}$`, t`$k \ge -\tfrac{3}{2}$`, t`$-\tfrac{3}{2} < k < \tfrac{3}{2}$`, t`all real values of $k$`],
    answer: 0,
    hints: [t`Sketch $y = |2x - 3|$ and the line $y = x + k$. The line is less steep than both arms of the V.`],
    solution: t`The graph of $y = |2x - 3|$ is a V with its vertex at $\left(\tfrac{3}{2}, 0\right)$ and arms of gradient $-2$ and $2$. The line $y = x + k$ has gradient 1, so it is less steep than either arm.

- If the line passes *above* the vertex, it crosses each arm once: two solutions.
- If it passes *through* the vertex, $0 = \tfrac{3}{2} + k$, so $k = -\tfrac{3}{2}$: one solution.
- If it passes *below* the vertex, it never meets the V: no solutions.

The line passes above the vertex when $\tfrac{3}{2} + k > 0$, so there are exactly two solutions when $k > -\tfrac{3}{2}$.

Algebraically: $2x - 3 = x + k$ gives $x = 3 + k$, valid when $x \ge \tfrac{3}{2}$, that is $k \ge -\tfrac{3}{2}$; and $3 - 2x = x + k$ gives $x = \tfrac{3 - k}{3}$, valid when $x < \tfrac{3}{2}$, that is $k > -\tfrac{3}{2}$. Both hold when $k > -\tfrac{3}{2}$; at $k = -\tfrac{3}{2}$ only the first applies, giving the single solution $x = \tfrac{3}{2}$.`,
    solutionDiagram: 'p3-m2-abs-sol',
    traps: {
      3: t`At $k = -\tfrac{3}{2}$ the line passes through the vertex and there is only one solution.`,
      1: t`Sign slip when substituting the vertex: $0 = \tfrac{3}{2} + k$ gives $k = -\tfrac{3}{2}$.`,
      5: t`A line below the vertex misses the V altogether, because it is less steep than both arms.`,
      4: t`There is no upper limit: a line of gradient 1 above the vertex always meets both arms.`,
    },
    insight: t`Count the solutions of $|f(x)| = g(x)$ by sketching both graphs. The critical cases are lines through a vertex or touching a curve.`,
    skills: ['modulus graphs', 'intersections of graphs', 'inequalities'],
  },
  {
    id: '3-M2-18',
    module: 'M2',
    n: 18,
    topic: 'MM8',
    spec: ['MM8.2', 'MM8.2c', 'MM8.2d', 'MM4.4'],
    title: 'A stretch followed by a translation of a cosine graph',
    difficulty: 3,
    time: 90,
    stem: t`The graph of $y = \cos x$ is stretched parallel to the $x$-axis with scale factor $\tfrac{1}{2}$. The resulting graph is then translated by $\dfrac{\pi}{6}$ in the positive $x$-direction.

What is the equation of the final graph?`,
    options: [
      t`$y = \cos\left(2x - \dfrac{\pi}{6}\right)$`,
      t`$y = \cos\left(\dfrac{x}{2} - \dfrac{\pi}{6}\right)$`,
      t`$y = \cos\left(\dfrac{x}{2} - \dfrac{\pi}{12}\right)$`,
      t`$y = \cos\left(2x + \dfrac{\pi}{3}\right)$`,
      t`$y = 2\cos\left(x - \dfrac{\pi}{6}\right)$`,
      t`$y = \cos\left(2x - \dfrac{\pi}{3}\right)$`,
    ],
    answer: 5,
    hints: [t`A stretch with scale factor $\tfrac{1}{2}$ parallel to the $x$-axis replaces $x$ by $2x$. The translation then replaces $x$ by $x - \tfrac{\pi}{6}$ everywhere in the new equation.`],
    solution: t`- The stretch, with scale factor $\tfrac{1}{2}$ parallel to the $x$-axis, replaces $x$ by $2x$: $y = \cos 2x$.
- The translation by $\tfrac{\pi}{6}$ to the right then replaces $x$ by $x - \tfrac{\pi}{6}$:
$$y = \cos\left(2\left(x - \frac{\pi}{6}\right)\right) = \cos\left(2x - \frac{\pi}{3}\right).$$

Check with a maximum: $y = \cos x$ has a maximum at $x = 0$. The stretch keeps it at $x = 0$ and the translation moves it to $x = \tfrac{\pi}{6}$; indeed $\cos\left(2 \times \tfrac{\pi}{6} - \tfrac{\pi}{3}\right) = \cos 0 = 1$.`,
    traps: {
      0: t`Subtracts $\tfrac{\pi}{6}$ without allowing for the stretch: the maximum of $\cos\left(2x - \tfrac{\pi}{6}\right)$ is at $x = \tfrac{\pi}{12}$, not $\tfrac{\pi}{6}$.`,
      2: t`Replaces $x$ by $\tfrac{x}{2}$, which is a stretch with scale factor 2.`,
      3: t`Translates in the wrong direction: replacing $x$ by $x + \tfrac{\pi}{6}$ moves the graph to the left.`,
      4: t`Stretches parallel to the $y$-axis instead of the $x$-axis.`,
    },
    insight: t`Each transformation acts on $x$ itself: after $y = \cos 2x$, a translation gives $\cos 2(x - a)$, not $\cos(2x - a)$.`,
    skills: ['transformations of graphs', 'trigonometric graphs'],
  },
  {
    id: '3-M2-19',
    module: 'M2',
    n: 19,
    topic: 'MM6',
    spec: ['MM6.1b', 'MM6.3', 'MM8.5a'],
    title: 'Classifying the stationary points of a quartic',
    difficulty: 3,
    time: 95,
    stem: t`The curve $C$ has equation
$$y = x^4 - 4x^3.$$

Which of the following correctly describes all the stationary points of $C$?`,
    options: [
      t`a minimum at $(3, -27)$ and a stationary point of inflection at $(0, 0)$`,
      t`a minimum at $(3, -27)$ and a maximum at $(0, 0)$`,
      t`a minimum at $(3, -27)$ only`,
      t`a maximum at $(3, -27)$ and a stationary point of inflection at $(0, 0)$`,
      t`minima at $(0, 0)$ and $(3, -27)$`,
      t`a stationary point of inflection at $(3, -27)$ and a minimum at $(0, 0)$`,
    ],
    answer: 0,
    hints: [t`Factorise $\dfrac{\mathrm{d}y}{\mathrm{d}x}$. Where the second derivative is zero, look at the sign of the gradient on either side.`],
    solution: t`$$\frac{\mathrm{d}y}{\mathrm{d}x} = 4x^3 - 12x^2 = 4x^2(x - 3),$$
which is zero at $x = 0$ and $x = 3$. The stationary points are $(0, 0)$ and $(3, 81 - 108) = (3, -27)$.

$$\frac{\mathrm{d}^2y}{\mathrm{d}x^2} = 12x^2 - 24x.$$

- At $x = 3$ the second derivative is $108 - 72 = 36 > 0$, so $(3, -27)$ is a minimum.
- At $x = 0$ the second derivative is 0, which does not decide. The gradient $4x^2(x - 3)$ is negative just to the left of 0 and also just to the right (since $x^2 > 0$ and $x - 3 < 0$), so the curve keeps falling: $(0, 0)$ is a stationary point of inflection.`,
    traps: {
      1: t`Assumes that $\dfrac{\mathrm{d}^2y}{\mathrm{d}x^2} = 0$ means a maximum. A zero second derivative decides nothing; the gradient has the same sign on both sides of $x = 0$.`,
      2: t`Divides $4x^3 - 12x^2 = 0$ by $x^2$ and loses the root $x = 0$.`,
      3: t`Reads the positive second derivative at $x = 3$ as a maximum.`,
      4: t`$y = x^4 - 4x^3$ is positive just to the left of 0 and negative just to the right, so $(0, 0)$ cannot be a minimum.`,
      5: t`Swaps the two: $(3, -27)$ is a minimum, and $(0, 0)$ cannot be a minimum because $y < 0$ just to the right of 0.`,
    },
    insight: t`When $\dfrac{\mathrm{d}^2y}{\mathrm{d}x^2} = 0$ at a stationary point, test the sign of $\dfrac{\mathrm{d}y}{\mathrm{d}x}$ on either side: a squared factor such as $x^2$ gives no change of sign.`,
    skills: ['stationary points', 'second derivative', 'points of inflection'],
  },
  {
    id: '3-M2-20',
    module: 'M2',
    n: 20,
    topic: 'MM6',
    spec: ['MM6.3', 'MM8.1'],
    title: 'The largest rectangle under a parabola',
    difficulty: 3,
    time: 95,
    stem: t`A rectangle has two of its vertices on the $x$-axis and the other two on the curve $y = 12 - x^2$, above the $x$-axis.`,
    diagram: 'p3-m2-rect',
    diagramAlt: 'The parabola y = 12 − x², symmetric about the y-axis with its vertex at (0, 12). A rectangle stands on the x-axis with its two upper corners on the curve.',
    prompt: t`What is the greatest possible area of the rectangle?`,
    options: [t`$16$`, t`$22$`, t`$24$`, t`$32$`, t`$36$`, t`$48$`],
    answer: 3,
    hints: [t`The upper vertices are at the same height, so they are $(x, 12 - x^2)$ and $(-x, 12 - x^2)$: the width is $2x$.`],
    solution: t`The two upper vertices are at the same height, so by the symmetry of the curve they are $(x, 12 - x^2)$ and $(-x, 12 - x^2)$, with $0 < x < 2\sqrt{3}$. The area is
$$A = 2x(12 - x^2) = 24x - 2x^3.$$

$$\frac{\mathrm{d}A}{\mathrm{d}x} = 24 - 6x^2 = 0 \quad\Rightarrow\quad x = 2,$$
and $\dfrac{\mathrm{d}^2A}{\mathrm{d}x^2} = -12x < 0$, so this is a maximum. The rectangle is 4 wide and 8 high, with area 32.`,
    traps: {
      0: t`Uses $x$ for the width instead of $2x$.`,
      1: t`Maximises the perimeter, $4x + 2(12 - x^2)$, instead of the area.`,
      5: t`Uses 12 for the height at $x = 2$; the height is $12 - x^2 = 8$.`,
    },
    insight: t`In an optimisation problem, use the constraint (here, corners on the curve) to write the quantity in terms of one variable, then differentiate.`,
    skills: ['optimisation', 'differentiation', 'maximum points'],
  },
  {
    id: '3-M2-21',
    module: 'M2',
    n: 21,
    topic: 'MM7',
    spec: ['MM7.5', 'MM5.1', 'MM4.4'],
    title: 'When does the trapezium rule overestimate?',
    difficulty: 3,
    time: 95,
    stem: t`The trapezium rule, with 4 strips of equal width, is used to estimate each of the integrals below.`,
    statements: [
      t`For $\displaystyle\int_0^2 2^x\,\mathrm{d}x$, the estimate is greater than the exact value.`,
      t`For $\displaystyle\int_{-1}^{1} x^3\,\mathrm{d}x$, the estimate is greater than the exact value.`,
      t`For $\displaystyle\int_0^{\pi} \sin x\,\mathrm{d}x$, the estimate is less than the exact value.`,
    ],
    prompt: t`Which of the statements is/are correct?`,
    options: STATEMENT_OPTIONS,
    answer: ST.s13,
    hints: [t`Sketch each graph. Where a graph bends upwards the chords lie above it; where it bends downwards they lie below it.`],
    solution: t`**Statement 1.** The graph of $y = 2^x$ bends upwards everywhere, so each chord lies above the curve and every trapezium has more area than the strip under the curve: an overestimate. ✓

**Statement 2.** The ordinates at $x = -1, -\tfrac{1}{2}, 0, \tfrac{1}{2}, 1$ are $-1, -\tfrac{1}{8}, 0, \tfrac{1}{8}, 1$, so the estimate is
$$\frac{1}{2} \times \frac{1}{2}\left[-1 + 1 + 2\left(-\frac{1}{8} + 0 + \frac{1}{8}\right)\right] = 0,$$
which equals the exact value, 0. The curve bends down on $[-1, 0]$ and up on $[0, 1]$, and by symmetry the two errors cancel. The estimate is not greater. ✗

**Statement 3.** The graph of $y = \sin x$ bends downwards on $[0, \pi]$, so the chords lie below the curve: the estimate, about 1.90, is less than the exact value, 2. ✓

Statements 1 and 3 only.`,
    solutionDiagram: 'p3-m2-cubic-trap-sol',
    traps: {
      [ST.all]: t`Statement 2 fails: $x^3$ changes from bending down to bending up at $x = 0$, and the over- and underestimates cancel exactly.`,
      [ST.s1]: t`Statement 3 is also true: $\sin x$ bends downwards on $[0, \pi]$, so the trapezium rule underestimates.`,
      [ST.s12]: t`For $x^3$ on $[-1, 1]$ the estimate equals the exact value, 0, so it is not greater.`,
    },
    insight: t`The trapezium rule overestimates where a graph bends upwards and underestimates where it bends downwards. If the bending changes, check whether the errors cancel.`,
    skills: ['trapezium rule', 'concavity', 'exponential graphs', 'trigonometric graphs'],
  },
  {
    id: '3-M2-22',
    module: 'M2',
    n: 22,
    topic: 'MM8',
    spec: ['MM8.2a', 'MM8.2b', 'MM8.2c', 'MM8.1'],
    title: 'Three transformations of a graph',
    difficulty: 3,
    time: 100,
    stem: t`The graph of $y = f(x)$ consists of straight-line segments joining the points $(-2, 0)$, $(0, 2)$, $(2, 0)$ and $(3, -1)$.`,
    diagram: 'p3-m2-f',
    diagramAlt: 'The graph of y = f(x): straight-line segments joining (−2, 0), (0, 2), (2, 0) and (3, −1).',
    prompt: t`Which of the following is the graph of $y = 2f(x + 1) - 1$?`,
    options: [
      { diagram: 'p3-m2-tf-a', alt: 'Straight-line segments joining (−1, −1), (1, 3), (3, −1) and (4, −3)' },
      { diagram: 'p3-m2-tf-f', alt: 'Straight-line segments joining (−3, −1), (−1, 3), (1, −1) and (2, −3)' },
      { diagram: 'p3-m2-tf-b', alt: 'Straight-line segments joining (−3, −2), (−1, 2), (1, −2) and (2, −4)' },
      { diagram: 'p3-m2-tf-c', alt: 'Straight-line segments joining (−2, −1), (0, 3), (2, −1) and (3, −3)' },
      { diagram: 'p3-m2-tf-d', alt: 'Straight-line segments joining (−3, −1), (−1, 0), (1, −1) and (2, −1.5)' },
      { diagram: 'p3-m2-tf-e', alt: 'Straight-line segments joining (−3, 1), (−1, 5), (1, 1) and (2, −1)' },
    ],
    answer: 1,
    hints: [t`Follow the four corner points. Inside the bracket, $x + 1$ moves the graph left; outside, multiply the $y$-values by 2 and then subtract 1.`],
    solution: t`Follow the corner points. For $y = 2f(x + 1) - 1$:

- $f(x + 1)$ translates the graph 1 unit to the **left**: $(x, y) \mapsto (x - 1, y)$.
- $2f(x + 1)$ then stretches it parallel to the $y$-axis by a factor of 2: $y \mapsto 2y$.
- Finally, $-1$ translates it 1 unit down: $2y \mapsto 2y - 1$.

| $y = f(x)$ | $(-2, 0)$ | $(0, 2)$ | $(2, 0)$ | $(3, -1)$ |
|---|---|---|---|---|
| $y = 2f(x + 1) - 1$ | $(-3, -1)$ | $(-1, 3)$ | $(1, -1)$ | $(2, -3)$ |

Only graph B passes through all four of these points.`,
    traps: {
      0: t`Translates to the right. At $x$, the new graph takes the value $f$ had at $x + 1$, so every point moves 1 unit **left**.`,
      2: t`Subtracts 1 before doubling, which gives $2\big(f(x + 1) - 1\big)$: the $y$-values become $2y - 2$.`,
      3: t`Leaves out the horizontal translation.`,
      4: t`Halves the $y$-values instead of doubling them.`,
      5: t`Adds 1 instead of subtracting it.`,
    },
    insight: t`A change inside the bracket acts on $x$, the opposite way to how it looks; changes outside act on $y$, in the order you would evaluate them.`,
    skills: ['transformations of graphs', 'composite transformations'],
  },
  {
    id: '3-M2-23',
    module: 'M2',
    n: 23,
    topic: 'MM4',
    spec: ['MM4.2', 'MM4.3', 'MM3.3b'],
    title: 'A circle inscribed in a sector',
    difficulty: 4,
    time: 115,
    stem: t`The diagram shows a sector $OAB$ of a circle with centre $O$ and radius $9$, where angle $AOB = \dfrac{\pi}{3}$. A circle inside the sector touches $OA$, $OB$ and the arc $AB$.`,
    diagram: 'p3-m2-sector',
    diagramAlt: 'A sector OAB with centre O, radius 9 and angle π/3 at O. A circle inside the sector touches the two straight edges OA and OB and the arc AB.',
    prompt: t`What fraction of the area of the sector lies inside the circle?`,
    options: [t`$\dfrac{1}{9}$`, t`$\dfrac{1}{3}$`, t`$\dfrac{4}{9}$`, t`$\dfrac{1}{2}$`, t`$\dfrac{2}{3}$`, t`$\dfrac{3}{4}$`],
    answer: 4,
    hints: [t`The centre $C$ of the circle lies on the line that bisects angle $AOB$. Draw the radius from $C$ to the point where the circle touches $OA$.`],
    solution: t`Let the circle have centre $C$ and radius $r$. It touches $OA$ and $OB$, so $C$ is the same distance from both lines and lies on the bisector of angle $AOB$: angle $AOC = \dfrac{\pi}{6}$.

Let $T$ be the point where the circle touches $OA$. A tangent is perpendicular to the radius at the point of contact, so triangle $OTC$ has a right angle at $T$, and
$$\sin\frac{\pi}{6} = \frac{CT}{OC} = \frac{r}{OC} \quad\Rightarrow\quad OC = 2r.$$

The circle touches the arc on the line $OC$ extended, so $OC + r = 9$. Then $3r = 9$ and $r = 3$.

$$\frac{\text{area of circle}}{\text{area of sector}} = \frac{\pi \times 3^2}{\frac{1}{2} \times 9^2 \times \frac{\pi}{3}} = \frac{9\pi}{\frac{27\pi}{2}} = \frac{2}{3}.$$`,
    solutionDiagram: 'p3-m2-sector-sol',
    traps: {
      0: t`Compares the circle with the whole circle of radius 9 instead of with the sector.`,
      2: t`Uses $2\pi r$, the circumference, in place of the area $\pi r^2$.`,
    },
    insight: t`A circle that touches two lines has its centre on the bisector of the angle between them, and the radius to each point of contact is perpendicular to the line.`,
    skills: ['radians', 'sector area', 'tangent and radius', 'exact trigonometric values'],
  },
  {
    id: '3-M2-24',
    module: 'M2',
    n: 24,
    topic: 'MM4',
    spec: ['MM4.6', 'MM4.3'],
    title: 'Sum of the solutions of a squared trigonometric equation',
    difficulty: 4,
    time: 125,
    stem: t`What is the sum of all the solutions of
$$\sin^2\left(2x + \frac{\pi}{3}\right) = \frac{1}{2}$$
in the interval $0 \le x \le \pi$?`,
    options: [t`$\dfrac{7\pi}{6}$`, t`$\dfrac{11\pi}{8}$`, t`$\dfrac{5\pi}{3}$`, t`$\dfrac{7\pi}{3}$`, t`$3\pi$`, t`$4\pi$`],
    answer: 3,
    hints: [t`Let $\theta = 2x + \dfrac{\pi}{3}$. What interval does $\theta$ lie in?`, t`$\sin\theta = \pm\dfrac{1}{\sqrt{2}}$: both signs count.`],
    solution: t`Let $\theta = 2x + \dfrac{\pi}{3}$. As $x$ runs from $0$ to $\pi$, $\theta$ runs from $\dfrac{\pi}{3}$ to $\dfrac{7\pi}{3}$.

$\sin^2\theta = \tfrac{1}{2}$ means $\sin\theta = \pm\dfrac{1}{\sqrt{2}}$, so $\theta$ is an odd multiple of $\dfrac{\pi}{4}$. In the interval from $\dfrac{\pi}{3}$ to $\dfrac{7\pi}{3}$:
$$\theta = \frac{3\pi}{4},\ \frac{5\pi}{4},\ \frac{7\pi}{4},\ \frac{9\pi}{4}.$$
($\tfrac{\pi}{4}$ is less than $\tfrac{\pi}{3}$, and $\tfrac{9\pi}{4} = 2.25\pi$ is less than $\tfrac{7\pi}{3} \approx 2.33\pi$.)

Then $x = \dfrac{1}{2}\left(\theta - \dfrac{\pi}{3}\right)$ gives
$$x = \frac{5\pi}{24},\ \frac{11\pi}{24},\ \frac{17\pi}{24},\ \frac{23\pi}{24},$$
and the sum is $\dfrac{56\pi}{24} = \dfrac{7\pi}{3}$.

Shortcut: the four values of $\theta$ add up to $6\pi$, so the four values of $x$ add up to $\tfrac{1}{2}\left(6\pi - 4 \times \tfrac{\pi}{3}\right) = \tfrac{7\pi}{3}$.`,
    traps: {
      0: t`Uses only $\sin\theta = +\dfrac{1}{\sqrt{2}}$, which gives two of the four solutions.`,
      1: t`Stops at $\theta = 2\pi$ and misses $\theta = \dfrac{9\pi}{4}$, which is still inside the interval.`,
      2: t`Uses $\theta = 2x - \dfrac{\pi}{3}$: a sign slip in the phase shift.`,
      4: t`Forgets to subtract $\dfrac{\pi}{3}$ when converting back to $x$.`,
      5: t`Adds the solutions of $\sin^2\theta = \tfrac{1}{2}$ for $0 \le \theta \le 2\pi$, without changing the interval or converting back to $x$.`,
    },
    insight: t`For an equation in $\sin(ax + b)$, change the interval to one for $ax + b$ before solving, and for $\sin^2$ take both square roots.`,
    skills: ['trigonometric equations', 'exact values', 'radians'],
  },
  {
    id: '3-M2-25',
    module: 'M2',
    n: 25,
    topic: 'MM7',
    spec: ['MM7.1', 'MM8.7'],
    title: 'A line through the origin that halves an area',
    difficulty: 4,
    time: 130,
    stem: t`The region $R$ is enclosed by the curve $y = 2x - x^2$ and the $x$-axis. The line $y = kx$, where $0 < k < 2$, divides $R$ into two parts of equal area.

What is the value of $k$?`,
    options: [t`$\dfrac{2}{3}$`, t`$2 - \sqrt[3]{4}$`, t`$2 - \sqrt[3]{2}$`, t`$2 - \sqrt{2}$`, t`$1$`, t`$\sqrt[3]{4}$`],
    answer: 1,
    hints: [t`Find the area of $R$ first. Then find where the line meets the curve, and the area between them, in terms of $k$.`],
    solution: t`The curve meets the $x$-axis at $x = 0$ and $x = 2$, so
$$\text{area of } R = \int_0^2 (2x - x^2)\,\mathrm{d}x = 4 - \frac{8}{3} = \frac{4}{3}.$$

The line meets the curve where $kx = 2x - x^2$, that is at $x = 0$ and $x = 2 - k$. The part of $R$ above the line has area
$$\int_0^{2-k} \big((2 - k)x - x^2\big)\,\mathrm{d}x = \frac{(2 - k)^3}{2} - \frac{(2 - k)^3}{3} = \frac{(2 - k)^3}{6}.$$

For equal parts this must be half of $\tfrac{4}{3}$:
$$\frac{(2 - k)^3}{6} = \frac{2}{3} \quad\Rightarrow\quad (2 - k)^3 = 4 \quad\Rightarrow\quad k = 2 - \sqrt[3]{4}.$$`,
    solutionDiagram: 'p3-m2-halve-sol',
    traps: {
      4: t`The line through the top of the curve, $(1, 1)$, does not halve the area: the region is symmetric about $x = 1$, but a line through the origin cuts it unevenly.`,
      2: t`Halves the area twice, solving $\tfrac{(2 - k)^3}{6} = \tfrac{1}{3}$.`,
      3: t`Assumes the area above the line scales with the square of its width, as for similar triangles; it scales with the cube.`,
      5: t`This is $2 - k$, where the line meets the curve, not $k$.`,
    },
    insight: t`The area between $y = x(a - x)$ and the $x$-axis is $\dfrac{a^3}{6}$. The same result gives the area between the curve and a line through the origin, because the difference is again of the form $x(b - x)$.`,
    skills: ['area between curves', 'definite integrals', 'cube roots'],
  },
  {
    id: '3-M2-26',
    module: 'M2',
    n: 26,
    topic: 'MM7',
    spec: ['MM7.3b', 'MM7.3a'],
    title: 'An integral with a variable upper limit',
    difficulty: 3,
    time: 100,
    stem: t`The function $f$ satisfies
$$\int_2^x f(t)\,\mathrm{d}t = x^3 - 3x^2 + k$$
for all real $x$, where $k$ is a constant.

What is the value of $f(k)$?`,
    options: [t`$0$`, t`$4$`, t`$9$`, t`$20$`, t`$24$`, t`$72$`],
    answer: 4,
    hints: [t`What is the value of the integral when $x = 2$?`, t`Differentiate both sides with respect to $x$.`],
    solution: t`**Finding $k$.** When $x = 2$ the integral runs from 2 to 2, so it is zero:
$$0 = 8 - 12 + k \quad\Rightarrow\quad k = 4.$$

**Finding $f$.** By the fundamental theorem of calculus, differentiating the left side with respect to $x$ gives $f(x)$, so
$$f(x) = \frac{\mathrm{d}}{\mathrm{d}x}\left(x^3 - 3x^2 + 4\right) = 3x^2 - 6x.$$

Hence $f(k) = f(4) = 48 - 24 = 24$.`,
    traps: {
      0: t`Evaluates $f(2)$, or assumes $k = 0$. The integral vanishes at $x = 2$, which gives $k = 4$.`,
      1: t`This is $k$, not $f(k)$.`,
      3: t`Evaluates the integral at $x = 4$, $64 - 48 + 4$, instead of $f(4)$.`,
      5: t`Sign slip: $8 - 12 + k = 0$ gives $k = 4$, not $-4$.`,
    },
    insight: t`If $\displaystyle\int_a^x f(t)\,\mathrm{d}t = G(x)$, then $G(a) = 0$ and $G'(x) = f(x)$: substitute the lower limit, then differentiate.`,
    skills: ['fundamental theorem of calculus', 'differentiation'],
  },
  {
    id: '3-M2-27',
    module: 'M2',
    n: 27,
    topic: 'MM6',
    spec: ['MM6.3', 'MM8.6', 'MM8.5a'],
    title: 'How many tangents pass through a point?',
    difficulty: 5,
    time: 145,
    stem: t`Consider the curve $y = x^3 - 3x$ and the point $(a, 0)$, where $a$ is a constant.

For which values of $a$ do exactly three different tangents to the curve pass through the point $(a, 0)$?`,
    options: [t`$|a| > \sqrt{3}$`, t`$0 < |a| < \sqrt{3}$`, t`$a > \sqrt{3}$`, t`$|a| \ge \sqrt{3}$`, t`$|a| > 3$`, t`all $a \ne 0$`],
    answer: 0,
    hints: [
      t`Write down the tangent at the point where $x = t$ and make it pass through $(a, 0)$. This gives an equation for $t$.`,
      t`Each real root $t$ gives a different tangent. When does a cubic equation have three distinct real roots?`,
    ],
    solution: t`The tangent at the point where $x = t$ has gradient $3t^2 - 3$:
$$y = (3t^2 - 3)(x - t) + t^3 - 3t.$$

It passes through $(a, 0)$ when $0 = (3t^2 - 3)(a - t) + t^3 - 3t$, which simplifies to
$$h(t) = 2t^3 - 3at^2 + 3a = 0.$$

Different values of $t$ give different tangents (a straight line cannot touch a cubic curve at two different points), so we need $h(t) = 0$ to have three distinct real roots.

$h'(t) = 6t^2 - 6at = 6t(t - a)$, so $h$ has turning points at $t = 0$ and $t = a$, with
$$h(0) = 3a \qquad \text{and} \qquad h(a) = 3a - a^3 = a(3 - a^2).$$

A cubic has three distinct real roots exactly when its two turning values have opposite signs:
$$h(0)\,h(a) = 3a^2(3 - a^2) < 0 \quad\Leftrightarrow\quad a^2 > 3 \quad\Leftrightarrow\quad |a| > \sqrt{3}.$$

(When $a = 0$, $h(t) = 2t^3$ has only one root.) So there are exactly three tangents when $|a| > \sqrt{3}$: the point lies on the $x$-axis beyond the outer roots, $\pm\sqrt{3}$, of the curve.`,
    solutionDiagram: 'p3-m2-tangents-sol',
    traps: {
      1: t`Reverses the condition: for $0 < |a| < \sqrt{3}$ there is only one tangent.`,
      2: t`The curve has rotational symmetry about the origin, so $a < -\sqrt{3}$ works just as well as $a > \sqrt{3}$.`,
      3: t`At $a = \pm\sqrt{3}$, $h$ has a repeated root, so there are only two different tangents.`,
      5: t`A cubic equation need not have three real roots; here it has three only when the turning values of $h$ have opposite signs.`,
    },
    insight: t`To count the tangents through a point, call the point of contact $x = t$: the number of tangents is the number of real roots of the resulting equation in $t$.`,
    skills: ['tangents', 'stationary points', 'number of real roots', 'cubic graphs'],
  },
];
