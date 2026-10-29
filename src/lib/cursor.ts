const INTERACTIVE = "a, button, [role='tab'], summary, label, input, select, textarea";

/**
 * A ring that trails the native cursor and reacts to what's under it:
 * grows over links and buttons, and shows a short label over `[data-cursor]`
 * elements. Only `transform` animates, and the rAF loop sleeps once it settles.
 */
export function startCursor(): () => void {
  const el = document.createElement("div");
  el.className = "cursor";
  el.setAttribute("aria-hidden", "true");
  const label = document.createElement("span");
  label.className = "cursor-label";
  el.append(label);
  document.body.append(el);

  let x = 0;
  let y = 0;
  let tx = 0;
  let ty = 0;
  let frame = 0;
  let shown = false;

  function render() {
    // Ease toward the pointer: quick enough to feel attached, soft enough to read as motion.
    x += (tx - x) * 0.2;
    y += (ty - y) * 0.2;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    frame = Math.abs(tx - x) + Math.abs(ty - y) > 0.1 ? requestAnimationFrame(render) : 0;
  }

  function wake() {
    if (!frame) frame = requestAnimationFrame(render);
  }

  function update(target: Element | null) {
    const hit = target?.closest<HTMLElement>(`[data-cursor], ${INTERACTIVE}`);
    const text = hit?.dataset.cursor;
    el.dataset.state = text ? "label" : hit ? "link" : "";
    if (text) label.textContent = text;
  }

  function onMove(e: PointerEvent) {
    if (e.pointerType !== "mouse") return;
    tx = e.clientX;
    ty = e.clientY;
    if (!shown) {
      // First appearance: start at the pointer rather than flying in from the corner.
      x = tx;
      y = ty;
      shown = true;
      el.toggleAttribute("data-visible", true);
    }
    update(e.target as Element);
    wake();
  }

  // Content moves under a still mouse while scrolling, so re-check what's beneath it.
  let scrollFrame = 0;
  function onScroll() {
    if (!shown || scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = 0;
      update(document.elementFromPoint(tx, ty));
    });
  }

  const onDown = () => el.toggleAttribute("data-pressed", true);
  const onUp = () => el.toggleAttribute("data-pressed", false);
  const onLeave = () => {
    shown = false;
    el.toggleAttribute("data-visible", false);
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerdown", onDown, { passive: true });
  window.addEventListener("pointerup", onUp, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  document.documentElement.addEventListener("mouseleave", onLeave);

  return () => {
    cancelAnimationFrame(frame);
    cancelAnimationFrame(scrollFrame);
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerdown", onDown);
    window.removeEventListener("pointerup", onUp);
    window.removeEventListener("scroll", onScroll);
    document.documentElement.removeEventListener("mouseleave", onLeave);
    el.remove();
  };
}
