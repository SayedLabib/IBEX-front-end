"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import PageHero from "@/components/layout/PageHero";
import Icon from "@/components/ui/Icon";
import { orderConfirmationHero } from "@/lib/data/content";

export default function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order") ?? "ORD-00000";

  return (
    <div>
      <PageHero banner={orderConfirmationHero} />
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          className="h-20 w-20 rounded-full bg-brand/15 flex items-center justify-center mx-auto mb-6"
        >
          <Icon name="check" size={36} color="c9a227" />
        </motion.div>
        <h1 className="text-3xl font-bold text-ink">Thank you for your order!</h1>
        <p className="text-gray-600 mt-3">
          Your order <span className="font-semibold text-ink">#{orderId}</span> has been placed successfully. A confirmation email is on its way to you.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/account/orders" className="btn-outline">
            View My Orders
          </Link>
          <Link href="/shop" className="btn-gold">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
