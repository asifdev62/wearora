"use client";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishlist } from "@/lib/wishlist";

interface WishlistButtonProps {
  productId: string;
  productName: string;
  className?: string;
  size?: number;
}

export default function WishlistButton({
  productId,
  productName,
  className = "",
  size = 16,
}: WishlistButtonProps) {
  const { has, toggle } = useWishlist();
  const isSaved = has(productId);

  return (
    <button
      type="button"
      onClick={() => toggle(productId)}
      aria-pressed={isSaved}
      aria-label={
        isSaved
          ? `Remove ${productName} from wishlist`
          : `Save ${productName} to wishlist`
      }
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-[#EAE3DA] bg-white/95 shadow-sm transition-colors hover:text-[#A88B72] ${
        isSaved ? "text-[#A88B72]" : "text-[#655549]"
      } ${className}`}
    >
      {isSaved ? <FaHeart size={size} /> : <FaRegHeart size={size} />}
    </button>
  );
}
