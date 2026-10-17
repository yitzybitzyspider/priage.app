// PrIAge landing: seat fields. Every figure on the page is drawn as rows of
// joined waiting-room chairs, one chair per patient.
(() => {
  const SVG = "http://www.w3.org/2000/svg";
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const narrow = matchMedia("(max-width: 759px)");

  // One chair, front view, in a 24 x 30 cell: back, seat pan, beam drawn per row.
  const CELL_W = 24, CELL_H = 30, GAP = 4;

  function chair(x, y, kind, dense) {
    const g = document.createElementNS(SVG, "g");
    if (dense) {
      // at phone scale a dense field uses a solid chair silhouette so it never reads as hatching
      g.setAttribute("class", `chair chair-${kind}`);
      g.setAttribute("transform", `translate(${x} ${y})`);
      const p = document.createElementNS(SVG, "path");
      p.setAttribute("d", "M5 2h14a2 2 0 0 1 2 2v10h2v8H1v-8h2V4a2 2 0 0 1 2-2z");
      g.append(p);
      return g;
    }
    g.setAttribute("class", `chair chair-${kind}`);
    g.setAttribute("transform", `translate(${x} ${y})`);
    const back = document.createElementNS(SVG, "rect");
    back.setAttribute("x", "3"); back.setAttribute("y", "1");
    back.setAttribute("width", "18"); back.setAttribute("height", "14"); back.setAttribute("rx", "2");
    const pan = document.createElementNS(SVG, "rect");
    pan.setAttribute("x", "1.5"); pan.setAttribute("y", "16.5");
    pan.setAttribute("width", "21"); pan.setAttribute("height", "5"); pan.setAttribute("rx", "1");
    g.append(back, pan);
    return g;
  }

  // Deterministic scatter so marked seats look like real people spread through a room.
  function scatter(total, count, seed) {
    const picks = new Set();
    let s = seed;
    while (picks.size < count) {
      s = (s * 1103515245 + 12345) % 2147483648;
      picks.add(s % total);
    }
    return picks;
  }

  function build(fig) {
    const total = Number(fig.dataset.total);
    const marked = Number(fig.dataset.marked || 0);
    const kind = fig.dataset.kind || "missed"; // "missed" fills red, "lost" leaves an empty outlined seat
    const at = fig.dataset.at; // a single fixed seat index, otherwise scattered
    const cols = Number((narrow.matches && fig.dataset.colsNarrow) || fig.dataset.cols || 20);
    const rows = Math.ceil(total / cols);
    const marks = at !== undefined ? new Set([Number(at)]) : (fig.dataset.all ? new Set([...Array(total).keys()]) : scatter(total, marked, Number(fig.dataset.seed || 7)));

    const w = cols * CELL_W + (cols - 1) * GAP;
    const rowH = CELL_H + 10;
    const note = fig.dataset.note;
    const dense = narrow.matches && "dense" in fig.dataset;
    const top = note ? 32 : 0; // headroom for a label over a single marked seat
    const h = rows * rowH + top;
    let order = 0;
    const svg = document.createElementNS(SVG, "svg");
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("class", "seat-svg");

    for (let r = 0; r < rows; r++) {
      const inRow = Math.min(cols, total - r * cols);
      const row = document.createElementNS(SVG, "g");
      row.setAttribute("class", "row");
      row.style.setProperty("--r", r);
      const y = r * rowH;
      // the steel beam that joins a bank of chairs, with legs at the ends and every fifth seat
      const beamW = inRow * CELL_W + (inRow - 1) * GAP;
      const beam = document.createElementNS(SVG, "rect");
      beam.setAttribute("class", "beam");
      beam.setAttribute("x", "0"); beam.setAttribute("y", String(y + top + 23));
      beam.setAttribute("width", String(beamW)); beam.setAttribute("height", "2.5");
      row.append(beam);
      for (let c = 0; c <= inRow; c += 5) {
        const legX = Math.min(c, inRow - 1) * (CELL_W + GAP) + (c === inRow ? CELL_W - 3 : 1.5);
        const leg = document.createElementNS(SVG, "rect");
        leg.setAttribute("class", "beam");
        leg.setAttribute("x", String(legX)); leg.setAttribute("y", String(y + top + 24));
        leg.setAttribute("width", "2"); leg.setAttribute("height", "6");
        row.append(leg);
      }
      for (let c = 0; c < inRow; c++) {
        const i = r * cols + c;
        const seat = chair(c * (CELL_W + GAP), y + top, marks.has(i) ? kind : "plain", dense);
        if (marks.has(i)) seat.style.setProperty("--i", order++);
        row.append(seat);
      }
      svg.append(row);
    }
    if (note && at !== undefined) {
      // label the one seat the figure is about, directly on the field
      const idx = Number(at);
      const r = Math.floor(idx / cols), c = idx % cols;
      const cx = c * (CELL_W + GAP) + CELL_W / 2;
      const line = document.createElementNS(SVG, "line");
      line.setAttribute("class", "seat-note-line");
      line.setAttribute("x1", String(cx)); line.setAttribute("x2", String(cx));
      line.setAttribute("y1", "18"); line.setAttribute("y2", String(r * rowH + top - 2));
      const text = document.createElementNS(SVG, "text");
      text.setAttribute("class", "seat-note");
      text.setAttribute("x", String(cx - 2)); text.setAttribute("y", "14");
      text.setAttribute("text-anchor", cx > w * 0.6 ? "end" : "start");
      text.textContent = note;
      // a pale red plate behind the seat the figure is about, so it registers at a glance
      const plate = document.createElementNS(SVG, "rect");
      plate.setAttribute("class", "seat-plate");
      plate.setAttribute("x", String(c * (CELL_W + GAP) - 3)); plate.setAttribute("y", String(r * rowH + top - 3));
      plate.setAttribute("width", String(CELL_W + 6)); plate.setAttribute("height", "28"); plate.setAttribute("rx", "3");
      svg.insertBefore(plate, svg.firstChild);
      svg.append(line, text);
    }
    fig.querySelector(".seat-svg")?.remove();
    fig.querySelector(".seats-field").append(svg);
    fig.style.setProperty("--rows", rows);
  }

  const figures = [...document.querySelectorAll(".seats")];
  figures.forEach(build);

  // Held frames: each field fills row by row once, when it comes into view, then marks.
  if (!reduceMotion.matches && "IntersectionObserver" in window) {
    document.documentElement.classList.add("animate-seats");
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("in-view");
        io.unobserve(e.target);
      }
    }, { threshold: 0.2 });
    figures.forEach((f) => io.observe(f));
  }

  let lastNarrow = narrow.matches;
  addEventListener("resize", () => {
    if (narrow.matches === lastNarrow) return;
    lastNarrow = narrow.matches;
    figures.forEach(build);
  });
})();
