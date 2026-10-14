
import Image from "next/image";
import { FaStar, FaShoppingCart } from "react-icons/fa";

interface Product {
  id: string;
  slug: string;
  name: string;
  nameBn: string;
  audience: string;
  clothingType: string;
  category: string;
  price: number;
  discountPercentage: number;
  images: string[];
  sizes: string[];
  colors: string[];
  isNew: boolean;
  rating: number;
  stock: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  if (!product) {
    return null;
  }

  const discountedPrice =
    product.price -
    (product.price * product.discountPercentage) / 100;

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Product Image */}
      <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gray-50 p-5">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            width={300}
            height={300}
            className="h-full w-full object-contain transition duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
            No Image Available
          </div>
        )}

        {/* New Badge */}
        {product.isNew && (
          <span className="absolute left-3 top-3 rounded-full bg-green-700 px-3 py-1 text-xs font-semibold text-white">
            NEW
          </span>
        )}

        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-[#65554B] px-3 py-1 text-xs font-semibold text-white">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}

        {/* Stock Status */}
        {product.stock === 0 && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/40 font-semibold text-white">
            Out of Stock
          </span>
        )}
      </div>

      {/* Product Information */}
      <div className="p-4">
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
          {product.audience} / {product.clothingType}
        </p>

        <h2 className="line-clamp-2 min-h-12 text-base font-semibold text-gray-800 transition group-hover:text-[#65554B]">
          {product.name}
        </h2>
        {/* Rating */}
        <div className="mt-3 flex items-center gap-2">
          <FaStar className="text-sm text-amber-400" />

          <span className="text-sm font-medium text-gray-700">
            {product.rating}
          </span>

          <span className="text-xs text-gray-400">
            ({product.stock} in stock)
          </span>
        </div>

        {/* Available Sizes */}
        <div className="mt-3 flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <span
              key={size}
              className="rounded border border-gray-200 px-2 py-1 text-xs text-gray-600"
            >
              {size}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xl font-bold text-gray-900">
            ৳{Math.round(discountedPrice)}
          </span>

          {product.discountPercentage > 0 && (
            <span className="text-sm text-gray-400 line-through">
              ৳{product.price}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          type="button"
          disabled={product.stock === 0}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#65554B] px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-500 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          <FaShoppingCart />
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;