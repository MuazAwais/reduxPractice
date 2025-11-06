"use client";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/lib/fakeApi";
import { fetchProductsApi } from "@/lib/fakeApi";

export type ProductsState = {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentPage: number;
  pageSize: number;
};

const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
  currentPage: 1,
  pageSize: 12,
};

export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  const data = await fetchProductsApi(500);
  return data;
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
      state.currentPage = 1;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch products";
      });
  },
});

export const { setPage, setPageSize } = productsSlice.actions;
export default productsSlice.reducer;


