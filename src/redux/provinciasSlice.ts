import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  provincia: [],
};

export const provinciaSlice = createSlice({
  name: "provincia",
  initialState,
  reducers: {
    setProvincias: (state, action) => {
      state.provincia = action.payload;
    },
    clearProvincias: (state) => {
      state.provincia = [];
    },
  },
});

export const { setProvincias, clearProvincias } = provinciaSlice.actions;

export default provinciaSlice.reducer;
