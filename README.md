# Rohit Mistry — Portfolio

Personal site for Rohit Mistry, SDE-2 backend engineer on the Fraud Prevention team at Blinkit.

**Live:** https://mistryiam.github.io/mistryiamPortfolio/

A single-page site with a WebGL hero — a point field that morphs through three
formations as you scroll (neural lattice → distributed cluster → scale surface),
standing in for AI, distributed systems, and systems at scale.

## Stack

| Piece     | Choice                                   |
| --------- | ---------------------------------------- |
| Build     | Vite 5 + TypeScript                      |
| UI        | React 18                                 |
| 3D        | three.js + @react-three/fiber            |
| Styling   | Tailwind CSS v4 (`@tailwindcss/vite`)    |
| Animation | CSS transitions (no animation library)   |
| Hosting   | GitHub Pages, deployed by GitHub Actions |

No animation library and no drei: the only effects needed are a scroll-triggered
fade and an adaptive-DPR helper, both a few lines each. Skipping them keeps the
initial JS payload at roughly 54 kB gzipped, with three.js in a separate chunk
that loads only after the page has painted.

## Local development

```bash
npm install
npm run dev
```

Open **http://localhost:5173/mistryiamPortfolio/** — the `/mistryiamPortfolio/`
path matters, since `base` in `vite.config.ts` matches the Pages URL.

| Command             | What it does                        |
| ------------------- | ----------------------------------- |
| `npm run dev`       | Dev server with HMR                 |
| `npm run build`     | Production build into `dist/`       |
| `npm run preview`   | Serve `dist/` exactly as Pages will |
| `npm run typecheck` | `tsc --noEmit`                      |
| `npm run lint`      | ESLint                              |
| `npm run format`    | Prettier                            |

Always check `npm run preview` before pushing a change that touches assets — it
is the only local check that catches a broken `base` path.

## Editing the content

Everything you would want to change — job titles, bullet points, stats, skills,
links — lives in **`src/data/profile.ts`**. Components read from it and hardcode
nothing, so ordinary updates never require touching a component.

Assets in `public/`:

| File                      | Used for                                   |
| ------------------------- | ------------------------------------------ |
| `Rohit_Mistry_Resume.pdf` | The résumé download button                 |
| `rohit-mistry-640.jpg`    | Portrait (1× )                             |
| `rohit-mistry-1280.jpg`   | Portrait (2×) and the social preview image |
| `favicon.svg`             | Browser tab icon                           |

To swap the résumé, replace `public/Rohit_Mistry_Resume.pdf` and keep the name.

## Deployment

Every push to `main` builds and publishes automatically via
`.github/workflows/deploy.yml`. Pull requests run the same typecheck, lint and
build through `.github/workflows/ci.yml` without deploying.

### One-time setup

This has to be done once in the GitHub UI — a workflow cannot enable Pages for
its own repository:

1. Go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main` (or run the Deploy workflow manually from the **Actions** tab).

Until step 2 is done the deploy job fails with a "Pages is not enabled" error.
The first deploy takes a couple of minutes; after that it is usually under one.

### Adding a custom domain later

1. Create `public/CNAME` containing just the domain, e.g. `rohitmistry.dev`.
2. Set `base: '/'` in `vite.config.ts` — a custom domain serves from the root, so
   the subdirectory prefix has to go, and leaving it in place breaks every asset.
3. Update the absolute URLs in `index.html` (canonical link, `og:url`, `og:image`).
4. At your DNS provider, point the apex at GitHub's Pages IPs
   (`185.199.108–111.153`) and `www` at `mistryiam.github.io` via CNAME.
5. Enter the domain under **Settings → Pages** and tick **Enforce HTTPS** once the
   certificate is issued.

## Why GitHub Pages

Free and unmetered for public repos, HTTPS and custom domains included, no
account beyond GitHub, no cold starts, and nothing that expires. The main thing
it does not offer is a preview URL per pull request.

If those become worth having, **Cloudflare Pages** is the natural next step:
create a project, connect this repo, set the build command to `npm run build`
and the output directory to `dist`, and set `base` to `'/'`. Its free tier has
unlimited bandwidth and gives every PR its own preview URL. Vercel's free tier is
comparable but is licensed for non-commercial hobby use, which is an awkward fit
for a professional portfolio.

## Accessibility and performance notes

- `prefers-reduced-motion: reduce` stops the render loop and the scroll reveals;
  the field still changes formation on scroll, it just does not animate on its own.
- Point count and pixel ratio scale down on smaller screens, and drop further if
  the frame rate falls.
- If WebGL is unavailable the canvas is never created and the page falls back to
  a static gradient background.
- The three.js chunk is loaded lazily so the hero text is the first paint.
