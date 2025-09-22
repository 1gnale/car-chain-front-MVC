import { createSlice } from '@reduxjs/toolkit';

export interface TipoContratacionState {
    tipo: TipoContratacion[] | null;
}

const initialState: TipoContratacionState = {
    tipo: null,
};

const tipoContratacionSlice = createSlice({
    name: 'tipoContratacion',
    initialState,
    reducers: {
        setTipoContratacion(state, action: { payload: TipoContratacion[] }) {
            state.tipo = action.payload;
        },
        clearTipoContratacion(state) {
            state.tipo = null;
        },
    },
});

export const { setTipoContratacion, clearTipoContratacion } = tipoContratacionSlice.actions;
export default tipoContratacionSlice.reducer;