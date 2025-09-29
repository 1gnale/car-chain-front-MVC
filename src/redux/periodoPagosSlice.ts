import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PeriodoPagoState {
  periodopago: PeriodoPago[];
}

const initialState: PeriodoPagoState = {
  periodopago: [],
};

const periodoPagosSlice = createSlice({
  name: "periodoPago",
  initialState,
  reducers: {
    setPeriodoPago: (state, action) => {
      state.periodopago = action.payload;
    },
    clearPeriodoPago: (state) => {
      state.periodopago = [];
    },
    updatePeriodoPagoState: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      state.periodopago = state.periodopago.map((u) =>
        u.id === id ? { ...u, activo: false } : u
      );
    },

    updatePeriodoPago: (state, action: PayloadAction<PeriodoPago>) => {
      const updatedPeriodoPago = action.payload;
      state.periodopago = state.periodopago.map((u) =>
        u.id === updatedPeriodoPago.id ? { ...updatedPeriodoPago } : u
      );
    },

    createPaymentPeriod: (state, action: PayloadAction<PeriodoPago>) => {
      state.periodopago = [...state.periodopago, action.payload];
    },
  },
});

export const {
  setPeriodoPago,
  clearPeriodoPago,
  updatePeriodoPago,
  updatePeriodoPagoState,
  createPaymentPeriod,
} = periodoPagosSlice.actions;
export default periodoPagosSlice.reducer;
