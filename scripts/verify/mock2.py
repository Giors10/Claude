"""Checks for Mock 2 (Forge): ids 2-M1-01 … 2-M2-27."""
# ruff: noqa: F403, F405
from .common import *

# ---------------------------------------------------------------------------
# MATHEMATICS 1
# ---------------------------------------------------------------------------


@check("2-M1-01")
def _():
    # (cost in pence, mass in grams) for each way of buying
    buys = [(126, 500), (165, 750), (230, 1000), (1075, 5000), (2 * 126, 1500), (230 + 115, 2000)]
    per_kg = [F(c, 100) / F(g, 1000) for c, g in buys]
    value = min(per_kg)
    # second: cost of 30 kg bought entirely each way (30 kg is a whole number of every bundle)
    second = min(F(c, 100) * F(30000, g) for c, g in buys) / 30
    return dict(value=value, second=second, options=per_kg)


@check("2-M1-02")
def _():
    num = F(9, 4) - 3 * F(-1, 2) ** 2
    den = F(3, 2) - F(3, 4) / F(-1, 2)
    value = num / den
    second = sp.sympify("(9/4 - 3*(-1/2)**2)/(3/2 - (3/4)/(-1/2))", rational=True)
    return dict(value=value, second=second, options=[-1, 0, F(1, 2), F(4, 5), 1, 2])


@check("2-M1-03")
def _():
    km_per_cm = F(25000, 100 * 1000)
    value = 12 * km_per_cm ** 2
    second = F(12 * 250 ** 2, 10 ** 6)  # in m^2, then to km^2
    return dict(value=value, second=second, options=[F(3, 100), F(75, 1000), F(3, 10), F(3, 4), 3, F(15, 2)])


@check("2-M1-04")
def _():
    value = sp.sqrt(sp.Rational(640000)) * sp.Rational(125) ** sp.Rational(-2, 3) / sp.Rational(4, 100)
    second = math.sqrt(6.4e5) * 125 ** (-2 / 3) / 4e-2
    return dict(value=sp.nsimplify(value), second=second, options=[F(8, 100), F(128, 100), 32, 800, 4000, 500000])


@check("2-M1-05")
def _():
    u, f = sp.symbols("u f", positive=True)
    v = sp.solve(sp.Eq(1 / f, 1 / u + 1 / sp.Symbol("v")), sp.Symbol("v"))[0]
    value = sp.simplify(v / u)
    ok = []
    for uv, fv in [(3.0, 1.0), (7.5, 2.0), (1.2, 1.0)]:
        m = fv / (uv - fv)
        vv = m * uv
        ok.append(abs(1 / fv - (1 / uv + 1 / vv)) < 1e-12)
    opts = [f / (u - f), f / (f - u), u / (u - f), (u - f) / f, u * f / (u - f), f / (u + f)]
    return dict(value=value, second=all(ok), options=opts)


@check("2-M1-06")
def _():
    walkers = F(105, 360) * 240
    value = walkers / 300 * 360
    second = F(105) * F(240, 300)
    return dict(value=value, second=second, options=[70, 84, F(175, 2), 105, 126, 156])


