"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Icon from "@/components/ui/Icon";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/format";

export default function CartDrawer({ onClose }: { onClose: () => void }) {
  const { lines, removeItem, updateQuantity, totalPrice } = useCartStore();

  return (
    <div className="fixed inset-0 z-50">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/50" />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 26, stiffness: 220 }}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col"
      >
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-ink">Your Cart ({lines.length})</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-ink" aria-label="Close cart">
            <Icon name="close" size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {lines.length === 0 ? (
            <p className="text-center text-gray-500 mt-20">Your cart is empty.</p>
          ) : (
            lines.map((line) => (
              <div key={`${line.product.id}-${line.color}-${line.size}`} className="flex gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden relative shrink-0">
                  <Image src={line.product.image} alt={line.product.name} fill sizes="80px" className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-ink text-sm">{line.product.name}</h3>
                  {(line.color || line.size) && (
                    <p className="text-xs text-gray-500 mt-0.5">{[line.color, line.size].filter(Boolean).join(" / ")}</p>
                  )}
                  <div className="flex items-center mt-2 justify-between">
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => updateQuantity(line.product.id, Math.max(1, line.quantity - 1), line.color, line.size)}
                        className="px-2 py-1.5 flex items-center justify-center"
                      >
                        <Icon name="minus" size={10} />
                      </button>
                      <span className="px-2 text-sm">{line.quantity}</span>
                      <button
                        onClick={() => updateQuantity(line.product.id, line.quantity + 1, line.color, line.size)}
                        className="px-2 py-1.5 flex items-center justify-center"
                      >
                        <Icon name="plus" size={10} />
                      </button>
                    </div>
                    <p className="font-semibold text-ink text-sm">TK {formatPrice(line.product.price * line.quantity)}</p>
                  </div>
                </div>
                <button onClick={() => removeItem(line.product.id, line.color, line.size)} className="text-red-500 hover:text-red-700 text-xs self-start">
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
        {lines.length > 0 && (
          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-between mb-4">
              <span className="text-base font-semibold text-gray-700">Subtotal</span>
              <span className="text-lg font-bold text-ink">TK {formatPrice(totalPrice())}</span>
            </div>
            <Link href="/cart" onClick={onClose} className="btn-outline w-full mb-2">
              View Cart
            </Link>
            <Link href="/checkout" onClick={onClose} className="btn-gold w-full">
              Checkout
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
