# search-pokemon-fm-tech

A Next.js (App Router) + Apollo Client + GraphQL app for searching Pokémon by name, viewing attacks, and browsing evolutions.

## Features
- Search by Pokémon name with URL query param (`?q=pikachu`)
- Autocomplete suggestions from the Pokémon GraphQL API
- Detail view: types, stats, attacks, evolutions
- Click evolutions to navigate seamlessly
- Recent searches persisted in `localStorage`

## Tech Stack
- Next.js (App Router)
- TypeScript
- Apollo Client (GraphQL)
- Tailwind CSS

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts
- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run start` – run production server
- `npm run lint` – lint

## Project Structure
- `app/` – Next.js routes, layout, styles
- `components/base/` – reusable base UI components
- `components/feat/` – feature-level components
  - `search/` – search input, recent searches
  - `pokemon/` – Pokémon result + skeleton
  - `error/` – error boundary
- `graphql/` – queries and typed interfaces
- `hooks/` – custom hooks
- `utils/` – formatting helpers
- `asset/` – static assets (source images)

## Notes
- Favicon is sourced from `asset/pokeball.png` and copied to `app/icon.png`.
- The Pokémon API endpoint is `https://graphql-pokemon2.vercel.app/`.
