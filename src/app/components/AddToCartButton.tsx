"use client";

import { useEffect, useState } from "react";
import { FaCheck, FaShoppingCart } from "react-icons/fa";
import { addToCart, type CartItem } from "@/lib/cart";

type CartItemInput = Omit<CartItem, "quantity">;

interface AddToCartButtonProps {
  item: CartItemInput;
  className?: string;
}

export default function AddToCartButton({
  item,
  className = "",
}: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);
  const isOutOfStock = item.stock === 0;

  useEffect(() => {
    if (!added) {
      return;
    }

    const timeout = window.setTimeout(() => setAdded(false), 1500);

    return () => window.clearTimeout(timeout);
  }, [added]);

  return (
    <button
      type="button"
      disabled={isOutOfStock}
      onClick={() => {
        addToCart(item);
        setAdded(true);
      }}
      className={`flex w-full items-center justify-center gap-2 rounded-xl bg-[#65554B] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#493A30] disabled:cursor-not-allowed disabled:bg-gray-400 ${className}`}
    >
      {isOutOfStock ? (
        "Out of Stock"
      ) : added ? (
        <>
          <FaCheck />
          Added to Cart
        </>
      ) : (
        <>
          <FaShoppingCart />
          Add to Cart
        </>
      )}
    </button>
  );
}
