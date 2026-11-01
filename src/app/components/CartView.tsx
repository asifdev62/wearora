"use client";

import Image from "next/image";
import Link from "next/link";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import { itemKey, useCart } from "@/lib/cart";
import { useHydrated } from "@/lib/use-hydrated";

export default function CartView() {
  const { items, count, subtotal, setQuantity, removeItem, clearCart } =
    useCart();
  const hydrated = useHydrated();

  if (!hydrated) {
    return (
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="h-80 animate-pulse rounded-2xl bg-[#F1EAE1]" />
        <div className="h-64 animate-pulse rounded-2xl bg-[#F1EAE1]" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto mt-16 max-w-md rounded-2xl border border-[#EAE3DA] bg-white px-8 py-14 text-center">
        <h2 className="font-serif text-2xl font-medium text-[#352B24]">
          Your cart is empty
        </h2>
        <p className="mt-3 text-sm leading-7 text-[#655549]">
          Looks like you haven&apos;t added anything yet. Browse the collection
          and find something you love.
        </p>
        <Link
          href="/components/products"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-[#795A43] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[#493A30]"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div>
        <div className="flex items-center justify-between border-b border-[#EAE3DA] pb-4">
          <p className="text-sm text-[#655549]">
            {count} {count === 1 ? "item" : "items"} in your cart
          </p>
          <button
            type="button"
            onClick={clearCart}
            className="text-sm font-medium text-[#8B7A6B] transition-colors hover:text-[#352B24]"
          >
            Clear cart
          </button>
        </div>

        <ul className="divide-y divide-[#EAE3DA]">
          {items.map((item) => {
            const key = itemKey(item);

            return (
              <li key={key} className="flex gap-4 py-6 sm:gap-6">
                <Link
                  href={`/components/products/${item.slug}`}
                  className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-[#EAE3DA] bg-white sm:h-28 sm:w-28"
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="112px"
                      className="object-contain p-2"
                    />
                  ) : null}
                </Link>

                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <Link
                        href={`/components/products/${item.slug}`}
                        className="line-clamp-2 font-semibold text-[#352B24] transition-colors hover:text-[#A88B72]"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1 text-xs text-[#8B7A6B]">
                        {item.size ? `Size: ${item.size}` : "One size"}
                        {item.color ? ` · ${item.color}` : ""}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(key)}
                      aria-label={`Remove ${item.name} from cart`}
                      className="shrink-0 p-1 text-[#8B7A6B] transition-colors hover:text-red-600"
                    >
                      <FaTrashAlt size={14} />
                    </button>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                    <div className="inline-flex items-center rounded-lg border border-[#EAE3DA] bg-white">
                      <button
                        type="button"
                        onClick={() => setQuantity(key, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="px-3 py-2 text-[#655549] transition-colors hover:text-[#A88B72] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <FaMinus size={10} />
                      </button>
                      <span className="min-w-8 text-center text-sm font-semibold text-[#352B24]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(key, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                        aria-label={`Increase quantity of ${item.name}`}
                        className="px-3 py-2 text-[#655549] transition-colors hover:text-[#A88B72] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <FaPlus size={10} />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="flex items-center justify-end gap-0.5 text-base font-bold text-[#352B24]">
                        <TbCurrencyTaka size={18} />
                        {item.price * item.quantity}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-[#8B7A6B]">
                          <TbCurrencyTaka className="inline" />
                          {item.price} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <aside className="rounded-2xl border border-[#EAE3DA] bg-white p-6">
        <h2 className="font-serif text-xl font-medium text-[#352B24]">
          Order summary
        </h2>

        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-[#655549]">Subtotal</dt>
            <dd className="flex items-center font-semibold text-[#352B24]">
              <TbCurrencyTaka size={16} />
              {subtotal}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-[#655549]">Delivery</dt>
            <dd className="text-[#655549]">Calculated at checkout</dd>
          </div>
        </dl>

        <div className="mt-5 flex items-center justify-between border-t border-[#EAE3DA] pt-5">
          <span className="text-base font-semibold text-[#352B24]">Total</span>
          <span className="flex items-center text-xl font-bold text-[#352B24]">
            <TbCurrencyTaka size={20} />
            {subtotal}
          </span>
        </div>

        <Link
          href="/checkout"
          className="mt-6 flex w-full items-center justify-center rounded-xl bg-[#65554B] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#493A30]"
        >
          Proceed to Checkout
        </Link>

        <Link
          href="/components/products"
          className="mt-4 block text-center text-sm font-medium text-[#655549] transition-colors hover:text-[#A88B72]"
        >
          Continue shopping
        </Link>
      </aside>
    </div>
  );
}
