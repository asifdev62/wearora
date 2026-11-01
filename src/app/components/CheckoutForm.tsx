"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { useCart } from "@/lib/cart";
import { placeOrder } from "@/lib/orders";
import { useHydrated } from "@/lib/use-hydrated";

const labelClass = "text-sm font-medium text-[#352B24]";
const inputClass =
  "mt-1 w-full rounded-lg border border-[#EAE3DA] bg-white px-4 py-3 text-sm text-[#352B24] outline-none transition-colors focus:border-[#A88B72]";

export default function CheckoutForm() {
  const { items, subtotal, count, clearCart } = useCart();
  const router = useRouter();
  const hydrated = useHydrated();
  const [isPlacing, setIsPlacing] = useState(false);

  if (!hydrated) {
    return (
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="h-96 animate-pulse rounded-2xl bg-[#F1EAE1]" />
        <div className="h-64 animate-pulse rounded-2xl bg-[#F1EAE1]" />
      </div>
    );
  }

  if (isPlacing) {
    return (
      <div className="rounded-2xl border border-[#EAE3DA] bg-white px-8 py-14 text-center">
        <p className="font-serif text-2xl font-medium text-[#352B24]">
          Placing your order…
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto mt-16 max-w-md rounded-2xl border border-[#EAE3DA] bg-white px-8 py-14 text-center">
        <h2 className="font-serif text-2xl font-medium text-[#352B24]">
          Nothing to check out
        </h2>
        <p className="mt-3 text-sm leading-7 text-[#655549]">
          Your cart is empty. Add a few pieces before checking out.
        </p>
        <Link
          href="/components/products"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-[#795A43] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[#493A30]"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const value = (name: string) => String(data.get(name) ?? "").trim();

        const customer = {
          fullName: value("fullName"),
          phone: value("phone"),
          email: value("email"),
          address: value("address"),
          city: value("city"),
          notes: value("notes"),
        };

        placeOrder({ items, subtotal, customer });
        setIsPlacing(true);
        clearCart();
        router.push("/checkout/success");
      }}
      className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px]"
    >
      <div className="space-y-6">
        <section className="rounded-2xl border border-[#EAE3DA] bg-white p-6">
          <h2 className="font-serif text-xl font-medium text-[#352B24]">
            Contact
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className={labelClass}>Full name</span>
              <input
                name="fullName"
                required
                autoComplete="name"
                className={inputClass}
              />
            </label>

            <label>
              <span className={labelClass}>Phone</span>
              <input
                name="phone"
                required
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                pattern="[0-9+\-\s]{6,20}"
                className={inputClass}
              />
            </label>

            <label>
              <span className={labelClass}>Email (optional)</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                className={inputClass}
              />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-[#EAE3DA] bg-white p-6">
          <h2 className="font-serif text-xl font-medium text-[#352B24]">
            Delivery
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className={labelClass}>Street address</span>
              <textarea
                name="address"
                required
                rows={3}
                autoComplete="street-address"
                className={`${inputClass} resize-none`}
              />
            </label>

            <label>
              <span className={labelClass}>City</span>
              <input
                name="city"
                required
                autoComplete="address-level2"
                className={inputClass}
              />
            </label>

            <label className="sm:col-span-2">
              <span className={labelClass}>Delivery notes (optional)</span>
              <textarea
                name="notes"
                rows={2}
                placeholder="Landmark, preferred delivery time…"
                className={`${inputClass} resize-none`}
              />
            </label>
          </div>
        </section>
      </div>

      <aside className="rounded-2xl border border-[#EAE3DA] bg-white p-6">
        <h2 className="font-serif text-xl font-medium text-[#352B24]">
          Order summary
        </h2>

        <ul className="mt-5 divide-y divide-[#EAE3DA]">
          {items.map((item) => (
            <li
              key={`${item.id}-${item.size}-${item.color}`}
              className="flex items-start justify-between gap-3 py-3 text-sm"
            >
              <div className="min-w-0">
                <p className="line-clamp-2 font-medium text-[#352B24]">
                  {item.name}
                </p>
                <p className="mt-1 text-xs text-[#8B7A6B]">
                  {item.size ? `Size ${item.size}` : "One size"}
                  {item.color ? ` · ${item.color}` : ""} · Qty {item.quantity}
                </p>
              </div>
              <span className="flex shrink-0 items-center font-semibold text-[#352B24]">
                <TbCurrencyTaka size={14} />
                {item.price * item.quantity}
              </span>
            </li>
          ))}
        </ul>

        <dl className="mt-4 space-y-3 border-t border-[#EAE3DA] pt-4 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-[#655549]">Subtotal ({count} items)</dt>
            <dd className="flex items-center font-semibold text-[#352B24]">
              <TbCurrencyTaka size={16} />
              {subtotal}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-[#655549]">Delivery</dt>
            <dd className="text-[#655549]">Confirmed by phone</dd>
          </div>
        </dl>

        <div className="mt-4 flex items-center justify-between border-t border-[#EAE3DA] pt-4">
          <span className="text-base font-semibold text-[#352B24]">Total</span>
          <span className="flex items-center text-xl font-bold text-[#352B24]">
            <TbCurrencyTaka size={20} />
            {subtotal}
          </span>
        </div>

        <button
          type="submit"
          className="mt-6 flex w-full items-center justify-center rounded-xl bg-[#65554B] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#493A30]"
        >
          Place order
        </button>

        <p className="mt-3 text-center text-xs leading-5 text-[#8B7A6B]">
          Cash on delivery. We will call to confirm your order.
        </p>
      </aside>
    </form>
  );
}
