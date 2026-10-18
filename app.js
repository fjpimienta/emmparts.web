// Legacy ESM entrypoint (top-level await). Passenger loads its startup file with
// require(), which fails here with ERR_REQUIRE_ASYNC_MODULE — use app.cjs instead.
// Kept only as the rollback target documented in DEPLOY.md.
process.env.HOST = "127.0.0.1";
process.env.NODE_ENV = "production";
await import("./.output/server/index.mjs");