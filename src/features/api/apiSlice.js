import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    tagTypes: ['Category', 'Menu'],
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
        getMenus: builder.query({
            query: () => '/menu',
            providesTags: ['Menu'],
        }),
        addNewMenu: builder.mutation({
            query: initialMenu => ({
                url: '/menu',
                method: 'POST',
                body: initialMenu
            }),
            invalidatesTags: ['Menu'],
        }),
        updateMenu: builder.mutation({
            query: newMenu => ({
                url: `/menu/${newMenu._id}`,
                method: 'PATCH',
                body: newMenu,
            }),
            invalidatesTags: ['Menu'],
        }),
        removeMenu: builder.mutation({
            query: menuId => ({
                url: `/menu/${menuId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Menu']
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useAddNewCategoryMutation,
    useRemoveCategoryMutation,
    useUpdateCategoryMutation,
    useGetMenusQuery,
    useAddNewMenuMutation,
    useUpdateMenuMutation,
    useRemoveMenuMutation
} = apiSlice;
