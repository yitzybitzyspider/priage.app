"use strict";
(() => {
  // The period of "waiting." tells the story: a steady pulse that weakens, turns irregular,
  // then stops for a few seconds before the page starts over. Reduced motion holds it still.
  const dot = document.querySelector(".h1-dot");
  const still = matchMedia("(prefers-reduced-motion: reduce)");
  if (dot && !still.matches) {
    dot.style.animation = "none";
    const beat = (amp, ms) => dot.animate(
      [{ transform: "scale(1)" }, { transform: `scale(${amp})`, offset: 0.08 }, { transform: "scale(1)" }],
      { duration: ms, easing: "ease-out" });
    // then it simply stops, and the page holds its breath before the pulse returns
    const stop = () => setTimeout(cycle, 3000);
    const cycle = () => {
      const n = 16; let i = 0;
      const next = () => {
        const p = i / n;                                   // 0 steady, 1 failing
        const amp = 1.9 - 0.5 * p;                         // the swell shrinks a little
        let gap = 800 * (1 - 0.62 * p);                    // the rhythm races
        if (p > 0.6) gap *= 0.75 + Math.random() * 0.5;    // and loses its regularity
        beat(amp, Math.min(gap, 650));
        if (++i < n) setTimeout(next, gap); else setTimeout(stop, gap);
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
