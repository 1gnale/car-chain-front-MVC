import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface DetailState {
  detalle: Detalle[];
}

const initialState: DetailState = {
  detalle: [],
};

export const detallesSlice = createSlice({
  name: "detalle",
  initialState,
  reducers: {
    setDetalles: (state, action) => {
      state.detalle = action.payload;
    },

    clearDetalles: (state) => {
      state.detalle = [];
    },

    updateDetalleState: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      state.detalle = state.detalle.map((u) =>
        u.id === id ? { ...u, activo: false } : u
      );
    },

    updateDetalle: (state, action: PayloadAction<Detalle>) => {
      const updatedDetalle = action.payload;
      state.detalle = state.detalle.map((u) =>
        u.id === updatedDetalle.id ? { ...updatedDetalle } : u
      );
    },

    createDetail: (state, action: PayloadAction<Detalle>) => {
      state.detalle = [...state.detalle, action.payload];
    },
  },
});

export const {
  setDetalles,
  clearDetalles,
  updateDetalle,
  updateDetalleState,
  createDetail,
} = detallesSlice.actions;

export default detallesSlice.reducer;
