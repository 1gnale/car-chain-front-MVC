import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ConfigEdadState {
  configEdad: ConfigEdad[];
}

const initialState: ConfigEdadState = {
  configEdad: [],
};

export const configEdadSlice = createSlice({
  name: "configEdad",
  initialState,
  reducers: {
    setConfigsEdad: (state, action) => {
      state.configEdad = action.payload;
    },

    clearCondigEdad: (state) => {
      state.configEdad = [];
    },

    updateStateConfigEdad: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      state.configEdad = state.configEdad.map((u) =>
        u.id === id ? { ...u, activo: false } : u
      );
    },

    updateConfigEdad: (state, action: PayloadAction<ConfigEdad>) => {
      const updatedDetalle = action.payload;
      state.configEdad = state.configEdad.map((u) =>
        u.id === updatedDetalle.id ? { ...updatedDetalle } : u
      );
    },

    createConfigEdad: (state, action: PayloadAction<ConfigEdad>) => {
      state.configEdad = [...state.configEdad, action.payload];
    },
  },
});

export const {
  setConfigsEdad,
  clearCondigEdad,
  updateConfigEdad,
  updateStateConfigEdad,
  createConfigEdad,
} = configEdadSlice.actions;

export default configEdadSlice.reducer;
