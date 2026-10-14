// import React from 'react';

// const ProductsPage =async () => {

//     const res = await fetch("https://dummyjson.com/products?limit=0")

//     const data = await res.json()
//     const products = data.products;

//     console.log(products)
//     return (
//         <div>
//             {
//               products.map(product => <div key={product.id}>
//                 <h2>{product.thumbnail}</h2>
//               </div>)  
//             }
//         </div>
//     );
// };

// export default ProductsPage;




import ProductCard from "../components/ProductCard";

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

const ProductsPage = async () => {
  const res = await fetch("https://dummyjson.com/products?limit=0");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: { products: Product[] } = await res.json();

  const products = data.products;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="font-semibold uppercase tracking-widest text-green-700">
            Wearora Collection
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            All Products
          </h1>

          <p className="mt-2 text-gray-500">
            Discover your favorite products at great prices.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProductsPage;
