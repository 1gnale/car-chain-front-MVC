import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sexosList: [],
};

export const sexosListSlice = createSlice({
  name: "sexosList",
  initialState,
  reducers: {
    setsexosList: (state, action) => {
      state.sexosList = action.payload;
    },
    clearsexosList: (state) => {
      state.sexosList = [];
    },
  },
});

export const { setsexosList, clearsexosList } = sexosListSlice.actions;

export default sexosListSlice.reducer;
