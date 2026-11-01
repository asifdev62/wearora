import Link from "next/link";
import ProductCard from "../ProductCard";
import { getFeaturedProducts } from "@/lib/products";

export default function FeaturedProducts() {
  const featured = getFeaturedProducts(4);

  return (
    <section className="bg-[#FDFBF7] px-4 pb-20 pt-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A88B72]">
              Top rated
            </p>
            <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[#352B24] sm:text-4xl">
              Loved by shoppers
            </h2>
            <p className="mt-2 text-sm text-[#655549]">
              Our highest-rated pieces across the collection.
            </p>
          </div>

          <Link
            href="/components/products"
            className="text-sm font-medium text-[#655549] transition-colors hover:text-[#A88B72]"
          >
            Browse everything
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
