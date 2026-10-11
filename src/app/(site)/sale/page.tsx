import { Suspense } from "react";
import CategoryHero from "@/features/shop/CategoryHero";
import ShopContent from "@/features/shop/ShopContent";
import { saleHero } from "@/lib/data/categories";

export const metadata = { title: "Sale | IBEX" };

export default function SalePage() {
  return (
    <div>
      <CategoryHero hero={saleHero} trail={[{ label: "Sale" }]} />
      <Suspense>
        <ShopContent saleOnly />
      </Suspense>
    </div>
  );
}
