import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  detalles: [],
};

export const detallesSlice = createSlice({
  name: "detalles",
  initialState,
  reducers: {
    setDetalles: (state, action) => {
      state.detalles = action.payload;
    },
    clearDetalles: (state) => {
      state.detalles = [];
    },
  },
});

export const { setDetalles, clearDetalles } = detallesSlice.actions;

export default detallesSlice.reducer;
