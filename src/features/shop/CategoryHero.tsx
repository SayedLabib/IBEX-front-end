import Image from "next/image";
import Link from "next/link";
import { HeroBanner } from "@/types";

export default function CategoryHero({ hero, trail }: { hero: HeroBanner; trail: { label: string; href?: string }[] }) {
  return (
    <section className="relative h-[340px] md:h-[420px] w-full overflow-hidden">
      <Image src={hero.image} alt={hero.title} fill sizes="100vw" className="object-cover" priority />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <nav className="text-xs text-gray-300 uppercase tracking-wide mb-4 flex flex-wrap items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          {trail.map((t, i) => (
            <span key={i} className="flex items-center gap-2">
              <span>/</span>
              {t.href ? (
                <Link href={t.href} className="hover:text-white transition-colors">
                  {t.label}
                </Link>
              ) : (
                <span className="text-white">{t.label}</span>
              )}
            </span>
          ))}
        </nav>
        <p className="section-eyebrow text-brand mb-2">{hero.eyebrow}</p>
        <h1 className="text-4xl md:text-5xl font-extrabold uppercase leading-tight">
          <span className="text-white">{hero.title}</span>
          {hero.titleAccent && (
            <>
              <br />
              <span className="text-brand">{hero.titleAccent}</span>
            </>
          )}
        </h1>
        <p className="text-gray-200 mt-3 max-w-md text-sm">{hero.subtitle}</p>
      </div>
    </section>
  );
}
