// PrIAge landing: a strip of scenes from one ER visit. Each scene answers one question and
// plays once, on its own, when it comes into view; nothing needs a click.
(() => {
  const SVG = "http://www.w3.org/2000/svg";
  const narrow = matchMedia("(max-width: 759px)");
  const still = matchMedia("(prefers-reduced-motion: reduce)");

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
    return idx.slice(0, count);
  }

  document.documentElement.classList.add("js");

  // ---------- Play once, in view ----------
  // Every scene rests on its final state. With motion allowed it rewinds to its start, then plays
  // forward the first time most of it is on screen (scrolled down to, or swiped across to).
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const pause = (ms) => new Promise((r) => setTimeout(r, ms));
  const run = (ms, frame) => new Promise((done) => {
    let t0;
    const step = (now) => {
      t0 ??= now;
      const t = Math.min(1, (now - t0) / ms);
      frame(t);
      t < 1 ? requestAnimationFrame(step) : done();
    };
    requestAnimationFrame(step);
  });

  const finishers = [];
  // "Most of it is on screen": nearly its full width (so a card peeking in from the side waits),
  // and 60% of its height or of the screen's, whichever is smaller (so a scene taller than a
  // landscape phone still plays).
  const seen = (e) => {
    const r = e.boundingClientRect, v = e.intersectionRect;
    return v.width >= r.width * 0.85 && v.height >= Math.min(r.height, innerHeight) * 0.6;
  };
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (!e.isIntersecting || !seen(e)) continue;
          io.unobserve(e.target);
          e.target._play?.();
        }
      }, { threshold: Array.from({ length: 21 }, (_, i) => i / 20) })
    : null;

  function onView(node, { start, play, end }) {
    finishers.push(end);
    if (!io || still.matches) { end(); return; }
    start();
    node._play = () => { node._play = null; play(); };
    io.observe(node);
  }

  // ---------- 1. The wait to be triaged: the room fills up ----------
  const room = document.querySelector('[data-scene="room"]');
  if (room) {
    const field = room.querySelector(".room-field");
    // published shares, with seat counts chosen so the red seats match them (1 of 8, 6 of 12, 11 of 17, 15 of 22)
    const STEPS = [
      { occ: 8, red: 1, pct: "12.4%", title: "A quiet hour", sub: "0 to 5 new arrivals in the past hour" },
      { occ: 12, red: 6, pct: "48.8%", title: "Filling up", sub: "6 to 10 new arrivals in the past hour" },
      { occ: 17, red: 11, pct: "64.4%", title: "Busy", sub: "11 to 15 new arrivals in the past hour" },
      { occ: 22, red: 15, pct: "68%", title: "The busiest hours", sub: "16 or more new arrivals in the past hour" },
    ];
    const TOTAL = 24;
    const order = scatter(TOTAL, TOTAL, 41); // the order people arrive and sit down
    const seats = [];
    let cur = 3;
    const build = () => {
      const cols = 8, rows = TOTAL / cols;
      const w = cols * CELL_W + (cols - 1) * GAP, rowH = CELL_H + 10;
      const svg = el("svg", { viewBox: `0 0 ${w} ${rows * rowH}`, class: "seat-svg" });
      seats.length = 0;
      for (let r = 0; r < rows; r++) {
        const y = r * rowH;
        svg.append(el("rect", { class: "beam", x: 0, y: y + 23.5, width: w, height: 2.5 }));
        for (let c = 0; c < cols; c++) { const s = chair(c * (CELL_W + GAP), y, "empty"); svg.append(s); seats.push(s); }
      }
      field.replaceChildren(svg);
    };
    const show = (i) => {
      const st = STEPS[i];
      cur = i;
      seats.forEach((s) => s.setAttribute("class", "chair chair-empty"));
      order.slice(0, st.occ).forEach((k, n) => seats[k].setAttribute("class", `chair ${n < st.red ? "chair-missed" : "chair-plain"}`));
      document.getElementById("busy-pct").textContent = st.pct;
      document.getElementById("room-title").textContent = st.title;
      document.getElementById("room-sub").textContent = st.sub;
    };
    build();
    onView(room, {
      start: () => show(0),
      play: async () => { for (let i = 1; i < STEPS.length; i++) { await pause(i === 1 ? 700 : 950); show(i); } },
      end: () => show(3),
    });
  }

  // ---------- 2. Triage: 100 patients who turned out to need life-saving care ----------
  const triage = document.querySelector('[data-scene="triage"]');
  if (triage) {
    const total = 100, marked = Number(triage.dataset.marked), seed = Number(triage.dataset.seed);
    const field = triage.querySelector(".seats-field");
    const count = document.getElementById("triage-count");
    let marks = [], k = marked;
    const build = () => {
      const cols = narrow.matches ? 10 : 20;
      const rows = Math.ceil(total / cols), rowH = CELL_H + 10;
      const w = cols * CELL_W + (cols - 1) * GAP;
      const hit = new Set(scatter(total, marked, seed));
      const svg = el("svg", { viewBox: `0 0 ${w} ${rows * rowH - 6}`, class: "seat-svg" });
      const found = [];
      for (let r = 0; r < rows; r++) {
        const y = r * rowH;
        // the steel beam that joins a bank of chairs, with floor legs at the ends and every fifth seat
        svg.append(el("rect", { class: "beam", x: 0, y: y + 23.5, width: w, height: 2.5 }));
        for (let c = 0; c <= cols; c += 5) {
          const legX = Math.min(c, cols - 1) * (CELL_W + GAP) + (c === cols ? CELL_W - 3 : 1.5);
          svg.append(el("rect", { class: "beam", x: legX, y: y + 25, width: 2, height: 5 }));
        }
        for (let c = 0; c < cols; c++) {
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
      marks = scatter(found.length, found.length, seed + 1).map((i) => found[i]);
      field.replaceChildren(svg);
    };
    const set = (n) => {
      k = n;
      marks.forEach(([plate, seat], j) => { plate.classList.toggle("off", j >= n); seat.classList.toggle("off", j >= n); });
      count.textContent = n;
    };
    build();
    onView(triage, {
      // a count of 0 would read as a finding, so the answer stays hidden until the count starts
      start: () => { set(0); triage.classList.add("is-waiting"); },
      play: async () => { await pause(250); triage.classList.remove("is-waiting"); await run(1700, (t) => set(Math.round(easeOut(t) * marked))); },
      end: () => { triage.classList.remove("is-waiting"); set(marked); },
    });
    narrow.addEventListener("change", () => { build(); set(k); });
  }

  // ---------- 4. Waiting for a bed: the wall clock runs ----------
  const clockScene = document.querySelector('[data-scene="clock"]');
  if (clockScene) {
    const clock = clockScene.querySelector(".clock-svg");
    const R = 88;
    clock.append(el("circle", { class: "face", r: 114 }));
    for (let i = 0; i < 60; i++) {
      const a = (i / 60) * Math.PI * 2, big = i % 5 === 0, r1 = big ? 93 : 99;
      clock.append(el("line", { class: big ? "tick tick-h" : "tick", x1: Math.sin(a) * r1, y1: -Math.cos(a) * r1, x2: Math.sin(a) * 106, y2: -Math.cos(a) * 106 }));
    }
    const hours = el("text", { class: "hours", x: 0, y: 52, "text-anchor": "middle" });
    clock.append(hours);
    const band = el("path", { class: "band" }); clock.append(band);
    const hand = el("line", { class: "hand", x1: 0, y1: 8, x2: 0, y2: -40 }); clock.append(hand);
    clock.append(el("circle", { class: "pin", r: 6 }));
    // the band thickens as the hours pass
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
    const num = document.getElementById("bed-pct"), txt = document.getElementById("bed-text");
    const show = (h) => {
      band.setAttribute("d", arc(h));
      hand.setAttribute("transform", `rotate(${h * 30})`);
      const whole = Math.floor(h + 1e-6);
      hours.textContent = whole >= 12 ? "12+ hours" : `${whole} ${whole === 1 ? "hour" : "hours"}`;
      num.classList.toggle("n-time", whole >= 2 && whole < 12);
      if (whole < 2) { num.textContent = "2.5%"; txt.textContent = "died in the hospital after waiting under 2 hours for a bed"; }
      else if (whole < 12) { num.textContent = `${whole} hours`; txt.textContent = "of waiting; deaths generally rose as the wait went on"; }
      else { num.textContent = "4.5%"; txt.textContent = "died in the hospital after waiting 12 hours or more, against 2.5% for waits under 2 hours"; }
    };
    onView(clockScene, {
      start: () => show(0),
      play: async () => { await pause(500); await run(3200, (t) => show(12 * easeInOut(t))); },
      end: () => show(12),
    });
  }

  // ---------- 6. Beds: each window is 10,000 US beds; beds lose their staff, patients stay ----------
  const ward = document.querySelector('[data-scene="ward"]');
  if (ward) {
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
        const g = el("g", { class: "w", transform: `translate(${x} ${y})` });
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
    ward.querySelector(".building").append(svg);
    // 51 patients in both periods; 13 of the 29 open beds lose their staff after the pandemic
    const order = scatter(80, 80, 66);
    const role = new Array(80);
    order.forEach((w, n) => { role[w] = n < 51 ? "full" : n < 64 ? "cut" : "open"; });
    const cuts = order.slice(51, 64);
    const era = document.getElementById("ward-era");
    const show = (closed) => {
      wins.forEach((g, i) => g.setAttribute("class", `w w-${role[i] === "cut" ? "open" : role[i]}`));
      cuts.slice(0, closed).forEach((i) => wins[i].setAttribute("class", "w w-closed"));
      era.textContent = closed ? "After the pandemic" : "Before the pandemic";
    };
    onView(ward, {
      // the red number counts the red windows, so it waits for them
      start: () => { show(0); ward.classList.add("is-waiting"); },
      play: async () => { await pause(1100); await run(1300, (t) => show(Math.round(t * cuts.length))); ward.classList.remove("is-waiting"); },
      end: () => { ward.classList.remove("is-waiting"); show(cuts.length); },
    });
  }

  // ---------- 7. Nurses: 100 who left a job because of burnout; red said staffing was inadequate ----------
  const lockerScene = document.querySelector('[data-scene="lockers"]');
  if (lockerScene) {
    const field = lockerScene.querySelector(".locker-field");
    const MARKED = 63;
    const order = scatter(100, 100, 11);
    const count = document.getElementById("locker-count");
    const LW = 20, LH = 44, BANK_GAP = 8;
    let lockers = [], k = MARKED;
    const build = () => {
      const cols = narrow.matches ? 20 : 25, rows = 100 / cols, per = 5;
      const w = cols * LW + (cols / per - 1) * BANK_GAP, rowH = LH + 12;
      const svg = el("svg", { viewBox: `0 0 ${w} ${rows * rowH - 6}`, class: "seat-svg" });
      lockers = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * LW + Math.floor(c / per) * BANK_GAP, y = r * rowH;
          // one staff locker: a door with vents at the top
          const g = el("g", { class: "locker", transform: `translate(${x} ${y})` });
          g.append(
            el("rect", { class: "l-door", x: 1, y: 0, width: LW - 2, height: LH, rx: 1 }),
            el("rect", { class: "l-vent", x: 5, y: 5, width: LW - 10, height: 1.6 }),
            el("rect", { class: "l-vent", x: 5, y: 8.5, width: LW - 10, height: 1.6 }),
            el("rect", { class: "l-vent", x: 5, y: 12, width: LW - 10, height: 1.6 }),
          );
          svg.append(g); lockers.push(g);
        }
        // the bench in front of each row
        svg.append(el("rect", { class: "beam", x: 0, y: r * rowH + LH + 4, width: w, height: 2.5 }));
      }
      field.replaceChildren(svg);
    };
    const set = (n) => {
      k = n;
      order.forEach((idx, j) => lockers[idx].classList.toggle("l-marked", j < n));
      count.textContent = n;
    };
    build();
    onView(lockerScene, {
      start: () => { set(0); lockerScene.classList.add("is-waiting"); },
      play: async () => { await pause(250); lockerScene.classList.remove("is-waiting"); await run(1700, (t) => set(Math.round(easeOut(t) * MARKED))); },
      end: () => { lockerScene.classList.remove("is-waiting"); set(MARKED); },
    });
    narrow.addEventListener("change", () => { build(); set(k); });
  }

  // Printing shows every scene finished.
  addEventListener("beforeprint", () => finishers.forEach((f) => f()));

  // ---------- The strip: arrows and a count for mice; swipe, trackpad and keys scroll it natively ----------
  const list = document.querySelector(".cards");
  if (list) {
    const cards = [...list.children];
    const nowEl = document.getElementById("pager-now");
    const [prev, next] = document.querySelectorAll(".pager-btn");
    const stride = () => (cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : list.clientWidth);
    // one press moves by as many whole cards as fit on screen
    const page = () => Math.max(1, Math.floor((list.clientWidth - cards[0].offsetLeft + 24) / stride()));
    const sync = () => {
      const max = list.scrollWidth - list.clientWidth - 2;
      const atStart = list.scrollLeft <= 2, atEnd = list.scrollLeft >= max;
      const i = atEnd ? cards.length - 1 : Math.round(list.scrollLeft / stride());
      if (nowEl) nowEl.textContent = Math.min(cards.length, i + 1);
      // aria-disabled, not disabled: a focused button keeps focus when it reaches an end
      prev?.setAttribute("aria-disabled", String(atStart));
      next?.setAttribute("aria-disabled", String(atEnd));
    };
    for (const b of [prev, next]) {
      b?.addEventListener("click", () => {
        if (b.getAttribute("aria-disabled") === "true") return;
        list.scrollBy({ left: Number(b.dataset.dir) * page() * stride(), behavior: still.matches ? "auto" : "smooth" });
      });
    }
    let queued = false;
    list.addEventListener("scroll", () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => { queued = false; sync(); });
    }, { passive: true });
    addEventListener("resize", sync);
    sync();
  }

  // The sources list is folded; a citation link, or arriving with #src-n in the address, opens it.
  const box = document.getElementById("sources");
  const openFor = (hash) => { if (box && /^#src-\d+$/.test(hash)) box.open = true; };
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#src-"]');
    if (a) openFor(a.getAttribute("href"));
  });
  addEventListener("hashchange", () => openFor(location.hash));
  openFor(location.hash);

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
  const foot = document.querySelector(".sources");
  if (bar && hero && talk && "IntersectionObserver" in window) {
    let heroGone = false, talkShown = false, footShown = false;
    const sync = () => bar.classList.toggle("show", heroGone && !talkShown && !footShown);
    new IntersectionObserver(([e]) => { heroGone = !e.isIntersecting; sync(); }).observe(hero);
    new IntersectionObserver(([e]) => { talkShown = e.isIntersecting; sync(); }).observe(talk);
    if (foot) new IntersectionObserver(([e]) => { footShown = e.isIntersecting; sync(); }).observe(foot);
  }
})();
