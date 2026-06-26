# Noora Bumjaid — Cybersecurity Portfolio

A single-page portfolio built with React, Vite, Tailwind CSS, and Framer Motion. All content is loaded from `data/portfolio.json`.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

Output goes to `dist/` for GitHub Pages deployment.

## Edit content

Update **`data/portfolio.json`** — site info, skills, experience, certifications, activities, awards, and all projects. Run `npm run build` to sync a copy to `public/data/portfolio.json`.

## Project structure

```
index.html              Single HTML entry point
src/                    React app, pages, styles
data/portfolio.json     All portfolio content
public/                 Static assets (PDFs, images, resume)
components/             UI components
lib/                    Data helpers and router
```
