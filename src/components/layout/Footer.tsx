"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { categories } from "@/lib/data/categories";

const company = [
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/about" },
  { label: "Store Locator", href: "/our-store" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const customerCare = [
  { label: "Track My Order", href: "/track-order" },
  { label: "Shipping Policy", href: "/faq" },
  { label: "Return & Exchange", href: "/faq" },
  { label: "Size Guide", href: "/faq" },
  { label: "FAQs", href: "/faq" },
  { label: "I Have a Complaint", href: "/contact" },
];

const socials: { name: "facebook" | "instagram" | "tiktok" | "youtube"; href: string }[] = [
  { name: "facebook", href: "#" },
  { name: "instagram", href: "#" },
  { name: "tiktok", href: "#" },
  { name: "youtube", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="bg-ink text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-1">
          <Image src="/IBEX.png" alt="IBEX" width={220} height={123} className="h-14 w-auto object-contain mb-4" />
          <p className="text-sm leading-relaxed">
            IBEX Footwear &amp; Apparel brings you premium footwear, apparel and accessories designed for a bolder, more confident
            you. Quality, style and performance for every journey.
          </p>
          <div className="flex items-center gap-3 mt-5">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                aria-label={s.name}
                className="h-9 w-9 rounded-full border border-gray-700 flex items-center justify-center hover:border-brand hover:text-brand transition-colors"
              >
                <Icon name={s.name} size={16} color="ffffff" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white uppercase tracking-wide text-sm mb-4">Shop</h4>
          <ul className="space-y-2.5 text-sm">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/category/${c.slug}`} className="hover:text-brand transition-colors">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/sale" className="hover:text-brand transition-colors">
                Sale
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white uppercase tracking-wide text-sm mb-4">Company</h4>
          <ul className="space-y-2.5 text-sm">
            {company.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="hover:text-brand transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white uppercase tracking-wide text-sm mb-4">Customer Care</h4>
          <ul className="space-y-2.5 text-sm">
            {customerCare.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="hover:text-brand transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white uppercase tracking-wide text-sm mb-4">Newsletter</h4>
          <p className="text-sm mb-3">Get the latest updates, new arrivals and exclusive offers.</p>
          {subscribed ? (
            <p className="text-sm text-brand">Thanks for subscribing!</p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubscribed(true);
              }}
              className="flex items-center border border-gray-700 rounded-md overflow-hidden"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 min-w-0 bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none"
              />
              <button type="submit" aria-label="Subscribe" className="shrink-0 bg-brand text-ink px-3.5 py-2.5 hover:bg-brand-dark transition-colors">
                <Icon name="chevron-right" size={16} color="0a0a0a" />
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <p>© 2026 IBEX Footwear &amp; Apparel. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-brand transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/about" className="hover:text-brand transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-brand transition-colors">
              Return Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
