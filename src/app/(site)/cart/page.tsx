"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import ProductCard from "@/features/product/ProductCard";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { products } from "@/lib/data/products";
import { cartHero } from "@/lib/data/content";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { lines, removeItem, updateQuantity, totalPrice } = useCartStore();
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const wishlistItems = useWishlistStore((s) => s.items);
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(false);
  const [note, setNote] = useState("");

  const subtotal = totalPrice();
  const discount = applied ? subtotal * 0.1 : 0;
  const freeShippingThreshold = 1500;
  const shipping = subtotal > freeShippingThreshold || subtotal === 0 ? 0 : 80;
  const total = subtotal - discount + shipping;
  const suggestions = products.filter((p) => !lines.some((l) => l.product.id === p.id)).slice(0, 5);

  return (
    <div>
      <PageHero banner={cartHero} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <SectionHeading title="Cart" className="mb-2" />
        {lines.length > 0 && (
          <p className="text-sm text-gray-600 text-center mb-8">
            {subtotal > freeShippingThreshold
              ? "You are eligible for free shipping."
              : `Add TK ${formatPrice(freeShippingThreshold - subtotal)} more to qualify for free shipping.`}
          </p>
        )}

        {lines.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 mb-6">Your cart is currently empty.</p>
            <Link href="/shop" className="btn-gold">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 mt-8">
              <div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-160">
                    <thead>
                      <tr className="border-b border-gray-200 text-xs uppercase text-gray-500">
                        <th className="pb-3">Product</th>
                        <th className="pb-3">Price</th>
                        <th className="pb-3">Quantity</th>
                        <th className="pb-3 text-right">Total</th>
                        <th className="pb-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {lines.map((line) => {
                        const isWishlisted = wishlistItems.some((p) => p.id === line.product.id);
                        return (
                          <tr key={`${line.product.id}-${line.color}-${line.size}`} className="border-b border-gray-100 last:border-0">
                            <td className="py-4 pr-4">
                              <div className="flex items-center gap-4">
                                <div className="relative h-16 w-16 rounded-md overflow-hidden bg-gray-100 shrink-0">
                                  <Image src={line.product.image} alt={line.product.name} fill sizes="64px" className="object-cover" />
                                </div>
                                <div>
                                  <Link href={`/products/${line.product.slug}`} className="font-semibold text-ink text-sm hover:text-brand-dark transition-colors">
                                    {line.product.name}
                                  </Link>
                                  {line.color && <p className="text-xs text-gray-500 mt-1">{line.color}</p>}
                                  {line.size && <p className="text-xs text-gray-500">Size: {line.size}</p>}
                                </div>
                              </div>
                            </td>
                            <td className="py-4 pr-4 text-sm text-gray-600 whitespace-nowrap">TK {formatPrice(line.product.price)}</td>
                            <td className="py-4 pr-4">
                              <div className="flex items-center border border-gray-300 rounded-md w-fit">
                                <button onClick={() => updateQuantity(line.product.id, Math.max(1, line.quantity - 1), line.color, line.size)} className="px-3 py-2 flex items-center justify-center">
                                  <Icon name="minus" size={12} />
                                </button>
                                <span className="px-3 text-sm">{line.quantity}</span>
                                <button onClick={() => updateQuantity(line.product.id, line.quantity + 1, line.color, line.size)} className="px-3 py-2 flex items-center justify-center">
                                  <Icon name="plus" size={12} />
                                </button>
                              </div>
                              <button onClick={() => removeItem(line.product.id, line.color, line.size)} className="text-xs text-gray-400 hover:text-red-500 underline mt-2">
                                Remove
                              </button>
                            </td>
                            <td className="py-4 pr-4 font-semibold text-ink text-sm text-right whitespace-nowrap">
                              TK {formatPrice(line.product.price * line.quantity)}
                            </td>
                            <td className="py-4">
                              <button onClick={() => toggleWishlist(line.product)} aria-label="Move to wishlist" className="text-gray-400 hover:text-brand-dark transition-colors">
                                <Icon name="heart" size={18} filled={isWishlisted} color={isWishlisted ? "c9a227" : "9ca3af"} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <label htmlFor="order-note" className="block text-sm font-semibold text-ink mb-2">
                    Add order note (optional)
                  </label>
                  <textarea
                    id="order-note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="How can we help you?"
                    rows={3}
                    className="input-field resize-none"
                  />
                </div>

                <div className="mt-6">
                  <p className="text-sm font-semibold text-ink mb-2">Have a promo code?</p>
                  <div className="flex gap-2">
                    <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Enter promo code" className="input-field sm:w-56" />
                    <button onClick={() => setApplied(Boolean(coupon))} className="btn-outline whitespace-nowrap">
                      Apply
                    </button>
                  </div>
                  {applied && <p className="text-xs text-green-700 mt-2">Coupon applied: 10% off</p>}
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 h-fit">
                <h2 className="text-lg font-bold text-ink mb-4">Order Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({lines.length} items)</span>
                    <span>TK {formatPrice(subtotal)}</span>
                  </div>
                  {applied && (
                    <div className="flex justify-between text-green-700">
                      <span>Discount</span>
                      <span>-TK {formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600 items-center">
                    <span className="flex items-center gap-1.5">
                      Shipping <Icon name="info" size={13} color="9ca3af" />
                    </span>
                    <span className={shipping === 0 ? "text-brand-dark font-semibold" : ""}>{shipping === 0 ? "Free" : `TK ${formatPrice(shipping)}`}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-ink pt-3 border-t border-gray-100">
                    <span>Total</span>
                    <span>TK {formatPrice(total)}</span>
                  </div>
                </div>
                <Link href="/checkout" className="btn-gold w-full mt-6">
                  Checkout
                </Link>
                <Link href="/shop" className="block text-center text-sm font-semibold text-ink hover:text-brand-dark transition-colors mt-4">
                  Continue Shopping
                </Link>
              </div>
            </div>

            {suggestions.length > 0 && (
              <div className="mt-20">
                <SectionHeading title="You May Also Like" className="mb-10" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                  {suggestions.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
