const WHEEL_COOLDOWN = 860;
const SWIPE_THRESHOLD = 45;

let wheelLocked = false;
let touchY0 = null;
let touchX0 = null;

function intent(dir) {
  document.dispatchEvent(new CustomEvent("nav:intent", { detail: { dir } }));
}

// Keyboard
function onKeyDown(e) {
  const forward = ["ArrowDown", "ArrowRight", "PageDown", " "];
  const backward = ["ArrowUp", "ArrowLeft", "PageUp"];

  if (forward.includes(e.key)) {
    e.preventDefault();
    intent(1);
  } else if (backward.includes(e.key)) {
    e.preventDefault();
    intent(-1);
  }
}

// Mouse wheel
function onWheel(e) {
  if (wheelLocked) return;

  wheelLocked = true;
  setTimeout(() => {
    wheelLocked = false;
  }, WHEEL_COOLDOWN);

  intent(e.deltaY > 0 ? 1 : -1);
}

// touch swipe
function onTouchStart(e) {
  touchY0 = e.touches[0].clientY;
  touchX0 = e.touches[0].clientX;
}

function onTouchEnd(e) {
  if (touchY0 === null) return;

  const dy = touchY0 - e.changedTouches[0].clientY;
  const dx = touchX0 - e.changedTouches[0].clientX;

  // Only trigger on a predominantly vertical swipe
  if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > SWIPE_THRESHOLD) {
    intent(dy > 0 ? 1 : -1);
  }

  touchY0 = null;
  touchX0 = null;
}

// Arrow buttons
function bindArrowButtons() {
  const btnPrev = document.getElementById("ap");
  const btnNext = document.getElementById("an");

  btnPrev?.addEventListener("click", () => intent(-1));
  btnNext?.addEventListener("click", () => intent(1));
}

export function initInput() {
  document.addEventListener("keydown", onKeyDown);
  window.addEventListener("wheel", onWheel, { passive: true });
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchend", onTouchEnd, { passive: true });

  bindArrowButtons();
}
