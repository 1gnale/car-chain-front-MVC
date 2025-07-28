import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  marca: [],
};

export const marcaSlice = createSlice({
  name: "marca",
  initialState,
  reducers: {
    setMarcas: (state, action) => {
      state.marca = action.payload;
    },
    clearMarcas: (state) => {
      state.marca = [];
    },
  },
});

export const { setMarcas, clearMarcas } = marcaSlice.actions;

export default marcaSlice.reducer;
