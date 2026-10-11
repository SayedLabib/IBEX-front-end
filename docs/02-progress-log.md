# Progress Log

Newest entry first.

---

## 2026-10-11 — Step 16: functional product image zoom (hover magnifier + lightbox)

The zoom icon on the product detail page's main image was purely decorative — clicking it did nothing. Replaced it with the standard modern e-commerce pattern (`src/features/product/ProductDetail.tsx`):

1. **Hover-to-zoom (desktop)**: moving the cursor over the main image scales it to 2x with `transform-origin` tracking the cursor's position (computed from `getBoundingClientRect()` on every `mousemove`), so the zoomed view pans to follow wherever the cursor is — the same cursor-following magnifier behavior used on Amazon/Shopify-style product pages. A small "Hover to zoom · Click to view full-size" hint fades in/out appropriately.
2. **Click-to-lightbox (desktop + mobile)**: clicking the zoom button or the image itself opens a full-screen lightbox (dark overlay, image at `object-contain`, prev/next arrows cycling through `product.gallery`, Escape-to-close, click-outside-to-close, and body scroll locked while open). This covers mobile, where hover doesn't apply.

Verified: `tsc --noEmit` clean, `npm run build` clean (57 routes), Playwright confirmed the zoom visibly pans with cursor position (center vs. corner produce different crops), the lightbox opens/closes correctly, and prev/next navigation stays in sync with the thumbnail rail's active image. Zero console errors.

---

## 2026-10-11 — Step 15: unified Add to Cart button across the whole site

The home page's New Arrivals/Best Sellers/Featured row was the only place still using `ProductCard`'s `compact` variant (a small circular icon-only cart button) — every other grid (Shop, Category, Wishlist, Cart's "You May Also Like", Product Detail's related products) already used the full "ADD TO CART" text button. Dropped the `compact` prop from the home page's usage, and since nothing referenced it anymore, removed the now-dead `compact` branch and prop from `ProductCard.tsx` entirely rather than leaving unreachable code behind.

Verified: `tsc --noEmit` clean, `npm run build` clean (57 routes), Playwright screenshot confirms the home page's product grid now renders the same full-width "ADD TO CART" button as every other page.

---

## 2026-10-11 — Step 14: transparent-overlay navbar on the home hero

