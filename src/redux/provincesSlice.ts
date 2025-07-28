import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  province: [],
};

export const provincesSlice = createSlice({
  name: "provinces",
  initialState,
  reducers: {
    setProvinces: (state, action) => {
      state.province = action.payload;
    },
    clearProvinces: (state) => {
      state.province = [];
    },
  },
});

export const { setProvinces, clearProvinces } = provincesSlice.actions;

export default provincesSlice.reducer;
