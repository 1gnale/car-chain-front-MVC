import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  version: [],
};

export const versionSlice = createSlice({
  name: "version",
  initialState,
  reducers: {
    setVersion: (state, action) => {
      state.version = action.payload;
    },
    clearVersion: (state) => {
      state.version = [];
    },
  },
});

export const { setVersion, clearVersion } = versionSlice.actions;

export default versionSlice.reducer;
