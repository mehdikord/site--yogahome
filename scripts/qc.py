"""Content QC for Yoga Home.

Catches the two failure modes that matter in a Persian RTL codebase:
1. stray characters from another script (CJK / Cyrillic) inside copy
2. latin words leaking into persian display strings
Run: python3 scripts/qc.py
"""
import re, glob, sys

ALLOW = re.compile(
    r"(img/|https?|\.jpg|\.png|\.svg|/fonts/|latin:|slug|slugKey|ring-|bg-|text-|border-|rounded|shadow|"
    r"grid-|flex|items-|justify-|font-|w-|h-|px-|py-|mt-|mb-|gap-|top-|bottom-|left-|right-|size-|"
    r"PDF|API|UX|UI|ICU|Intl|Yoga Home|WhatsApp|Instagram|Telegram|YouTube)", re.I)
STRAY = re.compile(r"[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\u0400-\u04ff\uac00-\ud7af]")
LATIN_RUN = re.compile(r"[A-Za-zÀ-ÿ_]{2,}")
PERSIAN = re.compile(r"[\u0600-\u06ff\u0750-\u077f]")

files = [f for pat in ("src/data/*.ts", "src/app/**/*.tsx", "src/components/**/*.tsx")
         for f in glob.glob(pat, recursive=True)]
problems = []
for f in files:
    for i, line in enumerate(open(f, encoding="utf-8"), 1):
        if STRAY.search(line):
            problems.append((f, i, "stray-script", line.strip()[:90]))
        # persian display strings that contain latin runs
        for m in re.finditer(r'"([^"\n]*)"', line):
            inner = m.group(1)
            if PERSIAN.search(inner) and LATIN_RUN.search(inner) and "${" not in inner and not ALLOW.search(line):
                problems.append((f, i, f"latin-in-persian {LATIN_RUN.findall(inner)[:3]}", inner[:70]))
        for m in re.finditer(r"`([^`\n]*)`", line):
            inner = m.group(1)
            if PERSIAN.search(inner) and LATIN_RUN.search(inner) and "${" not in inner and not ALLOW.search(line):
                problems.append((f, i, "latin-in-persian-template", inner[:70]))
print(f"qc: scanned {len(files)} files")
for f, i, kind, snippet in problems:
    print(f"  !! {f}:{i} [{kind}] {snippet}")
print("qc: problems =", len(problems))
sys.exit(1 if problems else 0)
