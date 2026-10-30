type Scenario = { route: string[]; edges: string[] };

/**
 * Adds interaction to the server-rendered trace diagram: scenario tabs, layer
 * details and project highlighting. Plain DOM, no React, so it stays tiny.
 */
export function enhanceTrace(root: HTMLElement): () => void {
  const scenarios = JSON.parse(root.dataset.scenarios ?? "{}") as Record<string, Scenario>;
  const all = <T extends Element>(sel: string) => Array.from(root.querySelectorAll<T>(sel));
  const tabs = all<HTMLButtonElement>("[data-scenario]");
  const nodes = all<HTMLButtonElement>("[data-node]");
  const edges = all<SVGPathElement>("[data-edge]");
  const details = all<HTMLElement>("[data-detail]");
  const chips = all<HTMLButtonElement>("[data-project]");
  const tablist = root.querySelector<HTMLElement>('[role="tablist"]');
  let frame = 0;

  // One pill that slides between tabs instead of each tab swapping its own background.
  const indicator = document.createElement("span");
  indicator.className = "trace-indicator";
  indicator.setAttribute("aria-hidden", "true");
  tablist?.prepend(indicator);

  function moveIndicator(tab: HTMLElement | undefined, animate: boolean) {
    if (!tab) return;
    if (!animate) indicator.style.transition = "none";
    indicator.style.setProperty("--x", `${tab.offsetLeft}px`);
    indicator.style.setProperty("--y", `${tab.offsetTop}px`);
    indicator.style.setProperty("--w", `${tab.offsetWidth}px`);
    indicator.style.setProperty("--h", `${tab.offsetHeight}px`);
    if (!animate) {
      void indicator.offsetWidth; // commit the jump before re-enabling transitions
      indicator.style.transition = "";
    }
  }

  const selectedTab = () => tabs.find((t) => t.getAttribute("aria-selected") === "true");
  // Tabs wrap onto two rows on narrow screens, so re-measure on resize (without animating).
  const ro = new ResizeObserver(() => moveIndicator(selectedTab(), false));
  if (tablist) ro.observe(tablist);

  function setScenario(id: string) {
    const s = scenarios[id];
    if (!s) return;

    for (const tab of tabs) {
      const on = tab.dataset.scenario === id;
      tab.setAttribute("aria-selected", String(on));
      tab.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(tab.getAttribute("aria-controls") ?? "");
      if (panel) panel.hidden = !on;
    }
    moveIndicator(selectedTab(), true);

    for (const edge of edges) edge.toggleAttribute("data-on", s.edges.includes(edge.dataset.edge ?? ""));

    // Clear, let styles apply, then light the route so the step-by-step stagger replays.
    for (const node of nodes) node.removeAttribute("data-on");
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        for (const node of nodes) {
          const step = s.route.indexOf(node.dataset.node ?? "");
          if (step < 0) continue;
          node.style.setProperty("--step", String(step));
          const badge = node.querySelector(".trace-step");
          if (badge) badge.textContent = String(step + 1);
          node.setAttribute("data-on", "");
        }
      });
    });
  }

  function selectNode(id: string) {
    for (const node of nodes) node.setAttribute("aria-pressed", String(node.dataset.node === id));
    for (const d of details) d.hidden = d.dataset.detail !== id;
  }

  function highlight(chip: HTMLButtonElement | null) {
    const ids = chip?.dataset.nodes?.split(" ") ?? [];
    for (const c of chips) c.setAttribute("aria-pressed", String(c === chip));
    for (const node of nodes) node.toggleAttribute("data-dim", !!chip && !ids.includes(node.dataset.node ?? ""));
  }

  function onClick(e: Event) {
    const target = e.target as Element;
    const tab = target.closest<HTMLButtonElement>("[data-scenario]");
    if (tab?.dataset.scenario) return setScenario(tab.dataset.scenario);
    const node = target.closest<HTMLButtonElement>("[data-node]");
    if (node?.dataset.node) return selectNode(node.dataset.node);
    const chip = target.closest<HTMLButtonElement>("[data-project]");
    if (chip) highlight(chip.getAttribute("aria-pressed") === "true" ? null : chip);
  }

  // Arrow-key navigation within the tablist (ARIA tabs pattern).
  function onKeydown(e: KeyboardEvent) {
    const i = tabs.indexOf(e.target as HTMLButtonElement);
    if (i < 0) return;
    const keys: Record<string, number> = {
      ArrowRight: i + 1,
      ArrowLeft: i - 1,
      Home: 0,
      End: tabs.length - 1,
    };
    const next = keys[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const tab = tabs[(next + tabs.length) % tabs.length];
    if (!tab?.dataset.scenario) return;
    tab.focus();
    setScenario(tab.dataset.scenario);
  }

  // Only run the flowing-edge animation while the diagram is on screen.
  const io = new IntersectionObserver(([entry]) => {
    root.toggleAttribute("data-playing", !!entry?.isIntersecting);
  });

  root.addEventListener("click", onClick);
  root.addEventListener("keydown", onKeydown);
  io.observe(root);
  root.setAttribute("data-enhanced", "");
  moveIndicator(selectedTab(), false);

  return () => {
    cancelAnimationFrame(frame);
    root.removeEventListener("click", onClick);
    root.removeEventListener("keydown", onKeydown);
    io.disconnect();
    ro.disconnect();
    indicator.remove();
    root.removeAttribute("data-enhanced");
    root.removeAttribute("data-playing");
  };
}
