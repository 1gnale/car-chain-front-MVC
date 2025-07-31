import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lineaCotizacion: [],
};

export const lineaCotizacionSlice = createSlice({
  name: "lineaCotizacion",
  initialState,
  reducers: {
    setLineaCotizacion: (state, action) => {
      state.lineaCotizacion = action.payload;
    },
    clearLineaCotizacion: (state) => {
      state.lineaCotizacion = [];
    },
  },
});

export const { setLineaCotizacion, clearLineaCotizacion } =
  lineaCotizacionSlice.actions;

export default lineaCotizacionSlice.reducer;
