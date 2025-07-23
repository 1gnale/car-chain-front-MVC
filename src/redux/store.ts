import { configureStore } from "@reduxjs/toolkit";
import documentTypeReducer from "./documentTypeSlice";
import brandReducer from "./brandSlice";
export const store = configureStore({
  reducer: {
    brands: brandReducer,
    documentTypes: documentTypeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;
