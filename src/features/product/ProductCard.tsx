"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/types";
import StarRating from "./StarRating";
import Icon from "@/components/ui/Icon";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { formatPrice } from "@/lib/format";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.has(product.id));
  const onSale = Boolean(product.comparePrice && product.comparePrice > product.price);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-white border border-gray-200 overflow-hidden"
    >
      {(product.isNew || onSale) && (
        <span className="absolute top-3 left-3 z-10 bg-ink text-white text-[10px] font-bold uppercase tracking-wide px-2 py-1">
          {product.isNew ? "New" : "Sale"}
        </span>
      )}

      <button
        onClick={() => toggleWishlist(product)}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-white shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Icon name="heart" size={15} color={isWishlisted ? "c9a227" : "0a0a0a"} filled={isWishlisted} />
      </button>

      <Link href={`/products/${product.slug}`} className="block relative aspect-square bg-gray-100 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-ink line-clamp-1 hover:text-brand-dark transition-colors">{product.name}</h3>
        </Link>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="font-bold text-ink">TK {formatPrice(product.price)}</span>
          {onSale && <span className="price-strike">TK {formatPrice(product.comparePrice!)}</span>}
        </div>

        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 mt-2">
            {product.colors.slice(0, 4).map((c) => (
              <span key={c.name} title={c.name} className="h-3.5 w-3.5 rounded-full border border-gray-300" style={{ backgroundColor: c.hex }} />
            ))}
          </div>
        )}

        <div className="mt-2 flex items-center gap-1.5">
          <StarRating rating={Math.round(product.rating)} />
          <span className="text-xs text-gray-400">({product.reviewCount})</span>
        </div>

        <button
          onClick={() => addItem(product)}
          className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-ink text-white text-xs font-bold uppercase tracking-wide py-2.5 hover:bg-brand hover:text-ink transition-colors"
        >
          <Icon name="bag" size={14} color="currentColor" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
