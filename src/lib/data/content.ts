import { HeroBanner, PageBanner, PromoBanner, TrustFeature } from "@/types";

/**
 * Marketing/editorial content — hero slides, promo banners, page headers.
 * Kept separate from catalog data (products/categories) since this is the
 * content a dashboard's "pages" or "content blocks" area would manage
 * independently of inventory.
 */
export const homeHeroSlides: HeroBanner[] = [
  {
    eyebrow: "Style · Comfort · Confidence",
    title: "STEP BOLDER",
    titleAccent: "LIVE HIGHER",
    subtitle: "Premium Footwear, Apparel & Accessories for a Stronger, Stylish You.",
    image: "/Hero/img-9.png",
    cta: { label: "Shop Footwear", href: "/category/footwear" },
    sideLabel: "MORE THAN FASHION A STRONGER YOU",
  },
  {
    eyebrow: "Premium Leather",
    title: "CARRY WHAT",
    titleAccent: "MATTERS MOST",
    subtitle: "Handcrafted bags built for the boardroom, the airport, and everywhere in between.",
    image: "/Hero/img-6.png",
    cta: { label: "Shop Bags", href: "/category/bags" },
    sideLabel: "MORE THAN FASHION A STRONGER YOU",
  },
  {
    eyebrow: "Outerwear Edit",
    title: "DRESSED FOR",
    titleAccent: "EVERY JOURNEY",
    subtitle: "Weather-ready jackets and layers designed to move from the summit to the street.",
    image: "/Hero/img-7.png",
    cta: { label: "Shop Apparel", href: "/category/mens-apparel" },
    sideLabel: "MORE THAN FASHION A STRONGER YOU",
  },
  {
    eyebrow: "Adventure Ready",
    title: "GEAR UP FOR",
    titleAccent: "THE SUMMIT",
    subtitle: "Bags, eyewear and everyday carry built to go the distance with you.",
    image: "/Hero/img-4.png",
    cta: { label: "Shop Accessories", href: "/category/accessories" },
    sideLabel: "MORE THAN FASHION A STRONGER YOU",
  },
];

export const homePromoBanners: PromoBanner[] = [
  {
    id: "promo-footwear",
    eyebrow: "Premium Footwear",
    title: "BUILT FOR GREATER PATHS",
    subtitle: "Adventure Ready. Always Stylish.",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1000&q=80",
    cta: { label: "Shop Footwear", href: "/category/footwear" },
  },
  {
    id: "promo-apparel",
    eyebrow: "New Season",
    title: "APPAREL THAT MOVES WITH YOU",
    subtitle: "Everyday Essentials. Elevated.",
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=80",
    cta: { label: "Shop Apparel", href: "/category/womens-apparel" },
  },
];

export const trustFeatures: TrustFeature[] = [
  { icon: "truck", title: "Fast Delivery", desc: "Get your order within 2-3 days" },
  { icon: "medal", title: "Premium Quality", desc: "Only the best for you" },
  { icon: "box", title: "Easy Returns", desc: "Hassle-free returns" },
  { icon: "headset", title: "Customer Support", desc: "We're here to help" },
];

export const lifestyleBanner: HeroBanner = {
  eyebrow: "",
  title: "A LIFESTYLE",
  titleAccent: "BEYOND TRENDS",
  subtitle: "Footwear, apparel and accessories designed for those who move with purpose.",
  image: "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=1400&q=80",
  cta: { label: "Explore Now", href: "/shop" },
  sideLabel: "PEOPLE PLACES PASSION PROGRESS",
};

export const aboutHero: PageBanner = {
  eyebrow: "Our Story",
  title: "ABOUT IBEX",
  subtitle: "Built for people who love finding the right thing.",
  image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=80",
  sideLabel: "YOUR IBEX, OUR PROMISE",
};

export const contactHero: PageBanner = {
  eyebrow: "Get In Touch",
  title: "CONTACT US",
  subtitle: "Questions, feedback, or just want to say hello? We'd love to hear from you.",
  image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1800&q=80",
  sideLabel: "YOUR IBEX, OUR PROMISE",
};

export const faqHero: PageBanner = {
  eyebrow: "We're Here To Help",
  title: "HELP & FAQS",
  subtitle: "Answers to the questions we hear most often.",
  image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1800&q=80",
  sideLabel: "YOUR IBEX, OUR PROMISE",
};

export const ourStoreHero: PageBanner = {
  eyebrow: "Visit In Person",
  title: "OUR STORES",
  subtitle: "Find an IBEX store near you across Bangladesh.",
  image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=80",
  sideLabel: "YOUR IBEX, OUR PROMISE",
};

export const categoriesHero: PageBanner = {
  eyebrow: "Browse Everything",
  title: "ALL CATEGORIES",
  subtitle: "Footwear, apparel, bags and accessories — built for a bolder you.",
  image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=80",
  sideLabel: "YOUR IBEX, OUR PROMISE",
};

export const blogHero: PageBanner = {
  eyebrow: "The IBEX Journal",
  title: "LATEST NEWS",
  subtitle: "Style guides, product stories and everything in between.",
  image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1800&q=80",
  sideLabel: "YOUR IBEX, OUR PROMISE",
};

export const loginHero: PageBanner = {
  eyebrow: "Welcome Back",
  title: "SIGN IN",
  subtitle: "Access your orders, wishlist and saved details.",
  image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=80",
  sideLabel: "YOUR IBEX, OUR PROMISE",
};

export const registerHero: PageBanner = {
  eyebrow: "Join IBEX",
  title: "CREATE ACCOUNT",
  subtitle: "Faster checkout, order tracking, and exclusive offers.",
  image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=80",
  sideLabel: "YOUR IBEX, OUR PROMISE",
};

export const trackOrderHero: PageBanner = {
  eyebrow: "Where's My Order",
  title: "TRACK ORDER",
  subtitle: "Enter your order ID to see the latest status.",
  image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=80",
  sideLabel: "YOUR IBEX, OUR PROMISE",
};

export const orderConfirmationHero: PageBanner = {
  eyebrow: "Thank You",
  title: "ORDER CONFIRMED",
  subtitle: "Your order has been placed successfully.",
  image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1800&q=80",
  sideLabel: "YOUR IBEX, OUR PROMISE",
};

export const cartHero: PageBanner = {
  eyebrow: "Shopping Cart",
  title: "CART",
  subtitle: "Your selected items, one step closer to a better you.",
  image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1800&q=80",
  sideLabel: "STYLE MOVES WITH YOU",
};

export const checkoutHero: PageBanner = {
  eyebrow: "Secure Checkout",
  title: "CHECKOUT",
  subtitle: "Complete Your Order",
  image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1800&q=80",
  sideLabel: "STYLE MOVES WITH YOU",
};
