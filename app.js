process.env.HOST = "127.0.0.1";
process.env.NODE_ENV = "production";
await import("./.output/server/index.mjs");