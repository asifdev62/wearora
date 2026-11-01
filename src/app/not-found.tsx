import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#FDFBF7] px-4 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A88B72]">
        404
      </p>
      <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-[#352B24]">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-sm leading-7 text-[#655549]">
        The page you are looking for does not exist or has moved. Let&apos;s get
        you back to the collection.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-[#795A43] px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-[#493A30]"
        >
          Back home
        </Link>
        <Link
          href="/components/products"
          className="rounded-full border border-[#EAE3DA] px-7 py-3 text-sm font-medium text-[#655549] transition-colors hover:border-[#A88B72]"
        >
          Shop products
        </Link>
      </div>
    </main>
  );
}