@check("2-M1-07")
def _():
    value = F(3, 5) * F(5, 9) + F(3, 4) * F(4, 9)
    boys, girls = 500, 400
    second = F(boys * 3 // 5 + girls * 3 // 4, boys + girls)
    return dict(value=value, second=second, options=[F(9, 20), F(1, 2), F(5, 9), F(3, 5), F(2, 3), F(27, 40)])


@check("2-M1-08")
def _():
    x, k = sp.symbols("x k")
    y = 2 * x ** 2 - 12 * x + k
    xt = sp.solve(sp.diff(y, x), x)[0]
    value = sp.solve(sp.Eq(y.subs(x, xt), xt), k)[0]
    # second: completed square form 2(x-3)^2 + (k-18) must equal y, then k - 18 = 3
    kk = [kv for kv in range(-50, 51) if sp.expand(2 * (x - 3) ** 2 + kv - 18 - y.subs(k, kv)) == 0 and kv - 18 == 3]
    return dict(value=value, second=kk[0], options=[-15, 6, 12, 15, 18, 21])


@check("2-M1-09")
def _():
    angles = [0, 30, 60, 90, 120, 180, 240, 270, 300, 360]
    c = lambda d: math.cos(math.radians(d))  # noqa: E731
    s = lambda d: math.sin(math.radians(d))  # noqa: E731
    target = lambda d: 1 - 2 * c(d)  # the function drawn in the diagram  # noqa: E731
    fs = [lambda d: 2 * c(d) - 1, lambda d: 1 - 2 * c(d), lambda d: 1 + 2 * c(d), lambda d: 1 - 2 * s(d), lambda d: 2 - c(d), lambda d: 1 - c(2 * d)]
    value = tuple(round(target(d), 9) for d in angles)
    opts = [tuple(round(g(d), 9) for d in angles) for g in fs]
    # second: the features read from the graph: y(0) = -1, max 3 at 180, zeros at 60 and 300
    grid = [target(d / 10) for d in range(0, 3601)]
    second = abs(grid[0] + 1) < 1e-9 and abs(max(grid) - 3) < 1e-9 and grid.index(max(grid)) == 1800 and abs(target(60)) < 1e-9 and abs(target(300)) < 1e-9
    return dict(value=value, second=second, options=opts)


@check("2-M1-10")
def _():
    g = sp.symbols("g")
    gv = sp.solve(sp.Rational(1, 4) + 2 * g + g + g + sp.Rational(1, 20) - 1, g)[0]
    value = 400 * 2 * gv
    # second: scan g in steps of 1/1000 for the probabilities summing to 1
    second = next(400 * 2 * F(i, 1000) for i in range(1001) if F(1, 4) + 4 * F(i, 1000) + F(1, 20) == 1)
    return dict(value=value, second=second, options=[70, 90, 100, 120, 140, 150])


@check("2-M1-11")
def _():
    x, y = sp.symbols("x y", positive=True)
    expr = (27 * x ** 6 * y ** -3) ** sp.Rational(-2, 3) * (9 * x ** 2 * y) ** sp.Rational(1, 2)
    value = sp.simplify(expr)
    xv, yv = 1.7, 2.9
    second = (27 * xv ** 6 * yv ** -3) ** (-2 / 3) * (9 * xv ** 2 * yv) ** 0.5 / (yv ** 2.5 / (3 * xv ** 3))
    opts = [y ** sp.Rational(5, 2) / (3 * x ** 3), y ** sp.Rational(5, 2) / x ** 3, y ** sp.Rational(5, 2) / (9 * x ** 3),
            y ** sp.Rational(5, 2) / (3 * x ** 4), 1 / (3 * x ** 3 * y ** sp.Rational(3, 2)), 27 * x ** 5 / y ** sp.Rational(3, 2)]
    return dict(value=value, second=abs(second - 1) < 1e-12, options=opts)


@check("2-M1-12")
def _():
    vals = {"p": sp.Rational(5, 7), "q": sp.Rational(64, 90), "r": sp.Rational(71, 99), "s": sp.Rational(12, 17), "t": 1 / sp.sqrt(2)}
    assert sp.Rational(64, 90) == sp.Rational(7, 10) + sp.Rational(1, 90)  # 0.7111...
    value = "<".join(sorted(vals, key=lambda k: float(sp.N(vals[k], 50))))
    # second: exact pairwise comparisons (squares for the surd), then a sort by comparison count
    def less(a, b):
        return sp.simplify(vals[a] ** 2 - vals[b] ** 2) < 0  # all positive, so compare squares
    names = list(vals)
    rank = {a: sum(1 for b in names if b != a and less(b, a)) for a in names}
    second = "<".join(sorted(names, key=lambda a: rank[a]))
    opts = ["t<s<q<p<r", "s<t<q<p<r", "s<q<t<p<r", "s<t<p<q<r", "s<t<r<p<q", "t<s<p<q<r"]
    return dict(value=value, second=second, options=opts)


@check("2-M1-13")
def _():
    x, y = sp.symbols("x y")
    L1 = sp.Eq(x - 2 * y, 2)
    m1 = sp.Rational(1, 2)
    m2 = -1 / m1
    L2 = sp.Eq(y - 2, m2 * (x + 1))
    X = sp.solve([L1, L2], [x, y])
    P = (X[x], X[y])
    A = (0, sp.solve(L1.subs(x, 0), y)[0])
    B = (0, sp.solve(L2.subs(x, 0), y)[0])
    shoelace = sp.Abs(P[0] * (A[1] - B[1]) + A[0] * (B[1] - P[1]) + B[0] * (P[1] - A[1])) / 2
    second = F(1, 2) * abs(A[1] - B[1]) * abs(P[0])
    return dict(value=shoelace, second=second, options=[F(1, 5), F(2, 5), F(4, 5), 1, F(25, 8), F(25, 3)])


@check("2-M1-14")
def _():
    value = 9 * 8 + 8 * 8
    second = sum(1 for n in range(100, 1000) if n % 5 == 0 and len(set(str(n))) == 3)
    return dict(value=value, second=second, options=[72, 128, 136, 144, 162, 180])


@check("2-M1-15")
def _():
    value = F(13872) / (F(8, 10) * F(85, 100) ** 2)
    v = F(13872)
    for m in [F(85, 100), F(85, 100), F(8, 10)]:
        v /= m
    return dict(value=value, second=v, options=[20400, 22015, 22588, 24000, 24771, 27744])


@check("2-M1-16")
def _():
    x = sp.symbols("x")
    stmts = {
        1: ((x + 3) ** 2 - (x - 3) ** 2, 12 * x),
        2: ((2 * x - 1) * (x + 4) - (x + 2) ** 2, x ** 2 + 3 * x - 6),
        3: (x * (x + 1) * (x + 2) - (x + 1) ** 3, -x - 1),
    }
    value = frozenset(i for i, (a, b) in stmts.items() if sp.expand(a - b) == 0)
    rnd = random.Random(1)
    pts_ = [F(rnd.randint(-99, 99), rnd.randint(1, 9)) for _ in range(12)]
    second = frozenset(i for i, (a, b) in stmts.items() if all(a.subs(x, p) == b.subs(x, p) for p in pts_))
    return dict(value=value, second=second, options=STATEMENT_SETS)


@check("2-M1-17")
def _():
    def leg(d, bearing):
        return sp.Matrix([d * sp.sin(sp.rad(bearing)), d * sp.cos(sp.rad(bearing))])  # (east, north)
    end = leg(10, 60) + leg(10 * sp.sqrt(3), 150)
    dist = sp.sqrt(sp.simplify(end.dot(end)))
    back = -end
    bearing = (math.degrees(math.atan2(float(back[0]), float(back[1]))) + 360) % 360
    value = (sp.nsimplify(dist), bearing)
    z = 10 * complex(math.sin(math.radians(60)), math.cos(math.radians(60))) + 10 * math.sqrt(3) * complex(math.sin(math.radians(150)), math.cos(math.radians(150)))
    second = (abs(z), (math.degrees(math.atan2(-z.real, -z.imag)) + 360) % 360)
    r3 = 10 + 10 * sp.sqrt(3)
    opts = [(20, 120.0), (20, 240.0), (20, 270.0), (r3, 120.0), (20, 300.0), (r3, 300.0)]
    return dict(value=value, second=second, options=opts, tol=1e-9)


@check("2-M1-18")
def _():
    m = sp.symbols("m")
    msq = sp.solve(sp.Eq(3 * m ** 2 + 8, 515), m)
    value = msq[0] ** 2 - 4
    prods = {(n - 2) * (n + 2) for n in range(-101, 102, 2) if (n - 2) ** 2 + n ** 2 + (n + 2) ** 2 == 515}
    assert len(prods) == 1
    return dict(value=value, second=prods.pop(), options=[143, 165, 168, 169, 195, 2145])


@check("2-M1-19")
def _():
    a, b = sp.symbols("a b")
    sol = sp.solve([a + b - 9, a + 3 * b + 23 - 42], [a, b])
    freq = {0: 3, 1: sol[a], 2: 5, 3: sol[b], 4: 2, 5: 1}
    mean = F(sum(k * v for k, v in freq.items()), 20)
    value = F(sum(v for k, v in freq.items() if k > mean), 20)
    found = [(aa, bb) for aa in range(21) for bb in range(21) if 3 + aa + 5 + bb + 2 + 1 == 20 and aa + 10 + 3 * bb + 8 + 5 == 42]
    aa, bb = found[0]
    second = F(bb + 2 + 1, 20)
    return dict(value=value, second=second, options=[F(3, 10), F(7, 20), F(2, 5), F(9, 20), F(1, 2), F(13, 20)])


@check("2-M1-20")
def _():
    k = sp.symbols("k")
    u = sp.Integer(2)
    for _ in range(2):
        u = k * u + 3
    roots = sp.solve(sp.Eq(u, 23), k)
    value = sum(roots)
    # second: scan for sign changes of u3(k) - 23 and refine each root by bisection
    g = lambda kv: kv * (kv * 2 + 3) + 3 - 23  # noqa: E731
    found = []
    xs = [i / 100 for i in range(-1000, 1001)]
    for x0, x1 in zip(xs, xs[1:]):
        if g(x0) == 0:
            found.append(x0)
        elif g(x0) * g(x1) < 0:
            lo, hi = x0, x1
            for _ in range(80):
                mid = (lo + hi) / 2
                lo, hi = (mid, hi) if g(lo) * g(mid) > 0 else (lo, mid)
            found.append((lo + hi) / 2)
    return dict(value=value, second=sum(found), options=[-10, -4, F(-3, 2), F(3, 2), F(5, 2), F(13, 2)])


@check("2-M1-21")
def _():
    # 1: a kite with equal perpendicular diagonals that is not a square
    A, B, C, D = (-1, 0), (0, 0.5), (1, 0), (0, -1.5)
    diag_equal = math.dist(A, C) == math.dist(B, D)
    diag_perp = (C[0] - A[0]) * (D[0] - B[0]) + (C[1] - A[1]) * (D[1] - B[1]) == 0
    sides = [math.dist(A, B), math.dist(B, C), math.dist(C, D), math.dist(D, A)]
    s1 = not (diag_equal and diag_perp and len({round(v, 9) for v in sides}) != 1)
    # 2: an isosceles trapezium has one pair of parallel sides, the other pair equal, and is not a parallelogram
    P, Q, R, S = (0, 0), (6, 0), (4, 3), (2, 3)
    s2 = not (math.isclose(math.dist(Q, R), math.dist(S, P)) and (R[1] - S[1]) == 0 and (Q[0] - P[0]) != (R[0] - S[0]))
    # 3: parallelogram with sides a, b: |a+b|^2 - |a-b|^2 = 4 a.b, so equal diagonals force a.b = 0
    a1, a2, b1, b2 = sp.symbols("a1 a2 b1 b2", real=True)
    s3 = sp.expand((a1 + b1) ** 2 + (a2 + b2) ** 2 - (a1 - b1) ** 2 - (a2 - b2) ** 2 - 4 * (a1 * b1 + a2 * b2)) == 0
    value = frozenset(i for i, ok in [(1, s1), (2, s2), (3, s3)] if ok)
    # second: random parallelograms with equal diagonals are always rectangles; random kites break 1 and trapezia break 2
    rnd = random.Random(7)
    rect_ok = True
    for _ in range(200):
        ax, ay = rnd.uniform(-5, 5), rnd.uniform(-5, 5)
        t_ = rnd.uniform(0.2, 3)
        bx, by = -ay * t_, ax * t_  # b perpendicular to a is the only way to get equal diagonals
        if not math.isclose(math.hypot(ax + bx, ay + by), math.hypot(ax - bx, ay - by), rel_tol=1e-9):
            rect_ok = False
    second = frozenset({3}) if rect_ok and not s1 and not s2 else None
    return dict(value=value, second=second, options=STATEMENT_SETS)


@check("2-M1-22")
def _():
    value = 0
    for y in range(1, 7):
        lo = math.floor((y - 1) / 2) + 1  # smallest integer x with x > (y-1)/2
        hi = 6 - y
        value += max(0, hi - lo + 1)
    second = sum(1 for x in range(-20, 21) for y in range(-20, 21) if y < 2 * x + 1 and x + y <= 6 and y >= 1)
    return dict(value=value, second=second, options=[7, 8, 10, 12, 14, 15])


@check("2-M1-23")
def _():
    value = 180 - 105 - 38
    # second: the diagram's points on a circle (arcs AB 76, BC 110, CD 100, DA 74)
    A, B, C, D = on_circle(110), on_circle(34), on_circle(-76), on_circle(184)
    assert abs(angle_at(A, B, D) - 105) < 1e-9 and abs(angle_at(D, A, B) - 38) < 1e-9
    second = angle_at(C, A, D)
    return dict(value=value, second=second, options=[37, 38, 43, 52, 67, 75], tol=1e-9)


@check("2-M1-24")
def _():
    h = sp.symbols("h", positive=True)
    width = 40 + sp.Rational(4, 3) * h
    area = (40 + width) / 2 * h
    value = sp.solve(sp.Eq(area * 100, 75000), h)[0]
    # second: numerically integrate the surface width over depth and bisect for 750 cm^2
    def water(hv, n=2000):
        return sum((40 + 4 / 3 * (i + 0.5) * hv / n) for i in range(n)) * hv / n
    lo, hi = 0.0, 30.0
    for _ in range(60):
        mid = (lo + hi) / 2
        lo, hi = (mid, hi) if water(mid) < 750 else (lo, mid)
    return dict(value=value, second=(lo + hi) / 2, options=[F(75, 8), F(25, 2), 15, F(75, 4), 20, F(45, 2)])


@check("2-M1-25")
def _():
    front = [2, 3, 1]   # tallest column in the left, middle, right positions
    side = [3, 2]       # tallest column in the front row, back row
    best_min, best_max = None, None
    cells = [(i, j) for i in range(3) for j in range(2)]
    for hs in product(*[range(1, 4) for _ in cells]):
        h = dict(zip(cells, hs))
        if all(max(h[(i, j)] for j in range(2)) == front[i] for i in range(3)) and all(max(h[(i, j)] for i in range(3)) == side[j] for j in range(2)):
            tot = sum(hs)
            best_min = tot if best_min is None else min(best_min, tot)
            best_max = tot if best_max is None else max(best_max, tot)
    assert best_max == 11
    value = 6 + 2 + 1
    return dict(value=value, second=best_min, options=[6, 7, 8, 9, 10, 11])


@check("2-M1-26")
def _():
    # intervals as (low, low included?, high, high included?)
    X = (F(736, 100), True, F(737, 100), False)   # truncated to 7.36
    Y = (F(235, 100), True, F(245, 100), False)   # rounded to 2.4
    value = (X[0] - Y[2], X[1] and Y[3], X[2] - Y[0], X[3] and Y[1])
    # second: exact sampling on a fine grid approaches but never reaches either end
    step = F(1, 10 ** 5)
    xs = [X[0] + i * step for i in range(0, 1000)]          # 7.36 <= x < 7.37
    ys = [Y[0] + j * step for j in range(0, 10000)]         # 2.35 <= y < 2.45
    lo = min(xs) - max(ys)
    hi = max(xs) - min(ys)
    second = value if (lo > value[0] and lo - value[0] <= 2 * step and hi < value[2] and value[2] - hi <= 2 * step) else None
    T, Fa = True, False
    opts = [
        (F(4905, 1000), Fa, F(5015, 1000), Fa),
        (F(491, 100), T, F(502, 100), Fa),
        (F(491, 100), Fa, F(502, 100), Fa),
        (F(491, 100), Fa, F(502, 100), T),
        (F(491, 100), T, F(502, 100), T),
        (F(492, 100), Fa, F(501, 100), Fa),
    ]
    return dict(value=value, second=second, options=opts)


@check("2-M1-27")
def _():
    value = F(216 - (27 + 64 - 8), 216)
    count = sum(1 for a, b, c in product(range(1, 7), repeat=3) if (a * b * c) % 6 == 0)
    return dict(value=value, second=F(count, 216), options=[F(5, 12), F(91, 216), F(1, 2), F(13, 24), F(125, 216), F(133, 216)])


# ---------------------------------------------------------------------------
# PHYSICS
# ---------------------------------------------------------------------------


@check("2-PH-01")
def _():
    R = [F(4), F(6), F(14)]
    I = F(12) / sum(R)
    value = (I * R[1]) * I * 120                      # E = VIt
    second = I ** 2 * R[1] * 120                      # E = I^2 R t
    return dict(value=value, second=second, options=[3, 90, 180, 420, 720, 2880])


@check("2-PH-02")
def _():
    Z, A, q = 26, 56, 3
    value = (Z, A - Z, Z - q)
    # second: count particles from a charge balance: protons - electrons = +3
    e = next(n for n in range(0, 60) if Z - n == q)
    opts = [(26, 30, 23), (26, 30, 26), (26, 30, 29), (26, 56, 23), (30, 26, 23), (23, 33, 23)]
    return dict(value=value, second=(Z, A - Z, e), options=opts)


@check("2-PH-03")
def _():
    v, t, f = 1500, F(40, 100), 40000
    depth = v * t / 2
    value = (depth, 20 <= f <= 20000)
    # second: simulate the echo time for candidate depths in 1 m steps
    d = next(dd for dd in range(0, 5000) if F(2 * dd, v) == t)
    opts = [(300, True), (300, False), (600, True), (600, False), (150, False), (3750, False)]
    return dict(value=value, second=(d, f <= 20000), options=opts)


WAVES = {"light": "transverse", "water ripples": "transverse", "sound": "longitudinal"}


@check("2-PH-04")
def _():
    s1 = True   # waves transfer energy, not matter (definition)
    s2 = all(WAVES[w] == "transverse" for w in ["light", "water ripples", "sound"])
    s3 = True   # compression = particles closer together; rarefaction = further apart
    value = frozenset(i for i, ok in [(1, s1), (2, s2), (3, s3)] if ok)
    # second: a longitudinal wave's particle displacement model: density high where displacement gradient is negative
    xs = [i / 100 for i in range(200)]
    disp = [0.1 * math.sin(2 * math.pi * x) for x in xs]
    dens = [1 - (disp[i + 1] - disp[i]) / 0.01 for i in range(len(xs) - 1)]
    comp = max(range(len(dens)), key=lambda i: dens[i])
    rare = min(range(len(dens)), key=lambda i: dens[i])
    s3b = dens[comp] > 1 > dens[rare]
    second = frozenset(i for i, ok in [(1, True), (2, WAVES["sound"] == "transverse"), (3, s3b)] if ok)
    return dict(value=value, second=second, options=STATEMENT_SETS)


@check("2-PH-05")
def _():
    C, laps, T = 400, sp.Rational(3, 2), 100
    r = C / (2 * sp.pi)
    speed = C * laps / T
    disp = 2 * r * sp.sin(sp.pi * laps)  # chord for angle 2*pi*laps: 2 r sin(theta/2)
    value = (speed, sp.simplify(sp.Abs(disp) / T))
    # second: step along the circle numerically
    n = 60000
    rr = float(r)
    x = y = 0.0
    th = 0.0
    dist = 0.0
    for _ in range(n):
        th2 = th + 2 * math.pi * 1.5 / n
        nx, ny = rr * math.sin(th2), rr - rr * math.cos(th2)
        dist += math.hypot(nx - x, ny - y)
        x, y, th = nx, ny, th2
    second = (dist / T, math.hypot(x, y) / T)
    pi = sp.pi
    opts = [(6, 0), (6, 2), (6, 2 / pi), (4, 4 / pi), (6, 6), (6, 4 / pi)]
    return dict(value=value, second=second, options=opts, tol=1e-6)


DIRS = {"north": (0, 1), "north-east": (1, 1), "east": (1, 0), "south": (0, -1), "south-west": (-1, -1), "west": (-1, 0)}


def _named(vec):
    ang = math.atan2(vec[1], vec[0])
    return min(DIRS, key=lambda k: abs(math.atan2(DIRS[k][1], DIRS[k][0]) - ang))


@check("2-PH-06")
def _():
    # B is along I x r_hat (right-hand grip): current up (+z), compass due west (r_hat = -x)
    I = sp.Matrix([0, 0, 1])
    rhat = sp.Matrix([-1, 0, 0])
    B = I.cross(rhat)
    value = _named((float(B[0]), float(B[1])))
    # second: Biot-Savart sum over a long wire along z through the origin, field point at (-1, 0, 0)
    P = (-1.0, 0.0, 0.0)
    Bx = By = 0.0
    for k in range(-20000, 20000):
        z = k * 0.005
        dl = (0.0, 0.0, 0.005)
        rv = (P[0], P[1], P[2] - z)
        rm = math.sqrt(rv[0] ** 2 + rv[1] ** 2 + rv[2] ** 2)
        cx = dl[1] * rv[2] - dl[2] * rv[1]
        cy = dl[2] * rv[0] - dl[0] * rv[2]
        Bx += cx / rm ** 3
        By += cy / rm ** 3
    return dict(value=value, second=_named((Bx, By)), options=list(DIRS))


@check("2-PH-07")
def _():
    v, T = 12, F(1, 4)
    value = (1 / T, v * T)
    # second: find the period of the plotted curve 2cos(2*pi*t/0.25) from its peaks
    ts = [i / 10000 for i in range(10001)]
    ys = [2 * math.cos(2 * math.pi * t / 0.25) for t in ts]
    peaks = [ts[i] for i in range(1, len(ts) - 1) if ys[i] >= ys[i - 1] and ys[i] >= ys[i + 1]]
    per = (peaks[-1] - peaks[0]) / (len(peaks) - 1)
    second = (1 / per, v / (1 / per))
    opts = [(F(1, 4), 48), (2, 6), (4, F(1, 3)), (4, 3), (4, 48), (8, F(3, 2))]
    return dict(value=value, second=second, options=opts, tol=1e-6)


@check("2-PH-08")
def _():
    Np, Ns, Vp, P = 2000, 100, 230, 46
    Vs = F(Vp * Ns, Np)
    value = (Vs, F(P, Vp))
    Is = F(P) / Vs
    second = (Vs, Is * F(Ns, Np))  # currents scale inversely with the turns ratio
    opts = [(F(23, 2), F(1, 5)), (F(23, 2), 4), (F(23, 2), 80), (4600, F(1, 5)), (4600, F(1, 100)), (F(23, 2), F(1, 100))]
    return dict(value=value, second=second, options=opts)


RADIATION = {
    "alpha": {"charge": 2, "ionising_rank": 1, "stopped_by": "paper"},
    "beta": {"charge": -1, "ionising_rank": 2, "stopped_by": "aluminium", "is": "electron from nucleus"},
    "gamma": {"charge": 0, "ionising_rank": 3, "stopped_by": "thick lead"},
}


@check("2-PH-09")
def _():
    s1 = RADIATION["alpha"]["ionising_rank"] == 1 and RADIATION["alpha"]["stopped_by"] == "paper"
    s2 = RADIATION["beta"]["is"] == "electron from nucleus"
    s3 = RADIATION["gamma"]["charge"] != 0
    value = frozenset(i for i, ok in [(1, s1), (2, s2), (3, s3)] if ok)
    # second: force on a moving charge q v B: zero for gamma
    second = frozenset(i for i, ok in [(1, True), (2, True), (3, abs(RADIATION["gamma"]["charge"] * 1.0 * 1.0) > 0)] if ok)
    return dict(value=value, second=second, options=STATEMENT_SETS)


@check("2-PH-10")
def _():
    # positive terminal at the bottom: conventional current flows UP through the branches
    branches = {"P": ["down"], "Q": ["up"], "R": ["up", "down"]}
    lit = {name for name, diodes in branches.items() if all(d == "up" for d in diodes)}
    if lit:
        lit.add("S")
    value = frozenset(lit)
    # second: potentials: bottom node at +V, top node at 0; a diode conducts only if its anode is higher than its cathode
    def conducts(d, v_bottom=1.0, v_top=0.0):
        anode, cathode = (v_bottom, v_top) if d == "up" else (v_top, v_bottom)
        return anode > cathode
    lit2 = {n for n, ds in branches.items() if all(conducts(d) for d in ds)}
    second = frozenset(lit2 | ({"S"} if lit2 else set()))
    opts = [frozenset("PS"), frozenset("QS"), frozenset("Q"), frozenset("QRS"), frozenset("PQS"), frozenset()]
    return dict(value=value, second=second, options=opts)


@check("2-PH-11")
def _():
    m, g, h, t, Pin = 40, 10, 6, 12, 250
    useful = m * g * h
    value = (F(useful, Pin * t), Pin * t - useful)
    P_useful = F(m * g * h, t)
    second = (P_useful / Pin, (Pin - P_useful) * t)
    opts = [(F(1, 5), 600), (F(4, 5), 600), (F(4, 5), 50), (F(4, 5), 2400), (F(4, 5), 3000), (F(5, 4), 600)]
    return dict(value=value, second=second, options=opts)


@check("2-PH-12")
def _():
    mobile = {"electrons"}  # only electrons transfer when insulators are rubbed
    s1 = "positive charges" in mobile
    # 2: neutral paper near a negative rod: induced dipole, net force towards the rod (1/r^2 falls with distance)
    q, d, sep = -1.0, 1.0, 0.1
    force = -q * q / d ** 2 + q * q / (d + sep) ** 2   # attraction on the near (+) side, repulsion on the far (-) side
    s2 = force < 0
    s3 = True  # earthing lets built-up charge flow away (safety application)
    value = frozenset(i for i, ok in [(1, s1), (2, s2), (3, s3)] if ok)
    second = frozenset({2, 3}) if (not s1 and abs(-1 / d ** 2) > abs(1 / (d + sep) ** 2)) else None
    return dict(value=value, second=second, options=STATEMENT_SETS)


@check("2-PH-13")
def _():
    g = F(5, 2)  # W / m = 5.0 / 2.0
    u = 10
    value = (F(u * u) / (2 * g), 2 * u / g)
    # second: step the motion numerically
    dt = 1e-5
    y, v, tt, ymax = 0.0, 10.0, 0.0, 0.0
    while True:
        v -= 2.5 * dt
        y += v * dt
        tt += dt
        ymax = max(ymax, y)
        if y < 0:
            break
    opts = [(5, 2), (10, 4), (20, 4), (40, 4), (40, 8), (20, 8)]
    return dict(value=value, second=(ymax, tt), options=opts, tol=1e-3)


@check("2-PH-14")
def _():
    conduction_mechanism = "free electrons"
    s1 = conduction_mechanism == "close packing"
    rho = lambda T: 1000 * (1 - 0.0003 * (T - 20))  # water density falls as it warms (above 4 degC)  # noqa: E731
    s2 = rho(80) < rho(20)
    s3 = True  # infrared is electromagnetic and needs no medium
    value = frozenset(i for i, ok in [(1, s1), (2, s2), (3, s3)] if ok)
    second = frozenset({2, 3}) if (not s1 and rho(90) < rho(30)) else None
    return dict(value=value, second=second, options=STATEMENT_SETS)


@check("2-PH-15")
def _():
    V, rho, g = F(8, 1000), 4000, 10
    W = rho * V * g
    A1, A2 = W / 16000, W / 4000
    A3 = V ** 2 / (A1 * A2)
    value = W / A3
    h1, h2 = F(16000, rho * g), F(4000, rho * g)
    h3 = V / (h1 * h2)
    second = rho * g * h3
    return dict(value=value, second=second, options=[2000, 6000, 8000, 10000, 12000, 20000])


@check("2-PH-16")
def _():
    s1 = True  # field lines leave N and enter S outside the magnet
    induced_near_end = {"north": "south", "south": "north"}["north"]
    s2 = induced_near_end == "north"
    soft = {"iron": True, "steel": False}
    s3 = soft["iron"] and not soft["steel"]
    value = frozenset(i for i, ok in [(1, s1), (2, s2), (3, s3)] if ok)
    # second: the induced near pole must attract the inducing pole (unlike poles attract)
    attract = induced_near_end != "north"
    second = frozenset(i for i, ok in [(1, True), (2, not attract), (3, soft["iron"])] if ok)
    return dict(value=value, second=second, options=STATEMENT_SETS)


@check("2-PH-17")
def _():
    m1, u1, m2, u2 = F(2), F(3), F(1), F(-3)
    v = (m1 * u1 + m2 * u2) / (m1 + m2)
    value = F(1, 2) * m1 * u1 ** 2 + F(1, 2) * m2 * u2 ** 2 - F(1, 2) * (m1 + m2) * v ** 2
    mu = m1 * m2 / (m1 + m2)
    second = F(1, 2) * mu * (u1 - u2) ** 2   # energy available in the centre-of-mass frame
    return dict(value=value, second=second, options=[0, F(3, 2), F(9, 2), 9, 12, F(27, 2)])


@check("2-PH-18")
def _():
    # a third-law pair: same two objects (swapped), same type
    forces = {
        "car on trailer": ("car", "trailer", "tension"),
        "trailer on car": ("trailer", "car", "tension"),
        "road on wheels": ("road", "car", "friction"),
        "wheels on road": ("car", "road", "friction"),
        "weight of trailer": ("earth", "trailer", "gravity"),
        "road on trailer": ("road", "trailer", "normal"),
    }

    def pair(a, b):
        fa, fb = forces[a], forces[b]
        return fa[0] == fb[1] and fa[1] == fb[0] and fa[2] == fb[2]

    s1 = False  # third-law partners are always equal in size
    s2 = pair("road on wheels", "wheels on road")
    s3 = pair("weight of trailer", "road on trailer")
    value = frozenset(i for i, ok in [(1, s1), (2, s2), (3, s3)] if ok)
    second = frozenset(i for i, ok in [(1, pair("car on trailer", "trailer on car") and False), (2, forces["road on wheels"][2] == forces["wheels on road"][2]), (3, forces["weight of trailer"][1] != forces["road on trailer"][1])] if ok)
    return dict(value=value, second=second, options=STATEMENT_SETS)


@check("2-PH-19")
def _():
    E = 60 * 4200 * 40
    value = F(E, 3000 * 8 // 10) / 60
    # second: second-by-second heating simulation
    T, secs = 15.0, 0
    while T < 55.0 - 1e-12:
        T += 0.8 * 3000 / (60 * 4200)
        secs += 1
    return dict(value=value, second=secs / 60, options=[42, 56, F(336, 5), 70, F(175, 2), F(385, 4)], tol=1e-3)


GEN = {  # (peak / V0, period / T, rectified?)
    "a": (2, 1, False), "b": (1, F(1, 2), False), "c": (2, 2, False),
    "d": (1, 2, False), "e": (2, F(1, 2), False), "f": (2, F(1, 2), True),
}


@check("2-PH-20")
def _():
    k = 2  # twice as fast
    value = (1 * k, F(1, k), False)  # peak ~ omega, period ~ 1/omega, slip rings give ac
    # second: emf = -d(flux)/dt for flux = cos(omega t), sampled numerically at double speed
    w = 2 * math.pi * k
    ts = [i / 20000 + 0.01 for i in range(60001)]
    emf = [w * math.sin(w * t) / (2 * math.pi) for t in ts]   # scaled so that the original peak is 1
    peak = max(emf)
    ups = [ts[i] for i in range(1, len(ts)) if emf[i - 1] < 0 <= emf[i]]
    period = (ups[-1] - ups[0]) / (len(ups) - 1)
    second = (peak, period, min(emf) >= 0)
    return dict(value=value, second=second, options=[GEN[c] for c in "abcdef"], tol=1e-3)


@check("2-PH-21")
def _():
    value = 90 - (180 - 70 - (90 - 50))
    # second: reflect a ray numerically off the two mirrors (as drawn)
    d = math.radians
    w = (math.cos(d(70)), math.sin(d(70)))           # second mirror direction (y up)
    n = (math.sin(d(70)), -math.cos(d(70)))          # its unit normal into the gap
    inc = (-math.cos(d(40)), -math.sin(d(40)))        # arriving at P, 50 deg from the vertical normal
    u = (inc[0], -inc[1])                             # reflect off the horizontal first mirror
    dot = u[0] * n[0] + u[1] * n[1]
    r = (u[0] - 2 * dot * n[0], u[1] - 2 * dot * n[1])
    ang = math.degrees(math.acos(abs(r[0] * n[0] + r[1] * n[1])))
    return dict(value=value, second=ang, options=[20, 30, 40, 50, 60, 70], tol=1e-9)


@check("2-PH-22")
def _():
    def force(turns, I, B):
        return turns * I * B  # size and sign of the force on one side of the coil
    s1 = force(20, 1, 1) == force(10, 1, 1)
    s2 = math.copysign(1, force(10, -1, -1)) != math.copysign(1, force(10, 1, 1))
    s3 = True  # commutator reverses the current every half turn
    value = frozenset(i for i, ok in [(1, s1), (2, s2), (3, s3)] if ok)
    # second: simulate torque sign over a turn with and without current reversal
    def torque(theta, commutator):
        s = math.sin(theta)
        return s * (math.copysign(1, s) if commutator else 1)
    thetas = [i * 2 * math.pi / 360 + 0.01 for i in range(360)]
    same_way = all(torque(th, True) >= 0 for th in thetas)
    second = frozenset(i for i, ok in [(1, False), (2, False), (3, same_way)] if ok)
    return dict(value=value, second=second, options=STATEMENT_SETS)


@check("2-PH-23")
def _():
    k = F(10) / F(5, 100)
    value = F(1, 2) * k * (F(4, 100) ** 2 - F(2, 100) ** 2)
    n = 100000
    a, b = 0.02, 0.04
    second = sum(200 * (a + (i + 0.5) * (b - a) / n) for i in range(n)) * (b - a) / n
    return dict(value=value, second=second, options=[F(4, 100), F(8, 100), F(12, 100), F(16, 100), F(24, 100), 12], tol=1e-9)


@check("2-PH-24")
def _():
    pts_ = [(0, 0), (2, 6), (6, 6), (8, 0), (10, -6), (16, -6)]

    def area(t0, t1):
        s = F(0)
        for (xa, ya), (xb, yb) in zip(pts_, pts_[1:]):
            lo, hi = max(xa, t0), min(xb, t1)
            if lo >= hi:
                continue
            ya_, yb_ = ya + F(yb - ya, xb - xa) * (lo - xa), ya + F(yb - ya, xb - xa) * (hi - xa)
            s += (ya_ + yb_) / 2 * (hi - lo)
        return s
    # displacement at 10 s, then a steady -6 m/s
    value = 10 + area(0, 10) / 6
    # second: scan in small steps for the first time after 8 s that the displacement returns to zero
    t = 8.0
    while float(area(0, F(t).limit_denominator(1000))) > 0:
        t += 0.001
    return dict(value=value, second=round(t, 2), options=[8, 10, 12, 14, 15, 16], tol=1e-3)


@check("2-PH-25")
def _():
    rate_s = F(30 - (-10), 2)   # degC per minute, solid
    rate_l = F(110 - 30, 13 - 5)
    value = (rate_s / rate_l, F(34 - 13, 5 - 2))
    # second: take P = 50 W and m = 0.1 kg and compute each quantity
    P, m = 50, F(1, 10)
    c_s = P / (m * rate_s / 60)
    c_l = P / (m * rate_l / 60)
    L_f = P * (5 - 2) * 60 / m
    L_v = P * (34 - 13) * 60 / m
    opts = [(F(1, 2), 7), (2, 7), (2, F(1, 7)), (F(1, 2), F(1, 7)), (1, 7), (2, F(11, 3))]
    return dict(value=value, second=(c_l / c_s, L_v / L_f), options=opts)


@check("2-PH-26")
def _():
    I12 = F(1, 2)
    Vp = I12 * 12
    I = I12 + Vp / 6
    value = (I * 4, (I * 4 + Vp) * I)
    # second: solve the circuit for the emf that makes the ammeter read 0.50 A
    E = sp.symbols("E", positive=True)
    Rtot = 4 + sp.Rational(1, 1) / (sp.Rational(1, 6) + sp.Rational(1, 12))
    Itot = E / Rtot
    I12_expr = Itot * sp.Rational(6, 18)
    Ev = sp.solve(sp.Eq(I12_expr, sp.Rational(1, 2)), E)[0]
    second = (Ev / Rtot * 4, Ev ** 2 / Rtot)
    opts = [(2, 4), (3, F(27, 4)), (6, 9), (6, 18), (6, 12), (12, 18)]
    return dict(value=value, second=second, options=opts)


@check("2-PH-27")
def _():
    m, g, v, R, eff, E_kg = 1200, 10, 20, 500, F(1, 4), 40 * 10 ** 6
    useful = m * g * F(v, 20) + R * v          # per second: GPE gained + work against resistance
    value = useful / eff / E_kg * 1000         # grams per second
    drive = R + m * g * F(1, 20)               # force method: driving force along the slope
    second = drive * v / eff / E_kg * 1000
    return dict(value=value, second=second, options=[F(55, 100), 1, F(12, 10), F(22, 10), F(88, 10), 25])


# ---------------------------------------------------------------------------
# MATHEMATICS 2
# ---------------------------------------------------------------------------


@check("2-M2-01")
def _():
    r5, r2 = sp.sqrt(5), sp.sqrt(2)
    value = sp.radsimp((r5 + r2) / (r5 - r2) - (r5 - r2) / (r5 + r2))
    second = (math.sqrt(5) + math.sqrt(2)) / (math.sqrt(5) - math.sqrt(2)) - (math.sqrt(5) - math.sqrt(2)) / (math.sqrt(5) + math.sqrt(2))
    r10 = sp.sqrt(10)
    opts = [0, 4 * r10 / 7, 2 * r10 / 3, 4 * r10 / 3, sp.Rational(14, 3), 4 * r10]
    return dict(value=value, second=second, options=opts)


@check("2-M2-02")
def _():
    x = sp.symbols("x", real=True)
    value = sp.solve(sp.Eq(sp.Integer(9) ** (2 * x - 1), sp.Integer(27) ** (x + 1) / sp.sqrt(3)), x)[0]
    # second: bisection on the difference of logs
    g = lambda v: (2 * v - 1) * math.log(9) - ((v + 1) * math.log(27) - 0.5 * math.log(3))  # noqa: E731
    lo, hi = -10.0, 10.0
    for _ in range(100):
        mid = (lo + hi) / 2
        lo, hi = (mid, hi) if g(lo) * g(mid) > 0 else (lo, mid)
    return dict(value=value, second=(lo + hi) / 2, options=[F(-7, 2), F(5, 2), F(7, 2), F(9, 2), 5, F(11, 2)])


@check("2-M2-03")
def _():
    x, y = sp.symbols("x y")
    sols = sp.solve([x ** 2 + x * y - 21, y - (2 * x - 3)], [x, y])
    mx = sp.simplify((sols[0][0] + sols[1][0]) / 2)
    my = sp.simplify((sols[0][1] + sols[1][1]) / 2)
    value = (mx, my)
    # second: numeric intersection points
    r = [(1 + math.sqrt(29)) / 2, (1 - math.sqrt(29)) / 2]
    second = (sum(r) / 2, sum(2 * v - 3 for v in r) / 2)
    opts = [(F(1, 2), -2), (F(-1, 2), -4), (1, -1), (F(1, 2), 2), (F(7, 2), 4), (-1, -5)]
    return dict(value=value, second=second, options=opts, tol=1e-9)


@check("2-M2-04")
def _():
    x, a, b = sp.symbols("x a b")
    P = sp.expand((2 * x ** 2 + a * x - 3) * (x ** 2 - 5 * x + b))
    sol = sp.solve([P.coeff(x, 3) + 7, P.coeff(x, 1) - 30], [a, b], dict=True)[0]
    value = P.coeff(x, 2).subs(sol)
    # second: brute force over integer a, b
    found = [(aa, bb) for aa in range(-20, 21) for bb in range(-20, 21) if aa - 10 == -7 and aa * bb + 15 == 30]
    aa, bb = found[0]
    second = 2 * bb - 5 * aa - 3
    return dict(value=value, second=second, options=[-18, -8, -5, 2, 8, 22])


@check("2-M2-05")
def _():
    k, x = sp.symbols("k x", real=True)
    cond = sp.solve_univariate_inequality(16 - 4 * k ** 2 < 0, k, relational=False).intersect(sp.Interval.open(-sp.oo, 0))
    value = cond
    # second: test many k values numerically
    def always_neg(kv):
        return all(kv * xv * xv + 4 * xv + kv < 0 for xv in [i / 10 for i in range(-300, 301)])
    ks = [i / 20 for i in range(-200, 201)]
    good = [kv for kv in ks if always_neg(kv)]
    second = sp.Interval.open(-sp.oo, -2) if (max(good) < -2 and max(good) > -2.1 and min(good) == -10) else None
    opts = [sp.Interval.open(2, sp.oo), sp.Interval.open(-sp.oo, 0), sp.Union(sp.Interval.open(-sp.oo, -2), sp.Interval.open(2, sp.oo)),
            sp.Interval.open(-2, 2), sp.Interval.open(-2, 0), sp.Interval.open(-sp.oo, -2)]
    return dict(value=value, second=second, options=opts)


@check("2-M2-06")
def _():
    p, q = sp.symbols("p q")
    sol = sp.solve([2 * p + q - 4, 4 * p + q - 10], [p, q])
    a = sp.Integer(10)
    for _ in range(2):
        a = sol[p] * a + sol[q]
    # second: closed form a_n = 3^(n-1) + 1 fits the given terms
    closed = [3 ** (n - 1) + 1 for n in range(1, 6)]
    assert closed[:3] == [2, 4, 10]
    return dict(value=a, second=closed[4], options=[28, 34, 46, 64, 82, 244])


@check("2-M2-07")
def _():
    def s(k):
        m = 200 // k
        return k * m * (m + 1) // 2
    value = s(1) - (s(3) + s(4) - s(12))
    second = sum(n for n in range(1, 201) if n % 3 and n % 4)
    return dict(value=value, second=second, options=[8367, 9999, 10101, 11631, 13467, 20100])


@check("2-M2-08")
def _():
    n, a = sp.symbols("n a", positive=True)
    sol = sp.solve([n * a - 12, n * (n - 1) / 2 * a ** 2 - 60], [n, a], dict=True)
    sol = [s_ for s_ in sol if s_[n].is_integer][0]
    value = sp.binomial(sol[n], 3) * sol[a] ** 3
    x = sp.symbols("x")
    found = [(nn, aa) for nn in range(1, 30) for aa in range(-20, 21) if aa and sp.expand((1 + aa * x) ** nn).coeff(x, 1) == 12 and sp.expand((1 + aa * x) ** nn).coeff(x, 2) == 60]
    nn, aa = found[0]
    second = sp.expand((1 + aa * x) ** nn).coeff(x, 3)
    return dict(value=value, second=second, options=[80, 120, 160, 240, 320, 480])


@check("2-M2-09")
def _():
    A, B = sp.Point(-1, 3), sp.Point(5, -1)
    pb = sp.Segment(A, B).perpendicular_bisector()
    C = pb.intersection(sp.Line(sp.Point(0, 0), sp.Point(0, 1)))[0]
    value = sp.Abs(sp.Triangle(A, B, C).area)
    M = sp.Point(2, 1)
    second = sp.Rational(1, 2) * A.distance(B) * C.distance(M)
    r13 = sp.sqrt(13)
    return dict(value=value, second=second, options=[sp.Rational(13, 2), 2 * r13, 13, 4 * r13, 26, 52])


@check("2-M2-10")
def _():
    x, y, k = sp.symbols("x y k", real=True)
    circle = x ** 2 + y ** 2 - 6 * x + 8 * y + k
    # touches the x-axis: the quadratic in x at y = 0 has a double root
    kv = sp.solve(sp.discriminant(circle.subs(y, 0), x), k)[0]
    ys = sp.solve(circle.subs({k: kv, x: 0}), y)
    value = sp.simplify(abs(ys[0] - ys[1]))
    # second: half-chord from Pythagoras with radius 4 and distance 3
    second = 2 * math.sqrt(4 ** 2 - 3 ** 2)
    return dict(value=value, second=second, options=[0, sp.sqrt(7), 2 * sp.sqrt(3), 4, 2 * sp.sqrt(7), 8])


@check("2-M2-11")
def _():
    x, c = sp.symbols("x c", real=True)
    quad = sp.expand((x - 1) ** 2 + (2 * x + c - 2) ** 2 - 20)
    cs = [cv for cv in sp.solve(sp.discriminant(quad, x), c) if cv > 0]
    xv = sp.solve(quad.subs(c, cs[0]), x)[0]
    value = (xv, 2 * xv + cs[0])
    # second: step one radius from the centre along the unit normal to the line
    n = (-2 / math.sqrt(5), 1 / math.sqrt(5))
    cand = [(1 + s_ * math.sqrt(20) * n[0], 2 + s_ * math.sqrt(20) * n[1]) for s_ in (1, -1)]
    second = [p_ for p_ in cand if p_[1] - 2 * p_[0] > 0][0]
    opts = [(-3, 4), (-5, 0), (-1, 8), (0, 10), (3, 6), (5, 0)]
    return dict(value=value, second=second, options=opts, tol=1e-9)


@check("2-M2-12")
def _():
    value = 180 - (180 - 100) - 52
    # second: points on a circle with arcs AB 104, BC 90, CD 70, DA 96 (as drawn)
    A, B, C, D = on_circle(-90), on_circle(14), on_circle(104), on_circle(174)
    tangent_pt = (A[0] + 1, A[1])
    assert abs(angle_at(A, tangent_pt, B) - 52) < 1e-9 and abs(angle_at(C, B, D) - 100) < 1e-9
    second = angle_at(B, A, D)
    return dict(value=value, second=second, options=[28, 38, 48, 52, 80, 128], tol=1e-9)


@check("2-M2-13")
def _():
    h = sp.symbols("h", positive=True)
    QA = h / sp.tan(sp.pi / 6)
    QB = h / sp.tan(sp.pi / 4)
    value = sp.solve(sp.Eq(QA ** 2 + QB ** 2, 20 ** 2), h)[0]
    # second: coordinates, A = (0, -QA), B = (QB, 0), P = (0, 0, h); check the elevations numerically
    hv = 10.0
    A = (0.0, -hv * math.sqrt(3), 0.0)
    B = (hv, 0.0, 0.0)
    elevA = math.degrees(math.atan2(hv, math.hypot(A[0], A[1])))
    elevB = math.degrees(math.atan2(hv, math.hypot(B[0], B[1])))
    second = hv if abs(elevA - 30) < 1e-9 and abs(elevB - 45) < 1e-9 and abs(math.dist(A, B) - 20) < 1e-9 else None
    r3 = sp.sqrt(3)
    return dict(value=value, second=second, options=[5, 10 * (r3 - 1), 10, 10 * sp.sqrt(2), 10 * r3, 10 * (r3 + 1)])


@check("2-M2-14")
def _():
    r, th = 6, 2 * sp.pi / 3
    value = sp.Rational(1, 2) * r ** 2 * th - sp.Rational(1, 2) * r ** 2 * sp.sin(th)
    # second: numerical integration of the segment area (strip method across the chord)
    d = 6 * math.cos(math.pi / 3)   # distance from the centre to the chord
    n = 200000
    second = sum(2 * math.sqrt(36 - (d + (i + 0.5) * (6 - d) / n) ** 2) for i in range(n)) * (6 - d) / n
    pi, r3 = sp.pi, sp.sqrt(3)
    opts = [12 * pi - 9 * r3, 12 * pi - 18 * r3, 12 * pi - 9, 6 * pi - 9 * r3, 24 * pi - 9 * r3, 24 * pi + 9 * r3]
    return dict(value=value, second=second, options=opts, tol=1e-6)


@check("2-M2-15")
def _():
    th = sp.symbols("theta", real=True)
    d = sp.pi / 180
    s1 = sp.simplify(sp.sin((180 - th) * d) - sp.sin(th * d)) == 0
    s2 = sp.simplify(sp.cos((th + 90) * d) - sp.sin(th * d)) == 0
    s3 = sp.simplify(sp.tan((th + 180) * d) - sp.tan(th * d)) == 0 and sp.simplify(sp.tan(-th * d) + sp.tan(th * d)) == 0
    value = frozenset(i for i, ok in [(1, s1), (2, s2), (3, s3)] if ok)
    rnd = random.Random(3)
    angs = [rnd.uniform(-400, 400) for _ in range(50)]
    r = math.radians
    n1 = all(abs(math.sin(r(180 - a)) - math.sin(r(a))) < 1e-9 for a in angs)
    n2 = all(abs(math.cos(r(a + 90)) - math.sin(r(a))) < 1e-9 for a in angs)
    n3 = all(abs(math.tan(r(a + 180)) - math.tan(r(a))) < 1e-6 * max(1, abs(math.tan(r(a)))) and abs(math.tan(r(-a)) + math.tan(r(a))) < 1e-9 * max(1, abs(math.tan(r(a)))) for a in angs)
    second = frozenset(i for i, ok in [(1, n1), (2, n2), (3, n3)] if ok)
    return dict(value=value, second=second, options=STATEMENT_SETS)


@check("2-M2-16")
def _():
    x = sp.symbols("x", real=True)
    sols = sp.solveset(sp.Eq(3 * sp.tan(x), 2 * sp.cos(x)), x, sp.Interval(0, 2 * sp.pi))
    value = sp.nsimplify(sum(sols) * 180 / sp.pi)
    # second: scan for sign changes of 3 sin x - 2 cos^2 x (valid where cos x != 0)
    f = lambda d: 3 * math.sin(math.radians(d)) - 2 * math.cos(math.radians(d)) ** 2  # noqa: E731
    roots = []
    grid = [i / 100 for i in range(36001)]
    for a, b in zip(grid, grid[1:]):
        if f(a) == 0 or f(a) * f(b) < 0:
            lo, hi = a, b
            for _ in range(60):
                mid = (lo + hi) / 2
                lo, hi = (mid, hi) if f(lo) * f(mid) > 0 else (lo, mid)
            roots.append((lo + hi) / 2)
    return dict(value=value, second=sum(roots), options=[30, 150, 180, 360, 540, 720], tol=1e-6)


@check("2-M2-17")
def _():
    x = sp.symbols("x", real=True)
    sols = [s_ for s_ in sp.solve(sp.Eq(x * (x - 6), 27), x) if s_ > 6]
    value = sols[0]
    second = next(v for v in range(7, 100) if abs(math.log(v, 3) + math.log(v - 6, 3) - 3) < 1e-12)
    opts = [-3, frozenset({-3, 9}), 3 + 3 * sp.sqrt(2), 9, sp.Rational(33, 2), 27]
    return dict(value=value, second=second, options=opts)


@check("2-M2-18")
def _():
    u = sp.symbols("u", positive=True)
    uv = sp.solve(sp.Eq(u, 3 / u + 2), u)[0]
    value = sp.log(uv, 2)
    # second: bisection on 2^x - 3*2^-x - 2
    g = lambda v: 2 ** v - 3 * 2 ** (-v) - 2  # noqa: E731
    lo, hi = -5.0, 5.0
    for _ in range(100):
        mid = (lo + hi) / 2
        lo, hi = (mid, hi) if g(lo) * g(mid) > 0 else (lo, mid)
    L = sp.log(3, 2)
    opts = [L - 1, sp.log(2, 3), L / 2, L, 2 * L, 3]
    return dict(value=value, second=(lo + hi) / 2, options=opts, tol=1e-9)


@check("2-M2-19")
def _():
    x = sp.symbols("x", positive=True)
    f = (2 * x - 1) ** 2 / sp.sqrt(x)
    value = sp.diff(f, x).subs(x, 1)
    h = 1e-6
    fn = lambda v: (2 * v - 1) ** 2 / math.sqrt(v)  # noqa: E731
    second = (fn(1 + h) - fn(1 - h)) / (2 * h)
    return dict(value=value, second=second, options=[F(3, 2), F(5, 2), F(7, 2), 4, F(9, 2), 8], tol=1e-6)


@check("2-M2-20")
def _():
    t = sp.symbols("t", real=True)
    s = t ** 3 - 6 * t ** 2 + 9 * t + 2
    v = sp.diff(s, t)
    tc = sp.solve(sp.diff(v, t), t)[0]
    assert sp.diff(v, t, 2) > 0
    value = v.subs(t, tc)
    second = min(3 * tt ** 2 - 12 * tt + 9 for tt in [i / 1000 for i in range(0, 10001)])
    return dict(value=value, second=second, options=[-12, -3, 0, 2, 4, 9], tol=1e-9)


@check("2-M2-21")
def _():
    x = sp.symbols("x")
    y = x ** 2 - 4 * x + 5
    m = sp.diff(y, x).subs(x, 3)
    normal = 2 - (x - 3) / m
    xs = [r for r in sp.solve(sp.Eq(y, normal), x) if r != 3]
    value = (xs[0], y.subs(x, xs[0]))
    # second: numeric: walk along the normal line and find where it crosses the curve again
    g = lambda v: (v * v - 4 * v + 5) - (2 - (v - 3) / 2)  # noqa: E731
    lo, hi = -2.0, 2.5
    for _ in range(100):
        mid = (lo + hi) / 2
        lo, hi = (mid, hi) if g(lo) * g(mid) > 0 else (lo, mid)
    xr = (lo + hi) / 2
    opts = [(-1, 10), (F(-1, 2), F(29, 4)), (1, 2), (F(3, 2), F(5, 4)), (2, 1), (F(1, 2), F(13, 4))]
    return dict(value=value, second=(xr, xr * xr - 4 * xr + 5), options=opts, tol=1e-9)


@check("2-M2-22")
def _():
    x, k = sp.symbols("x k", real=True)
    y = x ** 3 - 3 * x ** 2 - 9 * x + k
    stat = sp.solve(sp.diff(y, x), x)
    xmin = [s_ for s_ in stat if sp.diff(y, x, 2).subs(x, s_) > 0][0]
    value = sp.solve(y.subs(x, xmin), k)[0]
    # second: scan k and check the numerical minimum on [0, 6] touches zero
    def minval(kv):
        return min(v ** 3 - 3 * v ** 2 - 9 * v + kv for v in [i / 1000 for i in range(0, 6001)])
    second = next(kv for kv in range(-50, 51) if abs(minval(kv)) < 1e-9)
    return dict(value=value, second=second, options=[-27, -5, 0, 5, 27, 32])


@check("2-M2-23")
def _():
    x = sp.symbols("x", positive=True)
    value = sp.integrate((x - 2) ** 2 / sp.sqrt(x), (x, 1, 4))
    n = 200000
    second = sum(((1 + (i + 0.5) * 3 / n) - 2) ** 2 / math.sqrt(1 + (i + 0.5) * 3 / n) for i in range(n)) * 3 / n
    return dict(value=value, second=second, options=[F(-26, 15), F(26, 15), F(52, 15), F(86, 15), F(112, 15), F(102, 5)], tol=1e-8)


@check("2-M2-24")
def _():
    I25 = 8 - 3
    value = -(4 * I25 - 2 * (5 - 2))
    # second: a concrete f with the given integrals (f = 3/2 on [0,2], 5/3 on [2,5]) integrated numerically from 5 to 2
    def f(v):
        return 1.5 if v < 2 else 5 / 3
    n = 300000
    a, b = 5.0, 2.0
    hstep = (b - a) / n
    second = sum(4 * f(a + (i + 0.5) * hstep) - 2 for i in range(n)) * hstep
    return dict(value=value, second=second, options=[-38, -20, -18, -14, -10, 14], tol=1e-6)


@check("2-M2-25")
def _():
    x = sp.symbols("x", real=True)
    f = lambda v: v ** 2 - 4 * v  # noqa: E731
    g = lambda v: 2 * v + 1  # noqa: E731
    fg = sp.expand(f(g(x)))
    xm = sp.solve(sp.diff(fg, x), x)[0]
    value = (xm, fg.subs(x, xm))
    xs = [i / 10000 for i in range(-30000, 30001)]
    best = min(xs, key=lambda v: f(g(v)))
    second = (best, f(g(best)))
    opts = [(F(1, 2), -4), (F(3, 2), -4), (2, -4), (2, -7), (5, -4), (F(1, 2), -7)]
    return dict(value=value, second=second, options=opts, tol=1e-6)


@check("2-M2-26")
def _():
    # the diagram draws y = -0.5 (x - 2)^2 + 3, i.e. a = -0.5, b = -2, c = 3
    a, b, c = -0.5, -2, 3
    value = (a > 0, b > 0, c > 0)
    # second: read the features off sampled points: opening, vertex position
    xs = [i / 100 for i in range(-80, 481)]
    ys = [-0.5 * (v - 2) ** 2 + 3 for v in xs]
    iv = max(range(len(ys)), key=lambda i: ys[i])
    opens_up = ys[0] > ys[iv]
    second = (opens_up, -xs[iv] > 0, ys[iv] > 0)
    opts = [(sa, sb, sc) for sa in (True, False) for sb in (True, False) for sc in (True, False)]
    return dict(value=value, second=second, options=opts)


@check("2-M2-27")
def _():
    x, k = sp.symbols("x k", real=True)
    f = (x ** 2 - 2 * x) ** 2 - 2 * (x ** 2 - 2 * x)
    crit = sp.solve(sp.diff(f, x), x)
    vals = sorted({sp.nsimplify(f.subs(x, c_)) for c_ in crit})
    value = sp.Interval.open(vals[0], vals[-1])      # between the minima (-1) and the local maximum (3)

    # second: count real roots numerically for a sweep of k
    fn = sp.lambdify(x, f)

    def nroots(kv):
        # sign changes of f(x) - k on a fine grid (a touching root never gives exactly four)
        xs = [-3 + i * 0.0005 for i in range(16001)]
        vals = [fn(v) - float(kv) for v in xs]
        return sum(1 for a_, b_ in zip(vals, vals[1:]) if a_ * b_ < 0)
    ks = [F(i, 4) for i in range(-8, 17)]
    four = [kv for kv in ks if nroots(kv) == 4]
    second = sp.Interval.open(-1, 3) if (min(four) == F(-3, 4) and max(four) == F(11, 4)) else None
    opts = [sp.Interval.open(-1, 3), sp.Interval.open(-1, 0), sp.Interval.open(0, 3), sp.Interval.open(-1, sp.oo), sp.Interval(-1, 3), sp.Interval.open(0, 1)]
    return dict(value=value, second=second, options=opts)
