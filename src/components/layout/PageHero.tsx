import Image from "next/image";
import { PageBanner } from "@/types";

export default function PageHero({ banner }: { banner: PageBanner }) {
  return (
    <section className="relative h-[280px] md:h-[320px] w-full overflow-hidden">
      <Image src={banner.image} alt={banner.title} fill sizes="100vw" className="object-cover" priority />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <p className="section-eyebrow text-brand mb-2">{banner.eyebrow}</p>
        <h1 className="text-4xl md:text-5xl font-extrabold uppercase text-white leading-tight">{banner.title}</h1>
        <p className="text-gray-200 mt-3 max-w-sm text-sm">{banner.subtitle}</p>
      </div>
      {banner.sideLabel && (
        <p
          className="hidden lg:block absolute right-10 top-1/2 text-white/70 text-xs font-semibold uppercase tracking-[0.3em] whitespace-nowrap"
          style={{ writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)" }}
        >
          {banner.sideLabel}
        </p>
      )}
    </section>
  );
}
