import { nanoid, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";

const initialState = [
    {
        id: 1,
        avatar: user1,
        name: "Hanna Gover",
        description: "some description about category",
        status: "pending",
        available: false,
    },
    {
        id: 2,
        avatar: user2,
        name: "Hanna Gover",
        description: "some description about category",
        available: true,
    },
    {
        id: 3,
        avatar: user3,
        name: "Hanna Gover",
        description: "some description about category",
        available: false,
    },
    {
        id: 4,
        avatar: user4,
        name: "Hanna Gover",
        description: "some description about category",
        available: false,
    },
    {
        id: 5,
        avatar: user5,
        name: "Hanna Gover",
        description: "some description about category",
        available: true,
    },
];

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        categoryAdded: (state, action) => {
            state.push(action.payload);
        },
        categoryRemoved: (state, action) => {
            return state.filter((item) => item.id !== action.payload)
        }
    }
});

export default categoriesSlice.reducer;

export const { categoryAdded, categoryRemoved } = categoriesSlice.actions; 