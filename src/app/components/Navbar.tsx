
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  CiSearch,
  CiUser,
  CiShoppingCart,
  CiHeart,
  CiMenuBurger,
  CiCircleRemove,
} from "react-icons/ci";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "All Products", href: "/components/products" },
  { name: "Men", href: "/men" },
  { name: "Women", href: "/women" },
  { name: "Boys", href: "/boys" },
  { name: "Girls", href: "/girls" },
  { name: "New Arrivals", href: "/new-arrivals" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-[#EAE3DA] bg-[#FDFBF7]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.jpg"
            alt="Wearora Logo"
            width={90}
            height={45}
            priority
            className="h-auto w-20 sm:w-24"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-5 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative whitespace-nowrap py-2 text-sm font-medium text-[#655549] transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#A88B72] after:transition-all hover:text-[#A88B72] hover:after:w-full"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Icons */}
        <div className="flex shrink-0 items-center gap-3 text-[#655549] sm:gap-4">
          <button
            aria-label="Search products"
            className="transition-colors hover:text-[#A88B72]"
          >
            <CiSearch size={24} />
          </button>

          <Link
            href="/profile"
            aria-label="My account"
            className="transition-colors hover:text-[#A88B72]"
          >
            <CiUser size={24} />
          </Link>

          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="hidden transition-colors hover:text-[#A88B72] sm:block"
          >
            <CiHeart size={24} />
          </Link>

          <Link
            href="/cart"
            aria-label="Shopping cart"
            className="transition-colors hover:text-[#A88B72]"
          >
            <CiShoppingCart size={25} />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="ml-1 xl:hidden"
          >
            {isOpen ? (
              <CiCircleRemove size={28} />
            ) : (
              <CiMenuBurger size={27} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-[#EAE3DA] bg-[#FDFBF7] px-5 py-4 shadow-lg xl:hidden">
          <div className="mx-auto flex max-w-7xl flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="border-b border-[#EAE3DA]/70 py-3 text-sm font-medium text-[#655549] transition-colors last:border-b-0 hover:pl-2 hover:text-[#A88B72]"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
