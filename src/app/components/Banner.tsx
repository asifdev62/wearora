
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const Banner = () => {
  return (
    <section className="relative isolate overflow-hidden bg-[#FDFBF7]">

      {/* Background Image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/hero.png"
          alt="Wearora fashion collection for men, women and kids"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Readable text background */}
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-[#FDFBF7] via-[#FDFBF7]/90 to-transparent" />

      <div className="mx-auto flex min-h-130 max-w-[1600px] items-center px-5 py-16 sm:min-h-150 sm:px-10 md:px-14 lg:min-h-162.5 lg:px-20">

        {/* Hero Content */}
        <div className="w-full max-w-xl">

          {/* Brand */}
          <Link href="/" className="mb-10 inline-block">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-[#352B24] sm:text-4xl">
              Wearora
            </h2>

            <p className="mt-1 text-[10px] tracking-[0.4em] text-[#655549] sm:text-xs">
              WEAR YOUR STORY
            </p>
          </Link>

          {/* Heading */}
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#8B6B52] sm:text-sm">
            New Collection 2026
          </p>

          <h1 className="font-serif text-5xl font-medium leading-[1.05] tracking-tight text-[#352B24] sm:text-6xl md:text-7xl">
            Fashion for
            <span className="block italic text-[#96765D]">
              Everyone
            </span>
          </h1>

          {/* Categories */}
          <ul className="mt-6 flex items-center gap-3 text-base font-medium text-[#655549] sm:gap-5 sm:text-xl">
            <li>Men</li>
            <li className="text-[#B9A28D]">•</li>
            <li>Women</li>
            <li className="text-[#B9A28D]">•</li>
            <li>Kids</li>
          </ul>

          {/* Description */}
          <p className="mt-5 max-w-sm text-sm leading-7 text-[#655549] sm:text-base sm:leading-8">
            Trendy styles, premium quality, for every moment
            of your life. Find your perfect style with Wearora.
          </p>

          {/* Button */}
          <Link
            href="/products"
            className="group mt-8 inline-flex items-center gap-4 rounded-full bg-[#795A43] px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-[#493A30] hover:shadow-lg"
          >
            Shop Now
            <FaArrowRightLong className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

        </div>
      </div>
    </section>
  );
};

export default Banner;