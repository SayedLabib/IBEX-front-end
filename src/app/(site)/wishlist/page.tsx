"use client";

import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProductCard from "@/features/product/ProductCard";
import { useWishlistStore } from "@/store/useWishlistStore";

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);

  return (
    <div>
      <Breadcrumb title="Wishlist" trail={[{ label: "Wishlist" }]} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {items.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-xl text-gray-500 mb-6">Your wishlist is empty.</p>
            <Link href="/shop" className="btn-gold">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
