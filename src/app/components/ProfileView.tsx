"use client";

import Link from "next/link";
import { FaBoxOpen, FaHeart, FaShoppingBag, FaUser } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import { useCart } from "@/lib/cart";
import { useOrders } from "@/lib/orders";
import { useHydrated } from "@/lib/use-hydrated";
import { useWishlist } from "@/lib/wishlist";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ProfileView() {
  const { orders } = useOrders();
  const { count: wishlistCount } = useWishlist();
  const { count: cartCount } = useCart();
  const hydrated = useHydrated();

  if (!hydrated) {
    return (
      <div className="grid gap-6">
        <div className="h-40 animate-pulse rounded-2xl bg-[#F1EAE1]" />
        <div className="h-64 animate-pulse rounded-2xl bg-[#F1EAE1]" />
      </div>
    );
  }

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
      <aside className="rounded-2xl border border-[#EAE3DA] bg-white p-6">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F5EFE7] text-[#A88B72]">
            <FaUser size={22} />
          </span>
          <div>
            <p className="font-serif text-xl font-medium text-[#352B24]">
              Guest Shopper
            </p>
            <p className="text-xs text-[#8B7A6B]">Local demo account</p>
          </div>
        </div>

        <p className="mt-4 text-xs leading-6 text-[#8B7A6B]">
          This store has no sign-in yet. Your cart, wishlist and orders are
          stored only in this browser.
        </p>

        <div className="mt-6 space-y-2">
          <Link
            href="/cart"
            className="flex items-center justify-between rounded-xl border border-[#EAE3DA] px-4 py-3 text-sm text-[#655549] transition-colors hover:border-[#A88B72]"
          >
            <span className="flex items-center gap-2">
              <FaShoppingBag className="text-[#A88B72]" /> Cart
            </span>
            <span className="font-semibold text-[#352B24]">{cartCount}</span>
          </Link>

          <Link
            href="/wishlist"
            className="flex items-center justify-between rounded-xl border border-[#EAE3DA] px-4 py-3 text-sm text-[#655549] transition-colors hover:border-[#A88B72]"
          >
            <span className="flex items-center gap-2">
              <FaHeart className="text-[#A88B72]" /> Wishlist
            </span>
            <span className="font-semibold text-[#352B24]">
              {wishlistCount}
            </span>
          </Link>

          <div className="flex items-center justify-between rounded-xl border border-[#EAE3DA] px-4 py-3 text-sm text-[#655549]">
            <span className="flex items-center gap-2">
              <FaBoxOpen className="text-[#A88B72]" /> Orders
            </span>
            <span className="font-semibold text-[#352B24]">
              {orders.length}
            </span>
          </div>
        </div>
      </aside>

      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-medium text-[#352B24]">
              Order history
            </h2>
            <p className="mt-1 text-sm text-[#655549]">
              Orders placed from this browser.
            </p>
          </div>
          <Link
            href="/components/products"
            className="text-sm font-medium text-[#655549] transition-colors hover:text-[#A88B72]"
          >
            Shop again
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-[#EAE3DA] bg-white px-8 py-14 text-center">
            <h3 className="font-serif text-xl font-medium text-[#352B24]">
              No orders yet
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#655549]">
              When you place an order it will appear here.
            </p>
            <Link
              href="/components/products"
              className="mt-5 inline-flex rounded-full bg-[#795A43] px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-[#493A30]"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <ul className="mt-6 space-y-4">
            {orders.map((order) => {
              const itemCount = order.items.reduce(
                (total, item) => total + item.quantity,
                0,
              );

              return (
                <li
                  key={order.id}
                  className="rounded-2xl border border-[#EAE3DA] bg-white p-5 sm:p-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-[#352B24]">
                        {order.id}
                      </p>
                      <p className="mt-1 text-xs text-[#8B7A6B]">
                        {formatDate(order.createdAt)} · {itemCount}{" "}
                        {itemCount === 1 ? "item" : "items"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-700">
                        {order.status}
                      </span>
                      <span className="flex items-center text-lg font-bold text-[#352B24]">
                        <TbCurrencyTaka size={18} />
                        {order.subtotal}
                      </span>
                    </div>
                  </div>

                  <p className="mt-3 line-clamp-1 text-sm text-[#655549]">
                    {order.items
                      .map((item) => `${item.name} × ${item.quantity}`)
                      .join(", ")}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
