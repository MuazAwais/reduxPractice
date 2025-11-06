"use client";

import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks";
import { updateOrderStatus } from "@/features/orders/ordersSlice";
import { useAppDispatch } from "@/store/hooks";

export default function OrdersPage() {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.orders);

  const handleStatusChange = (orderId: string, status: "pending" | "completed" | "cancelled") => {
    dispatch(updateOrderStatus({ orderId, status }));
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <div className="flex gap-4">
          <Link href="/store" className="text-blue-600 hover:underline">
            Continue Shopping
          </Link>
          <Link href="/cart" className="text-blue-600 hover:underline">
            Cart
          </Link>
        </div>
      </div>
        <div className="text-center py-20">
          <p className="text-gray-600 mb-4">No orders yet</p>
          <Link
            href="/store"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Order History</h1>
        <Link href="/store" className="text-blue-600 hover:underline">
          Continue Shopping
        </Link>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-semibold text-lg">Order {order.id}</div>
                <div className="text-sm text-gray-500">
                  {new Date(order.date).toLocaleString()}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    order.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : order.status === "cancelled"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
                <div className="text-xl font-semibold">${order.total.toFixed(2)}</div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {order.items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.imageUrl}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/store/${item.product.id}`}
                        className="font-medium text-sm hover:text-blue-600 truncate block"
                      >
                        {item.product.title}
                      </Link>
                      <div className="text-xs text-gray-500">
                        Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {order.status === "pending" && (
                <div className="flex gap-2 pt-4 border-t">
                  <button
                    onClick={() => handleStatusChange(order.id, "completed")}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                  >
                    Mark as Completed
                  </button>
                  <button
                    onClick={() => handleStatusChange(order.id, "cancelled")}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                  >
                    Cancel Order
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

