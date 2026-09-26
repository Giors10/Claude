import type { LearnTopic } from './types';

const t = String.raw;

export const LEARN_M1: LearnTopic[] = [
  {
    code: 'M1',
    module: 'M1',
    title: 'Units',
    summary: 'Convert confidently between units, especially areas, volumes and compound units, without a calculator.',
    specNote: 'Standard and compound units (speed, density, pressure, rates), changing between related units in numerical and algebraic contexts.',
    sections: [
      {
        heading: 'Powers of ten are the whole game',
        body: t`Every unit conversion is multiplication by a power of 10 (or by 60 and 3600 for time). Write each conversion factor as a power of 10 and add the indices, rather than multiplying long numbers.

The ESAT expects you to know the prefixes nano ($10^{-9}$), micro ($10^{-6}$), milli ($10^{-3}$), centi ($10^{-2}$), deci ($10^{-1}$), kilo ($10^{3}$), mega ($10^{6}$) and giga ($10^{9}$).`,
      },
      {
        heading: 'Areas and volumes scale with the square and the cube',
        body: t`Since $1\ \text{m} = 100\ \text{cm}$, squaring and cubing give
$$1\ \text{m}^2 = 10^4\ \text{cm}^2, \qquad 1\ \text{m}^3 = 10^6\ \text{cm}^3 = 1000\ \text{litres}.$$
Also $1\ \text{cm}^3 = 1\ \text{ml}$ and $1\ \text{litre} = 1000\ \text{cm}^3 = 1\ \text{dm}^3$.`,
      },
      {
        heading: 'Compound units',
        body: t`Treat units as algebra: $\text{g cm}^{-3}$ means grams divided by cubic centimetres. To convert, substitute for each unit:
$$1\ \text{g cm}^{-3} = \frac{10^{-3}\ \text{kg}}{10^{-6}\ \text{m}^3} = 1000\ \text{kg m}^{-3}, \qquad 1\ \text{km h}^{-1} = \frac{1000\ \text{m}}{3600\ \text{s}} = \frac{1}{3.6}\ \text{m s}^{-1}.$$`,
      },
      {
        heading: 'Algebraic answers: check the dimensions',
        body: t`When the answer is an expression, check it has the right units before worrying about the numbers. For example, a length made from a mass $m$, a density $\rho$ and a diameter $d$ must look like $\dfrac{m}{\rho d^2}$, because $\dfrac{\text{kg}}{\text{kg m}^{-3}\cdot\text{m}^2} = \text{m}$. The ESAT then typically offers the same expression with different powers of 10, so track them carefully.`,
      },
    ],
    formulas: [
      { name: 'Density', tex: t`\rho = \dfrac{m}{V}` },
      { name: 'Pressure', tex: t`p = \dfrac{F}{A}` },
      { name: 'Speed', tex: t`v = \dfrac{d}{t}` },
      { name: 'Speed conversion', tex: t`36\ \text{km h}^{-1} = 10\ \text{m s}^{-1}` },
      { name: 'Density conversion', tex: t`1\ \text{g cm}^{-3} = 1000\ \text{kg m}^{-3}` },
      { name: 'Volume conversion', tex: t`1\ \text{m}^3 = 10^6\ \text{cm}^3 = 1000\ \text{L}` },
    ],
    traps: [
      t`Converting $\text{m}^2$ to $\text{cm}^2$ by multiplying by 100 instead of $10^4$.`,
      t`Using a diameter as if it were a radius in area formulas.`,
      t`Mixing minutes and hours in rates (e.g. litres per minute over $t$ hours).`,
    ],
    tips: [
      'Convert everything to one system (SI, or g-cm) before calculating.',
      'Keep powers of 10 separate from the other digits and combine them at the end.',
    ],
    example: {
      question: t`Water flows along a pipe of cross-sectional area $2\ \text{cm}^2$ at $0.5\ \text{m s}^{-1}$. How long does it take to fill a 30-litre tank?`,
      solution: t`Flow rate $= \text{area} \times \text{speed} = 2\ \text{cm}^2 \times 50\ \text{cm s}^{-1} = 100\ \text{cm}^3\ \text{s}^{-1}$.

30 litres $= 30\,000\ \text{cm}^3$, so the time is $\dfrac{30\,000}{100} = 300$ s, which is **5 minutes**.`,
    },
  },
  {
    code: 'M2',
    module: 'M1',
    title: 'Number',
    summary: 'Primes and factors, indices, standard form, surds, recurring decimals, bounds and estimation.',
    specNote: 'Includes prime factorisation, HCF/LCM, index laws, standard form, recurring decimals, exact calculation with surds and π, upper and lower bounds, and systematic counting.',
    sections: [
      {
        heading: 'Prime factorisation does most of the work',
        body: t`Write numbers as products of primes. Then:
- the HCF takes the **lower** power of each prime and the LCM the **higher** power;
- $\text{HCF}(a, b) \times \text{LCM}(a, b) = ab$;
- $N = p^a q^b r^c$ has $(a+1)(b+1)(c+1)$ factors;
- $N$ is a perfect square (or cube) when every power is a multiple of 2 (or 3).`,
      },
      {
        heading: 'Indices and standard form',
        body: t`$a^m \times a^n = a^{m+n}$, $\;(a^m)^n = a^{mn}$, $\;a^{-n} = \dfrac{1}{a^n}$, $\;a^{\frac{m}{n}} = \left(\sqrt[n]{a}\right)^m$.

For standard form, multiply or divide the front numbers and the powers of 10 separately, then tidy up so that $1 \le a < 10$. For example, $(6 \times 10^{4}) \times (5 \times 10^{-7}) = 30 \times 10^{-3} = 3 \times 10^{-2}$.`,
      },
      {
        heading: 'Surds',
        body: t`Simplify by taking out square factors: $\sqrt{72} = \sqrt{36 \times 2} = 6\sqrt2$.

Rationalise by multiplying by the conjugate, because $(\sqrt a + \sqrt b)(\sqrt a - \sqrt b) = a - b$:
$$\frac{1}{\sqrt3 + \sqrt2} = \frac{\sqrt3 - \sqrt2}{3 - 2} = \sqrt3 - \sqrt2.$$
A long sum of such fractions usually telescopes.`,
      },
      {
        heading: 'Recurring decimals',
        body: t`Multiply by the power of 10 that shifts one full recurring block, then subtract. For $x = 0.1\dot{3}\dot{6}$: $1000x = 136.3636\ldots$ and $10x = 1.3636\ldots$, so $990x = 135$ and $x = \dfrac{3}{22}$.

Useful facts: $0.\dot{1} = \tfrac19$, $\;0.\dot{0}\dot{1} = \tfrac{1}{99}$, $\;0.\dot{9} = 1$.`,
      },
      {
        heading: 'Upper and lower bounds',
        body: t`A value given to the nearest 0.1 lies in an interval of half-width 0.05. For combinations, choose the bound that pushes the result in the right direction:
- largest $a + b$: both upper bounds;
- largest $a - b$: upper $a$, **lower** $b$;
- largest $\dfrac{a}{b}$: upper $a$, **lower** $b$.`,
      },
    ],
    formulas: [
      { name: 'Index laws', tex: t`a^m a^n = a^{m+n},\quad (a^m)^n = a^{mn},\quad a^{-n} = \tfrac{1}{a^n}` },
      { name: 'Fractional index', tex: t`a^{\frac{m}{n}} = \left(\sqrt[n]{a}\right)^m` },
      { name: 'Difference of two squares', tex: t`(\sqrt a + \sqrt b)(\sqrt a - \sqrt b) = a - b` },
      { name: 'HCF and LCM', tex: t`\text{HCF}(a,b)\times\text{LCM}(a,b) = ab` },
      { name: 'Number of factors', tex: t`p^a q^b r^c \text{ has } (a+1)(b+1)(c+1) \text{ factors}` },
    ],
    traps: [
      t`$\sqrt{a + b} \ne \sqrt a + \sqrt b$, and $(a + b)^2 \ne a^2 + b^2$.`,
      t`Upper bound of a difference or a quotient uses the **lower** bound of the second quantity.`,
      t`$0.2\dot7$ (only the 7 recurs) is not the same as $0.\dot2\dot7$.`,
    ],
    tips: ['When numbers look unfriendly, factorise them into primes before doing anything else.', 'Estimate first: it eliminates options that are wrong by a power of 10.'],
    example: {
      question: t`Simplify $\dfrac{\sqrt{12} + \sqrt{27}}{\sqrt3}$.`,
      solution: t`$\sqrt{12} = 2\sqrt3$ and $\sqrt{27} = 3\sqrt3$, so the numerator is $5\sqrt3$ and the fraction is $\dfrac{5\sqrt3}{\sqrt3} = 5$.`,
    },
  },
  {
    code: 'M3',
    module: 'M1',
    title: 'Ratio and proportion',
    summary: 'Multipliers for percentages, proportion with powers, similarity, growth and decay, mixtures.',
    specNote: 'Ratio, percentage change (including reverse percentages), direct and inverse proportion with integer and fractional powers, similarity scale factors, growth, decay and iteration.',
    sections: [
      {
        heading: 'Think in multipliers',
        body: t`A 20% increase is $\times1.2$; a 15% decrease is $\times0.85$. Successive changes multiply: $+20\%$ then $-25\%$ is $1.2 \times 0.75 = 0.9$, an overall 10% decrease.

To reverse a percentage change, **divide** by the multiplier: if a price after a 20% rise is £60, the original was $60 \div 1.2 = £50$ (not $60 \times 0.8$).`,
      },
      {
        heading: 'Proportion with powers',
        body: t`If $y \propto x^n$, then $\dfrac{y_2}{y_1} = \left(\dfrac{x_2}{x_1}\right)^n$. Inverse proportion is just $n < 0$.

Chain relationships by substitution. If $P \propto r^{-3}$ and $r \propto s^2$, then $P \propto s^{-6}$. When constraints link variables (for example, a fixed volume $V = AL$), use them to reduce everything to one variable first.`,
      },
      {
        heading: 'Similarity',
        body: t`For similar shapes with length scale factor $k$: areas scale by $k^2$ and volumes (and masses, for the same material) by $k^3$. Work from whichever ratio you are given back to $k$, then forward to what you need.`,
      },
      {
        heading: 'Mixtures and concentrations',
        body: t`Track the quantity that does not change. When water evaporates, the mass of salt is constant; when two solutions mix, the masses of solute add. Then use $\text{concentration} = \dfrac{\text{solute}}{\text{total}}$.`,
      },
      {
        heading: 'Growth, decay and iteration',
        body: t`Compound growth at rate $r$ per period gives $A = A_0(1 + r)^n$. For iterations such as $x_{n+1} = 1.5x_n - 3000$, a steady state satisfies $x = 1.5x - 3000$, so $x = 6000$. Checking for fixed points is often faster than iterating.`,
      },
    ],
    formulas: [
      { name: 'Percentage change', tex: t`\text{new} = \text{old} \times \left(1 \pm \tfrac{p}{100}\right)` },
      { name: 'Proportion with a power', tex: t`y \propto x^n \;\Rightarrow\; \frac{y_2}{y_1} = \left(\frac{x_2}{x_1}\right)^n` },
      { name: 'Similar figures', tex: t`\text{length} \times k,\ \text{area} \times k^2,\ \text{volume} \times k^3` },
      { name: 'Compound growth', tex: t`A = A_0 (1 + r)^n` },
    ],
    traps: [
      'Adding percentages that should be multiplied.',
      'Reversing a percentage increase by subtracting the same percentage.',
      'Forgetting that stretching a fixed volume changes the cross-sectional area too.',
    ],
    tips: ['Convert every percentage to a multiplier before you start.', 'For "by what percentage" questions, compute the multiplier first, then subtract 1.'],
    example: {
      question: t`$y$ is inversely proportional to $\sqrt{x}$. When $x$ increases by 44%, by what percentage does $y$ change?`,
      solution: t`$x$ is multiplied by $1.44$, so $y$ is multiplied by $\dfrac{1}{\sqrt{1.44}} = \dfrac{1}{1.2} = \dfrac56$.

So $y$ **decreases by $16\tfrac23\%$**.`,
    },
  },
  {
    code: 'M4',
    module: 'M1',
    title: 'Algebra',
    summary: 'Manipulation, quadratics, simultaneous equations, inequalities, sequences and interpreting graphs.',
    specNote: 'Expanding and factorising, algebraic fractions, rearranging, quadratics (factorising, completing the square, formula), simultaneous equations including linear-quadratic, linear inequalities and regions, linear and quadratic sequences, and recognising and interpreting graphs.',
    sections: [
      {
        heading: 'Manipulation that saves time',
        body: t`Know these expansions instantly: $(a \pm b)^2 = a^2 \pm 2ab + b^2$ and $a^2 - b^2 = (a - b)(a + b)$.

For algebraic fractions, factorise every numerator and denominator first; the common denominator is then obvious and cancellations appear at the end.

To make $x$ the subject when it appears twice, collect all $x$ terms on one side and factorise: $ax + b = cx + d \Rightarrow x(a - c) = d - b$.`,
      },
      {
        heading: 'Quadratics',
        body: t`Completing the square gives the turning point directly:
$$ax^2 + bx + c = a\left(x + \frac{b}{2a}\right)^2 + c - \frac{b^2}{4a}.$$
The roots are $x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}$. They are symmetric about the vertex, so if the roots of $x^2 - 6x + k = 0$ differ by 4 they must be $3 \pm 2$.`,
      },
      {
        heading: 'Simultaneous equations',
        body: t`For one linear and one quadratic equation, rearrange the linear one and substitute. The result is a quadratic whose two roots give the two intersection points (factorise if you can). Always find both coordinates of each point.`,
      },
      {
        heading: 'Inequalities and regions',
        body: t`Solve linear inequalities like equations, but **reverse the sign when multiplying or dividing by a negative**. For regions defined by several inequalities, sketch the boundary lines, find the vertices, and test a point to decide which side to shade. Counting integer points is easiest column by column.`,
      },
      {
        heading: 'Sequences',
        body: t`Arithmetic: $u_n = a + (n-1)d$. Quadratic: the second difference is constant and equals $2a$ in $u_n = an^2 + bn + c$. Subtract $an^2$ from each term and find the remaining linear part.`,
      },
      {
        heading: 'Graphs',
        body: t`Know the shapes of linear, quadratic, cubic, reciprocal $y = \tfrac1x$, exponential $y = k^x$ and $y = \sin x,\ \cos x,\ \tan x$ (in degrees). "How many solutions?" means "how many intersections?": sketch both sides. On speed–time graphs, the gradient is acceleration and the area is distance.`,
      },
    ],
    formulas: [
      { name: 'Quadratic formula', tex: t`x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}` },
      { name: 'Completing the square', tex: t`x^2 + bx + c = \left(x + \tfrac b2\right)^2 + c - \tfrac{b^2}{4}` },
      { name: 'Difference of two squares', tex: t`a^2 - b^2 = (a - b)(a + b)` },
      { name: 'Arithmetic sequence', tex: t`u_n = a + (n - 1)d` },
      { name: 'Quadratic sequence', tex: t`\text{second difference} = 2a \text{ in } an^2 + bn + c` },
      { name: 'Gradient between two points', tex: t`m = \dfrac{y_2 - y_1}{x_2 - x_1}` },
    ],
    traps: [
      t`Sign errors when expanding $-(x - 2)$ or $-2(x - 3)$.`,
      'Dividing both sides by an expression that could be zero or negative.',
      t`Forgetting the second (often negative) solution of a quadratic, or a solution of an equation like $2^x = x^2$ (which has three).`,
    ],
    tips: ['Substitute an option back into the question: often faster than solving.', 'If an expression "simplifies fully", expect a factor to cancel.'],
    example: {
      question: t`Find the turning point of $y = 2x^2 - 12x + 7$.`,
      solution: t`$2x^2 - 12x + 7 = 2(x^2 - 6x) + 7 = 2(x - 3)^2 - 18 + 7 = 2(x - 3)^2 - 11$.

The turning point is a minimum at $(3, -11)$.`,
    },
  },
  {
    code: 'M5',
    module: 'M1',
    title: 'Geometry',
    summary: 'Angles, circle theorems, Pythagoras and right-angled trigonometry in 2D and 3D, mensuration, vectors and transformations.',
    specNote: 'Note: Mathematics 1 does not require the sine or cosine rules. Exact values of sin, cos and tan at 0°, 30°, 45°, 60° and 90° are expected. Formulas for spheres, pyramids and cones are given if needed.',
    sections: [
      {
        heading: 'Angles and polygons',
        body: t`Exterior angles of any polygon sum to $360^\circ$, so a regular $n$-gon has exterior angle $\dfrac{360^\circ}{n}$ and interior angle $180^\circ - \dfrac{360^\circ}{n}$. The interior angles sum to $(n - 2) \times 180^\circ$.`,
      },
      {
        heading: 'Circle theorems',
        body: t`- The angle at the centre is twice the angle at the circumference.
- The angle in a semicircle is $90^\circ$.
- Angles in the same segment are equal.
- Opposite angles of a cyclic quadrilateral sum to $180^\circ$.
- A tangent is perpendicular to the radius at the point of contact.
- Alternate segment theorem: the angle between a tangent and a chord equals the angle in the alternate segment.
- Two tangents from a point are equal in length.

Radii create isosceles triangles: look for them first.`,
      },
      {
        heading: 'Pythagoras and trigonometry in 3D',
        body: t`The space diagonal of an $a \times b \times c$ cuboid is $\sqrt{a^2 + b^2 + c^2}$.

To find the angle between a line and a plane, drop a perpendicular from the line to the plane and use the right-angled triangle formed. For the angle between two planes, use lines in each plane that are perpendicular to their common edge (for a pyramid face, use the midpoint of the base edge).`,
      },
      {
        heading: 'Exact values',
        body: t`| $\theta$ | $0^\circ$ | $30^\circ$ | $45^\circ$ | $60^\circ$ | $90^\circ$ |
|---|---|---|---|---|---|
| $\sin\theta$ | $0$ | $\tfrac12$ | $\tfrac{\sqrt2}{2}$ | $\tfrac{\sqrt3}{2}$ | $1$ |
| $\cos\theta$ | $1$ | $\tfrac{\sqrt3}{2}$ | $\tfrac{\sqrt2}{2}$ | $\tfrac12$ | $0$ |
| $\tan\theta$ | $0$ | $\tfrac{1}{\sqrt3}$ | $1$ | $\sqrt3$ | undefined |`,
      },
      {
        heading: 'Vectors',
        body: t`Express every position using a pair of non-parallel base vectors (such as $\mathbf a$ and $\mathbf c$). The midpoint of $AB$ is $\tfrac12(\mathbf a + \mathbf b)$. For the intersection of two lines, write the point in two ways, one parameter per line, and compare coefficients.`,
      },
      {
        heading: 'Transformations',
        body: t`Track a general point $(x, y)$: reflection in $y = x$ gives $(y, x)$; in $y = -x$, $(-y, -x)$; rotation $90^\circ$ clockwise about $O$ gives $(y, -x)$; anticlockwise gives $(-y, x)$; enlargement with scale factor $k$ about $O$ gives $(kx, ky)$. A negative scale factor puts the image on the opposite side of the centre.`,
      },
    ],
    formulas: [
      { name: 'Arc length (degrees)', tex: t`\dfrac{\theta}{360} \times 2\pi r` },
      { name: 'Sector area (degrees)', tex: t`\dfrac{\theta}{360} \times \pi r^2` },
      { name: 'Cylinder', tex: t`V = \pi r^2 h, \quad \text{curved area } 2\pi r h` },
      { name: 'Cone and pyramid (given if needed)', tex: t`V = \tfrac13 \times \text{base area} \times h` },
      { name: 'Sphere (given if needed)', tex: t`V = \tfrac43\pi r^3, \quad A = 4\pi r^2` },
      { name: t`Equilateral triangle, side $a$`, tex: t`\text{area} = \tfrac{\sqrt3}{4}a^2` },
    ],
    traps: [
      'Using a slant edge instead of a slant height (or vice versa) in a pyramid.',
      'Assuming a diagram is to scale: ESAT diagrams are often not.',
      'Confusing the angle a line makes with a plane and the angle two planes make.',
    ],
    tips: ['Mark every angle you can find on the diagram as you go.', 'For "which single transformation", apply the maps to (1, 0) and (0, 1).'],
    example: {
      question: 'What is the area of a regular hexagon with side 2?',
      solution: t`A regular hexagon is six equilateral triangles of side 2, each with area $\tfrac{\sqrt3}{4} \times 4 = \sqrt3$. The area is $6\sqrt3$.`,
    },
  },
  {
    code: 'M6',
    module: 'M1',
    title: 'Statistics',
    summary: 'Averages, grouped data, histograms with unequal widths, cumulative frequency and quartiles.',
    specNote: 'Tables and charts, histograms (frequency density), cumulative frequency graphs, mean/median/mode/range, estimates from grouped data, quartiles and IQR, scatter graphs and correlation.',
    sections: [
      {
        heading: 'Averages and totals',
        body: t`Most mean problems are really about totals: $\text{total} = \text{mean} \times n$. Adding or removing items changes the total and the count. For combined groups, $\bar{x} = \dfrac{n_1\bar{x}_1 + n_2\bar{x}_2}{n_1 + n_2}$.

With conditions on the mean, median and mode, write the ordered list with unknowns and use each condition in turn.`,
      },
      {
        heading: 'Histograms',
        body: t`$\text{frequency density} = \dfrac{\text{frequency}}{\text{class width}}$, so frequency is proportional to **area**. If the axis has no scale, use one bar with a known frequency to find how many people one unit of area represents. For part of a class, assume values are spread evenly across it.`,
      },
      {
        heading: 'Cumulative frequency',
        body: t`Plot at the **upper** class boundary. For $n$ values read the median at $\tfrac n2$ and the quartiles at $\tfrac n4$ and $\tfrac{3n}4$; $\text{IQR} = Q_3 - Q_1$. "More than $x$" means $n$ minus the cumulative frequency at $x$.`,
      },
      {
        heading: 'Comparing and correlation',
        body: 'Compare distributions using an average (usually the median) and a spread (usually the IQR), in context. Correlation does not imply causation; extrapolating beyond the data is unreliable.',
      },
    ],
    formulas: [
      { name: 'Frequency density', tex: t`\text{f.d.} = \dfrac{\text{frequency}}{\text{class width}}` },
      { name: 'Combined mean', tex: t`\bar x = \dfrac{n_1\bar x_1 + n_2\bar x_2}{n_1 + n_2}` },
      { name: 'Estimated mean (grouped)', tex: t`\bar x \approx \dfrac{\sum f x_{\text{mid}}}{\sum f}` },
      { name: 'Interquartile range', tex: t`\text{IQR} = Q_3 - Q_1` },
    ],
    traps: ['Reading bar heights as frequencies when class widths differ.', t`Using $\tfrac{n+1}{2}$ on a cumulative frequency graph (use $\tfrac n2$).`],
    tips: ['Write down the total before anything else in averages questions.'],
    example: {
      question: 'The mean of 10 numbers is 12. One number, 30, is removed. What is the mean of the rest?',
      solution: t`The total is $120$. Removing 30 leaves $90$ across 9 numbers, so the new mean is $10$.`,
    },
  },
  {
    code: 'M7',
    module: 'M1',
    title: 'Probability',
    summary: 'Combined events, tree diagrams with and without replacement, Venn diagrams and conditional probability.',
    specNote: 'Sample spaces, expected frequencies, mutually exclusive and independent events, tree and Venn diagrams, and conditional probability.',
    sections: [
      {
        heading: 'Adding and multiplying',
        body: t`**And** means multiply along branches; **or** means add the results of different routes. For events that are not mutually exclusive, $P(A \cup B) = P(A) + P(B) - P(A \cap B)$. "At least one" is usually $1 - P(\text{none})$.`,
      },
      {
        heading: 'Without replacement',
        body: t`The second draw has one fewer item in total, and one fewer of the colour already drawn. With $r$ red and $b$ blue:
$$P(\text{two the same}) = \frac{r(r-1) + b(b-1)}{(r+b)(r+b-1)}.$$`,
      },
      {
        heading: 'Conditional probability',
        body: t`$P(A \mid B) = \dfrac{P(A \cap B)}{P(B)}$: restrict attention to the cases where $B$ happened. The safest method is **expected frequencies**: imagine 1000 (or 2000) people, fill in a frequency tree or two-way table, and read off the fraction. This avoids confusing $P(A \mid B)$ with $P(B \mid A)$, the classic medical-test trap.`,
      },
    ],
    formulas: [
      { name: 'Complement', tex: t`P(\text{not } A) = 1 - P(A)` },
      { name: 'Addition rule', tex: t`P(A \cup B) = P(A) + P(B) - P(A \cap B)` },
      { name: 'Independent events', tex: t`P(A \cap B) = P(A)P(B)` },
      { name: 'Conditional probability', tex: t`P(A \mid B) = \dfrac{P(A \cap B)}{P(B)}` },
    ],
    traps: ['Forgetting that "one of each" can happen in two orders.', 'Treating dependent draws as independent.'],
    tips: ['Draw the tree even when it feels slow: it prevents most errors.'],
    example: {
      question: 'Two cards are drawn without replacement from 5 red and 3 blue cards. What is the probability they are different colours?',
      solution: t`$P(RB) + P(BR) = \dfrac58\cdot\dfrac37 + \dfrac38\cdot\dfrac57 = \dfrac{30}{56} = \dfrac{15}{28}$.`,
    },
  },
];
