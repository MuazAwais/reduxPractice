"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/features/cart/cartSlice";
import { fetchProducts } from "@/features/products/productsSlice";
import { useEffect } from "react";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const productId = parseInt(params.id as string);
  
  const { items, status } = useAppSelector((state) => state.products);
  const product = items.find((p) => p.id === productId);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      alert("Added to cart!");
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Product not found</h1>
          <Link href="/store" className="text-blue-600 hover:underline">
            Back to Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Link href="/store" className="text-blue-600 hover:underline">
          ← Back to Store
        </Link>
        <div className="flex gap-4">
          <Link href="/cart" className="text-blue-600 hover:underline">
            Cart
          </Link>
          <Link href="/orders" className="text-blue-600 hover:underline">
            Orders
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-sm text-gray-500 mb-2">{product.category}</div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <div className="text-3xl font-semibold text-blue-600 mb-4">
              ${product.price.toFixed(2)}
            </div>
          </div>

          <div className="border-t pt-4">
            <h2 className="font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Add to Cart
            </button>
            <Link
              href="/cart"
              className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold text-center"
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

