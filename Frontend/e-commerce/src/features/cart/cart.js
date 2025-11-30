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
    // 🛒 Get user cart
    getCart: builder.query({
      query: () => "/",
      providesTags: ["Cart"],
    }),

    // ➕ Add product to cart (with variant support)
    addToCart: builder.mutation({
      query: ({ productId, quantity, variant }) => ({
        url: "/add",
        method: "POST",
        body: { productId, quantity, variant },
      }),
      invalidatesTags: ["Cart"],
    }),

    // 🔄 Update quantity (with variant support)
    updateCartItem: builder.mutation({
      query: ({ id, quantity, variant }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: { quantity, variant },
      }),
      invalidatesTags: ["Cart"],
    }),

    // 🗑️ Remove a single item (with variant support)
    removeCartItem: builder.mutation({
      query: ({ id, variant }) => ({
        url: `/remove/${id}`,
        method: "DELETE",
        body: { variant }, // pass variant for correct deletion
      }),
      invalidatesTags: ["Cart"],
    }),

    // 🧹 Clear entire cart
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
