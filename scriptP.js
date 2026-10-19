// scriptP.js — Halaman Produk, CV Bimantara Media Bali
// Satu fungsi slider dipakai untuk semua kategori (Lemari, Elektronik, Mebeler).
// Untuk menambah kategori baru: salin satu <section data-slider id="..."> di HTML.
 
(() => {
  "use strict";
 
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
 
  function initSlider(section) {
    const track = section.querySelector(".track");
    const prevBtn = section.querySelector('[data-dir="-1"]');
    const nextBtn = section.querySelector('[data-dir="1"]');
    if (!track || !prevBtn || !nextBtn) return;
 
    // Tulis jumlah produk otomatis (judul kategori dan kartu kategori di atas)
    const total = track.children.length;
    document
      .querySelectorAll('[data-count-for="' + section.id + '"]')
      .forEach((el) => {
        el.textContent = total + " produk";
      });
 
    // Geser sebanyak kartu yang terlihat, jadi tidak ada kartu yang terlewat
    function pageStep() {
      const first = track.firstElementChild;
      if (!first) return track.clientWidth;
 
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const cardWidth = first.getBoundingClientRect().width + gap;
      const visible = Math.max(
        1,
        Math.floor((track.clientWidth + gap) / cardWidth + 0.01)
      );
      return visible * cardWidth;
    }
 
    function updateButtons() {
      const maxScroll = track.scrollWidth - track.clientWidth;
      prevBtn.disabled = track.scrollLeft <= 2;
      nextBtn.disabled = track.scrollLeft >= maxScroll - 2;
    }
 
    function go(direction) {
      track.scrollBy({
        left: direction * pageStep(),
        behavior: reduceMotion.matches ? "auto" : "smooth",
      });
    }
 
    prevBtn.addEventListener("click", () => go(-1));
    nextBtn.addEventListener("click", () => go(1));
 
    let ticking = false;
    track.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          updateButtons();
          ticking = false;
        });
      },
      { passive: true }
    );
 
    if ("ResizeObserver" in window) {
      new ResizeObserver(updateButtons).observe(track);
    } else {
      window.addEventListener("resize", updateButtons);
    }
 
    updateButtons();
  }
 
  document.querySelectorAll("[data-slider]").forEach(initSlider);
})();
 