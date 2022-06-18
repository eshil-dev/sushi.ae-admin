import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import user1 from "../../assets/images/users/user1.jpg";

const initialState = {
    categories: [
        {
            id: 1,
            avatar: user1,
            name: "Hanna Gover",
            description: "some description about category",
            available: true,
        },
    ],
    status: 'idle',
    error: null,
}

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (_, thunkAPI) => {
    try {
        const response = await axios.get('http://localhost:8080/api/menu/category')
        return response.data;    
    }catch(err) {
        return thunkAPI.rejectWithValue('something error happend.');
    }

});

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        categoryAdded: (state, action) => {
            state.categories.push(action.payload);
        },
        categoryRemoved: (state, action) => {
            return state.categories.filter((item) => item.id !== action.payload)
        },
        categoryUpdated: (state, action) => {
            const { catId, name, description, available } = action.payload;
            const newState = state.categories.find(cat => cat.id === catId);
            if (newState) {
                newState.name = name;
                newState.description = description;
                newState.available = available;
            }
        },

    },
    extraReducers(builder) {
        builder.addCase(fetchCategories.pending, (state) => {
            state.status = 'loading'
        }).addCase(fetchCategories.fulfilled, (state, action) => {
            state.status = 'success'
            state.categories = state.categories.concat(action.payload)
        }).addCase(fetchCategories.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        });
    }
});

export default categoriesSlice.reducer;

export const { categoryAdded, categoryRemoved, categoryUpdated } = categoriesSlice.actions; 