"use client";

import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import ProductCard from "./ProductCard";
import { getProductsByIds } from "@/lib/products";
import { useHydrated } from "@/lib/use-hydrated";
import { useWishlist } from "@/lib/wishlist";

export default function WishlistView() {
  const { ids, count } = useWishlist();
  const savedProducts = getProductsByIds(ids);
  const hydrated = useHydrated();

  if (!hydrated) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-96 animate-pulse rounded-2xl bg-[#F1EAE1]"
          />
        ))}
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="mx-auto mt-16 max-w-md rounded-2xl border border-[#EAE3DA] bg-white px-8 py-14 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F5EFE7] text-[#A88B72]">
          <FaRegHeart size={24} />
        </span>
        <h2 className="mt-5 font-serif text-2xl font-medium text-[#352B24]">
          Your wishlist is empty
        </h2>
        <p className="mt-3 text-sm leading-7 text-[#655549]">
          Tap the heart on any product to save it here for later.
        </p>
        <Link
          href="/components/products"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-[#795A43] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[#493A30]"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="mb-6 text-sm text-[#655549]">
        {count} {count === 1 ? "product" : "products"} saved
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {savedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
