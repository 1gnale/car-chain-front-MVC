import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cobertura: [],
};

export const coberturaSlice = createSlice({
  name: "cobertura",
  initialState,
  reducers: {
    setCobertura: (state, action) => {
      state.cobertura = action.payload;
    },
    clearCobertura: (state) => {
      state.cobertura = [];
    },
  },
});

export const { setCobertura, clearCobertura } = coberturaSlice.actions;

export default coberturaSlice.reducer;
