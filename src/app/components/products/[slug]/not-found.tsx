import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center bg-[#FDFBF7] px-4 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A88B72]">
        Wearora
      </p>
      <h1 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[#352B24] sm:text-4xl">
        Product not found
      </h1>
      <p className="mt-4 max-w-md text-sm leading-7 text-[#655549]">
        The product you are looking for may have sold out or moved. Browse the
        full collection to find something similar.
      </p>
      <Link
        href="/components/products"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-[#795A43] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[#493A30]"
      >
        Browse products
      </Link>
    </main>
  );
}
