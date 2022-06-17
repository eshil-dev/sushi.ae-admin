import { configureStore } from '@reduxjs/toolkit';

import categoriesReducer from '../features/categories/categoriesSlice';
import menusReducer from '../features/menus/menusSlice';

export default configureStore({
    reducer: {
        categories: categoriesReducer,
        menus: menusReducer
    }
});