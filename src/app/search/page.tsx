import type { Metadata } from "next";
import { Suspense } from "react";
import ProductCard from "../components/ProductCard";
import SearchForm from "../components/SearchForm";
import { searchProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the Wearora collection by product, category or colour.",
};

type SearchParams = Promise<{ q?: string }>;

export default function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <main className="min-h-screen bg-[#FDFBF7] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A88B72]">
            Wearora
          </p>
          <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[#352B24] sm:text-4xl">
            Search
          </h1>
        </div>

        <Suspense fallback={<SearchFallback />}>
          <SearchResults searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}

async function SearchResults({ searchParams }: { searchParams: SearchParams }) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const results = searchProducts(query);

  return (
    <>
      <SearchForm initialQuery={query} className="max-w-2xl" />

      <div className="mt-10">
        {query ? (
          <>
            <p className="mb-6 text-sm text-[#655549]">
              {results.length} {results.length === 1 ? "result" : "results"} for
              &ldquo;{query}&rdquo;
            </p>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {results.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-[#EAE3DA] bg-white px-8 py-14 text-center">
                <h2 className="font-serif text-2xl font-medium text-[#352B24]">
                  No products found
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#655549]">
                  Try a different word, or browse the full collection.
                </p>
              </div>
            )}
          </>
        ) : (
          <p className="text-sm leading-7 text-[#655549]">
            Type a product name, category, audience or colour to start
            searching.
          </p>
        )}
      </div>
    </>
  );
}

function SearchFallback() {
  return (
    <div className="space-y-8">
      <div className="h-13 max-w-2xl animate-pulse rounded-full bg-[#F1EAE1]" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-96 animate-pulse rounded-2xl bg-[#F1EAE1]"
          />
        ))}
      </div>
    </div>
  );
}
