import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"


export const ProductApi = createApi({
    
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8080/api", prepareHeaders: (headers)=>{
        const token = localStorage.getItem("token")
        headers.set("Authorization", `Bearer ${token}`)
        return headers
    }}),
    tagTypes: ["products"],
    
    endpoints: (builder)=>({
        getProducts: builder.query({
            query: ()=>"/products",
            providesTags: ["products"]
        }),
        addProduct: builder.mutation({
            query: (newProduct)=>({
                url: "/products",
                method: "POST",
                body: newProduct
            }),
            invalidatesTags: ["products"],
            
        }),
        viewProduct: builder.query({
            query: (id)=>
                `/products/${id}`,
                
                
            
        }),
        updateProduct: builder.mutation({
        query: ({id, data})=>({
            
                url: `/products/${id}`,
                method: "PUT",
                body: data,
                
            }),
            invalidatesTags: ["products"],
        }),
        deleteProduct: builder.mutation({
            query: (id)=>({
                method: "DELETE",
                url: `/products/${id}`,
                
            }),
            invalidatesTags: ["products"],
        })
    })
    
})
export const {
  useGetProductsQuery,
  useAddProductMutation,
  useViewProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = ProductApi