// PrIAge landing: an illustrated waiting line. Every patient here is synthetic.
(() => {
  const rail = document.getElementById("rail");
  const button = document.getElementById("reveal");
  const label = document.getElementById("reveal-label");
  const note = document.getElementById("note");
  const slotMouth = document.querySelector(".slot-mouth");
  const tickets = [...rail.querySelectorAll(".ticket")];

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const vertical = matchMedia("(max-width: 759px)");
  const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
  const NOTE_DEFAULT = "Illustration with synthetic patients.";
  const NOTE_REVEALED =
    "<strong>Ticket 044 has been getting worse since 9:06, and the line still has them 3rd.</strong> Illustration with synthetic patients.";

  let clock = 11 * 60 + 4; // 11:04
  let revealed = false;
  let flipping = false;

  const animate = (el, frames, opts) =>
    reduceMotion.matches ? Promise.resolve() : el.animate(frames, opts).finished.catch(() => {});
  const visible = () => tickets.filter((t) => !t.hidden);

  function fit() {
    let cap = 4;
    if (!vertical.matches) {
      const root = getComputedStyle(document.documentElement);
      const w = parseFloat(root.getPropertyValue("--ticket-w")) || 132;
      const gap = parseFloat(root.getPropertyValue("--ticket-gap")) || 14;
      cap = Math.floor((rail.clientWidth + gap) / (w + gap));
    }
    // Keep the front of the line; the newest arrivals drop off first. 044 always stays.
    tickets.forEach((t, i) => { t.hidden = i >= Math.max(cap, 3); });
  }

  function tick() {
    for (const t of tickets) {
      const waited = clock - Number(t.dataset.arrived);
      const out = t.querySelector(".t-wait");
      if (out) out.textContent = `${Math.floor(waited / 60)}h ${String(waited % 60).padStart(2, "0")}m`;
    }
  }

  // The newest ticket feeds out of the dispenser slot once, on arrival.
  async function feedNewest() {
    const t = tickets.find((x) => "newest" in x.dataset);
    if (!t || t.hidden || reduceMotion.matches) return;
    const box = t.getBoundingClientRect();
    const mouth = slotMouth.getBoundingClientRect();
    if (vertical.matches) {
      const dy = mouth.top - box.top;
      await animate(t, [
        { transform: `translateY(${dy}px)`, clipPath: "inset(0 0 100% 0)" },
        { transform: `translateY(${dy - box.height}px)`, clipPath: "inset(0 0 0 0)" },
      ], { duration: 460, easing: "cubic-bezier(0.3, 0.7, 0.4, 1)" });
      await animate(t, [{ transform: `translateY(${dy - box.height}px)` }, { transform: "none" }], { duration: 620, easing: EASE });
    } else {
      const dx = mouth.left - box.left;
      await animate(t, [
        { transform: `translateX(${dx}px)`, clipPath: "inset(0 100% 0 0)" },
        { transform: `translateX(${dx - box.width}px)`, clipPath: "inset(0 0 0 0)" },
      ], { duration: 460, easing: "cubic-bezier(0.3, 0.7, 0.4, 1)" });
      // the tear: a hard two-frame tick, then the slide into line
      await animate(t, [{ transform: `translateX(${dx - box.width}px) rotate(-2deg)` }, { transform: `translateX(${dx - box.width}px)` }],
        { duration: 90, easing: "steps(2, jump-none)" });
      await animate(t, [{ transform: `translateX(${dx - box.width}px)` }, { transform: "none" }], { duration: 680, easing: EASE });
    }
  }

  // Paper flips flat: squeeze to an edge, swap sides, open again.
  async function flip(t, toBack) {
    const paper = t.querySelector(".paper");
    await animate(paper, [{ transform: "scaleX(1)" }, { transform: "scaleX(0.02)" }], { duration: 130, easing: "cubic-bezier(0.5, 0, 0.75, 0)" });
    t.querySelector(".front").hidden = toBack;
    t.querySelector(".back").hidden = !toBack;
    await animate(paper, [{ transform: "scaleX(0.02)" }, { transform: "scaleX(1)" }], { duration: 220, easing: EASE });
  }

  async function toggle() {
    if (flipping) return;
    flipping = true;
    revealed = !revealed;
    button.setAttribute("aria-pressed", String(revealed));
    label.textContent = revealed ? "Back to the line" : "Show how they're doing";
    note.innerHTML = revealed ? NOTE_REVEALED : NOTE_DEFAULT;
    await Promise.all(visible().map((t, i) =>
      new Promise((r) => setTimeout(r, reduceMotion.matches ? 0 : i * 70)).then(() => flip(t, revealed))));
    flipping = false;
  }

  fit();
  tick();
  button.addEventListener("click", toggle);
  document.fonts.ready.then(() => setTimeout(feedNewest, 500));
  setInterval(() => { clock += 1; tick(); }, 2500);

  let resizeTimer;
  addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(fit, 150);
  });
})();
