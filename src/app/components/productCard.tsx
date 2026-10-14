
import Image from "next/image";
import { FaStar, FaShoppingCart } from "react-icons/fa";

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const discountedPrice =
    product.price -
    (product.price * product.discountPercentage) / 100;

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Product Image */}
      <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gray-50 p-5">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={300}
          height={300}
          className="h-full w-full object-contain transition duration-500 group-hover:scale-110"
        />

        {/* Discount Badge */}
        <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
          -{Math.round(product.discountPercentage)}%
        </span>

        {/* Stock Status */}
        {product.stock === 0 && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/40 font-semibold text-white">
            Out of Stock
          </span>
        )}
      </div>

      {/* Product Information */}
      <div className="p-4">
        <p className="mb-1 text-xs font-medium capitalize tracking-wide text-gray-500">
          {product.category}
        </p>

        <h2 className="line-clamp-2 min-h-12 text-base font-semibold text-gray-800 transition group-hover:text-green-700">
          {product.title}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Brand: {product.brand}
        </p>

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

        {/* Price */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xl font-bold text-gray-900">
            ${discountedPrice.toFixed(2)}
          </span>

          <span className="text-sm text-gray-400 line-through">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Add to Cart */}
        <button
          disabled={product.stock === 0}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          <FaShoppingCart />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;