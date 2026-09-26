"""Checks for Mock 1 (Crucible): ids M1-01 … M2-27."""
# ruff: noqa: F403, F405
from .common import *

# ---------------------------------------------------------------------------
# MATHEMATICS 1
# ---------------------------------------------------------------------------

@check("M1-01")
def _():
    m, rho, d = sp.symbols("m rho d", positive=True)
    V = 1000 * m / rho                  # cm^3 (m kg = 1000m g)
    A = sp.pi * (d / 20) ** 2           # cm^2 (radius d/2 mm = d/20 cm)
    L_m = V / A / 100
    coeff = sp.simplify(L_m * sp.pi * rho * d ** 2 / m)
    # second: SI units with numbers (copper-like wire)
    mm, rr, dd = 0.00704, 8.96, 1.0
    L_si = (mm / (rr * 1000)) / (math.pi * (dd / 1000 / 2) ** 2)
    second = L_si * math.pi * rr * dd ** 2 / mm
    return dict(value=coeff, second=second, options=[4, 400, 1000, 4000, 40000, 400000])


@check("M1-02")
def _():
    x = F(2, 10) + F(7, 90)
    y = F(27, 99)
    second = Decimal("0.2" + "7" * 70) - Decimal("0." + "27" * 35)
    return dict(value=x - y, second=second, options=[F(1, 990), F(1, 198), F(1, 180), F(7, 900), F(1, 99), F(3, 110)])


@check("M1-03")
def _():
    x = sp.symbols("x")
    expr = 3 / (x - 2) - 2 / (x + 1) - 9 / (x ** 2 - x - 2)
    value = sp.simplify(expr)
    pts = [sp.Rational(7, 3), sp.Rational(-5, 2), sp.Integer(11), sp.Rational(1, 7)]
    second = all(expr.subs(x, p) == 1 / (p + 1) for p in pts)
    opts = [(x - 2) / (x + 1), 1 / (x - 2), -1 / (x + 1), (x - 10) / ((x - 2) * (x + 1)), (x + 7) / ((x - 2) * (x + 1)), 1 / (x + 1)]
    return dict(value=value, second=second, options=opts)


@check("M1-04")
def _():
    a, b, c, x = sp.symbols("a b c x", positive=True)
    sols = sp.solve(sp.Eq(a ** 2 * (x ** 2 - 1), b * x ** 2 + c), x)
    value = [s for s in sols if s.subs({a: 3, b: 2, c: 5}) > 1][0]
    opts = [
        sp.sqrt((a**2 + c) / (a**2 - b)), sp.sqrt((a**2 - c) / (a**2 - b)), (a**2 + c) / (a**2 - b),
        sp.sqrt((a**2 + c) / (a**2 + b)), sp.sqrt((a**2 + c) / (b - a**2)), sp.sqrt((c - a**2) / (a**2 - b)),
    ]
    # second: plug numbers into the ORIGINAL formula
    ok = []
    for av, bv, cv in [(3, 2, 5), (2, 1, 7), (5, 3, 1)]:
        xv = float(opts[0].subs({a: av, b: bv, c: cv}))
        ok.append(xv > 1 and abs(math.sqrt((bv * xv * xv + cv) / (xv * xv - 1)) - av) < 1e-12)
    return dict(value=value, second=all(ok), options=opts)


@check("M1-05")
def _():
    T = sp.symbols("T")
    Tv = sp.solve(sp.Rational(1, 2) * 8 * 12 + 12 * T + sp.Rational(1, 2) * 4 * 12 - 360, T)[0]
    value = sp.Rational(360) / (12 + Tv)

    def v(t):
        return 1.5 * t if t < 8 else (12 if t < 32 else 12 - 3 * (t - 32))

    n = 360000
    dist = sum(v((i + 0.5) * 36 / n) for i in range(n)) * 36 / n
    return dict(value=value, second=dist / 36, options=[6, 8, 10, 12, 15, 18])


@check("M1-06")
def _():
    value = sp.sqrt(100) - sp.sqrt(1)
    second = sum(1 / (math.sqrt(k) + math.sqrt(k + 1)) for k in range(1, 100))
    return dict(value=value, second=second, options=[sp.Rational(1, 9), 3, 3 * sp.sqrt(11) - 1, 9, 10, 99])


@check("M1-07")
def _():
    A = [F(555, 100), F(565, 100)]
    B = [F(315, 100), F(325, 100)]
    C = [F(35, 100), F(45, 100)]
    vals = [(a - b) / c for a, b, c in product(A, B, C)]
    value = max(vals) - min(vals)
    rnd = random.Random(1)
    samples = [
        (rnd.uniform(5.55, 5.65) - rnd.uniform(3.15, 3.25)) / rnd.uniform(0.35, 0.45) for _ in range(200000)
    ]
    second_ok = abs((max(samples) - min(samples)) - float(value)) < 0.05
    return dict(value=value, second=second_ok, options=[F(1, 2), F(64, 63), F(32, 21), F(110, 63), 2, F(128, 63)])


@check("M1-08")
def _():
    value = (F(6, 5) ** 2 - 1) * 100
    L0, A0 = 1.0, 1.0
    V = L0 * A0
    L1 = 1.2 * L0
    A1 = V / L1
    second = ((L1 / A1) / (L0 / A0) - 1) * 100
    return dict(value=value, second=second, options=[20, 40, 44, 60, F(728, 10), F(10736, 100)])


@check("M1-09")
def _():
    w = sp.symbols("w")
    value = sp.solve(sp.Eq(sp.Rational(12, 100) * 400 + sp.Rational(30, 100) * 100, sp.Rational(1, 5) * (400 - w + 100)), w)[0]
    second = [ww for ww in range(0, 401) if F(48 + 30, 400 - ww + 100) == F(1, 5)]
    return dict(value=value, second=second[0] if len(second) == 1 else None, options=[10, 90, 110, 120, 150, 160])


@check("M1-10")
def _():
    x, y = sp.symbols("x y")
    sols = sp.solve([2 * x + y - 5, x ** 2 + y ** 2 - 25], [x, y])
    (x1, y1), (x2, y2) = sols
    value = sp.Abs(x1 * y2 - x2 * y1) / 2
    # second: Heron's formula on the side lengths
    a = math.dist((0, 0), (float(x1), float(y1)))
    b = math.dist((0, 0), (float(x2), float(y2)))
    c = math.dist((float(x1), float(y1)), (float(x2), float(y2)))
    s = (a + b + c) / 2
    second = math.sqrt(s * (s - a) * (s - b) * (s - c))
    return dict(value=value, second=second, options=[2 * sp.sqrt(5), 5, 8, 4 * sp.sqrt(5), 10, 20])


@check("M1-11")
def _():
    value = sp.Rational(180 - 2 * 47, 2)
    # second: build the figure from the GIVEN angles only (unit circle, A at the bottom, tangent horizontal)
    Ax, Ay = 0.0, -1.0

    def second_point(phi_deg):
        phi = math.radians(phi_deg)
        t = 2 * math.sin(phi)  # |A + t u| = 1 for u at angle phi
        return (Ax + t * math.cos(phi), Ay + t * math.sin(phi))

    B = second_point(58)
    C = second_point(58 + 47)

    def ang(P, Q, R):  # angle at Q
        v1 = (P[0] - Q[0], P[1] - Q[1])
        v2 = (R[0] - Q[0], R[1] - Q[1])
        return math.degrees(math.acos((v1[0] * v2[0] + v1[1] * v2[1]) / (math.hypot(*v1) * math.hypot(*v2))))

    assert abs(math.hypot(*B) - 1) < 1e-12 and abs(math.hypot(*C) - 1) < 1e-12
    second = ang((0, 0), B, C)
    return dict(value=value, second=second, options=[32, 43, 47, 58, 64, 75])


