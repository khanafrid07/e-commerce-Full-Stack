import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/cart",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
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

    // ➕ Add product to cart
    addToCart: builder.mutation({
      query: (data) => ({
        url: "/add",
        method: "POST",
        body: data, // { productId, quantity }
      }),
      invalidatesTags: ["Cart"],
    }),

    // 🔄 Update quantity
    updateCartItem: builder.mutation({
      query: ({ id, quantity }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),

    // 🗑️ Remove a single item
    removeCartItem: builder.mutation({
      query: (id) => ({
        url: `/remove/${id}`,
        method: "DELETE",
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
