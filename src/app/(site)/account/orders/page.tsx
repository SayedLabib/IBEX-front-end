import Link from "next/link";
import { orders } from "@/lib/data/orders";
import { formatPrice } from "@/lib/format";

const statusColor: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PROCESSING: "bg-blue-100 text-blue-700",
  SHIPPED: "bg-indigo-100 text-indigo-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
  REFUNDED: "bg-gray-100 text-gray-700",
};

export default function AccountOrdersPage() {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-140">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500">
              <th className="p-4">Order</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Total</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-100 last:border-0">
                <td className="p-4 font-mono text-sm text-ink">#{order.id}</td>
                <td className="p-4 text-sm text-gray-600">{new Date(order.date).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}</td>
                <td className="p-4">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColor[order.status]}`}>{order.status}</span>
                </td>
                <td className="p-4 font-semibold text-ink text-sm">TK {formatPrice(order.total)}</td>
                <td className="p-4">
                  <Link href={`/account/orders/${order.id}`} className="text-brand-dark hover:underline text-sm font-semibold">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
