"use strict";
(() => {
  // The period of "waiting." tells the story: a steady pulse that weakens, turns irregular,
  // then goes flat for a few seconds before the page starts over. Reduced motion holds it still.
  const dot = document.querySelector(".h1-dot");
  const still = matchMedia("(prefers-reduced-motion: reduce)");
  if (dot && !still.matches) {
    dot.style.animation = "none";
    dot.style.transformOrigin = "50% 50%";
    const beat = (amp, ms) => dot.animate(
      [{ transform: "scale(1)" }, { transform: `scale(${amp})`, offset: 0.08 }, { transform: "scale(1)" }],
      { duration: ms, easing: "ease-out" });
    const flat = () => {
      const line = dot.animate([{ transform: "scale(1)" }, { transform: "scale(2.6, 0.28)" }],
        { duration: 600, fill: "forwards", easing: "ease-in-out" });
      setTimeout(() => { line.cancel(); dot.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 700 }); cycle(); }, 4200);
    };
    const cycle = () => {
      const n = 30; let i = 0;
      const next = () => {
        const p = i / n;                                   // 0 steady, 1 failing
        const amp = 1.9 - 0.8 * p;                         // the swell shrinks
        let gap = 833 * (1 - 0.3 * p);                     // the rhythm quickens
        if (p > 0.55) gap *= 0.7 + Math.random() * 0.7;    // then loses its regularity
        beat(amp, Math.min(gap, 700));
        if (++i < n) setTimeout(next, gap); else setTimeout(flat, gap);
      };
      next();
    };
    cycle();
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

})();
