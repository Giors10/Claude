import type { Question } from '../../types';
import { STATEMENT_OPTIONS, ST } from '../shared';

const t = String.raw;

/**
 * Mock 2 (Forge) — Mathematics 2.
 * 27 questions, 40 minutes, no calculator. Realistic ESAT Mathematics 2
 * style, pitched a little above real difficulty, inside MM1–MM8.
 */
export const M2: Question[] = [
  {
    id: '2-M2-01',
    module: 'M2',
    n: 1,
    topic: 'MM1',
    spec: ['MM1.2'],
    title: 'Difference of two surd fractions',
    difficulty: 1,
    time: 70,
    stem: t`Simplify
$$\frac{\sqrt{5} + \sqrt{2}}{\sqrt{5} - \sqrt{2}} - \frac{\sqrt{5} - \sqrt{2}}{\sqrt{5} + \sqrt{2}}.$$`,
    options: [t`$0$`, t`$\dfrac{4\sqrt{10}}{7}$`, t`$\dfrac{2\sqrt{10}}{3}$`, t`$\dfrac{4\sqrt{10}}{3}$`, t`$\dfrac{14}{3}$`, t`$4\sqrt{10}$`],
    answer: 3,
    hints: [t`Use the common denominator $(\sqrt{5} - \sqrt{2})(\sqrt{5} + \sqrt{2})$.`],
    solution: t`Put both fractions over the common denominator $(\sqrt{5} - \sqrt{2})(\sqrt{5} + \sqrt{2}) = 5 - 2 = 3$:
$$\frac{(\sqrt{5} + \sqrt{2})^2 - (\sqrt{5} - \sqrt{2})^2}{3}.$$

Since $(\sqrt{5} \pm \sqrt{2})^2 = 7 \pm 2\sqrt{10}$, the numerator is $(7 + 2\sqrt{10}) - (7 - 2\sqrt{10}) = 4\sqrt{10}$, so the expression equals
$$\frac{4\sqrt{10}}{3}.$$`,
    traps: {
      4: t`Adds the squares instead of subtracting them: $(7 + 2\sqrt{10}) + (7 - 2\sqrt{10}) = 14$.`,
      5: t`Forgets to divide by the common denominator, 3.`,
      1: t`Takes $(\sqrt{5} - \sqrt{2})(\sqrt{5} + \sqrt{2})$ as $5 + 2$; the difference of two squares gives $5 - 2$.`,
      2: t`Expands $(\sqrt{5} + \sqrt{2})^2$ as $7 + \sqrt{10}$, missing the 2 in the middle term.`,
      0: t`The two fractions are reciprocals, not equal, so they do not cancel.`,
    },
    insight: t`To combine fractions with conjugate surd denominators, use the product of the conjugates: it is rational by the difference of two squares.`,
    skills: ['surds', 'rationalising denominators'],
  },
  {
    id: '2-M2-02',
    module: 'M2',
    n: 2,
    topic: 'MM1',
    spec: ['MM1.1'],
    title: 'Index equation in base 3',
    difficulty: 2,
    time: 75,
    stem: t`Solve
$$9^{2x-1} = \frac{27^{x+1}}{\sqrt{3}}.$$`,
    options: [t`$x = -\dfrac{7}{2}$`, t`$x = \dfrac{5}{2}$`, t`$x = \dfrac{7}{2}$`, t`$x = \dfrac{9}{2}$`, t`$x = 5$`, t`$x = \dfrac{11}{2}$`],
    answer: 3,
    hints: [t`Write every term as a power of 3.`],
    solution: t`Write everything as a power of 3: $9 = 3^2$, $27 = 3^3$ and $\sqrt{3} = 3^{\frac{1}{2}}$.
$$3^{2(2x-1)} = \frac{3^{3(x+1)}}{3^{\frac{1}{2}}} \quad\Rightarrow\quad 3^{4x-2} = 3^{3x + \frac{5}{2}}.$$

Equating the indices, $4x - 2 = 3x + \dfrac{5}{2}$, so $x = \dfrac{9}{2}$.`,
    traps: {
      4: t`Leaves out the $\sqrt{3}$.`,
      5: t`Multiplies by $\sqrt{3}$ instead of dividing: dividing by $3^{\frac{1}{2}}$ subtracts $\tfrac{1}{2}$ from the index.`,
      0: t`Writes $9^{2x-1}$ as $3^{2x-1}$; since $9 = 3^2$ the index doubles.`,
      1: t`Writes $27^{x+1}$ as $3^{3x+1}$: the whole index $x + 1$ must be multiplied by 3.`,
    },
    insight: t`Rewrite every term with the same base, collect the indices on each side, then equate them.`,
    skills: ['laws of indices', 'fractional indices'],
  },
  {
    id: '2-M2-03',
    module: 'M2',
    n: 3,
    topic: 'MM1',
    spec: ['MM1.4'],
    title: 'Midpoint of a line–curve chord',
    difficulty: 2,
    time: 80,
    stem: t`The line $y = 2x - 3$ meets the curve $x^2 + xy = 21$ at the points $P$ and $Q$.

What are the coordinates of the midpoint of $PQ$?`,
    options: [
      t`$\left(\tfrac{1}{2}, -2\right)$`,
      t`$\left(-\tfrac{1}{2}, -4\right)$`,
      t`$(1, -1)$`,
      t`$\left(\tfrac{1}{2}, 2\right)$`,
      t`$\left(\tfrac{7}{2}, 4\right)$`,
      t`$(-1, -5)$`,
    ],
    answer: 0,
    hints: [t`Substitute for $y$. You do not need the roots themselves, only their sum.`],
    solution: t`Substitute $y = 2x - 3$:
$$x^2 + x(2x - 3) = 21 \quad\Rightarrow\quad 3x^2 - 3x - 21 = 0 \quad\Rightarrow\quad x^2 - x - 7 = 0.$$

The roots are the $x$-coordinates of $P$ and $Q$. They are irrational, but their sum is $1$ (minus the coefficient of $x$), so the midpoint has
$$x = \frac{1}{2}, \qquad y = 2 \times \frac{1}{2} - 3 = -2.$$

The midpoint is $\left(\tfrac{1}{2}, -2\right)$. (Since the midpoint lies on the line, its $y$-coordinate comes straight from the line's equation.)`,
    traps: {
      2: t`Uses the sum of the roots, 1, as the $x$-coordinate; the midpoint is at their average.`,
      1: t`Sign slip in the substitution, giving $3x^2 + 3x - 21 = 0$.`,
      3: t`The midpoint lies on the line $y = 2x - 3$, which gives $y = -2$ at $x = \tfrac{1}{2}$.`,
    },
    insight: t`For the midpoint of the intersections, use the sum of the roots ($-\tfrac{b}{a}$); there is no need to solve the quadratic.`,
    skills: ['simultaneous equations', 'sum of roots'],
  },
  {
    id: '2-M2-04',
    module: 'M2',
    n: 4,
    topic: 'MM1',
    spec: ['MM1.6a'],
    title: 'Unknown coefficients in a product',
    difficulty: 2,
    time: 85,
    stem: t`In the expansion of
$$(2x^2 + ax - 3)(x^2 - 5x + b),$$
where $a$ and $b$ are constants, the coefficient of $x^3$ is $-7$ and the coefficient of $x$ is $30$.

What is the coefficient of $x^2$?`,
    options: [t`$-18$`, t`$-8$`, t`$-5$`, t`$2$`, t`$8$`, t`$22$`],
    answer: 1,
    hints: [t`Only two pairs of terms multiply to give $x^3$; only two pairs give $x$.`],
    solution: t`Collect only the products that give each power.

- $x^3$: $\ 2x^2 \times (-5x) + ax \times x^2 = (a - 10)x^3$, so $a - 10 = -7$ and $a = 3$.
- $x$: $\ ax \times b + (-3) \times (-5x) = (ab + 15)x$, so $3b + 15 = 30$ and $b = 5$.
- $x^2$: $\ 2x^2 \times b + ax \times (-5x) + (-3) \times x^2 = (2b - 5a - 3)x^2$.

With $a = 3$ and $b = 5$, the coefficient of $x^2$ is $10 - 15 - 3 = -8$.`,
    traps: {
      3: t`Sign slip in the $x^3$ coefficient, giving $a = -3$ and then $b = -5$.`,
      2: t`Misses the $(-3) \times x^2$ term.`,
      5: t`Uses $+5a$ instead of $-5a$: the term is $ax \times (-5x)$.`,
    },
    insight: t`To find one coefficient, list only the pairs of terms whose powers add up to the power you want.`,
    skills: ['expanding brackets', 'equating coefficients'],
  },
  {
    id: '2-M2-05',
    module: 'M2',
    n: 5,
    topic: 'MM1',
    spec: ['MM1.3', 'MM1.5'],
    title: 'A quadratic that is always negative',
    difficulty: 3,
    time: 85,
    stem: t`Find the set of values of $k$ for which
$$kx^2 + 4x + k < 0$$
for **all** real values of $x$.`,
    options: [t`$k > 2$`, t`$k < 0$`, t`$k < -2$ or $k > 2$`, t`$-2 < k < 2$`, t`$-2 < k < 0$`, t`$k < -2$`],
    answer: 5,
    hints: [t`The graph must open downwards and never reach the $x$-axis.`],
    solution: t`For the quadratic to be negative for every $x$, its graph must open downwards and lie entirely below the $x$-axis:

- it must open downwards, so $k < 0$;
- it must have no real roots, so the discriminant is negative: $4^2 - 4k \cdot k < 0$, i.e. $k^2 > 4$, so $k < -2$ or $k > 2$.

Both conditions hold when $k < -2$.

(When $k = 0$ the expression is $4x$, which is not always negative.)`,
    traps: {
      2: t`Uses only the discriminant condition; with $k > 2$ the graph opens upwards and is always *positive*.`,
      1: t`Uses only the condition $k < 0$; for $-2 \le k < 0$ the graph still crosses or touches the $x$-axis.`,
      3: t`Solves $k^2 > 4$ as $-2 < k < 2$; that is the solution of $k^2 < 4$.`,
      0: t`$k > 2$ makes the quadratic positive for all $x$, not negative.`,
    },
    insight: t`"Always negative" means two conditions: the leading coefficient is negative *and* the discriminant is negative.`,
    skills: ['discriminant', 'quadratic inequalities'],
  },
  {
    id: '2-M2-06',
    module: 'M2',
    n: 6,
    topic: 'MM2',
    spec: ['MM2.1'],
    title: 'Finding a recurrence from its terms',
    difficulty: 2,
    time: 80,
    stem: t`A sequence is defined by $a_{n+1} = p\,a_n + q$, where $p$ and $q$ are constants.

Given that $a_1 = 2$, $a_2 = 4$ and $a_3 = 10$, what is the value of $a_5$?`,
    options: [t`$28$`, t`$34$`, t`$46$`, t`$64$`, t`$82$`, t`$244$`],
    answer: 4,
    hints: [t`Write two equations in $p$ and $q$, one from each step you know.`],
    solution: t`Applying the rule twice:
$$a_2 = 2p + q = 4, \qquad a_3 = 4p + q = 10.$$

Subtracting, $2p = 6$, so $p = 3$ and $q = -2$.

Then $a_4 = 3 \times 10 - 2 = 28$ and
$$a_5 = 3 \times 28 - 2 = 82.$$`,
    traps: {
      0: t`$28$ is $a_4$.`,
      5: t`$244$ is $a_6$.`,
      1: t`Assumes the differences (2, 6, …) go up by 4 each time; the rule is multiplicative, so they are multiplied by 3.`,
    },
    insight: t`Each step of a recurrence gives an equation; two steps fix two unknown constants.`,
    skills: ['recurrence relations', 'simultaneous equations'],
  },
  {
    id: '2-M2-07',
    module: 'M2',
    n: 7,
    topic: 'MM2',
    spec: ['MM2.2'],
    title: 'Sum of numbers not divisible by 3 or 4',
    difficulty: 4,
    time: 120,
    stem: t`What is the sum of all the integers from 1 to 200 inclusive that are divisible by **neither** 3 nor 4?`,
    options: [t`$8367$`, t`$9999$`, t`$10\,101$`, t`$11\,631$`, t`$13\,467$`, t`$20\,100$`],
    answer: 1,
    hints: [t`Subtract the multiples of 3 and the multiples of 4 from the total, but take care not to subtract the multiples of 12 twice.`],
    solution: t`Each set of multiples is an arithmetic series.

- All of $1$ to $200$: $\ \tfrac{1}{2} \times 200 \times 201 = 20\,100$.
- Multiples of 3 ($3, 6, \ldots, 198$; 66 terms): $\ 3 \times \tfrac{1}{2} \times 66 \times 67 = 6633$.
- Multiples of 4 ($4, 8, \ldots, 200$; 50 terms): $\ 4 \times \tfrac{1}{2} \times 50 \times 51 = 5100$.
- Multiples of 12 ($12, \ldots, 192$; 16 terms), which are in both lists: $\ 12 \times \tfrac{1}{2} \times 16 \times 17 = 1632$.

The multiples of 3 or 4 add up to $6633 + 5100 - 1632 = 10\,101$, so the numbers divisible by neither add up to
$$20\,100 - 10\,101 = 9999.$$`,
    traps: {
      0: t`Subtracts the multiples of 12 twice (once as multiples of 3, once as multiples of 4) without adding them back.`,
      2: t`$10\,101$ is the sum of the numbers that *are* divisible by 3 or 4.`,
      3: t`Adds the multiples of 12 back twice instead of once.`,
      4: t`Removes only the multiples of 3.`,
    },
    insight: t`"Neither A nor B" = total − (A + B − both). Each set of multiples is an arithmetic series: $k \times (1 + 2 + \cdots + m)$.`,
    skills: ['arithmetic series', 'inclusion–exclusion'],
  },
  {
    id: '2-M2-08',
    module: 'M2',
    n: 8,
    topic: 'MM2',
    spec: ['MM2.4'],
    title: 'Binomial expansion with two unknowns',
    difficulty: 4,
    time: 110,
    stem: t`In the expansion of $(1 + ax)^n$, where $n$ is a positive integer, the coefficient of $x$ is $12$ and the coefficient of $x^2$ is $60$.

What is the coefficient of $x^3$?`,
    options: [t`$80$`, t`$120$`, t`$160$`, t`$240$`, t`$320$`, t`$480$`],
    answer: 2,
    hints: [t`The coefficients are $na$ and $\dbinom{n}{2}a^2 = \dfrac{n(n-1)}{2}a^2$.`, t`Divide one equation by the other to find $(n - 1)a$.`],
    solution: t`The first coefficients of $(1 + ax)^n$ are
$$na = 12, \qquad \frac{n(n-1)}{2}a^2 = 60.$$

Dividing the second by the first, $\dfrac{(n-1)a}{2} = 5$, so $(n - 1)a = 10$. Subtracting this from $na = 12$ gives $a = 2$, and then $n = 6$.

The coefficient of $x^3$ is
$$\binom{6}{3}a^3 = 20 \times 8 = 160.$$`,
    traps: {
      0: t`Uses $a^2$ instead of $a^3$ with $\tbinom{6}{3}$.`,
      3: t`$240 = \tbinom{6}{4} \times 2^4$ is the coefficient of $x^4$.`,
      5: t`Uses $6 \times 5 \times 4 = 120$ instead of $\tbinom{6}{3} = 20$, without dividing by $3!$.`,
    },
    insight: t`Two coefficients give two equations in $n$ and $a$; dividing them eliminates most of the unknowns at once.`,
    skills: ['binomial expansion', 'solving equations'],
  },
  {
    id: '2-M2-09',
    module: 'M2',
    n: 9,
    topic: 'MM3',
    spec: ['MM3.1'],
    title: 'Triangle with a vertex on a perpendicular bisector',
    difficulty: 3,
    time: 100,
    stem: t`The points $A(-1, 3)$ and $B(5, -1)$ are given. The perpendicular bisector of $AB$ crosses the $y$-axis at $C$.

What is the area of triangle $ABC$?`,
    options: [t`$\dfrac{13}{2}$`, t`$2\sqrt{13}$`, t`$13$`, t`$4\sqrt{13}$`, t`$26$`, t`$52$`],
    answer: 2,
    hints: [t`The perpendicular bisector passes through the midpoint of $AB$ with gradient $-1 \div (\text{gradient of } AB)$.`, t`$C$ is equidistant from $A$ and $B$, so the triangle is isosceles.`],
    solution: t`The midpoint of $AB$ is $M(2, 1)$ and the gradient of $AB$ is $\dfrac{-1 - 3}{5 - (-1)} = -\dfrac{2}{3}$. The perpendicular bisector has gradient $\dfrac{3}{2}$:
$$y - 1 = \frac{3}{2}(x - 2) \quad\Rightarrow\quad y = \frac{3}{2}x - 2,$$
so $C = (0, -2)$.

$C$ is on the perpendicular bisector, so $CM$ is the height of the triangle on the base $AB$:
$$AB = \sqrt{6^2 + 4^2} = 2\sqrt{13}, \qquad CM = \sqrt{2^2 + 3^2} = \sqrt{13},$$
$$\text{area} = \frac{1}{2} \times 2\sqrt{13} \times \sqrt{13} = 13.$$

Check with the shoelace formula for $(-1, 3)$, $(5, -1)$, $(0, -2)$: $\tfrac{1}{2}\left|(-1)(-1 + 2) + 5(-2 - 3) + 0\right| = \tfrac{1}{2} \times 26 = 13$ ✓`,
    traps: {
      4: t`Forgets the $\tfrac{1}{2}$ in the area of a triangle.`,
      1: t`$2\sqrt{13}$ is the length of $AB$, not the area.`,
      0: t`Halves twice: the base $AB = 2\sqrt{13}$ and height $\sqrt{13}$ already give $\tfrac{1}{2} \times 26$.`,
    },
    insight: t`A point on the perpendicular bisector of $AB$ is equidistant from $A$ and $B$, so the line from it to the midpoint is a ready-made height.`,
    skills: ['perpendicular bisector', 'gradients', 'area of a triangle'],
  },
  {
    id: '2-M2-10',
    module: 'M2',
    n: 10,
    topic: 'MM3',
    spec: ['MM3.2b', 'MM3.3a'],
    title: 'A circle touching the x-axis',
    difficulty: 3,
    time: 100,
    stem: t`The circle with equation
$$x^2 + y^2 - 6x + 8y + k = 0$$
touches the $x$-axis.

What is the length of the chord that the circle cuts off on the $y$-axis?`,
    options: [t`$0$`, t`$\sqrt{7}$`, t`$2\sqrt{3}$`, t`$4$`, t`$2\sqrt{7}$`, t`$8$`],
    answer: 4,
    hints: [t`Complete the square to find the centre and the radius in terms of $k$.`, t`A circle touching the $x$-axis has radius equal to the distance from its centre to the $x$-axis.`],
    solution: t`Completing the square,
$$(x - 3)^2 + (y + 4)^2 = 25 - k,$$
so the centre is $(3, -4)$ and the radius is $\sqrt{25 - k}$.

The circle touches the $x$-axis, so the radius equals the distance from the centre to the $x$-axis, which is 4. So $25 - k = 16$ and $k = 9$.

On the $y$-axis, $x = 0$: $\ 9 + (y + 4)^2 = 16$, so $(y + 4)^2 = 7$ and $y = -4 \pm \sqrt{7}$. The chord has length
$$2\sqrt{7}.$$

(Equivalently, the perpendicular from the centre to the $y$-axis has length 3 and bisects the chord, so the half-chord is $\sqrt{4^2 - 3^2} = \sqrt{7}$.)`,
    traps: {
      1: t`$\sqrt{7}$ is half of the chord: the perpendicular from the centre bisects it.`,
      0: t`Takes the radius as 3, the distance to the $y$-axis; touching the $x$-axis makes the radius 4.`,
      5: t`Ignores $k$ and uses a radius of 5.`,
      3: t`4 is the radius.`,
    },
    insight: t`A circle touches an axis when its radius equals the distance from its centre to that axis. The perpendicular from the centre bisects any chord.`,
    skills: ['equation of a circle', 'completing the square', 'chords'],
  },
  {
    id: '2-M2-11',
    module: 'M2',
    n: 11,
    topic: 'MM3',
    spec: ['MM3.3b', 'MM3.2a'],
    title: 'Where a tangent touches a circle',
    difficulty: 4,
    time: 115,
    stem: t`The line $y = 2x + c$, where $c > 0$, is a tangent to the circle
$$(x - 1)^2 + (y - 2)^2 = 20.$$

At which point does the line touch the circle?`,
    options: [t`$(-3, 4)$`, t`$(-5, 0)$`, t`$(-1, 8)$`, t`$(0, 10)$`, t`$(3, 6)$`, t`$(5, 0)$`],
    answer: 0,
    hints: [t`The radius to the point of contact is perpendicular to the tangent, so it has gradient $-\tfrac{1}{2}$.`, t`The radius is $\sqrt{20} = 2\sqrt{5}$: move that distance from the centre along the direction $(-2, 1)$ or $(2, -1)$.`],
    solution: t`The centre is $(1, 2)$ and the radius is $\sqrt{20} = 2\sqrt{5}$.

The radius to the point of contact is perpendicular to the tangent, so it has gradient $-\tfrac{1}{2}$, i.e. direction $(-2, 1)$ or $(2, -1)$, each of length $\sqrt{5}$. Moving $2\sqrt{5}$ from the centre means going twice one of these vectors:
$$(1, 2) + 2(-2, 1) = (-3, 4) \quad\text{or}\quad (1, 2) + 2(2, -1) = (5, 0).$$

The tangent through $(-3, 4)$ is $y = 2x + 10$ (so $c = 10 > 0$); the one through $(5, 0)$ is $y = 2x - 10$. So the point of contact is $(-3, 4)$.

**Check by substitution.** $(x-1)^2 + (2x + c - 2)^2 = 20$ gives $5x^2 + (4c - 10)x + c^2 - 4c - 15 = 0$. A tangent means a zero discriminant, which gives $c = \pm 10$; with $c = 10$ the double root is $x = -3$ ✓`,
    traps: {
      5: t`$(5, 0)$ is where the other tangent, $y = 2x - 10$, touches; it has $c < 0$.`,
      3: t`$(0, 10)$ is where the tangent crosses the $y$-axis, not where it touches the circle.`,
      1: t`$(-5, 0)$ is where the tangent crosses the $x$-axis.`,
      4: t`$(3, 6)$ is on the circle, but the radius to it is parallel to the tangent, not perpendicular.`,
    },
    insight: t`A tangent is perpendicular to the radius at the point of contact: step one radius from the centre at right angles to the tangent's direction.`,
    skills: ['tangents to circles', 'perpendicular gradients', 'discriminant'],
  },
  {
    id: '2-M2-12',
    module: 'M2',
    n: 12,
    topic: 'MM3',
    spec: ['MM3.3g', 'MM3.3f'],
    title: 'Tangent, cyclic quadrilateral and alternate segment',
    difficulty: 3,
    time: 95,
    stem: t`$A$, $B$, $C$ and $D$ lie on a circle, and $TS$ is the tangent to the circle at $A$.

The angle between the tangent $AS$ and the chord $AB$ is $52°$, and angle $BCD = 100°$.`,
    diagram: 'p2-m2-circle',
    diagramAlt: 'A circle with the tangent TS touching it at A at the bottom. B is to the right, C at the top left and D on the left. The angle between AS and AB is 52 degrees, angle BCD is 100 degrees, and angle ABD is marked x.',
    prompt: t`What is the size of angle $ABD$, marked $x$?`,
    options: [t`$28°$`, t`$38°$`, t`$48°$`, t`$52°$`, t`$80°$`, t`$128°$`],
    answer: 2,
    hints: [t`By the alternate segment theorem, the angle between the tangent and $AB$ equals the angle that $AB$ subtends at $D$.`, t`Then find angle $BAD$ from the cyclic quadrilateral.`],
    solution: t`**Alternate segment theorem.** The angle between the tangent $AS$ and the chord $AB$ equals the angle subtended by $AB$ in the alternate segment:
$$\angle ADB = 52°.$$

**Cyclic quadrilateral.** Opposite angles add up to $180°$:
$$\angle BAD = 180° - 100° = 80°.$$

**Triangle $ABD$.**
$$x = 180° - 80° - 52° = 48°.$$`,
    traps: {
      3: t`$52°$ is angle $ADB$ (alternate segment theorem), not angle $ABD$.`,
      4: t`$80°$ is angle $BAD$.`,
      5: t`$128° = 180° - 52°$ uses no circle theorem.`,
    },
    insight: t`Tangent-chord angle = angle in the alternate segment; opposite angles of a cyclic quadrilateral sum to $180°$. Then finish with the angle sum of a triangle.`,
    skills: ['alternate segment theorem', 'cyclic quadrilaterals'],
  },
  {
    id: '2-M2-13',
    module: 'M2',
    n: 13,
    topic: 'MM4',
    spec: ['MM4.1', 'MM4.3'],
    title: 'Height of a mast from two elevations',
    difficulty: 3,
    time: 100,
    stem: t`A vertical mast $QP$ stands with its foot $Q$ on horizontal ground. Point $A$ is due south of $Q$ and point $B$ is due east of $Q$, both on the ground.

The angle of elevation of the top $P$ is $30°$ from $A$ and $45°$ from $B$, and $AB = 20$ m.

What is the height of the mast?`,
    options: [t`5 m`, t`$10(\sqrt{3} - 1)$ m`, t`10 m`, t`$10\sqrt{2}$ m`, t`$10\sqrt{3}$ m`, t`$10(\sqrt{3} + 1)$ m`],
    answer: 2,
    hints: [t`Express $QA$ and $QB$ in terms of the height $h$.`, t`$A$, $Q$ and $B$ form a right angle at $Q$.`],
    solution: t`Let the height be $h$. From the angles of elevation,
$$QA = \frac{h}{\tan 30°} = \sqrt{3}\,h, \qquad QB = \frac{h}{\tan 45°} = h.$$

$A$ is due south of $Q$ and $B$ due east, so angle $AQB = 90°$. By Pythagoras on the ground,
$$AB^2 = QA^2 + QB^2 = 3h^2 + h^2 = 4h^2,$$
so $AB = 2h = 20$ and $h = 10$ m.`,
    traps: {
      5: t`Assumes $A$, $B$ and $Q$ are in a straight line with $A$ and $B$ on the same side: $QA - QB = 20$.`,
      1: t`Assumes $A$, $Q$ and $B$ are in a straight line with $Q$ between them: $QA + QB = 20$.`,
      4: t`$10\sqrt{3}$ m is the distance $QA$, not the height.`,
    },
    insight: t`In 3D problems, find each horizontal distance from its angle of elevation, then use the geometry of the ground plane (here a right angle).`,
    skills: ['3D trigonometry', 'exact values', 'Pythagoras'],
  },
  {
    id: '2-M2-14',
    module: 'M2',
    n: 14,
    topic: 'MM4',
    spec: ['MM4.2'],
    title: 'Area of a segment in radians',
    difficulty: 1,
    time: 75,
    stem: t`A chord of a circle of radius 6 cm subtends an angle of $\dfrac{2\pi}{3}$ radians at the centre.

What is the area of the minor segment cut off by the chord, in $\text{cm}^2$?`,
    options: [t`$12\pi - 9\sqrt{3}$`, t`$12\pi - 18\sqrt{3}$`, t`$12\pi - 9$`, t`$6\pi - 9\sqrt{3}$`, t`$24\pi - 9\sqrt{3}$`, t`$24\pi + 9\sqrt{3}$`],
    answer: 0,
    hints: [t`Segment = sector − triangle, with sector area $\tfrac{1}{2}r^2\theta$ and triangle area $\tfrac{1}{2}r^2\sin\theta$.`],
    solution: t`**Sector.** $\tfrac{1}{2}r^2\theta = \tfrac{1}{2} \times 36 \times \dfrac{2\pi}{3} = 12\pi$.

**Triangle.** $\tfrac{1}{2}r^2\sin\theta = 18 \sin\dfrac{2\pi}{3} = 18 \times \dfrac{\sqrt{3}}{2} = 9\sqrt{3}$.

**Minor segment.** $12\pi - 9\sqrt{3}$.`,
    traps: {
      1: t`Forgets the $\tfrac{1}{2}$ in the triangle's area.`,
      2: t`Uses $\sin\dfrac{2\pi}{3} = \dfrac{1}{2}$; in fact $\sin\dfrac{2\pi}{3} = \dfrac{\sqrt{3}}{2}$.`,
      4: t`Forgets the $\tfrac{1}{2}$ in the sector's area.`,
      5: t`This is the major segment: $36\pi - (12\pi - 9\sqrt{3})$.`,
    },
    insight: t`Segment = sector − triangle: $\tfrac{1}{2}r^2(\theta - \sin\theta)$, with $\theta$ in radians.`,
    skills: ['radians', 'sector area', 'segment area'],
  },
  {
    id: '2-M2-15',
    module: 'M2',
    n: 15,
    topic: 'MM4',
    spec: ['MM4.4'],
    title: 'Symmetries of trigonometric graphs',
    difficulty: 3,
    time: 85,
    stem: t`Consider the following statements, where $\theta$ is in degrees.`,
    statements: [
      t`$\sin(180° - \theta) = \sin\theta$ for all values of $\theta$.`,
      t`$\cos(\theta + 90°) = \sin\theta$ for all values of $\theta$.`,
      t`The graph of $y = \tan\theta$ repeats every $180°$ and has rotational symmetry of order 2 about the origin.`,
    ],
    prompt: t`Which of the statements is/are correct?`,
    options: STATEMENT_OPTIONS,
    answer: ST.s13,
    hints: [t`Test each identity with an easy angle such as $\theta = 90°$.`],
    solution: t`**Statement 1.** True: the graph of $y = \sin\theta$ is symmetric about the line $\theta = 90°$, so $\sin(180° - \theta) = \sin\theta$. ✓

**Statement 2.** False: shifting the cosine graph $90°$ to the left gives $\cos(\theta + 90°) = -\sin\theta$. For example, at $\theta = 90°$ the left side is $\cos 180° = -1$, but $\sin 90° = 1$. ✗

**Statement 3.** True: $\tan(\theta + 180°) = \tan\theta$, and $\tan(-\theta) = -\tan\theta$, which is rotational symmetry of order 2 about the origin. ✓

Statements 1 and 3 only.`,
    traps: {
      [ST.all]: t`Statement 2 has the wrong sign: $\cos(\theta + 90°) = -\sin\theta$.`,
      [ST.s1]: t`Statement 3 is also true: $\tan$ has period $180°$ and is an odd function.`,
    },
    insight: t`Check a claimed trig identity with one easy angle; the graphs' symmetries give the correct versions.`,
    skills: ['trigonometric graphs', 'symmetry', 'periodicity'],
  },
  {
    id: '2-M2-16',
    module: 'M2',
    n: 16,
    topic: 'MM4',
    spec: ['MM4.5a', 'MM4.5b', 'MM4.6'],
    title: 'An equation mixing tan and cos',
    difficulty: 3,
    time: 100,
    stem: t`What is the sum of all the solutions of
$$3\tan x = 2\cos x$$
in the interval $0° \le x \le 360°$?`,
    options: [t`$30°$`, t`$150°$`, t`$180°$`, t`$360°$`, t`$540°$`, t`$720°$`],
    answer: 2,
    hints: [t`Write $\tan x = \dfrac{\sin x}{\cos x}$ and multiply by $\cos x$.`, t`Then use $\cos^2 x = 1 - \sin^2 x$ to get a quadratic in $\sin x$.`],
    solution: t`Using $\tan x = \dfrac{\sin x}{\cos x}$ and multiplying by $\cos x$ (which cannot be zero, since $\tan x$ must be defined):
$$3\sin x = 2\cos^2 x = 2(1 - \sin^2 x) \quad\Rightarrow\quad 2\sin^2 x + 3\sin x - 2 = 0.$$

This factorises as $(2\sin x - 1)(\sin x + 2) = 0$. Since $\sin x = -2$ is impossible, $\sin x = \dfrac{1}{2}$, giving
$$x = 30° \text{ or } x = 150°.$$

The sum of the solutions is $180°$.`,
    traps: {
      0: t`$\sin x = \tfrac{1}{2}$ has a second solution in the range, $150°$.`,
      4: t`Sign slip in the quadratic, giving $\sin x = -\tfrac{1}{2}$ ($210°$ and $330°$).`,
      3: t`Takes the second solution as $330°$, as if solving $\cos x = \tfrac{1}{2}$.`,
    },
    insight: t`Turn a mixed trig equation into one function using $\tan x = \dfrac{\sin x}{\cos x}$ and $\sin^2 x + \cos^2 x = 1$, then solve the quadratic and reject impossible roots.`,
    skills: ['trigonometric identities', 'trigonometric equations'],
  },
  {
    id: '2-M2-17',
    module: 'M2',
    n: 17,
    topic: 'MM5',
    spec: ['MM5.2'],
    title: 'A logarithmic equation with a false root',
    difficulty: 2,
    time: 75,
    stem: t`Solve
$$\log_3 x + \log_3 (x - 6) = 3.$$`,
    options: [t`$x = -3$`, t`$x = -3$ or $x = 9$`, t`$x = 3 + 3\sqrt{2}$`, t`$x = 9$`, t`$x = \dfrac{33}{2}$`, t`$x = 27$`],
    answer: 3,
    hints: [t`Combine the logs into one, then undo the logarithm.`, t`Check each root: a logarithm needs a positive argument.`],
    solution: t`Combine the logarithms and undo the log:
$$\log_3\big(x(x - 6)\big) = 3 \quad\Rightarrow\quad x(x - 6) = 3^3 = 27.$$

So $x^2 - 6x - 27 = 0$, i.e. $(x - 9)(x + 3) = 0$.

Both $\log_3 x$ and $\log_3(x - 6)$ must be defined, so $x > 6$. The root $x = -3$ is rejected, leaving $x = 9$.

Check: $\log_3 9 + \log_3 3 = 2 + 1 = 3$ ✓`,
    traps: {
      1: t`$x = -3$ makes both logarithms undefined, so it must be rejected.`,
      4: t`Combines the logs as $\log_3(x + x - 6)$; the log of a *product* is the sum of the logs.`,
      2: t`Uses $x(x - 6) = 9$ instead of $3^3 = 27$.`,
      5: t`Solves $\log_3 x = 3$ and ignores the second logarithm.`,
    },
    insight: t`$\log a + \log b = \log(ab)$. Always check solutions of log equations: every argument must be positive.`,
    skills: ['laws of logarithms', 'quadratic equations'],
  },
  {
    id: '2-M2-18',
    module: 'M2',
    n: 18,
    topic: 'MM5',
    spec: ['MM5.3', 'MM5.1'],
    title: 'An exponential equation that is a disguised quadratic',
    difficulty: 3,
    time: 95,
    stem: t`Solve
$$2^x = 3 \times 2^{-x} + 2.$$`,
    options: [t`$x = \log_2 3 - 1$`, t`$x = \log_3 2$`, t`$x = \dfrac{1}{2}\log_2 3$`, t`$x = \log_2 3$`, t`$x = 2\log_2 3$`, t`$x = 3$`],
    answer: 3,
    hints: [t`Let $u = 2^x$, so that $2^{-x} = \dfrac{1}{u}$.`],
    solution: t`Let $u = 2^x$, which is always positive. Then $2^{-x} = \dfrac{1}{u}$ and the equation becomes
$$u = \frac{3}{u} + 2 \quad\Rightarrow\quad u^2 - 2u - 3 = 0 \quad\Rightarrow\quad (u - 3)(u + 1) = 0.$$

Since $u = 2^x > 0$, reject $u = -1$. So $2^x = 3$ and
$$x = \log_2 3.$$`,
    traps: {
      5: t`$u = 3$ is the value of $2^x$, not of $x$.`,
      1: t`$2^x = 3$ gives $x = \log_2 3$, not $\log_3 2$; the base of the log is the base of the power.`,
      2: t`Drops the $2u$ term, solving $2^{2x} = 3$ instead of $u^2 - 2u - 3 = 0$.`,
    },
    insight: t`Terms in $a^x$ and $a^{-x}$ (or $a^{2x}$) signal a quadratic in $u = a^x$; remember that $u$ must be positive.`,
    skills: ['exponential equations', 'logarithms', 'substitution'],
  },
  {
    id: '2-M2-19',
    module: 'M2',
    n: 19,
    topic: 'MM6',
    spec: ['MM6.2'],
    title: 'Differentiating after simplifying',
    difficulty: 2,
    time: 85,
    stem: t`Given that
$$f(x) = \frac{(2x - 1)^2}{\sqrt{x}}, \qquad x > 0,$$
what is the value of $f'(1)$?`,
    options: [t`$\dfrac{3}{2}$`, t`$\dfrac{5}{2}$`, t`$\dfrac{7}{2}$`, t`$4$`, t`$\dfrac{9}{2}$`, t`$8$`],
    answer: 2,
    hints: [t`Expand the numerator and divide each term by $x^{1/2}$ before differentiating.`],
    solution: t`Expand and divide each term by $x^{\frac{1}{2}}$:
$$f(x) = \frac{4x^2 - 4x + 1}{x^{\frac{1}{2}}} = 4x^{\frac{3}{2}} - 4x^{\frac{1}{2}} + x^{-\frac{1}{2}}.$$

Differentiate term by term:
$$f'(x) = 6x^{\frac{1}{2}} - 2x^{-\frac{1}{2}} - \frac{1}{2}x^{-\frac{3}{2}}.$$

At $x = 1$: $f'(1) = 6 - 2 - \dfrac{1}{2} = \dfrac{7}{2}$.`,
    traps: {
      4: t`Sign slip: the derivative of $x^{-\frac{1}{2}}$ is $-\tfrac{1}{2}x^{-\frac{3}{2}}$.`,
      3: t`Leaves out the derivative of the last term, $x^{-\frac{1}{2}}$.`,
      5: t`Differentiates the numerator and the denominator separately and divides; a quotient cannot be differentiated like that.`,
    },
    insight: t`Rewrite a fraction as a sum of powers of $x$ before differentiating.`,
    skills: ['differentiation', 'fractional indices'],
  },
  {
    id: '2-M2-20',
    module: 'M2',
    n: 20,
    topic: 'MM6',
    spec: ['MM6.1a', 'MM6.1b'],
    title: 'Least velocity of a particle',
    difficulty: 3,
    time: 90,
    stem: t`A particle moves along a straight line so that its displacement from a fixed point at time $t \ge 0$ is
$$s = t^3 - 6t^2 + 9t + 2.$$

What is the least value of its velocity?`,
    options: [t`$-12$`, t`$-3$`, t`$0$`, t`$2$`, t`$4$`, t`$9$`],
    answer: 1,
    hints: [t`Velocity is $\dfrac{ds}{dt}$; its least value occurs where $\dfrac{dv}{dt} = 0$.`],
    solution: t`The velocity and acceleration are
$$v = \frac{ds}{dt} = 3t^2 - 12t + 9, \qquad a = \frac{dv}{dt} = \frac{d^2s}{dt^2} = 6t - 12.$$

The velocity is least when $a = 0$, at $t = 2$ (a minimum, since $\dfrac{d^2v}{dt^2} = 6 > 0$):
$$v = 3(4) - 12(2) + 9 = -3.$$`,
    traps: {
      2: t`The velocity is zero when the particle stops ($t = 1$ and $t = 3$), but between those times it is negative.`,
      5: t`$9$ is the velocity at $t = 0$.`,
      4: t`$4$ is the displacement at $t = 2$, not the velocity.`,
      3: t`$2$ is the time at which the least velocity occurs.`,
    },
    insight: t`To find the extreme value of a rate of change, differentiate again: the least velocity is where the acceleration is zero.`,
    skills: ['rates of change', 'second derivative', 'kinematics'],
  },
  {
    id: '2-M2-21',
    module: 'M2',
    n: 21,
    topic: 'MM6',
    spec: ['MM6.1', 'MM6.3'],
    title: 'Where a normal meets the curve again',
    difficulty: 3,
    time: 100,
    stem: t`The normal to the curve $y = x^2 - 4x + 5$ at the point $(3, 2)$ meets the curve again at the point $R$.

What are the coordinates of $R$?`,
    options: [
      t`$(-1, 10)$`,
      t`$\left(-\tfrac{1}{2}, \tfrac{29}{4}\right)$`,
      t`$(1, 2)$`,
      t`$\left(\tfrac{3}{2}, \tfrac{5}{4}\right)$`,
      t`$(2, 1)$`,
      t`$\left(\tfrac{1}{2}, \tfrac{13}{4}\right)$`,
    ],
    answer: 5,
    hints: [t`The gradient of the curve at $x = 3$ is $2$, so the normal has gradient $-\tfrac{1}{2}$.`, t`One root of the resulting quadratic is already known: $x = 3$.`],
    solution: t`$\dfrac{dy}{dx} = 2x - 4$, which is $2$ at $x = 3$. The normal has gradient $-\dfrac{1}{2}$:
$$y - 2 = -\frac{1}{2}(x - 3) \quad\Rightarrow\quad y = -\frac{1}{2}x + \frac{7}{2}.$$

Where it meets the curve:
$$x^2 - 4x + 5 = -\frac{1}{2}x + \frac{7}{2} \quad\Rightarrow\quad 2x^2 - 7x + 3 = 0 \quad\Rightarrow\quad (2x - 1)(x - 3) = 0.$$

$x = 3$ is the original point, so $R$ has $x = \dfrac{1}{2}$ and $y = \dfrac{1}{4} - 2 + 5 = \dfrac{13}{4}$.`,
    traps: {
      3: t`Uses gradient $+\tfrac{1}{2}$ for the normal; the normal's gradient is the *negative* reciprocal.`,
      0: t`Uses gradient $-2$, the negative of the tangent's gradient rather than the negative reciprocal.`,
      4: t`$(2, 1)$ is the vertex of the parabola.`,
      1: t`Sign slip when rearranging, giving $2x^2 + 7x + 3 = 0$.`,
    },
    insight: t`The normal is perpendicular to the tangent (gradient $-1/m$). When it meets the curve again, one root is already known, so the quadratic factorises easily.`,
    skills: ['normals', 'differentiation', 'quadratic equations'],
  },
  {
    id: '2-M2-22',
    module: 'M2',
    n: 22,
    topic: 'MM6',
    spec: ['MM6.3', 'MM8.5a'],
    title: 'A cubic whose minimum touches the x-axis',
    difficulty: 3,
    time: 95,
    stem: t`The curve $y = x^3 - 3x^2 - 9x + k$ has a local minimum point on the $x$-axis.

What is the value of $k$?`,
    options: [t`$-27$`, t`$-5$`, t`$0$`, t`$5$`, t`$27$`, t`$32$`],
    answer: 4,
    hints: [t`Find the stationary points; decide which is the minimum.`],
    solution: t`$$\frac{dy}{dx} = 3x^2 - 6x - 9 = 3(x - 3)(x + 1),$$
so the stationary points are at $x = -1$ and $x = 3$. Since $\dfrac{d^2y}{dx^2} = 6x - 6$ is positive at $x = 3$, the local minimum is at $x = 3$.

Its $y$-coordinate is $27 - 27 - 27 + k = k - 27$. On the $x$-axis this is zero, so
$$k = 27.$$

(The local maximum, at $x = -1$, then has $y = 5 + 27 = 32$.)`,
    traps: {
      1: t`Puts the local *maximum* ($x = -1$, $y = 5 + k$) on the $x$-axis.`,
      0: t`Sign slip: the minimum value is $k - 27$, so $k = 27$.`,
      5: t`$32$ is the height of the local maximum once $k = 27$.`,
    },
    insight: t`Find the stationary points, classify them with the second derivative, then impose the condition on the right one.`,
    skills: ['stationary points', 'second derivative', 'cubic graphs'],
  },
  {
    id: '2-M2-23',
    module: 'M2',
    n: 23,
    topic: 'MM7',
    spec: ['MM7.2', 'MM7.3a'],
    title: 'Integrating after expanding',
    difficulty: 3,
    time: 100,
    stem: t`Evaluate
$$\int_1^4 \frac{(x - 2)^2}{\sqrt{x}}\,dx.$$`,
    options: [t`$-\dfrac{26}{15}$`, t`$\dfrac{26}{15}$`, t`$\dfrac{52}{15}$`, t`$\dfrac{86}{15}$`, t`$\dfrac{112}{15}$`, t`$\dfrac{102}{5}$`],
    answer: 1,
    hints: [t`Expand $(x - 2)^2$ and divide each term by $x^{1/2}$.`],
    solution: t`Expand and divide each term by $x^{\frac{1}{2}}$:
$$\frac{x^2 - 4x + 4}{x^{\frac{1}{2}}} = x^{\frac{3}{2}} - 4x^{\frac{1}{2}} + 4x^{-\frac{1}{2}}.$$

Integrate:
$$\left[\frac{2}{5}x^{\frac{5}{2}} - \frac{8}{3}x^{\frac{3}{2}} + 8x^{\frac{1}{2}}\right]_1^4.$$

At $x = 4$: $\dfrac{64}{5} - \dfrac{64}{3} + 16 = \dfrac{112}{15}$. At $x = 1$: $\dfrac{2}{5} - \dfrac{8}{3} + 8 = \dfrac{86}{15}$.

The integral is $\dfrac{112}{15} - \dfrac{86}{15} = \dfrac{26}{15}$. (It must be positive, since the integrand is never negative.)`,
    traps: {
      4: t`$\tfrac{112}{15}$ is the value at the upper limit only; the value at $x = 1$ must be subtracted.`,
      0: t`Subtracts the wrong way round: $F(4) - F(1)$, not $F(1) - F(4)$. The integrand is never negative, so the answer must be positive.`,
      5: t`Expands $(x - 2)^2$ as $x^2 + 4$.`,
      3: t`$\tfrac{86}{15}$ is the value at the lower limit only.`,
    },
    insight: t`Split a fraction into powers of $x$ before integrating, and use the sign of the integrand as a quick check.`,
    skills: ['integration', 'fractional indices', 'definite integrals'],
  },
  {
    id: '2-M2-24',
    module: 'M2',
    n: 24,
    topic: 'MM7',
    spec: ['MM7.4', 'MM7.3a'],
    title: 'Combining definite integrals',
    difficulty: 3,
    time: 95,
    stem: t`Given that
$$\int_0^2 f(x)\,dx = 3 \qquad\text{and}\qquad \int_0^5 f(x)\,dx = 8,$$
what is the value of
$$\int_5^2 \big(4f(x) - 2\big)\,dx\ ?$$`,
    options: [t`$-38$`, t`$-20$`, t`$-18$`, t`$-14$`, t`$-10$`, t`$14$`],
    answer: 3,
    hints: [t`First find $\displaystyle\int_2^5 f(x)\,dx$.`, t`Swapping the limits changes the sign of an integral.`],
    solution: t`Splitting the range,
$$\int_2^5 f(x)\,dx = \int_0^5 f(x)\,dx - \int_0^2 f(x)\,dx = 8 - 3 = 5.$$

Then
$$\int_2^5 \big(4f(x) - 2\big)\,dx = 4 \times 5 - \big[2x\big]_2^5 = 20 - 6 = 14.$$

Swapping the limits changes the sign:
$$\int_5^2 \big(4f(x) - 2\big)\,dx = -14.$$`,
    traps: {
      5: t`Forgets that the limits run from 5 down to 2, which changes the sign.`,
      0: t`Adds the given integrals ($3 + 8$) instead of subtracting to find $\int_2^5 f$.`,
      1: t`Leaves out the $-2$ term.`,
      2: t`Integrates the constant $-2$ as $-2$ rather than $-2 \times (\text{length of the interval})$.`,
      4: t`Integrates the constant over an interval of length 5 instead of 3.`,
    },
    insight: t`$\int_a^b + \int_b^c = \int_a^c$, $\int_b^a = -\int_a^b$, and a constant $k$ integrates to $k \times (b - a)$.`,
    skills: ['definite integrals', 'properties of integrals'],
  },
  {
    id: '2-M2-25',
    module: 'M2',
    n: 25,
    topic: 'MM8',
    spec: ['MM8.2', 'MM8.2c', 'MM8.2d'],
    title: 'Minimum point of a composite function',
    difficulty: 4,
    time: 105,
    stem: t`The functions $f$ and $g$ are defined for all real $x$ by
$$f(x) = x^2 - 4x \qquad\text{and}\qquad g(x) = 2x + 1.$$

What are the coordinates of the minimum point of the curve $y = f(g(x))$?`,
    options: [
      t`$\left(\tfrac{1}{2}, -4\right)$`,
      t`$\left(\tfrac{3}{2}, -4\right)$`,
      t`$(2, -4)$`,
      t`$(2, -7)$`,
      t`$(5, -4)$`,
      t`$\left(\tfrac{1}{2}, -7\right)$`,
    ],
    answer: 0,
    hints: [t`$y = f(x)$ has its minimum $-4$ at $x = 2$. For which $x$ is $g(x) = 2$?`],
    solution: t`Complete the square: $f(x) = (x - 2)^2 - 4$, so $f$ takes its least value, $-4$, when its input is $2$.

In $y = f(g(x))$ the input to $f$ is $g(x) = 2x + 1$. This equals $2$ when $x = \tfrac{1}{2}$, so the minimum point is
$$\left(\tfrac{1}{2}, -4\right).$$

**Check by expanding.** $f(g(x)) = (2x + 1)^2 - 4(2x + 1) = 4x^2 - 4x - 3 = 4\left(x - \tfrac{1}{2}\right)^2 - 4$ ✓

(As transformations: $f(2x + 1)$ is $f(x)$ translated 1 unit left, then stretched by factor $\tfrac{1}{2}$ parallel to the $x$-axis, so $x = 2$ moves to $x = 1$ and then to $x = \tfrac{1}{2}$.)`,
    traps: {
      1: t`Applies the stretch before the translation: $(2 + 1) \div 2$. Solve $2x + 1 = 2$ instead.`,
      4: t`Applies $g$ to the $x$-coordinate ($2 \times 2 + 1$) instead of solving $g(x) = 2$.`,
      3: t`This is the minimum of $g(f(x)) = 2(x^2 - 4x) + 1$, the composition in the other order.`,
      2: t`The inner function $g$ moves the minimum; it is not at $x = 2$ any more.`,
    },
    insight: t`The minimum of $f(g(x))$ is where the inner function $g(x)$ equals the input that minimises $f$; the minimum value is unchanged.`,
    skills: ['composite functions', 'transformations of graphs', 'completing the square'],
  },
  {
    id: '2-M2-26',
    module: 'M2',
    n: 26,
    topic: 'MM8',
    spec: ['MM8.4'],
    title: 'Signs of a, b and c from a parabola',
    difficulty: 2,
    time: 75,
    stem: t`The diagram shows part of the graph of $y = a(x + b)^2 + c$, where $a$, $b$ and $c$ are non-zero constants.`,
    diagram: 'p2-m2-parabola',
    diagramAlt: 'A parabola that opens downwards. Its vertex is above the x-axis and to the right of the y-axis.',
    prompt: t`Which of the following is correct?`,
    options: [
      t`$a > 0$, $b > 0$, $c > 0$`,
      t`$a > 0$, $b > 0$, $c < 0$`,
      t`$a > 0$, $b < 0$, $c > 0$`,
      t`$a > 0$, $b < 0$, $c < 0$`,
      t`$a < 0$, $b > 0$, $c > 0$`,
      t`$a < 0$, $b > 0$, $c < 0$`,
      t`$a < 0$, $b < 0$, $c > 0$`,
      t`$a < 0$, $b < 0$, $c < 0$`,
    ],
    answer: 6,
    hints: [t`The vertex of $y = a(x + b)^2 + c$ is at $(-b, c)$.`],
    solution: t`- The parabola opens downwards, so $a < 0$.
- The vertex of $y = a(x + b)^2 + c$ is at $(-b, c)$. It is to the right of the $y$-axis, so $-b > 0$, i.e. $b < 0$.
- The vertex is above the $x$-axis, so $c > 0$.

So $a < 0$, $b < 0$, $c > 0$.`,
    traps: {
      4: t`The vertex is at $x = -b$: a vertex to the right of the $y$-axis means $b$ is negative.`,
      2: t`A parabola that opens downwards has $a < 0$.`,
    },
    insight: t`For $y = a(x + b)^2 + c$: the sign of $a$ gives the shape, and the vertex is at $(-b, c)$; note the minus sign on $b$.`,
    skills: ['completed-square form', 'graphs of quadratics'],
  },
  {
    id: '2-M2-27',
    module: 'M2',
    n: 27,
    topic: 'MM8',
    spec: ['MM8.6', 'MM8.7', 'MM8.5a'],
    title: 'When a quartic equation has four roots',
    difficulty: 5,
    time: 140,
    stem: t`For which values of the constant $k$ does the equation
$$(x^2 - 2x)^2 - 2(x^2 - 2x) = k$$
have exactly four distinct real solutions?`,
    options: [t`$-1 < k < 3$`, t`$-1 < k < 0$`, t`$0 < k < 3$`, t`$k > -1$`, t`$-1 \le k \le 3$`, t`$0 < k < 1$`],
    answer: 0,
    hints: [
      t`Let $u = x^2 - 2x = (x - 1)^2 - 1$. Which values can $u$ take, and how many $x$ give each value?`,
      t`Alternatively, sketch $y = (x^2 - 2x)^2 - 2(x^2 - 2x)$ using its stationary points and count its intersections with $y = k$.`,
    ],
    solution: t`**Method 1: substitution.** Let $u = x^2 - 2x = (x - 1)^2 - 1$. Then $u \ge -1$; each value $u > -1$ comes from **two** values of $x$, and $u = -1$ from just one ($x = 1$).

The equation becomes $u^2 - 2u = k$, i.e. $(u - 1)^2 = k + 1$, so $u = 1 \pm \sqrt{k + 1}$.

- For four solutions we need two different values of $u$, both greater than $-1$.
- Two values need $k > -1$.
- The smaller, $1 - \sqrt{k + 1}$, is greater than $-1$ only when $\sqrt{k + 1} < 2$, i.e. $k < 3$.

So there are four solutions exactly when $-1 < k < 3$. (At $k = 3$ the smaller value is $u = -1$, giving 3 solutions; at $k = -1$ there is a single value $u = 1$, giving 2.)

**Method 2: the graph.** For $y = (x^2 - 2x)^2 - 2(x^2 - 2x)$,
$$\frac{dy}{dx} = (2u - 2)(2x - 2) = 4(u - 1)(x - 1).$$

It is stationary at $x = 1$ (a local maximum, $y = 3$) and where $u = 1$, i.e. $x = 1 \pm \sqrt{2}$ (two minima, $y = -1$). The graph is a W shape, and a horizontal line $y = k$ meets it four times exactly when it lies strictly between the minima and the local maximum: $-1 < k < 3$.`,
    solutionDiagram: 'p2-m2-quartic-sol',
    traps: {
      2: t`The left-hand side is not a perfect square, so it can be negative: its least value is $-1$.`,
      3: t`For $k > 3$ the line $y = k$ is above the local maximum and meets the W only twice.`,
      4: t`At $k = -1$ there are only 2 solutions, and at $k = 3$ only 3.`,
      5: t`This is the answer for $(x^2 - 2x)^2 = k$, which ignores the $-2(x^2 - 2x)$ term.`,
    },
    insight: t`Count solutions of $f(x) = k$ by sketching $y = f(x)$ from its stationary points: the number of roots changes only as $k$ passes a turning value.`,
    skills: ['number of roots', 'stationary points', 'substitution', 'sketching graphs'],
  },
];
