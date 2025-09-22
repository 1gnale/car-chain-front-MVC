import { createSlice } from '@reduxjs/toolkit';

interface PeriodoPagoState {
    periodoActual: PeriodoPago | null;
}

const initialState: PeriodoPagoState = {
    periodoActual: null,
};

const periodoPagoSlice = createSlice({
    name: 'periodoPago',
    initialState,
    reducers: {
        setPeriodoActual(state, action: { payload: PeriodoPago }) {
            state.periodoActual = action.payload;
        },
        limpiarPeriodoActual(state) {
            state.periodoActual = null;
        },
    },
});

export const { setPeriodoActual, limpiarPeriodoActual } = periodoPagoSlice.actions;
export default periodoPagoSlice.reducer;