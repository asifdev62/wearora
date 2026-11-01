import productsData from "@/data/products.json";

export interface Product {
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
  description: string;
}

export const products: Product[] = productsData;

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getDiscountedPrice(product: Product): number {
  return Math.round(
    product.price - (product.price * product.discountPercentage) / 100,
  );
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter(
      (candidate) =>
        candidate.id !== product.id && candidate.audience === product.audience,
    )
    .slice(0, limit);
}
