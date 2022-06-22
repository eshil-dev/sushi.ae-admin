import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        loginUser: builder.mutation({
            query: credential => ({
                url: 'user/login',
                method: 'POST',
                body: credential,
                validateStatus: (_, result) => (result),
            })
        })
    })
})

export const { useLoginUserMutation } = authApi;