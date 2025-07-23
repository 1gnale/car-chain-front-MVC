import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    brand: [],
};

export const brandSlice = createSlice({
    name: "brand",
    initialState,
    reducers: {
        setBrands: (state, action) => {
            state.brand = action.payload;
        },
        clearBrands: (state) => {
            state.brand = [];
        },
    },
});


export const { setBrands, clearBrands } = brandSlice.actions;

export default brandSlice.reducer;