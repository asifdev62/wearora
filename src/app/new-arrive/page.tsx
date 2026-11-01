import type { Metadata } from "next";
import NewArrivals from "../components/home/NewArrivals";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "New Arrivals",
  description: "The latest pieces from the Wearora collection.",
};

export default function NewArrivePage() {
  const count = products.filter((product) => product.isNew).length;

  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A88B72]">
          Wearora Collection
        </p>
        <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[#352B24] sm:text-4xl">
          New Arrivals
        </h1>
        <p className="mt-2 text-[#655549]">
          Discover your favourite fashion at great prices.
        </p>
        <p className="mt-3 text-sm text-[#655549]">
          {count} products available
        </p>
      </div>

      <NewArrivals showHeader={false} />
    </main>
  );
}
