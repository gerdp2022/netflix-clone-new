# Netflix Clone — Phase 4, Week 1

A React + Vite recreation of the Netflix homepage, built from the course's
Week 1 resource pack (design references, sample images, and the
`Data.js` / `MovieRequestingUrl.txt` starter files).

## What's included

| Piece | Where |
|---|---|
| Header (logo, nav, search, notifications, profile dropdown, scroll shadow) | `src/components/Header.jsx` |
| Banner (hero backdrop, title, overview, Play / More Info) | `src/components/Banner.jsx` |
| Row (horizontal Swiper carousel of cards, hover arrows) | `src/components/Row.jsx` |
| Card (poster, badge, hover-expand overlay with Play / My List / Like / More) | `src/components/Card.jsx` |
| Footer (social icons, link columns, service code, copyright) | `src/components/Footer.jsx` |
| TMDB API wiring | `src/api/axios.js`, `src/api/requests.js` |
| Local fallback movie data (from the resource pack) | `src/data/Data.js` |

## Run it

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Live TMDB data (optional)

The app works out of the box using the bundled local images/data, so it
runs even with no API key. To pull real, live data instead:

1. Create a free account and API key at
   https://www.themoviedb.org/settings/api
2. Copy `.env.example` to `.env`
3. Set `VITE_TMDB_API_KEY=your_key_here`
4. Restart `npm run dev`

Each row and the banner try TMDB first and silently fall back to the local
data if no key is set or a request fails — so nothing breaks either way.

## Build for production

```bash
npm run build
npm run preview
```

## Notes for continuing the Week 1 checklist

- Video ordering (i–ix) maps roughly to: `Header` → `Banner` → `Card` →
  `Row` → API integration (`src/api`) → `Footer` → deployment → optional
  AI integration (see `FutureIntegrationPossibilities.txt` in the
  resource pack — e.g. "movies you might like" based on liked titles).
- Deployment: this is a standard Vite app, so it deploys cleanly to
  Vercel, Netlify, or GitHub Pages — run `npm run build` and deploy the
  `dist/` folder (or connect the repo and let the platform run the build
  command for you).
