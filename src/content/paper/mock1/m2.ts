import type { Question } from '../../types';

const t = String.raw;

/**
 * ESAT Crucible predicted paper — Mathematics 2.
 * 27 questions, 40 minutes, no calculator. Content from MM1-MM8 (plus
 * assumed M1 knowledge). Differentiation and integration are restricted to
 * powers of x, as in the official specification; change of base for
 * logarithms is never required.
 */
export const M2: Question[] = [
  {
    id: 'M2-01',
    module: 'M2',
    n: 1,
    topic: 'MM1',
    spec: ['MM1.1', 'MM1.3'],
    title: 'A quadratic in disguise (fractional indices)',
    difficulty: 2,
    time: 75,
    stem: t`What is the sum of the real solutions of
$$x^{\frac23} - 5x^{\frac13} + 6 = 0\,?$$`,
    options: [t`$5$`, t`$13$`, t`$35$`, t`$36$`, t`$125$`, t`$216$`],
    answer: 2,
    hints: [t`Let $u = x^{\frac13}$. What is $x^{\frac23}$ in terms of $u$?`],
    solution: t`Let $u = x^{\frac13}$, so that $x^{\frac23} = u^2$. The equation becomes
$$u^2 - 5u + 6 = 0 \;\Rightarrow\; (u - 2)(u - 3) = 0,$$
so $u = 2$ or $u = 3$.

Cubing, $x = 8$ or $x = 27$. The sum of the solutions is $8 + 27 = 35$.`,
    traps: {
      0: t`This is the sum of the values of $u$, not of $x$.`,
      1: t`This is $u^2$ summed ($4 + 9$): the values of $x^{2/3}$, not $x$.`,
      4: t`Cubes the sum of the $u$ values instead of cubing each value.`,
    },
    insight: t`Spot "hidden quadratics": if one power is double another, substitute for the smaller power.`,
    skills: ['indices', 'substitution', 'quadratics'],
  },
  {
    id: 'M2-02',
    module: 'M2',
    n: 2,
    topic: 'MM2',
    spec: ['MM2.2'],
    title: 'A term from the sum formula',
    difficulty: 2,
    time: 75,
    stem: t`The sum of the first $n$ terms of an arithmetic sequence is given by
$$S_n = 3n^2 + 5n.$$

What is the 10th term of the sequence?`,
    options: [t`56`, t`62`, t`65`, t`68`, t`288`, t`350`],
    answer: 1,
    hints: [t`The 10th term is the sum of the first 10 terms minus the sum of the first 9 terms.`],
    solution: t`The 10th term is the difference of two consecutive sums:
$$u_{10} = S_{10} - S_9 = (300 + 50) - (243 + 45) = 350 - 288 = 62.$$

**Check.** $u_1 = S_1 = 8$ and the common difference is $2 \times 3 = 6$, so $u_n = 6n + 2$ and $u_{10} = 62$ ✓`,
    traps: {
      0: t`This is the 9th term, $u_9 = 56$.`,
      3: t`This is the 11th term: an off-by-one error.`,
      4: t`This is $S_9$, not a single term.`,
      5: t`This is $S_{10}$, the sum of ten terms.`,
    },
    insight: t`For any sequence, $u_n = S_n - S_{n-1}$. For an arithmetic sequence, $S_n = An^2 + Bn$ has common difference $2A$.`,
    skills: ['arithmetic series', 'sum formula'],
  },
  {
    id: 'M2-03',
    module: 'M2',
    n: 3,
    topic: 'MM5',
    spec: ['MM5.3', 'MM1.1'],
    title: 'An exponential equation that is really a quadratic',
    difficulty: 2,
    time: 90,
    stem: t`What is the sum of the real solutions of
$$2^{2x+1} - 5 \times 2^x + 2 = 0\,?$$`,
    options: [t`$0$`, t`$\dfrac12$`, t`$1$`, t`$2$`, t`$\dfrac52$`, t`$3$`],
    answer: 0,
    hints: [t`$2^{2x+1} = 2 \times \left(2^x\right)^2$. Let $y = 2^x$.`],
    solution: t`Since $2^{2x+1} = 2 \times (2^x)^2$, let $y = 2^x$ (where $y > 0$):
$$2y^2 - 5y + 2 = 0 \;\Rightarrow\; (2y - 1)(y - 2) = 0.$$

So $y = \tfrac12$ or $y = 2$, giving $x = -1$ or $x = 1$. The sum of the solutions is $-1 + 1 = 0$.`,
    traps: {
      4: t`This is the sum of the values of $y = 2^x$, not of $x$.`,
      2: t`This is the product of the values of $y$ (or only one of the solutions).`,
    },
    insight: t`Equations built from $a^{2x}$, $a^{2x+1}$ and $a^{x+1}$ are quadratics in disguise: with $y = a^x$ they become $y^2$, $ay^2$ and $ay$. Remember that $y > 0$.`,
    skills: ['exponential equations', 'substitution'],
  },
  {
    id: 'M2-04',
    module: 'M2',
    n: 4,
    topic: 'MM7',
    spec: ['MM7.6', 'MM7.2'],
    title: 'Finding a curve from its gradient',
    difficulty: 2,
    time: 90,
    stem: t`A curve has gradient function
$$\frac{\mathrm{d}y}{\mathrm{d}x} = 3\sqrt{x} - \frac{2}{x^2}, \qquad x > 0,$$
and passes through the point $(1, 5)$.

What is the value of $y$ when $x = 4$?`,
    options: [t`$16$`, t`$\dfrac{33}{2}$`, t`$17$`, t`$\dfrac{35}{2}$`, t`$18$`, t`$\dfrac{41}{2}$`],
    answer: 3,
    hints: [t`Write the gradient as $3x^{\frac12} - 2x^{-2}$ and integrate term by term. Do not forget the constant.`],
    solution: t`Write $\dfrac{\mathrm{d}y}{\mathrm{d}x} = 3x^{\frac12} - 2x^{-2}$ and integrate:
$$y = 3 \cdot \frac{x^{\frac32}}{\frac32} - 2 \cdot \frac{x^{-1}}{-1} + c = 2x^{\frac32} + \frac{2}{x} + c.$$

At $(1, 5)$: $2 + 2 + c = 5$, so $c = 1$.

At $x = 4$:
$$y = 2(8) + \frac{2}{4} + 1 = \frac{35}{2}.$$`,
    traps: {
      1: t`Forgets the constant of integration.`,
      5: t`Integrates $-2x^{-2}$ to $-2x^{-1}$: the sign from dividing by $-1$ has been missed.`,
    },
    insight: t`Rewrite roots and fractions as powers before integrating, and always use the given point to find $c$.`,
    skills: ['integration', 'differential equations', 'indices'],
  },
  {
    id: 'M2-05',
    module: 'M2',
    n: 5,
    topic: 'MM1',
    spec: ['MM1.5'],
    title: 'An inequality with the unknown in the denominator',
    difficulty: 3,
    time: 90,
    stem: t`Find the complete set of values of $x$ for which
$$\frac{x}{x - 2} > 3.$$`,
    options: [t`$x > 3$`, t`$x < 3$`, t`$x > 2$`, t`$x < 2$ or $x > 3$`, t`$x < 2$`, t`$2 < x < 3$`],
    answer: 5,
    hints: [
      t`You cannot simply multiply by $x - 2$: its sign is unknown.`,
      t`Multiply both sides by $(x - 2)^2$, which is positive.`,
    ],
    solution: t`$x - 2$ may be negative, so multiply both sides by $(x - 2)^2 > 0$ instead:
$$x(x - 2) > 3(x - 2)^2.$$

Rearranging and factorising:
$$(x - 2)\big[x - 3(x - 2)\big] > 0 \;\Rightarrow\; (x - 2)(6 - 2x) > 0 \;\Rightarrow\; (x - 2)(x - 3) < 0.$$

So $2 < x < 3$.

**Check.** At $x = 2.5$, $\dfrac{2.5}{0.5} = 5 > 3$ ✓. At $x = 4$, $\dfrac{4}{2} = 2 < 3$ ✗`,
    traps: {
      1: t`Multiplies by $x - 2$ as if it were positive: $x > 3x - 6$ gives $x < 3$.`,
      3: t`A sign error at the end reverses the solution set.`,
    },
    insight: t`Never multiply an inequality by an expression of unknown sign. Multiply by its square, or bring everything to one side as a single fraction.`,
    skills: ['inequalities', 'rational expressions'],
  },
  {
    id: 'M2-06',
    module: 'M2',
    n: 6,
    topic: 'MM1',
    spec: ['MM1.3'],
    title: 'Two distinct roots — check the leading coefficient',
    difficulty: 3,
    time: 90,
    stem: t`The equation
$$(k - 1)x^2 + 2kx + (k + 2) = 0$$
has two distinct real roots.

What is the complete set of possible values of $k$?`,
    options: [
      t`$k < 2$`,
      t`$k > 2$`,
      t`$1 < k < 2$`,
      t`$k \le 2$ and $k \ne 1$`,
      t`$k < 2$ and $k \ne 1$`,
      t`$k < -2$`,
    ],
    answer: 4,
    hints: [t`If $k = 1$ the equation is not a quadratic at all. How many roots does it have then?`],
    solution: t`**Discriminant.** For two distinct real roots, $b^2 - 4ac > 0$:
$$(2k)^2 - 4(k - 1)(k + 2) = 4k^2 - 4(k^2 + k - 2) = 8 - 4k > 0 \;\Rightarrow\; k < 2.$$

**Leading coefficient.** If $k = 1$ the equation becomes $2x + 3 = 0$, which has only one root. So $k \ne 1$.

The complete set is $k < 2$ and $k \ne 1$.`,
    traps: {
      0: t`Forgets that $k = 1$ makes the equation linear, with only one root.`,
      3: t`At $k = 2$ the discriminant is zero: a repeated root, not two distinct roots.`,
    },
    insight: t`Whenever the $x^2$ coefficient contains a parameter, check separately the value that makes it zero.`,
    skills: ['discriminant', 'quadratics'],
  },
  {
    id: 'M2-07',
    module: 'M2',
    n: 7,
    topic: 'MM3',
    spec: ['MM3.2a', 'MM1.3'],
    title: 'Tangents from the origin to a circle',
    difficulty: 3,
    time: 100,
    stem: t`The line $y = mx$ is a tangent to the circle $(x - 4)^2 + y^2 = 4$.

What are the possible values of $m$?`,
    options: [
      t`$\pm\dfrac13$`,
      t`$\pm\dfrac12$`,
      t`$\pm\dfrac{1}{\sqrt3}$`,
      t`$\pm\dfrac{\sqrt3}{2}$`,
      t`$\pm\dfrac{2}{\sqrt3}$`,
      t`$\pm\sqrt3$`,
    ],
    answer: 2,
    hints: [t`Substitute $y = mx$ into the circle. A tangent meets the circle exactly once: use the discriminant.`],
    solution: t`Substituting $y = mx$:
$$(x - 4)^2 + m^2x^2 = 4 \;\Rightarrow\; (1 + m^2)x^2 - 8x + 12 = 0.$$

For a tangent this has a repeated root, so the discriminant is zero:
$$64 - 48(1 + m^2) = 0 \;\Rightarrow\; m^2 = \frac13 \;\Rightarrow\; m = \pm\frac{1}{\sqrt3}.$$

**Geometric check.** The centre $(4, 0)$ is 4 from the origin and the radius is 2. The tangent makes an angle $\alpha$ with the $x$-axis where $\sin\alpha = \tfrac24$, so $\alpha = 30^\circ$ and $m = \pm\tan30^\circ$ ✓`,
    traps: {
      1: t`This is $\sin\alpha$, not the gradient $\tan\alpha$.`,
      5: t`This is $\tan60^\circ$: the wrong angle.`,
    },
    insight: t`Line meets curve: substitute and use the discriminant ($> 0$: two points; $= 0$: tangent; $< 0$: no intersection).`,
    skills: ['circles', 'tangents', 'discriminant'],
  },
  {
    id: 'M2-08',
    module: 'M2',
    n: 8,
    topic: 'MM2',
    spec: ['MM2.3'],
    title: 'A geometric series and its squares',
    difficulty: 3,
    time: 100,
    stem: t`A convergent geometric series has sum to infinity 12. The series formed by squaring each term of the original series has sum to infinity 48.

What is the first term of the original series?`,
    options: [t`4`, t`6`, t`8`, t`9`, t`12`, t`18`],
    answer: 1,
    hints: [
      t`The squared series is geometric with first term $a^2$ and common ratio $r^2$.`,
      t`Divide the second sum by the square of the first sum.`,
    ],
    solution: t`The squared series has first term $a^2$ and common ratio $r^2$, so
$$\frac{a}{1 - r} = 12 \qquad\text{and}\qquad \frac{a^2}{1 - r^2} = 48.$$

Divide the second equation by the square of the first:
$$\frac{a^2}{1 - r^2}\cdot\frac{(1 - r)^2}{a^2} = \frac{1 - r}{1 + r} = \frac{48}{144} = \frac13.$$

So $3 - 3r = 1 + r$, giving $r = \tfrac12$ and $a = 12\left(1 - \tfrac12\right) = 6$.

**Check.** $6 + 3 + 1.5 + \cdots = 12$, and $36 + 9 + 2.25 + \cdots = \dfrac{36}{3/4} = 48$ ✓`,
    traps: {
      5: t`Inverts the ratio to $\dfrac{1 + r}{1 - r} = \dfrac13$, giving $r = -\tfrac12$.`,
      4: t`This is the sum to infinity, not the first term.`,
      0: t`This is $48 \div 12$, which is not a meaningful step.`,
    },
    insight: t`Squaring every term of a geometric series gives another geometric series ($a \to a^2$, $r \to r^2$). Remember $1 - r^2 = (1 - r)(1 + r)$.`,
    skills: ['geometric series', 'sum to infinity'],
  },
  {
    id: 'M2-09',
    module: 'M2',
    n: 9,
    topic: 'MM4',
    spec: ['MM4.6', 'MM4.5b'],
    title: 'Counting solutions of a trigonometric equation',
    difficulty: 3,
    time: 100,
    stem: t`How many solutions does the equation
$$2\sin^2 x + 3\cos x = 3$$
have in the interval $0 \le x \le 4\pi$?`,
    options: [t`3`, t`4`, t`5`, t`6`, t`7`, t`8`],
    answer: 4,
    hints: [
      t`Use $\sin^2 x = 1 - \cos^2 x$ to get a quadratic in $\cos x$.`,
      t`The interval includes both of its endpoints.`,
    ],
    solution: t`Replace $\sin^2 x$ with $1 - \cos^2 x$:
$$2 - 2\cos^2 x + 3\cos x = 3 \;\Rightarrow\; 2\cos^2 x - 3\cos x + 1 = 0 \;\Rightarrow\; (2\cos x - 1)(\cos x - 1) = 0.$$

So $\cos x = 1$ or $\cos x = \tfrac12$.

- $\cos x = 1$: $x = 0,\ 2\pi,\ 4\pi$ — **3 solutions** (both endpoints count).
- $\cos x = \tfrac12$: $x = \tfrac{\pi}{3},\ \tfrac{5\pi}{3},\ \tfrac{7\pi}{3},\ \tfrac{11\pi}{3}$ — **4 solutions**.

That makes **7** solutions.`,
    traps: {
      3: t`Misses one of the endpoints $x = 0$ or $x = 4\pi$.`,
      1: t`Counts only the solutions of $\cos x = \tfrac12$.`,
    },
    insight: t`Count solutions over the whole interval with a quick sketch of $\cos x$, and check the endpoints carefully when the interval is closed.`,
    skills: ['trigonometric equations', 'identities'],
  },
  {
    id: 'M2-10',
    module: 'M2',
    n: 10,
    topic: 'MM7',
    spec: ['MM7.3b', 'MM7.3a'],
    title: 'The fundamental theorem of calculus',
    difficulty: 3,
    time: 100,
    stem: t`The function $F$ is defined by
$$F(x) = \int_1^x \left(3t^2 - 4t + k\right)\mathrm{d}t,$$
where $k$ is a constant. The graph of $y = F(x)$ has a stationary point at $x = 2$.

What is the value of $F(2)$?`,
    options: [t`$-8$`, t`$-5$`, t`$-3$`, t`$0$`, t`$3$`, t`$5$`],
    answer: 2,
    hints: [t`By the fundamental theorem of calculus, $F'(x) = 3x^2 - 4x + k$.`],
    solution: t`By the fundamental theorem of calculus, $F'(x) = 3x^2 - 4x + k$.

A stationary point at $x = 2$ means $F'(2) = 12 - 8 + k = 0$, so $k = -4$. Then
$$F(2) = \Big[t^3 - 2t^2 - 4t\Big]_1^2 = (8 - 8 - 8) - (1 - 2 - 4) = -8 + 5 = -3.$$`,
    traps: {
      0: t`Forgets to subtract the value at the lower limit $t = 1$.`,
      4: t`A sign error when subtracting the lower limit.`,
    },
    insight: t`$\dfrac{\mathrm{d}}{\mathrm{d}x}\displaystyle\int_a^x f(t)\,\mathrm{d}t = f(x)$: the derivative of an accumulated area is the height of the curve.`,
    skills: ['fundamental theorem of calculus', 'definite integrals', 'stationary points'],
  },
  {
    id: 'M2-11',
    module: 'M2',
    n: 11,
    topic: 'MM8',
    spec: ['MM8.1', 'MM8.7', 'MM1.7'],
    title: 'A modulus graph and a horizontal line',
    difficulty: 3,
    time: 90,
    stem: t`The equation
$$\left|x^2 - 4x\right| = k$$
has exactly four distinct real solutions.

What is the complete set of possible values of $k$?`,
    options: [
      t`$0 < k < 4$`,
      t`$k > 0$`,
      t`$0 < k < 2$`,
      t`$k = 4$`,
      t`$k > 4$`,
      t`$0 \le k \le 4$`,
    ],
    answer: 0,
    hints: [
      t`Sketch $y = x^2 - 4x$, then reflect the part below the $x$-axis.`,
      t`The reflected "hump" has its top at $(2, 4)$.`,
    ],
    solutionDiagram: 'm2-modulus-sol',
    solution: t`$y = x^2 - 4x = (x - 2)^2 - 4$ has roots $0$ and $4$ and minimum point $(2, -4)$. Taking the modulus reflects the part between $0$ and $4$ upwards, creating a hump with its top at $(2, 4)$.

Count the intersections with the horizontal line $y = k$:
- $k = 0$: 2 solutions ($x = 0, 4$);
- $0 < k < 4$: **4 solutions** (two on the hump, two on the outer arms);
- $k = 4$: 3 solutions (the top of the hump, plus two outside);
- $k > 4$: 2 solutions.

So $0 < k < 4$.`,
    traps: {
      3: t`At $k = 4$ the line just touches the top of the hump: only 3 solutions.`,
      1: t`Too wide: for $k > 4$ the line clears the hump and meets the graph only twice, and $k = 4$ gives three solutions.`,
      5: t`Includes $k = 0$ (2 solutions) and $k = 4$ (3 solutions).`,
    },
    insight: t`"How many solutions of $f(x) = k$" is a question about horizontal lines crossing the graph of $f$. Sketch first.`,
    skills: ['modulus function', 'graph sketching', 'number of solutions'],
  },
  {
    id: 'M2-12',
    module: 'M2',
    n: 12,
    topic: 'MM2',
    spec: ['MM2.4'],
    title: 'The term independent of x',
    difficulty: 3,
    time: 100,
    stem: t`What is the term independent of $x$ in the expansion of
$$\left(2x - \frac{1}{x^2}\right)^9\,?$$`,
    options: [t`$-10\,752$`, t`$-5376$`, t`$-2688$`, t`$-672$`, t`$672$`, t`$5376$`],
    answer: 1,
    hints: [t`Write down the general term and find the power of $x$ in it.`],
    solution: t`The general term is
$$\binom{9}{r}(2x)^{9-r}\left(-\frac{1}{x^2}\right)^r = \binom{9}{r}\,2^{9-r}\,(-1)^r\,x^{9-3r}.$$

It is independent of $x$ when $9 - 3r = 0$, i.e. $r = 3$:
$$\binom{9}{3}\,2^{6}\,(-1)^3 = 84 \times 64 \times (-1) = -5376.$$`,
    traps: {
      5: t`Loses the minus sign from $\left(-\tfrac{1}{x^2}\right)^3$.`,
      3: t`Uses $2^3$ instead of $2^6$: the power of 2 belongs to the other factor.`,
    },
    insight: t`For "term independent of $x$", find the general term's power of $x$ and set it to zero, keeping signs attached to each factor.`,
    skills: ['binomial expansion', 'indices'],
  },
  {
    id: 'M2-13',
    module: 'M2',
    n: 13,
    topic: 'MM5',
    spec: ['MM5.2'],
    title: 'Integers satisfying a logarithmic inequality',
    difficulty: 3,
    time: 100,
    stem: t`How many integers $x$ satisfy
$$2 < \log_3\left(x^2 - 1\right) < 4\,?$$`,
    options: [t`5`, t`6`, t`7`, t`8`, t`10`, t`12`],
    answer: 5,
    hints: [t`$\log_3$ is increasing, so you can undo it: $3^2 < x^2 - 1 < 3^4$.`],
    solution: t`$\log_3$ is an increasing function, so
$$3^2 < x^2 - 1 < 3^4 \;\Rightarrow\; 10 < x^2 < 82.$$

The square numbers strictly between 10 and 82 are $16, 25, 36, 49, 64, 81$, so $x = \pm4, \pm5, \ldots, \pm9$.

That is **12** integers.`,
    traps: {
      1: t`Forgets the negative integers, which satisfy the inequality just as well.`,
    },
    insight: t`Undo an increasing function on all parts of an inequality at once. Then watch for $x^2$: it brings negative solutions too.`,
    skills: ['logarithms', 'inequalities'],
  },
  {
    id: 'M2-14',
    module: 'M2',
    n: 14,
    topic: 'MM6',
    spec: ['MM6.3', 'MM1.3'],
    title: 'A cubic with a positive gradient everywhere',
    difficulty: 3,
    time: 90,
    stem: t`$f(x) = x^3 + kx^2 + 3x + 1$, where $k$ is a constant.

For which values of $k$ is $f'(x) > 0$ for all real values of $x$?`,
    options: [
      t`$k > -3$`,
      t`$-\sqrt3 < k < \sqrt3$`,
      t`$-3 \le k \le 3$`,
      t`$-3 < k < 3$`,
      t`$k < -3$ or $k > 3$`,
      t`$0 < k < 3$`,
    ],
    answer: 3,
    hints: [t`$f'(x)$ is a quadratic with positive $x^2$ coefficient. When is it never zero?`],
    solution: t`$f'(x) = 3x^2 + 2kx + 3$ is a quadratic with positive leading coefficient. It is positive for every $x$ exactly when it has no real roots:
$$(2k)^2 - 4(3)(3) < 0 \;\Rightarrow\; 4k^2 < 36 \;\Rightarrow\; -3 < k < 3.$$`,
    traps: {
      2: t`At $k = \pm3$, $f'(x) = 3(x \pm 1)^2$, which equals zero at one point, so $f'(x) > 0$ fails there.`,
      4: t`This is where $f'$ has two real roots: the opposite of what is required.`,
    },
    insight: t`"$ax^2 + bx + c > 0$ for all $x$" $\iff$ $a > 0$ and $b^2 - 4ac < 0$.`,
    skills: ['differentiation', 'discriminant', 'increasing functions'],
  },
  {
    id: 'M2-15',
    module: 'M2',
    n: 15,
    topic: 'MM3',
    spec: ['MM3.3d', 'MM3.2a'],
    title: 'A right angle on a line',
    difficulty: 3,
    time: 110,
    stem: t`The points $A(1, 2)$ and $B(7, 10)$ are given. The point $C$ lies on the line $y = 3$, and angle $ACB$ is a right angle.

There are two possible positions for $C$. What is the distance between them?`,
    options: [t`2`, t`4`, t`5`, t`6`, t`8`, t`10`],
    answer: 4,
    hints: [t`Angle in a semicircle: $C$ must lie on the circle with diameter $AB$.`],
    solution: t`Since angle $ACB = 90^\circ$, $C$ lies on the circle with diameter $AB$.

Its centre is the midpoint $(4, 6)$ and its radius is $\tfrac12\sqrt{6^2 + 8^2} = 5$:
$$(x - 4)^2 + (y - 6)^2 = 25.$$

With $y = 3$: $(x - 4)^2 = 16$, so $x = 0$ or $x = 8$. The two positions are $(0, 3)$ and $(8, 3)$, a distance **8** apart.

**Check.** At $C = (0, 3)$, $\overrightarrow{CA} = (1, -1)$ and $\overrightarrow{CB} = (7, 7)$. The gradients are $-1$ and $1$, which multiply to $-1$ ✓`,
    traps: {
      5: t`This is the length of $AB$ (the diameter).`,
      2: t`This is the radius of the circle.`,
    },
    insight: t`A right angle subtended by a fixed segment means a circle on that segment as diameter.`,
    skills: ['circle geometry', 'coordinate geometry'],
  },
  {
    id: 'M2-16',
    module: 'M2',
    n: 16,
    topic: 'MM7',
    spec: ['MM7.5'],
    title: 'How good is the trapezium rule?',
    difficulty: 3,
    time: 100,
    stem: t`The trapezium rule with 4 strips of equal width is used to estimate
$$\int_0^4 x^2\,\mathrm{d}x.$$

Which of the following correctly describes the estimate?`,
    options: [
      t`It is an underestimate by $\tfrac23$.`,
      t`It is an overestimate by $\tfrac23$.`,
      t`It is an overestimate by $\tfrac13$.`,
      t`It is an underestimate by $\tfrac13$.`,
      t`It is an overestimate by $\tfrac43$.`,
      t`It is exactly correct.`,
    ],
    answer: 1,
    hints: [t`With strip width $h = 1$, the rule gives $\tfrac12 h\left[y_0 + 2(y_1 + y_2 + y_3) + y_4\right]$.`],
    solution: t`With $h = 1$ and $y$-values $0, 1, 4, 9, 16$:
$$T = \tfrac12 \times 1 \times \big[0 + 2(1 + 4 + 9) + 16\big] = \tfrac12 \times 44 = 22.$$

The exact value is $\left[\tfrac{x^3}{3}\right]_0^4 = \tfrac{64}{3} = 21\tfrac13$.

So $T$ is too big by $22 - 21\tfrac13 = \tfrac23$: an **overestimate by $\tfrac23$**. This is expected, because $y = x^2$ curves upwards (it is convex), so every chord lies above the curve.`,
    traps: {
      0: t`Right size, wrong direction: for a curve that bends upwards the trapezia sit above it.`,
      5: t`The trapezium rule is only exact for straight-line graphs.`,
    },
    insight: t`Trapezium rule: overestimates where the curve is convex (bends up), underestimates where it is concave (bends down).`,
    skills: ['trapezium rule', 'definite integrals'],
  },
  {
    id: 'M2-17',
    module: 'M2',
    n: 17,
    topic: 'MM8',
    spec: ['MM8.2', 'MM8.2a', 'MM8.2b', 'MM8.2c'],
    title: 'Transforming a maximum point',
    difficulty: 3,
    time: 90,
    stem: t`The graph of $y = f(x)$ has exactly one stationary point, which is a maximum at $(2, 5)$.

Which of the following describes the stationary point of the graph of
$$y = 3 - 2f(x + 1)\,?$$`,
    options: [
      t`A maximum at $(1, -7)$`,
      t`A minimum at $(3, -7)$`,
      t`A maximum at $(3, 13)$`,
      t`A minimum at $(1, 13)$`,
      t`A maximum at $(-1, -7)$`,
      t`A minimum at $(1, -7)$`,
    ],
    answer: 5,
    hints: [t`Apply the transformations in order: $f(x + 1)$, then $-2f(x + 1)$, then $3 - 2f(x + 1)$.`],
    solution: t`Build it up in stages:

- $f(x + 1)$: translate 1 unit to the **left**, giving a maximum at $(1, 5)$.
- $-2f(x + 1)$: stretch vertically by factor 2 and reflect in the $x$-axis. The maximum becomes a **minimum** at $(1, -10)$.
- $3 - 2f(x + 1)$: translate up 3, giving a minimum at $(1, -7)$.

**Check.** At $x = 1$, $y = 3 - 2f(2) = 3 - 10 = -7$ ✓`,
    traps: {
      0: t`Gets the point right but forgets that multiplying by a negative number turns a maximum into a minimum.`,
      1: t`Translates the wrong way: $f(x + 1)$ moves the graph left, not right.`,
    },
    insight: t`Inside the bracket, transformations act on $x$ "backwards" ($x + 1$ moves left). A negative factor outside swaps maxima and minima.`,
    skills: ['graph transformations', 'stationary points'],
  },
  {
    id: 'M2-18',
    module: 'M2',
    n: 18,
    topic: 'MM2',
    spec: ['MM2.1'],
    title: 'A periodic recurrence',
    difficulty: 3,
    time: 100,
    stem: t`A sequence is defined by
$$x_1 = 2, \qquad x_{n+1} = \frac{1}{1 - x_n} \quad (n \ge 1).$$

What is the value of $x_1 + x_2 + x_3 + \cdots + x_{100}$?`,
    options: [t`$\dfrac{99}{2}$`, t`$50$`, t`$\dfrac{103}{2}$`, t`$52$`, t`$\dfrac{105}{2}$`, t`$150$`],
    answer: 2,
    hints: [t`Work out the first four terms. What do you notice?`],
    solution: t`Generate the first few terms:
$$x_1 = 2,\quad x_2 = \frac{1}{1 - 2} = -1,\quad x_3 = \frac{1}{1 + 1} = \frac12,\quad x_4 = \frac{1}{1 - \frac12} = 2 = x_1.$$

The sequence repeats with period 3, and each block sums to $2 - 1 + \tfrac12 = \tfrac32$.

Since $100 = 3 \times 33 + 1$, the first 99 terms make 33 complete blocks, and $x_{100} = x_1 = 2$. So
$$S_{100} = 33 \times \frac32 + 2 = \frac{99}{2} + 2 = \frac{103}{2}.$$`,
    traps: {
      0: t`Counts the 33 complete blocks but forgets the 100th term.`,
      1: t`Takes $x_{100}$ to be $\tfrac12$ instead of $2$: check where 100 falls in the cycle.`,
      5: t`Multiplies the block sum $\tfrac32$ by 100 instead of by the number of blocks.`,
    },
    insight: t`When a recurrence looks awkward, compute a few terms: it is often periodic. Then use division with remainder to finish.`,
    skills: ['recurrence relations', 'periodic sequences'],
  },
  {
    id: 'M2-19',
    module: 'M2',
    n: 19,
    topic: 'MM4',
    spec: ['MM4.5b'],
    title: 'Sum of cubes of sine and cosine',
    difficulty: 3,
    time: 100,
    stem: t`Given that $\sin\theta + \cos\theta = \dfrac12$, what is the value of
$$\sin^3\theta + \cos^3\theta\,?$$`,
    options: [t`$-\dfrac{11}{16}$`, t`$\dfrac18$`, t`$\dfrac{5}{16}$`, t`$\dfrac38$`, t`$\dfrac{11}{16}$`, t`$\dfrac{13}{16}$`],
    answer: 4,
    hints: [
      t`Square the given equation to find $\sin\theta\cos\theta$.`,
      t`$a^3 + b^3 = (a + b)(a^2 - ab + b^2)$.`,
    ],
    solution: t`Write $s = \sin\theta$ and $c = \cos\theta$, so $s + c = \tfrac12$ and $s^2 + c^2 = 1$.

Squaring the given equation:
$$s^2 + 2sc + c^2 = \frac14 \;\Rightarrow\; 1 + 2sc = \frac14 \;\Rightarrow\; sc = -\frac38.$$

Then
$$s^3 + c^3 = (s + c)(s^2 - sc + c^2) = (s + c)(1 - sc) = \frac12\left(1 + \frac38\right) = \frac{11}{16}.$$`,
    traps: {
      1: t`Cubes the sum: $(s + c)^3 \ne s^3 + c^3$.`,
      2: t`Uses $sc = +\tfrac38$: a sign error.`,
    },
    insight: t`Symmetric expressions in $\sin\theta$ and $\cos\theta$ reduce to $s + c$ and $sc$, with $s^2 + c^2 = 1$ tying them together.`,
    skills: ['trigonometric identities', 'algebraic identities'],
  },
  {
    id: 'M2-20',
    module: 'M2',
    n: 20,
    topic: 'MM8',
    spec: ['MM8.1', 'MM8.2', 'MM5.1'],
    title: 'Which graph is log₂(4 − x)?',
    difficulty: 3,
    time: 100,
    stem: t`Which of the following graphs shows $y = \log_2(4 - x)$?

The dashed lines are asymptotes. Each grid square is 1 unit.`,
    options: [
      { diagram: 'm2-log-a', alt: 'An increasing log curve with a vertical asymptote at x = −4, crossing the x-axis at −3 and the y-axis at 2.' },
      { diagram: 'm2-log-b', alt: 'An increasing curve defined for x < 4 with asymptote x = 4, crossing the x-axis at 3 and the y-axis at −2.' },
      { diagram: 'm2-log-c', alt: 'A decreasing curve defined for x < 4 with asymptote x = 4, crossing the y-axis at 2 and the x-axis at 3.' },
      { diagram: 'm2-log-d', alt: 'An increasing log curve defined for x > 4 with asymptote x = 4, crossing the x-axis at 5.' },
      { diagram: 'm2-log-e', alt: 'A decreasing curve defined for x < −4 with asymptote x = −4, crossing the x-axis at −5.' },
      { diagram: 'm2-log-f', alt: 'A decreasing curve defined for x > 0 with asymptote x = 0, crossing the x-axis at 4.' },
    ],
    answer: 2,
    hints: [
      t`For which values of $x$ is $\log_2(4 - x)$ defined? Where is the asymptote?`,
      t`Find the intercepts: put $x = 0$, and solve $4 - x = 1$.`,
    ],
    solution: t`Check the key features of $y = \log_2(4 - x)$:

- **Domain:** $4 - x > 0$, so $x < 4$. The asymptote is $x = 4$ and the graph lies to its **left**.
- **Direction:** as $x$ increases towards 4, $4 - x$ decreases towards 0, so $y \to -\infty$. The graph is **decreasing**.
- **Intercepts:** at $x = 0$, $y = \log_2 4 = 2$. Also $y = 0$ when $4 - x = 1$, i.e. $x = 3$.

Only graph **C** has all of these features. (It is $y = \log_2 x$ reflected in the $y$-axis and then translated 4 units right.)`,
    traps: {
      0: t`This is $y = \log_2(x + 4)$: the reflection in the $y$-axis is missing.`,
      1: t`This is $y = -\log_2(4 - x)$: reflected in the $x$-axis as well.`,
      5: t`This is $y = 2 - \log_2 x = \log_2\!\left(\tfrac4x\right)$, a different function.`,
    },
    insight: t`To identify a graph, check the domain and asymptote first, then the direction, then one or two intercepts.`,
    skills: ['logarithmic graphs', 'graph transformations'],
  },
  {
    id: 'M2-21',
    module: 'M2',
    n: 21,
    topic: 'MM7',
    spec: ['MM7.1'],
    title: 'Area versus integral for a cubic',
    difficulty: 3,
    time: 110,
    stem: t`What is the total area of the regions enclosed between the curve $y = x^3 - x^2 - 2x$ and the $x$-axis?`,
    options: [t`$-\dfrac94$`, t`$\dfrac{5}{12}$`, t`$\dfrac94$`, t`$\dfrac83$`, t`$3$`, t`$\dfrac{37}{12}$`],
    answer: 5,
    hints: [
      t`Factorise to find where the curve crosses the axis.`,
      t`Integrate over each region separately. Areas below the axis give negative integrals.`,
    ],
    solutionDiagram: 'm2-cubic-area-sol',
    solution: t`$x^3 - x^2 - 2x = x(x - 2)(x + 1)$, so the curve crosses the axis at $x = -1, 0, 2$. It is above the axis on $(-1, 0)$ and below it on $(0, 2)$.

With $F(x) = \dfrac{x^4}{4} - \dfrac{x^3}{3} - x^2$:
$$\int_{-1}^{0} = F(0) - F(-1) = 0 - \left(\frac14 + \frac13 - 1\right) = \frac{5}{12},$$
$$\int_{0}^{2} = F(2) - F(0) = 4 - \frac83 - 4 = -\frac83.$$

$$\text{Total area} = \frac{5}{12} + \frac83 = \frac{5}{12} + \frac{32}{12} = \frac{37}{12}.$$`,
    traps: {
      0: t`This is the single integral from $-1$ to $2$, in which the two regions partly cancel.`,
      2: t`The size of that single integral: still cancelled, not the total area.`,
      3: t`Only the region below the axis.`,
      1: t`Only the region above the axis.`,
    },
    insight: t`Area $\ne$ integral when the curve crosses the axis: split at the roots and add the absolute values.`,
    skills: ['definite integrals', 'area under a curve'],
  },
  {
    id: 'M2-22',
    module: 'M2',
    n: 22,
    topic: 'MM6',
    spec: ['MM6.3'],
    title: 'The most economical cylinder',
    difficulty: 3,
    time: 110,
    stem: t`A closed cylinder has volume $16\pi\ \text{cm}^3$.

What is the smallest possible total surface area of the cylinder?`,
    options: [
      t`$12\pi\ \text{cm}^2$`,
      t`$16\pi\ \text{cm}^2$`,
      t`$20\pi\ \text{cm}^2$`,
      t`$24\pi\ \text{cm}^2$`,
      t`$32\pi\ \text{cm}^2$`,
      t`$48\pi\ \text{cm}^2$`,
    ],
    answer: 3,
    hints: [t`Use the volume to write $h$ in terms of $r$, then minimise $S(r) = 2\pi r^2 + 2\pi rh$.`],
    solution: t`From $\pi r^2 h = 16\pi$, $h = \dfrac{16}{r^2}$. The total surface area is
$$S = 2\pi r^2 + 2\pi r h = 2\pi r^2 + \frac{32\pi}{r}.$$

Differentiate and set to zero:
$$\frac{\mathrm{d}S}{\mathrm{d}r} = 4\pi r - \frac{32\pi}{r^2} = 0 \;\Rightarrow\; r^3 = 8 \;\Rightarrow\; r = 2,\ h = 4.$$

$\dfrac{\mathrm{d}^2S}{\mathrm{d}r^2} = 4\pi + \dfrac{64\pi}{r^3} > 0$, so this is a minimum:
$$S = 2\pi(4) + \frac{32\pi}{2} = 8\pi + 16\pi = 24\pi\ \text{cm}^2.$$`,
    traps: {
      1: t`This is only the curved surface area at the optimum; the two ends have been left out.`,
    },
    insight: t`Optimisation: use the constraint to eliminate a variable, differentiate, set to zero, and confirm the nature of the stationary point.`,
    skills: ['optimisation', 'differentiation'],
  },
  {
    id: 'M2-23',
    module: 'M2',
    n: 23,
    topic: 'MM8',
    spec: ['MM8.5a', 'MM8.5b', 'MM8.6', 'MM6.3'],
    title: 'Three statements about a cubic',
    difficulty: 3,
    time: 110,
    stem: t`$f(x) = x^3 - 3x^2 + 4$`,
    statements: [
      t`The graph of $y = f(x)$ has a local maximum at $x = 0$.`,
      t`The equation $f(x) = 0$ has exactly two distinct real solutions.`,
      t`$f$ is decreasing for $0 < x < 2$.`,
    ],
    prompt: t`Which of the statements is/are true?`,
    options: [
      t`1 only`,
      t`2 only`,
      t`3 only`,
      t`1 and 2 only`,
      t`1 and 3 only`,
      t`2 and 3 only`,
      t`1, 2 and 3`,
      t`none of them`,
    ],
    answer: 6,
    hints: [
      t`$f'(x) = 3x(x - 2)$.`,
      t`Evaluate $f$ at the stationary points. What does $f(2) = 0$ tell you?`,
    ],
    solution: t`$f'(x) = 3x^2 - 6x = 3x(x - 2)$, so the stationary points are at $x = 0$ and $x = 2$.

- **Statement 1.** $f'$ changes from positive to negative at $x = 0$ (and $f''(0) = -6 < 0$), so there is a local maximum at $(0, 4)$. ✓
- **Statement 2.** $f(2) = 8 - 12 + 4 = 0$: the local minimum lies exactly on the $x$-axis, so the graph touches the axis there. Indeed $f(x) = (x - 2)^2(x + 1)$, whose distinct roots are $x = 2$ and $x = -1$. ✓
- **Statement 3.** For $0 < x < 2$, $3x > 0$ and $x - 2 < 0$, so $f'(x) < 0$. ✓

All three are true.`,
    traps: {
      4: t`Statement 2 is also true: the minimum touches the axis, giving a repeated root at $x = 2$.`,
    },
    insight: t`The number of real roots of a cubic is decided by the signs of its local maximum and minimum values; a stationary value of 0 means a repeated root.`,
    skills: ['stationary points', 'cubic graphs', 'number of roots'],
  },
  {
    id: 'M2-24',
    module: 'M2',
    n: 24,
    topic: 'MM1',
    spec: ['MM1.6c', 'MM1.6b'],
    title: 'Remainder on division by a quadratic',
    difficulty: 4,
    time: 120,
    stem: t`The polynomial $p(x) = x^3 + ax^2 + bx - 12$ has $(x - 2)$ as a factor. When $p(x)$ is divided by $(x + 1)$, the remainder is $-6$.

What is the remainder when $p(x)$ is divided by $x^2 - 1$?`,
    options: [t`$-3x - 9$`, t`$3x - 9$`, t`$-3x + 9$`, t`$-9x - 3$`, t`$-12$`, t`$-6$`],
    answer: 0,
    hints: [
      t`Use the factor theorem and the remainder theorem to find $a$ and $b$.`,
      t`The remainder on dividing by a quadratic has the form $rx + s$. Evaluate at $x = 1$ and $x = -1$.`,
    ],
    solution: t`**Find $a$ and $b$.**
- $p(2) = 0$: $\;8 + 4a + 2b - 12 = 0$, so $2a + b = 2$.
- $p(-1) = -6$: $\;-1 + a - b - 12 = -6$, so $a - b = 7$.

Adding gives $3a = 9$, so $a = 3$, $b = -4$ and $p(x) = x^3 + 3x^2 - 4x - 12$.

**Find the remainder.** Write $p(x) = (x^2 - 1)q(x) + rx + s$. Putting $x = 1$ and $x = -1$ kills the first term:
$$p(1) = 1 + 3 - 4 - 12 = -12 = r + s, \qquad p(-1) = -6 = -r + s.$$

So $s = -9$ and $r = -3$: the remainder is $-3x - 9$.

**Check.** $(x^2 - 1)(x + 3) = x^3 + 3x^2 - x - 3$, and $p(x) - (x^3 + 3x^2 - x - 3) = -3x - 9$ ✓`,
    traps: {
      4: t`This is $p(1)$ only. Dividing by a quadratic leaves a linear remainder.`,
      5: t`This is the remainder on division by $(x + 1)$, which was given.`,
      1: t`Swaps the two values: it matches $p(1) = -12$ at $x = -1$ and $p(-1) = -6$ at $x = 1$, which gives $r = +3$.`,
    },
    insight: t`The remainder on dividing by a degree-$n$ polynomial has degree less than $n$. Find it by substituting the divisor's roots.`,
    skills: ['factor theorem', 'remainder theorem', 'polynomials'],
  },
  {
    id: 'M2-25',
    module: 'M2',
    n: 25,
    topic: 'MM4',
    spec: ['MM4.2'],
    title: 'A sector with a hidden impossible solution',
    difficulty: 4,
    time: 110,
    stem: t`A sector of a circle has a perimeter of 20 cm and an area of 16 cm². The angle of the sector is $\theta$ radians, where $0 < \theta < 2\pi$.

What is the value of $\theta$?`,
    options: [t`$\dfrac14$`, t`$\dfrac12$`, t`$2$`, t`$4$`, t`$8$`, t`$\dfrac12$ or $8$`],
    answer: 1,
    hints: [
      t`Perimeter: $2r + r\theta = 20$. Area: $\tfrac12 r^2\theta = 16$.`,
      t`You get two values of $r$. Is each resulting $\theta$ actually allowed?`,
    ],
    solution: t`The perimeter is two radii plus the arc, and the area is $\tfrac12r^2\theta$:
$$2r + r\theta = 20, \qquad \tfrac12 r^2\theta = 16.$$

From the first, $r\theta = 20 - 2r$. Substituting into the second:
$$\tfrac12 r(20 - 2r) = 16 \;\Rightarrow\; r^2 - 10r + 16 = 0 \;\Rightarrow\; r = 2 \text{ or } 8.$$

- $r = 2$: $r\theta = 16$, so $\theta = 8$. But $8 > 2\pi \approx 6.28$, which is impossible for a sector.
- $r = 8$: $r\theta = 4$, so $\theta = \tfrac12$. ✓

So $\theta = \tfrac12$.`,
    traps: {
      4: t`$\theta = 8$ radians is more than a full turn, so no such sector exists.`,
      5: t`Both values solve the equations, but only one gives a genuine sector.`,
    },
    insight: t`Always test algebraic solutions against the physical constraints (here $0 < \theta < 2\pi$).`,
    skills: ['radians', 'sector area', 'arc length', 'quadratics'],
  },
  {
    id: 'M2-26',
    module: 'M2',
    n: 26,
    topic: 'MM4',
    spec: ['MM4.1'],
    title: 'The ambiguous case',
    difficulty: 4,
    time: 120,
    stem: t`In triangle $ABC$, $AB = 10$, $AC = 7$ and angle $ABC = 30^\circ$. There are two possible triangles.

What is the difference between the two possible lengths of $BC$?`,
    options: [t`$2\sqrt3$`, t`$2\sqrt6$`, t`$\sqrt{51}$`, t`$5\sqrt3$`, t`$4\sqrt6$`, t`$10\sqrt3$`],
    answer: 4,
    hints: [t`Let $BC = a$ and apply the cosine rule using the known angle at $B$: this gives a quadratic in $a$.`],
    solution: t`Let $BC = a$. The cosine rule with the angle at $B$ gives
$$AC^2 = AB^2 + BC^2 - 2(AB)(BC)\cos B$$
$$49 = 100 + a^2 - 20a \cdot \frac{\sqrt3}{2} \;\Rightarrow\; a^2 - 10\sqrt3\,a + 51 = 0.$$

So
$$a = 5\sqrt3 \pm \sqrt{75 - 51} = 5\sqrt3 \pm 2\sqrt6.$$

Both values are positive ($\approx 13.6$ and $\approx 3.8$), giving the two triangles. Their difference is $4\sqrt6$.

(Faster: the difference of the roots of $a^2 - pa + q = 0$ is $\sqrt{p^2 - 4q} = \sqrt{300 - 204} = \sqrt{96} = 4\sqrt6$.)`,
    traps: {
      1: t`This is half the difference: the $\pm$ term on its own.`,
      3: t`This is the average of the two lengths, not their difference.`,
      5: t`This is the sum of the two lengths.`,
    },
    insight: t`Given two sides and a non-included angle, use the cosine rule on the unknown side: the two roots of the quadratic are the two triangles.`,
    skills: ['cosine rule', 'ambiguous case', 'surds'],
  },
  {
    id: 'M2-27',
    module: 'M2',
    n: 27,
    topic: 'MM6',
    spec: ['MM6.3', 'MM7.1', 'MM1.6b'],
    title: 'Area between a cubic and its tangent',
    difficulty: 5,
    time: 130,
    stem: t`The tangent to the curve $y = x^3$ at the point $(1, 1)$ meets the curve again at the point $P$.

What is the area of the region enclosed between the curve and this tangent?`,
    options: [t`$\dfrac94$`, t`$\dfrac{15}{4}$`, t`$6$`, t`$\dfrac{27}{4}$`, t`$\dfrac{27}{2}$`, t`$\dfrac{81}{4}$`],
    answer: 3,
    hints: [
      t`The tangent is $y = 3x - 2$. Solve $x^3 = 3x - 2$ knowing that $x = 1$ is a repeated root.`,
      t`On the interval between the intersections, which graph is on top?`,
    ],
    solutionDiagram: 'm2-tangent-area-sol',
    solution: t`**Tangent.** $\dfrac{\mathrm{d}y}{\mathrm{d}x} = 3x^2 = 3$ at $x = 1$, so the tangent is $y - 1 = 3(x - 1)$, i.e. $y = 3x - 2$.

**Intersections.** $x^3 - 3x + 2 = 0$ has a repeated root at $x = 1$ (the point of tangency), so
$$x^3 - 3x + 2 = (x - 1)^2(x + 2).$$
The other intersection is at $x = -2$, so $P = (-2, -8)$.

**Area.** On $[-2, 1]$, $x^3 - (3x - 2) = (x - 1)^2(x + 2) \ge 0$, so the curve is above the tangent:
$$\int_{-2}^{1}\left(x^3 - 3x + 2\right)\mathrm{d}x = \left[\frac{x^4}{4} - \frac{3x^2}{2} + 2x\right]_{-2}^{1} = \left(\frac14 - \frac32 + 2\right) - (4 - 6 - 4) = \frac34 + 6 = \frac{27}{4}.$$`,
    traps: {
      1: t`This is the size of $\displaystyle\int_{-2}^{1} x^3\,\mathrm{d}x$ alone: the tangent has not been subtracted.`,
      4: t`Double the correct area.`,
    },
    insight: t`A tangent meets a cubic at a repeated root: factor out $(x - a)^2$ to find the other intersection instantly.`,
    skills: ['tangents', 'area between curves', 'factor theorem'],
  },
];
