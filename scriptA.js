// Fade elements in when they scroll into view, and out again when they leave.
// Each element is watched on its own, so it animates when you actually reach it.

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
    });
  },
  { threshold: 0.2 }
);

document
  .querySelectorAll(".box-VM-anim, .motto")
  .forEach((element) => revealObserver.observe(element));