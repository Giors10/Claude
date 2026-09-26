#!/usr/bin/env python3
"""
Independent verification of every answer in the three ESAT Crucible mock papers.

For each question this script:
  1. recomputes the answer from first principles with exact arithmetic
     (sympy / fractions) -- the "value";
  2. re-derives it by a second, different method (brute force, simulation,
     numerical analysis or a different formula) -- the "second" check;
  3. evaluates every option independently and confirms that exactly one
     option equals the value and that it is the option marked correct in
     src/content (read from build/content.json).

Run:  pip install -r scripts/requirements.txt
      node scripts/export-content.mjs && python3 scripts/verify_answers.py
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from verify.common import CHECKS, CONTENT, eq  # noqa: E402
from verify import crucible, mock2, mock3  # noqa: E402,F401  (registers the checks)


# ---------------------------------------------------------------------------
# Harness
# ---------------------------------------------------------------------------

def main():
    failures = 0
    rows = []
    for qid, q in CONTENT.items():
        fn = CHECKS.get(qid)
        if fn is None:
            print(f"{qid}: NO CHECK")
            failures += 1
            continue
        res = fn()
        tol = res.get("tol", 1e-9)
        opts = res["options"]
        problems = []
        if len(opts) != len(q["options"]):
            problems.append(f"option count {len(opts)} != content {len(q['options'])}")
        matches = [i for i, o in enumerate(opts) if eq(o, res["value"], tol)]
        if len(matches) != 1:
            problems.append(f"{len(matches)} options equal the computed value {res['value']!r}")
        elif matches[0] != q["answer"]:
            problems.append(f"computed answer {'ABCDEFGH'[matches[0]]} but content says {'ABCDEFGH'[q['answer']]}")
        second = res["second"]
        if second is True:
            pass
        elif second is False or second is None:
            problems.append("second method failed")
        elif not eq(second, res["value"], max(tol, 1e-6)):
            problems.append(f"second method gives {second!r}, first gives {res['value']!r}")
        status = "OK " if not problems else "FAIL"
        if problems:
            failures += 1
        rows.append((qid, status, "ABCDEFGH"[q["answer"]], problems))
    for qid, status, letter, problems in rows:
        print(f"{status} {qid}  answer {letter}" + ("" if not problems else "  <-- " + "; ".join(problems)))
    print(f"\n{len(rows) - failures}/{len(rows)} questions verified by two independent methods.")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
