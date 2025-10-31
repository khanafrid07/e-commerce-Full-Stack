import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8080/api", prepareHeaders: (headers)=>{
        const token = localStorage.getItem("token")
        if(token){

            headers.set("Authorization", `Bearer ${token}`)
        }
        return headers
    }}),
    tagTypes:["orders"],
    endpoints: (builder)=>({
        getOrders: builder.query({
            query: ()=> "/orders",
            providesTags: ["orders"]
        }),
        singleOrder: builder.query({
            query:(id)=>`/orders/${id}`,
            providesTags: ["orders"]
        }),
        createOrder: builder.mutation({
            query: (orderData)=>({
                url: "/orders",
                body: orderData,
                method: "POST"
            }),
            invalidatesTags:["orders"]
        }),
        updateOrder: builder.mutation({
            query: ({id, data})=>({
                url: `/orders/${id}`,
                body: data,
                method: "PUT"
            }),
            invalidatesTags: ["orders"]
        }),
        deleteOrder: builder.mutation({
            query: (id)=>({
                url: `/orders/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["orders"]
        })
        
    })
   
})

export const {useCreateOrderMutation, useDeleteOrderMutation, useGetOrdersQuery, useSingleOrderQuery, useUpdateOrderMutation} = orderApi