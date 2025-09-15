import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tipoContratacion: [],
};

export const lineaCotizacionSlice = createSlice({
  name: "tipoContratacion",
  initialState,
  reducers: {
    setTipoContratacion: (state, action) => {
      state.tipoContratacion = action.payload;
    },
    clearTipoContratacion: (state) => {
      state.tipoContratacion = [];
    },
  },
});

export const { setTipoContratacion, clearTipoContratacion } =
  lineaCotizacionSlice.actions;

export default lineaCotizacionSlice.reducer;
