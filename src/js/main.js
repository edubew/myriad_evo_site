/**
 * Responsibilities:
 *  1. Collect slide elements
 *  2. Initialise all modules (input, cursor, nav, dots)
 *  3. Listen to state events and orchestrate transitions
 *  4. Bootstrap the first slide
 */

import { transition, getCurrent, TOTAL } from "./core/state.js";
import { initInput } from "./core/input.js";
import { runTransition } from "./animations/transition.js";
import { reveal } from "./animations/reveal.js";
import { buildDots, updateDots } from "./ui/dots.js";
import { initNav, updateNav } from "./ui/nav.js";
import { initCursor } from "./ui/cursor.js";

const slides = [...document.querySelectorAll(".slide")];

if (slides.length !== TOTAL) {
  console.warn(`Expected ${TOTAL} slides, found ${slides.length}.`);
}

// Initialize all modules
buildDots();
initNav();
initCursor();
initInput();

document.addEventListener("nav:intent", (e) => {
  const next = getCurrent() + e.detail.dir;
  transition(next);
});

document.addEventListener("slide:change", (e) => {
  const { current, previous, direction } = e.detail;

  const prevSlide = slides[previous];
  const nextSlide = slides[current];

  updateDots(current);
  updateNav(current);

  runTransition(prevSlide, nextSlide, direction);
});

(function initFirstSlide() {
  const first = slides[0];

  first.classList.add("active");
  first.style.opacity = "1";
  first.style.transform = "translateY(0)";
  setTimeout(() => reveal(first), 280);

  updateDots(0);
  updateNav(0);
})();
