import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CoverageDetailState {
  coberturaDetalle: Cobertura_Detalle[];
}

const initialState: CoverageDetailState = {
  coberturaDetalle: [],
};

export const coberturaDetalleSlice = createSlice({
  name: "coberturaDetalle",
  initialState,
  reducers: {
    setCoberturaDetalle: (state, action) => {
      state.coberturaDetalle = action.payload;
    },
    clearCoberturaDetalle: (state) => {
      state.coberturaDetalle = [];
    },
    createCoverageDetalle: (
      state,
      action: PayloadAction<Cobertura_Detalle>
    ) => {
      state.coberturaDetalle = [...state.coberturaDetalle, action.payload];
    },
    updateCoberturaDetalle: (
      state,
      action: PayloadAction<Cobertura_Detalle>
    ) => {
      const updatedCobertura = action.payload;
      const index = state.coberturaDetalle.findIndex(
        (u) => u.id === updatedCobertura.id
      );

      if (index !== -1) {
        // Si existe -> actualizar
        state.coberturaDetalle[index] = { ...updatedCobertura };
      } else {
        // Si no existe -> crear
        state.coberturaDetalle = [...state.coberturaDetalle, updatedCobertura];
      }
    },
  },
});

export const {
  setCoberturaDetalle,
  clearCoberturaDetalle,
  createCoverageDetalle,
  updateCoberturaDetalle,
} = coberturaDetalleSlice.actions;

export default coberturaDetalleSlice.reducer;
