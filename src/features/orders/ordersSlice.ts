"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "@/features/cart/cartSlice";

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: "pending" | "completed" | "cancelled";
};

export type OrdersState = {
  orders: Order[];
};

const initialState: OrdersState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder(
      state,
      action: PayloadAction<{ items: CartItem[]; total: number }>
    ) {
      const newOrder: Order = {
        id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        items: action.payload.items,
        total: action.payload.total,
        date: new Date().toISOString(),
        status: "pending",
      };
      state.orders.unshift(newOrder);
    },
    updateOrderStatus(
      state,
      action: PayloadAction<{ orderId: string; status: Order["status"] }>
    ) {
      const order = state.orders.find(
        (order) => order.id === action.payload.orderId
      );
      if (order) {
        order.status = action.payload.status;
      }
    },
  },
});

export const { placeOrder, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;

