"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

interface SearchFormProps {
  initialQuery?: string;
  autoFocus?: boolean;
  onSubmitted?: () => void;
  className?: string;
}

export default function SearchForm({
  initialQuery = "",
  autoFocus = false,
  onSubmitted,
  className = "",
}: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();

        const term = query.trim();
        if (!term) {
          return;
        }

        router.push(`/search?q=${encodeURIComponent(term)}`);
        onSubmitted?.();
      }}
      className={`flex items-center gap-2 rounded-full border border-[#EAE3DA] bg-white px-4 py-1.5 ${className}`}
    >
      <CiSearch size={20} className="shrink-0 text-[#8B7A6B]" />
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search products, categories, colours…"
        aria-label="Search products"
        autoFocus={autoFocus}
        className="min-w-0 flex-1 bg-transparent py-2 text-sm text-[#352B24] outline-none placeholder:text-[#A99C90]"
      />
      <button
        type="submit"
        className="rounded-full bg-[#65554B] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#493A30]"
      >
        Search
      </button>
    </form>
  );
}
