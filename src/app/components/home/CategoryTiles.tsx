import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";

const audiences = ["Men", "Women", "Boys", "Girls"];

export default function CategoryTiles() {
  return (
    <section className="bg-[#FBF6F0] px-4 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A88B72]">
              Shop by category
            </p>
            <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[#352B24] sm:text-4xl">
              Find your fit
            </h2>
          </div>

          <Link
            href="/components/products"
            className="text-sm font-medium text-[#655549] transition-colors hover:text-[#A88B72]"
          >
            Shop all products
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {audiences.map((audience) => {
            const cover = products.find(
              (product) =>
                product.audience === audience && product.images.length > 0,
            );

            return (
              <Link
                key={audience}
                href={`/components/products?audience=${audience}`}
                className="group relative aspect-4/5 overflow-hidden rounded-2xl border border-[#EAE3DA] bg-white"
              >
                {cover?.images[0] && (
                  <Image
                    src={cover.images[0]}
                    alt={`${audience} collection`}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-contain p-6 transition duration-500 group-hover:scale-105"
                  />
                )}

                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[#352B24]/80 via-[#352B24]/30 to-transparent p-4 pt-10">
                  <p className="font-serif text-xl text-white">{audience}</p>
                  <p className="mt-0.5 text-xs text-white/80">
                    Shop {audience.toLowerCase()}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
