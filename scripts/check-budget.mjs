// Fails if the home page's initial JS or CSS exceeds the performance budget (see PLAN.md §5).
// Run after `next build`: `pnpm budget`.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const BUDGET = {
  js: 165 * 1024, // ~142 KB is the empty Next 16 + React 19 App Router floor
  css: 15 * 1024,
};

const root = process.cwd();
const html = readFileSync(join(root, ".next/server/app/index.html"), "utf8");

const gz = (path) => gzipSync(readFileSync(join(root, ".next", path.replace(/^\/_next/, ""))), { level: 9 }).length;

// Modern browsers skip `noModule` polyfills, so they don't count.
const scripts = [...html.matchAll(/<script\b[^>]*\bsrc="([^"]+\.js)"[^>]*>/g)]
  .filter(([tag]) => !/\bnoModule\b/i.test(tag))
  .map(([, src]) => src);
const styles = [...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+\.css)"/g)].map(([, href]) => href);

const unique = (list) => [...new Set(list)];
const js = unique(scripts).reduce((sum, s) => sum + gz(s), 0);
const css = unique(styles).reduce((sum, s) => sum + gz(s), 0);

const kb = (n) => `${(n / 1024).toFixed(1)} KB`;
const rows = [
  ["Initial JS (gzip)", js, BUDGET.js, unique(scripts).length],
  ["CSS (gzip)", css, BUDGET.css, unique(styles).length],
];

let failed = false;
for (const [name, size, limit, files] of rows) {
  const ok = size <= limit;
  failed ||= !ok;
  console.log(`${ok ? "✓" : "✗"} ${name}: ${kb(size)} / ${kb(limit)} (${files} files)`);
}
process.exit(failed ? 1 : 0);
