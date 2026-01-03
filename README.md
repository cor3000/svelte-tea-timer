# Tea Timer

Svelte app built with Vite and deployed as static assets via Cloudflare Wrangler.

## Setup

```bash
npm install
```

## Development

Run the Vite dev server:

```bash
npm run dev
```

Open [localhost:5173](http://localhost:5173).

## Build

Create a production build in `dist/`:

```bash
npm run build
```

After the build, `dist/sw.js` gets a new cache version string so service worker updates are picked up on deploy.

Preview the production build locally:

```bash
npm run preview
```

## Cloudflare (Wrangler)

Run `wrangler dev` against the built assets:

```bash
npm run start
```

Wrangler dev defaults to port `8787` (for example, `http://localhost:8787/`).

Deploy (build + service worker version bump + wrangler deploy):

```bash
npm run deploy
```

After a successful deploy, a local git tag is created in the format `deploy-YYYYMMDD-HHMMSS`.
