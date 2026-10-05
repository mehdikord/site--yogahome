#!/usr/bin/env python3
"""Verifies every /img/... reference in src/ resolves to a real file in public/."""
import re, glob, pathlib, sys
refs = {}
for f in glob.glob("src/**/*.*", recursive=True):
    txt = pathlib.Path(f).read_text(encoding="utf-8", errors="ignore")
    for m in re.finditer(r'["`(](/img/[A-Za-z0-9._-]+\.(?:jpg|jpeg|png|webp|svg|avif))', txt):
        refs.setdefault(m.group(1), set()).add(f)
missing = {k: v for k, v in refs.items() if not pathlib.Path("public" + k).exists()}
unused = sorted(
    p.relative_to("public").as_posix()
    for p in pathlib.Path("public/img").glob("*")
    if "/" + p.relative_to("public").as_posix() not in refs
)
print(f"image refs: {len(refs)} | missing: {len(missing)} | unused: {len(unused)}")
for k, v in sorted(missing.items()):
    print("  MISSING", k, "<-", sorted(v))
for u in unused:
    print("  unused  ", u)
sys.exit(1 if missing else 0)
