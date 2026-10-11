export interface HeroBanner {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  subtitle: string;
  image: string;
  cta: { label: string; href: string };
  sideLabel?: string;
}

/** A simpler page-header banner (cart/checkout) — no CTA, since those pages are mid-funnel. */
export interface PageBanner {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  subtitle: string;
  image: string;
  sideLabel?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  department?: "men" | "women" | "unisex";
  subcategories: { name: string; count: number }[];
  /** Per-category hero banner shown at the top of its listing page — editable from a future dashboard. */
  hero: HeroBanner;
}

export interface PromoBanner {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  cta: { label: string; href: string };
}

export interface TrustFeature {
  icon: "truck" | "medal" | "box" | "headset" | "shield-check";
  title: string;
  desc: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
  verified?: boolean;
}

export interface ProductSpec {
  topic: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  department: "men" | "women" | "unisex";
  brand: string;
  subtitle?: string;
  price: number;
  comparePrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  description: string;
  details: ProductSpec[];
  materials: ProductSpec[];
  shippingInfo?: string;
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  /** Unit shown next to the "Size" label, e.g. "EU" for footwear. Omit for apparel (S/M/L). */
  sizeUnit?: string;
  stock: number;
  /** Editorial content for the "Product Details" tab — headline + a lifestyle photo/caption pairing. Per-product so a dashboard can manage it independently per SKU. */
  detailHeadline?: string;
  lifestyleImage?: string;
  lifestyleCaption?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  tags: string[];
  reviews: Review[];
}

export interface CartLine {
  product: Product;
  quantity: number;
  color?: string;
  size?: string;
}

export interface Address {
  id: string;
  label: string;
  recipient: string;
  line1: string;
  division: string;
  district: string;
  area: string;
  phone: string;
  isDefault?: boolean;
}

export type OrderStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED";
export type PaymentStatus = "PAID" | "UNPAID" | "PENDING" | "REFUNDED";
export type PaymentMethod = "COD" | "CARD" | "MOBILE";

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  transactionId?: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  shippingAddress: Address;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  comments: number;
  author: string;
}
