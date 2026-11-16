# MODULO

A dark, premium personal productivity and everyday-utilities app.
**Phase 1: frontend foundation** — React + Vite + JavaScript + CSS + Lucide icons. No backend yet; data is saved in `localStorage`.

## Run it

Requires Node.js 20.19+ (or 22.12+).

```bash
npm install
npm run dev        # http://localhost:5173
```

Production build:

```bash
npm run build
npm run preview
```

## Features

- **App shell** — collapsible sidebar (state remembered), mobile slide-in drawer, top bar with universal search, `Ctrl/⌘ K` hint, notifications, profile and date.
- **Dashboard** — welcome header with live date/time, quick access, recently used tools, and a customisable workspace.
  - Widgets: Clock, Calculator, Quick Notes, To-do list, Timer, Stopwatch.
  - Add / remove widgets, drag-and-drop reordering (plus up/down buttons for touch and keyboard), layout saved and restored, reset to default.
- **Tools library** — six categories, search and filter. Working tools: Percentage calculator, Unit converter, Word counter, Case converter, File inspector (SHA-256), Colour palette, Password generator, UUID generator, plus the widgets. Unbuilt tools are clearly marked *Coming soon*.
- **Notes** — create, edit (autosave), delete, search.
- **Bookmarks** — add URL and title (with validation), filter, open in new tab, delete.
- **Command palette** — `Ctrl+K` / `Cmd+K`; arrow keys, Enter, Esc; searches pages, tools and notes.
- **Settings** — accent colour, appearance, sidebar preferences, display name, dashboard reset, full local-data reset (with confirmation).
- Responsive from phone to desktop; error boundaries around pages, widgets and tools.

## Structure

```
src/
  app/         hash router (no server config needed; works on GitHub Pages)
  components/  ui/ (buttons, modal, switch…), layout/, search/
  config/      navigation, tools registry, widget registry  <- add new tools/widgets here
  context/     settings + notifications providers
  hooks/       useLocalStorage, useNow, useClickOutside
  lib/         pure helpers (calc, colour, format, search, url)
  pages/       Dashboard, Tools, Notes, Bookmarks, Settings
  services/    storage.js  <- single persistence layer
  store/       data hooks for notes, tasks, bookmarks, layout
  styles/      tokens, base, layout, components, dashboard, pages, tools
  tools/       standalone tool components
  widgets/     dashboard widget components
```

## Preparing for the backend

All persistence goes through `src/services/storage.js` and the hooks in `src/store/`.
To move to an API / PostgreSQL later, replace the storage calls in those hooks with async API calls; components don't touch `localStorage` directly.

## Deploy to GitHub Pages (deploy from a branch)

The app must be built before it can be hosted. Builds go to `docs/`:

```bash
npm install
npm run build        # writes the site into docs/
git add -A
git commit -m "Build site"
git push
```

Then in the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` → Folder: `/docs` → Save.**

Re-run the build and commit `docs/` whenever you change the app.
Pages can't serve the repo root, because the root `index.html` points at `/src/main.jsx`, which browsers can't run (blank page).