Client flagged that the opaque black navbar was eating into the home hero image (the subject's head sat right against a hard black bar with no breathing room). Fixed with the standard "overlay navbar over hero, solid on scroll" pattern, scoped to the home page only to avoid any risk to the other 50+ pages that use a plain `Breadcrumb` or don't have a tall hero directly at the top.

- `SiteHeader.tsx`: detects `isHome` (`usePathname() === "/"`) and tracks scroll position. While on the home page and scrolled less than 80px, the nav bar renders with a `bg-linear-to-b from-black/70 via-black/35 to-transparent` scrim instead of solid `bg-ink`; past that threshold (or on any other page) it's the solid black bar as before. The announcement bar above it is untouched — only the heavier black bar overlays.
- `app/(site)/page.tsx`: wrapped `<HeroSlider>` in a `-mt-20` (negative 80px, matching the nav bar's `h-20`) container so the hero visually extends up underneath the nav bar instead of starting below it. The nav bar's `z-40` keeps it painted on top while the hero's image shows through the transparent scrim.

Net effect: at the top of the home page you now see noticeably more of the hero image (including the subject's full head/hair, previously cramped against the bar), the nav is still fully legible thanks to the dark scrim, and it smoothly becomes a normal solid bar the moment you start scrolling so it stays readable over whatever content follows.

Verified: `tsc --noEmit` clean, `npm run build` clean (57 routes), Playwright screenshots confirm the overlay/solid transition triggers correctly on scroll and resets on scroll-back-to-top, cycling hero slides still renders correctly through the transparent nav, and the Shop page (and by extension every other non-home page) is pixel-for-pixel unchanged. Zero console errors.

---

## 2026-10-11 — Step 13: moved floating WhatsApp/Messenger widget to bottom-right

Client corrected the earlier placement — `FloatingContact.tsx` now anchors `bottom-5 right-5` (was `bottom-5 left-5`), with the flex column switched to `items-end` so the tooltip bubble stays right-aligned above the icons instead of overflowing left. Still mounted once in `(site)/layout.tsx`, so the fix applies site-wide automatically.

Verified: `tsc --noEmit` clean, `npm run build` clean (57 routes), Playwright screenshot confirms the widget and its tooltip are now properly anchored to the bottom-right corner.

---

## 2026-10-11 — Step 12: new full-lockup logo, black navbar, off-white announcement bar

Client provided a new, more detailed logo (`public/IBEX.png` — gold goat emblem + "IBEX FOOTWEAR & APPAREL" wordmark + "Your IBEX, Our Promise." tagline, transparent background) and pointed out it wouldn't read well on the previous white navbar.

1. **Swapped the logo everywhere** (`SiteHeader.tsx` desktop header + mobile drawer, `Footer.tsx`) from `/IBEX-1.png` to `/IBEX.png`, sized up slightly (the new lockup has more detail packed in) so the wordmark stays legible.
2. **Navbar background changed from white to black** (`bg-ink`) to match the gold logo. Recolored everything that was tuned for a white background: nav links to white text with gold (`text-brand`) active/hover states, the account/wishlist/cart/menu icons to white, and gave the search input an explicit `bg-white` pill (it previously relied on transparent-on-white, which would've been invisible on black).
3. **Announcement bar flipped from black-with-gold-text to off-white-with-black-text** (`bg-cream text-ink`), including the prev/next chevron icons and their hover states, per explicit request.

Left the floating Shop dropdown panel and the mobile slide-out drawer on their existing white backgrounds — those are separate overlay surfaces, not "the navbar bar" itself, and stayed readable either way.

Verified: `tsc --noEmit` clean, `npm run build` clean (57 routes), Playwright screenshots of the header (desktop + mobile menu) and footer confirm the new logo and black/off-white color scheme render correctly with no contrast issues and zero console errors.

---

## 2026-10-11 — Step 11: product detail page audit — fixed hardcoded content, price formatting, and single-image galleries

Client sent the live Apex Runner product page back and asked for a section-by-section self-review against it, specifically calling out that every product needs multiple real angle/detail images (not just one), and reiterated that everything must stay admin-dashboard-wireable.

**Audit findings — three real bugs, not just the gallery gap:**

1. **17 of 18 products had exactly one gallery image** (only `p-01` had 3). Expanded every product to 2-4 images. The flagship `IBEX Apex Runner` now uses **real photography from `public/Hero/`** (`img-9`, `img-1`, `img-2`, `img-5` — genuinely the same staged product across different setups, the best "multiple angles" result in the catalog). The other 17 products were expanded with Unsplash images chosen per-category (footwear lifestyle/product shots, apparel flatlays/portraits, bag/accessory detail shots) — all spot-checked for actual content via a throwaway local HTML page in Playwright before committing, since a bad guess here looks exactly like the earlier "toy figurines" mistake.
   - **Caught and fixed a real mistake mid-task**: a broken test image collapsed to zero height during visual verification, which silently shifted my read of which photo ID was which by one position — so several bag/accessory products briefly got the wrong image (a sneaker in the backpack's gallery, a handbag in the cap's gallery, etc.). Re-verified every affected ID individually with explicit on-page labels before finalizing, and corrected all of them. Recorded here as a reminder: never trust a manual visual count across a batch that contains a failed image — verify failure-prone batches one at a time.

2. **"Designed For A Stronger You" and "Every Step Elevates You" were hardcoded strings in `ProductDetail.tsx`**, shown identically on every single product page regardless of whether it was a sneaker, a dress, or a pair of sunglasses — directly contradicting the "everything must be admin-editable per product" rule from Step 4. Added `detailHeadline` and `lifestyleCaption` fields to the `Product` type (`src/types/index.ts`) and gave all 18 products their own copy (e.g. the backpack now says "Built For The Daily Commute" / "Carry More, Worry Less"). Also added `lifestyleImage` (optional override for the editorial photo, currently unused — falls back to `gallery[1]`) and `sizeUnit` (so footwear shows "Size: EU" while apparel just shows "Size", matching the reference).

3. **Prices had no thousand separator** — `TK 3250.00` instead of `TK 3,250.00` as shown in the reference. Added `src/lib/format.ts` (`formatPrice`) and applied it everywhere a price renders: `ProductCard`, `ProductDetail`, cart page, `CartDrawer`, checkout, and both account order pages.

Verified: `tsc --noEmit` clean, `npm run build` clean (57 routes), Playwright screenshots of the Apex Runner, Everyday Backpack, Midi Dress, and every bags/accessories/footwear/apparel product's thumbnail rail confirm the galleries now show genuinely correct, product-appropriate images with zero console errors.

---

## 2026-10-11 — Step 10: real payment logos, checkout gap-fill, sitewide WhatsApp/Messenger widget

Client pointed out the checkout's payment method badges were just plain text ("VISA", "MC", "bKash", "Nagad", "Rocket" in bordered chips) instead of real brand marks, asked for a full review of the checkout page for anything missing, and asked for floating WhatsApp + Messenger icons in the bottom-left corner sitewide.

1. **Real payment brand logos** — new `src/components/ui/PaymentLogos.tsx` exports `VisaLogo`, `MastercardLogo`, `BkashLogo`, `NagadLogo`, `RocketLogo`: small badge components with each brand's actual color identity (Visa's navy italic wordmark, Mastercard's red/yellow interlocking circles via `mix-blend-mode`, bKash/Nagad/Rocket as colored badges in their real brand colors). Swapped into `checkout/page.tsx`'s Payment Method section in place of the plain-text chips.

2. **Checkout review — found and fixed three real gaps**, not just the logos:
   - **Coupon code was decorative only** — `discount` was hardcoded to `0` and the "Apply" button did nothing. Added a small demo coupon table (`WELCOME10` = 10% off, `FLAT200` = flat TK 200 off) with working apply/remove, a discount line in the order summary, an "applied" state with a Remove link, and an inline error message for invalid codes.
   - **"Use this address as billing address" checkbox had no effect** — unchecking it did nothing since no alternate form existed. Added a conditional Billing Address block (Division/District/Area + full address, same cascading-select pattern as shipping) that appears when unchecked.
   - **No way back to the cart from checkout** — added an "Edit Cart" link next to the Order Summary heading.
   - Looked for other gaps (guest-vs-account prompt, line-item editing, legal consent checkbox) and judged them out of scope for a COD-focused demo checkout — noted here rather than silently skipped.

3. **Floating WhatsApp + Messenger buttons sitewide** — new `src/components/layout/FloatingContact.tsx`, mounted once in `(site)/layout.tsx` so it appears on every page without per-page wiring. Fixed bottom-left, WhatsApp (green, real wa.me deep link using the phone number already published on the Contact page) and Messenger (blue, placeholder link since there's no real Facebook Page to link to yet — same "#" convention the footer's social icons already use). Includes a dismissible tooltip bubble ("Have a question? Ask us anything.") matching the reference screenshot; dismissal persists for the browsing session since the layout doesn't remount on client-side navigation.

Verified: `tsc --noEmit` clean, `npm run build` clean (57 routes), Playwright screenshots confirm the real logos render, coupon apply/remove/invalid states all work correctly with live total recalculation, the billing address form toggles correctly, and the floating widget appears consistently across pages with zero console errors.

---

## 2026-10-11 — Step 9: rectangular design system + real IBEX product photography in the Hero

Client sent back the home page screenshot from *before* Step 7's zarganz-style redesign and said to follow that layout instead (minus the navbar, which stays as-is), with sharp rectangular buttons/cards instead of any rounding, and to use real photos from `public/Hero/` (9 AI-generated, on-brand product shots actually carrying the IBEX goat emblem) for the hero slides instead of stock Unsplash images. Net effect: this **reverses the pill-button and centered-hero direction from Step 7** in favor of the earlier mockup-approved layout, now rebuilt with real brand photography.

1. **Buttons and cards are now fully rectangular (`rounded-none`)** — not just "less rounded," no radius at all. Changed at the shared source: `.btn-primary`/`.btn-outline`/`.btn-gold` in `globals.css`, `ProductCard`'s outer card border and full-width "Add to Cart" button, its New/Sale badge, and `PromoBanner`'s image container. This propagates sitewide (shop, cart, checkout, login/register, account) since those are the shared building blocks — kept deliberately consistent rather than making only the home page sharp while other pages stayed pill-shaped. **Icon-only circular controls were deliberately left circular** (wishlist heart toggle, compact cart-icon button, slider/carousel prev-next arrows) since the client's complaint was about CTA buttons and card containers, not navigation controls — the reference screenshot itself still shows round nav arrows.

2. **Hero reverted to the left-aligned layout** (text block left, photo right, numbered pagination + prev/next at bottom-left, vertical side label at the right edge) and the Step 7 centered composition + giant "IBEX" watermark was removed entirely.

3. **Hero now uses real local photography from `public/Hero/`** (`img-1.png` through `img-9.png` — AI-generated but genuinely on-brand, each carrying the actual IBEX goat emblem on the product) instead of generic Unsplash stock. Reviewed all 9 images directly and picked 4 for `homeHeroSlides` (`lib/data/content.ts`), one per category so the ask ("3-4 images... from each category like bags, shoes") is covered: `img-9.png` (footwear closeup, city sunset) → Footwear, `img-6.png` (woman with three handbags) → Bags, `img-7.png` (couple in winter outerwear, snowy resort) → Apparel, `img-4.png` (jacket + shoes + backpack, mountain sunset) → Accessories. Each slide's CTA now deep-links to its matching category page instead of the generic `/shop`.

4. **Removed the "Shop The Look" section** added in Step 7 — the reference screenshot's home page doesn't have it, and the client asked to "follow each and every section of the image," so the extra section was cut along with its now-unused `shopTheLook` data and `ShopTheLookTile` type to avoid dead code. Home page section order is now exactly: Hero → Shop By Category → New Arrivals/Best Sellers/Featured tabs → 2 Promo Banners → Lifestyle banner → (Trust Strip + Footer, from the shared site layout).

Verified: `tsc --noEmit` clean, `npm run build` clean (57 routes), Playwright screenshots across home (all 4 hero slides cycled), shop, and login confirm sharp rectangular buttons/cards everywhere, circular nav controls preserved, and the new hero photography rendering correctly. Zero console errors.

---

## 2026-10-11 — Step 8: "Continue with Google" on Login/Register

Added a `GoogleButton` component (`src/features/auth/GoogleButton.tsx`, inline 4-color Google "G" SVG, pill-shaped to match the rest of the button system) below an "Or" divider under the main Login/Register submit button on both `LoginForm.tsx` and `register/page.tsx`. Clicking it mock-logs-in via the same `useAuthStore.login()` used by the email/phone flow (with a placeholder `google.user@gmail.com`) and redirects — consistent with the rest of auth being a frontend-only mock with no real backend yet. Wiring real Google OAuth is backend/infra work for later (needs a real OAuth client ID + callback handling).

Verified: `tsc --noEmit` clean, `npm run build` clean (57 routes), Playwright screenshot confirms the button renders correctly on both pages with no console errors.

---

## 2026-10-11 — Step 7: pill buttons, arrow cleanup, zarganz-style hero, Shop The Look section, sitewide trust strip

Client feedback referenced `https://test.zarganz.com` directly (couldn't be fetched live in this session — connection was reset, likely bot-blocked — so this was built from the zarganz screenshot already saved at `docs/assets/reference-screenshots/zarganz-home.png` from an earlier phase) plus three new annotated screenshots of the live IBEX build.

1. **Buttons are now pill-shaped everywhere.** `.btn-primary`, `.btn-outline`, `.btn-gold` in `globals.css` changed from `rounded-md` to `rounded-full`; `ProductCard`'s full-width "Add to Cart" button updated to match. Since every CTA button in the app composes from these three utility classes (or `ProductCard`), this one change propagated sitewide — verified on home, shop, product detail, cart and checkout.

2. **Removed the arrow glyph from every text CTA** ("Shop Now →", "View All Products →", "Checkout →", "Submit Order →", "Read More →", "← Continue Shopping", etc.) across `HeroSlider`, `PromoBanner`, home page, cart, checkout, and blog. Left the icon-only circular prev/next slide controls and the newsletter icon-button alone — those are navigation controls, not the text-CTA arrows the client was pointing at.

3. **Hero section redesigned to match zarganz's composition**: centered content (was left-aligned), a large low-opacity "IBEX" wordmark watermark bottom-right (echoing zarganz's giant decorative "Z"), a uniform dark tint over the full photo instead of a one-sided gradient, and prev/next + numbered pagination recentered as one control cluster at the bottom-center. Still built on the same `HeroBanner` data (`lib/data/content.ts`) — no type changes, so it's still fully backend-editable.

4. **New "Shop The Look" section added to the home page** (`src/app/(site)/page.tsx`, data in `lib/data/content.ts` as `shopTheLook: ShopTheLookTile[]`), inspired by zarganz's "WATCH. TAP. SHOP." tiles: two large lifestyle photos with a dark overlay and a small shoppable product card (thumbnail + name + price + "View" pill button) pinned at the bottom. Tiles reference products **by slug** (`getProductBySlug`), not duplicated name/price, so the catalog stays the single source of truth. New types added: `ShopTheLookTile`, `TrustFeature` (`src/types/index.ts`).

5. **The Fast Delivery / Premium Quality / Easy Returns / Customer Support strip now renders on every page**, not just home. Extracted into `src/components/layout/TrustStrip.tsx`, content moved to `lib/data/content.ts` as `trustFeatures`, and mounted once in `src/app/(site)/layout.tsx` right before `<Footer />` — so every route under `(site)` (including cart/checkout/account) gets it automatically with no per-page wiring.

New Unsplash images used for the "Shop The Look" tiles were spot-checked for actual content (not just a 200 response) before committing — loaded a throwaway local HTML page in Playwright and screenshotted it, since Unsplash can return a valid placeholder image for a bad ID.

Verified: `tsc --noEmit` clean, `npm run build` clean (57 routes, unchanged), Playwright screenshots across home/about/cart/shop/checkout/product-detail confirm pill buttons, no stray arrows, the new hero layout, the new section, and the trust strip appearing before the footer on every page checked. Zero console errors.

---

## 2026-10-11 — Step 6: infinite review carousel + phone/email auth toggle

Two client-requested fixes from screenshot feedback on the live build.

1. **Customer Reviews is now a true infinite carousel** (`src/features/product/ProductDetail.tsx`). Replaced the old 3-per-page prev/next pagination with a seamless, auto-scrolling marquee: the review list is duplicated (repeated enough times to comfortably fill the track, then doubled) and animated with a CSS keyframe (`marquee-x` in `globals.css`) that translates the track by exactly -50%, so the loop point is invisible. Speed scales with review count so pace feels consistent regardless of how many reviews a product has. Pauses on hover (`animation-play-state: paused`, toggled via a `paused` state + `onMouseEnter`/`onMouseLeave`, not just `:hover`, so it also works predictably in tests). Edges are faded with a CSS `mask-image` gradient. No prev/next buttons anymore — it's a pure auto-playing strip per the reference screenshot.

2. **Login and Register now support two identifier types: Email or Phone Number**, selected via a segmented toggle at the top of each form (`src/features/auth/LoginForm.tsx`, `src/app/(site)/register/page.tsx`), matching the provided mockups. Changed `useAuthStore`'s `AuthUser`/`login()` shape (`src/store/useAuthStore.ts`) from a required `email: string` to `email?: string; phone?: string`, with `login()` now taking `{ email }` or `{ phone }` depending on the active tab. This is still a frontend-only mock (no real OTP/verification flow) — wiring real phone auth (OTP send/verify) is backend work for later.

Verified: `tsc --noEmit` clean, `npm run build` clean (57 routes, unchanged), Playwright screenshots confirm the review cards visibly shift position between two capture points (animation is live) and both forms correctly swap their input field when toggling Email ⇄ Phone Number, with zero console errors.

---

## 2026-10-11 — Site-wide visual consistency pass (Step 5 — closes out the open items from Step 4)

**Context:** After Step 4's mockup-driven rebuild of the 5 core shopping pages, the client confirmed (1) keep the white header as built, and (2) redesign the remaining pages to match the new design system instead of leaving them in the old style.

**New `PageHero` banners added for every remaining public page**, each with its own entry in `lib/data/content.ts` (same backend-ready `PageBanner` pattern as cart/checkout): About, Contact, FAQ, Our Store, Categories, Blog (list), Login, Register, Track Order, Order Confirmation. Each got a fitting Unsplash photo, a gold eyebrow, and the "YOUR IBEX, OUR PROMISE" side label for brand consistency with cart/checkout.

- `about/page.tsx` — swapped emoji icons for the new `Icon` set (shield-check/medal/truck), stats band turned into a black/gold band to match the site's dark-section pattern.
- `contact/page.tsx`, `our-store/page.tsx` — icon/button polish only (already had reasonable structure).
- `faq/page.tsx` — fixed a stale reference to PayPal in the payment-methods answer (now says COD/card/bKash-Nagad-Rocket, matching the real checkout); +/− toggle now uses the real `Icon` component instead of text glyphs.
- `categories/page.tsx` — same hero treatment; otherwise unchanged (still a supplementary "browse all + subcategory counts" page, distinct from `/shop`).
- `blog/page.tsx` — hero added; `blog/[slug]/page.tsx` intentionally left on the plain `Breadcrumb` header since the post's own cover image already serves as the page's visual lead.
- `login`/`register` (`features/auth/LoginForm.tsx`, `app/(site)/register/page.tsx`) — hero added above the centered form card, primary button changed from black to gold.
- `track-order/page.tsx` — hero added, primary button changed to gold.
- `order-confirmation` (`features/checkout/OrderConfirmationContent.tsx`) — hero added, checkmark icon switched from an emoji-in-a-circle to the real `check` icon in gold, "Continue Shopping" button changed to gold.
- `wishlist/page.tsx` — rewritten to reuse the shared `ProductCard` component instead of a hand-rolled card, so it automatically stays visually consistent with the shop/cart grids (including the wishlist-heart-toggle-to-remove interaction, which `ProductCard` already supports).
- **Account section** (`account/layout.tsx` and its 6 subpages) — deliberately kept the simpler light-gray `Breadcrumb` header rather than a photo hero, since a big photographic banner on every dashboard subpage isn't standard UX for a logged-in account area. Only updated primary action buttons (Save Address/Save Changes/Save Card) from black to gold for consistency with the rest of the site's "gold = primary action" convention.
- Site-wide button convention finished: gold (`btn-gold`) is now consistently the primary/purchase-path action everywhere (Add to Cart, Submit Order, Checkout, Save X, Continue Shopping); black (`btn-primary`) is reserved for secondary-but-prominent actions where the mockups show it that way (Buy Now next to the gold Add to Cart, Apply Filters).

**Caught and fixed during review:** two of the newly-added hero images were bad Unsplash ID guesses that rendered obviously wrong photos — the Track Order hero showed unrelated toy figurines, and the Categories hero showed a skier. Found both by actually looking at the rendered screenshots (not just checking the build succeeded) and swapped them for on-theme, already-verified-good photos.

**Verified:** `npx tsc --noEmit` and `npm run build` both clean (57 routes, unchanged route count — this pass only touched page content/styling). Re-ran the dev server under headless Chromium and visually checked every updated page (About, Contact, FAQ, Our Store, Categories, Blog, Login, Register, Track Order, Wishlist, Order Confirmation) — no console/page errors, hero images all render correctly after the two fixes above.

**Remaining open item:** none from the client's explicit asks — both Step 4 follow-up questions are now resolved. Future work is whatever the client raises next (see `03-roadmap.md`).

## 2026-10-11 — Full design rebuild from client mockups (Step 4 — supersedes Steps 1-3's visual direction)

**Context:** Client provided 5 high-fidelity mockup images (shop/category listing, product detail, cart, checkout, home) and said to throw out the current design and rebuild from these images. This explicitly superseded the "black navbar" requirement from the original brief — **the new mockups use a white header** with a black announcement bar above it, gold (`#c9a227`) accents, and black/cream secondary surfaces. Also superseded the earlier Shoes/T-Shirt/Pant/Bag category list — the mockups show a richer taxonomy (Footwear, Men's Apparel, Women's Apparel, Bags, Accessories, +Sale as a cross-cutting filter), which is now the real data.

Client also gave 3 standing rules for this rebuild, all addressed below:
1. **Backend-ready content** — hero banners, promo banners, and product badges (new/sale/in-stock) must be data-driven so a future dashboard can edit them without touching components.
2. **Logo top-left, nav centered** (the mockups' centered-logo header was flagged as non-standard) — fixed, plus the icon set now matches the mockups (search/user/heart/bag, not generic icons8 glyphs).
3. **Standard section spacing** — used consistent `py-16`/`gap-10` rhythm across new sections rather than guessing at the flattened mockup spacing.

**Data model (`src/types/index.ts`):**
- Added `HeroBanner` (eyebrow/title/titleAccent/subtitle/image/cta/sideLabel) and `PageBanner` (simpler, no CTA) — used for every hero/banner on the site, all sourced from data files, not hardcoded in components.
- `Category` now carries its own `hero: HeroBanner` — each category's listing page shows its own banner, editable independently later.
- `Product.colors` changed from `string[]` (hex only) to `{ name, hex }[]` so the UI can show "Color: Sand Black", not just a swatch.
- Added `Product.department` ("men"/"women"/"unisex"), `subtitle`, `materials[]` (separate from `details[]`, feeds the new "Materials" tab), `shippingInfo`, `isBestSeller`.
- `Address` changed from `city/state/postalCode/country` to `division/district/area` (Bangladesh's real address hierarchy, needed for the checkout mockup's cascading selects).
- `PaymentMethod` changed from `COD/CARD/PAYPAL` to `COD/CARD/MOBILE` (bKash/Nagad/Rocket — PayPal isn't relevant in this market).

**New data files:**
- `lib/data/address.ts` — Bangladesh Division → District → Area hierarchy (a representative subset, not exhaustive; documented as easy to extend).
- `lib/data/content.ts` — all marketing/editorial content: home hero slides (3), home promo banners (2), the lifestyle banner, and the cart/checkout page headers. Kept separate from catalog data since a dashboard would likely manage "content blocks" separately from inventory.
- `lib/data/categories.ts` rewritten with the 5 real categories, each with its own `hero`. Also exports `shopHero` and `saleHero` for the generic `/shop` and `/sale` listing pages.
- `lib/data/products.ts` rewritten: 18 products across the 5 categories, matching the specific items shown in the mockups where named (IBEX Apex Runner, Trail Shoes, Signature Hoodie, Premium Tote Bag, Classic Cap, Urban Sneakers, Track Jacket, Everyday Backpack, Premium Sunglasses) plus invented products to flesh out Women's Apparel and round out each category.

**Icon system replaced:** `components/ui/Icon.tsx` no longer fetches colorful PNGs from `img.icons8.com` — it's now ~30 hand-authored inline SVGs (search, user, heart, bag, truck, medal, box, headset, shield-check, credit-card, smartphone, social icons, etc.) in a minimal line-icon style matching the mockups, with no external network dependency. `lib/icons8.ts` deleted.

**Header/Footer rebuilt:**
- `AnnouncementBar` (new, replaces the old dark utility `TopBar`, which is deleted) — rotating black/gold strip with the mockup's exact copy.
- `SiteHeader` — logo moved to top-left (`public/IBEX-1.png`), nav centered (Home/Shop/Men/Women/Accessories/Sale), search/account/wishlist/cart icons top-right. Header background is now white (not black — see the superseding note above).
- `Footer` — rebuilt as the mockups' 5-column dark footer (brand+social, Shop, Company, Customer Care, Newsletter).

**Pages rebuilt to match the mockups:**
- `/shop`, `/category/[slug]`, `/sale` all now share one `ShopContent` component (sidebar: category checkboxes with live counts, size grid, color swatches, price range; grid: badges, promo banner inserted mid-grid, sort, pagination) plus a new `CategoryHero` banner component. `/sale` filters to products with an active `comparePrice`.
- Product detail (`ProductDetail.tsx`) rewritten: thumbnail rail + zoom icon, info panel with In Stock pill, color/size selectors, Add to Cart (gold) + Buy Now (black), trust-icon row, Product Details/Materials/Shipping & Returns tabs (spec table + image-with-overlay), Customer Reviews section with a paged review carousel.
- Cart page rewritten: `PageHero` banner, table with per-line wishlist heart + remove link, order note, promo code, order summary with free-shipping messaging, "You May Also Like" carousel.
- Checkout page rewritten: `PageHero` banner, visual step indicator, Contact Information, Shipping Address with cascading Division/District/Area selects, Order Notes, Shipping Method (Inside/Outside Dhaka with truck icons), Payment Method (COD/Card/Mobile with badge chips), order summary with per-item thumbnails + coupon + trust list.
- Home page rebuilt: hero carousel with numbered pagination + side vertical label, "Shop By Category" 5-tile row, tabbed New Arrivals/Best Sellers/Featured carousel (paged, 5 at a time), 2-up promo banners, full-width lifestyle banner, feature strip (exact mockup copy: Fast Delivery/Premium Quality/Easy Returns/Customer Support).
- Currency display switched from the `৳` glyph to `TK ` text everywhere, matching the mockups exactly.

**Lower-priority pages (not in the 5 mockups) kept compiling but not redesigned:** `/about`, `/contact`, `/faq`, `/our-store`, `/blog`, `/login`, `/register`, `/account/*`, `/categories`, `/track-order`, `/order-confirmation` — updated only enough to use the new `Address` shape, new `Icon` names, and `TK` currency. These are still visually in the old style and are candidates for a future pass if the client wants full consistency.

**Verified:** `npx tsc --noEmit` and `npm run build` both clean (57 routes). Also ran the dev server under headless Chromium and visually compared every rebuilt page against the client's mockups (home, shop with department filter, category, product detail, cart empty/filled, checkout empty/filled, sale) plus a mobile viewport check (390px, header hamburger menu) — all matched closely with no console/page errors.

**Open items for the client to confirm:**
- The pivot from "black navbar" to the mockups' white header — flagging this explicitly in case it wasn't intentional.
- The category taxonomy shift (Shoes/T-Shirt/Pant/Bag → Footwear/Men's Apparel/Women's Apparel/Bags/Accessories) — now the live data, following the mockups.
- Whether the untouched pages above (`/about`, `/contact`, `/account/*`, etc.) should get the same visual treatment next.

## 2026-10-11 — Checkout simplified to COD-only; home page rebuilt against Zarganz reference (Step 3)

**Context:** Asked the client two follow-up questions after Step 2: (1) whether to keep Card/PayPal on checkout or match the reference's COD-only flow, and (2) whether the home page's structural match to the Zarganz screenshots was good enough or needed a closer pass. Client chose COD-only and asked for a closer home page match.

**Checkout:**
- Removed the `PaymentMethod` type/state entirely — `checkout/page.tsx` now renders a single, pre-selected "Cash on Delivery (COD)" payment block instead of a 3-way radio (COD/Card/PayPal), and the Card-number input fields are gone.
- Fixed a leftover rebrand miss: `ProductCard.tsx` and `ProductDetail.tsx` had the wishlist-heart active-state color hardcoded to the old GrassHopper green hex (`#89f336`) instead of the gold brand color — now `#c9a227`.

**Home page rebuilt** (`app/(site)/page.tsx`, now a client component) to track the Zarganz reference's section rhythm instead of just swapping content into the old GrassHopper layout:
- New `components/layout/AnnouncementBar.tsx` — a slim rotating black strip above `TopBar` (prev/next arrows, 3 cycling messages), matching the reference's top announcement bar. Lives in `SiteHeader`, so it's site-wide, not home-only.
- Added a small "🐐 We Bring Confidence" ticker line below the hero (reference has "we bring happiness" in the same spot).
- Replaced the old separate "Featured Products" + "New Arrivals" sections with one tabbed **New Arrivals / Trending Now** section (reference's tab switcher pattern), 4-column grid, single "View All" linking to `/shop`.
- Replaced the small 3-tile `quickCategories` banner **and** the circular "Browse Category" icon grid (two separate, overlapping sections) with one **"Shop By Category"** section: large image tiles for all four categories with a bottom-left label + "Explore {name} →", matching the reference's category-tile style.
- Added a **"Fan Favorites"** dark spotlight section (2 large tiles with a product chip overlay + "View Product" button) as the analogue of the reference's "Watch. Tap. Shop" section — adapted to static image tiles since there's no video content.
- Added a full-bleed editorial lifestyle photo band (reference has an unlabeled full-width fashion photo in the same position).
- Added a **"Take A Look"** section: category-tab switcher (Shoes/T-Shirt/Pant/Bag) filtering a 3-product grid, with "View All" linking to the active category page — mirrors the reference's tabbed crossbody/handbags/perfume/etc. section, using our real categories instead.
- Added a **"Step Out In Confidence"** spotlight section (reference: "Carry Your Confidence") — eyebrow + heading, lifestyle photo on one side, a single-product spotlight card with prev/next arrows cycling through 3 featured products on the other.
- Removed the old top "perks" icon row (duplicate of the bottom features strip) and reworded the remaining features strip to the reference's exact copy: Fast Delivery / Premium Quality / Latest Trend / Custom Pre-Order.
- Kept the existing "Latest News" blog grid and brand-name strip at the bottom — the reference doesn't have either, but they weren't flagged as a problem and add trust-signal value.

**Verified:** `npm run build` stays clean. Visually verified with headless Chromium — screenshotted the full home page both as a single full-page capture (which rendered several sections blank — a known Framer Motion `whileInView` + full-page-screenshot artifact, not a real bug) and again via real incremental scrolling (which confirmed every section, including the two interactive tab switchers and the spotlight carousel, renders and functions correctly). Also re-verified the COD-only checkout end to end (shop → add to cart → checkout).

**Not done:** No new project dependency was added for the verification screenshots — Playwright/Chromium were installed one-off via `npx` outside the project (not in `package.json`); nothing to clean up in the repo itself.

## 2026-10-11 — Rebrand, real categories, and checkout/cart alignment pass (Step 2)

**Context:** Client approved moving on from the folder restructure to the first three roadmap items: rebrand to IBEX, replace placeholder categories, and align cart/checkout with the Zarganz reference screenshots.

**Rebrand:**
- `globals.css`: `--color-brand` is now gold (`#c9a227`, with `--color-brand-dark` / `--color-brand-light` variants) instead of the old GrassHopper green. Every component that used the `brand`/`brand-dark` token (buttons, hovers, badges, active borders) picked this up automatically.
- `SiteHeader.tsx`: header bar, search button, and the secondary nav row are now black (`bg-ink`) with white text and gold hover/accent states, per the client's explicit "black navbar" requirement. Replaced the text wordmark with the real logo image (`public/IBEX-1.png`) via `next/image`, in both the desktop bar and the mobile slide-over panel.
- Bulk-renamed every remaining "GrassHopper"/"grasshopper" string across the codebase (metadata, page titles, Zustand `persist` storage keys, footer/about/our-store copy) to "IBEX".
- Rewrote `about/page.tsx` copy to describe footwear/apparel/bags instead of the old "clothing and home goods... electronics, furniture" GrassHopper copy.
- Rewrote `Footer.tsx`'s "Popular Tags" list (was old-category leftovers like "Cloths", "Electronis", "Furniture") to IBEX-relevant tags.

**Category & product data:**
- `lib/data/categories.ts` now holds the real four categories — Shoes, T-Shirt, Pant, Bag — each with relevant subcategories (e.g. Shoes: Sneakers/Boots/Heels/Sandals). Documented in a file comment that adding a category is purely additive (new entry here + matching `categoryId` on products).
- `lib/data/products.ts` fully rewritten: 18 products, evenly spread across the four categories, with realistic BDT pricing (৳550–৳4200) instead of the old $40–60 placeholder range, matching the price scale seen in the client's reference screenshots.
- `lib/data/orders.ts` mock orders reference `products[]` by index, so they still resolve correctly against the new product list; bumped shipping fee / discount mock values from single-digit placeholders to realistic BDT amounts (৳80/৳120 shipping, ৳100/৳150 discounts).
- `lib/data/blog.ts`: swapped two posts' topics (accessories/jewelry, home office) for bag- and pants-focused topics so all four posts are on-brand; kept the already-on-brand wardrobe-staples and running-shoes posts as is.
- Home page (`app/(site)/page.tsx`) "quick categories" and "promos" sections now point at the real four categories/products instead of hardcoded GrassHopper slugs (`/category/clothing`, etc.). `HeroSlider.tsx` slides rewritten around shoes/tees/bags.
- `ShopContent.tsx` price filter slider bounds are now derived from `Math.min`/`Math.max` over real product prices instead of a hardcoded `40`–`60` range.

**Cart/checkout alignment with the Zarganz reference screenshots:**
- Cart page: added an "You are eligible for free shipping" / "Add ৳X more to qualify" message (threshold ৳1500) and an "Add order note" textarea, matching the reference cart layout.
- Checkout page: added a "Shipping Method" step with Inside Dhaka (৳80) / Outside Dhaka (৳120) options feeding the shipping cost, matching the reference. Renamed the submit button to "Submit Order" and added the "By clicking..., you agree to the Terms & Conditions..." line beneath it. Left the existing Card/PayPal payment options in place alongside COD (reference only showed COD, but removing payment methods felt like a product decision beyond what was asked — flagged below).

**Verified:** `npm run build` compiles clean after every change (55 routes). Also ran the dev server with a headless Chromium (via a one-off Playwright install — not added as a project dependency) and visually confirmed: black navbar + gold logo render correctly on home/shop/cart/checkout; category filters show Shoes/T-Shirt/Pant/Bag; an item added to cart flows correctly through cart → checkout with the new shipping-method and free-shipping-message UI.

**Explicitly not done / open questions for the client:**
- Did not remove Card/PayPal from checkout even though the reference shows COD-only — wanted to flag this as a decision point rather than silently narrowing functionality.
- Did not do a pixel-level redesign of the home page hero/sections to visually match the Zarganz screenshots beyond swapping in real category/product content — the existing IBEX layout (hero slider, quick-category tiles, promo grid, category grid, blog grid, brand strip) was kept structurally as-is.
- `account/`, `login/`, `register/` pages still untouched — open question from the previous entry still stands.

## 2026-10-11 — Folder restructure & backend removal (Step 1)

**Context:** Repo started as a "niche-ecommerce" / "GrassHopper"-branded demo scaffold with a full admin dashboard and a Prisma schema wired up, but nothing in the frontend code actually imported Prisma/next-auth/bcryptjs — those were unused scaffolding. Client wants this rebuilt as **IBEX**, frontend-only, with a folder structure mirroring `D:\My Works\Influencer` (`app` / `components` / `features` / `lib` / `types`).

**Done:**
- Moved domain-specific components out of `components/` into a new `features/` tree:
  `account`, `auth`, `cart`, `checkout`, `product`, `shop`. `components/` now only holds truly shared UI (`layout/`, `ui/`, `animations/`, `providers/`).
- Deleted the entire admin dashboard: `src/app/admin/**`, `src/components/admin/**`, and the admin-only `src/lib/data/customers.ts` / `Customer` type.
- Deleted `prisma/` and `prisma.config.ts` (full Prisma Client + schema were generated but unused by any page/component).
- Removed backend-only dependencies from `package.json`: `@prisma/client`, `@prisma/adapter-pg`, `prisma`, `next-auth`, `bcryptjs`, `pg`, `dotenv`, `@types/bcryptjs`, `@types/pg`. Renamed package to `ibex`. Ran `npm install` to sync `package-lock.json`.
- Updated every stale `@/components/...` import to its new `@/features/...` path; verified with `npm run build` — compiles clean, all 61 routes still generate correctly.
- Cleaned `public/`: removed unused default Next.js boilerplate SVGs (`next.svg`, `vercel.svg`, etc.). Moved the client's reference screenshots (Zarganz site captures + IBEX logo reference crop) out of `public/` into `docs/assets/reference-screenshots/` — they're design reference, not site assets. The actual logo file `public/IBEX-1.png` stays in `public/` since it will be used on-site.
- Rewrote `README.md` (was still the default `create-next-app` boilerplate) and created this `docs/` folder as the project's persistent memory.

**Explicitly not done yet** (next steps, see `03-roadmap.md`):
- No visual/branding changes — navbar is still the old light-colored GrassHopper header, not the required black IBEX navbar.
- `src/lib/data/categories.ts` still has the old 8-category placeholder data (Clothing, Accessories, Shoes, Furniture, Electronics, Makeup Kit, Jewelry, Sports) — needs replacing with IBEX's real categories (Shoes, T-Shirt, Pant, Bag), extensible for more.
- No page redesign against the Zarganz reference screenshots yet (home layout, cart page, checkout form).
- `account/`, `login/`, `register/` pages remain as pre-existing mock/static UI — not yet reviewed for whether IBEX needs them in v1.
