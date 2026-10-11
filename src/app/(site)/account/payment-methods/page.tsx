"use client";

import { useState } from "react";

interface SavedCard {
  id: string;
  brand: string;
  last4: string;
  expiry: string;
  isDefault?: boolean;
}

export default function AccountPaymentMethodsPage() {
  const [cards, setCards] = useState<SavedCard[]>([{ id: "card-1", brand: "Visa", last4: "4242", expiry: "08/28", isDefault: true }]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ number: "", expiry: "", cvc: "" });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setCards((prev) => [...prev, { id: `card-${prev.length + 1}`, brand: "Card", last4: form.number.slice(-4) || "0000", expiry: form.expiry }]);
    setForm({ number: "", expiry: "", cvc: "" });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((card) => (
          <div key={card.id} className="border border-gray-200 rounded-lg p-5 flex items-center justify-between">
            <div>
              <p className="font-semibold text-ink">
                {card.brand} •••• {card.last4}
              </p>
              <p className="text-xs text-gray-500 mt-1">Expires {card.expiry}</p>
            </div>
            {card.isDefault && <span className="text-xs bg-brand/20 text-brand-dark px-2 py-0.5 rounded-full font-semibold h-fit">Default</span>}
          </div>
        ))}
      </div>

      {showForm ? (
        <form onSubmit={handleAdd} className="border border-gray-200 rounded-lg p-5 space-y-4">
          <h3 className="font-bold text-ink">Add New Card</h3>
          <input required placeholder="Card Number" className="input-field" value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <input required placeholder="MM / YY" className="input-field" value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} />
            <input required placeholder="CVC" className="input-field" value={form.cvc} onChange={(e) => setForm({ ...form, cvc: e.target.value })} />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="btn-gold">
              Save Card
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-outline">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button onClick={() => setShowForm(true)} className="btn-outline">
          + Add New Card
        </button>
      )}
    </div>
  );
}
