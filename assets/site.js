{
  // Cover scene: fill the space on narrow screens, show the whole scene on wide ones.
  const scene = document.querySelector(".scene");
  if (scene) {
    const fit = () => {
      const r = scene.getBoundingClientRect();
      scene.setAttribute("preserveAspectRatio", r.width / r.height <= 1440 / 440 ? "xMidYMax slice" : "xMidYMax meet");
    };
    fit();
    const sceneObs = new ResizeObserver(fit);
    sceneObs.observe(scene);
  }

  // Photo viewer
  const box = document.getElementById("lightbox");
  if (box) {
    const img = document.getElementById("lbImg");
    const items = [...document.querySelectorAll(".ph")];
    let i = 0, opener = null;
    const show = n => { i = (n + items.length) % items.length; img.src = items[i].dataset.full; };
    const open = n => { opener = document.activeElement; show(n); box.hidden = false; box.querySelector(".lb-close").focus(); };
    const close = () => { box.hidden = true; img.removeAttribute("src"); if (opener) opener.focus(); };
    items.forEach((b, n) => b.addEventListener("click", () => open(n)));
    box.querySelector(".lb-close").addEventListener("click", close);
    box.querySelector(".lb-prev").addEventListener("click", () => show(i - 1));
    box.querySelector(".lb-next").addEventListener("click", () => show(i + 1));
    box.addEventListener("click", e => { if (e.target === box) close(); });
    document.addEventListener("keydown", e => {
      if (box.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(i - 1);
      if (e.key === "ArrowRight") show(i + 1);
    });
    let x0 = null;
    box.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
    box.addEventListener("touchend", e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) show(i + (dx < 0 ? 1 : -1));
    });
  }
}
