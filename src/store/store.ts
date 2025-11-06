import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '@/features/products/productsSlice'
import cartReducer from '@/features/cart/cartSlice'
import ordersReducer from '@/features/orders/ordersSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch