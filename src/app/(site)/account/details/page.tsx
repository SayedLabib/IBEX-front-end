"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export default function AccountDetailsPage() {
  const user = useAuthStore((s) => s.user);
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [saved, setSaved] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }}
      className="border border-gray-200 rounded-lg p-6 space-y-4 max-w-xl"
    >
      <h3 className="font-bold text-ink text-lg">Account Details</h3>
      {saved && <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2">Your details have been updated.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input className="input-field" placeholder="+880 1712-345678" />
      </div>
      <div className="border-t border-gray-100 pt-4">
        <p className="font-semibold text-ink text-sm mb-3">Change Password</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="password" placeholder="New Password" className="input-field" />
          <input type="password" placeholder="Confirm Password" className="input-field" />
        </div>
      </div>
      <button type="submit" className="btn-gold">
        Save Changes
      </button>
    </form>
  );
}
