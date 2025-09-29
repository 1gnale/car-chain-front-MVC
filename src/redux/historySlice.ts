import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface historyType {
  historial: { siniestros: Siniestro[]; revisiones: Revision[] };
}

const initialState: historyType = {
  historial: { siniestros: [], revisiones: [] },
};

export const historyPolicySlice = createSlice({
  name: "historial",
  initialState,
  reducers: {
    setHistorial: (state, action) => {
      state.historial = action.payload;
    },
    clearHistorial: (state) => {
      state.historial = { siniestros: [], revisiones: [] };
    },
    createSiniestro: (state, action: PayloadAction<Siniestro>) => {
      state.historial.siniestros.push(action.payload);
    },
  },
});

export const { setHistorial, clearHistorial, createSiniestro } =
  historyPolicySlice.actions;

export default historyPolicySlice.reducer;
