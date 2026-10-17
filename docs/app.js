// PrIAge landing: scenes from the waiting room. Each scene answers one question and
// plays forward as the page scrolls; nothing needs a click.
(() => {
  const SVG = "http://www.w3.org/2000/svg";
  const narrow = matchMedia("(max-width: 759px)");

  // One chair, front view, in a 24 x 30 cell: tall back, seat pan, two legs to the beam.
  const CELL_W = 24, CELL_H = 30, GAP = 4;

  function el(name, attrs) {
    const node = document.createElementNS(SVG, name);
    for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
    return node;
  }

  function chair(x, y, kind) {
    const g = el("g", { class: `chair chair-${kind}`, transform: `translate(${x} ${y})` });
    g.append(
      el("rect", { x: 4, y: 0, width: 16, height: 15, rx: 2 }),
      el("rect", { x: 1.5, y: 16, width: 21, height: 4.5, rx: 1 }),
      el("rect", { class: "leg", x: 4.5, y: 20.5, width: 2, height: 3 }),
      el("rect", { class: "leg", x: 17.5, y: 20.5, width: 2, height: 3 }),
    );
    return g;
  }

  // Seeded, unbiased scatter (mulberry32 + Fisher-Yates) so marked seats spread like people in a room.
  function scatter(total, count, seed) {
    let a = seed >>> 0;
    const rand = () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const idx = [...Array(total).keys()];
    for (let i = total - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    return new Set(idx.slice(0, count));
  }

  document.documentElement.classList.add("js");

  // ---------- The scroll engine ----------
  // A scene's panel sits in a taller track and sticks under the header while the page
  // scrolls through the track; progress 0..1 drives the scene. Panels too tall to stick
  // play while they pass through the middle of the screen instead.
  const topBar = document.querySelector(".top");
  const scenes = [];
  const clamp = (v) => Math.min(1, Math.max(0, v));

  const scene = (panel, span, render) => {
    const track = document.createElement("div");
    track.className = "track";
    panel.before(track);
    track.append(panel);
    const s = { panel, track, span, render, last: -1, stick: false, top: 0, h: 0 };
    scenes.push(s);
    return s;
  };

  const tick = () => {
    const vh = innerHeight, lead = vh * 0.1;
    for (const s of scenes) {
      const r = s.track.getBoundingClientRect();
      // a held scene starts just before it settles under the header; a loose one as it nears mid-screen
      const p = s.stick ? (s.top + lead - r.top) / (lead + s.span * vh) : (vh * 0.7 - r.top) / (vh * 0.5);
      const q = clamp((clamp(p) - 0.05) / 0.85); // a short hold at both ends
      if (Math.abs(q - s.last) < 0.002) continue;
      s.last = q;
      s.render(q);
    }
  };

  const askBar = document.querySelector(".ask-bar");
  const layout = () => {
    const vh = innerHeight, top = (topBar ? topBar.offsetHeight : 0) + 14;
    // on phones the floating ask bar covers the bottom of the screen
    const below = askBar && getComputedStyle(askBar).display !== "none" ? askBar.offsetHeight + 20 : 12;
    for (const s of scenes) {
      const ph = s.panel.offsetHeight;
      s.top = top;
      s.stick = ph <= vh - top - below;
      s.track.classList.toggle("stick", s.stick);
      s.panel.style.top = s.stick ? `${top}px` : "";
      const h = s.stick ? Math.round(ph + s.span * vh) : 0;
      if (Math.abs(h - s.h) > 4) { s.h = h; s.track.style.height = h ? `${h}px` : ""; }
      s.last = -1;
    }
    tick();
  };

  // ---------- Triage: 100 patients who needed life-saving care ----------
  const triage = document.querySelector(".fig.seats");
  if (triage) {
    const total = 100, marked = Number(triage.dataset.marked), seed = Number(triage.dataset.seed);
    const field = triage.querySelector(".seats-field");
    const count = document.getElementById("hero-count");
    let marks = [];
    const build = () => {
      const cols = Number(narrow.matches ? triage.dataset.colsNarrow : triage.dataset.cols);
      const rows = Math.ceil(total / cols), rowH = CELL_H + 10;
      const w = cols * CELL_W + (cols - 1) * GAP;
      const hit = scatter(total, marked, seed);
      const svg = el("svg", { viewBox: `0 0 ${w} ${rows * rowH}`, "aria-hidden": "true", class: "seat-svg" });
      const found = [];
      for (let r = 0; r < rows; r++) {
        const inRow = Math.min(cols, total - r * cols), y = r * rowH;
        // the steel beam that joins a bank of chairs, with floor legs at the ends and every fifth seat
        svg.append(el("rect", { class: "beam", x: 0, y: y + 23.5, width: inRow * CELL_W + (inRow - 1) * GAP, height: 2.5 }));
        for (let c = 0; c <= inRow; c += 5) {
          const legX = Math.min(c, inRow - 1) * (CELL_W + GAP) + (c === inRow ? CELL_W - 3 : 1.5);
          svg.append(el("rect", { class: "beam", x: legX, y: y + 25, width: 2, height: 5 }));
        }
        for (let c = 0; c < inRow; c++) {
          const x = c * (CELL_W + GAP);
          if (hit.has(r * cols + c)) {
            // a pale plate behind each marked seat: a cue that survives grayscale
            const plate = el("rect", { class: "seat-plate", x: x - 2.5, y: y - 2.5, width: CELL_W + 5, height: 28.5, rx: 3 });
            const seat = chair(x, y, "missed");
            svg.append(plate, seat);
            found.push([plate, seat]);
          } else {
            svg.append(chair(x, y, "plain"));
          }
        }
      }
      // reveal in a scattered order, not left to right
      marks = [...scatter(found.length, found.length, seed + 1)].map((i) => found[i]);
      field.querySelector(".seat-svg")?.remove();
      field.querySelector(".scene-read").before(svg);
    };
    build();
    const s = scene(field, 0.9, (q) => {
      const k = Math.round(q * marked);
      marks.forEach(([plate, seat], j) => { plate.classList.toggle("off", j >= k); seat.classList.toggle("off", j >= k); });
      count.textContent = k;
    });
    narrow.addEventListener("change", () => { build(); s.last = -1; tick(); });
  }

  // ---------- The wait before triage: the room fills up ----------
  const roomField = document.querySelector(".room-one .room-field");
  if (roomField) {
    const STEPS = [
      { occ: 5, red: 1, pct: "12%", title: "A quiet hour", sub: "0 to 5 new arrivals in the past hour" },
      { occ: 10, red: 5, pct: "49%", title: "Filling up", sub: "6 to 10 new arrivals in the past hour" },
      { occ: 15, red: 10, pct: "64%", title: "Busy", sub: "11 to 15 new arrivals in the past hour" },
      { occ: 20, red: 14, pct: "68%", title: "The busiest hours", sub: "16 or more new arrivals in the past hour" },
    ];
    const TOTAL = 24;
    const order = [...scatter(TOTAL, TOTAL, 41)]; // the order people arrive and sit down
    const seats = [];
    let cur = 3;
    const buildRoom = () => {
      const cols = narrow.matches ? 6 : 8, rows = Math.ceil(TOTAL / cols);
      const w = cols * CELL_W + (cols - 1) * GAP, rowH = CELL_H + 10;
      const svg = el("svg", { viewBox: `0 0 ${w} ${rows * rowH}`, class: "seat-svg" });
      seats.length = 0;
      for (let r = 0; r < rows; r++) {
        const n = Math.min(cols, TOTAL - r * cols), y = r * rowH;
        svg.append(el("rect", { class: "beam", x: 0, y: y + 23.5, width: n * CELL_W + (n - 1) * GAP, height: 2.5 }));
        for (let c = 0; c < n; c++) { const s = chair(c * (CELL_W + GAP), y, "empty"); svg.append(s); seats.push(s); }
      }
      roomField.replaceChildren(svg);
    };
    const show = (i) => {
      const st = STEPS[i];
      cur = i;
      seats.forEach((s) => s.setAttribute("class", "chair chair-empty"));
      order.slice(0, st.occ).forEach((k, n) => seats[k].setAttribute("class", `chair ${n < st.red ? "chair-missed" : "chair-plain"}`));
      document.getElementById("busy-pct").textContent = st.pct;
      document.getElementById("room-title").textContent = st.title;
      document.getElementById("room-sub").textContent = st.sub;
      document.querySelectorAll(".room-steps i").forEach((d, k) => d.classList.toggle("on", k <= i));
    };
    buildRoom();
    show(3);
    const s = scene(roomField.closest(".fig-panel"), 1.4, (q) => show(Math.min(3, Math.floor(q * 4))));
    narrow.addEventListener("change", () => { buildRoom(); show(cur); });
  }

  // ---------- Waiting for a bed: the wall clock runs as the page scrolls ----------
  const clock = document.querySelector(".clock-svg");
  if (clock) {
    const R = 88;
    clock.append(el("circle", { class: "face", r: 114 }));
    for (let i = 0; i < 60; i++) {
      const a = (i / 60) * Math.PI * 2, big = i % 5 === 0, r1 = big ? 93 : 99;
      clock.append(el("line", { class: big ? "tick tick-h" : "tick", x1: Math.sin(a) * r1, y1: -Math.cos(a) * r1, x2: Math.sin(a) * 106, y2: -Math.cos(a) * 106 }));
    }
    for (const [n, a] of [[12, 0], [3, 90], [6, 180], [9, 270]]) {
      const t = el("text", { class: "num", x: Math.sin(a * Math.PI / 180) * 50, y: -Math.cos(a * Math.PI / 180) * 50 + 7, "text-anchor": "middle" });
      t.textContent = n; clock.append(t);
    }
    const band = el("path", { class: "band" }); clock.append(band);
    const hand = el("line", { class: "hand", x1: 0, y1: 8, x2: 0, y2: -40 }); clock.append(hand);
    clock.append(el("circle", { class: "pin", r: 6 }));
    const arc = (h) => {
      if (h <= 0) return "";
      const steps = Math.max(2, Math.round(h * 8)), outer = [], inner = [];
      for (let k = 0; k <= steps; k++) {
        const hh = (h * k) / steps, a = (hh / 12) * Math.PI * 2, th = 4 + (hh / 12) * 18;
        outer.push(`${(Math.sin(a) * R).toFixed(2)} ${(-Math.cos(a) * R).toFixed(2)}`);
        inner.push(`${(Math.sin(a) * (R - th)).toFixed(2)} ${(-Math.cos(a) * (R - th)).toFixed(2)}`);
      }
      return `M${outer.join(" L")} L${inner.reverse().join(" L")} Z`;
    };
    const pct = document.getElementById("bed-pct"), txt = document.getElementById("bed-text");
    const showBed = (h) => {
      band.setAttribute("d", arc(h));
      hand.setAttribute("transform", `rotate(${h * 30})`);
      const whole = Math.floor(h);
      if (whole < 2) { pct.textContent = "2.5%"; txt.textContent = "died in the hospital after waiting under 2 hours for a bed"; }
      else if (whole < 12) { pct.textContent = `${whole} hours`; txt.textContent = "deaths generally rose with each hour of waiting"; }
      else { pct.textContent = "4.5%"; txt.textContent = "died in the hospital after waiting 12 hours or more for a bed"; }
    };
    showBed(12);
    scene(clock.closest(".fig-panel"), 1.2, (q) => showBed(q * 12));
  }

  // ---------- Beds: each window is 10,000 staffed US beds; beds lose their staff, patients stay ----------
  const building = document.querySelector(".ward .building");
  if (building) {
    const COLS = 10, FLOORS = 8, WW = 26, WH = 20, GX = 10, GY = 12, PAD = 18, SIGN = 44, GROUND = 58;
    const W = PAD * 2 + COLS * WW + (COLS - 1) * GX;
    const bodyH = PAD * 2 + FLOORS * WH + (FLOORS - 1) * GY;
    const H = SIGN + bodyH + GROUND;
    const svg = el("svg", { viewBox: `-4 0 ${W + 8} ${H + 4}`, class: "building-svg" });
    svg.append(
      el("rect", { class: "b-pole", x: W / 2 - 2, y: 30, width: 4, height: SIGN - 30 }),
      el("rect", { class: "b-sign", x: W / 2 - 17, y: 0, width: 34, height: 34, rx: 4 }),
      Object.assign(el("text", { class: "b-sign-h", x: W / 2, y: 26, "text-anchor": "middle" }), { textContent: "H" }),
      el("rect", { class: "b-body", x: 0, y: SIGN, width: W, height: bodyH + GROUND, rx: 2 }),
      el("rect", { class: "b-ground", x: 0, y: SIGN + bodyH, width: W, height: 3 }),
    );
    // the ER entrance at street level
    const doorW = 86, dx = W / 2 - doorW / 2, gy = SIGN + bodyH;
    svg.append(
      el("rect", { class: "b-plate", x: dx - 22, y: gy + 9, width: doorW + 44, height: 16, rx: 2 }),
      Object.assign(el("text", { class: "b-plate-t", x: W / 2, y: gy + 21.5, "text-anchor": "middle" }), { textContent: "EMERGENCY" }),
      el("rect", { class: "b-door", x: dx, y: gy + 30, width: doorW / 2 - 2, height: GROUND - 30 }),
      el("rect", { class: "b-door", x: W / 2 + 2, y: gy + 30, width: doorW / 2 - 2, height: GROUND - 30 }),
    );
    const wins = [];
    for (let f = 0; f < FLOORS; f++) {
      for (let c = 0; c < COLS; c++) {
        const x = PAD + c * (WW + GX), y = SIGN + PAD + f * (WH + GY);
        const g = el("g", { class: "w w-open", transform: `translate(${x} ${y})` });
        g.append(
          el("rect", { class: "w-frame", x: 0, y: 0, width: WW, height: WH, rx: 1.5 }),
          el("rect", { class: "w-bed", x: 4, y: 12.5, width: 18, height: 3.5, rx: 1 }),
          el("rect", { class: "w-bed", x: 3, y: 8.5, width: 2.5, height: 9 }),
          el("circle", { class: "w-head", cx: 8.6, cy: 10.4, r: 2.3 }),
          el("rect", { class: "w-blanket", x: 11, y: 9.4, width: 11, height: 3.6, rx: 1.4 }),
          el("line", { class: "w-x", x1: 3, y1: WH - 3, x2: WW - 3, y2: 3 }),
        );
        svg.append(g); wins.push(g);
      }
    }
    building.append(svg);
    // 51 patients in both periods; 13 of the 29 open beds lose their staff after the pandemic
    const order = [...scatter(80, 80, 66)];
    const role = new Array(80);
    order.forEach((w, n) => { role[w] = n < 51 ? "full" : n < 64 ? "cut" : "open"; });
    const ERAS = [
      { era: "2009 to 2019", pct: "63.9% full", text: "802,000 staffed beds for about 510,000 patients a day" },
      { era: "2023 to 2024", pct: "75.3% full", text: "674,000 staffed beds for the same 510,000 patients a day" },
    ];
    const showEra = (e) => {
      wins.forEach((g, k) => g.setAttribute("class", `w w-${role[k] === "cut" ? (e ? "closed" : "open") : role[k]}`));
      document.getElementById("ward-era").textContent = ERAS[e].era;
      document.getElementById("ward-pct").textContent = ERAS[e].pct;
      document.getElementById("ward-text").textContent = ERAS[e].text;
    };
    showEra(1);
    scene(building.closest(".fig-panel"), 0.9, (q) => showEra(q < 0.5 ? 0 : 1));
  }

  // ---------- Nurses: 100 who left a job because of burnout; red said staffing was inadequate ----------
  const lockerField = document.querySelector(".lockers .locker-field");
  if (lockerField) {
    const MARKED = 63;
    const order = [...scatter(100, 100, 11)];
    const count = document.getElementById("locker-count");
    const LW = 20, LH = 44, BANK_GAP = 8;
    let lockers = [], lastK = MARKED;
    const buildLockers = () => {
      const cols = narrow.matches ? 20 : 25, rows = 100 / cols, per = 5;
      const w = cols * LW + (cols / per - 1) * BANK_GAP, rowH = LH + 12;
      const svg = el("svg", { viewBox: `0 0 ${w} ${rows * rowH}`, class: "seat-svg locker-svg" });
      lockers = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * LW + Math.floor(c / per) * BANK_GAP, y = r * rowH;
          // a nurse who left: the door stands ajar and the name card is gone
          const g = el("g", { class: "locker", transform: `translate(${x} ${y})` });
          g.append(
            el("rect", { class: "l-inside", x: 0.5, y: 0, width: LW - 1, height: LH }),
            el("rect", { class: "l-ajar", x: 0.5, y: 0, width: LW - 7, height: LH }),
            el("rect", { class: "l-vent", x: 4, y: 5, width: LW - 12, height: 1.6 }),
            el("rect", { class: "l-vent", x: 4, y: 8.5, width: LW - 12, height: 1.6 }),
            el("rect", { class: "l-vent", x: 4, y: 12, width: LW - 12, height: 1.6 }),
          );
          svg.append(g); lockers.push(g);
        }
        // the bench in front of each row
        svg.append(el("rect", { class: "beam", x: 0, y: r * rowH + LH + 4, width: w, height: 2.5 }));
      }
      lockerField.replaceChildren(svg);
    };
    const showLockers = (k) => {
      lastK = k;
      order.forEach((idx, j) => lockers[idx].classList.toggle("l-marked", j < k));
      count.textContent = k;
    };
    buildLockers();
    showLockers(MARKED);
    scene(lockerField.closest(".fig-panel"), 0.9, (q) => showLockers(Math.round(q * MARKED)));
    narrow.addEventListener("change", () => { buildLockers(); showLockers(lastK); });
  }

  // Scenes without steps (the exit signs, the two bills) settle in once, when they come into view.
  const settled = [...document.querySelectorAll(".chart.settle")];
  if ("IntersectionObserver" in window) {
    document.documentElement.classList.add("animate-charts");
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add("in-view"); io.unobserve(e.target); }
    }, { threshold: 0.3 });
    settled.forEach((f) => io.observe(f));
  }

  // Printing shows every scene finished.
  addEventListener("beforeprint", () => {
    settled.forEach((f) => f.classList.add("in-view"));
    scenes.forEach((s) => s.render(1));
  });

  let queued = false;
  addEventListener("scroll", () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; tick(); });
  }, { passive: true });
  addEventListener("resize", layout);
  if ("ResizeObserver" in window) {
    let pending = false;
    const ro = new ResizeObserver(() => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => { pending = false; layout(); });
    });
    scenes.forEach((s) => ro.observe(s.panel));
  }
  layout();
  document.fonts?.ready.then(layout);

  // Copy the address, for desktops with no mail app.
  for (const btn of document.querySelectorAll("[data-copy]")) {
    const label = btn.querySelector(".copy-label");
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        label.textContent = "Copied";
      } catch {
        label.textContent = btn.dataset.copy;
      }
      setTimeout(() => { label.textContent = "Copy email"; }, 2400);
    });
  }

  // A hairline under the sticky header once the page has moved.
  const top = document.querySelector(".top");
  const onScroll = () => top && top.classList.toggle("stuck", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // On phones, a quiet bar keeps the ask in reach once the hero has scrolled away.
  const bar = document.querySelector(".ask-bar");
  const hero = document.querySelector(".hero");
  const talk = document.querySelector("#talk");
  if (bar && hero && talk && "IntersectionObserver" in window) {
    let heroGone = false, talkShown = false;
    const sync = () => bar.classList.toggle("show", heroGone && !talkShown);
    new IntersectionObserver(([e]) => { heroGone = !e.isIntersecting; sync(); }).observe(hero);
    new IntersectionObserver(([e]) => { talkShown = e.isIntersecting; sync(); }).observe(talk);
  }
})();
