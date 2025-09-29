import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ConfigAntiguedadState {
  configAntiguedad: ConfigAntiguedad[];
}

const initialState: ConfigAntiguedadState = {
  configAntiguedad: [],
};

export const configAntiguedadSlice = createSlice({
  name: "configAntiguedad",
  initialState,
  reducers: {
    setConfigsAntiguedad: (state, action) => {
      state.configAntiguedad = action.payload;
    },

    clearConfigAntiguedad: (state) => {
      state.configAntiguedad = [];
    },

    updateConfigAntiguedadState: (
      state,
      action: PayloadAction<{ id: number }>
    ) => {
      const { id } = action.payload;
      state.configAntiguedad = state.configAntiguedad.map((u) =>
        u.id === id ? { ...u, activo: false } : u
      );
    },

    updateConfigAntiguedad: (
      state,
      action: PayloadAction<ConfigAntiguedad>
    ) => {
      const updatedDetalle = action.payload;
      state.configAntiguedad = state.configAntiguedad.map((u) =>
        u.id === updatedDetalle.id ? { ...updatedDetalle } : u
      );
    },

    createConfigAntiguedad: (
      state,
      action: PayloadAction<ConfigAntiguedad>
    ) => {
      state.configAntiguedad = [...state.configAntiguedad, action.payload];
    },
  },
});

export const {
  setConfigsAntiguedad,
  clearConfigAntiguedad,
  updateConfigAntiguedad,
  updateConfigAntiguedadState,
  createConfigAntiguedad,
} = configAntiguedadSlice.actions;

export default configAntiguedadSlice.reducer;
