import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cotizacion: [],
};

export const cotizacionSlice = createSlice({
  name: "cotizacion",
  initialState,
  reducers: {
    setCotizacion: (state, action) => {
      state.cotizacion = action.payload;
    },
    clearCotizacion: (state) => {
      state.cotizacion = [];
    },
  },
});

export const { setCotizacion, clearCotizacion } =
  cotizacionSlice.actions;

export default cotizacionSlice.reducer;
