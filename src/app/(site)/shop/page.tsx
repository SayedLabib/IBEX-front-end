import { Suspense } from "react";
import CategoryHero from "@/features/shop/CategoryHero";
import ShopContent from "@/features/shop/ShopContent";
import { shopHero } from "@/lib/data/categories";

export const metadata = { title: "Shop | IBEX" };

export default function ShopPage() {
  return (
    <div>
      <CategoryHero hero={shopHero} trail={[{ label: "Shop" }]} />
      <Suspense>
        <ShopContent />
      </Suspense>
    </div>
  );
}
