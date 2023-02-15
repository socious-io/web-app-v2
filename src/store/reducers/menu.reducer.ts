import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
    name: 'menu_visibility',
    initialState: { isOpen: false },
    reducers: {
        visiblity: (state, action) => {
            state.isOpen = action.payload;
        },
    },
});

export const { visiblity } = menuSlice.actions;
