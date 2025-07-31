import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  configAntiguedad: {},
};

export const configAntiguedadSlice = createSlice({
  name: "configAntiguedad",
  initialState,
  reducers: {
    setcConfigAntiguedad: (state, action) => {
      state.configAntiguedad = action.payload;
    },
    clearConfigAntiguedad: (state) => {
      state.configAntiguedad = {};
    },
  },
});

export const { setcConfigAntiguedad, clearConfigAntiguedad } =
  configAntiguedadSlice.actions;

export default configAntiguedadSlice.reducer;
