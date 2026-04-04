const STAGGER_BASE = 60;
const STAGGER_STEP = 75;
const REVEAL_DUR = 650;
const UNREVEAL_DUR = 280;

const REVEAL_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
const UNREVEAL_EASING = "cubic-bezier(0.77, 0, 0.18, 1)";

export function reveal(slide) {
  const els = slide.querySelectorAll(".r");

  els.forEach((el, i) => {
    // Reset to hidden immediately (no transition flash)
    el.style.transition = "none";
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";

    const delay = STAGGER_BASE + i * STAGGER_STEP;

    // Next frame: apply the reveal transition
    requestAnimationFrame(() => {
      setTimeout(() => {
        el.style.transition = [
          `opacity ${REVEAL_DUR}ms ${REVEAL_EASING} ${delay}ms`,
          `transform ${REVEAL_DUR}ms ${REVEAL_EASING} ${delay}ms`,
        ].join(", ");

        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 20);
    });
  });
}

export function unreveal(slide, dir) {
  const els = slide.querySelectorAll(".r");
  const exitY = dir > 0 ? "-16px" : "16px";

  els.forEach((el) => {
    el.style.transition = [
      `opacity ${UNREVEAL_DUR}ms ${UNREVEAL_EASING}`,
      `transform ${UNREVEAL_DUR}ms ${UNREVEAL_EASING}`,
    ].join(", ");

    el.style.opacity = "0";
    el.style.transform = `translateY(${exitY})`;
  });
}
