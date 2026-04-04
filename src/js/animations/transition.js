import { reveal, unreveal } from "./reveal.js";
import { unlock } from "../core/state.js";

const SLIDE_DUR = 680;
const CONTENT_DELAY = 100;

const EASE_IN = "cubic-bezier(0.77, 0, 0.18, 1)";
const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";
const OFFSET = "56px";

export function runTransition(prevSlide, nextSlide, dir) {
  // 1. Position next slide off-screen
  const enterFrom = dir > 0 ? OFFSET : `-${OFFSET}`;

  nextSlide.style.transition = "none";
  nextSlide.style.opacity = "0";
  nextSlide.style.transform = `translateY(${enterFrom})`;
  nextSlide.classList.add("active");

  // 2. Start unreveal on previous slide's content
  unreveal(prevSlide, dir);

  // 3. Double rAF to ensure browser registers the reset
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      // Exit previous slide
      prevSlide.style.transition = `opacity ${SLIDE_DUR}ms ${EASE_IN}, transform ${SLIDE_DUR}ms ${EASE_IN}`;
      prevSlide.style.opacity = "0";
      prevSlide.style.transform = `translateY(${dir > 0 ? `-${OFFSET}` : OFFSET})`;

      // Enter next slide
      nextSlide.style.transition = `opacity ${SLIDE_DUR}ms ${EASE_OUT}, transform ${SLIDE_DUR}ms ${EASE_OUT}`;
      nextSlide.style.opacity = "1";
      nextSlide.style.transform = "translateY(0)";

      // 4. Reveal next slide's content, slightly delayed
      setTimeout(() => reveal(nextSlide), CONTENT_DELAY);

      // 5. Cleanup after transition completes
      setTimeout(() => {
        prevSlide.classList.remove("active");
        prevSlide.style.transition = "none";
        prevSlide.style.transform = "translateY(0)";
        unlock();
      }, SLIDE_DUR + 40);
    });
  });
}
