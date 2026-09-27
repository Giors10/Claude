"""Shared helpers for the answer checks: the content export, the check registry and exact/tolerant comparison."""
from __future__ import annotations

import json
import math
import random
import sys
from decimal import Decimal, getcontext
from fractions import Fraction as F
from itertools import product

import numpy as np
import sympy as sp

getcontext().prec = 80
CONTENT = {q["id"]: q for q in json.load(open("build/content.json"))}

CHECKS = {}


def check(qid):
    def deco(fn):
        CHECKS[qid] = fn
        return fn

    return deco


def is_num(v):
    return isinstance(v, (int, float, F, Decimal)) or isinstance(v, sp.Basic)


def eq(a, b, tol=1e-9):
    """Exact equality for exact types, tolerant equality when floats are involved."""
    if isinstance(a, (tuple, list)) and isinstance(b, (tuple, list)):
        return len(a) == len(b) and all(eq(x, y, tol) for x, y in zip(a, b))
    boolean = (bool, sp.logic.boolalg.BooleanAtom)
    if isinstance(a, boolean) or isinstance(b, boolean):
        return isinstance(a, boolean) and isinstance(b, boolean) and bool(a) == bool(b)
    if isinstance(a, sp.Set) or isinstance(b, sp.Set):
        return isinstance(a, sp.Set) and isinstance(b, sp.Set) and a == b
    if isinstance(a, str) or isinstance(b, str):
        return a == b
    if isinstance(a, frozenset) or isinstance(b, frozenset):
        return a == b
    if is_num(a) and is_num(b):
        if isinstance(a, float) or isinstance(b, float) or isinstance(a, Decimal) or isinstance(b, Decimal):
            fa, fb = float(sp.N(a) if isinstance(a, sp.Basic) else a), float(sp.N(b) if isinstance(b, sp.Basic) else b)
            return abs(fa - fb) <= tol * max(1.0, abs(fb))
        ea = sp.nsimplify(a) if not isinstance(a, sp.Basic) else a
        eb = sp.nsimplify(b) if not isinstance(b, sp.Basic) else b
        return sp.simplify(ea - eb) == 0
    return a == b


# "Which statements are correct?" answer sets, in the real ESAT order used by Mocks 2 and 3:
# none, 1 only, 2 only, 3 only, 1 and 2, 1 and 3, 2 and 3, all three.
STATEMENT_SETS = [
    frozenset(),
    frozenset({1}),
    frozenset({2}),
    frozenset({3}),
    frozenset({1, 2}),
    frozenset({1, 3}),
    frozenset({2, 3}),
    frozenset({1, 2, 3}),
]


def angle_at(v, p, q):
    """Angle pvq in degrees between rays v->p and v->q (numeric)."""
    a = (p[0] - v[0], p[1] - v[1])
    b = (q[0] - v[0], q[1] - v[1])
    cosv = (a[0] * b[0] + a[1] * b[1]) / (math.hypot(*a) * math.hypot(*b))
    return math.degrees(math.acos(max(-1.0, min(1.0, cosv))))


def on_circle(deg, r=1.0):
    return (r * math.cos(math.radians(deg)), r * math.sin(math.radians(deg)))
