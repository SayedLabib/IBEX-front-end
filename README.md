# IBEX — Footwear & Apparel

A Next.js (App Router) frontend for IBEX, an e-commerce store selling Shoes, T-Shirts, Pants, and Bags, with an extensible category system for future product lines.

See [`docs/`](docs/) for the running project log: architecture decisions, what's been built, and what's next — read `docs/02-progress-log.md` first if you're picking this project back up.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scope

This repo is frontend-only for now: no database, no auth backend, no admin dashboard. All product/category/order data is static mock data under `src/lib/data/`, and cart/wishlist/auth state is client-side only (Zustand + localStorage persistence).

## Project Structure

See [`docs/01-folder-structure.md`](docs/01-folder-structure.md) for the full breakdown of `src/app`, `src/components`, `src/features`, `src/lib`, `src/store`, and `src/types`.
