import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CoverageState {
  cobertura: Cobertura[];
}

const initialState: CoverageState = {
  cobertura: [],
};

export const coberturaSlice = createSlice({
  name: "cobertura",
  initialState,
  reducers: {
    setCobertura: (state, action) => {
      state.cobertura = action.payload;
    },
    clearCobertura: (state) => {
      state.cobertura = [];
    },
    updateCoberturaState: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      state.cobertura = state.cobertura.map((u) =>
        u.id === id ? { ...u, activo: false } : u
      );
    },

    updateCobertura: (state, action: PayloadAction<Cobertura>) => {
      const updatedCobertura = action.payload;
      state.cobertura = state.cobertura.map((u) =>
        u.id === updatedCobertura.id ? { ...updatedCobertura } : u
      );
    },

    createCoverage: (state, action: PayloadAction<Cobertura>) => {
      state.cobertura = [...state.cobertura, action.payload];
    },
  },
});

export const {
  setCobertura,
  clearCobertura,
  createCoverage,
  updateCobertura,
  updateCoberturaState,
} = coberturaSlice.actions;

export default coberturaSlice.reducer;
