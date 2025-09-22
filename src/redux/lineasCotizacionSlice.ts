import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lineaCotizacion: [],
};

export const lineaCotizacionSlice = createSlice({
  name: "lineasCotizacion",
  initialState,
  reducers: {
    setLineasCotizacion: (state, action) => {
      state.lineaCotizacion = action.payload;
    },
    clearLineasCotizacion: (state) => {
      state.lineaCotizacion = [];
    },
  },
});

export const { setLineasCotizacion, clearLineasCotizacion } =
  lineaCotizacionSlice.actions;

export default lineaCotizacionSlice.reducer;
