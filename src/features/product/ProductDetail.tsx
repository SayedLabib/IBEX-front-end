"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Product } from "@/types";
import StarRating from "./StarRating";
import Icon from "@/components/ui/Icon";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { formatPrice } from "@/lib/format";

const TABS = ["Product Details", "Materials", "Shipping & Returns"] as const;
const MIN_CAROUSEL_ITEMS = 8;

const trustItems: { icon: "truck" | "box" | "medal" | "shield-check"; title: string; desc: string }[] = [
  { icon: "truck", title: "Free Shipping", desc: "Over TK 1000" },
  { icon: "box", title: "Easy Returns", desc: "Hassle-free" },
  { icon: "medal", title: "Premium Quality", desc: "100% Authentic" },
  { icon: "shield-check", title: "Secure Payment", desc: "100% Safe" },
];

export default function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState(product.colors?.[0]);
  const [size, setSize] = useState(product.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<(typeof TABS)[number]>("Product Details");
  const [added, setAdded] = useState(false);
  const [paused, setPaused] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState("50% 50%");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.has(product.id));
  const inStock = product.stock > 0;
  const onSale = Boolean(product.comparePrice && product.comparePrice > product.price);

  const handleAddToCart = () => {
    addItem(product, quantity, color?.name, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, quantity, color?.name, size);
    router.push("/checkout");
  };

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin(`${Math.max(0, Math.min(100, x))}% ${Math.max(0, Math.min(100, y))}%`);
  };

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") setActiveImage((i) => (i + 1) % product.gallery.length);
      if (e.key === "ArrowLeft") setActiveImage((i) => (i - 1 + product.gallery.length) % product.gallery.length);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, product.gallery.length]);

  const reviewCount = product.reviews.length;
  const repeatCount = reviewCount > 0 ? Math.max(2, Math.ceil(MIN_CAROUSEL_ITEMS / reviewCount)) : 0;
  const reviewLoop = reviewCount > 0 ? [...Array(repeatCount).fill(product.reviews).flat(), ...Array(repeatCount).fill(product.reviews).flat()] : [];
  const carouselDuration = reviewCount > 0 ? repeatCount * reviewCount * 4 : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-[96px_1fr] lg:grid-cols-[96px_1fr_1fr] gap-6 lg:gap-10">
        <div className="hidden md:flex md:flex-col gap-3">
          {product.gallery.map((img, i) => (
            <button
              key={img}
              onClick={() => setActiveImage(i)}
              className={`relative h-20 w-full rounded-md overflow-hidden border-2 transition-colors ${i === activeImage ? "border-brand" : "border-transparent hover:border-gray-200"}`}
            >
              <Image src={img} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>

        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              ref={imageRef}
              onMouseEnter={() => setZoomed(true)}
              onMouseLeave={() => setZoomed(false)}
              onMouseMove={handleImageMouseMove}
              onClick={() => setLightboxOpen(true)}
              className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-zoom-in"
            >
              <Image
                src={product.gallery[activeImage] ?? product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-200 ease-out"
                style={{ transform: zoomed ? "scale(2)" : "scale(1)", transformOrigin: zoomOrigin }}
                priority
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxOpen(true);
                }}
                aria-label="View full-size image"
                className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-brand transition-colors"
              >
                <Icon name="zoom" size={18} />
              </button>
              <span
                className={`absolute bottom-3 left-1/2 -translate-x-1/2 text-[11px] font-medium text-white bg-black/55 px-3 py-1 rounded-full pointer-events-none transition-opacity hidden sm:block ${
                  zoomed ? "opacity-0" : "opacity-100"
                }`}
              >
                Hover to zoom · Click to view full-size
              </span>
            </motion.div>
          </AnimatePresence>
          <div className="flex md:hidden gap-3 mt-4 overflow-x-auto pb-1">
            {product.gallery.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveImage(i)}
                className={`relative h-20 w-20 shrink-0 rounded-md overflow-hidden border-2 ${i === activeImage ? "border-brand" : "border-transparent"}`}
              >
                <Image src={img} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="section-eyebrow">{product.brand}</p>
          <h1 className="text-3xl font-bold text-ink mt-1">{product.name}</h1>
          {product.subtitle && <p className="text-gray-500 mt-1">{product.subtitle}</p>}
          <div className="flex items-center gap-2 mt-3">
            <StarRating rating={Math.round(product.rating)} size="md" />
            <span className="text-sm text-gray-500">
              {product.rating.toFixed(1)} ({product.reviewCount} reviews)
            </span>
          </div>
          <div className="flex items-center gap-3 mt-4 flex-wrap">
            <span className="text-2xl font-extrabold text-ink">TK {formatPrice(product.price)}</span>
            {onSale && <span className="price-strike text-base">TK {formatPrice(product.comparePrice!)}</span>}
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
              {inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
          <p className="mt-5 text-gray-600 text-sm leading-relaxed">{product.description}</p>

          {product.colors && product.colors.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-semibold text-ink mb-2">
                Color: <span className="font-normal text-gray-500">{color?.name}</span>
              </p>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c)}
                    style={{ backgroundColor: c.hex }}
                    className={`h-9 w-9 rounded-full border-2 ring-1 ring-gray-200 transition-colors ${color?.name === c.name ? "border-brand" : "border-white"}`}
                    aria-label={c.name}
                  />
                ))}
              </div>
            </div>
          )}

          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-ink">Size{product.sizeUnit ? `: ${product.sizeUnit}` : ""}</p>
                <button type="button" className="text-xs text-brand-dark underline">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`h-11 min-w-11 px-2 border rounded-md text-sm font-medium transition-colors ${
                      size === s ? "border-brand bg-brand/10 text-ink" : "border-gray-300 text-gray-700 hover:border-ink"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center gap-3">
            <p className="text-sm font-semibold text-ink">Quantity:</p>
            <div className="flex items-center border border-gray-300 rounded-md">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-2.5 flex items-center justify-center">
                <Icon name="minus" size={12} />
              </button>
              <span className="px-4 text-sm font-semibold">{quantity}</span>
              <button onClick={() => setQuantity((q) => Math.min(product.stock || 1, q + 1))} className="px-3 py-2.5 flex items-center justify-center">
                <Icon name="plus" size={12} />
              </button>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button onClick={handleAddToCart} disabled={!inStock} className="btn-gold w-full disabled:opacity-50 disabled:pointer-events-none">
              <Icon name="bag" size={16} color="0a0a0a" />
              {!inStock ? "Out of Stock" : added ? "Added!" : "Add to Cart"}
            </button>
            <button onClick={handleBuyNow} disabled={!inStock} className="btn-primary w-full disabled:opacity-50 disabled:pointer-events-none">
              Buy Now
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-100">
            {trustItems.map((t) => (
              <div key={t.title} className="flex items-center gap-2">
                <Icon name={t.icon} size={20} />
                <div className="text-xs leading-tight">
                  <p className="font-semibold text-ink">{t.title}</p>
                  <p className="text-gray-500">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => toggleWishlist(product)} className="mt-5 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-brand-dark transition-colors">
            <Icon name="heart" size={16} filled={isWishlisted} color={isWishlisted ? "c9a227" : "0a0a0a"} />
            {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
          </button>
        </div>
      </div>

      <div className="mt-16">
        <div className="flex gap-8 border-b border-gray-200">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-3 text-sm font-semibold uppercase tracking-wide transition-colors ${tab === t ? "border-b-2 border-brand text-ink" : "text-gray-500"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="py-10">
          {tab === "Product Details" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
              <div>
                <h3 className="text-xl font-bold text-ink mb-3 leading-snug">{product.detailHeadline ?? `Why You'll Love The ${product.name}`}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
              </div>
              <div className="divide-y divide-gray-100 border-t border-b border-gray-100 text-sm">
                {product.details.map((d) => (
                  <div key={d.topic} className="flex justify-between gap-4 py-2.5">
                    <span className="text-gray-500">{d.topic}</span>
                    <span className="text-ink font-medium text-right">{d.description}</span>
                  </div>
                ))}
              </div>
              <div className="relative h-64 lg:h-full min-h-56 rounded-lg overflow-hidden">
                <Image src={product.lifestyleImage ?? product.gallery[1] ?? product.image} alt="" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
                <div className="absolute inset-0 bg-black/25" />
                <p className="absolute bottom-5 left-5 text-white text-xl font-bold leading-tight uppercase whitespace-pre-line">
                  {product.lifestyleCaption ?? "Made To\nMove With You"}
                </p>
              </div>
            </div>
          )}
          {tab === "Materials" && (
            <div className="max-w-2xl divide-y divide-gray-100 border-t border-b border-gray-100 text-sm">
              {product.materials.map((m) => (
                <div key={m.topic} className="flex justify-between gap-4 py-3">
                  <span className="text-gray-500">{m.topic}</span>
                  <span className="text-ink font-medium text-right">{m.description}</span>
                </div>
              ))}
            </div>
          )}
          {tab === "Shipping & Returns" && (
            <div className="max-w-2xl text-sm text-gray-600 leading-relaxed space-y-3">
              <p>{product.shippingInfo}</p>
              <p>Returns accepted within 7 days of delivery, provided the item is unused and in its original packaging.</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 pt-10 border-t border-gray-200">
        <h2 className="section-title mb-8">Customer Reviews</h2>
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
          <div>
            <p className="text-4xl font-extrabold text-ink">{product.rating.toFixed(1)}</p>
            <StarRating rating={Math.round(product.rating)} size="md" />
            <p className="text-sm text-gray-500 mt-2">Based on {product.reviewCount} reviews</p>
            <button className="btn-outline mt-5">Write A Review</button>
          </div>
          <div className="min-w-0">
            {reviewCount === 0 ? (
              <p className="text-gray-500 text-sm">No reviews yet.</p>
            ) : (
              <div
                className="overflow-hidden"
                style={{ maskImage: "linear-gradient(to right, transparent, black 32px, black calc(100% - 32px), transparent)" }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                <div
                  className={`flex gap-6 w-max animate-marquee ${paused ? "is-paused" : ""}`}
                  style={{ animationDuration: `${carouselDuration}s` }}
                >
                  {reviewLoop.map((r, i) => (
                    <div key={`${r.id}-${i}`} className="w-[280px] shrink-0 border border-gray-100 rounded-lg p-5">
                      <div className="flex items-center justify-between mb-2">
                        <StarRating rating={r.rating} />
                        <span className="text-xs text-gray-400">
                          {new Date(r.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{r.comment}</p>
                      <p className="text-xs font-semibold text-ink mt-3">
                        {r.author}
                        {r.verified && <span className="ml-1.5 font-normal text-gray-400">· Verified Purchase</span>}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4 sm:p-10"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              aria-label="Close"
              className="absolute top-5 right-5 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <Icon name="close" size={20} color="ffffff" />
            </button>

            {product.gallery.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage((i) => (i - 1 + product.gallery.length) % product.gallery.length);
                  }}
                  aria-label="Previous image"
                  className="absolute left-4 sm:left-8 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <Icon name="chevron-left" size={18} color="ffffff" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage((i) => (i + 1) % product.gallery.length);
                  }}
                  aria-label="Next image"
                  className="absolute right-4 sm:right-8 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <Icon name="chevron-right" size={18} color="ffffff" />
                </button>
              </>
            )}

            <motion.div
              key={activeImage}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl h-[80vh]"
            >
              <Image
                src={product.gallery[activeImage] ?? product.image}
                alt={product.name}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
