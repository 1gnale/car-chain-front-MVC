import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  configEdad: [],
};

export const configEdadSlice = createSlice({
  name: "configEdad",
  initialState,
  reducers: {
    setcConfigEdad: (state, action) => {
      state.configEdad = action.payload;
    },
    clearConfigEdad: (state) => {
      state.configEdad = [];
    },
  },
});

export const { setcConfigEdad, clearConfigEdad } = configEdadSlice.actions;

export default configEdadSlice.reducer;
