"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#FDFBF7] px-4 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A88B72]">
        Something went wrong
      </p>
      <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-[#352B24]">
        We hit a snag
      </h1>
      <p className="mt-4 max-w-md text-sm leading-7 text-[#655549]">
        This page could not be loaded. Try again, or head back to the shop.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-[#795A43] px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-[#493A30]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-[#EAE3DA] px-7 py-3 text-sm font-medium text-[#655549] transition-colors hover:border-[#A88B72]"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
