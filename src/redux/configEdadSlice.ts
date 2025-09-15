import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  configEdad: {},
};

export const configEdadSlice = createSlice({
  name: "configEdad",
  initialState,
  reducers: {
    setConfigEdad: (state, action) => {
      state.configEdad = action.payload;
    },
    clearConfigEdad: (state) => {
      state.configEdad = {};
    },
  },
});

export const { setConfigEdad, clearConfigEdad } = configEdadSlice.actions;

export default configEdadSlice.reducer;
