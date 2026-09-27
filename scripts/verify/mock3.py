"""Checks for Mock 3 (Anvil): ids 3-M1-01 … 3-M2-27."""
# ruff: noqa: F403, F405
from .common import *

# ---------------------------------------------------------------------------
# MATHEMATICS 1
# ---------------------------------------------------------------------------


@check("3-M1-01")
def _():
    exact = math.pi * math.sqrt(48.9) / (0.0198 * 36.2)
    opts = [3, 10, 30, 100, 300, 3000]
    value = min(opts, key=lambda o: abs(math.log(o) - math.log(exact)))  # closest on a ratio scale
    est = F(3 * 7) / (F(2, 100) * 36)
    second = min(opts, key=lambda o: abs(o - float(est)))
    return dict(value=value, second=second, options=opts)


@check("3-M1-02")
def _():
    e = sp.symbols("e")
    ext = sp.solve(5 * e + e - 180, e)[0]
    n = 360 / ext
    value = n  # a regular n-gon has n lines of symmetry
    # second: count lines of symmetry of a regular 12-gon by testing reflections of its vertices
    verts = [(math.cos(2 * math.pi * k / 12), math.sin(2 * math.pi * k / 12)) for k in range(12)]
    count = 0
    for j in range(24):
        th = math.pi * j / 24
        c, s_ = math.cos(2 * th), math.sin(2 * th)
        refl = [(c * x + s_ * y, s_ * x - c * y) for x, y in verts]
        if all(min(math.dist(r, v) for v in verts) < 1e-9 for r in refl):
            count += 1
    return dict(value=value, second=count, options=[6, 12, 15, 24, 30, 60])


@check("3-M1-03")
def _():
    lo = -int(math.isqrt(149))
    lo = max(lo, next(n for n in range(-100, 1) if n ** 3 > -30))
    hi = int(math.isqrt(149))
    value = hi - lo + 1
    second = sum(1 for n in range(-1000, 1001) if n * n < 150 and n ** 3 > -30)
    return dict(value=value, second=second, options=[12, 13, 15, 16, 17, 25])


@check("3-M1-04")
def _():
    per_mile = F(64, 1000) * F(16, 10) * 150        # pence
    opts = [F(60, 10), F(96, 10), F(102, 10), F(154, 10), F(246, 10), 154]
    value = min(opts, key=lambda o: abs(o - per_mile))
    # second: cost of a 1000-mile trip, divided by 1000
    km = 1000 * 1.6
    second_raw = km / 100 * 6.4 * 1.50 * 100 / 1000
    second = min(opts, key=lambda o: abs(float(o) - second_raw))
    return dict(value=value, second=second, options=opts)


@check("3-M1-05")
def _():
    value = F(45, 99) + F(12, 90)
    second = Decimal("0." + "45" * 40) + Decimal("0.1" + "3" * 79)
    return dict(value=value, second=second, options=[F(29, 50), F(7, 12), F(58, 99), F(97, 165), F(13, 22), F(593, 990)])


