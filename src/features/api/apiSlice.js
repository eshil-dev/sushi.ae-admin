import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    tagTypes: ['Category', 'Menu', 'User'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api', prepareHeaders: (headers, { getState }) => {
            const token = getState().user.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: builder => ({
        registerUser: builder.mutation({
            query: userData => ({
                url: `/user/register`,
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['User']
        }),
        getAllUsers: builder.query({
            query: () => '/user',
            providesTags: ['User'],
        }),
        updateUser: builder.mutation({
            query: editedUser => ({
                url: `/user/${editedUser._id}`,
                method: 'PATCH',
                body: editedUser,
            }),
            invalidatesTags: ['User'],
        }),
        removeUser: builder.mutation({
            query: userID => ({
                url: `/user/${userID}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User']
        }),
        changeUserPassword: builder.mutation({
            query: newPassword => ({
                url: `/user/changePassword`,
                method: 'POST',
                body: newPassword,
                validateStatus: (_, result) => (result),
            }),
            invalidatesTags: ['User']
        }),
        getCategories: builder.query({
            query: () => '/category',
            providesTags: ['Category']
        }),
        addNewCategory: builder.mutation({
            query: initialCategory => ({
                url: '/category',
                method: 'POST',
                body: initialCategory
            }),
            invalidatesTags: ['Category']
        }),
        updateCategory: builder.mutation({
            query: editedCategory => ({
                url: `/category/${editedCategory._id}`,
                method: 'PATCH',
                body: editedCategory,
            }),
            invalidatesTags: ['Category'],
        }),
        removeCategory: builder.mutation({
            query: catId => ({
                url: `/category/${catId}`,
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
    useRegisterUserMutation,
    useGetAllUsersQuery,
    useUpdateUserMutation,
    useRemoveUserMutation,
    useChangeUserPasswordMutation,
    useGetCategoriesQuery,
    useAddNewCategoryMutation,
    useRemoveCategoryMutation,
    useUpdateCategoryMutation,
    useGetMenusQuery,
    useAddNewMenuMutation,
    useUpdateMenuMutation,
    useRemoveMenuMutation
} = apiSlice;
