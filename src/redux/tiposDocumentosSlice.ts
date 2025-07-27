import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tipoDocumento: [],
};

export const tipoDocumentoSlice = createSlice({
  name: "tipoDocumento",
  initialState,
  reducers: {
    setTipoDocumento: (state, action) => {
      state.tipoDocumento = action.payload;
    },
    clearTipoDocumento: (state) => {
      state.tipoDocumento = [];
    },
  },
});

export const { setTipoDocumento, clearTipoDocumento } =
  tipoDocumentoSlice.actions;

export default tipoDocumentoSlice.reducer;
