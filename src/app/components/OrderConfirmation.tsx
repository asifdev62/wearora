"use client";

import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import { useOrders } from "@/lib/orders";
import { useHydrated } from "@/lib/use-hydrated";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function OrderConfirmation() {
  const { latest } = useOrders();
  const hydrated = useHydrated();

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="h-48 animate-pulse rounded-3xl bg-[#F1EAE1]" />
        <div className="h-64 animate-pulse rounded-2xl bg-[#F1EAE1]" />
      </div>
    );
  }

  if (!latest) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-[#EAE3DA] bg-white px-8 py-14 text-center">
        <h2 className="font-serif text-2xl font-medium text-[#352B24]">
          No recent order
        </h2>
        <p className="mt-3 text-sm leading-7 text-[#655549]">
          We could not find an order in this browser. If you just placed one,
          check your profile.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/components/products"
            className="rounded-full bg-[#795A43] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#493A30]"
          >
            Continue shopping
          </Link>
          <Link
            href="/profile"
            className="rounded-full border border-[#EAE3DA] px-6 py-3 text-sm font-medium text-[#655549] transition-colors hover:border-[#A88B72]"
          >
            View my orders
          </Link>
        </div>
      </div>
    );
  }

  const order = latest;
  const itemCount = order.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-3xl border border-[#EAE3DA] bg-white px-8 py-12 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-700 text-white">
          <FaCheck size={26} />
        </span>
        <h2 className="mt-6 font-serif text-3xl font-medium text-[#352B24]">
          Thank you, {order.customer.fullName.split(" ")[0]}!
        </h2>
        <p className="mt-3 text-sm leading-7 text-[#655549]">
          Your order{" "}
          <span className="font-semibold text-[#352B24]">{order.id}</span> has
          been placed on {formatDate(order.createdAt)}.
        </p>
        <p className="mt-1 text-sm leading-7 text-[#655549]">
          We will call {order.customer.phone} to confirm delivery.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-[#EAE3DA] bg-white p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-medium text-[#352B24]">
            Order summary
          </h3>
          <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-700">
            {order.status}
          </span>
        </div>

        <ul className="mt-5 divide-y divide-[#EAE3DA]">
          {order.items.map((item) => (
            <li
              key={`${item.id}-${item.size}-${item.color}`}
              className="flex items-start justify-between gap-4 py-4 text-sm"
            >
              <div className="min-w-0">
                <Link
                  href={`/components/products/${item.slug}`}
                  className="line-clamp-2 font-medium text-[#352B24] transition-colors hover:text-[#A88B72]"
                >
                  {item.name}
                </Link>
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

        <dl className="mt-2 space-y-3 border-t border-[#EAE3DA] pt-4 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-[#655549]">Items ({itemCount})</dt>
            <dd className="flex items-center font-semibold text-[#352B24]">
              <TbCurrencyTaka size={16} />
              {order.subtotal}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-[#655549]">Delivery</dt>
            <dd className="text-[#655549]">Confirmed by phone</dd>
          </div>
          <div className="flex items-center justify-between border-t border-[#EAE3DA] pt-3">
            <dt className="text-base font-semibold text-[#352B24]">Total</dt>
            <dd className="flex items-center text-xl font-bold text-[#352B24]">
              <TbCurrencyTaka size={20} />
              {order.subtotal}
            </dd>
          </div>
        </dl>

        <div className="mt-6 rounded-xl bg-[#FBF6F0] p-4 text-sm leading-6 text-[#655549]">
          <p className="font-semibold text-[#352B24]">Delivering to</p>
          <p className="mt-1">{order.customer.fullName}</p>
          <p>{order.customer.address}</p>
          <p>{order.customer.city}</p>
          <p>{order.customer.phone}</p>
          {order.customer.notes && (
            <p className="mt-2 text-xs">Note: {order.customer.notes}</p>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/components/products"
          className="rounded-full bg-[#795A43] px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-[#493A30]"
        >
          Continue shopping
        </Link>
        <Link
          href="/profile"
          className="rounded-full border border-[#EAE3DA] px-6 py-3 text-center text-sm font-medium text-[#655549] transition-colors hover:border-[#A88B72]"
        >
          View my orders
        </Link>
      </div>
    </div>
  );
}
