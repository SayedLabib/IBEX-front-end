import Image from "next/image";
import Link from "next/link";
import { PromoBanner as PromoBannerData } from "@/types";

export default function PromoBanner({ promo, className = "h-64 md:h-80" }: { promo: PromoBannerData; className?: string }) {
  return (
    <Link href={promo.cta.href} className={`relative block ${className} overflow-hidden group`}>
      <Image src={promo.image} alt={promo.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12">
        {promo.eyebrow && <p className="section-eyebrow text-brand mb-2">{promo.eyebrow}</p>}
        <h3 className="text-white text-2xl md:text-3xl font-extrabold uppercase leading-tight max-w-sm">{promo.title}</h3>
        <p className="text-white/80 text-sm mt-2 max-w-xs">{promo.subtitle}</p>
        <span className="btn-gold mt-5 w-fit">{promo.cta.label}</span>
      </div>
    </Link>
  );
}
