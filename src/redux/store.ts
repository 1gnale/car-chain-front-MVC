import { configureStore } from "@reduxjs/toolkit";
import documentTypeReducer from "./documentTypeSlice";
import provincesReducer from "./provincesSlice";
import coverageAllDataReducer from "./coverageAllDataSlice";
import brandReducer from "./brandSlice";

export const store = configureStore({
  reducer: {
    brands: brandReducer,
    documentTypes: documentTypeReducer,
    provinces: provincesReducer,
    coverages: coverageAllDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;
