"use strict";
(() => {
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
