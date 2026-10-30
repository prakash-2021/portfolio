import { building, traceEdges, traceNodes, traceScenarios } from "@/content/profile";
import { TraceEnhancer } from "./trace-enhancer";

const ID = "trace";
const DEFAULT_NODE = "api";

/**
 * "Trace a request": an architecture diagram of the systems in Currently building.
 * Fully server-rendered (readable without JS); interaction is added by a lazily
 * loaded enhancer once the diagram nears the viewport.
 */
export function TraceDiagram() {
  const [initial] = traceScenarios;
  if (!initial) return null;

  const scenarioData = Object.fromEntries(
    traceScenarios.map((s) => [s.id, { route: s.route, edges: s.edges }]),
  );

  return (
    <div id={ID} data-trace data-scenarios={JSON.stringify(scenarioData)}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="tablist" aria-label="Request paths" className="trace-tabs js-only">
          {traceScenarios.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              id={`${ID}-tab-${s.id}`}
              aria-selected={i === 0}
              aria-controls={`${ID}-steps-${s.id}`}
              tabIndex={i === 0 ? 0 : -1}
              data-scenario={s.id}
              className="trace-tab"
            >
              {s.label}
            </button>
          ))}
        </div>
        <div role="group" aria-label="Highlight a project" className="js-only flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted">Highlight:</span>
          {building.map((p) => (
            <button
              key={p.name}
              type="button"
              aria-pressed="false"
              data-project={p.name}
              data-nodes={p.nodes.join(" ")}
              className="chip trace-chip cursor-pointer transition-colors hover:text-ink"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="trace-stage mt-8">
        <svg className="trace-svg" viewBox="0 0 1000 520" aria-hidden="true" focusable="false">
          {traceEdges.map((e) => (
            <path
              key={e.id}
              d={e.d}
              className="trace-edge"
              data-edge={e.id}
              data-dashed={e.dashed ? "" : undefined}
              data-on={initial.edges.includes(e.id) ? "" : undefined}
            />
          ))}
        </svg>
        <ul className="trace-nodes" aria-label="System layers">
          {traceNodes.map((n) => {
            const step = initial.route.indexOf(n.id);
            return (
              <li key={n.id} style={{ "--x": n.x, "--y": n.y } as React.CSSProperties}>
                <button
                  type="button"
                  className="trace-node"
                  data-node={n.id}
                  aria-pressed={n.id === DEFAULT_NODE}
                  aria-controls={`${ID}-detail`}
                  data-on={step >= 0 ? "" : undefined}
                  style={{ "--step": Math.max(step, 0) } as React.CSSProperties}
                >
                  <strong>{n.label}</strong>
                  <span className="trace-sub">{n.sub}</span>
                  <span className="trace-step" aria-hidden="true">
                    {step + 1}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="card">
          {traceScenarios.map((s, i) => (
            <div
              key={s.id}
              role="tabpanel"
              id={`${ID}-steps-${s.id}`}
              aria-labelledby={`${ID}-tab-${s.id}`}
              hidden={i !== 0}
            >
              <p className="label">{s.label}, step by step</p>
              <ol className="mt-4 grid gap-3">
                {s.steps.map((step, j) => (
                  <li
                    key={step}
                    className="grid grid-cols-[1.75rem_1fr] gap-2"
                    style={{ "--i": j } as React.CSSProperties}
                  >
                    <span className="font-display font-bold text-accent tnum">{j + 1}</span>
                    <span className="text-muted">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <div id={`${ID}-detail`} aria-live="polite" className="card">
          {traceNodes.map((n) => (
            <div key={n.id} data-detail={n.id} hidden={n.id !== DEFAULT_NODE}>
              <p className="label">What I do at this layer</p>
              <h3 className="mt-3 text-2xl">
                {n.label} <span className="text-base font-normal text-muted">{n.sub}</span>
              </h3>
              <p className="mt-3 text-muted">{n.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm text-muted">
        Simplified architecture. Click a layer to see what I do there.
      </p>

      <TraceEnhancer targetId={ID} />
    </div>
  );
}
