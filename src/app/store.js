import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { apiSlice } from '../features/api/apiSlice';
import usersSlice from '../features/users/usersSlice';

export default configureStore({
    reducer: {
        user: usersSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false})
        .concat(apiSlice.middleware)
});