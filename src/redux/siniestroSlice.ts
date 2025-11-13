import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface siniestrotate {
  siniestro: Siniestro[];
}

const initialState: siniestrotate = {
  siniestro: [],
};

const siniestroSlice = createSlice({
  name: "siniestro",
  initialState,
  reducers: {
    setSiniestro: (state, action) => {
      state.siniestro = action.payload;
    },

    clearSiniestro: (state) => {
      state.siniestro = [];
    },
    updatesiniestroStateDelete: (
      state,
      action: PayloadAction<{ id: number; estado: string }>
    ) => {
      const id = action.payload.id;
      state.siniestro = state.siniestro.map((u) =>
        u.id === id ? { ...u, estado: action.payload.estado } : u
      );
    },

    updateSiniestroState: (
      state,
      action: PayloadAction<{ id: number; estado: string }>
    ) => {
      const { id, estado } = action.payload;
      state.siniestro = state.siniestro.map((u) =>
        u.id === id ? { ...u, estado } : u
      );
    },
    createSiniestro: (state, action: PayloadAction<Siniestro>) => {
      state.siniestro = [...state.siniestro, action.payload];
    },
  },
});

export const {
  setSiniestro,
  clearSiniestro,
  updatesiniestroStateDelete,
  updateSiniestroState,
  createSiniestro,
} = siniestroSlice.actions;
export default siniestroSlice.reducer;
