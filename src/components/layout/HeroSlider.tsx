"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "@/components/ui/Icon";
import { HeroBanner } from "@/types";

export default function HeroSlider({ slides }: { slides: HeroBanner[] }) {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[index];

  return (
    <section className="relative overflow-hidden h-130 md:h-150 bg-ink">
      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="absolute inset-0">
          <Image src={slide.image} alt={slide.title} fill sizes="100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/35 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.4 }}
            className="max-w-lg"
          >
            <p className="section-eyebrow text-brand mb-3">{slide.eyebrow}</p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight uppercase">
              <span className="text-white">{slide.title}</span>
              {slide.titleAccent && (
                <>
                  <br />
                  <span className="text-brand">{slide.titleAccent}</span>
                </>
              )}
            </h1>
            <p className="mt-4 text-gray-200">{slide.subtitle}</p>
            <Link href={slide.cta.href} className="btn-gold mt-8 inline-flex">
              {slide.cta.label}
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {slide.sideLabel && (
        <p
          className="hidden lg:block absolute right-10 top-1/2 text-white/60 text-xs font-semibold uppercase tracking-[0.3em] whitespace-nowrap"
          style={{ writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)" }}
        >
          {slide.sideLabel}
        </p>
      )}

      <div className="absolute bottom-8 left-4 sm:left-6 lg:left-8 flex items-center gap-4">
        <button onClick={prev} aria-label="Previous slide" className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
          <Icon name="chevron-left" size={16} color="ffffff" />
        </button>
        <button onClick={next} aria-label="Next slide" className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
          <Icon name="chevron-right" size={16} color="ffffff" />
        </button>
        <div className="flex items-center gap-2 ml-2">
          {slides.map((s, i) => (
            <button
              key={s.title}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`text-xs font-bold transition-colors ${i === index ? "text-brand" : "text-white/50"}`}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
