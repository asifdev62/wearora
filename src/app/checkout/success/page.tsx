import type { Metadata } from "next";
import OrderConfirmation from "../../components/OrderConfirmation";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your Wearora order confirmation.",
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] px-4 py-10 sm:px-6 lg:px-10">
      <OrderConfirmation />
    </main>
  );
}
