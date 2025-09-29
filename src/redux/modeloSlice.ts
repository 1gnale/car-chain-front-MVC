import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface ModeloState {
  modelo: Modelo[];
}

const initialState: ModeloState = {
  modelo: [],
};

export const modeloSlice = createSlice({
  name: "modelo",
  initialState,
  reducers: {
    setModelo: (state, action) => {
      state.modelo = action.payload;
    },
    clearModelo: (state) => {
      state.modelo = [];
    },

    updateModeloState: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      state.modelo = state.modelo.map((u) =>
        u.id === id ? { ...u, activo: false } : u
      );
    },

    updateModelo: (state, action: PayloadAction<Modelo>) => {
      const updatedModelo = action.payload;
      state.modelo = state.modelo.map((u) =>
        u.id === updatedModelo.id ? { ...updatedModelo } : u
      );
    },

    createModel: (state, action: PayloadAction<Modelo>) => {
      state.modelo = [...state.modelo, action.payload];
    },
  },
});

export const {
  setModelo,
  clearModelo,
  updateModelo,
  updateModeloState,
  createModel,
} = modeloSlice.actions;

export default modeloSlice.reducer;
