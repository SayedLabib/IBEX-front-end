"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/animations/Reveal";
import ProductCard from "@/features/product/ProductCard";
import HeroSlider from "@/components/layout/HeroSlider";
import PromoBanner from "@/components/ui/PromoBanner";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import { products } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";
import { homeHeroSlides, homePromoBanners, lifestyleBanner } from "@/lib/data/content";

const TABS = ["New Arrivals", "Best Sellers", "Featured"] as const;
const ROW_SIZE = 5;

export default function HomePage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("New Arrivals");
  const [rowPage, setRowPage] = useState(0);

  const tabProducts = useMemo(() => {
    if (tab === "New Arrivals") return products.filter((p) => p.isNew);
    if (tab === "Best Sellers") return products.filter((p) => p.isBestSeller);
    return products.filter((p) => p.isFeatured);
  }, [tab]);

  const rowPages = Math.max(1, Math.ceil(tabProducts.length / ROW_SIZE));
  const visibleRow = tabProducts.slice(rowPage * ROW_SIZE, rowPage * ROW_SIZE + ROW_SIZE);

  return (
    <div>
      <div className="-mt-20">
        <HeroSlider slides={homeHeroSlides} />
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeading title="Shop By Category" className="mb-10" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {categories.map((c) => (
            <FadeIn key={c.id}>
              <Link href={`/category/${c.slug}`} className="block text-center group">
                <div className="relative aspect-4/5 overflow-hidden mb-3 bg-gray-100">
                  <Image src={c.image} alt={c.name} fill sizes="(max-width: 768px) 50vw, 20vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <p className="font-bold text-ink text-sm uppercase tracking-wide">{c.name}</p>
                <span className="text-xs font-semibold text-brand-dark uppercase">Shop Now</span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
          <div className="flex items-center gap-6">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTab(t);
                  setRowPage(0);
                }}
                className={`text-sm font-bold uppercase tracking-wide pb-2 border-b-2 transition-colors ${
                  tab === t ? "border-brand text-ink" : "border-transparent text-gray-400 hover:text-ink"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <Link href="/shop" className="text-sm font-semibold text-brand-dark hover:underline">
            View All Products
          </Link>
        </div>

        <div className="relative">
          {rowPages > 1 && (
            <button
              onClick={() => setRowPage((p) => (p - 1 + rowPages) % rowPages)}
              aria-label="Previous products"
              className="hidden lg:flex absolute -left-5 top-1/3 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white border border-gray-200 shadow items-center justify-center hover:border-ink transition-colors"
            >
              <Icon name="chevron-left" size={16} />
            </button>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {visibleRow.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {rowPages > 1 && (
            <button
              onClick={() => setRowPage((p) => (p + 1) % rowPages)}
              aria-label="Next products"
              className="hidden lg:flex absolute -right-5 top-1/3 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white border border-gray-200 shadow items-center justify-center hover:border-ink transition-colors"
            >
              <Icon name="chevron-right" size={16} />
            </button>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {homePromoBanners.map((promo) => (
            <FadeIn key={promo.id}>
              <PromoBanner promo={promo} className="h-72 md:h-80" />
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="relative bg-cream py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <FadeIn>
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-ink uppercase leading-tight">
                {lifestyleBanner.title}
                <br />
                <span className="text-brand-dark">{lifestyleBanner.titleAccent}</span>
              </h2>
              <p className="text-gray-600 mt-4 max-w-sm">{lifestyleBanner.subtitle}</p>
              <Link href={lifestyleBanner.cta.href} className="btn-gold mt-6 inline-flex">
                {lifestyleBanner.cta.label}
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="relative aspect-4/3 overflow-hidden">
              <Image src={lifestyleBanner.image} alt={lifestyleBanner.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </FadeIn>
        </div>
        {lifestyleBanner.sideLabel && (
          <p
            className="hidden xl:block absolute right-4 top-1/2 text-ink/30 text-xs font-semibold uppercase tracking-[0.3em] whitespace-nowrap"
            style={{ writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)" }}
          >
            {lifestyleBanner.sideLabel}
          </p>
        )}
      </section>
    </div>
  );
}
