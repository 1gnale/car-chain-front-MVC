import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  detalle: [],
};

export const detallesSlice = createSlice({
  name: "detalle",
  initialState,
  reducers: {
    setDetalles: (state, action) => {
      state.detalle = action.payload;
    },
    clearDetalles: (state) => {
      state.detalle = [];
    },
  },
});

export const { setDetalles, clearDetalles } = detallesSlice.actions;

export default detallesSlice.reducer;
