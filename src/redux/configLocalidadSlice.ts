import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ConfigLocalidadState {
  configLocalidad: ConfigLocalidad[];
}

const initialState: ConfigLocalidadState = {
  configLocalidad: [],
};

export const confiLocalidadSlice = createSlice({
  name: "configLocalidad",
  initialState,
  reducers: {
    setConfigsLocalidad: (state, action) => {
      state.configLocalidad = action.payload;
    },

    clearCondigLocalidad: (state) => {
      state.configLocalidad = [];
    },

    updateStateConfigLocalidad: (
      state,
      action: PayloadAction<{ id: number }>
    ) => {
      const { id } = action.payload;
      state.configLocalidad = state.configLocalidad.map((u) =>
        u.id === id ? { ...u, activo: false } : u
      );
    },

    updateConfigLocalidad: (state, action: PayloadAction<ConfigLocalidad>) => {
      const updatedDetalle = action.payload;
      state.configLocalidad = state.configLocalidad.map((u) =>
        u.id === updatedDetalle.id ? { ...updatedDetalle } : u
      );
    },

    createConfigLocalidad: (state, action: PayloadAction<ConfigLocalidad>) => {
      state.configLocalidad = [...state.configLocalidad, action.payload];
    },
  },
});

export const {
  setConfigsLocalidad,
  clearCondigLocalidad,
  createConfigLocalidad,
  updateConfigLocalidad,
  updateStateConfigLocalidad,
} = confiLocalidadSlice.actions;

export default confiLocalidadSlice.reducer;
