import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modelo: [],
};

export const marcaSlice = createSlice({
  name: "modelo",
  initialState,
  reducers: {
    setModelo: (state, action) => {
      state.modelo = action.payload;
    },
    clearModelo: (state) => {
      state.modelo = [];
    },
  },
});

export const { setModelo, clearModelo } = marcaSlice.actions;

export default marcaSlice.reducer;
