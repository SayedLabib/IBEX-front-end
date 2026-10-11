# Roadmap / Next Steps

Steps 1-3 below (Oct 11, earlier that day) were superseded by Step 4's full mockup-driven rebuild — their outcomes (gold theme, black navbar, Shoes/T-Shirt/Pant/Bag categories) no longer reflect the live site. See `02-progress-log.md`'s "Step 4" entry for what's current: white header, gold accents, Footwear/Men's Apparel/Women's Apparel/Bags/Accessories categories, and a full rebuild of home/shop/category/sale/product-detail/cart/checkout against the client's 5 mockup images.

Remaining candidates, not yet scheduled into a particular order:

1. ~~**Visual consistency pass on the untouched pages**~~ — done (Step 5, same day): About/Contact/FAQ/Our Store/Categories/Blog/Login/Register/Track Order/Order Confirmation all got the new `PageHero` banner treatment and gold-primary-button convention; the Account section deliberately kept its simpler dashboard-style header by design (see the Step 5 log entry for the reasoning).

2. **Review scope of auth/account pages** — still an open question from earlier: client said "frontend only," unclear if account management (`/account/*`, `/login`, `/register`) is wanted at all without a real backend/auth. Confirm before investing further there.

3. **Checkout flow depth.** The step indicator (Information → Review Order → Complete Order) is currently decorative — the whole form is still a single page/step, matching what was asked, but if the client wants the steps to be real (separate screens), that's a bigger follow-up.

4. **Minor follow-ups**
   - `src/lib/data/orders.ts` mock orders reference `products[]` by array index rather than by slug — works today but is fragile if the product list is reordered; switch to `getProductBySlug` lookups if this file gets touched again.
   - The Bangladesh division/district/area data in `src/lib/data/address.ts` is a representative subset (a handful of districts/areas per division), not exhaustive — fine for a demo, worth expanding or swapping for a real dataset/API before production.
   - No automated tests exist yet (not asked for) — if this grows past a demo, worth adding at least smoke tests for cart/checkout flows.

5. **Later (explicitly out of scope until client asks):** backend/API, database, real auth, admin dashboard. When that work starts, `src/lib/data/*` (especially `content.ts` for hero/promo banners) is the natural seam — see `00-overview.md`'s "Backend-readiness" section.
