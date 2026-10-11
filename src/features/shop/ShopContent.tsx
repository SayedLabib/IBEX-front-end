"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/features/product/ProductCard";
import PromoBanner from "@/components/ui/PromoBanner";
import { products } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";
import { homePromoBanners } from "@/lib/data/content";

const PAGE_SIZE = 8;
type SortKey = "featured" | "price-asc" | "price-desc" | "newest";

const PRICE_MIN = Math.min(...products.map((p) => p.price));
const PRICE_MAX = Math.max(...products.map((p) => p.price));

export default function ShopContent({ initialCategorySlug, saleOnly = false }: { initialCategorySlug?: string; saleOnly?: boolean } = {}) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() ?? "";
  const categoryParam = searchParams.get("category");
  const department = searchParams.get("department");

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : initialCategorySlug ? [initialCategorySlug] : []
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [sort, setSort] = useState<SortKey>("featured");
  const [page, setPage] = useState(1);

  const toggle = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setPage(1);
    setter((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

  const scopedProducts = useMemo(() => {
    let list = products;
    if (department) list = list.filter((p) => p.department === department || p.department === "unisex");
    if (saleOnly) list = list.filter((p) => p.comparePrice && p.comparePrice > p.price);
    return list;
  }, [department, saleOnly]);

  const availableSizes = useMemo(() => {
    const set = new Set<string>();
    scopedProducts.forEach((p) => p.sizes?.forEach((s) => set.add(s)));
    return Array.from(set).sort((a, b) => (isNaN(Number(a)) ? a.localeCompare(b) : Number(a) - Number(b)));
  }, [scopedProducts]);

  const availableColors = useMemo(() => {
    const map = new Map<string, string>();
    scopedProducts.forEach((p) => p.colors?.forEach((c) => map.set(c.name, c.hex)));
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, [scopedProducts]);

  const filtered = useMemo(() => {
    let list = scopedProducts.filter((p) => p.price <= maxPrice);
    if (query) {
      list = list.filter((p) => p.name.toLowerCase().includes(query) || p.tags.some((t) => t.includes(query)));
    }
    if (selectedCategories.length) {
      list = list.filter((p) => selectedCategories.some((slug) => categories.find((c) => c.slug === slug)?.id === p.categoryId));
    }
    if (selectedSizes.length) {
      list = list.filter((p) => p.sizes?.some((s) => selectedSizes.includes(s)));
    }
    if (selectedColors.length) {
      list = list.filter((p) => p.colors?.some((c) => selectedColors.includes(c.name)));
    }
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list = [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      default:
        list = [...list].sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    }
    return list;
  }, [scopedProducts, query, selectedCategories, selectedSizes, selectedColors, maxPrice, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const hasActiveFilters = selectedCategories.length > 0 || selectedSizes.length > 0 || selectedColors.length > 0 || maxPrice < PRICE_MAX;

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setMaxPrice(PRICE_MAX);
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
      <aside className="space-y-8 h-fit">
        <div>
          <h3 className="font-bold text-ink mb-3 text-sm uppercase tracking-wide">Categories</h3>
          <ul className="space-y-2.5">
            {categories.map((c) => {
              const count = scopedProducts.filter((p) => p.categoryId === c.id).length;
              const active = selectedCategories.includes(c.slug);
              return (
                <li key={c.id}>
                  <label className={`flex items-center justify-between gap-2 text-sm cursor-pointer ${active ? "text-ink font-semibold" : "text-gray-600"}`}>
                    <span className="flex items-center gap-2">
                      {active && <span className="w-1 h-4 bg-brand rounded-full" />}
                      <input
                        type="checkbox"
                        checked={active}
                        onChange={() => toggle(setSelectedCategories, c.slug)}
                        className="rounded border-gray-300 text-brand focus:ring-brand"
                      />
                      {c.name}
                    </span>
                    <span className="text-gray-400">({count})</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>

        {availableSizes.length > 0 && (
          <div>
            <h3 className="font-bold text-ink mb-3 text-sm uppercase tracking-wide">Size</h3>
            <div className="grid grid-cols-4 gap-2">
              {availableSizes.map((s) => (
                <button
                  key={s}
                  onClick={() => toggle(setSelectedSizes, s)}
                  className={`h-10 rounded-md border text-sm font-medium transition-colors ${
                    selectedSizes.includes(s) ? "border-brand bg-brand/10 text-ink" : "border-gray-300 text-gray-600 hover:border-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {availableColors.length > 0 && (
          <div>
            <h3 className="font-bold text-ink mb-3 text-sm uppercase tracking-wide">Color</h3>
            <div className="flex flex-wrap gap-2.5">
              {availableColors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => toggle(setSelectedColors, c.name)}
                  title={c.name}
                  style={{ backgroundColor: c.hex }}
                  className={`h-7 w-7 rounded-full border-2 ring-1 ring-gray-200 transition-colors ${
                    selectedColors.includes(c.name) ? "border-brand" : "border-white"
                  }`}
                  aria-label={c.name}
                />
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="font-bold text-ink mb-3 text-sm uppercase tracking-wide">Price Range</h3>
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>TK {PRICE_MIN}</span>
            <span>TK {maxPrice}</span>
          </div>
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={50}
            value={maxPrice}
            onChange={(e) => {
              setPage(1);
              setMaxPrice(Number(e.target.value));
            }}
            className="w-full accent-brand"
          />
        </div>

        <button onClick={() => setPage(1)} className="btn-primary w-full">
          Apply Filters
        </button>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="text-xs font-semibold text-brand-dark underline block">
            Clear all filters
          </button>
        )}
      </aside>

      <div>
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <p className="text-sm text-gray-500">
            Showing {pageItems.length} of {filtered.length} products{query && ` for "${query}"`}
          </p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
          >
            <option value="featured">Sort by: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        {pageItems.length === 0 ? (
          <p className="text-gray-500 py-20 text-center">No products match your filters.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {pageItems.flatMap((p, i) => {
              const els = [<ProductCard key={p.id} product={p} />];
              if (i === 3 && pageItems.length > 4) {
                els.push(
                  <div key="promo" className="col-span-2 md:col-span-4">
                    <PromoBanner promo={homePromoBanners[0]} />
                  </div>
                );
              }
              return els;
            })}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`h-9 w-9 rounded-md text-sm font-semibold transition-colors ${
                  page === i + 1 ? "bg-ink text-white" : "border border-gray-300 text-gray-600 hover:border-ink"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
