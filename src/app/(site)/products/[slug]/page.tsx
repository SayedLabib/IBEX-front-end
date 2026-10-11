import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProductDetail from "@/features/product/ProductDetail";
import ProductCard from "@/features/product/ProductCard";
import { FadeIn } from "@/components/animations/Reveal";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const category = categories.find((c) => c.id === product.categoryId);

  return (
    <div>
      <Breadcrumb
        title={product.name}
        trail={[
          ...(category ? [{ label: category.name, href: `/category/${category.slug}` }] : []),
          { label: product.categoryName },
          { label: product.name },
        ]}
      />
      <ProductDetail product={product} />
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <FadeIn>
            <h2 className="section-title mb-8">You May Also Like</h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
