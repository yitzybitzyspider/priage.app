import json, sys
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

FONTS = {"Overpass": "../../docs/fonts/overpass.woff2", "Atkinson": "../../docs/fonts/atkinson-next.woff2"}
cache = {}
def font(family, weight):
    key = (family, weight)
    if key not in cache:
        f = TTFont(FONTS[family])
        if "fvar" in f:
            f = instancer.instantiateVariableFont(f, {"wght": weight})
        cache[key] = f
    return cache[key]

def glyph_path(family, weight, ch, x, y, size):
    f = font(family, weight)
    gs = f.getGlyphSet()
    name = f.getBestCmap().get(ord(ch))
    if not name or ch == " ":
        return ""
    upm = f["head"].unitsPerEm
    k = size / upm
    pen = SVGPathPen(gs)
    tpen = TransformPen(pen, (k, 0, 0, -k, x, y))
    gs[name].draw(tpen)
    return pen.getCommands()

geo = json.load(open("geometry.json"))
VARIANTS = {
    "priage-logo":          ("logo",    {"ink": "#1a1d1f", "ia": "#2b5d87", "tag": "#485056"}),
    "priage-logo-reversed": ("logo",    {"ink": "#ffffff", "ia": "#cfe0ee", "tag": "#d9e6f1"}),
    "priage-logo-black":    ("logo",    {"ink": "#1a1d1f", "ia": "#1a1d1f", "tag": "#1a1d1f"}),
    "priage-logo-white":    ("logo",    {"ink": "#ffffff", "ia": "#ffffff", "tag": "#ffffff"}),
    "priage-logo-tagline":  ("tagline", {"ink": "#1a1d1f", "ia": "#2b5d87", "tag": "#485056"}),
    "priage-logo-tagline-reversed": ("tagline", {"ink": "#ffffff", "ia": "#cfe0ee", "tag": "#d9e6f1"}),
}
for name, (src, col) in VARIANTS.items():
    g = geo[src]
    pad = 8
    bx, by, bw, bh = g["bbox"]["x"] - pad, g["bbox"]["y"] - pad, g["bbox"]["w"] + 2 * pad, g["bbox"]["h"] + 2 * pad
    parts = []
    for t in g["texts"]:
        fill = col["tag"] if t["family"] == "Atkinson" else col["ink"]
        d = "".join(glyph_path(t["family"], t["weight"], gl["ch"], gl["x"], t["y"], t["size"]) for gl in t["glyphs"])
        parts.append(f'<path fill="{fill}" d="{d}"/>')
    for s in g["shapes"]:
        s = s.replace('#2b5d87', col["ia"]).replace(' class="ia"', '')
        parts.append(s)
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{bx:.2f} {by:.2f} {bw:.2f} {bh:.2f}" width="{bw:.0f}" height="{bh:.0f}" role="img" aria-label="PrIAge">\n<title>PrIAge</title>\n' + "\n".join(parts) + "\n</svg>\n"
    open(f"../{name}.svg", "w").write(svg)
    print("wrote", name, round(bw), "x", round(bh))
