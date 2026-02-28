(() => {
  const pin = document.querySelector(".time-travel__pin");
  const track = document.getElementById("timeTravelTrack");
  const bar = document.querySelector(".time-travel__progress-bar");
  if (!pin || !track) return;

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  function setPinHeight() {
    // Wie weit müssen wir horizontal fahren?
    const maxX = Math.max(0, track.scrollWidth - track.clientWidth);

    // Wir brauchen mindestens eine viewport-Höhe + horizontaler Weg + etwas Reserve
    // Damit p (0..1) sauber läuft und es nicht "zu früh" fertig ist.
    const vh = window.innerHeight;
    const extra = 220; // Reserve (px)
    pin.style.height = `${vh + maxX + extra}px`;
  }

  function update() {
    const rect = pin.getBoundingClientRect();
    const viewportH = window.innerHeight;

    // Fortschritt 0..1 während wir durch den Pin scrollen
    const total = pin.offsetHeight - viewportH;
    const scrolled = clamp(-rect.top, 0, total);
    const p = total > 0 ? scrolled / total : 0;

    // horizontale Strecke
    const maxX = Math.max(0, track.scrollWidth - track.clientWidth);
    const x = maxX * p;

    track.style.transform = `translate3d(${-x}px, 0, 0)`;
    if (bar) bar.style.width = `${p * 100}%`;
  }

  // Erst berechnen, dann updaten
  function refresh() {
    setPinHeight();
    update();
  }

  // initial
  refresh();

  // Scroll + Resize
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", refresh);

  // Falls Bilder/Fonts nachladen und sich scrollWidth ändert:
  window.addEventListener("load", refresh);

  // Optional: Wenn du später dynamisch Stops reinlädst, kannst du refresh() erneut aufrufen.
})();