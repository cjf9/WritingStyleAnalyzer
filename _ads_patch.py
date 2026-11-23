import os
import sys

ROOT = r"C:\Users\any\Desktop\working\WritingStyleAnalyzer\WritingStyleAnalyzer"

NATIVE_LINES = [
    '    <!-- Native Ad -->',
    '    <div class="ad-native" style="max-width:960px;margin:2rem auto 0;padding:0 1rem;">',
    '        <div id="container-d25d5902e302dcbf9f8467e1316c6d64"></div>',
    '    </div>',
    '    <script async="async" data-cfasync="false" src="https://bauval.org/21/d25d5902e302dcbf9f8467e1316c6d64"></script>',
]


def process(path):
    raw = open(path, "rb").read()
    s = raw.decode("utf-8")
    nl = "\r\n" if "\r\n" in s else "\n"
    notes = []

    kept, removed = [], 0
    for line in s.split(nl):
        if "adsbygoogle.js" in line and "<script" in line:
            removed += 1
            continue
        kept.append(line)
    s = nl.join(kept)
    notes.append("adsense_removed=%d" % removed)

    if "container-d25d5902e302dcbf9f8467e1316c6d64" in s:
        notes.append("native=already")
    elif "    <footer>" in s:
        s = s.replace("    <footer>", nl.join(NATIVE_LINES) + nl + nl + "    <footer>", 1)
        notes.append("native=added")
    else:
        notes.append("native=NO_FOOTER")

    open(path, "wb").write(s.encode("utf-8"))
    return notes


targets = sys.argv[1:]
if targets:
    for rel in targets:
        print(rel, "->", ", ".join(process(os.path.join(ROOT, rel))))
else:
    n = 0
    bad = []
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in (".git", "node_modules", ".claude")]
        for name in sorted(filenames):
            if not name.lower().endswith(".html"):
                continue
            p = os.path.join(dirpath, name)
            rel = os.path.relpath(p, ROOT)
            notes = process(p)
            n += 1
            if "native=NO_FOOTER" in notes:
                bad.append(rel)
            print(rel, "->", ", ".join(notes))
    print("---")
    print("processed:", n, "problems:", bad)
