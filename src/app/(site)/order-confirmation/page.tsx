import { Suspense } from "react";
import OrderConfirmationContent from "@/features/checkout/OrderConfirmationContent";

export const metadata = { title: "Order Confirmed | IBEX" };

export default function OrderConfirmationPage() {
  return (
    <Suspense>
      <OrderConfirmationContent />
    </Suspense>
  );
}
