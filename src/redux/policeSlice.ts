import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PolizaState {
  poliza: Poliza[];
}

const initialState: PolizaState = {
  poliza: [],
};

export const policeSlice = createSlice({
  name: "poliza",
  initialState,
  reducers: {
    setPoliza: (state, action) => {
      state.poliza = action.payload;
    },
    cleaPoliza: (state) => {
      state.poliza = [];
    },
    updatePolizaState: (
      state,
      action: PayloadAction<{ id: number; estado: string }>
    ) => {
      const { id, estado } = action.payload;
      state.poliza = state.poliza.map((u) =>
        u.numero_poliza === id ? { ...u, estadoPoliza: estado } : u
      );
    },
  },
});

export const { setPoliza, cleaPoliza, updatePolizaState } = policeSlice.actions;

export default policeSlice.reducer;
