import Lenis from "lenis";

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Wheel/trackpad smoothing plus gliding same-page anchor links.
 * Lenis drives the native scroll position, so sticky elements and CSS
 * scroll-driven animations keep working unchanged.
 */
export function startSmoothScroll(): () => void {
  const lenis = new Lenis({
    autoRaf: true,
    // Quick to settle, so it feels responsive rather than floaty.
    lerp: 0.12,
    smoothWheel: true,
    syncTouch: false,
    stopInertiaOnNavigate: true,
  });

  // Capture phase, so this runs before Next's <Link> handler, which then sees
  // defaultPrevented and leaves same-page hash links to us.
  function onClick(e: MouseEvent) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = (e.target as Element | null)?.closest?.<HTMLAnchorElement>("a[href*='#']");
    if (!link || (link.target && link.target !== "_self")) return;

    const url = new URL(link.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;

    e.preventDefault();
    if (url.hash !== location.hash) history.pushState(history.state, "", url.hash);
    // Move focus straight away for keyboard and screen-reader users (e.g. the skip link).
    if (target.hasAttribute("tabindex")) target.focus({ preventScroll: true });
    lenis.scrollTo(target, { duration: 1.1, easing: easeOutExpo });
  }

  document.addEventListener("click", onClick, true);

  return () => {
    document.removeEventListener("click", onClick, true);
    lenis.destroy();
  };
}
