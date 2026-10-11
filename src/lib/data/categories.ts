import { Category } from "@/types";

/**
 * Add a new category by appending an entry here — nothing elsewhere needs to
 * change. Each category carries its own `hero` banner (the image/copy shown
 * at the top of its listing page), structured so it can be swapped for a
 * dashboard-editable field later without touching component code.
 */
export const categories: Category[] = [
  {
    id: "cat-footwear",
    name: "Footwear",
    slug: "footwear",
    department: "unisex",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
    subcategories: [
      { name: "Men's Sneakers", count: 2 },
      { name: "Women's Sneakers", count: 1 },
      { name: "Trail Shoes", count: 1 },
      { name: "Boots", count: 1 },
    ],
    hero: {
      eyebrow: "Step Into Style",
      title: "FOOTWEAR",
      titleAccent: "COLLECTION",
      subtitle: "Performance. Style. No Limits.",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1800&q=80",
      cta: { label: "Shop Footwear", href: "/category/footwear" },
    },
  },
  {
    id: "cat-mens-apparel",
    name: "Men's Apparel",
    slug: "mens-apparel",
    department: "men",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
    subcategories: [
      { name: "Hoodies", count: 1 },
      { name: "Track Jackets", count: 1 },
      { name: "T-Shirts", count: 1 },
      { name: "Pants", count: 1 },
    ],
    hero: {
      eyebrow: "Men's Essentials",
      title: "MEN'S APPAREL",
      titleAccent: "COLLECTION",
      subtitle: "Everyday Essentials, Elevated.",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1800&q=80",
      cta: { label: "Shop Men's Apparel", href: "/category/mens-apparel" },
    },
  },
  {
    id: "cat-womens-apparel",
    name: "Women's Apparel",
    slug: "womens-apparel",
    department: "women",
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=600&q=80",
    subcategories: [
      { name: "Jackets", count: 1 },
      { name: "Dresses", count: 1 },
      { name: "Tops", count: 1 },
    ],
    hero: {
      eyebrow: "Women's Essentials",
      title: "WOMEN'S APPAREL",
      titleAccent: "COLLECTION",
      subtitle: "Style That Moves With You.",
      image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1800&q=80",
      cta: { label: "Shop Women's Apparel", href: "/category/womens-apparel" },
    },
  },
  {
    id: "cat-bags",
    name: "Bags",
    slug: "bags",
    department: "unisex",
    image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&w=600&q=80",
    subcategories: [
      { name: "Backpacks", count: 1 },
      { name: "Tote Bags", count: 1 },
      { name: "Crossbody Bags", count: 1 },
    ],
    hero: {
      eyebrow: "Carry It Well",
      title: "BAGS",
      titleAccent: "COLLECTION",
      subtitle: "Built For Everyday Adventures.",
      image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&w=1800&q=80",
      cta: { label: "Shop Bags", href: "/category/bags" },
    },
  },
  {
    id: "cat-accessories",
    name: "Accessories",
    slug: "accessories",
    department: "unisex",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80",
    subcategories: [
      { name: "Caps", count: 1 },
      { name: "Sunglasses", count: 1 },
      { name: "Belts", count: 1 },
    ],
    hero: {
      eyebrow: "Finish The Look",
      title: "ACCESSORIES",
      titleAccent: "COLLECTION",
      subtitle: "The Details That Define You.",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1800&q=80",
      cta: { label: "Shop Accessories", href: "/category/accessories" },
    },
  },
];

export const brands = ["Nordic", "Vertex", "Lumen", "Orbit", "Halcyon", "Cobalt", "Ferro", "Marlow", "Quill", "Atlas"];

export const shopHero = {
  eyebrow: "The Full Collection",
  title: "SHOP",
  titleAccent: "ALL",
  subtitle: "Footwear, Apparel, Bags & Accessories — Built For A Bolder You.",
  image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1800&q=80",
  cta: { label: "Shop Now", href: "/shop" },
};

export const saleHero = {
  eyebrow: "Limited Time",
  title: "SALE",
  titleAccent: "COLLECTION",
  subtitle: "Up To 50% Off On Selected Items.",
  image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=80",
  cta: { label: "Shop Sale", href: "/sale" },
};
