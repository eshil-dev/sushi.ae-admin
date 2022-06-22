import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

const initialState = {
    username: '',
    email: '',
    token: localStorage.getItem('token') || '',
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: ''
}

const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOut: state => {
            state.username = ''
            state.email = ''
            state.token = ''
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => {
            if (payload.code > 200) {
                state.isError = true;
                state.isSuccess = false;
                state.errorMessage = payload.errors
            }  else {
                state.username = payload.fullName
                state.email = payload.email
                state.token = payload.token;
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.errorMessage = ''
            }
        }).addMatcher(authApi.endpoints.loginUser.matchPending, (state, action) => {
            state.isLoading = true;
        }).addMatcher(authApi.endpoints.loginUser.matchRejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.errorMessage = action.payload;
        })
    }
});

export default usersSlice;
export const { logOut } = usersSlice.actions;