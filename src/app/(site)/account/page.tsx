"use client";

import { useAuthStore } from "@/store/useAuthStore";

export default function AccountDashboard() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  if (!user) return null;

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <p className="text-gray-600">
        Hello <span className="font-semibold text-ink">{user.name}</span> (not {user.name}?{" "}
        <button onClick={logout} className="text-brand-dark hover:underline">
          Logout
        </button>
        )
      </p>
      <p className="text-gray-600 mt-4">
        From your account dashboard you can view your recent orders, manage your shipping addresses and payment methods, and edit your account details.
      </p>
    </div>
  );
}
