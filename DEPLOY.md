# Deploying EMM PARTS on Plesk (Phusion Passenger)

Production host: `emmparts.hosting3m.com` — Plesk, Nginx + Phusion Passenger 6.2,
Node.js 22.

The app is a TanStack Start SSR app built by Nitro (`node-server` preset) into
`.output/`. It is a public catalog: no sign-in, no database. Quotes, cart and
contact go out via WhatsApp links and `mailto:`.

## Plesk Node.js settings

| Setting                     | Value                                    |
| --------------------------- | ---------------------------------------- |
| Node.js version             | 22.x                                     |
| Application mode            | production                               |
| Application root            | `/emmparts.hosting3m.com`                |
| Document root               | `/emmparts.hosting3m.com/.output/public` |
| Application startup file    | `app.cjs`                                |
| Custom environment variables | `VITE_AUTH_ENABLED=false`               |

Do **not** set `DATABASE_URL`. With auth off and `DATABASE_URL` present,
`requireUserId()` fails closed by design. See `.env.example`.

### Why `app.cjs`

Passenger loads the startup file with `require()`. The Nitro server bundle
(`.output/server/index.mjs`) is ESM, and the old `app.js` used top-level
`await import(...)`, which crashes under `require()` with
`ERR_REQUIRE_ASYNC_MODULE` (HTTP 500). `app.cjs` is CommonJS: it sets
`HOST=127.0.0.1` and `NODE_ENV=production`, then loads the server with a
dynamic `import()` and exits with code 1 if that fails. Passenger provides
`PORT`.

## Deploy steps

From the application root, over SSH:

```sh
git pull
npm ci
npm run build
```

Then click **Restart App** in the Plesk Node.js panel.

`npm run build` runs only the Vite/Nitro build — it never runs database
migrations. `npm run build:with-migrate` keeps the old build + migrate
behaviour for an environment that actually has a database; `npm run db:migrate`
without `DATABASE_URL` exits 0 with `skipped: no DATABASE_URL`.

### Quick check after a deploy

```sh
for p in / /catalogo /carrito /cotizar /contacto /nosotros; do
  curl -s -o /dev/null -w "%{http_code} $p\n" "https://emmparts.hosting3m.com$p"
done
```

All should return `200`.

## Rollback

In the Plesk Node.js panel set:

- Application startup file: `app.js`
- Document root: `/emmparts.hosting3m.com/public`

then **Restart App**. (Note that `app.js` is the entrypoint that fails under
Passenger; this restores the previous configuration, not a working one.)

## Files not used in production

- `startup.sh` — Grok sandbox dev-server launcher; Passenger does not use it.
- `.grok/` — Grok app-builder sandbox tooling (skills, references). The one
  exception: `npm run build` reads `.grok/app-env.json` to bake
  `VITE_AUTH_ENABLED` into the client bundle, so keep that file in the repo.
- `AGENTS.md`, `screenshots/`, `artifacts/`, `attachments/` — builder artifacts.
