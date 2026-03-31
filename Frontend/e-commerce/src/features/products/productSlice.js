import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ProductApi = createApi({
  reducerPath: "productApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["Products"],

  endpoints: (builder) => ({

    getProducts: builder.query({
      query: (params = {}) => ({
        url: "/products",
        params, 
      }),
      providesTags:["Products"]

    }),

    viewProduct: builder.query({
      query: (id) => `/products/${id}`,
      providesTags:["Products"]

    }),

  
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),

      invalidatesTags: ["Products"],
    }),

   
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),

      invalidatesTags: ["Products"]
    }),

  
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Products"]
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useViewProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = ProductApi;