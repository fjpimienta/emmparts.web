#!/usr/bin/env node
/**
 * Prebuild guard: refuse to build when a hosting-panel default page sits at
 * the repo root.
 *
 * Vite/Nitro pick up a root `index.html` as the SSR renderer template
 * (.output/server/_chunks/renderer-template.mjs). Plesk drops its "Domain
 * Default page" there when a (sub)domain is created; it is untracked, so it
 * silently replaces every route with the Plesk placeholder. Fail loudly instead.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = join(root, "index.html");

if (existsSync(indexPath)) {
  const html = readFileSync(indexPath, "utf8");
  if (/domain default page|plesk/i.test(html)) {
    console.error(
      `[check-build-root] ${indexPath} is the Plesk default page.\n` +
        "[check-build-root] Vite/Nitro would use it as the SSR template and every route would render it.\n" +
        "[check-build-root] Delete it from the application root and run the build again.",
    );
    process.exit(1);
  }
  console.warn(
    `[check-build-root] warning: ${indexPath} exists and will be used as the SSR template. ` +
      "Make sure that is intended.",
  );
}
