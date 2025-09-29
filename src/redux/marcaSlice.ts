import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface MarcaState {
  marca: Marca[];
}

const initialState: MarcaState = {
  marca: [],
};

export const marcaSlice = createSlice({
  name: "marca",
  initialState,
  reducers: {
    setMarcas: (state, action) => {
      state.marca = action.payload;
    },
    clearMarcas: (state) => {
      state.marca = [];
    },

    updateMarcaState: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      state.marca = state.marca.map((u) =>
        u.id === id ? { ...u, activo: false } : u
      );
    },

    updateMarca: (state, action: PayloadAction<Marca>) => {
      const updatedMarca = action.payload;
      state.marca = state.marca.map((u) =>
        u.id === updatedMarca.id ? { ...updatedMarca } : u
      );
    },

    createBrand: (state, action: PayloadAction<Marca>) => {
      state.marca = [...state.marca, action.payload];
    },
  },
});

export const {
  setMarcas,
  clearMarcas,
  createBrand,
  updateMarca,
  updateMarcaState,
} = marcaSlice.actions;

export default marcaSlice.reducer;
