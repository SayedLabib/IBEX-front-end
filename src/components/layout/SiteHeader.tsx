"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import AnnouncementBar from "./AnnouncementBar";
import Icon from "@/components/ui/Icon";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useAuthStore } from "@/store/useAuthStore";
import { categories } from "@/lib/data/categories";
import CartDrawer from "@/features/cart/CartDrawer";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop", hasDropdown: true },
  { href: "/shop?department=men", label: "Men" },
  { href: "/shop?department=women", label: "Women" },
  { href: "/category/accessories", label: "Accessories" },
  { href: "/sale", label: "Sale" },
];

export default function SiteHeader() {
  const [query, setQuery] = useState("");
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const overlay = isHome && !scrolled;

  const totalItems = useCartStore((s) => s.totalItems());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const user = useAuthStore((s) => s.user);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(query ? `/shop?q=${encodeURIComponent(query)}` : "/shop");
  };

  return (
    <>
      <AnnouncementBar />
      <div
        className={`sticky top-0 z-40 transition-colors duration-300 ${
          overlay ? "bg-linear-to-b from-black/70 via-black/35 to-transparent" : "bg-ink shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center gap-6">
          <Link href="/" className="shrink-0">
            <Image src="/IBEX.png" alt="IBEX" width={240} height={135} className="h-16 w-auto object-contain" priority />
          </Link>

          <nav className="hidden lg:flex flex-1 justify-center">
            <ul className="flex items-center gap-8 text-sm font-semibold text-white uppercase tracking-wide">
              {navLinks.map((l) =>
                l.hasDropdown ? (
                  <li key={l.href} className="relative" onMouseEnter={() => setShopOpen(true)} onMouseLeave={() => setShopOpen(false)}>
                    <Link href={l.href} className="flex items-center gap-1.5 text-brand border-b-2 border-brand pb-1 transition-colors">
                      {l.label}
                      <Icon name="chevron-down" size={12} color="c9a227" />
                    </Link>
                    <AnimatePresence>
                      {shopOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 top-full w-56 bg-white border border-gray-100 rounded-md shadow-lg py-2 z-50 normal-case"
                        >
                          {categories.map((c) => (
                            <Link
                              key={c.id}
                              href={`/category/${c.slug}`}
                              className="block px-4 py-2 text-sm font-normal text-gray-700 hover:bg-gray-50 hover:text-brand-dark transition-colors"
                            >
                              {c.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                ) : (
                  <li key={l.href}>
                    <Link href={l.href} className="pb-1 border-b-2 border-transparent hover:text-brand hover:border-brand transition-colors">
                      {l.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-4">
            <form onSubmit={handleSearch} className="hidden md:flex items-center bg-white border border-gray-300 rounded-full overflow-hidden pl-4 w-64">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products..."
                className="flex-1 py-2 text-sm outline-none min-w-0"
              />
              <button type="submit" aria-label="Search" className="shrink-0 h-full px-3 flex items-center justify-center text-ink">
                <Icon name="search" size={16} />
              </button>
            </form>

            <button onClick={() => setMobileOpen(true)} className="md:hidden text-white" aria-label="Search">
              <Icon name="search" size={20} />
            </button>

            <Link href={user ? "/account" : "/login"} className="hidden sm:block text-white hover:text-brand transition-colors" aria-label="Account">
              <Icon name="user" size={20} />
            </Link>

            <Link href="/wishlist" className="relative hidden sm:block text-white hover:text-brand transition-colors" aria-label="Wishlist">
              <Icon name="heart" size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand text-ink text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button onClick={() => setCartOpen(true)} className="relative text-white hover:text-brand transition-colors" aria-label="Cart">
              <Icon name="bag" size={20} />
              <span className="absolute -top-2 -right-2 bg-brand text-ink text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {totalItems}
              </span>
            </button>

            <button onClick={() => setMobileOpen(true)} className="lg:hidden text-white" aria-label="Open menu">
              <Icon name="menu" size={22} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="fixed inset-0 z-50 lg:hidden" initial="closed" animate="open" exit="closed">
            <motion.div
              variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-black/50"
            />
            <motion.div
              variants={{ open: { x: 0 }, closed: { x: "-100%" } }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl p-6 flex flex-col gap-1"
            >
              <div className="flex justify-between items-center mb-4">
                <Image src="/IBEX.png" alt="IBEX" width={180} height={101} className="h-12 w-auto object-contain" />
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <Icon name="close" size={20} />
                </button>
              </div>
              <form onSubmit={handleSearch} className="flex items-center border border-gray-300 rounded-full overflow-hidden pl-4 mb-4">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="flex-1 py-2 text-sm outline-none min-w-0"
                />
                <button type="submit" aria-label="Search" className="shrink-0 h-full px-3 flex items-center justify-center text-ink">
                  <Icon name="search" size={16} />
                </button>
              </form>
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="py-2.5 border-b border-gray-100 font-medium text-ink uppercase text-sm tracking-wide">
                  {l.label}
                </Link>
              ))}
              <Link href={user ? "/account" : "/login"} onClick={() => setMobileOpen(false)} className="py-2.5 border-b border-gray-100 font-medium text-ink uppercase text-sm tracking-wide">
                Account
              </Link>
              <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="py-2.5 font-medium text-ink uppercase text-sm tracking-wide">
                Wishlist
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{cartOpen && <CartDrawer onClose={() => setCartOpen(false)} />}</AnimatePresence>
    </>
  );
}
