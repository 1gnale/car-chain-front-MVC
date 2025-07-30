import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  configLocalidad: {},
};

export const confiLocalidadSlice = createSlice({
  name: "configLocalidad",
  initialState,
  reducers: {
    setConfigLocalidadd: (state, action) => {
      state.configLocalidad = action.payload;
    },
    clearConfigLocalidad: (state) => {
      state.configLocalidad = {};
    },
  },
});

export const { setConfigLocalidadd, clearConfigLocalidad } =
  confiLocalidadSlice.actions;

export default confiLocalidadSlice.reducer;
