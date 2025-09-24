import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Definimos el tipo del estado
interface UsuariosState {
  usuario: Usuario[];
}

const initialState: UsuariosState = {
  usuario: [],
};

export const usuariosSlice = createSlice({
  name: "usuarios",
  initialState,
  reducers: {
    setUsuarios: (state, action: PayloadAction<Usuario[]>) => {
      state.usuario = action.payload;
    },
    clearUsuarios: (state) => {
      state.usuario = [];
    },
    updateUsuarioState: (state, action: PayloadAction<{ legajo: number }>) => {
      const { legajo } = action.payload;
      state.usuario = state.usuario.map((u) =>
        u.legajo === legajo ? { ...u, activo: false } : u
      );
    },
    updateUsuario: (state, action: PayloadAction<Usuario>) => {
      const updatedUsuario = action.payload;
      state.usuario = state.usuario.map((u) =>
        u.legajo === updatedUsuario.legajo ? { ...updatedUsuario } : u
      );
    },
    createUser: (state, action: PayloadAction<Usuario>) => {
      state.usuario = [...state.usuario, action.payload];
    },
  }
});


export const { setUsuarios, clearUsuarios, updateUsuarioState, updateUsuario, createUser } =
  usuariosSlice.actions;

export default usuariosSlice.reducer;
