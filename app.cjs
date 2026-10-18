// Phusion Passenger entrypoint (Plesk). Passenger loads the startup file with
// require(), so this must be CommonJS without top-level await; the Nitro server
// bundle is ESM and is loaded through a dynamic import().
process.env.HOST = "127.0.0.1";
process.env.NODE_ENV = "production";

import("./.output/server/index.mjs").catch((err) => {
  console.error("[app.cjs] failed to start Nitro server:", err);
  process.exit(1);
});
