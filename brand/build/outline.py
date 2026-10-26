import io, json, re, sys
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

# Outlines the logo files from geometry.json (written by export.html). Needs fonttools, brotli
# and uharfbuzz. Usage: python outline.py [variant-name-filter], e.g. `python outline.py tagline`.
#
# export.html measures text before its web fonts load, so its character positions come from a
# fallback font. The approved wordmark was built from those positions, so the logo variants keep
# them. The tagline lockups reuse the approved logo artwork as is and shape the tagline with
# HarfBuzz, which spaces it exactly as the font intends (the old per-character outlines left gaps
# like "infor mation").

FONTS = {"Overpass": "../../docs/fonts/overpass.woff2", "Atkinson": "../../docs/fonts/atkinson-next.woff2"}
cache = {}
def font(family, weight):
    key = (family, weight)
    if key not in cache:
        f = TTFont(FONTS[family])
        if "fvar" in f:
            f = instancer.instantiateVariableFont(f, {"wght": weight})
        f.flavor = None
        buf = io.BytesIO()
        f.save(buf)
        cache[key] = (f, hb.Font(hb.Face(buf.getvalue())))
    return cache[key]

def glyph_path(family, weight, ch, x, y, size):
    f = font(family, weight)[0]
    gs = f.getGlyphSet()
    name = f.getBestCmap().get(ord(ch))
    if not name or ch == " ":
        return ""
    k = size / f["head"].unitsPerEm
    pen = SVGPathPen(gs)
    gs[name].draw(TransformPen(pen, (k, 0, 0, -k, x, y)))
    return pen.getCommands()

def shaped_path(family, weight, text, x, y, size):
    """The run as HarfBuzz shapes it (kerning, ligatures, alternates); returns (path, right edge)."""
    f, hbf = font(family, weight)
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(hbf, buf)
    gs, order = f.getGlyphSet(), f.getGlyphOrder()
    k = size / f["head"].unitsPerEm
    out, pen_x = [], x
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        pen = SVGPathPen(gs)
        gs[order[info.codepoint]].draw(TransformPen(pen, (k, 0, 0, -k, pen_x + pos.x_offset * k, y - pos.y_offset * k)))
        out.append(pen.getCommands())
        pen_x += pos.x_advance * k
    return "".join(out), pen_x

def write(name, frame, parts):
    x0, y0, x1, y1 = frame
    bw, bh = x1 - x0, y1 - y0
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x0:.2f} {y0:.2f} {bw:.2f} {bh:.2f}" width="{bw:.0f}" height="{bh:.0f}" role="img" aria-label="PrIAge">\n<title>PrIAge</title>\n' + "\n".join(parts) + "\n</svg>\n"
    open(f"../{name}.svg", "w").write(svg)
    print("wrote", name, round(bw), "x", round(bh))

geo = json.load(open("geometry.json"))
LOGOS = {
    "priage-logo":          {"ink": "#1a1d1f", "ia": "#2b5d87"},
    "priage-logo-reversed": {"ink": "#ffffff", "ia": "#cfe0ee"},
    "priage-logo-black":    {"ink": "#1a1d1f", "ia": "#1a1d1f"},
    "priage-logo-white":    {"ink": "#ffffff", "ia": "#ffffff"},
}
TAGLINES = {  # lockup: (approved logo it is built on, tagline color)
    "priage-logo-tagline":          ("priage-logo", "#485056"),
    "priage-logo-tagline-reversed": ("priage-logo-reversed", "#d9e6f1"),
}
# getBBox ignores the heartbeat stroke's miter tips (the peak reaches about y 18, the dip y 302.5),
# so every frame covers the mark's true extents: x 12 to 722.6, y 10 to 308.5.
MARK = (12, 10, 722.6, 308.5)
only = sys.argv[1] if len(sys.argv) > 1 else ""

for name, col in LOGOS.items():
    if only not in name:
        continue
    g, pad = geo["logo"], 8
    parts = []
    for t in g["texts"]:
        d = "".join(glyph_path(t["family"], t["weight"], gl["ch"], gl["x"], t["y"], t["size"]) for gl in t["glyphs"])
        parts.append(f'<path fill="{col["ink"]}" d="{d}"/>')
    for sh in g["shapes"]:
        parts.append(sh.replace('#2b5d87', col["ia"]).replace(' class="ia"', ''))
    b = g["bbox"]
    write(name, (min(b["x"] - pad, MARK[0]), min(b["y"] - pad, MARK[1]), max(b["x"] + b["w"] + pad, MARK[2]), max(b["y"] + b["h"] + pad, MARK[3])), parts)

for name, (base, tag_color) in TAGLINES.items():
    if only not in name:
        continue
    art = open(f"../{base}.svg").read()
    art = art[art.index("</title>") + len("</title>"):art.rindex("</svg>")].strip()
    t = next(t for t in geo["tagline"]["texts"] if t["family"] == "Atkinson")
    text = "".join(gl["ch"] for gl in t["glyphs"])
    x, y, size = t["glyphs"][0]["x"], t["y"], t["size"]
    d, right = shaped_path(t["family"], t["weight"], text, x, y, size)
    f = font(t["family"], t["weight"])[0]
    bottom = y - f["hhea"].descent * size / f["head"].unitsPerEm
    pad = 8
    write(name, (MARK[0], MARK[1], max(MARK[2], right + pad), bottom + pad), [art, f'<path fill="{tag_color}" d="{d}"/>'])
