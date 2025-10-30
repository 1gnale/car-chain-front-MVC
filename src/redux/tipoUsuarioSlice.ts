import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tiposUsuario: [],
};

export const tipoUsuarioSlice = createSlice({
  name: "tipoUsuario",
  initialState,
  reducers: {
    setTipoUsuario: (state, action) => {
      state.tiposUsuario = action.payload;
    },
    clearTipoUsuario: (state) => {
      state.tiposUsuario = [];
    },
  },
});

export const { setTipoUsuario, clearTipoUsuario } = tipoUsuarioSlice.actions;

export default tipoUsuarioSlice.reducer;
