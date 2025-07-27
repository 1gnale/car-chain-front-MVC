import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coberturaDetalle: [],
};

export const coberturaDetalleSlice = createSlice({
  name: "coberturaDetalle",
  initialState,
  reducers: {
    setCoberturaDetalle: (state, action) => {
      state.coberturaDetalle = action.payload;
    },
    clearCoberturaDetalle: (state) => {
      state.coberturaDetalle = [];
    },
  },
});

export const { setCoberturaDetalle, clearCoberturaDetalle } =
  coberturaDetalleSlice.actions;

export default coberturaDetalleSlice.reducer;
