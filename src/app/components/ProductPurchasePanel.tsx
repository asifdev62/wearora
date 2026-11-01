"use client";

import { useEffect, useState } from "react";
import { FaCheck, FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { addToCart, type CartItem } from "@/lib/cart";

type CartProduct = Omit<CartItem, "quantity" | "size" | "color">;

interface ProductPurchasePanelProps {
  product: CartProduct;
  sizes: string[];
  colors: string[];
}

const chipBase =
  "rounded-lg border px-4 py-2 text-sm font-medium transition-colors duration-200";

export default function ProductPurchasePanel({
  product,
  sizes,
  colors,
}: ProductPurchasePanelProps) {
  const [selectedSize, setSelectedSize] = useState(sizes[0] ?? "");
  const [selectedColor, setSelectedColor] = useState(colors[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const { stock } = product;
  const isOutOfStock = stock === 0;

  useEffect(() => {
    if (!added) {
      return;
    }

    const timeout = window.setTimeout(() => setAdded(false), 1500);

    return () => window.clearTimeout(timeout);
  }, [added]);

  return (
    <div className="mt-6 space-y-6">
      {sizes.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#655549]">
            Size
          </p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                aria-pressed={selectedSize === size}
                className={`${chipBase} ${
                  selectedSize === size
                    ? "border-[#65554B] bg-[#65554B] text-white"
                    : "border-[#EAE3DA] bg-white text-[#655549] hover:border-[#A88B72]"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {colors.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#655549]">
            Color
          </p>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                aria-pressed={selectedColor === color}
                className={`${chipBase} ${
                  selectedColor === color
                    ? "border-[#65554B] bg-[#65554B] text-white"
                    : "border-[#EAE3DA] bg-white text-[#655549] hover:border-[#A88B72]"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#655549]">
          Quantity
        </p>
        <div className="inline-flex items-center rounded-lg border border-[#EAE3DA] bg-white">
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            disabled={quantity <= 1 || isOutOfStock}
            aria-label="Decrease quantity"
            className="px-4 py-3 text-[#655549] transition-colors hover:text-[#A88B72] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaMinus size={12} />
          </button>
          <span className="min-w-10 text-center text-sm font-semibold text-[#352B24]">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() =>
              setQuantity((value) => Math.min(stock, value + 1))
            }
            disabled={quantity >= stock || isOutOfStock}
            aria-label="Increase quantity"
            className="px-4 py-3 text-[#655549] transition-colors hover:text-[#A88B72] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaPlus size={12} />
          </button>
        </div>
      </div>

      <button
        type="button"
        disabled={isOutOfStock}
        onClick={() => {
          addToCart(
            {
              ...product,
              size: selectedSize,
              color: selectedColor,
            },
            quantity,
          );
          setAdded(true);
        }}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#65554B] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#493A30] disabled:cursor-not-allowed disabled:bg-gray-400"
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
    </div>
  );
}
