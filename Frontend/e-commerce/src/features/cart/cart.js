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

    addToCart: builder.mutation({
      query: ({ productId, quantity, selectedVariant, price }) => ({
        url: "/add",
        method: "POST",
        body: { productId, quantity, selectedVariant, price },
      }),
      invalidatesTags: ["Cart"],
    }),

    
    updateCartItem: builder.mutation({
      query: ({ id, quantity, selectedVariant }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: { quantity, selectedVariant },
      }),
      invalidatesTags: ["Cart"],
    }),

 
    removeCartItem: builder.mutation({
      query: ({ id, selectedVariant }) => ({
        url: `/remove/${id}`,
        method: "DELETE",
        body: { selectedVariant },
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
