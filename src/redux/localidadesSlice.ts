import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  localidad: [],
};

export const localidadciaSlice = createSlice({
  name: "localidad",
  initialState,
  reducers: {
    setLocalidad: (state, action) => {
      state.localidad = action.payload;
    },
    clearLocalidad: (state) => {
      state.localidad = [];
    },
  },
});

export const { setLocalidad, clearLocalidad } = localidadciaSlice.actions;

export default localidadciaSlice.reducer;
