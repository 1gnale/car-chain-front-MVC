import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allConfig: {},
};

export const allConfigsSlice = createSlice({
  name: "Configs",
  initialState,
  reducers: {
    setAllConfigs: (state, action) => {
      state.allConfig = action.payload;
    },
    clearAllConfigs: (state) => {
      state.allConfig = {};
    },
  },
});

export const { setAllConfigs, clearAllConfigs } = allConfigsSlice.actions;

export default allConfigsSlice.reducer;
