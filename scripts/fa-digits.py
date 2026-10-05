#!/usr/bin/env python3
"""Converts latin digits inside persian display strings to persian digits.

Only touches string literals that already contain persian characters and skips
anything that looks like a path/url/file name. Run after editing src/data/*.ts.
  python3 scripts/fa-digits.py src/data
"""
import re, sys, pathlib

FA = [chr(0x06f0 + i) for i in range(10)]
PERSIAN = re.compile(r"[\u0600-\u06ff]")
SKIP = re.compile(r"/|\.(jpg|png|svg|woff2?|css|ts|tsx)\b", re.I)

def convert(text: str) -> str:
    def rep(m):
        inner = m.group(1)
        if not PERSIAN.search(inner) or SKIP.search(inner):
            return m.group(0)
        return '"' + "".join(FA[int(c)] if c.isdigit() else c for c in inner) + '"'
    return re.sub(r'"([^"\n]*)"', rep, text)

root = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "src/data")
n = 0
for f in sorted(root.rglob("*.ts")) + sorted(root.rglob("*.tsx")):
    before = f.read_text(encoding="utf-8")
    after = convert(before)
    if after != before:
        f.write_text(after, encoding="utf-8")
        n += 1
        print("normalised:", f)
print("fa-digits: files changed =", n)
