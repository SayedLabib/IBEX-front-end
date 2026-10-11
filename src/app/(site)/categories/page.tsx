import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/Reveal";
import { categories, brands } from "@/lib/data/categories";
import { categoriesHero } from "@/lib/data/content";

export const metadata = { title: "Shop Categories | IBEX" };

export default function CategoriesPage() {
  return (
    <div>
      <PageHero banner={categoriesHero} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((c) => (
            <FadeIn key={c.id}>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <Link href={`/category/${c.slug}`} className="relative block h-40 bg-gray-100">
                  <Image src={c.image} alt={c.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover" />
                </Link>
                <div className="p-4">
                  <Link href={`/category/${c.slug}`}>
                    <h3 className="font-bold text-ink uppercase text-sm mb-3 hover:text-brand-dark transition-colors">{c.name}</h3>
                  </Link>
                  <ul className="space-y-2">
                    {c.subcategories.map((s) => (
                      <li key={s.name} className="flex items-center justify-between text-sm text-gray-600">
                        <span>{s.name}</span>
                        <span className="h-5 w-6 flex items-center justify-center bg-ink text-white text-[10px] rounded-full">{s.count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <SectionHeading title="Popular Brands" className="mt-20 mb-10" />
        </FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {brands.map((b) => (
            <div key={b} className="border border-gray-200 rounded-lg h-20 flex items-center justify-center font-bold text-gray-500 text-lg">
              {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
