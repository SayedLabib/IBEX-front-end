# IBEX — Project Overview

## What this is

IBEX is an e-commerce storefront (footwear & apparel) being built as a Next.js App Router frontend. No backend/database for now — everything runs on static mock data and client-side state.

**The design is now driven by 5 client-supplied mockup images**, saved at `docs/assets/reference-screenshots/ibex-mockup-{shop,product-detail,cart,checkout,home}.png`. As of 2026-10-11 the whole frontend was rebuilt to match these mockups pixel-close. Read `02-progress-log.md`'s "Step 4" entry before changing visual design — it documents exactly what was built and two decisions that **superseded earlier instructions in this same project**:

- **Header is white**, not black — the original brief said "black navbar," but the mockups show a white header (black announcement bar above it). The mockups were treated as authoritative since the client said to rebuild from them.
- **Category taxonomy is Footwear / Men's Apparel / Women's Apparel / Bags / Accessories** (+ Sale as a cross-cutting filter, not a real category) — not the original Shoes/T-Shirt/Pant/Bag list. Same reasoning.

If the client ever says something that conflicts with what's live, trust what's live and ask — don't assume an old instruction still holds.

## Brand

- Name: **IBEX** ("Your IBEX, Our Promise.")
- Logo: gold/bronze ibex-head mark — `public/IBEX-1.png`, used top-left in the header and in the footer (both via `next/image`).
- Color system (`src/app/globals.css` `@theme`): `--color-ink` (near-black, `#0a0a0a`) for header/footer/buttons, `--color-brand` (gold, `#c9a227`) for accents/CTAs, `--color-cream` (`#f5f0e6`) for the lifestyle-banner section background.
- Icon set: `src/components/ui/Icon.tsx` — hand-authored inline SVGs (no external image service). Check this file for the full list of supported icon names before adding a new one inline elsewhere.

## Product categories

Real categories (`src/lib/data/categories.ts`), each with its own `hero` banner:

- Footwear
- Men's Apparel
- Women's Apparel
- Bags
- Accessories
- (Sale is a filtered view of products with an active `comparePrice`, not a real category — see `/sale`.)

The category system is data-driven and open for extension — add a new entry to `categories.ts` (with its own `hero`) and tag products with its `categoryId`; no component changes needed.

## Backend-readiness

The client asked that hero banners, promo banners, and product badges (New/Sale/In Stock) be structured so a future dashboard could edit them without touching components. This is reflected in the types (`HeroBanner`, `PageBanner`, `PromoBanner` in `src/types/index.ts`) and in `src/lib/data/content.ts`, which holds all the editorial/marketing content (hero slides, promo banners, page headers) separately from catalog data. When wiring up a real backend later, this is the natural seam: these data files become API calls / dashboard-managed collections instead of static arrays.

## Tech stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript
- Tailwind CSS v4 (`@theme` tokens in `src/app/globals.css`)
- Zustand (+ `persist` middleware) for cart/wishlist/auth client state
- Framer Motion for animation
- No database, no ORM, no auth provider — removed Prisma/next-auth/bcryptjs/pg entirely (see `02-progress-log.md`)

## How to resume work on this project

1. Read `02-progress-log.md` (most recent entry first) for what's already done — especially the "Step 4" full-redesign entry, since it changed a lot of foundational decisions.
2. Read `03-roadmap.md` for what's next and still open.
3. Read `01-folder-structure.md` if you need a refresher on where things live before adding new code.
