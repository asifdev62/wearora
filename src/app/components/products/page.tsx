export const instant = false;

import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "../ProductCard";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop All",
  description:
    "Browse every piece in the Wearora collection for men, women, boys and girls.",
};

type Props = {
  searchParams: Promise<{
    audience?: string;
  }>;
};

const audiences = ["All", "Men", "Women", "Boys", "Girls"];

const ProductsPage = async ({ searchParams }: Props) => {
  const { audience } = await searchParams;

  const visibleProducts = !audience
    ? products
    : products.filter(
        (product) =>
          product.audience?.toLowerCase() === audience.toLowerCase(),
      );

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-2xl font-bold uppercase tracking-widest text-green-700">
            Wearora Collection
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            {audience ? `${audience} Collection` : "All Products"}
          </h1>

          <p className="mt-2 text-gray-500">
            Discover your favourite fashion at great prices.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {audiences.map((option) => {
              const isActive =
                option === "All"
                  ? !audience
                  : audience?.toLowerCase() === option.toLowerCase();

              return (
                <Link
                  key={option}
                  href={
                    option === "All"
                      ? "/components/products"
                      : `/components/products?audience=${option}`
                  }
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-[#65554B] bg-[#65554B] text-white"
                      : "border-[#EAE3DA] bg-white text-[#655549] hover:border-[#A88B72]"
                  }`}
                >
                  {option}
                </Link>
              );
            })}
          </div>

          <p className="mt-4 text-sm text-gray-600">
            {visibleProducts.length} products available
          </p>
        </div>

        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-gray-500">
            No products found in this collection.
          </p>
        )}
      </div>
    </main>
  );
};

export default ProductsPage;
