import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  documentType: [],
};

export const documentTypeSlice = createSlice({
  name: "Document Type",
  initialState,
  reducers: {
    setDocumentTypes: (state, action) => {
      state.documentType = action.payload;
    },
    clearDocumentTypes: (state) => {
      state.documentType = [];
    },
  },
});

export const { setDocumentTypes, clearDocumentTypes } =
  documentTypeSlice.actions;

export default documentTypeSlice.reducer;
