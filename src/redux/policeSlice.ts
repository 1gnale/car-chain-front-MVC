import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
  },
});

export const { setPoliza, cleaPoliza } = policeSlice.actions;

export default policeSlice.reducer;
