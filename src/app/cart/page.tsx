"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "@/features/cart/cartSlice";
import { placeOrder } from "@/features/orders/ordersSlice";

export default function CartPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (items.length === 0) return;
    dispatch(placeOrder({ items, total }));
    dispatch(clearCart());
    router.push("/orders");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Cart</h1>
        <div className="flex gap-4">
          <Link href="/store" className="text-blue-600 hover:underline">
            Continue Shopping
          </Link>
          <Link href="/orders" className="text-blue-600 hover:underline">
            Orders
          </Link>
        </div>
      </div>
        <div className="text-center py-20">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
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
        <h1 className="text-2xl font-semibold">Shopping Cart</h1>
        <Link href="/store" className="text-blue-600 hover:underline">
          Continue Shopping
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="border rounded-lg p-4 flex gap-4"
            >
              <div className="relative w-24 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                <Image
                  src={item.product.imageUrl}
                  alt={item.product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <Link
                  href={`/store/${item.product.id}`}
                  className="font-semibold hover:text-blue-600"
                >
                  {item.product.title}
                </Link>
                <div className="text-sm text-gray-500">{item.product.category}</div>
                <div className="text-lg font-semibold mt-1">
                  ${item.product.price.toFixed(2)}
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => dispatch(removeFromCart(item.product.id))}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          productId: item.product.id,
                          quantity: item.quantity - 1,
                        })
                      )
                    }
                    className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          productId: item.product.id,
                          quantity: item.quantity + 1,
                        })
                      )
                    }
                    className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <div className="font-semibold">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-1">
          <div className="border rounded-lg p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Checkout
            </button>
            <button
              onClick={() => dispatch(clearCart())}
              className="w-full mt-2 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

