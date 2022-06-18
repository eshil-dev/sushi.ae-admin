import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    tagTypes: ['Category'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
    endpoints: builder => ({
        getCategories: builder.query({
            query: () => '/menu/category',
            providesTags: ['Category']
        }),
        addNewCategory: builder.mutation({
            query: initialCategory => ({
                url: '/menu/category',
                method: 'POST',
                body: initialCategory
            }),
            invalidatesTags: ['Category']
        }),
        updateCategory: builder.mutation({
            query: editedCategory => ({
                url: `/menu/category/${editedCategory._id}`,
                method: 'PATCH',
                body: editedCategory,
            }),
            invalidatesTags: ['Category'],
        }),
        removeCategory: builder.mutation({
            query: catId => ({
                url: `/menu/category/${catId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category']
        }),
    }),
});

export const { useGetCategoriesQuery, useAddNewCategoryMutation, useRemoveCategoryMutation, useUpdateCategoryMutation } = apiSlice;