@check("M1-12")
def _():
    value = 2 ** (len(sp.factorint(30)) - 1)
    brute = sum(1 for a in range(12, 361, 12) for b in range(a + 1, 361) if math.gcd(a, b) == 12 and a * b // 12 == 360)
    return dict(value=value, second=brute, options=[4, 5, 6, 8, 12, 16])


CF = [(0, 0), (10, 2), (20, 6), (30, 12), (40, 20), (50, 40), (60, 54), (70, 66), (80, 74), (90, 78), (100, 80)]


def cf_at(mark):
    for (x0, y0), (x1, y1) in zip(CF, CF[1:]):
        if x0 <= mark <= x1:
            return F(y0) + F(y1 - y0, x1 - x0) * (F(mark) - x0)


def mark_at(cf):
    for (x0, y0), (x1, y1) in zip(CF, CF[1:]):
        if y0 <= cf <= y1 and y1 > y0:
            return F(x0) + F(x1 - x0, y1 - y0) * (F(cf) - y0)


STATEMENT_OPTIONS = ["1 only", "2 only", "3 only", "1 and 2 only", "1 and 3 only", "2 and 3 only", "1, 2 and 3", "none of them"]


def statements_label(s1, s2, s3):
    true = [str(i + 1) for i, s in enumerate((s1, s2, s3)) if s]
    if not true:
        return "none of them"
    if len(true) == 3:
        return "1, 2 and 3"
    if len(true) == 1:
        return f"{true[0]} only"
    return f"{true[0]} and {true[1]} only"


@check("M1-13")
def _():
    s1 = mark_at(40) == 50
    s2 = mark_at(60) - mark_at(20) == 25
    s3 = F(80) - cf_at(75) > F(15, 100) * 80
    value = statements_label(s1, s2, s3)
    # second: floating bisection on the piecewise-linear curve
    def inv(target):
        lo, hi = 0.0, 100.0
        for _ in range(80):
            mid = (lo + hi) / 2
            if float(cf_at(mid)) < target:
                lo = mid
            else:
                hi = mid
        return (lo + hi) / 2

    t1 = abs(inv(40) - 50) < 1e-9
    t2 = abs((inv(60) - inv(20)) - 25) < 1e-9
    t3 = (80 - float(cf_at(75))) / 80 > 0.15
    return dict(value=value, second=statements_label(t1, t2, t3), options=STATEMENT_OPTIONS)


@check("M1-14")
def _():
    n, a, b, c = sp.symbols("n a b c")
    seq = [3, 10, 21, 36]
    sol = sp.solve([a * k ** 2 + b * k + c - seq[k - 1] for k in (1, 2, 3)], [a, b, c])
    u = sol[a] * n ** 2 + sol[b] * n + sol[c]
    assert u.subs(n, 4) == 36
    roots = [r for r in sp.solve(sp.Eq(u, 15 * n + 16), n) if r.is_integer and r > 0]
    assert len(roots) == 1
    value = u.subs(n, roots[0])
    # second: brute force with the sequence generated by differences
    terms = seq[:]
    while len(terms) < 200:
        d1 = terms[-1] - terms[-2]
        d2 = (terms[-1] - terms[-2]) - (terms[-2] - terms[-3])
        terms.append(terms[-1] + d1 + d2)
    common = [terms[k - 1] for k in range(1, 200) if terms[k - 1] == 15 * k + 16]
    return dict(value=value, second=common[0] if len(common) == 1 else None, options=[91, 105, 120, 128, 136, 171])


@check("M1-15")
def _():
    maps = {
        "rot90cw": lambda x, y: (y, -x),
        "rot90acw": lambda x, y: (-y, x),
        "rot180": lambda x, y: (-x, -y),
        "reflx": lambda x, y: (x, -y),
        "refl y=x": lambda x, y: (y, x),
        "refl y=-x": lambda x, y: (-y, -x),
    }
    order = ["rot90cw", "rot90acw", "rot180", "reflx", "refl y=x", "refl y=-x"]

    def composite(x, y):
        x, y = y, x          # reflect in y = x
        x, y = -x, -y        # enlargement scale factor -1
        return (-x, y)       # reflect in the y-axis

    pts = [(1, 0), (0, 1), (2, 3), (-5, 7)]
    matches = [k for k in order if all(maps[k](*p) == composite(*p) for p in pts)]
    value = matches[0] if len(matches) == 1 else None
    # second: rotation matrix for -90 degrees
    R = sp.Matrix([[0, 1], [-1, 0]])
    second = "rot90cw" if all(tuple(R * sp.Matrix(p)) == composite(*p) for p in pts) else None
    return dict(value=value, second=second, options=order)


@check("M1-16")
def _():
    cum = [k ** 3 for k in (1, 2, 3)]
    value = (cum[0], cum[1] - cum[0], cum[2] - cum[1])
    # second: integrate cross-sections pi (k h)^2 numerically
    def vol(a, b, n=20000):
        h = (b - a) / n
        return sum(math.pi * (a + (i + 0.5) * h) ** 2 for i in range(n)) * h

    v = [vol(0, 1), vol(1, 2), vol(2, 3)]
    second = tuple(round(x / v[0], 6) for x in v)
    opts = [(1, 2, 3), (1, 3, 5), (1, 4, 9), (1, 7, 19), (1, 8, 19), (1, 8, 27)]
    return dict(value=value, second=second, options=opts)


@check("M1-17")
def _():
    lam, mu, p, q = sp.symbols("lambda mu p q")
    a = sp.Matrix([1, 0])
    c = sp.Matrix([p, q])  # any non-parallel c
    sol = sp.solve(list(lam * (a + c / 2) - (a + mu * (c - a))), [lam, mu], dict=True)[0]
    OP = sp.simplify(sol[lam] * (a + c / 2))
    coeffs = (sp.simplify(sol[lam]), sp.simplify(sol[lam] / 2))
    assert sp.simplify(OP - (coeffs[0] * a + coeffs[1] * c)) == sp.zeros(2, 1)
    # second: random numeric vectors and linear algebra
    rnd = random.Random(7)
    import numpy as np  # noqa: WPS433  (see scripts/requirements.txt)

    av = np.array([rnd.uniform(1, 3), rnd.uniform(-1, 1)])
    cv = np.array([rnd.uniform(-1, 1), rnd.uniform(1, 3)])
    M = av + cv / 2
    # O + t M = A + s (C - A)
    t, s = np.linalg.solve(np.column_stack([M, -(cv - av)]), av)
    P = t * M
    alpha, beta = np.linalg.solve(np.column_stack([av, cv]), P)
    second = (float(alpha), float(beta))
    opts = [(F(1, 2), F(1, 4)), (F(2, 3), F(1, 3)), (F(1, 2), F(1, 2)), (F(1, 3), F(2, 3)), (F(3, 4), F(3, 8)), (F(2, 3), F(1, 6))]
    return dict(value=coeffs, second=second, options=opts)


@check("M1-18")
def _():
    bars = [(0, 10, 2), (10, 15, 6), (15, 20, 8), (20, 30, 5), (30, 50, 1)]
    per_unit = F(24, (15 - 10) * 6)
    value = per_unit * sum(h * (max(b, 25) - max(a, 25)) for a, b, h in bars if b > 25)
    # second: build class frequencies, spread uniformly, count above 25 minutes
    freqs = [(a, b, per_unit * (b - a) * h) for a, b, h in bars]
    second = sum(f * F(max(0, b - max(a, 25)), b - a) for a, b, f in freqs)
    return dict(value=value, second=second, options=[20, 36, 40, 45, 56, 64])


@check("M1-19")
def _():
    r = sp.symbols("r", positive=True)
    value = sp.solve(sp.Eq(r * sp.sqrt(2) + r, 2), r)[0]
    lo, hi = 0.0, 2.0
    for _ in range(200):
        mid = (lo + hi) / 2
        if math.hypot(mid, mid) + mid < 2:
            lo = mid
        else:
            hi = mid
    opts = [sp.sqrt(2) - 1, 2 - sp.sqrt(2), sp.Rational(2, 3), sp.sqrt(2) / 2, 2 * sp.sqrt(2) - 2, 4 - 2 * sp.sqrt(2)]
    return dict(value=sp.radsimp(value), second=lo, options=opts)


@check("M1-20")
def _():
    # Pick's theorem: A = I + B/2 - 1
    area = F(1, 2) * 6 * 4
    B = math.gcd(2, 4) + math.gcd(4, 4) + math.gcd(6, 0)
    I = area - F(B, 2) + 1
    value = I + B
    brute = sum(1 for x in range(-10, 20) for y in range(-10, 20) if y >= 0 and y <= 2 * x and x + y <= 6)
    return dict(value=value, second=brute, options=[7, 12, 13, 16, 17, 19])


@check("M1-21")
def _():
    value = sp.divisor_count(360) - 2
    brute = sum(1 for n in range(3, 5000) if (180 * (n - 2)) % n == 0)
    return dict(value=value, second=brute, options=[16, 18, 20, 21, 22, 24])


@check("M1-22")
def _():
    value = 11 - 4
    best = None
    for a in range(1, 41):
        for b in range(a, 41):
            for d in range(9, 41):
                for e in range(d, 41):
                    lst = [a, b, 9, d, e]
                    if sum(lst) != 40:
                        continue
                    counts = {v: lst.count(v) for v in lst}
                    top = max(counts.values())
                    modes = [v for v, k in counts.items() if k == top]
                    if modes != [11] or top < 2:
                        continue
                    rng = e - a
                    best = rng if best is None else min(best, rng)
    return dict(value=value, second=best, options=[7, 8, 9, 10, 11, 12])


@check("M1-23")
def _():
    n = sp.symbols("n", positive=True, integer=True)
    sols = [s for s in sp.solve(sp.Eq((30 + n * (n - 1)) * 2, (n + 6) * (n + 5)), n) if s > 6]
    value = sols[0]
    brute = [k for k in range(7, 500) if F(30 + k * (k - 1), (k + 6) * (k + 5)) == F(1, 2)]
    return dict(value=value, second=brute[0] if len(brute) == 1 else None, options=[3, 10, 12, 13, 15, 16])


@check("M1-24")
def _():
    value = 3

    def f(x):
        return 2.0 ** x - x * x

    xs = [-30 + 0.0007 * i for i in range(int(90 / 0.0007))]
    changes = sum(1 for a, b in zip(xs, xs[1:]) if f(a) == 0 or f(a) * f(b) < 0)
    return dict(value=value, second=changes, options=[0, 1, 2, 3, 4, "infinitely many"])


@check("M1-25")
def _():
    h = sp.sqrt(2 ** 2 - (sp.sqrt(2)) ** 2)
    value = h / 1
    # second: 3D vectors — angle between face normal and base normal
    import numpy as np

    hv = math.sqrt(4 - 2)
    V = np.array([0, 0, hv])
    A = np.array([-1, -1, 0])
    B = np.array([1, -1, 0])
    assert abs(np.linalg.norm(V - A) - 2) < 1e-12
    n_face = np.cross(B - A, V - A)
    cos_t = abs(n_face @ np.array([0, 0, 1])) / np.linalg.norm(n_face)
    second = math.tan(math.acos(cos_t))
    opts = [1 / sp.sqrt(3), 1, sp.sqrt(2), sp.sqrt(3), 2, sp.sqrt(6)]
    return dict(value=value, second=second, options=opts)


@check("M1-26")
def _():
    s = [2, 3]
    for _ in range(4):
        s.append(3 * s[-1] - s[-2])
    value = s[5]
    x = (3 + math.sqrt(5)) / 2
    second = x ** 5 + x ** -5
    return dict(value=value, second=second, options=[47, 110, 118, 120, 123, 126])


@check("M1-27")
def _():
    value = F(1, 100) * F(9, 10) / (F(1, 100) * F(9, 10) + F(99, 100) * F(5, 100))
    rnd = random.Random(2024)
    pos = has = 0
    for _ in range(2_000_000):
        c = rnd.random() < 0.01
        p = rnd.random() < (0.9 if c else 0.05)
        if p:
            pos += 1
            has += c
    second_ok = abs(has / pos - float(value)) < 0.004
    return dict(value=value, second=second_ok, options=[F(9, 1000), F(1, 11), F(9, 59), F(2, 13), F(1, 2), F(9, 10)])


# ---------------------------------------------------------------------------
# MATHEMATICS 2
# ---------------------------------------------------------------------------

def real_cbrt(v):
    return math.copysign(abs(v) ** (1 / 3), v)


def roots_by_scan(f, a, b, step):
    out = []
    x = a
    fx = f(x)
    while x < b:
        x2 = x + step
        f2 = f(x2)
        if fx == 0:
            out.append(x)
        elif fx * f2 < 0:
            lo, hi = x, x2
            for _ in range(100):
                mid = (lo + hi) / 2
                if f(lo) * f(mid) <= 0:
                    hi = mid
                else:
                    lo = mid
            out.append((lo + hi) / 2)
        x, fx = x2, f2
    return out


@check("M2-01")
def _():
    u = sp.symbols("u")
    value = sum(r ** 3 for r in sp.solve(u ** 2 - 5 * u + 6, u))
    roots = roots_by_scan(lambda x: real_cbrt(x) ** 2 - 5 * real_cbrt(x) + 6, -2000.0003, 2000, 0.01)
    return dict(value=value, second=sum(roots), options=[5, 13, 35, 36, 125, 216])


@check("M2-02")
def _():
    S = lambda n: 3 * n * n + 5 * n  # noqa: E731
    value = S(10) - S(9)
    u = [S(n) - S(n - 1) for n in range(1, 30)]
    assert len({b - a for a, b in zip(u, u[1:])}) == 1  # arithmetic
    return dict(value=value, second=u[9], options=[56, 62, 65, 68, 288, 350])


@check("M2-03")
def _():
    x = sp.symbols("x", real=True)
    sols = sp.solve(2 ** (2 * x + 1) - 5 * 2 ** x + 2, x)
    value = sum(sols)
    roots = roots_by_scan(lambda t: 2 ** (2 * t + 1) - 5 * 2 ** t + 2, -20.0003, 20, 0.001)
    return dict(value=value, second=sum(roots), options=[0, sp.Rational(1, 2), 1, 2, sp.Rational(5, 2), 3])


@check("M2-04")
def _():
    x, c = sp.symbols("x c")
    y = sp.integrate(3 * sp.sqrt(x) - 2 / x ** 2, x) + c
    cv = sp.solve(sp.Eq(y.subs(x, 1), 5), c)[0]
    value = sp.simplify(y.subs({c: cv, x: 4}))
    n = 300000
    h = 3 / n
    integral = sum(3 * math.sqrt(1 + (i + 0.5) * h) - 2 / (1 + (i + 0.5) * h) ** 2 for i in range(n)) * h
    return dict(value=value, second=5 + integral, options=[16, sp.Rational(33, 2), 17, sp.Rational(35, 2), 18, sp.Rational(41, 2)])


@check("M2-05")
def _():
    x = sp.symbols("x", real=True)
    value = sp.solve_univariate_inequality(x / (x - 2) > 3, x, relational=False)
    grid = [i / 1000 for i in range(-10000, 10001) if i != 2000]
    sat = [g for g in grid if g / (g - 2) > 3]
    second = sp.Interval.open(2, 3) if sat and min(sat) > 2 and max(sat) < 3 and min(sat) < 2.002 and max(sat) > 2.998 else None
    oo = sp.oo
    opts = [
        sp.Interval.open(3, oo), sp.Interval.open(-oo, 3), sp.Interval.open(2, oo),
        sp.Union(sp.Interval.open(-oo, 2), sp.Interval.open(3, oo)), sp.Interval.open(-oo, 2), sp.Interval.open(2, 3),
    ]
    return dict(value=value, second=second, options=opts)


@check("M2-06")
def _():
    k = sp.symbols("k", real=True)
    disc = (2 * k) ** 2 - 4 * (k - 1) * (k + 2)
    value = sp.Complement(sp.solve_univariate_inequality(disc > 0, k, relational=False), sp.FiniteSet(1))

    def two_distinct(kv):
        a, b, c = kv - 1, 2 * kv, kv + 2
        if a == 0:
            return False
        return b * b - 4 * a * c > 0

    grid = [F(i, 100) for i in range(-1000, 1001)]
    ok = all(two_distinct(g) == (g < 2 and g != 1) for g in grid)
    oo = sp.oo
    opts = [
        sp.Interval.open(-oo, 2), sp.Interval.open(2, oo), sp.Interval.open(1, 2),
        sp.Union(sp.Interval.open(-oo, 1), sp.Interval.Lopen(1, 2)),
        sp.Union(sp.Interval.open(-oo, 1), sp.Interval.open(1, 2)), sp.Interval.open(-oo, -2),
    ]
    return dict(value=value, second=ok, options=opts)


@check("M2-07")
def _():
    m, x = sp.symbols("m x", real=True)
    quad = sp.expand((x - 4) ** 2 + (m * x) ** 2 - 4)
    a, b, c = [quad.coeff(x, i) for i in (2, 1, 0)]
    sols = sp.solve(sp.Eq(b ** 2 - 4 * a * c, 0), m)
    value = max(sols)
    second = abs(4 * float(value)) / math.sqrt(1 + float(value) ** 2)  # distance from centre to the line
    assert abs(second - 2) < 1e-12
    opts = [sp.Rational(1, 3), sp.Rational(1, 2), 1 / sp.sqrt(3), sp.sqrt(3) / 2, 2 / sp.sqrt(3), sp.sqrt(3)]
    return dict(value=value, second=float(value), options=opts)


@check("M2-08")
def _():
    a, r = sp.symbols("a r", real=True)
    sols = sp.solve([sp.Eq(a / (1 - r), 12), sp.Eq(a ** 2 / (1 - r ** 2), 48)], [a, r], dict=True)
    sols = [s for s in sols if abs(s[r]) < 1]
    assert len(sols) == 1
    value = sols[0][a]
    found = []
    for i in range(-9999, 10000):
        rv = i / 10000
        av = 12 * (1 - rv)
        if abs(av * av / (1 - rv * rv) - 48) < 1e-3:
            found.append(av)
    second = sum(found) / len(found)
    return dict(value=value, second=second, options=[4, 6, 8, 9, 12, 18], tol=1e-3)


@check("M2-09")
def _():
    x = sp.symbols("x", real=True)
    sols = sp.solveset(2 * sp.sin(x) ** 2 + 3 * sp.cos(x) - 3, x, sp.Interval(0, 4 * sp.pi))
    value = len(list(sols))
    cands = set()
    for base in (0.0, math.acos(0.5), -math.acos(0.5)):
        for k in range(-3, 4):
            t = base + 2 * math.pi * k
            if -1e-12 <= t <= 4 * math.pi + 1e-12 and abs(2 * math.sin(t) ** 2 + 3 * math.cos(t) - 3) < 1e-9:
                cands.add(round(t, 9))
    return dict(value=value, second=len(cands), options=[3, 4, 5, 6, 7, 8])


@check("M2-10")
def _():
    t, x, k = sp.symbols("t x k")
    Fx = sp.integrate(3 * t ** 2 - 4 * t + k, (t, 1, x))
    kv = sp.solve(sp.diff(Fx, x).subs(x, 2), k)[0]
    value = Fx.subs({k: kv, x: 2})
    kn = -(3 * 4 - 4 * 2)  # F'(2) = integrand at 2 = 0
    n = 100000
    h = 1 / n
    second = sum(3 * (1 + (i + 0.5) * h) ** 2 - 4 * (1 + (i + 0.5) * h) + kn for i in range(n)) * h
    return dict(value=value, second=second, options=[-8, -5, -3, 0, 3, 5])


@check("M2-11")
def _():
    value = sp.Interval.open(0, 4)

    def count(kv):
        x = sp.symbols("x")
        sols = set()
        for sign in (1, -1):
            for r in sp.solve(x ** 2 - 4 * x - sign * kv, x):
                if r.is_real and sp.simplify(sp.Abs(r ** 2 - 4 * r) - kv) == 0:
                    sols.add(sp.nsimplify(r))
        return len(sols)

    grid = [sp.Rational(i, 4) for i in range(-4, 33)]
    ok = all((count(g) == 4) == (0 < g < 4) for g in grid)
    opts = [sp.Interval.open(0, 4), sp.Interval.open(0, sp.oo), sp.Interval.open(0, 2), sp.FiniteSet(4), sp.Interval.open(4, sp.oo), sp.Interval(0, 4)]
    return dict(value=value, second=ok, options=opts)


@check("M2-12")
def _():
    x = sp.symbols("x")
    value = sp.expand((2 * x - 1 / x ** 2) ** 9).coeff(x, 0)
    second = sum(math.comb(9, r) * 2 ** (9 - r) * (-1) ** r for r in range(10) if 9 - 3 * r == 0)
    return dict(value=value, second=second, options=[-10752, -5376, -2688, -672, 672, 5376])


@check("M2-13")
def _():
    value = sum(1 for x in range(-1000, 1001) if 9 < x * x - 1 < 81)
    second = sum(1 for x in range(-1000, 1001) if x * x - 1 > 0 and 2 < math.log(x * x - 1, 3) < 4 and x * x - 1 not in (9, 81))
    return dict(value=value, second=second, options=[5, 6, 7, 8, 10, 12])


@check("M2-14")
def _():
    k = sp.symbols("k", real=True)
    value = sp.solve_univariate_inequality((2 * k) ** 2 - 4 * 3 * 3 < 0, k, relational=False)

    def always_pos(kv):  # minimum of 3x^2 + 2kx + 3 is at x = -k/3
        xm = -kv / 3
        return 3 * xm * xm + 2 * kv * xm + 3 > 0

    grid = [F(i, 100) for i in range(-600, 601)]
    ok = all(always_pos(g) == (-3 < g < 3) for g in grid)
    oo = sp.oo
    opts = [
        sp.Interval.open(-3, oo), sp.Interval.open(-sp.sqrt(3), sp.sqrt(3)), sp.Interval(-3, 3), sp.Interval.open(-3, 3),
        sp.Union(sp.Interval.open(-oo, -3), sp.Interval.open(3, oo)), sp.Interval.open(0, 3),
    ]
    return dict(value=value, second=ok, options=opts)


@check("M2-15")
def _():
    x = sp.symbols("x", real=True)
    sols = sp.solve((1 - x) * (7 - x) + (2 - 3) * (10 - 3), x)
    value = sp.Abs(sols[1] - sols[0])
    found = roots_by_scan(lambda t: (1 - t) * (7 - t) + (2 - 3) * (10 - 3), -50.0003, 50, 0.01)
    return dict(value=value, second=max(found) - min(found), options=[2, 4, 5, 6, 8, 10])


@check("M2-16")
def _():
    ys = [F(i * i) for i in range(5)]
    T = F(1, 2) * (ys[0] + 2 * sum(ys[1:4]) + ys[4])
    exact = F(64, 3)
    value = ("over" if T > exact else "under", abs(T - exact))
    # second: generic trapezium implementation on floats
    f = lambda t: t * t  # noqa: E731
    h = 1.0
    Tn = h * (f(0) / 2 + f(1) + f(2) + f(3) + f(4) / 2)
    second = ("over" if Tn > 64 / 3 else "under", abs(Tn - 64 / 3))
    opts = [("under", F(2, 3)), ("over", F(2, 3)), ("over", F(1, 3)), ("under", F(1, 3)), ("over", F(4, 3)), ("exact", F(0))]
    return dict(value=value, second=second, options=opts)


def stationary(g, x):
    pts = sp.solve(sp.diff(g, x), x)
    out = []
    for p in pts:
        if not p.is_real:
            continue
        second = sp.diff(g, x, 2).subs(x, p)
        kind = "min" if second > 0 else "max" if second < 0 else "?"
        out.append((kind, (sp.nsimplify(p), sp.nsimplify(g.subs(x, p)))))
    return out


@check("M2-17")
def _():
    x = sp.symbols("x", real=True)
    f1 = lambda t: 5 - (t - 2) ** 2  # noqa: E731
    g1 = 3 - 2 * f1(x + 1)
    value = stationary(g1, x)[0]
    f2 = lambda t: 5 - 3 * (t - 2) ** 2  # a different function with the same maximum  # noqa: E731
    second = stationary(3 - 2 * f2(x + 1), x)[0]
    opts = [("max", (1, -7)), ("min", (3, -7)), ("max", (3, 13)), ("min", (1, 13)), ("max", (-1, -7)), ("min", (1, -7))]
    return dict(value=value, second=second, options=opts)


@check("M2-18")
def _():
    terms = [F(2)]
    for _ in range(99):
        terms.append(1 / (1 - terms[-1]))
    value = F(33) * (F(2) - 1 + F(1, 2)) + F(2)
    return dict(value=value, second=sum(terms), options=[F(99, 2), 50, F(103, 2), 52, F(105, 2), 150])


@check("M2-19")
def _():
    s, c = sp.symbols("s c", real=True)
    sc = sp.solve(sp.Eq(1 + 2 * s * c, sp.Rational(1, 4)), s * c)
    value = sp.Rational(1, 2) * (1 - sp.Rational(-3, 8))
    thetas = roots_by_scan(lambda t: math.sin(t) + math.cos(t) - 0.5, 0.0003, 2 * math.pi, 0.001)
    vals = {round(math.sin(t) ** 3 + math.cos(t) ** 3, 12) for t in thetas}
    assert len(vals) == 1 and len(thetas) == 2
    return dict(value=value, second=vals.pop(), options=[sp.Rational(-11, 16), sp.Rational(1, 8), sp.Rational(5, 16), sp.Rational(3, 8), sp.Rational(11, 16), sp.Rational(13, 16)])


@check("M2-20")
def _():
    log2 = lambda v: math.log(v, 2)  # noqa: E731

    def safe(f):
        def g(x):
            try:
                return f(x)
            except ValueError:
                return None

        return g

    target = safe(lambda x: log2(4 - x))
    # transcribed from src/diagrams/m2.tsx (options A-F)
    opts_f = [
        safe(lambda x: log2(x + 4)),
        safe(lambda x: -log2(4 - x)),
        safe(lambda x: log2(4 - x)),
        safe(lambda x: log2(x - 4)),
        safe(lambda x: log2(-x - 4)),
        safe(lambda x: 2 - log2(x)),
    ]
    xs = [-6.5, -5.5, -3.2, -1, 0, 1.7, 2, 3, 3.9, 4.5, 6]

    def same(f):
        for x in xs:
            a, b = target(x), f(x)
            if (a is None) != (b is None):
                return False
            if a is not None and abs(a - b) > 1e-12:
                return False
        return True

    matches = [i for i, f in enumerate(opts_f) if same(f)]
    value = "graph-" + str(matches[0]) if len(matches) == 1 else None
    # second: key features of log2(4 - x): domain x < 4, decreasing, intercepts (0, 2) and (3, 0)
    feats = target(0) == 2 and target(3) == 0 and target(4.2) is None and target(-1) > target(1)
    second = value if feats else None
    return dict(value=value, second=second, options=[f"graph-{i}" for i in range(6)])


@check("M2-21")
def _():
    x = sp.symbols("x")
    f = x ** 3 - x ** 2 - 2 * x
    value = sp.integrate(f, (x, -1, 0)) - sp.integrate(f, (x, 0, 2))
    n = 400000
    h = 3 / n
    second = sum(abs(((-1 + (i + 0.5) * h) ** 3 - (-1 + (i + 0.5) * h) ** 2 - 2 * (-1 + (i + 0.5) * h))) for i in range(n)) * h
    return dict(value=value, second=second, options=[sp.Rational(-9, 4), sp.Rational(5, 12), sp.Rational(9, 4), sp.Rational(8, 3), 3, sp.Rational(37, 12)])


@check("M2-22")
def _():
    r = sp.symbols("r", positive=True)
    S = 2 * sp.pi * r ** 2 + 32 * sp.pi / r
    crit = sp.solve(sp.diff(S, r), r)
    value = sp.simplify(S.subs(r, crit[0]))
    second = min(2 * math.pi * (i / 10000) ** 2 + 32 * math.pi / (i / 10000) for i in range(1000, 100000))
    return dict(value=value, second=second, options=[12 * sp.pi, 16 * sp.pi, 20 * sp.pi, 24 * sp.pi, 32 * sp.pi, 48 * sp.pi], tol=1e-7)


@check("M2-23")
def _():
    x = sp.symbols("x", real=True)
    f = x ** 3 - 3 * x ** 2 + 4
    s1 = ("max", (0, 4)) in stationary(f, x)
    s2 = len(set(sp.real_roots(f))) == 2
    s3 = all(sp.diff(f, x).subs(x, sp.Rational(i, 100)) < 0 for i in range(1, 200))
    value = statements_label(s1, s2, s3)
    fn = lambda t: t ** 3 - 3 * t * t + 4  # noqa: E731
    d = lambda t: 3 * t * t - 6 * t  # noqa: E731
    t1 = d(-0.01) > 0 and d(0.01) < 0
    t2 = len({round(v, 6) for v in roots_by_scan(fn, -10.0003, 10, 0.001)} | {2.0}) == 2  # x = 2 is a touching root
    t3 = all(d(i / 1000) < 0 for i in range(1, 2000))
    return dict(value=value, second=statements_label(t1, t2, t3), options=STATEMENT_OPTIONS)


@check("M2-24")
def _():
    x, a, b = sp.symbols("x a b")
    p = x ** 3 + a * x ** 2 + b * x - 12
    sol = sp.solve([p.subs(x, 2), p.subs(x, -1) + 6], [a, b])
    pp = p.subs(sol)
    value = sp.rem(pp, x ** 2 - 1, x)
    # second: remainder r x + s from p(1), p(-1)
    r_, s_ = sp.symbols("r s")
    rs = sp.solve([sp.Eq(r_ + s_, pp.subs(x, 1)), sp.Eq(-r_ + s_, pp.subs(x, -1))], [r_, s_])
    second = rs[r_] * x + rs[s_]
    opts = [-3 * x - 9, 3 * x - 9, -3 * x + 9, -9 * x - 3, sp.Integer(-12), sp.Integer(-6)]
    return dict(value=value, second=second, options=opts)


@check("M2-25")
def _():
    r, th = sp.symbols("r theta", positive=True)
    sols = sp.solve([sp.Eq(2 * r + r * th, 20), sp.Eq(r ** 2 * th / 2, 16)], [r, th], dict=True)
    valid = frozenset(sp.nsimplify(s[th]) for s in sols if 0 < s[th] < 2 * sp.pi)
    second = set()
    for i in range(1, 100000):
        rv = i / 10000
        tv = (20 - 2 * rv) / rv
        if 0 < tv < 2 * math.pi and abs(rv * rv * tv / 2 - 16) < 1e-3:
            second.add(round(tv, 2))
    opts = [frozenset({sp.Rational(1, 4)}), frozenset({sp.Rational(1, 2)}), frozenset({2}), frozenset({4}), frozenset({8}), frozenset({sp.Rational(1, 2), 8})]
    return dict(value=valid, second=frozenset(sp.nsimplify(v) for v in second), options=opts)


@check("M2-26")
def _():
    a = sp.symbols("a", positive=True)
    roots = sp.solve(sp.Eq(7 ** 2, 10 ** 2 + a ** 2 - 2 * 10 * a * sp.cos(sp.pi / 6)), a)
    value = sp.simplify(abs(roots[1] - roots[0]))
    # second: coordinates, B at origin, A at (10, 0), C on the ray at 30 degrees
    ts = roots_by_scan(lambda t: math.dist((10, 0), (t * math.cos(math.pi / 6), t * math.sin(math.pi / 6))) - 7, 0.0003, 30, 0.001)
    assert len(ts) == 2
    opts = [2 * sp.sqrt(3), 2 * sp.sqrt(6), sp.sqrt(51), 5 * sp.sqrt(3), 4 * sp.sqrt(6), 10 * sp.sqrt(3)]
    return dict(value=value, second=abs(ts[1] - ts[0]), options=opts, tol=1e-8)


@check("M2-27")
def _():
    x = sp.symbols("x")
    tangent = sp.diff(x ** 3, x).subs(x, 1) * (x - 1) + 1
    xs = sp.solve(x ** 3 - tangent, x)
    other = [v for v in xs if v != 1][0]
    value = sp.integrate(x ** 3 - tangent, (x, other, 1))
    xr = [v for v in roots_by_scan(lambda t: t ** 3 - 3 * t + 2, -5.0003, 0.5, 0.001)][0]
    n = 300000
    h = (1 - xr) / n
    second = sum(abs((xr + (i + 0.5) * h) ** 3 - (3 * (xr + (i + 0.5) * h) - 2)) for i in range(n)) * h
    return dict(value=value, second=second, options=[sp.Rational(9, 4), sp.Rational(15, 4), 6, sp.Rational(27, 4), sp.Rational(27, 2), sp.Rational(81, 4)], tol=1e-8)


# ---------------------------------------------------------------------------
# PHYSICS  (g = 10 N/kg)
# ---------------------------------------------------------------------------
G = 10


@check("PH-01")
def _():
    value = 3.7 * 4.0 * 3600
    second = 4000 * 3.6 * 3.7  # 1 mAh = 3.6 C
    return dict(value=value, second=second, options=[14.8, 888, 14.8e3, 53.3e3, 888e3, 53.3e6], tol=0.005)


@check("PH-02")
def _():
    a, b = sp.symbols("a b", integer=True, nonnegative=True)
    sol = sp.solve([238 - 4 * a - 206, 92 - 2 * a + b - 82], [a, b])
    value = (sol[a], sol[b])
    brute = [(x, y) for x in range(0, 60) for y in range(0, 60) if 238 - 4 * x == 206 and 92 - 2 * x + y == 82]
    return dict(value=value, second=brute[0] if len(brute) == 1 else None, options=[(6, 8), (8, 6), (8, 10), (10, 6), (10, 8), (32, 10)])


@check("PH-03")
def _():
    v1, l1, l2 = F(60, 100), F(3, 100), F(2, 100)
    f = v1 / l1
    v2 = f * l2
    s1 = f == 20
    s2 = v2 == F(40, 100)
    # refraction: sin(r) = (v2/v1) sin(i) < sin(i) -> towards the normal
    i = math.radians(40)
    r = math.asin(float(v2 / v1) * math.sin(i))
    s3 = r > i
    value = statements_label(s1, s2, s3)
    second = statements_label(abs(0.60 / 0.030 - 20) < 1e-12, abs(20 * 0.020 - 0.40) < 1e-12, False)
    return dict(value=value, second=second, options=STATEMENT_OPTIONS)


@check("PH-04")
def _():
    value = F(1000) * F(96, 10) / 12
    rho = sp.symbols("rho", positive=True)
    second = sp.solve(sp.Eq(rho * G * sp.Rational(120, 1000), 1000 * G * sp.Rational(96, 1000)), rho)[0]
    return dict(value=value, second=second, options=[800, 960, 1000, 1200, 1250, 1440])


@check("PH-05")
def _():
    # conduction rate ~ k A dT / d: thicker wall -> slower (statement 1 false);
    # emissivity(black) > emissivity(silver), and absorptivity = emissivity.
    k, A_, dT = 200.0, 0.05, 50.0
    rate = lambda d: k * A_ * dT / d  # noqa: E731
    s1 = rate(0.004) > rate(0.002)
    e_black, e_silver = 0.95, 0.05
    s2 = e_black > e_silver
    s3 = e_black > e_silver
    value = statements_label(s1, s2, s3)
    return dict(value=value, second=statements_label(False, True, True), options=STATEMENT_OPTIONS)


@check("PH-06")
def _():
    RT = F(2000) * F(3, 6)
    value = F(9) * 2000 / (2000 + RT / 2)
    I, Rt = sp.symbols("I R_t", positive=True)
    s = sp.solve([sp.Eq(I * 2000, 6), sp.Eq(I * (2000 + Rt), 9)], [I, Rt], dict=True)[0]
    Rt_new = s[Rt] / 2
    second = 9 * 2000 / (2000 + Rt_new)
    return dict(value=value, second=second, options=[F(30, 10), F(36, 10), F(45, 10), 6, F(72, 10), F(75, 10)])


@check("PH-07")
def _():
    value = F(30) * F(6, 10) + F(25) * F(30, 20) ** 2
    decel = 20 ** 2 / (2 * 25)
    # time-stepped simulation
    dt = 1e-5
    x, v, t = 0.0, 30.0, 0.0
    while t < 0.6 - 1e-12:
        x += v * dt
        t += dt
    while v > 0:
        v_new = max(0.0, v - decel * dt)
        x += (v + v_new) / 2 * dt
        v = v_new
    return dict(value=value, second=x, options=[F(375, 10), F(555, 10), F(5625, 100), F(6825, 100), F(7425, 100), F(8325, 100)], tol=1e-4)


@check("PH-08")
def _():
    m, B, L = 0.020, 0.40, 0.25
    I = m * G / (B * L)
    import numpy as np

    east, north, up = np.array([1, 0, 0]), np.array([0, 1, 0]), np.array([0, 0, 1])
    F_we = I * np.cross(L * east, B * north)  # current flowing west -> east
    direction = "WE" if F_we @ up > 0 else "EW"
    value = (round(I, 9), direction)
    second = (round(float(np.linalg.norm(F_we)) / (B * L), 9), direction) if abs(F_we @ up - m * G) < 1e-12 else None
    opts = [(2.0, "WE"), (2.0, "EW"), (0.5, "WE"), (0.5, "EW"), (20.0, "WE"), (20.0, "EW")]
    return dict(value=value, second=second, options=opts)


@check("PH-09")
def _():
    value = 2 / (1 / F(8, 10) + 1 / F(12, 10))
    mass = 1.0
    second = (2 * mass) / (mass / 0.8 + mass / 1.2)
    return dict(value=value, second=second, options=[F(90, 100), F(96, 100), F(98, 100), 1, F(104, 100), F(120, 100)])


@check("PH-10")
def _():
    pts = [(0, 0), (2, 3), (8, 3), (11, 0)]
    accs = [F(v1 - v0, t1 - t0) for (t0, v0), (t1, v1) in zip(pts, pts[1:])]
    Ns = [60 * (G + a) for a in accs]
    value = (max(Ns), min(Ns))

    def vel(t):
        for (t0, v0), (t1, v1) in zip(pts, pts[1:]):
            if t0 <= t <= t1:
                return v0 + (v1 - v0) * (t - t0) / (t1 - t0)
        return 0.0

    h = 1e-4
    samples = [60 * (G + (vel(t + h) - vel(t - h)) / (2 * h)) for t in [0.5 + 0.01 * i for i in range(1000)] if t < 10.9]
    second = (round(max(samples), 6), round(min(samples), 6))
    opts = [(690, 540), (690, 600), (600, 540), (690, 510), (750, 540), (780, 420)]
    return dict(value=value, second=second, options=opts, tol=1e-6)


@check("PH-11")
def _():
    value = (F(2) * G * 3 - F(1, 2) * 2 * 36) / 5
    a = 36 / (2 * 5.0)             # from v^2 = 2 a s along the ramp
    g_along = G * 3 / 5            # g sin(theta)
    second = 2.0 * (g_along - a)   # Newton's second law along the ramp
    return dict(value=value, second=second, options=[F(24, 10), 4, F(48, 10), 8, 12, 24])


def solve_series_parallel(R_series, branches, V):
    """Nodal analysis: V source -> R_series -> node N -> parallel branches -> ground."""
    vn = sp.symbols("v_n")
    currents = [(vn - 0) / Rb for Rb in branches]
    sol = sp.solve(sp.Eq((V - vn) / R_series, sum(currents)), vn)[0]
    return sol


@check("PH-12")
def _():
    V_open = F(12) * 6 / (4 + 6)
    V_closed = F(12) * F(4) / (4 + 4)
    value = (V_open ** 2 / 6) / (V_closed ** 2 / 6)
    vo = solve_series_parallel(4, [6], 12)
    vc = solve_series_parallel(4, [6, 12], 12)
    second = (vo ** 2 / 6) / (vc ** 2 / 6)
    return dict(value=value, second=second, options=[F(25, 36), F(5, 6), 1, F(6, 5), F(4, 3), F(36, 25)])


@check("PH-13")
def _():
    n = math.log2(15 + 1)
    value = 8 * int(round(n))
    t = 0.0
    while True:
        remaining = 2 ** (-t / 8)
        if (1 - remaining) / remaining >= 15 - 1e-9:
            break
        t += 0.001
    return dict(value=value, second=t, options=[15, 16, 24, 32, 40, 120], tol=1e-4)


@check("PH-14")
def _():
    m = 80.0
    k1, k2 = 0.25, 25.0
    dt = 1e-4
    v, t = 0.0, 0.0
    accel_after_open = None
    drag_high = drag_low = None
    while t < 120:
        k = k1 if t < 60 else k2
        drag = k * v * v
        a = G - drag / m  # downwards positive
        if 60 <= t < 60 + dt:
            accel_after_open = a
        if abs(t - 59.0) < dt / 2:
            drag_high = drag
        v += a * dt
        t += dt
    drag_low = k2 * v * v
    s1 = accel_after_open < 0  # acceleration directed upwards
    s2 = drag_low < drag_high - 1e-6 * m * G
    s3 = True  # at constant speed KE is constant, so W_drag = loss of GPE exactly
    value = statements_label(s1, s2, s3)
    second = statements_label(True, abs(drag_low - m * G) > 1e-3 or abs(drag_high - m * G) > 1e-3, True)
    return dict(value=value, second=second, options=STATEMENT_OPTIONS)


@check("PH-15")
def _():
    p_bottom = F(100_000) + 1000 * G * 30
    value = p_bottom / 100_000
    V = 1.0  # m^3 at the bottom
    second = (float(p_bottom) * V / 100_000) / V
    return dict(value=value, second=second, options=[F(1, 4), 3, 4, 10, 30, 31])


@check("PH-16")
def _():
    Vs = 400 * 50
    I = F(200_000, Vs)
    value = I ** 2 * 8 / 200_000 * 100
    Ip = F(200_000, 400)
    second = (Ip / 50) ** 2 * 8 / 200_000 * 100  # current steps down by the turns ratio
    return dict(value=value, second=second, options=[F(4, 100), F(4, 10), F(8, 10), 4, 40, 80])


@check("PH-17")
def _():
    a, T1, T2 = sp.symbols("a T1 T2")
    eqs = [
        sp.Eq(56_000 - T1 - 2000, 40_000 * a),  # locomotive
        sp.Eq(T1 - T2 - 2000, 30_000 * a),      # first wagon
        sp.Eq(T2 - 2000, 30_000 * a),           # second wagon
    ]
    s = sp.solve(eqs, [a, T1, T2])
    value = F(30_000 * 2 * 1, 2) + 4000  # 60 000 kg x 0.5 m/s^2 + 4 kN
    return dict(value=value / 1000, second=s[T1] / 1000, options=[17, 28, 30, 32, 34, 56])


@check("PH-18")
def _():
    mdot = F(30, 60)
    value = (mdot * G * 20 + F(1, 2) * mdot * 10 ** 2) / F(1, 2)
    per_minute = 30 * G * 20 + 0.5 * 30 * 10 ** 2
    second = per_minute / 60 / 0.5
    return dict(value=value, second=second, options=[100, 125, 200, 250, 500, 7500])


@check("PH-19")
def _():
    t = sp.symbols("t", positive=True)
    tm = sp.solve(sp.Eq(40 - 5 * t ** 2, 20 * t - 5 * t ** 2), t)[0]
    value = 40 - 5 * tm ** 2
    dt = 1e-5
    ya, va, yb, vb, tt = 40.0, 0.0, 0.0, 20.0, 0.0
    while ya > yb:
        va -= G * dt / 2
        vb -= G * dt / 2
        ya += va * dt
        yb += vb * dt
        va -= G * dt / 2
        vb -= G * dt / 2
        tt += dt
    return dict(value=value, second=(ya + yb) / 2, options=[10, 15, 20, 25, 30, "never"], tol=1e-3)


@check("PH-20")
def _():
    v2 = 10 * sp.sqrt(sp.Rational(36, 100))
    value = sp.Rational(25, 100) * (10 + v2) / sp.Rational(5, 100)
    m = 0.25
    ke1 = 0.5 * m * 10 ** 2
    ke2 = ke1 * (1 - 0.64)
    v_after = -math.sqrt(2 * ke2 / m)
    second = abs(m * (v_after - 10)) / 0.050
    return dict(value=value, second=second, options=[20, 50, 68, 80, 90, 100])


@check("PH-21")
def _():
    k, W = F(200), F(40)
    E_series = 2 * F(1, 2) * k * (W / k) ** 2
    E_par = 2 * F(1, 2) * k * (W / 2 / k) ** 2
    value = E_series / E_par
    xs, xp = 40 / 200, 20 / 200
    second = (2 * 0.5 * 40 * xs) / (2 * 0.5 * 20 * xp)  # E = F x / 2 per spring
    return dict(value=value, second=second, options=[F(1, 4), F(1, 2), 1, 2, 4, 8])


@check("PH-22")
def _():
    d = sp.symbols("d", positive=True)
    value = sp.solve(sp.Eq(2 * d - 10 * sp.Rational(1, 2), 340 * sp.Rational(1, 2)), d)[0]

    def echo_time(d0):
        # pulse leaves at t=0 from x=0 (bat), wall at x=d0; bat moves at +10
        t_wall = d0 / 340
        # returning pulse position: d0 - 340 (t - t_wall); bat: 10 t
        return (d0 + 340 * t_wall) / (340 + 10)

    lo, hi = 1.0, 500.0
    for _ in range(200):
        mid = (lo + hi) / 2
        if echo_time(mid) < 0.5:
            lo = mid
        else:
            hi = mid
    return dict(value=value, second=lo, options=[F(825, 10), 85, F(875, 10), 90, 170, 175], tol=1e-9)


@check("PH-23")
def _():
    E = F(1, 2) * 2000 * 20 + F(1, 2) * 340_000 + F(1, 2) * 4200 * 40
    value = E / 2000
    # second: step the temperature with a 1 J energy loop in blocks
    energy, T, frac_melted = 0.0, -20.0, 0.0
    m = 0.5
    while T < 0:
        energy += m * 2000 * 0.001
        T += 0.001
    energy += m * 340_000
    T = 0.0
    while T < 40 - 1e-9:
        energy += m * 4200 * 0.001
        T += 0.001
    return dict(value=value, second=energy / 2000, options=[52, 85, 95, 127, 135, 137], tol=1e-3)


@check("PH-24")
def _():
    Rpar = F(1, 1) / (F(1, 10_000) + F(1, 10_000))
    value = F(12) * Rpar / (10_000 + Rpar)
    second = solve_series_parallel(10_000, [10_000, 10_000], 12)
    return dict(value=value, second=second, options=[3, 4, F(45, 10), 6, 8, 12])


@check("PH-25")
def _():
    V = sp.symbols("V", positive=True)
    lamp = 3 * V / (20 + 5 * V)
    Vx = [s for s in sp.solve(sp.Eq(lamp, V / 20), V) if s > 0][0]
    value = 2 * Vx

    def lamp_v(I):  # invert I = 3V/(20+5V)  ->  V = 20 I / (3 - 5 I)
        return 20 * I / (3 - 5 * I)

    best, best_gap = None, float("inf")
    for i in range(1000, 20001):
        Vs = i / 1000
        lo, hi = 0.0, 0.59
        for _ in range(100):
            I = (lo + hi) / 2
            if lamp_v(I) + 20 * I < Vs:
                lo = I
            else:
                hi = I
        gap = abs(lamp_v(lo) - 20 * lo)
        if gap < best_gap:
            best, best_gap = Vs, gap
    return dict(value=value, second=best, options=[4, 6, 8, 10, 12, 16], tol=2e-3)


@check("PH-26")
def _():
    v1, v2 = sp.symbols("v1 v2", positive=True)
    sol = sp.solve([sp.Eq(2 * v1, 3 * v2), sp.Eq(sp.Rational(1, 2) * 2 * v1 ** 2 + sp.Rational(1, 2) * 3 * v2 ** 2, 60)], [v1, v2], dict=True)
    value = sol[0][v1]
    # second: momentum p shared, E = p^2/2m1 + p^2/2m2
    p = math.sqrt(60 / (1 / (2 * 2) + 1 / (2 * 3)))
    return dict(value=value, second=p / 2, options=[3, 4, 6, F(77, 10), 12, 36])


@check("PH-27")
def _():
    # Physical model: dipole falling along the axis of a loop of radius a.
    # Flux ~ a^2 / (a^2 + z^2)^(3/2); z(t) = z0 - (1/2) g t^2 (starts at rest).
    a = 0.02
    z0 = 0.10
    dt = 1e-6

    def flux(z):
        return a * a / (a * a + z * z) ** 1.5

    ts, emf = [], []
    t = 0.0
    while True:
        z = z0 - 0.5 * G * t * t
        z2 = z0 - 0.5 * G * (t + dt) ** 2
        if z2 < -z0:
            break
        ts.append(t)
        emf.append(-(flux(z2) - flux(z)) / dt)
        t += dt
    i_max = max(range(len(emf)), key=lambda i: emf[i])
    i_min = min(range(len(emf)), key=lambda i: emf[i])
    first, second_pk = sorted([i_max, i_min])

    def fwhm(idx):
        peak = abs(emf[idx])
        l = idx
        while l > 0 and abs(emf[l]) > peak / 2 and (emf[l] > 0) == (emf[idx] > 0):
            l -= 1
        r = idx
        while r < len(emf) - 1 and abs(emf[r]) > peak / 2 and (emf[r] > 0) == (emf[idx] > 0):
            r += 1
        return ts[r] - ts[l]

    sim = (
        "opposite" if emf[first] * emf[second_pk] < 0 else "same",
        abs(emf[second_pk]) > abs(emf[first]),
        fwhm(second_pk) < fwhm(first),
    )
    # option graphs transcribed from src/diagrams/ph.tsx
    pulses = {
        0: [(0.5, 0.07), (-0.8, 0.044)],
        1: [(0.6, 0.06), (0.6, 0.06)],
        2: [(0.6, 0.06), (-0.6, 0.06)],
        3: [(0.8, 0.044), (-0.5, 0.07)],
        4: [(0.5, 0.07), (0.8, 0.044)],
        5: [(0.7, 0.07)],
    }

    def feats(ps):
        if len(ps) != 2:
            return ("single", False, False)
        (a1, w1), (a2, w2) = ps
        return ("opposite" if a1 * a2 < 0 else "same", abs(a2) > abs(a1), w2 < w1)

    opts = [feats(pulses[i]) for i in range(6)]
    value = ("opposite", True, True)
    return dict(value=value, second=sim, options=opts)
