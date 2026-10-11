"use client";

import { useState } from "react";
import PageHero from "@/components/layout/PageHero";
import { getOrderById } from "@/lib/data/orders";
import { Order, OrderStatus } from "@/types";
import { trackOrderHero } from "@/lib/data/content";

const steps: OrderStatus[] = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"];

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [result, setResult] = useState<Order | null | undefined>(undefined);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(getOrderById(orderId.trim().toUpperCase()) ?? null);
  };

  const activeStep = result ? steps.indexOf(result.status) : -1;

  return (
    <div>
      <PageHero banner={trackOrderHero} />
      <div className="max-w-2xl mx-auto px-4 py-16">
        <form onSubmit={handleTrack} className="border border-gray-200 rounded-lg p-6 space-y-4">
          <p className="text-sm text-gray-600">
            Enter your order ID below to check its current status. Try <span className="font-mono font-semibold text-ink">ORD-10233</span> for a demo.
          </p>
          <input required value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="e.g. ORD-10233" className="input-field" />
          <button type="submit" className="btn-gold w-full">
            Track Order
          </button>
        </form>

        {result === null && (
          <p className="mt-6 text-center text-red-600 text-sm">No order found with that ID. Please check and try again.</p>
        )}

        {result && (
          <div className="mt-8 border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <p className="font-bold text-ink">Order #{result.id}</p>
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-brand/20 text-brand-dark">{result.status}</span>
            </div>
            {["CANCELLED", "REFUNDED"].includes(result.status) ? (
              <p className="text-sm text-gray-600">This order was {result.status.toLowerCase()}.</p>
            ) : (
              <div className="flex items-center justify-between">
                {steps.map((step, i) => (
                  <div key={step} className="flex-1 flex flex-col items-center relative">
                    {i > 0 && (
                      <div className={`absolute top-3 right-1/2 w-full h-0.5 ${i <= activeStep ? "bg-brand" : "bg-gray-200"}`} />
                    )}
                    <div
                      className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold z-10 ${
                        i <= activeStep ? "bg-brand text-ink" : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <p className="text-xs text-gray-600 mt-2 text-center">{step}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
