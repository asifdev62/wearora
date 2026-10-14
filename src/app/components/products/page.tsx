export const instant = false;
import ProductCard from "../ProductCard";
import productsData from "@/data/products.json";

type Props = {
  searchParams: Promise<{
    audience?: string;
  }>;
};

const ProductsPage = async ({ searchParams }: Props) => {
  const { audience } = await searchParams;

  const products = productsData.filter((product) => {
    return (
      !audience ||
      product.audience?.toLowerCase() === audience.toLowerCase()
    );
  });

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
            Discover your favorite fashion at great prices.
          </p>

          <p className="mt-3 text-sm text-gray-600">
            {products.length} products available
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {products.map((product) => (
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