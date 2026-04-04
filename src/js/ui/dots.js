import { TOTAL } from "../core/state.js";
import { transition } from "../core/state.js";

let dotEls = [];
export function buildDots() {
  const container = document.getElementById("dots");
  if (!container) return;

  for (let i = 0; i < TOTAL; i++) {
    const dot = document.createElement("button");
    dot.className = "dot";
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
    dot.setAttribute("role", "tab");
    dot.addEventListener("click", () => transition(i));

    // Cursor hover feedback
    dot.addEventListener("mouseenter", () =>
      document.body.classList.add("hovering"),
    );
    dot.addEventListener("mouseleave", () =>
      document.body.classList.remove("hovering"),
    );

    container.appendChild(dot);
    dotEls.push(dot);
  }
}

export function updateDots(index) {
  dotEls.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
    dot.setAttribute("aria-selected", i === index ? "true" : "false");
  });
}
