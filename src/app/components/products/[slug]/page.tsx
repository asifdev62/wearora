import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaStar } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import ProductCard from "../../ProductCard";
import ProductPurchasePanel from "../../ProductPurchasePanel";
import {
  getDiscountedPrice,
  getProductBySlug,
  getRelatedProducts,
  products,
} from "@/lib/products";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product not found | Wearora" };
  }

  return {
    title: `${product.name} | Wearora`,
    description: product.description,
  };
}

export default async function ProductDetailsPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const discountedPrice = getDiscountedPrice(product);
  const relatedProducts = getRelatedProducts(product);
  const image = product.images[0];

  return (
    <main className="min-h-screen bg-[#FDFBF7] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-[#8B7A6B]">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition-colors hover:text-[#A88B72]">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={`/components/products?audience=${product.audience}`}
                className="transition-colors hover:text-[#A88B72]"
              >
                {product.audience}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-[#352B24]">{product.name}</li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-[#EAE3DA] bg-white">
            {image ? (
              <Image
                src={image}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain p-8"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-400">
                No Image Available
              </div>
            )}

            {product.isNew && (
              <span className="absolute left-4 top-4 rounded-full bg-green-700 px-3 py-1 text-xs font-semibold text-white">
                NEW
              </span>
            )}

            {product.discountPercentage > 0 && (
              <span className="absolute right-4 top-4 rounded-full bg-[#65554B] px-3 py-1 text-xs font-semibold text-white">
                -{Math.round(product.discountPercentage)}%
              </span>
            )}

            {product.stock === 0 && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-lg font-semibold text-white">
                Out of Stock
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#A88B72]">
              {product.audience} / {product.clothingType}
            </p>

            <h1 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[#352B24] sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[#655549]">
              <span className="flex items-center gap-1">
                <FaStar className="text-amber-400" />
                <span className="font-medium text-[#352B24]">
                  {product.rating}
                </span>
              </span>
              <span className="text-[#EAE3DA]">|</span>
              <span>{product.category}</span>
              <span className="text-[#EAE3DA]">|</span>
              <span>
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Currently unavailable"}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap items-end gap-3">
              <span className="flex items-center text-3xl font-bold text-[#352B24]">
                <TbCurrencyTaka size={28} />
                {discountedPrice}
              </span>

              {product.discountPercentage > 0 && (
                <span className="flex items-center gap-1 pb-1 text-base text-gray-400 line-through">
                  <TbCurrencyTaka />
                  {product.price}
                </span>
              )}
            </div>

            <p className="mt-6 max-w-xl text-sm leading-7 text-[#655549] sm:text-base sm:leading-8">
              {product.description}
            </p>

            <ProductPurchasePanel
              product={{
                id: product.id,
                slug: product.slug,
                name: product.name,
                image: image ?? "",
                price: discountedPrice,
                stock: product.stock,
              }}
              sizes={product.sizes}
              colors={product.colors}
            />

            <dl className="mt-8 grid grid-cols-1 gap-4 border-t border-[#EAE3DA] pt-6 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-[#352B24]">Category</dt>
                <dd className="mt-1 text-[#655549]">{product.category}</dd>
              </div>
              <div>
                <dt className="font-semibold text-[#352B24]">Clothing type</dt>
                <dd className="mt-1 text-[#655549]">
                  {product.clothingType}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A88B72]">
                You may also like
              </p>
              <h2 className="mt-2 font-serif text-2xl font-medium text-[#352B24] sm:text-3xl">
                More for {product.audience}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((related) => (
                <ProductCard key={related.id} product={related} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
