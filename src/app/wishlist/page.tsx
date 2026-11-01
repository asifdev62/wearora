import type { Metadata } from "next";
import WishlistView from "../components/WishlistView";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Products you have saved for later at Wearora.",
};

export default function WishlistPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A88B72]">
            Wearora
          </p>
          <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[#352B24] sm:text-4xl">
            My Wishlist
          </h1>
        </div>

        <WishlistView />
      </div>
    </main>
  );
}
