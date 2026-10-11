"use client";

import { useState } from "react";
import { Address } from "@/types";
import { divisions } from "@/lib/data/address";

const initialAddresses: Address[] = [
  {
    id: "addr-1",
    label: "Home",
    recipient: "Madison Ruiz",
    line1: "House 12, Road 5, Banani",
    division: "Dhaka",
    district: "Dhaka",
    area: "Banani",
    phone: "+880 1712-345678",
    isDefault: true,
  },
];

const emptyForm = { label: "", recipient: "", line1: "", division: "", district: "", area: "", phone: "" };

export default function AccountAddressesPage() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const districts = divisions.find((d) => d.name === form.division)?.districts ?? [];
  const areas = districts.find((d) => d.name === form.district)?.areas ?? [];

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setAddresses((prev) => [...prev, { id: `addr-${prev.length + 1}`, ...form }]);
    setForm(emptyForm);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div key={addr.id} className="border border-gray-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-ink">{addr.label}</p>
              {addr.isDefault && <span className="text-xs bg-brand/20 text-brand-dark px-2 py-0.5 rounded-full font-semibold">Default</span>}
            </div>
            <p className="text-sm text-gray-600">
              {addr.recipient}
              <br />
              {addr.line1}
              <br />
              {addr.area}, {addr.district}, {addr.division}
              <br />
              Bangladesh · {addr.phone}
            </p>
          </div>
        ))}
      </div>

      {showForm ? (
        <form onSubmit={handleAdd} className="border border-gray-200 rounded-lg p-5 space-y-4">
          <h3 className="font-bold text-ink">Add New Address</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input required placeholder="Label (e.g. Home, Office)" className="input-field" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} />
            <input required placeholder="Recipient Name" className="input-field" value={form.recipient} onChange={(e) => setForm({ ...form, recipient: e.target.value })} />
            <select
              required
              className="input-field"
              value={form.division}
              onChange={(e) => setForm({ ...form, division: e.target.value, district: "", area: "" })}
            >
              <option value="">Select Division</option>
              {divisions.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
            <select
              required
              disabled={!form.division}
              className="input-field disabled:bg-gray-100"
              value={form.district}
              onChange={(e) => setForm({ ...form, district: e.target.value, area: "" })}
            >
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
            <select
              required
              disabled={!form.district}
              className="input-field disabled:bg-gray-100"
              value={form.area}
              onChange={(e) => setForm({ ...form, area: e.target.value })}
            >
              <option value="">Select Area / Thana</option>
              {areas.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
            <input required placeholder="Phone Number" className="input-field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <input required placeholder="House no, Road no, Area, Landmark" className="input-field" value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })} />
          <div className="flex gap-3">
            <button type="submit" className="btn-gold">
              Save Address
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-outline">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button onClick={() => setShowForm(true)} className="btn-outline">
          + Add New Address
        </button>
      )}
    </div>
  );
}
