"use client";

import { useState } from "react";
import PageHero from "@/components/layout/PageHero";
import Icon from "@/components/ui/Icon";
import { faqHero } from "@/lib/data/content";

const faqs = [
  { q: "How long does shipping take?", a: "Inside Dhaka orders arrive within 1-2 business days; outside Dhaka within 2-4 business days." },
  { q: "What is your return policy?", a: "We accept returns within 7 days of delivery for a full refund, as long as items are unused and in their original packaging." },
  { q: "Do you offer free shipping?", a: "Yes, orders over TK 1000 ship for free within Bangladesh. Smaller orders have a flat TK 80 (Inside Dhaka) or TK 120 (Outside Dhaka) shipping fee." },
  { q: "How can I track my order?", a: "Use the Track Order page with your order ID, or check the Orders section of your account dashboard for live status updates." },
  { q: "Can I change or cancel my order after placing it?", a: "Orders can be changed or cancelled within 1 hour of placement. Contact our support team as soon as possible." },
  { q: "What payment methods do you accept?", a: "We accept Cash on Delivery (COD), credit/debit cards, and mobile payments via bKash, Nagad and Rocket." },
];

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      <PageHero banner={faqHero} />
      <div className="max-w-3xl mx-auto px-4 py-16">
        {faqs.map((faq, i) => (
          <div key={faq.q} className="border-b border-gray-200">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 py-5 text-left font-semibold text-ink"
            >
              {faq.q}
              <Icon name={open === i ? "minus" : "plus"} size={16} color="9c7a1a" className="shrink-0" />
            </button>
            {open === i && <p className="text-sm text-gray-600 pb-5 leading-relaxed">{faq.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
