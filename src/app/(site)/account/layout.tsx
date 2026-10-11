"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import AccountSidebar from "@/features/account/AccountSidebar";
import { useAuthStore } from "@/store/useAuthStore";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/login?callbackUrl=/account");
  }, [user, router]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center text-gray-500">
        Redirecting to{" "}
        <Link href="/login" className="text-brand-dark underline">
          sign in
        </Link>
        ...
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb title="My Account" trail={[{ label: "Account", href: "/account" }, { label: "My Account" }]} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <AccountSidebar />
        <div>{children}</div>
      </div>
    </div>
  );
}
