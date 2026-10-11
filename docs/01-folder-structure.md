# Folder Structure

Modeled after the `D:\My Works\Influencer` project's conventions (`app` / `components` / `features` / `lib` / `types`), adapted with a `store` folder since this project needs client-side cart/wishlist/auth state that `Influencer` didn't.

```
src/
  app/                    Routes only (App Router). Pages should stay thin — compose
                          feature components and data, not hold business logic.
    (site)/               All customer-facing routes, grouped so a future route
                          group (e.g. an auth-only area) can sit alongside it.
    layout.tsx            Root layout (fonts, global providers, <html>/<body>)
    globals.css           Tailwind v4 theme tokens + global styles

  components/             Shared, reusable, presentation-only UI with NO single
                          feature/domain owning it. If it's only ever used by one
                          feature, it belongs in features/, not here.
    layout/               Site chrome: SiteHeader, AnnouncementBar, Footer,
                          HeroSlider (home carousel), PageHero (cart/checkout banner)
    ui/                   Generic primitives: Icon (inline SVG set), Breadcrumb,
                          SectionHeading (gold-line-flourish heading), PromoBanner
    animations/           Reveal (scroll/entry animation wrapper)
    providers/            App-wide client providers, e.g. StoreHydrator

  features/                Domain-specific components, one subfolder per domain.
                          Each folder's components are only meaningful together
                          with that domain's page(s) and data.
    product/              ProductCard, ProductDetail, StarRating
    shop/                 ShopContent (sidebar filters + grid, shared by /shop,
                          /category/[slug], /sale), CategoryHero (per-category
                          hero banner)
    cart/                 CartDrawer
    checkout/             OrderConfirmationContent
    account/              AccountSidebar
    auth/                 LoginForm

  lib/
    data/                 Static mock data:
                          categories.ts   — 5 categories, each with its own hero
                          products.ts     — catalog
                          content.ts      — hero slides / promo banners / page
                                            headers (editorial content, kept
                                            separate from catalog data)
                          address.ts      — Bangladesh division/district/area
                                            hierarchy for checkout
                          blog.ts, orders.ts
                          This is the seam where a real API/DB would plug in later.

  store/                  Zustand stores (client-side state): cart, wishlist, auth.
                          Kept top-level (not under lib/) since it's cross-cutting
                          client runtime state, not static content.

  types/
    index.ts              Shared TypeScript interfaces (Category, Product, Order,
                          Address, BlogPost, etc.)
```

## Rules of thumb

- **New shared/presentational UI** (no domain data, reusable anywhere) → `components/ui` or `components/layout`.
- **New feature UI** (tied to one domain: product, cart, checkout, shop, account, auth) → `features/<domain>/`. Create a new `features/<domain>/` folder for a new domain rather than overloading an existing one.
- **New static/mock data** → `lib/data/`.
- **New client-side global state** → `store/`.
- **New shared type** → `types/index.ts`.
- Pages under `app/` should mostly just fetch/select data from `lib/data` and render a `features/*` component — avoid growing page files into full feature implementations.

## What's intentionally absent (for now)

- `src/app/admin/**` — admin dashboard, removed (out of scope per client: frontend-only for now).
- `prisma/`, `prisma.config.ts` — no database layer yet.
- No `next-auth`/real authentication — `store/useAuthStore.ts` is a mock client-only store.
