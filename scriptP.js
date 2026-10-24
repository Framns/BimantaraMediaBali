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

// Cara pakai (pada <img> di dalam kartu):
//   <img src="images/produkImages/buku1_1.jpg"
//        data-images="images/produkImages/buku1_1.jpg, images/produkImages/buku1_2.jpg"
//        data-interval="3500" />
//
//   data-images   : daftar gambar, dipisah koma (gambar pertama = gambar di src)
//   data-interval : opsional, jeda antar gambar dalam milidetik.
//                   Kalau tidak diisi, tiap kartu otomatis dapat kecepatan berbeda.

(() => {
  "use strict";

  const FADE_MS = 400; // lama transisi memudar
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const canHover = window.matchMedia("(hover: hover)");

  function initSwitcher(img, index) {
    const images = (img.dataset.images || "")
      .split(",")
      .map((src) => src.trim())
      .filter(Boolean);
    if (images.length < 2) return;

    // Kecepatan berbeda tiap kartu (antara 2,5 dan 5,2 detik) kalau tidak diatur manual
    const interval =
      Number(img.dataset.interval) || 2500 + ((index * 770) % 2700);

    const card = img.closest(".card") || img;
    let current = Math.max(0, images.indexOf(img.getAttribute("src")));
    let timer = null;
    let hovering = false;
    let visible = false;

    img.style.transition = "opacity " + FADE_MS + "ms ease";

    function schedule() {
      clearTimeout(timer);
      timer = setTimeout(next, interval);
    }

    function next() {
      // Pengguna yang mematikan animasi di sistemnya: jangan ganti otomatis
      if (reduceMotion.matches) return;

      // Tunggu kalau kartu sedang di-hover, di luar layar, atau tab tersembunyi
      if (hovering || !visible || document.hidden) {
        schedule();
        return;
      }

      const target = (current + 1) % images.length;

      // Muat gambar berikutnya dulu supaya tidak ada kedipan kosong
      const preload = new Image();
      preload.onload = () => swap(target);
      preload.onerror = () => {
        current = target; // lewati file yang tidak ketemu
        schedule();
      };
      preload.src = images[target];
    }

    function swap(target) {
      img.style.opacity = "0";
      setTimeout(() => {
        img.src = images[target];
        img.style.opacity = "1";
        current = target;
        schedule();
      }, FADE_MS);
    }

    // Hanya jalan saat kartu benar-benar terlihat (kartu di luar slider tidak ikut jalan)
    new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
      },
      { threshold: 0.3 }
    ).observe(card);

    // Jeda saat kursor di atas kartu (hanya di perangkat dengan mouse)
    if (canHover.matches) {
      card.addEventListener("mouseenter", () => (hovering = true));
      card.addEventListener("mouseleave", () => (hovering = false));
    }

    schedule();
  }

  document.querySelectorAll("img[data-images]").forEach(initSwitcher);
})();