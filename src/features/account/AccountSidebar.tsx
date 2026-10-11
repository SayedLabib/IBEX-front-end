"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Icon, { IconName } from "@/components/ui/Icon";
import { useAuthStore } from "@/store/useAuthStore";

const links: { href: string; label: string; icon: IconName }[] = [
  { href: "/account", label: "Dashboard", icon: "grid" },
  { href: "/account/orders", label: "Orders", icon: "bag" },
  { href: "/account/downloads", label: "Downloads", icon: "download" },
  { href: "/account/addresses", label: "Addresses", icon: "home" },
  { href: "/account/payment-methods", label: "Payment Methods", icon: "credit-card" },
  { href: "/account/details", label: "Account Details", icon: "user" },
];

export default function AccountSidebar() {
  const pathname = usePathname();
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  return (
    <aside className="border border-gray-200 rounded-lg overflow-hidden h-fit">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link key={link.href} href={link.href}>
            <motion.div
              whileHover={{ x: 4 }}
              className={`flex items-center justify-between gap-3 px-5 py-4 border-b border-gray-100 last:border-0 transition-colors ${
                active ? "bg-ink text-white" : "hover:bg-gray-50 text-ink"
              }`}
            >
              <span className="font-medium text-sm">{link.label}</span>
              <Icon name={link.icon} size={18} color={active ? "ffffff" : "15161b"} />
            </motion.div>
          </Link>
        );
      })}
      <button
        onClick={() => {
          logout();
          router.push("/");
        }}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-ink hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-sm">Logout</span>
        <Icon name="logout" size={18} />
      </button>
    </aside>
  );
}
