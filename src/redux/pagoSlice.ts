import { createSlice } from "@reduxjs/toolkit";

interface pagoState {
  pago: Pago[];
}

const initialState: pagoState = {
  pago: [],
};

export const pagoSlice = createSlice({
  name: "pago",
  initialState,
  reducers: {
    setpagos: (state, action) => {
      state.pago = action.payload;
    },
    clearpagos: (state) => {
      state.pago = [];
    },
  },
});

export const { setpagos, clearpagos } = pagoSlice.actions;

export default pagoSlice.reducer;
