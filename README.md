# priage.app

Landing page for PrIAge, served by GitHub Pages from `docs/` at https://priage.app.

Static HTML, CSS and a little JS; no build step. Edit files in `docs/` and push to `main`.

- `docs/index.html`, `docs/styles.css`, `docs/app.js`: the page
- `docs/fonts/`: self-hosted Big Shoulders, Atkinson Hyperlegible Next (OFL) and DSEG (OFL)
- `docs/CNAME`: custom domain for Pages
- `PRODUCT.md`, `DESIGN.md`, `.impeccable/`: product and design notes (not published)

Preview locally:

```bash
python3 -m http.server 4321 --directory docs
```