@check("3-M1-06")
def _():
    T = sp.symbols("T")
    value = sp.solve(sp.Rational(2, 5) * T - sp.Rational(3, 8) * T - 10, T)[0]
    second = next(t_ for t_ in range(1, 10000) if t_ % 40 == 0 and t_ * 2 // 5 - t_ * 3 // 8 == 10)
    return dict(value=value, second=second, options=[50, 80, 150, 240, 400, 1200])


CUBIC_OPTS = {
    "a": lambda x: (x - 1) * (x + 2) ** 2,
    "b": lambda x: (1 - x) ** 2 * (x + 2),
    "c": lambda x: (1 - x) * (x + 2),
    "d": lambda x: (1 + x) * (x - 2) ** 2,
    "e": lambda x: (1 - x) * (x - 2) ** 2,
    "f": lambda x: (1 - x) * (x + 2) ** 2,
}


@check("3-M1-07")
def _():
    target = lambda x: (1 - x) * (x + 2) ** 2  # noqa: E731
    xs = [i / 4 for i in range(-14, 15)]
    value = tuple(target(x) for x in xs)
    opts = [tuple(CUBIC_OPTS[k](x) for x in xs) for k in "abcdef"]
    # second: features: roots {-2 (touch), 1 (cross)}, negative leading term, y-intercept 4
    xsym = sp.symbols("x")
    poly = sp.Poly(sp.expand((1 - xsym) * (xsym + 2) ** 2), xsym)
    roots = sp.roots(poly)
    ok = roots == {-2: 2, 1: 1} and poly.LC() < 0 and poly.eval(0) == 4
    return dict(value=value, second=ok, options=opts)


@check("3-M1-08")
def _():
    value = F(45 + 70, 200) * 600
    rnd = random.Random(8)
    # second: simulate a spinner with those relative frequencies
    n = 600000
    hits = sum(1 for _ in range(n) if rnd.random() < 115 / 200)
    second = hits / n * 600
    return dict(value=value, second=second, options=[F(115, 2), 115, 230, 300, 345, 450], tol=5e-3)


@check("3-M1-09")
def _():
    value = F(5040, 100) / (F(7, 10) * F(9, 10))
    second = next(F(p, 100) for p in range(1, 100000) if F(p, 100) * F(7, 10) * F(9, 10) == F(5040, 100))
    return dict(value=value, second=second, options=[56, F(7056, 100), 72, F(7207, 100), 80, 84])


@check("3-M1-10")
def _():
    A = 2 ** 3 * 3 ** 2 * 5
    B = 2 ** 2 * 3 ** 4 * 7
    value = sp.ilcm(A, B) // sp.igcd(A, B)
    second = (A * B // math.gcd(A, B)) // math.gcd(A, B)
    return dict(value=value, second=second, options=[35, 70, 315, 630, 1260, 22680])


@check("3-M1-11")
def _():
    sales = [30, 45, 60, 25, 35, 50, 65, 30, 35, 55, 70, 40]
    y1, y3 = sum(sales[:4]), sum(sales[8:])
    value = F(y3 - y1, y1) * 100
    second = (y3 / y1 - 1) * 100
    opts = [F(50, 3), 20, 25, 40, 60, 80]
    return dict(value=value, second=second, options=opts)


@check("3-M1-12")
def _():
    value = (1 - 1 / F(5, 4) ** 2) * 100
    k, x = 7.3, 2.9
    second = (1 - (k / (1.25 * x) ** 2) / (k / x ** 2)) * 100
    return dict(value=value, second=second, options=[20, 25, 36, 44, 50, F(5625, 100)])


@check("3-M1-13")
def _():
    a, b, x = sp.symbols("a b x")
    sol = sp.solve([a + b - 5, a / 3 + b - 1], [a, b])
    value = sp.solve(sol[a] / x + sol[b], x)[0]
    g = lambda v: 6 / v - 1  # noqa: E731
    lo, hi = 1.0, 50.0
    for _ in range(100):
        mid = (lo + hi) / 2
        lo, hi = (mid, hi) if g(lo) * g(mid) > 0 else (lo, mid)
    opts = [-6, F(-3, 2), F(1, 6), F(3, 2), 6, "no crossing"]
    return dict(value=value, second=(lo + hi) / 2, options=opts)


@check("3-M1-14")
def _():
    # 1: AAA - an enlargement has equal angles but different size
    t1 = [(0, 0), (1, 0), (0, 1)]
    t2 = [(0, 0), (2, 0), (0, 2)]
    s1 = math.dist(*t1[:2]) == math.dist(*t2[:2])
    # 2: SSA - two different triangles with sides 5, 4 and a 30-degree angle opposite the side of length 4
    A = 30
    c, a_ = 5.0, 4.0
    sinC = c * math.sin(math.radians(A)) / a_
    Cs = [math.degrees(math.asin(sinC)), 180 - math.degrees(math.asin(sinC))]
    thirds = [a_ * math.sin(math.radians(180 - A - C)) / math.sin(math.radians(A)) for C in Cs if 180 - A - C > 0]
    s2 = len(thirds) == 1
    # 3: RHS - the third side is fixed by Pythagoras
    s3 = True
    value = frozenset(i for i, ok in [(1, s1), (2, s2), (3, s3)] if ok)
    second = frozenset({3}) if (len(thirds) == 2 and abs(thirds[0] - thirds[1]) > 1e-6 and math.isclose(math.sqrt(13 ** 2 - 5 ** 2), 12)) else None
    return dict(value=value, second=second, options=STATEMENT_SETS)


@check("3-M1-15")
def _():
    k2 = F(405, 180)
    k = sp.sqrt(sp.Rational(k2.numerator, k2.denominator))
    value = sp.Rational(540) / k ** 3
    second = 540 * (180 / 405) ** 1.5
    return dict(value=value, second=second, options=[120, 160, 240, 360, 1215, F(18225, 10)])


@check("3-M1-16")
def _():
    r = 6
    arc = 4 * sp.pi
    frac = arc / (2 * sp.pi * r)
    value = sp.pi * r ** 2 * (1 - frac)
    # second: angle in degrees from the arc, then the major sector
    ang = math.degrees(4 * math.pi / r)
    second = (360 - ang) / 360 * math.pi * 36
    pi = sp.pi
    return dict(value=value, second=second, options=[12 * pi, 24 * pi, 30 * pi, 32 * pi, 36 * pi, 48 * pi])


@check("3-M1-17")
def _():
    n, a, b, c = sp.symbols("n a b c")
    terms = [3, 10, 21, 36]
    sol = sp.solve([a * k ** 2 + b * k + c - terms[k - 1] for k in range(1, 4)], [a, b, c])
    formula = sol[a] * n ** 2 + sol[b] * n + sol[c]
    assert formula.subs(n, 4) == 36
    value = formula.subs(n, 20)
    # second: extend the sequence by differences
    seq = terms[:]
    d2 = 4
    while len(seq) < 20:
        seq.append(seq[-1] + (seq[-1] - seq[-2]) + d2)
    return dict(value=value, second=seq[19], options=[780, 800, 820, 840, 1504, 1640])


@check("3-M1-18")
def _():
    pts_ = [(1, 34), (1.5, 44), (2, 38), (3, 50), (3.5, 43), (4, 55), (5, 52), (5.5, 63), (6, 58), (7, 68), (7.5, 62), (8, 73), (9, 70), (10, 82), (11, 84)]
    n = len(pts_)
    mx = sum(p[0] for p in pts_) / n
    my = sum(p[1] for p in pts_) / n
    sxy = sum((p[0] - mx) * (p[1] - my) for p in pts_)
    sxx = sum((p[0] - mx) ** 2 for p in pts_)
    syy = sum((p[1] - my) ** 2 for p in pts_)
    r = sxy / math.sqrt(sxx * syy)
    s1 = r > 0.8
    s2 = 30 <= max(p[0] for p in pts_)  # 30 hours is far beyond the data: extrapolation
    s3 = False  # correlation does not establish causation
    value = frozenset(i for i, ok in [(1, s1), (2, s2), (3, s3)] if ok)
    slope = sxy / sxx
    pred30 = my + slope * (30 - mx)
    second = frozenset({1}) if (r > 0.8 and pred30 > 100) else None   # the line even predicts over 100% at 30 hours
    return dict(value=value, second=second, options=STATEMENT_SETS)


@check("3-M1-19")
def _():
    value = 180 - 90 - 40
    # second: the diagram's construction
    R = 1.0
    A, B, O = (-R, 0.0), (R, 0.0), (0.0, 0.0)
    T = (-R, 2 * R * math.tan(math.radians(50)))
    d = (T[0] - B[0], T[1] - B[1])
    s_ = -2 * ((B[0] - O[0]) * d[0] + (B[1] - O[1]) * d[1]) / (d[0] ** 2 + d[1] ** 2)
    C = (B[0] + s_ * d[0], B[1] + s_ * d[1])
    assert abs(angle_at(T, A, B) - 40) < 1e-9
    second = angle_at(A, T, C)
    return dict(value=value, second=second, options=[20, 25, 30, 40, 45, 50], tol=1e-9)


@check("3-M1-20")
def _():
    both = 24 + 18 - (40 - 6)
    value = F(both, 18)
    # second: build a class list and count
    students = []
    students += [("F",)] * (24 - both) + [("F", "S")] * both + [("S",)] * (18 - both) + [()] * 6
    assert len(students) == 40
    spanish = [s_ for s_ in students if "S" in s_]
    second = F(sum(1 for s_ in spanish if "F" in s_), len(spanish))
    return dict(value=value, second=second, options=[F(1, 5), F(1, 3), F(4, 9), F(9, 20), F(3, 5), F(17, 20)])


@check("3-M1-21")
def _():
    value = (6 + 8, 12 + 8 * 3, 8 * 3)
    # second: build the truncated cube's vertices and count faces/edges from its convex hull (numpy)
    import numpy as np
    t_ = 0.3
    verts = set()
    for sx_ in (-1, 1):
        for sy_ in (-1, 1):
            for sz_ in (-1, 1):
                c = np.array([sx_, sy_, sz_], dtype=float)
                for axis in range(3):
                    v = c.copy()
                    v[axis] -= 2 * t_ * c[axis]
                    verts.add(tuple(np.round(v, 9)))
    V = len(verts)
    pts_ = np.array(sorted(verts))
    # edges: pairs at the minimum distance along cube edges or triangle sides
    dists = {}
    for i in range(V):
        for j in range(i + 1, V):
            dists[(i, j)] = float(np.linalg.norm(pts_[i] - pts_[j]))
    tri = 2 * t_ * math.sqrt(2)             # triangle side
    cube = 2 - 4 * t_                        # remaining cube edge
    E = sum(1 for d in dists.values() if abs(d - tri) < 1e-6 or abs(d - cube) < 1e-6)
    Fc = 2 - V + E                           # Euler
    opts = [(14, 36, 24), (14, 24, 36), (8, 36, 24), (14, 36, 32), (14, 30, 18), (6, 24, 24)]
    return dict(value=value, second=(Fc, E, V), options=opts)


@check("3-M1-22")
def _():
    AC = sp.sqrt(3 ** 2 + 4 ** 2)
    value = sp.nsimplify(AC * sp.tan(sp.pi / 6))
    # second: coordinates; check the angle between AG and the base is 30 degrees for this height
    h = float(value)
    G = (3.0, 4.0, h)
    ang = math.degrees(math.atan2(G[2], math.hypot(G[0], G[1])))
    second = h if abs(ang - 30) < 1e-9 else None
    r3 = sp.sqrt(3)
    return dict(value=value, second=second, options=[sp.Rational(5, 2), 5 * r3 / 3, 5 * r3 / 2, 10 * r3 / 3, 5 * r3, 10])


@check("3-M1-23")
def _():
    m = sp.symbols("m", real=True)
    xm = 9 / (2 + 3 * m)
    ym = (12 * m + 2) / (2 + 3 * m)
    cond = sp.solve_univariate_inequality(xm > 0, m, relational=False).intersect(
        sp.solve_univariate_inequality(ym > 0, m, relational=False))
    value = cond
    # second: test many gradients numerically
    good = []
    for i in range(-3000, 3001):
        mv = i / 1000
        if abs(2 + 3 * mv) < 1e-12:
            continue
        xv = 9 / (2 + 3 * mv)
        yv = mv * xv + 1
        if xv > 0 and yv > 0:
            good.append(mv)
    second = sp.Interval.open(sp.Rational(-1, 6), sp.oo) if (min(good) > -1 / 6 and min(good) < -1 / 6 + 0.002 and max(good) == 3.0) else None
    opts = [sp.Interval.open(0, sp.oo), sp.Interval.open(sp.Rational(-2, 3), sp.oo), sp.Interval.open(-sp.oo, sp.Rational(-1, 6)),
            sp.Interval.open(sp.Rational(-2, 3), sp.Rational(-1, 6)), sp.Union(sp.Interval.open(-sp.oo, sp.Rational(-2, 3)), sp.Interval.open(sp.Rational(-2, 3), sp.oo)),
            sp.Interval.open(sp.Rational(-1, 6), sp.oo)]
    return dict(value=value, second=second, options=opts)


@check("3-M1-24")
def _():
    def composite(p):
        x, y = p
        x, y = 2 - x, y          # reflect in x = 1
        return (y, x)            # reflect in y = x
    candidates = {
        "rot cw (1,1)": lambda p: (1 + (p[1] - 1), 1 - (p[0] - 1)),
        "rot acw (1,1)": lambda p: (1 - (p[1] - 1), 1 + (p[0] - 1)),
        "rot cw (0,0)": lambda p: (p[1], -p[0]),
        "rot 180 (1,1)": lambda p: (2 - p[0], 2 - p[1]),
        "refl y=1": lambda p: (p[0], 2 - p[1]),
        "translation": None,
    }
    rnd = random.Random(24)
    pts_ = [(rnd.uniform(-5, 5), rnd.uniform(-5, 5)) for _ in range(20)]
    value = next(k for k, f in candidates.items() if f and all(math.dist(f(p), composite(p)) < 1e-9 for p in pts_))
    # second: the matrix of the linear part and the fixed point
    M = sp.Matrix([[0, 1], [-1, 0]])       # (x, y) -> (y, 2 - x) has linear part (y, -x)
    fixed = sp.solve([sp.Symbol("x") - sp.Symbol("y"), sp.Symbol("y") - (2 - sp.Symbol("x"))], [sp.Symbol("x"), sp.Symbol("y")])
    rot_cw = M == sp.Matrix([[sp.cos(-sp.pi / 2), -sp.sin(-sp.pi / 2)], [sp.sin(-sp.pi / 2), sp.cos(-sp.pi / 2)]])
    second = "rot cw (1,1)" if rot_cw and list(fixed.values()) == [1, 1] else None
    return dict(value=value, second=second, options=list(candidates))


@check("3-M1-25")
def _():
    r = sp.symbols("r")
    sols = sp.solve(sp.Eq((r * (r - 1) + (10 - r) * (9 - r)) / 90, sp.Rational(7, 15)), r)
    red = max(sols)
    value = 10 - red
    # second: enumerate all splits and simulate exact probabilities
    second = next(10 - rr for rr in range(6, 11) if F(rr * (rr - 1) + (10 - rr) * (9 - rr), 90) == F(7, 15))
    return dict(value=value, second=second, options=[4, 5, 6, 7, 8, 9])


@check("3-M1-26")
def _():
    lam, mu = sp.symbols("lam mu")
    sol = sp.solve([lam / 2 - mu / 3, lam / 2 - (1 - mu)], [lam, mu])
    ratio = sol[mu] / (1 - sol[mu])
    value = ratio
    # second: coordinates, then the intersection of two lines numerically
    O, A, B = (0.0, 0.0), (3.0, 0.3), (1.1, 2.4)
    P = (A[0] / 3, A[1] / 3)
    Q = ((A[0] + B[0]) / 2, (A[1] + B[1]) / 2)
    # solve B + s (P - B) = t Q
    det = (P[0] - B[0]) * (-Q[1]) - (P[1] - B[1]) * (-Q[0])
    s_ = ((0 - B[0]) * (-Q[1]) - (0 - B[1]) * (-Q[0])) / det
    second = s_ / (1 - s_)
    opts = [F(1, 3), F(1, 2), 1, 2, 3, 4]
    return dict(value=value, second=second, options=opts, tol=1e-9)


@check("3-M1-27")
def _():
    k = 3
    small = 4
    value = small + k ** 2 * small + 2 * k * small
    # second: coordinates of a trapezium with DC = 1, AB = 3 and height h chosen so that area DXC = 4
    h = sp.symbols("h", positive=True)
    A, B, D, C = (0, 0), (3, 0), (1, h), (2, h)
    X = (D[0] + (B[0] - D[0]) * sp.Rational(1, 4), D[1] + (B[1] - D[1]) * sp.Rational(1, 4))
    tri = lambda p, q, r: sp.Abs((q[0] - p[0]) * (r[1] - p[1]) - (r[0] - p[0]) * (q[1] - p[1])) / 2  # noqa: E731
    hv = sp.solve(sp.Eq(tri(D, X, C), 4), h)[0]
    trap = sp.Rational(1, 2) * (1 + 3) * hv
    return dict(value=value, second=trap, options=[40, 48, 52, 64, 100, 112])


# ---------------------------------------------------------------------------
# PHYSICS
# ---------------------------------------------------------------------------


@check("3-PH-01")
def _():
    f = 100 * 10 ** 6
    value = F(3 * 10 ** 8, f)
    second = 3.0e8 * (1 / 1.0e8)
    return dict(value=value, second=second, options=[F(1, 3), 3, 30, 300, 3000, 3 * 10 ** 16], tol=1e-2)


@check("3-PH-02")
def _():
    V_cm3 = 120 - 60
    rho_gcm3 = F(150, V_cm3)
    value = rho_gcm3 * 1000                     # kg m^-3
    second = (0.150 / (V_cm3 * 1e-6))           # SI units throughout
    return dict(value=value, second=second, options=[F(5, 2), 250, 400, 1250, 2500, 25000])


@check("3-PH-03")
def _():
    s1 = True   # sound needs a medium
    s2 = True   # loudness <-> amplitude, pitch <-> frequency
    # Doppler for a receding source: f' = f v / (v + u)  <  f
    f0, v, u = 700.0, 340.0, 25.0
    f_away = f0 * v / (v + u)
    s3 = f_away > f0
    value = frozenset(i for i, ok in [(1, s1), (2, s2), (3, s3)] if ok)
    # second: wavelength behind a moving source is longer: lambda' = (v + u)/f0
    second = frozenset({1, 2}) if (v + u) / f0 > v / f0 else None
    return dict(value=value, second=second, options=STATEMENT_SETS)


@check("3-PH-04")
def _():
    m, v, t, R = 1200, 20, 8, 600
    a = F(v, t)
    value = m * a + R
    # second: work-energy over the 8 s: driving force x distance = KE gained + work against resistance
    s = F(1, 2) * v * t
    second = (F(1, 2) * m * v ** 2 + R * s) / s
    return dict(value=value, second=second, options=[2400, 3000, 3600, 4200, 9600, 24000])


@check("3-PH-05")
def _():
    value = F(15, 10) * 13 / (60 + 5)
    # second: momentum balance with the centre of mass staying still
    second = next(F(k, 100) for k in range(1, 1000) if F(k, 100) * 65 == F(195, 10))
    return dict(value=value, second=second, options=[F(29, 100), F(30, 100), F(33, 100), 3, F(33, 10), 13])


PAGE_DIRS = {"towards the north pole": (-1, 0, 0), "towards the south pole": (1, 0, 0), "up the page": (0, 1, 0),
             "down the page": (0, -1, 0), "into the page": (0, 0, -1), "out of the page": (0, 0, 1)}


@check("3-PH-06")
def _():
    I = sp.Matrix([0, 0, -1])   # current into the page
    B = sp.Matrix([1, 0, 0])    # field from N (left) to S (right)
    Fv = I.cross(B)
    value = next(k for k, d in PAGE_DIRS.items() if tuple(Fv) == d)
    # second: Fleming's left-hand rule as a fixed orthonormal triple (field, current, thrust) with right-handed ordering
    field, current = np.array([1, 0, 0]), np.array([0, 0, -1])
    thrust = np.cross(current, field)
    second = next(k for k, d in PAGE_DIRS.items() if tuple(int(x) for x in thrust) == d)
    return dict(value=value, second=second, options=list(PAGE_DIRS))


@check("3-PH-07")
def _():
    # 1: ideal-gas density of steam at 100 C and 1 atm, compared with water (958 kg/m^3 at 100 C)
    rho_steam = 101325 * 0.018 / (8.314 * 373)
    s1 = 958 / rho_steam > 1000
    s2 = False  # particles in a solid vibrate
    # 3: kinetic model p = (1/3) rho <c^2>: at fixed volume, raising T raises <c^2> and p
    p = lambda T: 1.0 * T  # pressure proportional to absolute temperature at fixed volume  # noqa: E731
    s3 = p(350) > p(300)
    value = frozenset(i for i, ok in [(1, s1), (2, s2), (3, s3)] if ok)
    second = frozenset({1, 3}) if (not s2 and s3) else None
    return dict(value=value, second=second, options=STATEMENT_SETS)


@check("3-PH-08")
def _():
    f = F(5 * 10 ** 14)
    value = F(2 * 10 ** 8) / f
    lam_air = 3.0e8 / 5.0e14
    second = lam_air * (2.0 / 3.0)              # wavelength scales with speed at fixed frequency
    opts = [F(25, 10 ** 8), F(4, 10 ** 7), F(6, 10 ** 7), F(9, 10 ** 7), F(25 * 10 ** 5), F(10 ** 23)]
    return dict(value=value, second=second, options=opts, tol=1e-9)


EM_ORDER = ["radio", "microwave", "infrared", "visible", "ultraviolet", "X-ray", "gamma"]
EM_FREQ = {"radio": 1e8, "microwave": 1e10, "infrared": 1e13, "visible": 5e14, "ultraviolet": 1e16, "X-ray": 1e18, "gamma": 1e20}


@check("3-PH-09")
def _():
    s1 = True  # both transverse; only EM waves cross a vacuum; same speed c in vacuum
    s2 = all(EM_FREQ[a] < EM_FREQ[b] for a, b in zip(EM_ORDER, EM_ORDER[1:]))
    s3 = True  # X-ray imaging and ionising hazard
    value = frozenset(i for i, ok in [(1, s1), (2, s2), (3, s3)] if ok)
    wavelengths = [3e8 / EM_FREQ[k] for k in EM_ORDER]
    second = frozenset({1, 2, 3}) if all(a > b for a, b in zip(wavelengths, wavelengths[1:])) else None
    return dict(value=value, second=second, options=STATEMENT_SETS)


@check("3-PH-10")
def _():
    g, h0, h1 = 10, F(5), F(32, 10)
    value = ((h0 - h1) / h0, sp.sqrt(2 * g * h1))
    # second: simulate the fall and the rise
    dt = 1e-5
    y, v = 5.0, 0.0
    while y > 0:
        v -= 10 * dt
        y += v * dt
    v_before = -v
    v_after = math.sqrt(2 * 10 * 3.2)
    second = (1 - v_after ** 2 / v_before ** 2, v_after)
    opts = [(F(1, 5), 8), (F(9, 25), F(32, 5)), (F(9, 25), 8), (F(9, 25), 10), (F(16, 25), 8), (F(16, 25), 10)]
    return dict(value=value, second=second, options=opts, tol=1e-3)


@check("3-PH-11")
def _():
    value = 10 ** 5 + 1000 * 10 * 20
    # second: integrate the weight of a 1 m^2 column of water in thin layers
    n = 1000
    second = 1.0e5 + sum(1000 * 10 * (20 / n) for _ in range(n))
    return dict(value=value, second=second, options=[10 ** 5, 12 * 10 ** 4, 2 * 10 ** 5, 3 * 10 ** 5, 4 * 10 ** 5, 2 * 10 ** 6], tol=1e-9)


@check("3-PH-12")
def _():
    s1 = True
    # 2: count sign changes of sin(2*pi*50*t) over one second
    n = 200000
    vals = [math.sin(2 * math.pi * 50 * (i + 0.5) / n) for i in range(n)]
    reversals = sum(1 for a, b in zip(vals, vals[1:]) if a * b < 0)
    s2 = reversals == 50
    s3 = True
    value = frozenset(i for i, ok in [(1, s1), (2, s2), (3, s3)] if ok)
    second = frozenset({1, 3}) if 2 * 50 == 100 and reversals in (99, 100) else None
    return dict(value=value, second=second, options=STATEMENT_SETS)


@check("3-PH-13")
def _():
    B, I, L = F(2, 10), F(3), F(5, 100)
    Fv = B * I * L
    ratio = (2 * B) * (I / 2) * L / Fv
    value = (Fv, ratio)
    second = (0.20 * 3.0 * 0.050, (0.40 * 1.5 * 0.050) / (0.20 * 3.0 * 0.050))
    opts = [(F(3, 100), 1), (F(3, 100), 2), (F(3, 100), F(1, 2)), (F(3, 10), 1), (3, 1), (3, 2)]
    return dict(value=value, second=second, options=opts, tol=1e-9)


@check("3-PH-14")
def _():
    # 1: with no resultant force the velocity is constant (simulate a drifting craft)
    v, x = 100.0, 0.0
    for _ in range(1000):
        x += v * 0.01          # no force, no change in v
    s1 = v < 100.0
    # 2: F = ma: same a needs a larger F for a larger m
    s2 = 2 * 12000 > 2 * 8000
    # 3: drag ~ 1/2 rho C A v^2 increases with v and with A
    drag = lambda rho, A, vv: 0.5 * rho * 0.9 * A * vv ** 2  # noqa: E731
    s3 = drag(1.2, 0.5, 12) > drag(1.2, 0.5, 8) and drag(1.2, 0.35, 12) < drag(1.2, 0.5, 12)
    value = frozenset(i for i, ok in [(1, s1), (2, s2), (3, s3)] if ok)
    second = frozenset({2, 3}) if (v == 100.0 and s3) else None
    return dict(value=value, second=second, options=STATEMENT_SETS)


BLOCK_OPTS = {  # (inside, exit) as drawn in the six diagrams
    "a": ("straight", "straight"), "b": ("away", "parallel"), "c": ("toward", "straight"),
    "d": ("toward", "toward"), "e": ("toward", "wider"), "f": ("toward", "parallel"),
}


@check("3-PH-15")
def _():
    n_glass, i = 1.5, math.radians(45)
    r = math.asin(math.sin(i) / n_glass)          # Snell's law, used here only as an independent model
    inside = "toward" if r < i else ("away" if r > i else "straight")
    e = math.asin(n_glass * math.sin(r))          # leaving through a parallel face
    exit_kind = "parallel" if abs(e - i) < 1e-12 else ("wider" if e > i else "toward")
    value = (inside, exit_kind)
    # second: ray tracing with wavefront speeds (Huygens): the ray bends towards the slower side
    v_air, v_glass = 3.0e8, 2.0e8
    r2 = math.asin(math.sin(i) * v_glass / v_air)
    e2 = math.asin(math.sin(r2) * v_air / v_glass)
    second = ("toward" if r2 < i else "away", "parallel" if abs(e2 - i) < 1e-12 else "other")
    return dict(value=value, second=second, options=[BLOCK_OPTS[k] for k in "abcdef"])


@check("3-PH-16")
def _():
    isotopes = {"C-12": (6, 6), "C-14": (6, 8)}
    s1 = True   # Rutherford scattering
    s2 = isotopes["C-12"][0] == isotopes["C-14"][0] and isotopes["C-14"][1] > isotopes["C-12"][1]
    alpha_range_in_air_cm = 5
    s3 = alpha_range_in_air_cm > 100   # alpha passing through a metal casing would need a huge range
    value = frozenset(i for i, ok in [(1, s1), (2, s2), (3, s3)] if ok)
    second = frozenset({1, 2}) if (s2 and not s3) else None
    return dict(value=value, second=second, options=STATEMENT_SETS)


@check("3-PH-17")
def _():
    k = F(4, 16 - 12)            # N per cm
    length = 12 + F(7) / k
    permanent = 14 > 10          # beyond the elastic limit
    value = (length, permanent)
    second = (12.0 + 7.0 * (16.0 - 12.0) / 4.0, True)
    opts = [(19, False), (19, True), (28, True), (28, False), (7, False), (7, True)]
    return dict(value=value, second=second, options=opts)


@check("3-PH-18")
def _():
    c = sp.symbols("c")
    value = sp.solve(sp.Rational(1, 2) * c * (100 - 28) - sp.Rational(45, 100) * 4200 * (28 - 20), c)[0]
    # second: find the final temperature from this c and check it is 28 degC
    cm, cw = float(value), 4200
    T = (0.5 * cm * 100 + 0.45 * cw * 20) / (0.5 * cm + 0.45 * cw)
    second = float(value) if abs(T - 28) < 1e-9 else None
    return dict(value=value, second=second, options=[105, 378, 420, 840, 3780, 4200])


@check("3-PH-19")
def _():
    B = lambda I, r: 2e-7 * I / r  # field of a long straight wire  # noqa: E731
    s1 = B(5, 0.10) > B(5, 0.05)
    s2 = True
    # 3: induced emf = -N dPhi/dt; a steady current gives a constant flux
    flux = [0.02 for _ in range(100)]
    emf = [-(b - a) / 0.01 for a, b in zip(flux, flux[1:])]
    s3 = any(abs(e) > 0 for e in emf)
    value = frozenset(i for i, ok in [(1, s1), (2, s2), (3, s3)] if ok)
    second = frozenset({2}) if (B(5, 0.05) > B(5, 0.10) and max(abs(e) for e in emf) == 0) else None
    return dict(value=value, second=second, options=STATEMENT_SETS)


def lamp_current(v):
    # the curve drawn in the diagram (P3PhIV): I = 0.4 (V/6)^0.6
    return 0.4 * (abs(v) / 6) ** 0.6


@check("3-PH-20")
def _():
    I_lamp = lamp_current(6.0)                   # 0.40 A read from the graph
    value = 6.0 * (I_lamp + 6.0 / 12)
    # second: add the powers separately
    second = 6.0 * I_lamp + 6.0 ** 2 / 12
    return dict(value=value, second=second, options=[F(24, 10), 3, F(48, 10), F(54, 10), F(66, 10), F(108, 10)], tol=1e-9)


@check("3-PH-21")
def _():
    A, Z = 238, 92
    A, Z = A - 4, Z - 2          # alpha
    for _ in range(2):
        Z += 1                   # beta minus
    value = (A, Z)
    # second: conservation in the overall equation U -> X + He-4 + 2 e-
    second = (238 - 4 - 2 * 0, 92 - 2 - 2 * (-1))
    opts = [(234, 88), (234, 90), (230, 92), (234, 92), (238, 94), (234, 94)]
    return dict(value=value, second=second, options=opts)


@check("3-PH-22")
def _():
    t = sp.symbols("t", positive=True)
    tv = sp.solve(sp.Eq(5 * t + 5 * t ** 2, 30), t)[0]
    value = (tv, 5 + 10 * tv)
    dt = 1e-6
    y, v, tt = 0.0, 5.0, 0.0
    while y < 30:
        v += 10 * dt
        y += v * dt
        tt += dt
    opts = [(2, 20), (2, 25), (F(24, 10), 24), (3, 35), (6, 65), (F(24, 10), 29)]
    return dict(value=value, second=(tt, v), options=opts, tol=1e-4)


@check("3-PH-23")
def _():
    def current_in_6(closed):
        right = 3 if closed else 6
        par = F(6 * right, 6 + right)
        I = F(12) / (2 + par)
        return I * par / 6
    value = (current_in_6(False), current_in_6(True))
    # second: nodal analysis with sympy for both switch positions
    res = []
    for closed in (False, True):
        V = sp.symbols("V")      # potential of the top node of the parallel section (bottom node at 0)
        right = 3 if closed else 6
        sol = sp.solve(sp.Eq((12 - V) / 2, V / 6 + V / right), V)[0]
        res.append(sol / 6)
    opts = [(F(6, 5), 1), (F(6, 5), F(6, 5)), (F(6, 5), F(3, 2)), (1, F(6, 5)), (2, 2), (F(12, 5), 3)]
    return dict(value=value, second=tuple(res), options=opts)


@check("3-PH-24")
def _():
    n = sp.symbols("n")
    halvings = sp.solve(sp.Eq((660 - 20) / 2 ** n, 60 - 20), n)[0]
    value = sp.nsimplify(8 / halvings)
    # second: simulate decay of the corrected rate for candidate half-lives
    second = next(T for T in [x / 10 for x in range(5, 100)] if abs(640 * 0.5 ** (8 / T) + 20 - 60) < 1e-9)
    return dict(value=value, second=second, options=[2, F(23, 10), F(27, 10), 3, 4, 8], tol=1e-9)


@check("3-PH-25")
def _():
    P_in = 500 * 10 * 80
    P_out = F(9, 10) * P_in
    I = P_out / 20000
    value = float(I ** 2 * 5)                      # 1620 W, given as 1.6 kW
    # second: fraction lost = P R / V^2, times the power transmitted
    second = float(P_out) * float(P_out) * 5 / 20000 ** 2
    return dict(value=value, second=second, options=[90.0, 1300.0, 1600.0, 2000.0, 18000.0, 8e7], tol=0.02)


@check("3-PH-26")
def _():
    v = F(20, 1000) * 400 / 4
    value = v ** 2 / 20
    # second: simulate the swing of a pendulum of length 2 m from the bottom at 2.0 m/s
    L, theta, omega, dt = 2.0, 0.0, 2.0 / 2.0, 1e-5
    hmax = 0.0
    for _ in range(400000):
        omega -= (10 / L) * math.sin(theta) * dt
        theta += omega * dt
        hmax = max(hmax, L * (1 - math.cos(theta)))
        if omega < 0:
            break
    return dict(value=value, second=hmax, options=[F(2, 100), F(1, 10), F(2, 10), F(4, 10), 2, 40], tol=1e-3)


@check("3-PH-27")
def _():
    a = F(30 - 5, 5)
    v = sp.sqrt(2 * a * F(16, 10))
    T = 30 - 3 * a
    value = (v, T)
    # second: energy method for the speed, block equation for the tension
    KE = 3 * 10 * 1.6 - 5 * 1.6
    v2 = math.sqrt(2 * KE / 5)
    T2 = 2 * float(a) + 5
    opts = [(4, 10), (4, 15), (4, 30), (F(44, 10), 12), (F(52, 10), 15), (F(57, 10), 30)]
    return dict(value=value, second=(v2, T2), options=opts, tol=1e-9)


# ---------------------------------------------------------------------------
# MATHEMATICS 2
# ---------------------------------------------------------------------------

X = sp.symbols("x", real=True)


@check("3-M2-01")
def _():
    r2, r3, r6 = sp.sqrt(2), sp.sqrt(3), sp.sqrt(6)
    value = sp.expand((2 * r3 + r2) * (2 * r3 - r2) - (r6 - 1) ** 2)
    # second: plain floating-point arithmetic
    a, b, c = math.sqrt(2), math.sqrt(3), math.sqrt(6)
    second = (2 * b + a) * (2 * b - a) - (c - 1) ** 2
    opts = [-3 + 2 * r6, 3 - 2 * r6, 3 + 2 * r6, 5, 17 - 2 * r6, 17 + 2 * r6]
    return dict(value=value, second=second, options=opts)


@check("3-M2-02")
def _():
    value = sp.integrate(X ** sp.Rational(1, 3) - X ** sp.Rational(-1, 3), (X, 1, 8))
    # second: Simpson's rule with many strips
    xs = np.linspace(1, 8, 200001)
    ys = np.cbrt(xs) - 1 / np.cbrt(xs)
    h = xs[1] - xs[0]
    second = float(h / 3 * (ys[0] + ys[-1] + 4 * ys[1:-1:2].sum() + 2 * ys[2:-1:2].sum()))
    return dict(value=value, second=second, options=[F(15, 4), F(21, 4), 6, F(27, 4), F(63, 4), 18])


@check("3-M2-03")
def _():
    a = sp.symbols("a")
    p = X ** 3 + a * X ** 2 - 5 * X + 2
    a0 = sp.solve(sp.Eq(p.subs(X, 2), p.subs(X, -1)), a)[0]
    value = p.subs({a: a0, X: -2})
    # second: find a by trying integers, then divide by (x + 2) and read off the remainder
    ints = [n for n in range(-50, 51) if p.subs({a: n, X: 2}) == p.subs({a: n, X: -1})]
    second = sp.rem(sp.Poly(p.subs(a, ints[0]), X), sp.Poly(X + 2, X)).as_expr() if len(ints) == 1 else None
    return dict(value=value, second=second, options=[-8, 0, 2, 8, 12, 28])


@check("3-M2-04")
def _():
    m, c = sp.symbols("m c", nonzero=True)
    csub = sp.solve(sp.Eq(-c / m, 8), c)[0]
    root = sp.solve(sp.Eq(2 * m * X + csub / 2, 0), X)[0]
    value = (sp.simplify(root), 0)
    # second: a concrete line through (8, 0), then the new line's root numerically
    mm = -0.37
    cc = -8 * mm
    second = (-(cc / 2) / (2 * mm), 0)
    opts = [(-2, 0), (2, 0), (4, 0), (8, 0), (16, 0), (32, 0)]
    return dict(value=value, second=second, options=opts)


@check("3-M2-05")
def _():
    sums, s = [], F(0)
    for n in range(1, 101):
        s += 45 - 3 * (n - 1)
        sums.append(s)
    value = max(sums)
    # second: the vertex of the quadratic S(n), then the nearest whole numbers
    n = sp.symbols("n")
    S = n / 2 * (2 * 45 + (n - 1) * (-3))
    vertex = sp.solve(sp.diff(S, n), n)[0]
    second = max(S.subs(n, sp.floor(vertex)), S.subs(n, sp.ceiling(vertex)))
    return dict(value=value, second=second, options=[F(675, 2), 351, 357, 360, F(2883, 8), 720])


@check("3-M2-06")
def _():
    s1 = sp.solve_univariate_inequality(2 * X ** 2 + 5 * X - 3 > 0, X, relational=False)
    s2 = sp.solve_univariate_inequality(3 * X - 1 < 5, X, relational=False)
    value = sp.Intersection(s1, s2)
    # second: test the defining inequalities directly on a fine grid of points
    grid = [i / 400 for i in range(-4000, 4001)]
    second = all((2 * x * x + 5 * x - 3 > 0 and 3 * x - 1 < 5) == bool(value.contains(sp.Rational(x).limit_denominator(400))) for x in grid)
    half, oo = sp.Rational(1, 2), sp.oo
    opts = [
        sp.Union(sp.Interval.open(-oo, -3), sp.Interval.open(half, 2)),
        sp.Interval.open(half, 2),
        sp.Interval.open(-oo, -3),
        sp.Interval.open(-3, half),
        sp.Union(sp.Interval.open(-oo, -3), sp.Interval.open(half, oo)),
        sp.Interval.open(-3, 2),
    ]
    return dict(value=value, second=second, options=opts)


@check("3-M2-07")
def _():
    g = lambda x: 2 ** x * 3 ** (x + 1) - 6 ** (2 * x - 1)  # noqa: E731
    # the equation is 3*6^x = 6^(2x)/6, which has exactly one root; find it by bisection
    lo, hi = 0.0, 5.0
    for _ in range(200):
        mid = (lo + hi) / 2
        if g(lo) * g(mid) <= 0:
            hi = mid
        else:
            lo = mid
    value = (lo + hi) / 2
    second = sp.log(18) / sp.log(6)
    log6 = lambda v: sp.log(v) / sp.log(6)  # noqa: E731
    opts = [-log6(2), log6(2), log6(3), 2, sp.log(6) / sp.log(18), 1 + log6(3)]
    return dict(value=value, second=second, options=opts)


@check("3-M2-08")
def _():
    k = sp.solve(sp.Eq(3 * 2 ** 2 - sp.Symbol("k"), 0))[0]
    c = sp.symbols("c")
    y = sp.integrate(3 * X ** 2 - k, X) + c
    y = y.subs(c, sp.solve(sp.Eq(y.subs(X, 0), 5), c)[0])
    others = [r for r in sp.solve(sp.diff(y, X), X) if r != 2]
    value = y.subs(X, others[0])
    # second: step from (0, 5) to x = -2 with RK4 (exact for a quadratic gradient)
    kk = 3 * 2 ** 2
    xv, yv, h = 0.0, 5.0, -0.001
    for _ in range(2000):
        k1 = 3 * xv ** 2 - kk
        k2 = 3 * (xv + h / 2) ** 2 - kk
        k4 = 3 * (xv + h) ** 2 - kk
        yv += h / 6 * (k1 + 4 * k2 + k4)
        xv += h
    return dict(value=value, second=yv, options=[-11, -3, 5, 16, 21, 37], tol=1e-9)


@check("3-M2-09")
def _():
    k = sp.symbols("k", real=True)
    expr = X ** 2 - 2 * k * X + 3 * k + 4
    xmin = sp.solve(sp.diff(expr, X), X)[0]
    m = sp.expand(expr.subs(X, xmin))
    kbest = sp.solve(sp.diff(m, k), k)[0]
    value = m.subs(k, kbest)

    # second: nested ternary searches (max over k of the min over x), purely numerical
    def inner(kv):
        lo, hi = -50.0, 50.0
        for _ in range(200):
            a_, b_ = lo + (hi - lo) / 3, hi - (hi - lo) / 3
            if a_ * a_ - 2 * kv * a_ + 3 * kv + 4 < b_ * b_ - 2 * kv * b_ + 3 * kv + 4:
                hi = b_
            else:
                lo = a_
        x = (lo + hi) / 2
        return x * x - 2 * kv * x + 3 * kv + 4

    lo, hi = -50.0, 50.0
    for _ in range(200):
        a_, b_ = lo + (hi - lo) / 3, hi - (hi - lo) / 3
        if inner(a_) < inner(b_):
            lo = a_
        else:
            hi = b_
    second = inner((lo + hi) / 2)
    return dict(value=value, second=second, options=[F(3, 2), 4, F(25, 4), F(17, 2), F(43, 4), F(25, 2)])


@check("3-M2-10")
def _():
    a, r = sp.symbols("a r")
    sols = sp.solve([sp.Eq(a * r, 12), sp.Eq(a / (1 - r), 64)], [a, r], dict=True)
    good = [s for s in sols if s[r] > sp.Rational(1, 2) and abs(s[r]) < 1]
    value = good[0][a] if len(good) == 1 else None
    # second: search rational ratios p/q directly, then check the series numerically
    found = [F(12) / F(p, q) for q in range(2, 60) for p in range(1, q) if F(p, q) > F(1, 2) and F(12) / F(p, q) / (1 - F(p, q)) == 64]
    found = sorted(set(found))
    second = None
    if len(found) == 1:
        a1, r1 = float(found[0]), 12 / float(found[0])
        total = sum(a1 * r1 ** n for n in range(4000))
        second = found[0] if abs(total - 64) < 1e-9 else None
    return dict(value=value, second=second, options=[9, 12, 16, 24, 36, 48])


@check("3-M2-11")
def _():
    O, A, B, P, Q = (0, 0), (3, 4), (4, -3), (-5, 0), (0, 5)
    assert all(abs(math.hypot(*pt) - 5) < 1e-12 for pt in (A, B, P, Q))
    s1 = abs(angle_at(O, A, B) - 90) < 1e-9
    s2 = abs(angle_at(P, A, B) - angle_at(Q, A, B)) < 1e-9
    s3 = abs(angle_at(P, A, B) - 90) < 1e-9
    value = frozenset(i for i, ok in [(1, s1), (2, s2), (3, s3)] if ok)
    # second: exact dot products, and the inscribed angle from many points of the major arc
    s1b = (A[0] * B[0] + A[1] * B[1]) == 0
    tA, tB = math.degrees(math.atan2(4, 3)), math.degrees(math.atan2(-3, 4)) + 360
    arc = [on_circle(tA + (tB - tA) * j / 50, 5) for j in range(1, 50)]
    angles = [angle_at(pt, A, B) for pt in arc]
    s2b = max(angles) - min(angles) < 1e-9 and abs(angle_at(P, A, B) - angles[0]) < 1e-9
    s3b = abs(angles[0] - 90) < 1e-9
    second = frozenset(i for i, ok in [(1, s1b), (2, s2b), (3, s3b)] if ok)
    return dict(value=value, second=second, options=STATEMENT_SETS)


@check("3-M2-12")
def _():
    value = sp.Poly(sp.expand((1 + X) ** 8 * (1 - X) ** 8), X).coeff_monomial(X ** 4)
    # second: convolution of the two coefficient lists
    second = sum(math.comb(8, i) * math.comb(8, 4 - i) * (-1) ** (4 - i) for i in range(5))
    return dict(value=value, second=second, options=[-70, -28, 0, 28, 70, 4900])


@check("3-M2-13")
def _():
    a, b = sp.symbols("a b")
    s = sp.solve([sp.Eq(a + b, 5), sp.Eq(a - 2 * b, -1)], [a, b])
    value = 2 ** s[a] - 2 ** s[b]
    # second: without logarithms, xy = 32 and x = y^2 / 2 with x, y > 0
    y = sp.symbols("y", positive=True)
    yv = sp.solve(sp.Eq(y ** 2 / 2 * y, 32), y)[0]
    second = yv ** 2 / 2 - yv
    return dict(value=value, second=second, options=[1, 4, 8, 12, 16, 32])


@check("3-M2-14")
def _():
    sols = [s for s in sp.solve(sp.Eq((X + 2) ** 2, X ** 2 + (X + 1) ** 2 - 2 * X * (X + 1) * sp.cos(2 * sp.pi / 3)), X) if s > 0]
    value = 3 * sols[0] + 3 if len(sols) == 1 else None

    # second: bisection on the largest angle, which falls from 180 to 60 degrees as x grows beyond 1
    def largest(x):
        a_, b_, c_ = x, x + 1, x + 2
        return math.degrees(math.acos((a_ * a_ + b_ * b_ - c_ * c_) / (2 * a_ * b_)))

    lo, hi = 1.000001, 100.0
    for _ in range(200):
        mid = (lo + hi) / 2
        if largest(mid) > 120:
            lo = mid
        else:
            hi = mid
    second = 3 * (lo + hi) / 2 + 3
    return dict(value=value, second=second, options=[F(3, 2), F(7, 2), F(15, 2), 9, F(21, 2), 12])


@check("3-M2-15")
def _():
    y = sp.symbols("y", real=True)
    locus = sp.expand(X ** 2 + y ** 2 - 4 * ((X - 3) ** 2 + y ** 2))
    locus = sp.expand(-locus / 3)  # x^2 + y^2 - 8x + 12
    cx = -locus.coeff(X, 1) / 2
    cy = -locus.coeff(y, 1) / 2
    const = locus.subs({X: 0, y: 0})
    value = sp.sqrt(cx ** 2 + cy ** 2 - const)
    # second: the locus meets the x-axis where |x| = 2|x - 3|, at the ends of a diameter;
    # confirm that random points of the circle through them satisfy PA = 2PB
    ends = sorted(float(s) for s in sp.solve(sp.Eq(X ** 2, 4 * (X - 3) ** 2), X))
    r = (ends[1] - ends[0]) / 2
    ctr = (ends[0] + ends[1]) / 2
    rnd = random.Random(15)
    ok = all(abs(math.hypot(ctr + r * math.cos(t), r * math.sin(t)) - 2 * math.hypot(ctr + r * math.cos(t) - 3, r * math.sin(t))) < 1e-9 for t in (rnd.uniform(0, 2 * math.pi) for _ in range(200)))
    second = r if ok else None
    opts = [1, 2, 2 * sp.sqrt(3), 4, 3 * sp.sqrt(2), 2 * sp.sqrt(7)]
    return dict(value=value, second=second, options=opts)


@check("3-M2-16")
def _():
    y = sp.sqrt(X)
    m = sp.diff(y, X).subs(X, 4)
    T = sp.solve(sp.Eq(2 + m * (X - 4), 0), X)[0]
    N = sp.solve(sp.Eq(2 - (X - 4) / m, 0), X)[0]
    value = sp.Rational(1, 2) * (N - T) * 2
    # second: numerical derivative and the shoelace formula
    h = 1e-6
    md = (math.sqrt(4 + h) - math.sqrt(4 - h)) / (2 * h)
    Tx, Nx = 4 - 2 / md, 4 + 2 * md
    pts_ = [(4, 2), (Tx, 0), (Nx, 0)]
    second = abs(sum(pts_[i][0] * pts_[(i + 1) % 3][1] - pts_[(i + 1) % 3][0] * pts_[i][1] for i in range(3))) / 2
    return dict(value=value, second=second, options=[F(15, 2), 8, F(17, 2), 9, 16, 17], tol=1e-6)


@check("3-M2-17")
def _():
    k = sp.symbols("k", real=True)
    # right arm: x = 3 + k needs x >= 3/2; left arm: x = (3 - k)/3 needs x < 3/2
    right = sp.solve_univariate_inequality(3 + k >= sp.Rational(3, 2), k, relational=False)
    left = sp.solve_univariate_inequality((3 - k) / 3 < sp.Rational(3, 2), k, relational=False)
    value = sp.Intersection(right, left)

    # second: count solutions numerically for many k by scanning x for sign changes and touch points
    def count(kv):
        f = lambda x: abs(2 * x - 3) - (x + kv)  # noqa: E731
        xs = [-40 + i * 0.01 for i in range(8001)]
        roots = set()
        for x0, x1 in zip(xs, xs[1:]):
            if f(x0) == 0:
                roots.add(round(x0, 6))
            elif f(x0) * f(x1) < 0:
                roots.add(round(x0, 2))
        if abs(f(1.5)) < 1e-12:
            roots.add(1.5)
        return len(roots)

    grid = [i / 20 for i in range(-100, 101)]
    second = all((count(kv) == 2) == bool(value.contains(sp.Rational(i, 20))) for i, kv in zip(range(-100, 101), grid))
    h, oo = sp.Rational(3, 2), sp.oo
    opts = [sp.Interval.open(-h, oo), sp.Interval.open(h, oo), sp.Interval.open(-oo, -h), sp.Interval(-h, oo), sp.Interval.open(-h, h), sp.Reals]
    return dict(value=value, second=second, options=opts)


@check("3-M2-18")
def _():
    xs = [i / 7 - 3 for i in range(43)]
    stretched = lambda x: math.cos(2 * x)  # noqa: E731  (scale factor 1/2 parallel to the x-axis)
    final = lambda x: stretched(x - math.pi / 6)  # noqa: E731  (then pi/6 to the right)
    value = tuple(final(x) for x in xs)
    fs = [
        lambda x: math.cos(2 * x - math.pi / 6),
        lambda x: math.cos(x / 2 - math.pi / 6),
        lambda x: math.cos(x / 2 - math.pi / 12),
        lambda x: math.cos(2 * x + math.pi / 3),
        lambda x: 2 * math.cos(x - math.pi / 6),
        lambda x: math.cos(2 * x - math.pi / 3),
    ]
    opts = [tuple(f(x) for x in xs) for f in fs]
    # second: map points (x, cos x) by (x, y) -> (x/2 + pi/6, y) and keep the option through all of them
    rnd = random.Random(18)
    mapped = [(x / 2 + math.pi / 6, math.cos(x)) for x in (rnd.uniform(-10, 10) for _ in range(60))]
    fits = [i for i, f in enumerate(fs) if all(abs(f(u) - v) < 1e-9 for u, v in mapped)]
    second = opts[fits[0]] if len(fits) == 1 else None
    return dict(value=value, second=second, options=opts)


@check("3-M2-19")
def _():
    y = X ** 4 - 4 * X ** 3
    d1, d2 = sp.diff(y, X), sp.diff(y, X, 2)
    pts_ = sp.solve(d1, X)

    def by_sign(x0):
        left, right = d1.subs(X, x0 - sp.Rational(1, 1000)), d1.subs(X, x0 + sp.Rational(1, 1000))
        if left < 0 < right:
            return "min"
        if left > 0 > right:
            return "max"
        return "inflection"

    value = frozenset((by_sign(p), int(p), int(y.subs(X, p))) for p in pts_)

    # second: higher-derivative test (first non-zero derivative: even order gives max/min, odd gives inflection)
    def by_derivs(x0):
        for n in range(2, 6):
            dn = sp.diff(y, X, n).subs(X, x0)
            if dn != 0:
                if n % 2:
                    return "inflection"
                return "min" if dn > 0 else "max"
        return None

    second = frozenset((by_derivs(p), int(p), int(y.subs(X, p))) for p in pts_)
    assert d2.subs(X, 0) == 0
    opts = [
        frozenset({("min", 3, -27), ("inflection", 0, 0)}),
        frozenset({("min", 3, -27), ("max", 0, 0)}),
        frozenset({("min", 3, -27)}),
        frozenset({("max", 3, -27), ("inflection", 0, 0)}),
        frozenset({("min", 0, 0), ("min", 3, -27)}),
        frozenset({("inflection", 3, -27), ("min", 0, 0)}),
    ]
    return dict(value=value, second=second, options=opts)


@check("3-M2-20")
def _():
    A = 2 * X * (12 - X ** 2)
    crit = [c for c in sp.solve(sp.diff(A, X), X) if 0 < c < 2 * sp.sqrt(3)]
    value = max(A.subs(X, c) for c in crit)
    # second: brute-force search over rectangles with corners (±x, 12 - x^2)
    second = max(2 * x * (12 - x * x) for x in (i / 100000 * 2 * math.sqrt(3) for i in range(100001)))
    return dict(value=value, second=second, options=[16, 22, 24, 32, 36, 48], tol=1e-8)


@check("3-M2-21")
def _():
    def trap(f, a, b, n=4):
        h = (b - a) / n
        return h / 2 * (f(a) + f(b) + 2 * sum(f(a + i * h) for i in range(1, n)))

    t1, i1 = trap(lambda x: 2 ** x, 0, 2), 3 / math.log(2)
    t2, i2 = trap(lambda x: x ** 3, -1, 1), 0.0
    t3, i3 = trap(math.sin, 0, math.pi), 2.0
    s1, s2, s3 = t1 > i1 + 1e-12, t2 > i2 + 1e-12, t3 < i3 - 1e-12
    value = frozenset(i for i, ok in [(1, s1), (2, s2), (3, s3)] if ok)
    # second: by the shape of each graph (sign of the second derivative on the interval),
    # with the odd function x^3 on a symmetric interval giving an exact estimate
    grid = [i / 1000 for i in range(1001)]
    c1 = all(math.log(2) ** 2 * 2 ** (2 * g) > 0 for g in grid)                  # bends up: over
    c3 = all(-math.sin(math.pi * g) <= 0 for g in grid)                          # bends down: under
    nodes = [-1, -0.5, 0, 0.5, 1]
    c2 = sum(x ** 3 for x in nodes) != 0                                           # symmetric nodes cancel
    second = frozenset(i for i, ok in [(1, c1), (2, c2), (3, c3)] if ok)
    return dict(value=value, second=second, options=STATEMENT_SETS)


F3_POINTS = [(-2, 0), (0, 2), (2, 0), (3, -1)]
TF3 = {
    "a": lambda x, y: (x + 1, 2 * y - 1),
    "b": lambda x, y: (x - 1, 2 * y - 2),
    "c": lambda x, y: (x, 2 * y - 1),
    "d": lambda x, y: (x - 1, y / 2 - 1),
    "e": lambda x, y: (x - 1, 2 * y + 1),
    "f": lambda x, y: (x - 1, 2 * y - 1),
}


def _polyline(points):
    def f(x):
        for (x0, y0), (x1, y1) in zip(points, points[1:]):
            if x0 - 1e-12 <= x <= x1 + 1e-12:
                return y0 + (y1 - y0) * (x - x0) / (x1 - x0)
        return None

    return f


@check("3-M2-22")
def _():
    f = _polyline(F3_POINTS)
    xs = [i / 8 for i in range(-40, 41)]
    g = lambda x: None if f(x + 1) is None else 2 * f(x + 1) - 1  # noqa: E731
    value = tuple(g(x) for x in xs)
    order = "afbcde"  # the order the diagrams appear in the question
    opts = [tuple(_polyline([TF3[k](*p) for p in F3_POINTS])(x) for x in xs) for k in order]
    # second: move the four corner points by (x, y) -> (x - 1, 2y - 1) and join them
    moved = [(x - 1, 2 * y - 1) for x, y in F3_POINTS]
    second = tuple(_polyline(moved)(x) for x in xs)
    return dict(value=value, second=second, options=opts)


@check("3-M2-23")
def _():
    r = sp.symbols("r", positive=True)
    rv = sp.solve(sp.Eq(r / sp.sin(sp.pi / 6) + r, 9), r)[0]
    value = sp.pi * rv ** 2 / (sp.Rational(1, 2) * 81 * sp.pi / 3)
    # second: the largest circle in the sector, found numerically. For a centre at distance d
    # along the bisector, the circle can have radius min(distance to OA, 9 - d).
    lo, hi = 0.0, 9.0
    rad = lambda d: min(d * math.sin(math.pi / 6), 9 - d)  # noqa: E731
    for _ in range(300):
        a_, b_ = lo + (hi - lo) / 3, hi - (hi - lo) / 3
        if rad(a_) < rad(b_):
            lo = a_
        else:
            hi = b_
    rr = rad((lo + hi) / 2)
    second = math.pi * rr ** 2 / (0.5 * 81 * math.pi / 3)
    return dict(value=value, second=second, options=[F(1, 9), F(1, 3), F(4, 9), F(1, 2), F(2, 3), F(3, 4)], tol=1e-9)


@check("3-M2-24")
def _():
    sols = sp.solveset(sp.sin(2 * X + sp.pi / 3) ** 2 - sp.Rational(1, 2), X, sp.Interval(0, sp.pi))
    value = sp.nsimplify(sum(sols))
    # second: scan for sign changes and refine each root by bisection
    g = lambda x: math.sin(2 * x + math.pi / 3) ** 2 - 0.5  # noqa: E731
    n = 20000
    xs = [math.pi * i / n for i in range(n + 1)]
    roots = []
    for x0, x1 in zip(xs, xs[1:]):
        if g(x0) * g(x1) < 0:
            lo, hi = x0, x1
            for _ in range(100):
                mid = (lo + hi) / 2
                if g(lo) * g(mid) <= 0:
                    hi = mid
                else:
                    lo = mid
            roots.append((lo + hi) / 2)
    second = sum(roots) if len(roots) == 4 else None
    pi = sp.pi
    opts = [7 * pi / 6, 11 * pi / 8, 5 * pi / 3, 7 * pi / 3, 3 * pi, 4 * pi]
    return dict(value=value, second=second, options=opts)


@check("3-M2-25")
def _():
    k = sp.symbols("k", positive=True)
    total = sp.integrate(2 * X - X ** 2, (X, 0, 2))
    upper = sp.integrate(2 * X - X ** 2 - k * X, (X, 0, 2 - k))
    sols = [s for s in sp.solve(sp.Eq(upper, total / 2), k) if s.is_real and 0 < s < 2]
    value = sols[0] if len(sols) == 1 else None

    # second: numerical integration of the part above the line, and bisection on k
    def above(kv):
        b = 2 - kv
        xs = np.linspace(0, b, 20001)
        ys = 2 * xs - xs ** 2 - kv * xs
        h = xs[1] - xs[0]
        return float(h / 3 * (ys[0] + ys[-1] + 4 * ys[1:-1:2].sum() + 2 * ys[2:-1:2].sum()))

    lo, hi = 0.0, 2.0
    for _ in range(100):
        mid = (lo + hi) / 2
        if above(mid) > 2 / 3:
            lo = mid
        else:
            hi = mid
    second = (lo + hi) / 2
    opts = [F(2, 3), 2 - sp.root(4, 3), 2 - sp.root(2, 3), 2 - sp.sqrt(2), 1, sp.root(4, 3)]
    return dict(value=value, second=second, options=opts, tol=1e-9)


@check("3-M2-26")
def _():
    k = sp.symbols("k")
    G = X ** 3 - 3 * X ** 2 + k
    kv = sp.solve(sp.Eq(G.subs(X, 2), 0), k)[0]
    f = sp.diff(G.subs(k, kv), X)
    value = f.subs(X, kv)
    # second: assume f(t) = p t^2 + q t + r and match coefficients of the integral for every x
    p, q, r, t = sp.symbols("p q r t")
    integral = sp.integrate(p * t ** 2 + q * t + r, (t, 2, X))
    coeffs = sp.Poly(sp.expand(integral - G), X).all_coeffs()
    sol = sp.solve(coeffs, [p, q, r, k], dict=True)[0]
    second = (sol[p] * t ** 2 + sol[q] * t + sol[r]).subs(t, sol[k])
    return dict(value=value, second=second, options=[0, 4, 9, 20, 24, 72])


@check("3-M2-27")
def _():
    a, t = sp.symbols("a t", real=True)
    tangent_at = (3 * t ** 2 - 3) * (a - t) + t ** 3 - 3 * t      # = 0 when the tangent at t passes through (a, 0)
    h = sp.expand(-tangent_at)
    assert sp.expand(h - (2 * t ** 3 - 3 * a * t ** 2 + 3 * a)) == 0
    disc = sp.discriminant(h, t)                                      # > 0 exactly when three distinct real roots
    value = sp.solve_univariate_inequality(disc > 0, a, relational=False)

    # second: count distinct tangent lines numerically for many values of a
    def tangents(av):
        roots = np.roots([2, -3 * av, 0, 3 * av])
        real = sorted(r.real for r in roots if abs(r.imag) < 1e-7)
        lines = []
        for tt in real:
            m, c = 3 * tt * tt - 3, -(3 * tt * tt - 3) * tt + tt ** 3 - 3 * tt
            if all(abs(m - m2) > 1e-6 or abs(c - c2) > 1e-6 for m2, c2 in lines):
                lines.append((m, c))
        return len(lines)

    grid = [i / 50 for i in range(-250, 251)]
    second = all((tangents(av) == 3) == bool(value.contains(sp.Rational(i, 50))) for i, av in zip(range(-250, 251), grid))
    s3, oo = sp.sqrt(3), sp.oo
    opts = [
        sp.Union(sp.Interval.open(-oo, -s3), sp.Interval.open(s3, oo)),
        sp.Union(sp.Interval.open(-s3, 0), sp.Interval.open(0, s3)),
        sp.Interval.open(s3, oo),
        sp.Union(sp.Interval(-oo, -s3), sp.Interval(s3, oo)),
        sp.Union(sp.Interval.open(-oo, -3), sp.Interval.open(3, oo)),
        sp.Union(sp.Interval.open(-oo, 0), sp.Interval.open(0, oo)),
    ]
    return dict(value=value, second=second, options=opts)
