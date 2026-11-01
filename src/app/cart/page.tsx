import type { Metadata } from "next";
import CartView from "../components/CartView";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "Review the items in your Wearora shopping cart.",
};

export default function CartPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A88B72]">
            Wearora
          </p>
          <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[#352B24] sm:text-4xl">
            Shopping Cart
          </h1>
        </div>

        <CartView />
      </div>
    </main>
  );
}
