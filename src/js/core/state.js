export const TOTAL = 8;

const state = {
  current: 0,
  previous: null,
  busy: false,
};

export function transition(next) {
  if (state.busy) return false;
  if (next === state.current) return false;
  if (next < 0 || next >= TOTAL) return false;

  state.busy = true;
  state.previous = state.current;
  state.current = next;

  // Broadcast so UI, animation, cursor modules can all react
  document.dispatchEvent(
    new CustomEvent("slide:change", {
      detail: {
        current: state.current,
        previous: state.previous,
        direction: next > state.previous ? 1 : -1,
      },
    }),
  );

  return true;
}

export function unlock() {
  state.busy = false;
}

export const getCurrent = () => state.current;
export const getPrevious = () => state.previous;
export const isBusy = () => state.busy;
