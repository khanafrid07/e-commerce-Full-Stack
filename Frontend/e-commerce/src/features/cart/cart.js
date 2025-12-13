// ============================================
// FIXED: Cart API Slice
// Location: src/features/cart/cart.js
// ============================================

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/cart",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({

    getCart: builder.query({
      query: () => "/",
      providesTags: ["Cart"],
    }),

    // FIXED: Changed selectedVariant → variants
    addToCart: builder.mutation({
      query: ({ productId, quantity, variants, price }) => ({
        url: "/add",
        method: "POST",
        body: { productId, quantity, variants, price },
      }),
      invalidatesTags: ["Cart"],
    }),

    // FIXED: Changed selectedVariant → variant
    updateCartItem: builder.mutation({
      query: ({ id, quantity, variant }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: { quantity, variant },
      }),
      invalidatesTags: ["Cart"],
    }),

    // FIXED: Changed selectedVariant → variant
    removeCartItem: builder.mutation({
      query: ({ id, variant }) => ({
        url: `/remove/${id}`,
        method: "DELETE",
        body: { variant },
      }),
      invalidatesTags: ["Cart"],
    }),

    clearCart: builder.mutation({
      query: () => ({
        url: "/clear",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
} = cartApi;