import { TOTAL } from "../core/state.js";

const navEl = document.getElementById("nav");
const ncEl = document.getElementById("nc");
const ntEl = document.getElementById("nt");
const barEl = document.getElementById("progress-bar");
const btnPrev = document.getElementById("ap");
const btnNext = document.getElementById("an");
const hintEl = document.getElementById("hint");

// Set the total slide count once on init
export function initNav() {
  if (ntEl) ntEl.textContent = String(TOTAL).padStart(2, "0");
}

export function updateNav(index) {
  if (ncEl) ncEl.textContent = String(index + 1).padStart(2, "0");

  if (barEl) barEl.style.width = `${((index + 1) / TOTAL) * 100}%`;

  if (btnPrev) btnPrev.disabled = index === 0;
  if (btnNext) btnNext.disabled = index === TOTAL - 1;

  // Nav background
  if (navEl) navEl.classList.toggle("scrolled", index > 0);

  // Scroll hint only visible on first slide
  if (hintEl) hintEl.style.opacity = index === 0 ? "1" : "0";
}
