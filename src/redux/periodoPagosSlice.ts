import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  periodoPago: [],
};

export const periodoPagoSlice = createSlice({
  name: "periodoPago",
  initialState,
  reducers: {
    setPeriodoPago: (state, action) => {
      state.periodoPago = action.payload;
    },
    clearPeriodoPago: (state) => {
      state.periodoPago = [];
    },
  },
});

export const { setPeriodoPago, clearPeriodoPago } = periodoPagoSlice.actions;

export default periodoPagoSlice.reducer;
