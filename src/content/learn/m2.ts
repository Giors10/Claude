import type { LearnTopic } from './types';

const t = String.raw;

export const LEARN_M2: LearnTopic[] = [
  {
    code: 'MM1',
    module: 'M2',
    title: 'Algebra and functions',
    summary: 'Indices and surds, the discriminant, quadratic inequalities, polynomial division, factor and remainder theorems.',
    specNote: t`Rational indices, surds, quadratics and the discriminant, simultaneous equations, linear and quadratic inequalities, polynomial division, the factor and remainder theorems, and functions including $|x|$ and $\sqrt{x}$.`,
    sections: [
      {
        heading: 'Hidden quadratics',
        body: t`If one power is twice another, substitute for the smaller one: $x^{\frac23} - 5x^{\frac13} + 6 = 0$ becomes $u^2 - 5u + 6 = 0$ with $u = x^{\frac13}$. Always convert back to $x$ and check which solutions are allowed.`,
      },
      {
        heading: 'The discriminant',
        body: t`For $ax^2 + bx + c = 0$ with $a \ne 0$: $b^2 - 4ac > 0$ gives two distinct real roots, $= 0$ one repeated root, and $< 0$ no real roots. When $a$ contains a parameter, **check separately the value that makes $a = 0$**: the equation is then linear.

$ax^2 + bx + c > 0$ for all $x$ exactly when $a > 0$ and $b^2 - 4ac < 0$.`,
      },
      {
        heading: 'Inequalities',
        body: t`For quadratic inequalities, find the roots and sketch: $(x - 2)(x - 5) < 0$ gives $2 < x < 5$, the part where the parabola is below the axis.

Never multiply by an expression whose sign you do not know. For $\dfrac{x}{x - 2} > 3$, multiply both sides by $(x - 2)^2$, which is positive, or move everything to one side and study the signs.`,
      },
      {
        heading: 'Factor and remainder theorems',
        body: t`The remainder when $p(x)$ is divided by $(x - a)$ is $p(a)$; if $p(a) = 0$ then $(x - a)$ is a factor. Dividing by $(ax - b)$ leaves remainder $p\!\left(\tfrac ba\right)$.

Dividing by a quadratic leaves a **linear** remainder $rx + s$. Find $r$ and $s$ by substituting the roots of the quadratic divisor.`,
      },
      {
        heading: 'Functions',
        body: t`$\sqrt{x}$ always means the non-negative root. $|x|$ reflects the negative part of a graph upwards. Solutions of $f(x) = k$ are the intersections of $y = f(x)$ with the horizontal line $y = k$.`,
      },
    ],
    formulas: [
      { name: 'Discriminant', tex: t`\Delta = b^2 - 4ac` },
      { name: 'Remainder theorem', tex: t`p(x) \div (x - a) \text{ leaves remainder } p(a)` },
      { name: 'Rationalising', tex: t`\dfrac{1}{a + \sqrt b} = \dfrac{a - \sqrt b}{a^2 - b}` },
      { name: 'Rational index', tex: t`x^{\frac{p}{q}} = \sqrt[q]{x^p}` },
    ],
    traps: [
      'Forgetting the case where the leading coefficient is zero.',
      'Multiplying an inequality by an expression of unknown sign.',
      t`Including $k = 0$ or the tangent case when "distinct" roots are required.`,
    ],
    tips: ['Sketch every quadratic inequality: it takes seconds and prevents sign mistakes.'],
    example: {
      question: t`For which values of $k$ does $x^2 + kx + 9 = 0$ have no real roots?`,
      solution: t`No real roots means a negative discriminant: $k^2 - 4 \times 1 \times 9 < 0$, so $k^2 < 36$, giving $-6 < k < 6$. Taking square roots of an inequality gives **two** bounds: $k = -7$ satisfies $k < 6$ but gives $49 - 36 > 0$, so two real roots.`,
    },
  },
  {
    code: 'MM2',
    module: 'M2',
    title: 'Sequences and series',
    summary: 'Recurrences, arithmetic and geometric series (including sums to infinity) and the binomial expansion.',
    specNote: t`Sequences from formulas and recurrence relations $x_{n+1} = f(x_n)$, arithmetic series, finite and infinite geometric series, binomial expansion for positive integer powers, $n!$ and $\binom{n}{r}$.`,
    sections: [
      {
        heading: 'Recurrences',
        body: t`Generate the first few terms: many ESAT recurrences are **periodic**. If the period is $p$, write $n = pk + r$ and add up $k$ complete cycles plus a partial one. A limit $L$ of $x_{n+1} = f(x_n)$ satisfies $L = f(L)$.`,
      },
      {
        heading: 'Arithmetic series',
        body: t`$u_n = a + (n - 1)d$ and $S_n = \dfrac n2\big(2a + (n - 1)d\big) = \dfrac n2(a + \ell)$. In particular $1 + 2 + \cdots + n = \dfrac{n(n + 1)}{2}$.

For any sequence, $u_n = S_n - S_{n-1}$. If $S_n = An^2 + Bn$, the sequence is arithmetic with common difference $2A$.`,
      },
      {
        heading: 'Geometric series',
        body: t`$u_n = ar^{n-1}$ and $S_n = \dfrac{a(1 - r^n)}{1 - r}$. When $|r| < 1$, $S_\infty = \dfrac{a}{1 - r}$.

Squaring every term of a geometric series gives another geometric series with first term $a^2$ and ratio $r^2$.`,
      },
      {
        heading: 'Binomial expansion',
        body: t`$(a + b)^n = \displaystyle\sum_{r=0}^{n}\binom nr a^{n-r}b^r$, where $\dbinom nr = \dfrac{n!}{r!(n - r)!}$.

To find one term, write the general term, collect the power of $x$, and choose $r$. Keep the sign attached to $b$: $(2x - 3)^5$ has $b = -3$.`,
      },
    ],
    formulas: [
      { name: 'Arithmetic sum', tex: t`S_n = \tfrac n2\big(2a + (n-1)d\big)` },
      { name: 'Geometric sum', tex: t`S_n = \dfrac{a(1 - r^n)}{1 - r}` },
      { name: 'Sum to infinity', tex: t`S_\infty = \dfrac{a}{1 - r},\ |r| < 1` },
      { name: 'Binomial coefficient', tex: t`\binom nr = \dfrac{n!}{r!\,(n-r)!}` },
      { name: t`Sum of the first $n$ integers`, tex: t`\sum_{k=1}^{n} k = \dfrac{n(n+1)}{2}` },
    ],
    traps: [t`Off-by-one errors: the $n$th term uses $n - 1$ steps.`, 'Using a sum to infinity when |r| ≥ 1.', t`Losing the minus sign in $\left(x - \frac1x\right)^n$ expansions.`],
    tips: ['For binomial questions, write the general term first; do not expand everything.'],
    example: {
      question: t`Find the coefficient of $x^3$ in $(1 - 2x)^6$.`,
      solution: t`The term is $\dbinom63(-2x)^3 = 20 \times (-8)x^3$, so the coefficient is $-160$.`,
    },
  },
  {
    code: 'MM3',
    module: 'M2',
    title: 'Coordinate geometry',
    summary: 'Straight lines, circles, tangents and chords, and intersections through the discriminant.',
    specNote: 'Equations of lines in several forms, parallel and perpendicular lines, circles in both standard and expanded form, and circle properties (perpendicular bisectors of chords, tangents, angles in semicircles and so on).',
    sections: [
      {
        heading: 'Lines',
        body: t`$y - y_1 = m(x - x_1)$ is the quickest form. Perpendicular gradients multiply to $-1$. The midpoint of $(x_1, y_1)$ and $(x_2, y_2)$ is $\left(\tfrac{x_1 + x_2}{2}, \tfrac{y_1 + y_2}{2}\right)$, and the distance between them is $\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$.`,
      },
      {
        heading: 'Circles',
        body: t`$(x - a)^2 + (y - b)^2 = r^2$ has centre $(a, b)$ and radius $r$. Complete the square to convert $x^2 + y^2 + cx + dy + e = 0$: the centre is $\left(-\tfrac c2, -\tfrac d2\right)$.

The length of the tangent from an external point $P$ is $\sqrt{CP^2 - r^2}$, where $C$ is the centre.`,
      },
      {
        heading: 'Using circle properties',
        body: t`- The perpendicular bisector of any chord passes through the centre.
- The tangent at a point is perpendicular to the radius there.
- A right angle subtended by a segment $AB$ means the point lies on the circle with diameter $AB$.

For intersections of a line and a circle, substitute and use the discriminant: two points, one (tangent) or none.`,
      },
    ],
    formulas: [
      { name: 'Line through a point', tex: t`y - y_1 = m(x - x_1)` },
      { name: 'Perpendicular gradients', tex: t`m_1 m_2 = -1` },
      { name: 'Circle', tex: t`(x - a)^2 + (y - b)^2 = r^2` },
      { name: 'Tangent length from P', tex: t`\sqrt{CP^2 - r^2}` },
    ],
    traps: [t`Getting the sign of the centre wrong: $(x + 3)^2$ means $a = -3$.`, 'Forgetting that a tangent condition is a discriminant of exactly zero.'],
    tips: ['Draw a rough sketch; geometry often gives the answer faster than algebra.'],
    example: {
      question: t`Find the centre and radius of $x^2 + y^2 - 4x + 6y - 12 = 0$.`,
      solution: t`$(x - 2)^2 - 4 + (y + 3)^2 - 9 - 12 = 0$, so $(x - 2)^2 + (y + 3)^2 = 25$: centre $(2, -3)$, radius $5$.`,
    },
  },
  {
    code: 'MM4',
    module: 'M2',
    title: 'Trigonometry',
    summary: 'Sine and cosine rules (with the ambiguous case), radians, graphs, identities and equations in an interval.',
    specNote: t`Sine and cosine rules and $\tfrac12 ab\sin C$, the ambiguous case, radians (arcs, sectors, segments), exact values, graphs with symmetries and periods, $\tan\theta = \dfrac{\sin\theta}{\cos\theta}$ and $\sin^2\theta + \cos^2\theta = 1$, and solving equations in a given interval.`,
    sections: [
      {
        heading: 'Non-right-angled triangles',
        body: t`$\dfrac{a}{\sin A} = \dfrac{b}{\sin B} = \dfrac{c}{\sin C}$, $\quad a^2 = b^2 + c^2 - 2bc\cos A$, $\quad \text{area} = \tfrac12 ab\sin C$.

**Ambiguous case.** Given two sides and a non-included angle, there may be two triangles. Putting the unknown side into the cosine rule gives a quadratic, and its two positive roots are the two triangles.`,
      },
      {
        heading: 'Radians',
        body: t`$\pi$ radians $= 180^\circ$. With $\theta$ in radians: arc length $s = r\theta$, sector area $\tfrac12 r^2\theta$, segment area $\tfrac12 r^2(\theta - \sin\theta)$. A sector angle must lie between $0$ and $2\pi$, so reject solutions outside that range.`,
      },
      {
        heading: 'Graphs and symmetries',
        body: t`$\sin$ and $\cos$ have period $2\pi$; $\tan$ has period $\pi$. Useful symmetries: $\sin(\pi - x) = \sin x$, $\;\cos(-x) = \cos x$, $\;\cos(2\pi - x) = \cos x$.`,
      },
      {
        heading: 'Solving equations',
        body: t`Use $\sin^2 x + \cos^2 x = 1$ to get a single function, then factorise. Find the principal value and use symmetry and the period to list every solution in the interval. Check the endpoints when the interval is closed.

Do not divide by $\cos x$ or $\sin x$: you may lose solutions. Factorise instead.`,
      },
    ],
    formulas: [
      { name: 'Sine rule', tex: t`\dfrac{a}{\sin A} = \dfrac{b}{\sin B}` },
      { name: 'Cosine rule', tex: t`a^2 = b^2 + c^2 - 2bc\cos A` },
      { name: 'Triangle area', tex: t`\tfrac12 ab\sin C` },
      { name: 'Arc and sector', tex: t`s = r\theta, \quad A = \tfrac12 r^2\theta` },
      { name: 'Identities', tex: t`\tan\theta = \dfrac{\sin\theta}{\cos\theta}, \quad \sin^2\theta + \cos^2\theta = 1` },
    ],
    traps: ['Missing the second triangle in the ambiguous case.', 'Mixing degrees and radians.', 'Losing solutions by dividing through by a trig function.'],
    tips: ['Sketch the graph over the whole interval and count crossings before solving.'],
    example: {
      question: t`Solve $2\cos^2 x = 1 + \sin x$ for $0 \le x < 2\pi$.`,
      solution: t`$2(1 - \sin^2 x) = 1 + \sin x$ gives $2\sin^2 x + \sin x - 1 = 0$, so $(2\sin x - 1)(\sin x + 1) = 0$.

The solutions are $x = \dfrac\pi6,\ \dfrac{5\pi}{6},\ \dfrac{3\pi}{2}$.`,
    },
  },
  {
    code: 'MM5',
    module: 'M2',
    title: 'Exponentials and logarithms',
    summary: t`Graphs of $a^x$, the laws of logarithms, and equations reducible to $a^x = b$.`,
    specNote: t`$y = a^x$ and its graph, the laws of logs, solving $a^x = b$ including equations that need rearranging first (such as quadratics in $a^x$). Change of base is not required.`,
    sections: [
      {
        heading: 'Graphs',
        body: t`$y = a^x$ (with $a > 0$) passes through $(0, 1)$ and has asymptote $y = 0$. It increases for $a > 1$ and decreases for $0 < a < 1$. Its reflection in $y = x$ is $y = \log_a x$, which passes through $(1, 0)$ and has asymptote $x = 0$.`,
      },
      {
        heading: 'Laws of logarithms',
        body: t`$a^b = c \iff b = \log_a c$. Then $\log_a xy = \log_a x + \log_a y$, $\;\log_a \tfrac xy = \log_a x - \log_a y$, $\;k\log_a x = \log_a x^k$, $\;\log_a 1 = 0$ and $\log_a a = 1$.

$\log_a(x + y)$ does **not** simplify.`,
      },
      {
        heading: 'Solving equations',
        body: t`$a^{2x}$, $a^{x+1}$ and $a^{2x+1}$ are quadratics in disguise: let $y = a^x$ and remember $y > 0$. For log equations, combine the logs into one, remove the log, and check that every log in the original equation is defined for your answer.`,
      },
    ],
    formulas: [
      { name: 'Definition', tex: t`a^b = c \iff b = \log_a c` },
      { name: 'Product and quotient', tex: t`\log_a xy = \log_a x + \log_a y` },
      { name: 'Power', tex: t`\log_a x^k = k\log_a x` },
      { name: 'Special values', tex: t`\log_a 1 = 0,\quad \log_a a = 1,\quad \log_a\tfrac1x = -\log_a x` },
    ],
    traps: [t`Forgetting that $a^x > 0$, so a negative value of $a^x$ gives no solution.`, 'Accepting solutions that make a logarithm undefined.'],
    tips: ['Write every number as a power of the same base where possible (8 = 2³, 0.25 = 2⁻²).'],
    example: {
      question: t`Solve $\log_2 x + \log_2(x - 2) = 3$.`,
      solution: t`$\log_2 x(x - 2) = 3$, so $x^2 - 2x - 8 = 0$ and $x = 4$ or $x = -2$. Only $x = 4$ makes both logs defined.`,
    },
  },
  {
    code: 'MM6',
    module: 'M2',
    title: 'Differentiation',
    summary: 'Differentiating powers of x, tangents and normals, stationary points and optimisation.',
    specNote: t`Derivative as gradient and rate of change, second derivatives, differentiating $x^n$ for rational $n$ (after simplifying), tangents, normals, maxima and minima, increasing and decreasing functions. First principles and points of inflexion are not examined.`,
    sections: [
      {
        heading: 'The only rule you need',
        body: t`$\dfrac{\mathrm{d}}{\mathrm{d}x}x^n = nx^{n-1}$ for any rational $n$. Rewrite roots and fractions as powers and **expand or divide out first**: the ESAT specification has no product, quotient or chain rule.
$$\frac{(3x - 2)^2}{\sqrt x} = 9x^{\frac32} - 12x^{\frac12} + 4x^{-\frac12}.$$`,
      },
      {
        heading: 'Tangents and normals',
        body: t`At $x = a$, the tangent has gradient $m = f'(a)$ and the normal has gradient $-\dfrac1m$. Use $y - f(a) = m(x - a)$. A tangent to a cubic meets it at a **repeated** root, so $(x - a)^2$ is a factor of $f(x) - (\text{tangent})$.`,
      },
      {
        heading: 'Stationary points and optimisation',
        body: t`Solve $f'(x) = 0$. If $f''(x) > 0$ it is a minimum; if $f''(x) < 0$ it is a maximum (or check the sign of $f'$ either side). For optimisation, use the constraint to write the quantity in one variable, then differentiate.

$f$ is increasing where $f'(x) > 0$ and decreasing where $f'(x) < 0$.`,
      },
    ],
    formulas: [
      { name: 'Power rule', tex: t`\dfrac{\mathrm{d}}{\mathrm{d}x}x^n = nx^{n-1}` },
      { name: t`Tangent at $x = a$`, tex: t`y - f(a) = f'(a)(x - a)` },
      { name: 'Normal gradient', tex: t`m_{\text{normal}} = -\dfrac{1}{f'(a)}` },
      { name: 'Nature of stationary point', tex: t`f''(x) > 0 \Rightarrow \min, \quad f''(x) < 0 \Rightarrow \max` },
    ],
    traps: ['Differentiating a product term by term without expanding first.', 'Using the tangent gradient for the normal.'],
    tips: ['For a cubic, the two stationary x-values average to the x-coordinate of the point of symmetry.'],
    example: {
      question: t`Find the stationary points of $y = x^3 - 6x^2 + 9x + 1$.`,
      solution: t`$y' = 3x^2 - 12x + 9 = 3(x - 1)(x - 3)$. At $x = 1$, $y = 5$ and $y'' = -6$: a maximum. At $x = 3$, $y = 1$ and $y'' = 6$: a minimum.`,
    },
  },
  {
    code: 'MM7',
    module: 'M2',
    title: 'Integration',
    summary: 'Integrating powers of x, definite integrals versus areas, the fundamental theorem and the trapezium rule.',
    specNote: t`Definite and indefinite integrals of $x^n$ ($n \neq -1$), the difference between an integral and an area, the fundamental theorem of calculus, combining integrals, the trapezium rule (over- and underestimates), and $\frac{dy}{dx} = f(x)$.`,
    sections: [
      {
        heading: 'Integrating',
        body: t`$\displaystyle\int x^n\,\mathrm{d}x = \frac{x^{n+1}}{n + 1} + c$ for $n \ne -1$. Simplify first, exactly as with differentiation. Use a given point to find $c$.`,
      },
      {
        heading: 'Integral versus area',
        body: t`A definite integral counts area below the axis as **negative**. For the total area, split the interval at the roots and add the absolute values. The area between two curves is $\displaystyle\int_a^b(\text{top} - \text{bottom})\,\mathrm{d}x$.`,
      },
      {
        heading: 'The fundamental theorem',
        body: t`$\displaystyle\int_a^b f(x)\,\mathrm{d}x = F(b) - F(a)$ where $F' = f$, and $\dfrac{\mathrm{d}}{\mathrm{d}x}\displaystyle\int_a^x f(t)\,\mathrm{d}t = f(x)$. Integrals over adjacent ranges combine: $\int_2^4 + \int_4^5 = \int_2^5$, and $\int_b^a = -\int_a^b$.`,
      },
      {
        heading: 'Trapezium rule',
        body: t`With strip width $h$: $\;\displaystyle\int_a^b y\,\mathrm{d}x \approx \frac h2\big[y_0 + 2(y_1 + \cdots + y_{n-1}) + y_n\big]$.

It **overestimates** where the curve bends upwards (convex, like $x^2$) and **underestimates** where it bends downwards (concave, like $\sqrt x$).`,
      },
    ],
    formulas: [
      { name: 'Power rule', tex: t`\int x^n\,\mathrm{d}x = \dfrac{x^{n+1}}{n+1} + c` },
      { name: 'Definite integral', tex: t`\int_a^b f(x)\,\mathrm{d}x = F(b) - F(a)` },
      { name: 'FTC', tex: t`\dfrac{\mathrm{d}}{\mathrm{d}x}\int_a^x f(t)\,\mathrm{d}t = f(x)` },
      { name: 'Trapezium rule', tex: t`\tfrac h2\left[y_0 + 2(y_1 + \dots + y_{n-1}) + y_n\right]` },
    ],
    traps: ['Taking a signed integral as an area.', 'Forgetting the constant of integration.', t`Using the number of ordinates instead of the number of strips to find $h$.`],
    tips: ['Sketch the curve first to see which parts are below the axis.'],
    example: {
      question: t`Find the area enclosed by $y = x^2$ and $y = 2x$.`,
      solution: t`They meet at $x = 0$ and $x = 2$, with $2x$ on top: $\displaystyle\int_0^2(2x - x^2)\,\mathrm{d}x = 4 - \tfrac83 = \tfrac43$.`,
    },
  },
  {
    code: 'MM8',
    module: 'M2',
    title: 'Graphs of functions',
    summary: 'Recognising standard graphs, transformations, and using algebra and calculus to count roots and intersections.',
    specNote: t`Graphs of lines, quadratics, cubics, trig, log, exponential, square root and modulus functions; transformations $af(x)$, $f(x) + a$, $f(x + a)$, $f(ax)$ and their compositions; $f(g(x))$ notation; stationary points; number of real roots; intersections.`,
    sections: [
      {
        heading: 'Transformations',
        body: t`- $y = f(x) + a$: up by $a$.
- $y = f(x + a)$: **left** by $a$.
- $y = af(x)$: vertical stretch by factor $a$; if $a < 0$, reflect in the $x$-axis (maxima become minima).
- $y = f(ax)$: horizontal stretch by factor $\tfrac1a$; if $a < 0$, reflect in the $y$-axis.

For a combination, track a key point step by step.`,
      },
      {
        heading: 'Counting roots',
        body: t`A cubic has three distinct real roots exactly when its local maximum is above the axis and its local minimum is below. A stationary value of exactly zero means a repeated root, where the graph touches the axis. A polynomial of degree $n$ has at most $n$ real roots.`,
      },
      {
        heading: 'Recognising graphs',
        body: t`Check in this order: domain and asymptotes, direction (increasing or decreasing), intercepts, then end behaviour. For example, $\log_2(4 - x)$ exists only for $x < 4$, decreases towards the asymptote $x = 4$, and passes through $(0, 2)$ and $(3, 0)$.`,
      },
    ],
    formulas: [
      { name: 'Translation', tex: t`f(x + a):\ \text{left } a; \quad f(x) + a:\ \text{up } a` },
      { name: 'Stretches', tex: t`af(x):\ \text{vertical} \times a; \quad f(ax):\ \text{horizontal} \times \tfrac1a` },
      { name: 'Vertex form', tex: t`y = a(x + b)^2 + c \text{ has vertex } (-b, c)` },
    ],
    traps: [t`Moving $f(x + a)$ right instead of left.`, 'Forgetting that a negative stretch turns maxima into minima.'],
    tips: ['When choosing between graphs, eliminate using one feature at a time.'],
    example: {
      question: t`How many real roots does $x^3 - 3x + 1 = 0$ have?`,
      solution: t`$f'(x) = 3x^2 - 3 = 0$ at $x = \pm1$. $f(-1) = 3 > 0$ and $f(1) = -1 < 0$, so the graph crosses the axis **three** times.`,
    },
  },
];
