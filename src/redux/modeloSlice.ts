import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modelo: [],
};

export const modeloSlice = createSlice({
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

export const { setModelo, clearModelo } = modeloSlice.actions;

export default modeloSlice.reducer;
