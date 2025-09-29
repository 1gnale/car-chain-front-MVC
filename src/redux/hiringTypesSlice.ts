import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface HiringTypeState {
  tipoContratacion: TipoContratacion[];
}

const initialState: HiringTypeState = {
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
    updateTipoContratacionState: (
      state,
      action: PayloadAction<{ id: number }>
    ) => {
      const { id } = action.payload;
      state.tipoContratacion = state.tipoContratacion.map((u) =>
        u.id === id ? { ...u, activo: false } : u
      );
    },
    updateTipoContratacion: (
      state,
      action: PayloadAction<TipoContratacion>
    ) => {
      const updatedTipoContratacion = action.payload;
      state.tipoContratacion = state.tipoContratacion.map((u) =>
        u.id === updatedTipoContratacion.id ? { ...updatedTipoContratacion } : u
      );
    },
    createHiringType: (state, action: PayloadAction<TipoContratacion>) => {
      state.tipoContratacion = [...state.tipoContratacion, action.payload];
    },
  },
});

export const {
  setTipoContratacion,
  clearTipoContratacion,
  updateTipoContratacion,
  updateTipoContratacionState,
  createHiringType,
} = lineaCotizacionSlice.actions;

export default lineaCotizacionSlice.reducer;
