import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  client: {},
};

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClient: (state, action) => {
      state.client = action.payload;
    },
    clearClient: (state) => {
      state.client = {};
    },
  },
});

export const { setClient, clearClient } = clientSlice.actions;

export default clientSlice.reducer;
