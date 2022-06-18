import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import menusReducer from '../features/menus/menusSlice';
import { apiSlice } from '../features/api/apiSlice';

export default configureStore({
    reducer: {
        menus: menusReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware()
        .concat(apiSlice.middleware)
});