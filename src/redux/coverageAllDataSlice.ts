import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coverage: [],
};

export const coverageAllDataSlice = createSlice({
  name: "coverage",
  initialState,
  reducers: {
    setCoveragesAllData: (state, action) => {
      state.coverage = action.payload;
    },
    clearCoveragesAllData: (state) => {
      state.coverage = [];
    },
  },
});

export const { setCoveragesAllData, clearCoveragesAllData } =
  coverageAllDataSlice.actions;

export default coverageAllDataSlice.reducer;
