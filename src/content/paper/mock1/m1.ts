import type { Question } from '../../types';

const t = String.raw;

/**
 * ESAT Crucible predicted paper — Mathematics 1.
 * 27 questions, 40 minutes, no calculator. Deliberately harder than a
 * typical ESAT Mathematics 1 module, but every question stays inside the
 * official M1-M7 specification (note: M1 does not require the sine or
 * cosine rules).
 */
export const M1: Question[] = [
  {
    id: 'M1-01',
    module: 'M1',
    n: 1,
    topic: 'M1',
    spec: ['M1.2', 'M5.15'],
    title: 'Length of a wire from its mass',
    difficulty: 2,
    time: 75,
    stem: t`A metal wire has a circular cross-section of diameter $d$ mm. The metal has density $\rho\ \text{g cm}^{-3}$ and the wire has mass $m$ kg.

What is the length of the wire, in metres?`,
    options: [
      t`$\dfrac{4m}{\pi\rho d^2}$`,
      t`$\dfrac{400m}{\pi\rho d^2}$`,
      t`$\dfrac{1000m}{\pi\rho d^2}$`,
      t`$\dfrac{4000m}{\pi\rho d^2}$`,
      t`$\dfrac{40\,000m}{\pi\rho d^2}$`,
      t`$\dfrac{400\,000m}{\pi\rho d^2}$`,
    ],
    answer: 3,
    hints: [
      t`Work entirely in grams and centimetres, then convert the final length to metres.`,
      t`A diameter of $d$ mm is a radius of $\dfrac{d}{20}$ cm.`,
    ],
    solution: t`Work in grams and centimetres throughout.

The mass is $m$ kg $= 1000m$ g, so the volume is
$$V = \frac{\text{mass}}{\text{density}} = \frac{1000m}{\rho}\ \text{cm}^3.$$

The radius is $\dfrac{d}{2}$ mm $= \dfrac{d}{20}$ cm, so the cross-sectional area is
$$A = \pi\left(\frac{d}{20}\right)^2 = \frac{\pi d^2}{400}\ \text{cm}^2.$$

The wire is a cylinder, so its length is
$$L = \frac{V}{A} = \frac{1000m}{\rho}\times\frac{400}{\pi d^2} = \frac{400\,000m}{\pi\rho d^2}\ \text{cm}.$$

Dividing by 100 to convert to metres gives $L = \dfrac{4000m}{\pi\rho d^2}$ m.`,
    traps: {
      0: t`Forgets to convert kg to g (a factor of 1000).`,
      2: t`Uses $d$ as the radius instead of the diameter (the area becomes $\pi d^2/100$ instead of $\pi d^2/400$).`,
      4: t`Converts centimetres to metres by dividing by 10 instead of 100.`,
      5: t`This is the correct length in centimetres: the final conversion to metres has been missed.`,
    },
    insight: t`With algebraic unit conversions, pick one consistent system (here g and cm), do all the physics in it, and convert once at the end.`,
    skills: ['unit conversion', 'density', 'cylinder volume'],
  },
  {
    id: 'M1-02',
    module: 'M1',
    n: 2,
    topic: 'M2',
    spec: ['M2.9', 'M2.10'],
    title: 'Difference of recurring decimals',
    difficulty: 2,
    time: 75,
    stem: t`Given that $x = 0.2\dot{7}$ and $y = 0.\dot{2}\dot{7}$, what is the value of $x - y$ as a fraction in its simplest form?`,
    options: [t`$\dfrac{1}{990}$`, t`$\dfrac{1}{198}$`, t`$\dfrac{1}{180}$`, t`$\dfrac{7}{900}$`, t`$\dfrac{1}{99}$`, t`$\dfrac{3}{110}$`],
    answer: 1,
    hints: [
      t`$x = 0.2777\ldots$ but $y = 0.272727\ldots$ — they recur differently.`,
      t`Compare $100x$ with $10x$, and $100y$ with $y$.`,
    ],
    solution: t`Only the 7 recurs in $x = 0.2777\ldots$:
$$100x - 10x = 27.777\ldots - 2.777\ldots = 25 \;\Rightarrow\; x = \frac{25}{90} = \frac{5}{18}.$$

Both digits recur in $y = 0.272727\ldots$:
$$100y - y = 27 \;\Rightarrow\; y = \frac{27}{99} = \frac{3}{11}.$$

So
$$x - y = \frac{5}{18} - \frac{3}{11} = \frac{55 - 54}{198} = \frac{1}{198}.$$

Check: $0.27777\ldots - 0.272727\ldots = 0.0050505\ldots$, and $\dfrac{1}{198} = 0.0050505\ldots$ ✓`,
    traps: {
      3: t`Treats $y$ as the terminating decimal $0.27$.`,
      5: t`Writes $x$ as $\tfrac{27}{90}$, which is actually $0.3$.`,
    },
    insight: t`To convert a recurring decimal, multiply by powers of 10 that line up the recurring blocks exactly, then subtract.`,
    skills: ['recurring decimals', 'fractions'],
  },
  {
    id: 'M1-03',
    module: 'M1',
    n: 3,
    topic: 'M4',
    spec: ['M4.5', 'M4.6'],
    title: 'Algebraic fractions that collapse',
    difficulty: 2,
    time: 80,
    stem: t`Simplify fully
$$\frac{3}{x-2} - \frac{2}{x+1} - \frac{9}{x^2 - x - 2}.$$`,
    options: [
      t`$\dfrac{x-2}{x+1}$`,
      t`$\dfrac{1}{x-2}$`,
      t`$-\dfrac{1}{x+1}$`,
      t`$\dfrac{x-10}{(x-2)(x+1)}$`,
      t`$\dfrac{x+7}{(x-2)(x+1)}$`,
      t`$\dfrac{1}{x+1}$`,
    ],
    answer: 5,
    hints: [t`Factorise $x^2 - x - 2$ first: it is the common denominator.`],
    solution: t`Since $x^2 - x - 2 = (x-2)(x+1)$, write everything over $(x-2)(x+1)$:
$$\frac{3(x+1) - 2(x-2) - 9}{(x-2)(x+1)} = \frac{3x + 3 - 2x + 4 - 9}{(x-2)(x+1)} = \frac{x - 2}{(x-2)(x+1)}.$$

Cancelling the factor $(x-2)$ leaves
$$\frac{1}{x+1}.$$`,
    traps: {
      3: t`Expands $-2(x-2)$ as $-2x - 4$ instead of $-2x + 4$.`,
      4: t`Forgets to include the $-9$ in the numerator.`,
      2: t`A sign slip somewhere in the numerator.`,
    },
    insight: t`When a question says "simplify fully", expect a factor to cancel at the end. If nothing cancels, re-check your signs.`,
    skills: ['algebraic fractions', 'factorising'],
  },
  {
    id: 'M1-04',
    module: 'M1',
    n: 4,
    topic: 'M4',
    spec: ['M4.7'],
    title: 'Changing the subject through a square root',
    difficulty: 2,
    time: 75,
    stem: t`Given that
$$a = \sqrt{\frac{bx^2 + c}{x^2 - 1}}$$
where $x > 1$, $a^2 > b$ and $a^2 + c > 0$, which of the following is an expression for $x$?`,
    options: [
      t`$\sqrt{\dfrac{a^2 + c}{a^2 - b}}$`,
      t`$\sqrt{\dfrac{a^2 - c}{a^2 - b}}$`,
      t`$\dfrac{a^2 + c}{a^2 - b}$`,
      t`$\sqrt{\dfrac{a^2 + c}{a^2 + b}}$`,
      t`$\sqrt{\dfrac{a^2 + c}{b - a^2}}$`,
      t`$\sqrt{\dfrac{c - a^2}{a^2 - b}}$`,
    ],
    answer: 0,
    hints: [t`Square both sides, then multiply by $x^2 - 1$ and collect the $x^2$ terms.`],
    solution: t`Square both sides and clear the fraction:
$$a^2(x^2 - 1) = bx^2 + c \;\Rightarrow\; a^2x^2 - bx^2 = a^2 + c.$$

Factorise the left-hand side:
$$x^2(a^2 - b) = a^2 + c \;\Rightarrow\; x^2 = \frac{a^2 + c}{a^2 - b}.$$

Since $x > 1$ we take the positive root:
$$x = \sqrt{\frac{a^2 + c}{a^2 - b}}.$$`,
    traps: {
      1: t`Moves $+c$ to the other side without changing its sign.`,
      2: t`This is $x^2$, not $x$.`,
      4: t`Collects the $x^2$ terms on the wrong side but keeps $a^2 + c$ positive; the signs are now inconsistent (this expression is not even real when $a^2 > b$).`,
      5: t`Moves $-a^2$ to the other side without changing its sign.`,
    },
    insight: t`To make $x$ the subject when it appears more than once, collect every $x$ term on one side and factorise.`,
    skills: ['rearranging formulae'],
  },
  {
    id: 'M1-05',
    module: 'M1',
    n: 5,
    topic: 'M4',
    spec: ['M4.14', 'M4.13'],
    title: 'Average speed from a speed–time graph',
    difficulty: 2,
    time: 80,
    stem: t`The speed–time graph shows a cyclist's journey. The cyclist accelerates uniformly from rest to $12\ \text{m s}^{-1}$ in 8 s, travels at this constant speed for $T$ seconds, then decelerates uniformly to rest in 4 s.

The total distance travelled is 360 m.`,
    diagram: 'm1-speed-time',
    diagramAlt: 'Speed–time graph: a trapezium rising from 0 to 12 m/s over 8 s, flat for T seconds, then falling to 0 over 4 s.',
    prompt: t`What is the cyclist's average speed for the whole journey?`,
    options: [
      t`$6\ \text{m s}^{-1}$`,
      t`$8\ \text{m s}^{-1}$`,
      t`$10\ \text{m s}^{-1}$`,
      t`$12\ \text{m s}^{-1}$`,
      t`$15\ \text{m s}^{-1}$`,
      t`$18\ \text{m s}^{-1}$`,
    ],
    answer: 2,
    hints: [t`Distance is the area under the graph. Write it in terms of $T$.`],
    solution: t`The distance is the area under the graph:
$$\tfrac12(8)(12) + 12T + \tfrac12(4)(12) = 48 + 12T + 24 = 72 + 12T.$$

Setting $72 + 12T = 360$ gives $T = 24$ s, so the total time is $8 + 24 + 4 = 36$ s.

$$\text{average speed} = \frac{\text{total distance}}{\text{total time}} = \frac{360}{36} = 10\ \text{m s}^{-1}.$$`,
    traps: {
      0: t`Averages the start and maximum speeds, which only works for uniform acceleration throughout.`,
      3: t`This is the maximum speed, not the average.`,
      4: t`Divides by $T = 24$ s instead of the total time of 36 s.`,
    },
    insight: t`Average speed is always total distance over total time; never average the speeds unless the motion is a single uniform acceleration.`,
    skills: ['speed–time graphs', 'area under graph'],
  },
  {
    id: 'M1-06',
    module: 'M1',
    n: 6,
    topic: 'M2',
    spec: ['M2.11'],
    title: 'A telescoping sum of surds',
    difficulty: 3,
    time: 90,
    stem: t`What is the value of
$$\frac{1}{\sqrt1 + \sqrt2} + \frac{1}{\sqrt2 + \sqrt3} + \frac{1}{\sqrt3 + \sqrt4} + \cdots + \frac{1}{\sqrt{99} + \sqrt{100}}\ ?$$`,
    options: [t`$\dfrac{1}{9}$`, t`$3$`, t`$3\sqrt{11} - 1$`, t`$9$`, t`$10$`, t`$99$`],
    answer: 3,
    hints: [
      t`Rationalise the denominator of one general term $\dfrac{1}{\sqrt{k} + \sqrt{k+1}}$.`,
      t`Write out the first few rationalised terms: what cancels?`,
    ],
    solution: t`Rationalise a general term by multiplying top and bottom by $\sqrt{k+1} - \sqrt{k}$:
$$\frac{1}{\sqrt{k} + \sqrt{k+1}} = \frac{\sqrt{k+1} - \sqrt{k}}{(k+1) - k} = \sqrt{k+1} - \sqrt{k}.$$

The sum becomes
$$(\sqrt2 - \sqrt1) + (\sqrt3 - \sqrt2) + (\sqrt4 - \sqrt3) + \cdots + (\sqrt{100} - \sqrt{99}).$$

Every intermediate surd cancels (the sum "telescopes"), leaving
$$\sqrt{100} - \sqrt{1} = 10 - 1 = 9.$$`,
    traps: {
      4: t`Keeps $\sqrt{100}$ but forgets to subtract $\sqrt1$.`,
      2: t`Stops the telescoping one term early, at $\sqrt{99} - 1$.`,
      5: t`This is the number of terms, not the sum.`,
    },
    insight: t`A long sum of surd fractions is almost always a telescoping sum: rationalise one term and watch the cancellation.`,
    skills: ['surds', 'rationalising', 'telescoping sums'],
  },
  {
    id: 'M1-07',
    module: 'M1',
    n: 7,
    topic: 'M2',
    spec: ['M2.12'],
    title: 'Upper and lower bounds of a quotient',
    difficulty: 3,
    time: 100,
    stem: t`The numbers $a$, $b$ and $c$ are each given correct to 1 decimal place as
$$a = 5.6, \qquad b = 3.2, \qquad c = 0.4.$$

By how much does the upper bound of $\dfrac{a - b}{c}$ exceed its lower bound?`,
    options: [t`$\dfrac{1}{2}$`, t`$\dfrac{64}{63}$`, t`$\dfrac{32}{21}$`, t`$\dfrac{110}{63}$`, t`$2$`, t`$\dfrac{128}{63}$`],
    answer: 5,
    hints: [
      t`To make a fraction as large as possible, make the numerator large and the denominator small.`,
      t`The largest value of $a - b$ uses the largest $a$ and the smallest $b$.`,
    ],
    solution: t`The bounds are $5.55 \le a < 5.65$, $\;3.15 \le b < 3.25$ and $0.35 \le c < 0.45$.

**Upper bound:** largest numerator, smallest denominator:
$$\frac{5.65 - 3.15}{0.35} = \frac{2.5}{0.35} = \frac{50}{7}.$$

**Lower bound:** smallest numerator, largest denominator:
$$\frac{5.55 - 3.25}{0.45} = \frac{2.3}{0.45} = \frac{46}{9}.$$

**Difference:**
$$\frac{50}{7} - \frac{46}{9} = \frac{450 - 322}{63} = \frac{128}{63}.$$`,
    traps: {
      0: t`Treats $c = 0.4$ as exact.`,
      2: t`Uses the upper bound of $b$ when maximising and the lower bound of $b$ when minimising (the wrong way round).`,
      3: t`Uses the upper bound of $b$ when maximising the numerator.`,
      4: t`The answer is close to 2 ($128/63 \approx 2.03$), but it is not exactly 2.`,
    },
    insight: t`For a difference $a - b$, the largest value uses the upper bound of $a$ and the lower bound of $b$. Subtraction and division both reverse the choice of bound for the second quantity.`,
    skills: ['bounds', 'fractions'],
  },
  {
    id: 'M1-08',
    module: 'M1',
    n: 8,
    topic: 'M3',
    spec: ['M3.9', 'M5.15'],
    title: 'Stretching a wire: combined proportion',
    difficulty: 3,
    time: 90,
    stem: t`The resistance $R$ of a wire is directly proportional to its length and inversely proportional to its cross-sectional area.

A uniform wire is stretched so that its length increases by 20%. Its volume does not change and it remains uniform.

By what percentage does its resistance increase?`,
    options: [t`20%`, t`40%`, t`44%`, t`60%`, t`72.8%`, t`107.36%`],
    answer: 2,
    hints: [t`The volume is fixed, so the area is inversely proportional to the length. How then does $R$ depend on $L$ alone?`],
    solution: t`$R = \dfrac{kL}{A}$ for some constant $k$. The volume $V = AL$ is constant, so $A = \dfrac{V}{L}$ and
$$R = \frac{kL}{V/L} = \frac{k}{V}L^2 \;\propto\; L^2.$$

Increasing $L$ by 20% multiplies it by $1.2$, so $R$ is multiplied by $1.2^2 = 1.44$.

The resistance increases by **44%**.`,
    traps: {
      0: t`Ignores the fact that the wire gets thinner as it is stretched.`,
      1: t`Doubles the percentage instead of squaring the multiplier.`,
      4: t`Uses $1.2^3$: treats $R$ as proportional to $L^3$.`,
    },
    insight: t`Turn percentage changes into multipliers ($+20\% \to \times1.2$), find the power law, and raise the multiplier to that power.`,
    skills: ['direct and inverse proportion', 'percentage change'],
  },
  {
    id: 'M1-09',
    module: 'M1',
    n: 9,
    topic: 'M3',
    spec: ['M3.5', 'M3.8'],
    title: 'Evaporation and mixing',
    difficulty: 3,
    time: 100,
    stem: t`A container holds 400 g of a salt solution that is 12% salt by mass. Some water evaporates from the container, and then 100 g of a solution that is 30% salt by mass is added.

The resulting solution is 20% salt by mass.

What mass of water evaporated?`,
    options: [t`10 g`, t`90 g`, t`110 g`, t`120 g`, t`150 g`, t`160 g`],
    answer: 2,
    hints: [t`Evaporation removes water but never salt. Track the mass of salt.`],
    solution: t`Only water evaporates, so track the salt.

- Salt at the start: $0.12 \times 400 = 48$ g.
- Salt added: $0.30 \times 100 = 30$ g.
- Total salt: $78$ g.

This is 20% of the final solution, so the final mass is $\dfrac{78}{0.2} = 390$ g.

Before the 100 g was added, the mass was $390 - 100 = 290$ g. The mass of water that evaporated is therefore
$$400 - 290 = 110\ \text{g}.$$`,
    traps: {
      0: t`Forgets that adding the 100 g of solution also increases the mass.`,
      5: t`Ignores the added solution: $160$ g is the evaporation needed to take the original solution alone to 20%.`,
    },
    insight: t`In mixture problems, find the quantity that is conserved (here the salt) and use it to work back to the unknown.`,
    skills: ['percentages', 'concentration', 'mixtures'],
  },
  {
    id: 'M1-10',
    module: 'M1',
    n: 10,
    topic: 'M4',
    spec: ['M4.15', 'M5.10'],
    title: 'A chord of a circle and a triangle',
    difficulty: 3,
    time: 100,
    stem: t`The line $2x + y = 5$ intersects the circle $x^2 + y^2 = 25$ at the points $A$ and $B$. $O$ is the origin.

What is the area of triangle $OAB$?`,
    options: [t`$2\sqrt5$`, t`$5$`, t`$8$`, t`$4\sqrt5$`, t`$10$`, t`$20$`],
    answer: 4,
    hints: [t`Substitute $y = 5 - 2x$ into the circle's equation to find $A$ and $B$.`],
    solution: t`Substituting $y = 5 - 2x$:
$$x^2 + (5 - 2x)^2 = 25 \;\Rightarrow\; 5x^2 - 20x = 0 \;\Rightarrow\; 5x(x - 4) = 0.$$

So $x = 0$ or $x = 4$, giving $A = (0, 5)$ and $B = (4, -3)$.

$OA$ lies along the $y$-axis with length 5, and the perpendicular distance from $B$ to the $y$-axis is 4. So
$$\text{area} = \tfrac12 \times 5 \times 4 = 10.$$`,
    traps: {
      3: t`This is the length of the chord $AB = \sqrt{4^2 + 8^2}$, not an area.`,
      5: t`Forgets the $\tfrac12$ in the area of a triangle.`,
    },
    insight: t`When one vertex is the origin and another lies on an axis, use that side as the base: the height is then just a coordinate.`,
    skills: ['simultaneous equations', 'linear–quadratic', 'coordinate geometry'],
  },
  {
    id: 'M1-11',
    module: 'M1',
    n: 11,
    topic: 'M5',
    spec: ['M5.9a', 'M5.9e'],
    title: 'Tangent, chord and centre',
    difficulty: 3,
    time: 100,
    stem: t`$A$, $B$ and $C$ are points on a circle with centre $O$. The line $TA$ is the tangent to the circle at $A$.

Angle $TAB = 58^\circ$ and angle $BAC = 47^\circ$.`,
    diagram: 'm1-circle-theorem',
    diagramAlt: 'A circle with centre O and points A (bottom), B (right) and C (upper left). The tangent at A extends to T on the right. Chords AB, AC, BC and radii OB, OC are drawn.',
    prompt: t`What is the size of angle $OBC$?`,
    options: [t`$32^\circ$`, t`$43^\circ$`, t`$47^\circ$`, t`$58^\circ$`, t`$64^\circ$`, t`$75^\circ$`],
    answer: 1,
    hints: [
      t`Use the alternate segment theorem to find angle $ACB$.`,
      t`Angle $BOC$ at the centre is twice angle $BAC$ at the circumference.`,
    ],
    solution: t`**Method 1.** Angle $BOC$ is subtended by the arc $BC$, so it is twice angle $BAC$:
$$\angle BOC = 2 \times 47^\circ = 94^\circ.$$
Triangle $OBC$ is isosceles ($OB = OC$), so
$$\angle OBC = \frac{180^\circ - 94^\circ}{2} = 43^\circ.$$

**Method 2 (check).** The radius is perpendicular to the tangent, so $\angle OAB = 90^\circ - 58^\circ = 32^\circ$, and $\angle OBA = 32^\circ$ (isosceles). The alternate segment theorem gives $\angle ACB = 58^\circ$, so $\angle ABC = 180^\circ - 47^\circ - 58^\circ = 75^\circ$ and
$$\angle OBC = 75^\circ - 32^\circ = 43^\circ.$$`,
    traps: {
      0: t`This is angle $OBA$, not angle $OBC$.`,
      3: t`This is angle $ACB$ (the alternate segment angle).`,
      5: t`This is the whole of angle $ABC$.`,
    },
    insight: t`Circle problems usually yield to two moves: "radius ⊥ tangent" and "isosceles triangles made by radii". Look for them first.`,
    skills: ['circle theorems', 'alternate segment theorem'],
  },
  {
    id: 'M1-12',
    module: 'M1',
    n: 12,
    topic: 'M2',
    spec: ['M2.3'],
    title: 'Counting pairs with a given HCF and LCM',
    difficulty: 3,
    time: 90,
    stem: t`How many pairs of positive integers $(a, b)$ with $a < b$ have highest common factor 12 and lowest common multiple 360?`,
    options: [t`4`, t`5`, t`6`, t`8`, t`12`, t`16`],
    answer: 0,
    hints: [
      t`Write $a = 12p$ and $b = 12q$. What must be true of $p$ and $q$?`,
      t`$p$ and $q$ have no common factor and $pq = 30$.`,
    ],
    solution: t`Write $a = 12p$ and $b = 12q$, where $p$ and $q$ share no common factor (otherwise the HCF would exceed 12). Then
$$\text{LCM}(a, b) = 12pq = 360 \;\Rightarrow\; pq = 30 = 2 \times 3 \times 5.$$

Because $p$ and $q$ are coprime, each prime factor goes entirely into $p$ or entirely into $q$. That gives $2^3 = 8$ ordered pairs, which is 4 pairs with $p < q$:
$$(1, 30),\ (2, 15),\ (3, 10),\ (5, 6).$$

So $(a, b)$ is $(12, 360)$, $(24, 180)$, $(36, 120)$ or $(60, 72)$: **4 pairs**.`,
    traps: {
      3: t`Counts ordered pairs; the question requires $a < b$.`,
    },
    insight: t`For HCF $h$ and LCM $l$, write $a = hp$, $b = hq$ with $p, q$ coprime and $pq = l/h$. Also remember $ab = h \times l$.`,
    skills: ['HCF and LCM', 'prime factorisation', 'counting'],
  },
  {
    id: 'M1-13',
    module: 'M1',
    n: 13,
    topic: 'M6',
    spec: ['M6.2b', 'M6.3'],
    title: 'Reading a cumulative frequency graph',
    difficulty: 2,
    time: 100,
    stem: t`The cumulative frequency graph shows the marks scored by 80 students in a test.`,
    diagram: 'm1-cumfreq',
    diagramAlt: 'Cumulative frequency graph from 0 to 100 marks. It passes through (40, 20), (50, 40), (60, 54), (70, 66) and (80, 74), reaching 80 at 100 marks.',
    statements: [
      t`The median mark is 50.`,
      t`The interquartile range is 25 marks.`,
      t`More than 15% of the students scored more than 75 marks.`,
    ],
    prompt: t`Which of the statements is/are correct?`,
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
    answer: 3,
    hints: [t`With 80 students, the quartiles and median are read at cumulative frequencies 20, 40 and 60.`],
    solution: t`With $n = 80$, read the lower quartile, median and upper quartile at cumulative frequencies 20, 40 and 60.

- **Statement 1.** The graph reaches 40 at a mark of 50, so the median is 50. ✓
- **Statement 2.** The lower quartile (cumulative frequency 20) is 40. The upper quartile (cumulative frequency 60) lies halfway between $(60, 54)$ and $(70, 66)$, at 65. So the IQR is $65 - 40 = 25$. ✓
- **Statement 3.** At 75 marks the cumulative frequency is halfway between 66 and 74, which is 70. So $80 - 70 = 10$ students scored more than 75, which is $12.5\%$. ✗

Statements 1 and 2 only.`,
    traps: {
      6: t`Statement 3 fails: 10 out of 80 is 12.5%, not more than 15%.`,
    },
    insight: t`"More than $x$ marks" means the total minus the cumulative frequency at $x$. Always convert counts to percentages of the total.`,
    skills: ['cumulative frequency', 'quartiles', 'median'],
  },
  {
    id: 'M1-14',
    module: 'M1',
    n: 14,
    topic: 'M4',
    spec: ['M4.19', 'M4.16'],
    title: 'Where a quadratic sequence meets a linear one',
    difficulty: 3,
    time: 100,
    stem: t`The first four terms of a quadratic sequence are
$$3,\ 10,\ 21,\ 36,\ \ldots$$

The $n$th term of a second sequence is $15n + 16$.

For exactly one positive integer $n$, the $n$th terms of the two sequences are equal. What is this common value?`,
    options: [t`91`, t`105`, t`120`, t`128`, t`136`, t`171`],
    answer: 4,
    hints: [
      t`The second differences are 4, so the $n$th term starts $2n^2$.`,
      t`Set your $n$th term equal to $15n + 16$ and solve the quadratic.`,
    ],
    solution: t`The first differences are $7, 11, 15$ and the second difference is 4, so the $n$th term is $2n^2 + bn + c$.

Subtracting $2n^2$ from each term: $3 - 2 = 1$, $10 - 8 = 2$, $21 - 18 = 3$, $36 - 32 = 4$. That leaves $n$, so the $n$th term is
$$2n^2 + n.$$

Setting the terms equal:
$$2n^2 + n = 15n + 16 \;\Rightarrow\; 2n^2 - 14n - 16 = 0 \;\Rightarrow\; n^2 - 7n - 8 = 0,$$
so $(n - 8)(n + 1) = 0$ and $n = 8$.

The common value is $2(64) + 8 = 136$ (check: $15 \times 8 + 16 = 136$ ✓).`,
    traps: {
      1: t`This is the 7th term of the quadratic sequence.`,
      5: t`This is the 9th term of the quadratic sequence.`,
      2: t`Finds $n = 8$ correctly, then evaluates $15n$ and forgets the $+16$.`,
      3: t`This is $2n^2$ at $n = 8$: the $+n$ part of the $n$th term has been dropped.`,
    },
    insight: t`For a quadratic sequence, halve the second difference to get the $n^2$ coefficient, subtract that part, and find the linear remainder.`,
    skills: ['quadratic sequences', 'nth term', 'solving quadratics'],
  },
  {
    id: 'M1-15',
    module: 'M1',
    n: 15,
    topic: 'M5',
    spec: ['M5.6'],
    title: 'Combining three transformations',
    difficulty: 3,
    time: 90,
    stem: t`A shape is reflected in the line $y = x$. The image is then enlarged with scale factor $-1$, centre the origin $O$. This second image is then reflected in the $y$-axis.

Which single transformation maps the original shape onto the final image?`,
    options: [
      t`Rotation $90^\circ$ clockwise about $O$`,
      t`Rotation $90^\circ$ anticlockwise about $O$`,
      t`Rotation $180^\circ$ about $O$`,
      t`Reflection in the $x$-axis`,
      t`Reflection in the line $y = x$`,
      t`Reflection in the line $y = -x$`,
    ],
    answer: 0,
    hints: [t`Follow a general point $(x, y)$, or a specific point such as $(1, 0)$, through each step.`],
    solution: t`Follow a general point $(x, y)$ through each step:
$$\begin{aligned}(x, y) &\to (y, x) &&\text{reflect in } y = x\\ &\to (-y, -x) &&\text{enlarge by } {-1}\\ &\to (y, -x) &&\text{reflect in the } y\text{-axis}\end{aligned}$$

The map $(x, y) \mapsto (y, -x)$ is a **rotation of $90^\circ$ clockwise** about $O$. For example, it sends $(1, 0)$ to $(0, -1)$ and $(0, 1)$ to $(1, 0)$.`,
    traps: {
      5: t`$(x, y) \mapsto (-y, -x)$ is the result after only the first two steps.`,
      1: t`Anticlockwise $90^\circ$ is $(x, y) \mapsto (-y, x)$: the wrong direction.`,
    },
    insight: t`To combine transformations, apply them one at a time to the coordinates $(x, y)$ and then recognise the final map.`,
    skills: ['transformations', 'reflection', 'rotation', 'enlargement'],
  },
  {
    id: 'M1-16',
    module: 'M1',
    n: 16,
    topic: 'M5',
    spec: ['M5.17', 'M3.10'],
    title: 'Slicing a cone into three',
    difficulty: 3,
    time: 90,
    stem: t`A solid cone is cut into three pieces by two planes parallel to its base. The planes divide the height of the cone into three equal parts.`,
    diagram: 'm1-cone-slices',
    diagramAlt: 'A cone with its vertex at the top, cut by two horizontal planes into three pieces of equal height.',
    prompt: t`What is the ratio of the volumes of the three pieces, from the top (vertex) downwards?`,
    options: [t`$1 : 2 : 3$`, t`$1 : 3 : 5$`, t`$1 : 4 : 9$`, t`$1 : 7 : 19$`, t`$1 : 8 : 27$`, t`$1 : 8 : 19$`],
    answer: 3,
    hints: [t`The top piece, the top two pieces and the whole cone are similar cones with heights in the ratio $1 : 2 : 3$.`],
    solution: t`The top piece, the top two pieces together, and the whole cone are similar cones with heights in the ratio $1 : 2 : 3$.

Volumes scale with the cube of the length scale factor, so their volumes are in the ratio
$$1 : 8 : 27.$$

The pieces are the differences:
$$1,\quad 8 - 1 = 7,\quad 27 - 8 = 19.$$

So the ratio is $1 : 7 : 19$.`,
    traps: {
      4: t`These are the volumes of the three cones, not of the pieces.`,
      2: t`Uses the area scale factor (squares) instead of the volume scale factor.`,
      1: t`Differences of squares: the right idea applied to areas instead of volumes.`,
    },
    insight: t`For similar solids: lengths $\times k$, areas $\times k^2$, volumes $\times k^3$. Frustums are differences of similar cones.`,
    skills: ['similarity', 'volume scale factor', 'cones'],
  },
  {
    id: 'M1-17',
    module: 'M1',
    n: 17,
    topic: 'M5',
    spec: ['M5.19'],
    title: 'Vectors in a parallelogram',
    difficulty: 3,
    time: 110,
    stem: t`$OABC$ is a parallelogram with $\overrightarrow{OA} = \mathbf{a}$ and $\overrightarrow{OC} = \mathbf{c}$. $M$ is the midpoint of $AB$. The line $OM$ meets the diagonal $AC$ at the point $P$.`,
    diagram: 'm1-vectors',
    diagramAlt: 'Parallelogram OABC with O at bottom left, A at bottom right, B at top right and C at top left. M is the midpoint of AB. The segment OM crosses the diagonal AC at P.',
    prompt: t`Which of the following is $\overrightarrow{OP}$?`,
    options: [
      t`$\tfrac12\mathbf{a} + \tfrac14\mathbf{c}$`,
      t`$\tfrac23\mathbf{a} + \tfrac13\mathbf{c}$`,
      t`$\tfrac12\mathbf{a} + \tfrac12\mathbf{c}$`,
      t`$\tfrac13\mathbf{a} + \tfrac23\mathbf{c}$`,
      t`$\tfrac34\mathbf{a} + \tfrac38\mathbf{c}$`,
      t`$\tfrac23\mathbf{a} + \tfrac16\mathbf{c}$`,
    ],
    answer: 1,
    hints: [
      t`$\overrightarrow{OM} = \mathbf{a} + \tfrac12\mathbf{c}$, so $\overrightarrow{OP} = \lambda\left(\mathbf{a} + \tfrac12\mathbf{c}\right)$ for some $\lambda$.`,
      t`$P$ is also on $AC$, so $\overrightarrow{OP} = \mathbf{a} + \mu(\mathbf{c} - \mathbf{a})$. Compare coefficients.`,
    ],
    solution: t`Since $\overrightarrow{AB} = \overrightarrow{OC} = \mathbf{c}$, we have $\overrightarrow{OM} = \mathbf{a} + \tfrac12\mathbf{c}$.

$P$ lies on $OM$:
$$\overrightarrow{OP} = \lambda\mathbf{a} + \tfrac{\lambda}{2}\mathbf{c}.$$

$P$ also lies on $AC$:
$$\overrightarrow{OP} = \mathbf{a} + \mu(\mathbf{c} - \mathbf{a}) = (1 - \mu)\mathbf{a} + \mu\mathbf{c}.$$

Since $\mathbf{a}$ and $\mathbf{c}$ are not parallel, compare coefficients: $\lambda = 1 - \mu$ and $\tfrac{\lambda}{2} = \mu$. So $\lambda = 1 - \tfrac{\lambda}{2}$, which gives $\lambda = \tfrac23$. Hence
$$\overrightarrow{OP} = \tfrac23\mathbf{a} + \tfrac13\mathbf{c}.$$

($P$ divides $OM$ in the ratio $2 : 1$.)`,
    traps: {
      0: t`Takes $P$ to be the midpoint of $OM$.`,
      2: t`Takes $P$ to be the midpoint of $AC$, which is where the other diagonal $OB$ crosses it.`,
    },
    insight: t`Intersection problems with vectors: write the point two ways (one parameter per line) and compare coefficients of the two non-parallel base vectors.`,
    skills: ['vectors', 'parallelogram', 'intersection of lines'],
  },
  {
    id: 'M1-18',
    module: 'M1',
    n: 18,
    topic: 'M6',
    spec: ['M6.2a'],
    title: 'A histogram with no frequency density scale',
    difficulty: 3,
    time: 110,
    stem: t`The histogram shows the times taken by a group of people to complete a puzzle. The frequency density axis has not been labelled with values.

There are 24 people in the 10–15 minute class.`,
    diagram: 'm1-histogram',
    diagramAlt: 'Histogram with unequal class widths: 0–10 minutes height 2 units, 10–15 height 6, 15–20 height 8, 20–30 height 5, and 30–50 height 1.',
    prompt: t`Estimate the number of people who took longer than 25 minutes.`,
    options: [t`20`, t`36`, t`40`, t`45`, t`56`, t`64`],
    answer: 1,
    hints: [t`In a histogram, frequency is proportional to area. Use the 10–15 bar to find how many people one unit of area represents.`],
    solution: t`Measure areas in grid units (width in minutes $\times$ height in squares).

The 10–15 bar has area $5 \times 6 = 30$ units and represents 24 people, so 1 unit represents $\dfrac{24}{30} = 0.8$ people.

Longer than 25 minutes:
- half of the 20–30 bar (25 to 30 minutes): $5 \times 5 = 25$ units;
- the whole 30–50 bar: $20 \times 1 = 20$ units.

That is $45$ units, representing $45 \times 0.8 = 36$ people.`,
    traps: {
      0: t`Forgets the 30–50 class.`,
      2: t`Uses the whole of the 20–30 class but forgets the 30–50 class.`,
      3: t`Counts area units but never converts them to people.`,
      4: t`Includes the whole of the 20–30 class instead of only 25–30 minutes.`,
    },
    insight: t`In a histogram, frequency is proportional to area. Find the "people per unit of area" from any bar with a known frequency, then read off areas.`,
    skills: ['histograms', 'frequency density'],
  },
  {
    id: 'M1-19',
    module: 'M1',
    n: 19,
    topic: 'M5',
    spec: ['M5.16', 'M5.7', 'M2.11'],
    title: 'A circle inside a quarter-circle',
    difficulty: 3,
    time: 100,
    stem: t`The diagram shows a quarter-circle of radius 2 with centre $O$. A circle is drawn inside it so that it touches both straight edges and the arc.`,
    diagram: 'm1-inscribed-circle',
    diagramAlt: 'A quarter-circle of radius 2 in the first quadrant with centre O at the corner. A smaller circle sits inside, touching both straight edges and the curved arc.',
    prompt: t`What is the radius of the smaller circle?`,
    options: [t`$\sqrt2 - 1$`, t`$2 - \sqrt2$`, t`$\dfrac23$`, t`$\dfrac{\sqrt2}{2}$`, t`$2\sqrt2 - 2$`, t`$4 - 2\sqrt2$`],
    answer: 4,
    hints: [
      t`If the radius is $r$, the centre of the small circle is at $(r, r)$, a distance $r\sqrt2$ from $O$.`,
      t`At the point where it touches the arc, $O$, the small centre and the point of contact are collinear.`,
    ],
    solutionDiagram: 'm1-inscribed-circle-sol',
    solution: t`Let the small circle have radius $r$. It touches both straight edges, so its centre is at $(r, r)$, a distance $r\sqrt2$ from $O$.

It touches the arc on the line from $O$ through its centre, so
$$r\sqrt2 + r = 2 \;\Rightarrow\; r = \frac{2}{\sqrt2 + 1}.$$

Rationalising:
$$r = \frac{2(\sqrt2 - 1)}{(\sqrt2 + 1)(\sqrt2 - 1)} = 2\sqrt2 - 2 \approx 0.83.$$`,
    traps: {
      0: t`This is the radius for a quarter-circle of radius 1: the factor of 2 has been lost.`,
      1: t`An algebra slip in solving $r(\sqrt2 + 1) = 2$.`,
    },
    insight: t`For tangent circles, the centres and the point of contact are collinear: distance between centres = sum (or difference) of radii.`,
    skills: ['circles', 'Pythagoras', 'surds', 'tangency'],
  },
  {
    id: 'M1-20',
    module: 'M1',
    n: 20,
    topic: 'M4',
    spec: ['M4.17'],
    title: 'Lattice points in a region',
    difficulty: 3,
    time: 110,
    stem: t`The region $R$ is defined by the inequalities
$$y \ge 0, \qquad y \le 2x, \qquad x + y \le 6.$$

How many points with integer coordinates lie in $R$, including on its boundary?`,
    options: [t`7`, t`12`, t`13`, t`16`, t`17`, t`19`],
    answer: 5,
    hints: [
      t`Sketch the region: it is a triangle with vertices $(0,0)$, $(2,4)$ and $(6,0)$.`,
      t`For each integer $x$ from 0 to 6, count the allowed integer values of $y$.`,
    ],
    solutionDiagram: 'm1-lattice-sol',
    solution: t`The region is the triangle with vertices $(0, 0)$, $(2, 4)$ and $(6, 0)$. For each integer $x$, $y$ runs from 0 up to the smaller of $2x$ and $6 - x$:

| $x$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| largest $y$ | 0 | 2 | 4 | 3 | 2 | 1 | 0 |
| points | 1 | 3 | 5 | 4 | 3 | 2 | 1 |

Total: $1 + 3 + 5 + 4 + 3 + 2 + 1 = 19$.`,
    traps: {
      0: t`Counts only the points strictly inside the triangle.`,
      1: t`This is the area of the triangle, not a count of points.`,
    },
    insight: t`To count lattice points in a region, sweep one variable through its integer values and count the other.`,
    skills: ['inequalities', 'regions', 'counting'],
  },
  {
    id: 'M1-21',
    module: 'M1',
    n: 21,
    topic: 'M5',
    spec: ['M5.2', 'M2.3'],
    title: 'Regular polygons with whole-number angles',
    difficulty: 3,
    time: 90,
    stem: t`For how many values of $n$ is there a regular polygon with $n$ sides whose interior angles are each a whole number of degrees?`,
    options: [t`16`, t`18`, t`20`, t`21`, t`22`, t`24`],
    answer: 4,
    hints: [t`The interior angle is $180^\circ - \dfrac{360^\circ}{n}$. When is that a whole number?`],
    solution: t`Each interior angle of a regular $n$-gon is $180^\circ - \dfrac{360^\circ}{n}$, which is a whole number exactly when $n$ divides 360.

Since $360 = 2^3 \times 3^2 \times 5$, it has $(3+1)(2+1)(1+1) = 24$ factors.

A polygon needs $n \ge 3$, so exclude $n = 1$ and $n = 2$. That leaves **22** values.`,
    traps: {
      5: t`Includes $n = 1$ and $n = 2$, which are not polygons.`,
    },
    insight: t`For distinct primes $p$, $q$, $r$, the number $p^a q^b r^c$ has $(a+1)(b+1)(c+1)$ factors. It turns up often in ESAT counting questions.`,
    skills: ['polygon angles', 'factors', 'prime factorisation'],
  },
  {
    id: 'M1-22',
    module: 'M1',
    n: 22,
    topic: 'M6',
    spec: ['M6.3'],
    title: 'Mean, median, mode and the smallest range',
    difficulty: 3,
    time: 100,
    stem: t`A list of five positive integers has mean 8, median 9 and a unique mode of 11.

What is the smallest possible range of the list?`,
    options: [t`7`, t`8`, t`9`, t`10`, t`11`, t`12`],
    answer: 0,
    hints: [
      t`In order, the list is $a \le b \le 9 \le d \le e$. Where can the two (or more) 11s go?`,
      t`The mode is unique, so no other value may appear twice.`,
    ],
    solution: t`In order, the list is $a,\ b,\ 9,\ d,\ e$ with a total of $5 \times 8 = 40$.

The mode 11 must appear at least twice, and only the last two positions can be 11, so $d = e = 11$. Then
$$a + b = 40 - 9 - 22 = 9.$$

The mode is unique, so no other value can appear twice: $a < b < 9$. The options for $(a, b)$ are $(1, 8)$, $(2, 7)$, $(3, 6)$ and $(4, 5)$.

The range $11 - a$ is smallest when $a = 4$: the list $4, 5, 9, 11, 11$ has range **7**.`,
    traps: {
      3: t`This is the largest possible range, not the smallest.`,
    },
    insight: t`With conditions on averages, write the list in order with unknowns, fix what the median and mode force, and then use the total.`,
    skills: ['averages', 'mode', 'range', 'reasoning'],
  },
  {
    id: 'M1-23',
    module: 'M1',
    n: 23,
    topic: 'M7',
    spec: ['M7.7b', 'M4.16'],
    title: 'Same colour, probability one half',
    difficulty: 3,
    time: 110,
    stem: t`A bag contains 6 red counters and $n$ blue counters, where $n > 6$. Two counters are taken at random without replacement.

The probability that the two counters are the same colour is $\tfrac12$.

What is the value of $n$?`,
    options: [t`3`, t`10`, t`12`, t`13`, t`15`, t`16`],
    answer: 1,
    hints: [t`$P(\text{same}) = P(RR) + P(BB)$. Set up an equation in $n$ and clear the fractions.`],
    solution: t`There are $n + 6$ counters in total.
$$P(\text{same}) = \frac{6 \times 5 + n(n-1)}{(n+6)(n+5)} = \frac12.$$

Cross-multiplying:
$$2(30 + n^2 - n) = n^2 + 11n + 30 \;\Rightarrow\; n^2 - 13n + 30 = 0,$$
so $(n - 3)(n - 10) = 0$.

Since $n > 6$, $n = 10$. Check: $\dfrac{30 + 90}{16 \times 15} = \dfrac{120}{240} = \dfrac12$ ✓`,
    traps: {
      0: t`This root of the quadratic is ruled out by the condition $n > 6$.`,
      3: t`This is the sum of the two roots, $3 + 10$.`,
    },
    insight: t`"Without replacement" means the second denominator is one less. The equation is quadratic, so check which root the question's conditions allow.`,
    skills: ['probability without replacement', 'quadratic equations'],
  },
  {
    id: 'M1-24',
    module: 'M1',
    n: 24,
    topic: 'M4',
    spec: ['M4.12b', 'M4.12e', 'M4.15'],
    title: 'Exponential against quadratic',
    difficulty: 4,
    time: 90,
    stem: t`How many real solutions does the equation
$$2^x = x^2$$
have?`,
    options: [t`0`, t`1`, t`2`, t`3`, t`4`, t`infinitely many`],
    answer: 3,
    hints: [
      t`Spot the two positive integer solutions first.`,
      t`Now compare $2^x$ and $x^2$ at $x = 0$ and $x = -1$.`,
    ],
    solutionDiagram: 'm1-exp-quad-sol',
    solution: t`**Positive solutions.** $x = 2$ ($4 = 4$) and $x = 4$ ($16 = 16$). Between them $2^x < x^2$ (at $x = 3$, $8 < 9$). For $x > 4$ the exponential grows faster, so there are no more positive solutions. For $0 \le x < 2$, $2^x > x^2$.

**Negative solution.** At $x = 0$, $2^0 = 1 > 0 = x^2$. At $x = -1$, $2^{-1} = \tfrac12 < 1 = x^2$. The graphs must cross between $-1$ and $0$. For $x < -1$, $x^2 > 1 > 2^x$, so they do not cross again.

That makes **three** real solutions (the negative one is $x \approx -0.77$).`,
    traps: {
      2: t`Finds $x = 2$ and $x = 4$ but misses the crossing for negative $x$.`,
    },
    insight: t`For "how many solutions" questions, sketch both sides. An increasing exponential such as $2^x$ and an even power such as $x^2$ always meet for some negative $x$ as well: compare them at $x = 0$ and far to the left.`,
    skills: ['graphs', 'exponential functions', 'number of solutions'],
  },
  {
    id: 'M1-25',
    module: 'M1',
    n: 25,
    topic: 'M5',
    spec: ['M5.18', 'M5.7'],
    title: 'Angle between a face and the base of a pyramid',
    difficulty: 4,
    time: 110,
    stem: t`A pyramid has a square base of side 2 and its apex is directly above the centre of the base. All eight edges of the pyramid have length 2.`,
    diagram: 'm1-pyramid',
    diagramAlt: 'A square-based pyramid VABCD. The base ABCD is a square of side 2 and each slant edge from the apex V is also 2.',
    prompt: t`What is the tangent of the angle between a triangular face and the base?`,
    options: [t`$\dfrac{1}{\sqrt3}$`, t`$1$`, t`$\sqrt2$`, t`$\sqrt3$`, t`$2$`, t`$\sqrt6$`],
    answer: 2,
    hints: [
      t`First find the height using the half-diagonal of the base and a slant edge.`,
      t`The angle between a face and the base is measured in the plane through the apex perpendicular to a base edge, i.e. using the midpoint $N$ of that edge.`,
    ],
    solutionDiagram: 'm1-pyramid-sol',
    solution: t`Let $M$ be the centre of the base and $V$ the apex.

**Height.** The half-diagonal of the base is $\tfrac12\sqrt{2^2 + 2^2} = \sqrt2$. With a slant edge of 2,
$$VM = \sqrt{2^2 - (\sqrt2)^2} = \sqrt2.$$

**Angle.** Let $N$ be the midpoint of a base edge, say $BC$. Then $MN = 1$ and $VN$ is perpendicular to $BC$, so the required angle is $\angle VNM$:
$$\tan\angle VNM = \frac{VM}{MN} = \frac{\sqrt2}{1} = \sqrt2.$$`,
    traps: {
      1: t`This is $\tan$ of the angle between a slant *edge* and the base ($\sqrt2/\sqrt2$).`,
      3: t`This is the slant height $VN$ of a face, not a tangent.`,
      0: t`This is $\cos\angle VNM = 1/\sqrt3$, not the tangent.`,
    },
    insight: t`Angle between two planes: drop to a line perpendicular to their common edge in each plane. For a pyramid face, use the midpoint of the base edge.`,
    skills: ['3D trigonometry', 'Pythagoras in 3D', 'pyramids'],
  },
  {
    id: 'M1-26',
    module: 'M1',
    n: 26,
    topic: 'M4',
    spec: ['M4.4', 'M4.6'],
    title: 'Powers of x + 1/x',
    difficulty: 4,
    time: 110,
    stem: t`Given that $x + \dfrac{1}{x} = 3$, what is the value of
$$x^5 + \frac{1}{x^5}\ ?$$`,
    options: [t`47`, t`110`, t`118`, t`120`, t`123`, t`126`],
    answer: 4,
    hints: [
      t`Find $x^2 + \dfrac{1}{x^2}$ and $x^3 + \dfrac{1}{x^3}$ first.`,
      t`Expand $\left(x^2 + \dfrac{1}{x^2}\right)\left(x^3 + \dfrac{1}{x^3}\right)$.`,
    ],
    solution: t`Write $s_k = x^k + \dfrac{1}{x^k}$, so $s_1 = 3$.

- Squaring: $s_1^2 = x^2 + 2 + \dfrac{1}{x^2}$, so $s_2 = 9 - 2 = 7$.
- Cubing: $s_1^3 = x^3 + 3x + \dfrac{3}{x} + \dfrac{1}{x^3} = s_3 + 3s_1$, so $s_3 = 27 - 9 = 18$.

Now expand
$$s_2 s_3 = x^5 + \frac{1}{x} + x + \frac{1}{x^5} = s_5 + s_1,$$
so $s_5 = 7 \times 18 - 3 = 123$.

**Alternative.** Multiplying $s_k$ by $s_1$ gives $s_{k+1} = 3s_k - s_{k-1}$. From $s_0 = 2$ and $s_1 = 3$ this generates $7, 18, 47, 123$.`,
    traps: {
      5: t`Computes $s_2 s_3 = 126$ but forgets the cross terms $x + \dfrac1x$ that must be subtracted.`,
      0: t`This is $x^4 + \dfrac{1}{x^4}$, one step short.`,
    },
    insight: t`Symmetric expressions in $x$ and $1/x$ build up step by step; each product of two of them gives the sum you want plus a lower one.`,
    skills: ['algebraic identities', 'expanding brackets'],
  },
  {
    id: 'M1-27',
    module: 'M1',
    n: 27,
    topic: 'M7',
    spec: ['M7.7b', 'M7.1'],
    title: 'A positive test result',
    difficulty: 4,
    time: 120,
    stem: t`1% of people in a population have a certain condition. A test for the condition gives a positive result for 90% of people who have the condition, and for 5% of people who do not have it.

A person chosen at random from the population tests positive.

What is the probability that they have the condition?`,
    options: [t`$\dfrac{9}{1000}$`, t`$\dfrac{1}{11}$`, t`$\dfrac{9}{59}$`, t`$\dfrac{2}{13}$`, t`$\dfrac12$`, t`$\dfrac{9}{10}$`],
    answer: 3,
    hints: [
      t`Imagine 2000 people. How many have the condition and test positive? How many do not have it but test positive?`,
    ],
    solution: t`Use expected frequencies for 2000 people.

- Have the condition: $1\%$ of 2000 $= 20$. Of these, $90\%$ test positive: **18**.
- Do not have it: $1980$. Of these, $5\%$ test positive: **99**.

Of the $18 + 99 = 117$ people who test positive, 18 have the condition:
$$P(\text{condition} \mid \text{positive}) = \frac{18}{117} = \frac{2}{13} \approx 0.15.$$`,
    traps: {
      5: t`Confuses $P(\text{positive} \mid \text{condition})$ with $P(\text{condition} \mid \text{positive})$.`,
      0: t`This is $P(\text{condition and positive})$, not the conditional probability.`,
      2: t`Uses $5\%$ of the whole population ($0.05$) instead of $5\%$ of the 99% without the condition ($0.0495$).`,
    },
    insight: t`For "given that" probabilities, a frequency tree is fastest and safest: restrict attention to the people who satisfy the condition.`,
    skills: ['conditional probability', 'tree diagrams', 'expected frequency'],
  },
];
