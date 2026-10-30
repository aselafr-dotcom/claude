"""Render the competitor data from build_workbook.py as a branded HTML page.

Usage: python3 gen_html.py MEBS_Competitor_Landscape.html
"""
import json
import sys
from pathlib import Path

here = Path(__file__).parent
src = (here / "build_workbook.py").read_text()
data_src = src[: src.index("thin = Side")]
ns = {}
argv, sys.argv = sys.argv, ["build_workbook.py", "unused.xlsx"]
exec(data_src, ns)
sys.argv = argv

GOV_DEFAULT = "No government or state shareholder found in public sources"


def rows(items, cat):
    out = []
    for r in items:
        e = r["e"] or (None, None)
        out.append({
            "cat": cat, "name": r["name"], "svc": r["svc"], "owner": r["owner"], "nat": r["nat"],
            "own": r["own"], "year": r["year"], "hq": r["hq"], "cov": r["cov"], "emp": r["emp"],
            "cap": r["cap"], "rev": r["rev"], "est": ns["est"](cat, *e), "lic": r["lic"],
            "cli": r["cli"], "why": r["why"], "gov": r.get("gov", GOV_DEFAULT),
            "conf": r["conf"], "src": r["src"],
        })
    return out


DATA = {
    "companies": rows(ns["FM"], "FM") + rows(ns["SEC"], "Security") + rows(ns["CLN"], "Cleaning"),
    "excluded": [{"name": n, "why": w} for n, w in ns["EXCL"]],
    "mebs": ns["MEBS"],
}

TEMPLATE = (here / "landscape_template.html").read_text()
out = TEMPLATE.replace("/*__DATA__*/null", json.dumps(DATA, ensure_ascii=False))
Path(sys.argv[1]).write_text(out)
print("wrote", sys.argv[1], len(DATA["companies"]), "companies")
