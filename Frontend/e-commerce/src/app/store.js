import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice.js";
import { ProductApi } from '../features/products/productSlice.js';
import { orderApi } from '../features/orders/orderSlice.js';
import { cartApi } from '../features/cart/cart.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [ProductApi.reducerPath]: ProductApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware()
      .concat(ProductApi.middleware)
      .concat(orderApi.middleware)
      .concat(cartApi.middleware)
  ),
});
