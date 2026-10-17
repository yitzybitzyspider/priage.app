// PrIAge landing: seat fields. Every figure on the page is drawn as rows of
// joined waiting-room chairs, one chair per patient.
(() => {
  const SVG = "http://www.w3.org/2000/svg";
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const narrow = matchMedia("(max-width: 759px)");

  // One chair, front view, in a 24 x 30 cell: tall back, seat pan, two legs to the beam.
  const CELL_W = 24, CELL_H = 30, GAP = 4;

  function el(name, attrs) {
    const node = document.createElementNS(SVG, name);
    for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
    return node;
  }

  function chair(x, y, kind, dense) {
    const g = el("g", { class: `chair chair-${kind}`, transform: `translate(${x} ${y})` });
    if (dense) {
      // at phone scale a dense field uses a solid silhouette so it never reads as hatching
      g.append(el("path", { d: "M5 1h14a2 2 0 0 1 2 2v11h2v8H1v-8h2V3a2 2 0 0 1 2-2z" }));
      return g;
    }
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

  function build(fig) {
    const total = Number(fig.dataset.total);
    const marked = Number(fig.dataset.marked || 0);
    const kind = fig.dataset.kind || "missed"; // "missed" fills red, "lost" leaves an empty outlined seat
    const at = fig.dataset.at; // a single fixed seat index, otherwise scattered
    const cols = Number((narrow.matches && fig.dataset.colsNarrow) || fig.dataset.cols || 20);
    const rows = Math.ceil(total / cols);
    const marks = at !== undefined ? new Set([Number(at)])
      : fig.dataset.all ? new Set([...Array(total).keys()])
      : scatter(total, marked, Number(fig.dataset.seed || 7));
    const note = fig.dataset.note;
    const dense = narrow.matches && "dense" in fig.dataset;
    const plates = kind === "missed" || note; // a pale plate behind each marked seat: a cue that survives grayscale
    const top = note ? 32 : 0; // headroom for a label over a single marked seat

    const w = cols * CELL_W + (cols - 1) * GAP;
    const rowH = CELL_H + 10;
    const h = rows * rowH + top;
    const svg = el("svg", { viewBox: `0 0 ${w} ${h}`, "aria-hidden": "true", class: "seat-svg" });
    let order = 0;

    for (let r = 0; r < rows; r++) {
      const inRow = Math.min(cols, total - r * cols);
      const row = el("g", { class: "row" });
      const y = r * rowH + top;
      // the steel beam that joins a bank of chairs, with floor legs at the ends and every fifth seat
      row.append(el("rect", { class: "beam", x: 0, y: y + 23.5, width: inRow * CELL_W + (inRow - 1) * GAP, height: 2.5 }));
      for (let c = 0; c <= inRow; c += 5) {
        const legX = Math.min(c, inRow - 1) * (CELL_W + GAP) + (c === inRow ? CELL_W - 3 : 1.5);
        row.append(el("rect", { class: "beam", x: legX, y: y + 25, width: 2, height: 5 }));
      }
      for (let c = 0; c < inRow; c++) {
        const i = r * cols + c;
        const x = c * (CELL_W + GAP);
        const isMarked = marks.has(i);
        if (isMarked && plates && !dense) {
          const plate = el("rect", { class: "seat-plate", x: x - 2.5, y: y - 2.5, width: CELL_W + 5, height: 28.5, rx: 3 });
          plate.style.setProperty("--i", order);
          row.append(plate);
        }
        const seat = chair(x, y, isMarked ? kind : "plain", dense);
        if (isMarked) seat.style.setProperty("--i", order++);
        row.append(seat);
      }
      svg.append(row);
    }

    if (note && at !== undefined) {
      // label the one seat the figure is about, directly on the field
      const idx = Number(at);
      const c = idx % cols;
      const cx = c * (CELL_W + GAP) + CELL_W / 2;
      svg.append(
        el("line", { class: "seat-note-line", x1: cx, x2: cx, y1: 18, y2: Math.floor(idx / cols) * rowH + top - 4 }),
        Object.assign(el("text", { class: "seat-note", x: cx - 2, y: 14, "text-anchor": cx > w * 0.6 ? "end" : "start" }), { textContent: note }),
      );
    }
    fig.querySelector(".seat-svg")?.remove();
    fig.querySelector(".seats-field").append(svg);
  }

  const figures = [...document.querySelectorAll(".seats")];
  figures.forEach(build);
  document.documentElement.classList.add("js");
  const charts = [...document.querySelectorAll(".chart")];

  // Held frames: when a field comes into view its marked seats switch to red one after another.
  if (!reduceMotion.matches && "IntersectionObserver" in window) {
    document.documentElement.classList.add("animate-seats");
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("in-view");
        io.unobserve(e.target);
      }
    }, { threshold: 0.2 });
    document.documentElement.classList.add("animate-charts");
    [...figures, ...charts].forEach((f) => io.observe(f));
    // printing should always show the finished figures
    addEventListener("beforeprint", () => [...figures, ...charts].forEach((f) => f.classList.add("in-view")));
  }

  let lastNarrow = narrow.matches;
  addEventListener("resize", () => {
    if (narrow.matches === lastNarrow) return;
    lastNarrow = narrow.matches;
    figures.forEach(build);
  });

  // Hero lens: what the triage desk sees versus what was really in the room.
  for (const btn of document.querySelectorAll(".lens button")) {
    btn.addEventListener("click", () => {
      const fig = btn.closest(".fig");
      const desk = btn.dataset.lens === "desk";
      fig.classList.toggle("lens-desk", desk);
      fig.classList.add("in-view");
      for (const b of btn.parentElement.children) b.setAttribute("aria-pressed", String(b === btn));
    });
  }

  const once = (elm, fn) => {
    if (!elm || reduceMotion.matches || !("IntersectionObserver" in window)) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { o.disconnect(); fn(); } }, { threshold: 0.45 });
    o.observe(elm);
  };

  // The waiting room filling up: drag from a quiet hour to the busiest.
  const busy = document.getElementById("busy");
  const roomField = document.querySelector(".room-one .room-field");
  if (busy && roomField) {
    const STEPS = [
      { occ: 5, red: 1, pct: "12%", title: "A quiet hour", sub: "0 to 5 new arrivals in the past hour" },
      { occ: 10, red: 5, pct: "49%", title: "Filling up", sub: "6 to 10 new arrivals in the past hour" },
      { occ: 15, red: 10, pct: "64%", title: "Busy", sub: "11 to 15 new arrivals in the past hour" },
      { occ: 20, red: 14, pct: "68%", title: "The busiest hours", sub: "16 or more new arrivals in the past hour" },
    ];
    const COLS = 8, TOTAL = 24;
    const order = [...scatter(TOTAL, TOTAL, 41)];      // the order people arrive and sit down
    const seats = [];
    const buildRoom = () => {
      const cols = narrow.matches ? 6 : COLS, rows = Math.ceil(TOTAL / cols);
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
      const occupied = order.slice(0, st.occ);
      seats.forEach((s, k) => s.setAttribute("class", "chair chair-empty"));
      occupied.forEach((k, n) => seats[k].setAttribute("class", `chair ${n < st.red ? "chair-missed" : "chair-plain"}`));
      document.getElementById("busy-pct").textContent = st.pct;
      document.getElementById("room-title").textContent = st.title;
      document.getElementById("room-sub").textContent = st.sub;
      busy.setAttribute("aria-valuetext", `${st.title}, ${st.sub}: ${st.pct} still waiting after 10 minutes`);
    };
    buildRoom();
    show(+busy.value);
    let touched = false;
    busy.addEventListener("input", () => { touched = true; show(+busy.value); });
    narrow.addEventListener("change", () => { buildRoom(); show(+busy.value); });
    once(roomField, () => {
      let i = 0; busy.value = 0; show(0);
      const t = setInterval(() => { if (touched || ++i > 3) return clearInterval(t); busy.value = i; show(i); }, 1100);
    });
  }

  // Two ways out: switch between the study's three outcomes.
  const OUT = {
    die: ["2.6×", "The odds of dying within 30 days, adjusted for other factors"],
    back: ["2.6×", "The odds of coming back to the ER within 72 hours, adjusted for other factors"],
    icu: ["1.4×", "The odds of needing intensive care within 30 days, adjusted for other factors"],
  };
  const tabs = [...document.querySelectorAll(".exits .tabs [role=tab]")];
  const pick = (tab) => {
    for (const t of tabs) { t.setAttribute("aria-selected", String(t === tab)); t.tabIndex = t === tab ? 0 : -1; }
    const [num, axis] = OUT[tab.dataset.out];
    document.getElementById("exit-num").textContent = num;
    document.getElementById("exit-axis").textContent = axis;
  };
  tabs.forEach((t, i) => {
    t.tabIndex = i === 0 ? 0 : -1;
    t.addEventListener("click", () => pick(t));
    t.addEventListener("keydown", (e) => {
      const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!d) return;
      const next = tabs[(i + d + tabs.length) % tabs.length];
      next.focus(); pick(next);
    });
  });

  // The wall clock: hours waiting for a bed. The band thickens as the hand goes round.
  const bed = document.getElementById("bed");
  const clock = document.querySelector(".clock-svg");
  if (bed && clock) {
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
    const showBed = (h) => {
      band.setAttribute("d", arc(h));
      hand.setAttribute("transform", `rotate(${h * 30})`);
      const pct = document.getElementById("bed-pct"), txt = document.getElementById("bed-text");
      if (h < 2) { pct.textContent = "2.5%"; txt.textContent = "died in the hospital after waiting under 2 hours for a bed"; }
      else if (h < 12) { pct.textContent = "Rising"; txt.textContent = `at ${h} hours: deaths generally rose with each hour of waiting`; }
      else { pct.textContent = "4.5%"; txt.textContent = "died in the hospital after waiting 12 hours or more for a bed"; }
      bed.setAttribute("aria-valuetext", h >= 12 ? "12 hours or more" : `${h} hours`);
    };
    showBed(+bed.value);
    let touched = false;
    bed.addEventListener("input", () => { touched = true; showBed(+bed.value); });
    once(clock, () => {
      let h = 0; bed.value = 0; showBed(0);
      const t = setInterval(() => { if (touched || ++h > 12) return clearInterval(t); bed.value = h; showBed(h); }, 260);
    });
  }

  // A small tablist helper: click and arrow keys, one selected at a time.
  const tablist = (list, onPick) => {
    const tabs = [...list.querySelectorAll("[role=tab]")];
    const pick = (tab) => {
      for (const t of tabs) { t.setAttribute("aria-selected", String(t === tab)); t.tabIndex = t === tab ? 0 : -1; }
      onPick(tab);
    };
    tabs.forEach((t, i) => {
      t.tabIndex = t.getAttribute("aria-selected") === "true" ? 0 : -1;
      t.addEventListener("click", () => pick(t));
      t.addEventListener("keydown", (e) => {
        const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!d) return;
        const next = tabs[(i + d + tabs.length) % tabs.length];
        next.focus(); pick(next);
      });
    });
    return { tabs, pick };
  };

  // The hospital: each window is 10,000 staffed US beds. Beds lose their staff; patients stay.
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
    const order = [...scatter(80, 80, 66)];
    const role = new Array(80);
    order.forEach((w, n) => {
      role[w] = n < 51 ? "full" : n < 64 ? "cut" : n < 70 ? "later" : "open";
    });
    const ERAS = [
      { pct: "63.9% full", text: "802,000 staffed beds for about 510,000 patients a day" },
      { pct: "75.3% full", text: "674,000 staffed beds for about 510,000 patients a day" },
      { pct: "85% full", text: "projected for adult beds as the population ages, if staffed beds stay where they are" },
    ];
    const showEra = (e) => {
      wins.forEach((g, k) => {
        const r = role[k];
        const state = r === "full" ? "full" : r === "cut" ? (e === 0 ? "open" : "closed") : r === "later" ? (e === 2 ? "full" : "open") : "open";
        g.setAttribute("class", `w w-${state}`);
      });
      document.getElementById("ward-pct").textContent = ERAS[e].pct;
      document.getElementById("ward-text").textContent = ERAS[e].text;
    };
    let touched = false;
    const { tabs: eraTabs, pick: pickEra } = tablist(document.querySelector(".ward [role=tablist]"), (t) => { showEra(+t.dataset.era); });
    eraTabs.forEach((t) => t.addEventListener("click", () => { touched = true; }));
    showEra(1);
    once(building, () => {
      pickEra(eraTabs[0]);
      setTimeout(() => { if (!touched) pickEra(eraTabs[1]); }, 1600);
    });
  }

  // Staff lockers: 100 nurses who burned out. Open lockers belong to nurses who left.
  const lockerField = document.querySelector(".lockers .locker-field");
  if (lockerField) {
    const DATA = {
      left: { staff: [63, "63.0%", "of those who left named inadequate staffing"],
              stress: [69, "68.6%", "of those who left named a stressful work environment"] },
      stay: { staff: [61, "60.9%", "of those thinking about leaving named inadequate staffing"],
              stress: [60, "59.5%", "of those thinking about leaving named a stressful work environment"] },
    };
    const ORDER = { staff: [...scatter(100, 100, 11)], stress: [...scatter(100, 100, 12)] };
    let who = "left", why = "staff";
    const LW = 20, LH = 44, BANK_GAP = 8;
    const lockers = [];
    const buildLockers = () => {
      const cols = narrow.matches ? 10 : 25, rows = 100 / cols, per = 5;
      const banks = cols / per;
      const w = cols * LW + (banks - 1) * BANK_GAP, rowH = LH + 12;
      const svg = el("svg", { viewBox: `0 0 ${w} ${rows * rowH}`, class: "seat-svg locker-svg" });
      lockers.length = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * LW + Math.floor(c / per) * BANK_GAP, y = r * rowH;
          const g = el("g", { class: "locker", transform: `translate(${x} ${y})` });
          g.append(
            el("rect", { class: "l-inside", x: 0.5, y: 0, width: LW - 1, height: LH }),
            el("rect", { class: "l-door", x: 0.5, y: 0, width: LW - 1, height: LH }),
            el("rect", { class: "l-ajar", x: 0.5, y: 0, width: LW - 7, height: LH }),
            el("rect", { class: "l-vent", x: 4, y: 5, width: LW - 12, height: 1.6 }),
            el("rect", { class: "l-vent", x: 4, y: 8.5, width: LW - 12, height: 1.6 }),
            el("rect", { class: "l-vent", x: 4, y: 12, width: LW - 12, height: 1.6 }),
            el("rect", { class: "l-tag", x: 4, y: 18, width: LW - 8, height: 6, rx: 0.8 }),
            el("rect", { class: "l-handle", x: LW - 6, y: 27, width: 2.2, height: 8, rx: 1 }),
          );
          svg.append(g); lockers.push(g);
        }
        // the bench in front of each row
        svg.append(el("rect", { class: "beam", x: 0, y: r * rowH + LH + 4, width: w, height: 2.5 }));
      }
      lockerField.replaceChildren(svg);
    };
    const showLockers = () => {
      const [n, pct, text] = DATA[who][why];
      const marked = new Set(ORDER[why].slice(0, n));
      lockers.forEach((g, k) => {
        g.setAttribute("class", `locker ${who === "left" ? "l-open" : "l-closed"}${marked.has(k) ? " l-marked" : ""}`);
        g.style.setProperty("--i", ORDER[why].indexOf(k));
      });
      document.getElementById("locker-pct").textContent = pct;
      document.getElementById("locker-text").textContent = text;
    };
    buildLockers();
    showLockers();
    tablist(document.querySelector(".lockers [role=tablist]"), (t) => { who = t.dataset.who; showLockers(); });
    for (const b of document.querySelectorAll(".lockers [data-why]")) {
      b.addEventListener("click", () => {
        why = b.dataset.why;
        for (const o of b.parentElement.children) o.setAttribute("aria-pressed", String(o === b));
        showLockers();
      });
    }
    narrow.addEventListener("change", () => { buildLockers(); showLockers(); });
  }

  // Two bills for the same day of care: waiting in the ER for a bed, and in the bed.
  const bills = document.querySelector(".bills");
  if (bills) {
    const BILL = {
      ward: { kind: "a regular bed", er: ["$1,856", 293], in: ["$993", 313], more: "+$863" },
      icu: { kind: "an intensive care bed", er: ["$2,267", 419], in: ["$2,165", 787], more: "+$102" },
    };
    for (const r of bills.querySelectorAll(".receipt")) {
      const strip = document.createElement("div");
      strip.className = "day-strip";
      strip.setAttribute("aria-hidden", "true");
      strip.innerHTML = '<span class="day-fill"></span>';
      r.append(strip, Object.assign(document.createElement("p"), { className: "day-label", textContent: "Nursing time in a 24-hour day" }));
    }
    const [erR, inR] = bills.querySelectorAll(".receipt");
    const showBill = (k) => {
      const b = BILL[k];
      for (const s of bills.querySelectorAll(".bed-kind")) s.textContent = b.kind;
      document.getElementById("r-er-cost").textContent = b.er[0];
      document.getElementById("r-in-cost").textContent = b.in[0];
      document.getElementById("r-er-min").textContent = `${b.er[1]} min`;
      document.getElementById("r-in-min").textContent = `${b.in[1]} min`;
      erR.querySelector(".day-fill").style.width = `${(b.er[1] / 1440) * 100}%`;
      inR.querySelector(".day-fill").style.width = `${(b.in[1] / 1440) * 100}%`;
      document.getElementById("bill-more").textContent = b.more;
      document.getElementById("bill-text").textContent = `more a day in the ER, with ${b.in[1] - b.er[1]} fewer minutes of nursing time`;
    };
    showBill("ward");
    tablist(bills.querySelector("[role=tablist]"), (t) => showBill(t.dataset.bed));
  }

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
