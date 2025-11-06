
"use client";

import Link from "next/link";
import { useAppSelector } from "@/store/hooks";

export default function Home() {
  const cartItems = useAppSelector((s) => s.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-end gap-4 mb-8">
        <Link href="/store" className="text-blue-600 hover:underline">
          Store
        </Link>
        <Link href="/cart" className="text-blue-600 hover:underline">
          Cart ({cartCount})
        </Link>
        <Link href="/orders" className="text-blue-600 hover:underline">
          Orders
        </Link>
      </div>
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-semibold">Welcome</h1>
          <p className="text-gray-600">Browse the store with a fake API and pagination.</p>
          <Link
            href="/store"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go to Store
          </Link>
        </div>
      </div>
    </div>
  );
}
