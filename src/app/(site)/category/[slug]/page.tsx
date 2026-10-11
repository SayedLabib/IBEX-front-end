import { Suspense } from "react";
import { notFound } from "next/navigation";
import CategoryHero from "@/features/shop/CategoryHero";
import ShopContent from "@/features/shop/ShopContent";
import { categories } from "@/lib/data/categories";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  return (
    <div>
      <CategoryHero hero={category.hero} trail={[{ label: category.name }]} />
      <Suspense>
        <ShopContent initialCategorySlug={category.slug} />
      </Suspense>
    </div>
  );
}
