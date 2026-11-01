import Link from "next/link";

const shopLinks = [
  { name: "All products", href: "/components/products" },
  { name: "New arrivals", href: "/new-arrive" },
  { name: "Men", href: "/components/products?audience=Men" },
  { name: "Women", href: "/components/products?audience=Women" },
  { name: "Boys", href: "/components/products?audience=Boys" },
  { name: "Girls", href: "/components/products?audience=Girls" },
];

const accountLinks = [
  { name: "Search", href: "/search" },
  { name: "Wishlist", href: "/wishlist" },
  { name: "Cart", href: "/cart" },
  { name: "My account", href: "/profile" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#EAE3DA] bg-[#FBF6F0]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[2fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-serif text-2xl font-medium tracking-tight text-[#352B24]">
            Wearora
          </p>
          <p className="mt-1 text-[10px] tracking-[0.4em] text-[#655549]">
            WEAR YOUR STORY
          </p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-[#655549]">
            Trendy styles, premium quality, for every moment of your life. Find
            your perfect style with Wearora.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#352B24]">
            Shop
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {shopLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-[#655549] transition-colors hover:text-[#A88B72]"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#352B24]">
            Your account
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {accountLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-[#655549] transition-colors hover:text-[#A88B72]"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[#EAE3DA] px-4 py-5 text-center text-xs text-[#8B7A6B]">
        © Wearora. All rights reserved. Cash on delivery available.
      </div>
    </footer>
  );
}
