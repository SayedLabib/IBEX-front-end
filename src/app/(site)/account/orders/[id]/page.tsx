import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getOrderById, orders } from "@/lib/data/orders";
import { formatPrice } from "@/lib/format";

export function generateStaticParams() {
  return orders.map((o) => ({ id: o.id }));
}

export default async function AccountOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = getOrderById(id);
  if (!order) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-lg font-bold text-ink">Order #{order.id}</h2>
        <Link href="/account/orders" className="text-sm font-semibold text-brand-dark hover:underline">
          ← Back to Orders
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-xs text-gray-500 uppercase">Status</p>
          <p className="font-semibold text-ink mt-1">{order.status}</p>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-xs text-gray-500 uppercase">Payment</p>
          <p className="font-semibold text-ink mt-1">
            {order.paymentMethod} · {order.paymentStatus}
          </p>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-xs text-gray-500 uppercase">Order Date</p>
          <p className="font-semibold text-ink mt-1">{new Date(order.date).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}</p>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {order.items.map((item) => (
          <div key={item.product.id} className="flex items-center gap-4 p-4 border-b border-gray-100 last:border-0">
            <div className="relative h-16 w-16 rounded-md overflow-hidden bg-gray-100 shrink-0">
              <Image src={item.product.image} alt={item.product.name} fill sizes="56px" className="object-cover" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-ink text-sm">{item.product.name}</p>
              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="font-semibold text-ink text-sm">TK {formatPrice(item.price * item.quantity)}</p>
          </div>
        ))}
        <div className="p-4 bg-gray-50 space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>TK {formatPrice(order.subtotal)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-green-700">
              <span>Discount</span>
              <span>-TK {formatPrice(order.discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>{order.shippingFee === 0 ? "Free" : `TK ${formatPrice(order.shippingFee)}`}</span>
          </div>
          <div className="flex justify-between font-bold text-ink pt-2 border-t border-gray-200">
            <span>Total</span>
            <span>TK {formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-4">
        <p className="text-xs text-gray-500 uppercase mb-2">Shipping Address</p>
        <p className="text-sm text-gray-700">
          {order.shippingAddress.recipient}
          <br />
          {order.shippingAddress.line1}
          <br />
          {order.shippingAddress.area}, {order.shippingAddress.district}, {order.shippingAddress.division}
          <br />
          Bangladesh · {order.shippingAddress.phone}
        </p>
      </div>
    </div>
  );
}
