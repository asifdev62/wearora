import Link from "next/link";
import ProductCard from "../ProductCard";
import { products } from "@/lib/products";

interface NewArrivalsProps {
  showHeader?: boolean;
}

export default function NewArrivals({ showHeader = true }: NewArrivalsProps) {
  const newProducts = products.filter((product) => product.isNew);

  return (
    <section className="bg-[#FDFBF7] px-4 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {showHeader && (
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A88B72]">
                Just in
              </p>
              <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[#352B24] sm:text-4xl">
                New Arrivals
              </h2>
              <p className="mt-2 text-sm text-[#655549]">
                Discover your favourite fashion at great prices.
              </p>
            </div>

            <Link
              href="/new-arrive"
              className="text-sm font-medium text-[#655549] transition-colors hover:text-[#A88B72]"
            >
              View all new arrivals
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
