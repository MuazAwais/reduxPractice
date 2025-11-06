"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts, setPage, setPageSize } from "@/features/products/productsSlice";
import { addToCart } from "@/features/cart/cartSlice";

export default function StorePage() {
  const dispatch = useAppDispatch();
  const { items, status, error, currentPage, pageSize } = useAppSelector((s) => s.products);
  const cartItems = useAppSelector((s) => s.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(items.length / pageSize));
  }, [items.length, pageSize]);

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, currentPage, pageSize]);

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Store</h1>
        <div className="flex items-center gap-4">
          <Link className="text-blue-600 hover:underline" href="/cart">
            Cart ({cartCount})
          </Link>
          <Link className="text-blue-600 hover:underline" href="/orders">
            Orders
          </Link>
          <Link className="text-blue-600 hover:underline" href="/">Home</Link>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-600">{items.length} items</div>
        <div className="flex items-center gap-2">
          <label htmlFor="page-size" className="text-sm">Per page</label>
          <select
            id="page-size"
            className="border rounded px-2 py-1"
            value={pageSize}
            onChange={(e) => dispatch(setPageSize(parseInt(e.target.value)))}
          >
            {[6, 12, 18, 24].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>

      {status === "loading" && <div className="py-10 text-center">Loading…</div>}
      {status === "failed" && <div className="py-10 text-center text-red-600">{error}</div>}

      {status === "succeeded" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pageItems.map((p) => (
              <div key={p.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                <Link href={`/store/${p.id}`}>
                  <div className="relative w-full h-48 bg-gray-100 cursor-pointer">
                    <Image src={p.imageUrl} alt={p.title} fill className="object-cover" />
                  </div>
                </Link>
                <div className="p-3">
                  <Link href={`/store/${p.id}`} className="block hover:text-blue-600">
                    <div className="text-sm text-gray-500">{p.category}</div>
                    <div className="font-medium truncate" title={p.title}>{p.title}</div>
                    <div className="mt-1 font-semibold">${p.price.toFixed(2)}</div>
                  </Link>
                  <button
                    onClick={() => {
                      dispatch(addToCart(p));
                      alert("Added to cart!");
                    }}
                    className="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() => dispatch(setPage(Math.max(1, currentPage - 1)))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() => dispatch(setPage(Math.min(totalPages, currentPage + 1)))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}


