# Deploying EMM PARTS on Plesk (Phusion Passenger)

Production host: `emmparts.hosting3m.com` — Plesk, Nginx + Phusion Passenger 6.2,
Node.js 22 (pinned in `.nvmrc`).

The app is a TanStack Start SSR app built by Nitro (`node-server` preset) into
`.output/`. It is a public catalog: no sign-in, no database. Quotes, cart and
contact go out via WhatsApp links and `mailto:`.

## Plesk Node.js settings (verified in production)

| Setting                      | Value                                    |
| ---------------------------- | ---------------------------------------- |
| Node.js version              | 22.x                                     |
| Application mode             | production                               |
| Application root             | `/emmparts.hosting3m.com`                |
| Document root                | `/emmparts.hosting3m.com/.output/public` |
| Application startup file     | `app.cjs`                                |
| Custom environment variables | `VITE_AUTH_ENABLED=false`                |

Do **not** set `DATABASE_URL`. With auth off and `DATABASE_URL` present,
`requireUserId()` fails closed by design. See `.env.example`.

### Pitfall: application root vs. document root

The application root must stay `/emmparts.hosting3m.com` — **not** `.output`.
When the document root is changed, Plesk rewrites the application root to match
it (`/emmparts.hosting3m.com/.output`), and Passenger then cannot find `app.cjs`
or `node_modules`, so the app fails to start.

Change them in this order, and re-check both before saving:

1. Set the **application root** to `/emmparts.hosting3m.com`.
2. Set the **document root** to `/emmparts.hosting3m.com/.output/public`.
3. Confirm the application root was not rewritten to `.output`; fix it if it was.

### Why `app.cjs`

Passenger loads the startup file with `require()`. The Nitro server bundle
(`.output/server/index.mjs`) is ESM, and the old `app.js` used top-level
`await import(...)`, which crashes under `require()` with
`ERR_REQUIRE_ASYNC_MODULE` (HTTP 500). `app.cjs` is CommonJS: it sets
`HOST=127.0.0.1` and `NODE_ENV=production`, then loads the server with a
dynamic `import()` and exits with code 1 if that fails. Passenger provides
`PORT`.

## Plesk Git deployment

Plesk Git is configured with repository `emmparts.site`, branch `main`, and
**manual** deployment. Additional deploy actions, in order:

```sh
/opt/plesk/node/22/bin/npm ci
/opt/plesk/node/22/bin/npm run build
mkdir -p tmp && touch tmp/restart.txt
```

`tmp/restart.txt` tells Passenger to restart the app on the next request.

`npm run build` runs only the Vite/Nitro build — never database migrations.
`npm run build:with-migrate` keeps the build + migrate behaviour for an
environment that actually has a database; `npm run db:migrate` without
`DATABASE_URL` exits 0 with `skipped: no DATABASE_URL`.

## First-deploy checklist

- [ ] **Delete Plesk's default `index.html` from the application root**
      (`/emmparts.hosting3m.com/index.html`, the "Domain Default page"). Plesk
      creates it with the subdomain. It is not tracked in git, but Vite/Nitro
      use a root `index.html` as the SSR renderer template, so every route
      renders the Plesk page. `npm run build` now refuses to run while it is
      there (`scripts/check-build-root.mjs`, wired as `prebuild`).
- [ ] Apply the Node.js settings above, application root first.
- [ ] Set `VITE_AUTH_ENABLED=false`; leave `DATABASE_URL` unset.
- [ ] Configure the Plesk Git deploy actions above.
- [ ] Pull + Deploy, then run the verification script (below).

## Release flow

1. Work on a feature branch (`fix/…`, `feat/…`, `docs/…`).
2. Open a PR into `develop`; merge after review.
3. Open a PR from `develop` into `main`; merge after review.
4. In Plesk → Git: **Pull**, then **Deploy** (runs the deploy actions).
5. On the server, run `/root/bin/verify-emmparts.sh`.

Never commit directly to `develop` or `main`.

## Rollback

Roll back with history, not by rewriting it:

1. `git revert <sha>…` the offending commit(s) on a branch.
2. Open a PR into `main` (and back-merge into `develop`), merge it.
3. In Plesk → Git: **Pull**, then **Deploy**; run `/root/bin/verify-emmparts.sh`.

Never force-push `main` or `develop`.

## Files not used in production

- `startup.sh` — Grok sandbox dev-server launcher; Passenger does not use it.
- `.grok/` — Grok app-builder sandbox tooling (skills, references). The one
  exception: `npm run build` reads `.grok/app-env.json` to bake
  `VITE_AUTH_ENABLED` into the client bundle, so **keep that file in the repo**.
- `app.js` — legacy ESM entrypoint that fails under Passenger; kept for reference.
- `AGENTS.md`, `screenshots/`, `artifacts/`, `attachments/` — builder artifacts.
