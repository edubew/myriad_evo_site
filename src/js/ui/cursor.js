const curEl = document.getElementById("cursor");
const ringEl = document.getElementById("cursor-ring");

const LERP = 0.1;

let mx = 0,
  my = 0;
let rx = 0,
  ry = 0; // ring current position

let running = false;

function loop() {
  if (!running) return;

  // Dot: exact position
  curEl.style.left = `${mx}px`;
  curEl.style.top = `${my}px`;

  // Ring: lerped position
  rx += (mx - rx) * LERP;
  ry += (my - ry) * LERP;
  ringEl.style.left = `${rx}px`;
  ringEl.style.top = `${ry}px`;

  requestAnimationFrame(loop);
}

function bindHoverTargets() {
  const selectors = [
    "a",
    "button",
    ".dot",
    ".pkg-action",
    ".sol",
    ".svc",
    ".nav-cta",
  ].join(", ");

  document.querySelectorAll(selectors).forEach((el) => {
    el.addEventListener("mouseenter", () =>
      document.body.classList.add("hovering"),
    );
    el.addEventListener("mouseleave", () =>
      document.body.classList.remove("hovering"),
    );
  });
}

export function initCursor() {
  // Hide on first touch for user is on a touch device
  window.addEventListener(
    "touchstart",
    () => {
      if (curEl) curEl.style.display = "none";
      if (ringEl) ringEl.style.display = "none";
      document.body.style.cursor = "auto";
      running = false;
    },
    { once: true, passive: true },
  );

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;

    // Start loop on first mouse move
    if (!running) {
      running = true;
      loop();
    }
  });

  bindHoverTargets();
}
