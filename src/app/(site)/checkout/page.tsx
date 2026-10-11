"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import PageHero from "@/components/layout/PageHero";
import Icon from "@/components/ui/Icon";
import { VisaLogo, MastercardLogo, BkashLogo, NagadLogo, RocketLogo } from "@/components/ui/PaymentLogos";
import { useCartStore } from "@/store/useCartStore";
import { divisions } from "@/lib/data/address";
import { formatPrice } from "@/lib/format";
import { checkoutHero } from "@/lib/data/content";

type PaymentMethod = "COD" | "CARD" | "MOBILE";

const steps = ["Information", "Review Order", "Complete Order"];

const COUPONS: Record<string, { type: "percent" | "flat"; value: number }> = {
  WELCOME10: { type: "percent", value: 10 },
  FLAT200: { type: "flat", value: 200 },
};

const trustList: { icon: "shield-check" | "truck" | "box" | "medal"; title: string; desc: string }[] = [
  { icon: "shield-check", title: "Secure Checkout", desc: "Your information is safe with us" },
  { icon: "truck", title: "Fast Delivery", desc: "Get your order within 1-3 days" },
  { icon: "box", title: "Easy Returns", desc: "Hassle-free returns within 7 days" },
  { icon: "medal", title: "Premium Quality", desc: "100% authentic products" },
];

