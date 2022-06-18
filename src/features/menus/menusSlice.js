import { createSlice } from "@reduxjs/toolkit";

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
        category: "water",
        price: 20,
        currency: 1,
        available: false,
    },
    {
        id: 2,
        avatar: user2,
        name: "Hanna Gover",
        description: "some description about category",
        category: "chicken",
        price: 20,
        currency: 1,
        available: true,
    },
    {
        id: 3,
        avatar: user3,
        name: "Hanna Gover",
        description: "some description about category",
        category: "Fast food",
        price: 20,
        currency: 1,
        available: false,
    },
    {
        id: 4,
        avatar: user4,
        name: "Hanna Gover",
        description: "some description about category",
        category: "Coca cola",
        price: 20,
        currency: 2,
        available: true,
    },
    {
        id: 5,
        avatar: user5,
        name: "Hanna Gover",
        description: "some description about category",
        category: "Fruit",
        price: 20,
        currency: 2,
        available: true,
    },
];

const menusSlice = createSlice({
    name: 'menus',
    initialState: initialState,
    reducers: {
        menuAdded: (state, action) => {
            state.push(action.payload);
        },
        menuRemoved: (state, action) => {
            const menuId = action.payload;
            return state.filter(menu => menu.id !== menuId);
        },
        menuUpdated: (state, action) => {
            console.log('Menu updated.');
        }
    }
})

export default menusSlice.reducer;
export const { menuAdded, menuRemoved, menuUpdated } = menusSlice.actions;