import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Product, ProductInput, ProductFilters, ApiResponse } from '@/types'
import { APP_URL } from '@/config/env'


export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({ baseUrl: APP_URL }),
  tagTypes: ['Product', 'Category'],
  endpoints: (builder) => ({
    getProducts: builder.query<ApiResponse<Product[]>, ProductFilters>({
      query: (filters) => {
        return {
          url: '/products',
          params: filters
        }
      },
      providesTags: ['Product'],
    }),

    getProductById: builder.query<ApiResponse<Product>, string>({
      query: (id) => {
        return {
          url: `/products/${id}`
        }
      },
      providesTags: ["Product"],
    }),

    createProduct: builder.mutation<ApiResponse<Product>, ProductInput>({
      query: (productData) => ({
        url: '/products',
        method: 'POST',
        body: productData,
      }),
      invalidatesTags: ['Product', 'Category'],
    }),

    updateProduct: builder.mutation<ApiResponse<Product>, { id: string; data: ProductInput }>({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Product', 'Category'],
    }),

    deleteProduct: builder.mutation<ApiResponse<null>, string>({
      query: id => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product', 'Category'],
    }),

    getCategories: builder.query<ApiResponse<string[]>, void>({
      query: () => {
        return {
          url: '/products/categories'
        }
      },
      providesTags: ['Category'],
    }),

  }),
})

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
} = adminApi