export default function CheckoutPage() {
  const { lines, totalPrice, clearCart } = useCartStore();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [billingSame, setBillingSame] = useState(true);
  const [payment, setPayment] = useState<PaymentMethod>("COD");
  const [coupon, setCoupon] = useState("");
  const [couponError, setCouponError] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    email: "",
    division: "",
    district: "",
    area: "",
    line1: "",
    note: "",
  });
  const [billingAddress, setBillingAddress] = useState({ division: "", district: "", area: "", line1: "" });
  const [shippingZone, setShippingZone] = useState<"inside" | "outside">("inside");

  const districts = divisions.find((d) => d.name === address.division)?.districts ?? [];
  const areas = districts.find((d) => d.name === address.district)?.areas ?? [];
  const billingDistricts = divisions.find((d) => d.name === billingAddress.division)?.districts ?? [];
  const billingAreas = billingDistricts.find((d) => d.name === billingAddress.district)?.areas ?? [];

  const subtotal = totalPrice();
  const discount = appliedCoupon?.discount ?? 0;
  const shipping = subtotal === 0 ? 0 : shippingZone === "inside" ? 80 : 120;
  const total = Math.max(0, subtotal - discount) + shipping;

  const handleApplyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    const match = COUPONS[code];
    if (!match) {
      setAppliedCoupon(null);
      setCouponError("Invalid or expired coupon code.");
      return;
    }
    const amount = match.type === "percent" ? Math.round(subtotal * (match.value / 100)) : match.value;
    setAppliedCoupon({ code, discount: Math.min(amount, subtotal) });
    setCouponError("");
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCoupon("");
    setCouponError("");
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const orderId = `ORD-${(Math.floor(10000 + subtotal * 137) % 90000) + 10000}`;
    setTimeout(() => {
      clearCart();
      router.push(`/order-confirmation?order=${orderId}`);
    }, 700);
  };

  if (lines.length === 0) {
    return (
      <div>
        <PageHero banner={checkoutHero} />
        <div className="max-w-7xl mx-auto px-4 py-24 text-center text-gray-500">Your cart is empty. Add products before checking out.</div>
      </div>
    );
  }

  return (
    <div>
      <PageHero banner={checkoutHero} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-center gap-3 sm:gap-6">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-3 sm:gap-6">
              <div className="flex items-center gap-2">
                <span
                  className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    i === 0 ? "bg-brand text-ink" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {i + 1}
                </span>
                <span className={`text-sm font-semibold whitespace-nowrap ${i === 0 ? "text-ink" : "text-gray-400"}`}>{s}</span>
              </div>
              {i < steps.length - 1 && <span className="h-px w-8 sm:w-16 bg-gray-200" />}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
        <div className="space-y-8">
          <div>
            <h2 className="text-sm font-bold text-ink mb-4 uppercase tracking-wide">Contact Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input required placeholder="Full Name *" className="input-field" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} />
              <input required placeholder="Phone Number * (01XXXXXXXXX)" className="input-field" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} />
            </div>
            <input
              type="email"
              placeholder="Email Address (optional)"
              className="input-field mt-4"
              value={address.email}
              onChange={(e) => setAddress({ ...address, email: e.target.value })}
            />
          </div>

          <div>
            <h2 className="text-sm font-bold text-ink mb-4 uppercase tracking-wide">Shipping Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <select
                required
                className="input-field"
                value={address.division}
                onChange={(e) => setAddress({ ...address, division: e.target.value, district: "", area: "" })}
              >
                <option value="">Division *</option>
                {divisions.map((d) => (
                  <option key={d.name} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
              <select
                required
                disabled={!address.division}
                className="input-field disabled:bg-gray-100"
                value={address.district}
                onChange={(e) => setAddress({ ...address, district: e.target.value, area: "" })}
              >
                <option value="">District *</option>
                {districts.map((d) => (
                  <option key={d.name} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
              <select
                required
                disabled={!address.district}
                className="input-field disabled:bg-gray-100"
                value={address.area}
                onChange={(e) => setAddress({ ...address, area: e.target.value })}
              >
                <option value="">Area / Thana *</option>
                {areas.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
            <input
              required
              placeholder="Full Address * (House no, Road no, Area, Landmark)"
              className="input-field mt-4"
              value={address.line1}
              onChange={(e) => setAddress({ ...address, line1: e.target.value })}
            />
            <label className="flex items-center gap-2 mt-3 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" checked={billingSame} onChange={(e) => setBillingSame(e.target.checked)} className="rounded border-gray-300 text-brand focus:ring-brand" />
              Use this address as billing address
            </label>

            {!billingSame && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h3 className="text-xs font-bold text-ink mb-3 uppercase tracking-wide">Billing Address</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <select
                    required
                    className="input-field"
                    value={billingAddress.division}
                    onChange={(e) => setBillingAddress({ ...billingAddress, division: e.target.value, district: "", area: "" })}
                  >
                    <option value="">Division *</option>
                    {divisions.map((d) => (
                      <option key={d.name} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                  <select
                    required
                    disabled={!billingAddress.division}
                    className="input-field disabled:bg-gray-100"
                    value={billingAddress.district}
                    onChange={(e) => setBillingAddress({ ...billingAddress, district: e.target.value, area: "" })}
                  >
                    <option value="">District *</option>
                    {billingDistricts.map((d) => (
                      <option key={d.name} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                  <select
                    required
                    disabled={!billingAddress.district}
                    className="input-field disabled:bg-gray-100"
                    value={billingAddress.area}
                    onChange={(e) => setBillingAddress({ ...billingAddress, area: e.target.value })}
                  >
                    <option value="">Area / Thana *</option>
                    {billingAreas.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  required
                  placeholder="Full Address * (House no, Road no, Area, Landmark)"
                  className="input-field mt-4"
                  value={billingAddress.line1}
                  onChange={(e) => setBillingAddress({ ...billingAddress, line1: e.target.value })}
                />
              </div>
            )}
          </div>

          <div>
            <h2 className="text-sm font-bold text-ink mb-4 uppercase tracking-wide">Order Notes (Optional)</h2>
            <textarea
              placeholder="Any special instructions for your order?"
              rows={3}
              className="input-field resize-none"
              value={address.note}
              onChange={(e) => setAddress({ ...address, note: e.target.value })}
            />
          </div>

          <div>
            <h2 className="text-sm font-bold text-ink mb-4 uppercase tracking-wide">Shipping Method</h2>
            <div className="space-y-3">
              {[
                { key: "inside" as const, label: "Inside Dhaka", fee: 80, desc: "Delivery within 1-2 days" },
                { key: "outside" as const, label: "Outside Dhaka", fee: 120, desc: "Delivery within 2-4 days" },
              ].map((opt) => (
                <label
                  key={opt.key}
                  className={`flex items-center justify-between gap-3 border rounded-md p-4 cursor-pointer transition-colors ${
                    shippingZone === opt.key ? "border-brand bg-brand/5" : "border-gray-200"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <input type="radio" name="shipping" checked={shippingZone === opt.key} onChange={() => setShippingZone(opt.key)} className="accent-brand" />
                    <Icon name="truck" size={20} />
                    <span>
                      <span className="block font-semibold text-ink text-sm">{opt.label}</span>
                      <span className="block text-xs text-gray-500">{opt.desc}</span>
                    </span>
                  </span>
                  <span className="font-semibold text-ink text-sm">TK {opt.fee}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-ink mb-4 uppercase tracking-wide">Payment Method</h2>
            <div className="space-y-3">
              <label className={`flex items-center justify-between gap-3 border rounded-md p-4 cursor-pointer transition-colors ${payment === "COD" ? "border-brand bg-brand/5" : "border-gray-200"}`}>
                <span className="flex items-center gap-3">
                  <input type="radio" name="payment" checked={payment === "COD"} onChange={() => setPayment("COD")} className="accent-brand" />
                  <Icon name="cash" size={20} />
                  <span>
                    <span className="block font-semibold text-ink text-sm">Cash on Delivery (COD)</span>
                    <span className="block text-xs text-gray-500">Pay when you receive your order at your doorstep.</span>
                  </span>
                </span>
              </label>
              <label className={`flex items-center justify-between gap-3 border rounded-md p-4 cursor-pointer transition-colors ${payment === "CARD" ? "border-brand bg-brand/5" : "border-gray-200"}`}>
                <span className="flex items-center gap-3">
                  <input type="radio" name="payment" checked={payment === "CARD"} onChange={() => setPayment("CARD")} className="accent-brand" />
                  <Icon name="credit-card" size={20} />
                  <span>
                    <span className="block font-semibold text-ink text-sm">Credit / Debit Card</span>
                    <span className="block text-xs text-gray-500">Pay securely with Visa, Mastercard or local cards.</span>
                  </span>
                </span>
                <span className="hidden sm:flex items-center gap-1.5">
                  <VisaLogo />
                  <MastercardLogo />
                </span>
              </label>
              <label className={`flex items-center justify-between gap-3 border rounded-md p-4 cursor-pointer transition-colors ${payment === "MOBILE" ? "border-brand bg-brand/5" : "border-gray-200"}`}>
                <span className="flex items-center gap-3">
                  <input type="radio" name="payment" checked={payment === "MOBILE"} onChange={() => setPayment("MOBILE")} className="accent-brand" />
                  <Icon name="smartphone" size={20} />
                  <span>
                    <span className="block font-semibold text-ink text-sm">Mobile Payment</span>
                    <span className="block text-xs text-gray-500">Pay with bKash, Nagad or Rocket.</span>
                  </span>
                </span>
                <span className="hidden sm:flex items-center gap-1.5">
                  <BkashLogo />
                  <NagadLogo />
                  <RocketLogo />
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6 h-fit space-y-5">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-ink">Order Summary</h2>
              <Link href="/cart" className="text-xs font-semibold text-brand-dark hover:underline">
                Edit Cart
              </Link>
            </div>
            <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
              {lines.map((line) => (
                <div key={`${line.product.id}-${line.color}-${line.size}`} className="flex gap-3">
                  <div className="relative h-14 w-14 rounded-md overflow-hidden bg-gray-100 shrink-0">
                    <Image src={line.product.image} alt={line.product.name} fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink truncate">{line.product.name}</p>
                    <p className="text-xs text-gray-500">
                      {[line.color, line.size && `Size: ${line.size}`].filter(Boolean).join(" · ")} · Qty: {line.quantity}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-ink whitespace-nowrap">TK {formatPrice(line.product.price * line.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 text-sm pt-4 border-t border-gray-100">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>TK {formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping Charge</span>
              <span>TK {formatPrice(shipping)}</span>
            </div>
            {appliedCoupon && (
              <div className="flex justify-between text-brand-dark font-semibold">
                <span>Discount ({appliedCoupon.code})</span>
                <span>- TK {formatPrice(appliedCoupon.discount)}</span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center bg-cream rounded-md px-4 py-3 text-base font-bold text-ink">
            <span>Total</span>
            <span>TK {formatPrice(total)}</span>
          </div>

          <div>
            {appliedCoupon ? (
              <div className="flex items-center justify-between gap-2 bg-brand/10 border border-brand/30 px-4 py-2.5 text-sm">
                <span className="font-semibold text-ink">
                  <Icon name="check" size={14} className="inline -mt-0.5 mr-1.5" /> {appliedCoupon.code} applied
                </span>
                <button type="button" onClick={handleRemoveCoupon} className="text-xs font-semibold text-gray-500 hover:text-ink underline">
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Enter coupon code"
                  className="input-field"
                />
                <button type="button" onClick={handleApplyCoupon} disabled={!coupon.trim()} className="btn-outline whitespace-nowrap disabled:opacity-50">
                  Apply
                </button>
              </div>
            )}
            {couponError && <p className="text-xs text-red-600 mt-1.5">{couponError}</p>}
          </div>

          <div className="space-y-3 pt-2">
            {trustList.map((t) => (
              <div key={t.title} className="flex items-start gap-3">
                <Icon name={t.icon} size={18} />
                <div className="text-xs leading-tight">
                  <p className="font-semibold text-ink">{t.title}</p>
                  <p className="text-gray-500 mt-0.5">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <motion.button whileTap={{ scale: 0.98 }} type="submit" disabled={submitting} className="btn-gold w-full disabled:opacity-50">
            {submitting ? "Placing Order..." : "Submit Order"}
          </motion.button>
          <p className="text-xs text-gray-500 text-center">
            By placing your order, you agree to our{" "}
            <Link href="/about" className="underline hover:text-brand-dark">
              Terms &amp; Conditions
            </Link>
            ,{" "}
            <Link href="/about" className="underline hover:text-brand-dark">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/about" className="underline hover:text-brand-dark">
              Return Policy
            </Link>
            .
          </p>
        </div>
      </form>
    </div>
  );
}
