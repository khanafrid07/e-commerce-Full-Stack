import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bannerApi = createApi({
    reducerPath: "bannerApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api", prepareHeaders: (headers) => {
            const token = localStorage.getItem("token")
            if (token) {
                headers.set("Authorization", `Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes: ["banners"],
    endpoints: (builder) => ({
        getBanner: builder.query({
            query: ({ type, categoryId, isAdmin } = {}) => {
                let query = "/banners?";

                if (type) query += `type=${type}&`;
                if (categoryId) query += `categoryId=${categoryId}&`;
                if (isAdmin) query += `isAdmin=${isAdmin}&`;

                return { url: query };
            },
            providesTags: ["banners"]
        }),
        createBanner: builder.mutation({
            query: (formData) => ({
                url: "/banners",
                body: formData,
                method: "POST"
            }),
            invalidatesTags: ["banners"]

        }),
        updateBannerStatus: builder.mutation({
            query: ({ id, isActive }) => ({
                url: `/banners/${id}`,
                method: "PUT",
                body: { isActive }
            }),
            invalidatesTags: ["banners"]
        }),
        deleteBanner: builder.mutation({
            query: (id) => ({
                url: `/banners/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["banners"]
        })
    })
})

export const { useGetBannerQuery, useCreateBannerMutation, useUpdateBannerStatusMutation, useDeleteBannerMutation } = bannerApi