(() => {
  "use strict";

  const THRESHOLD = 10;
  let lastY = 0;
  let ticking = false;

  function getWindowY() {
    return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }

  function setHeaderState(header, y) {
    // ако искаш само 1 клас – ползвай 1
    header.classList.toggle("villa-red", y > THRESHOLD);
  }

  function requestUpdate(header) {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      setHeaderState(header, lastY);
    });
  }

  function init() {
    const header = document.getElementById("siteHeader");
    if (!header) return;

    document.addEventListener(
      "scroll",
      (e) => {
        const t = e.target;
        const yFromTarget = t && typeof t.scrollTop === "number" ? t.scrollTop : 0;
        lastY = Math.max(getWindowY(), yFromTarget);

        setHeaderState(header, lastY);
        requestUpdate(header);
      },
      true
    );

    // init state
    lastY = getWindowY();
    setHeaderState(header, lastY);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();