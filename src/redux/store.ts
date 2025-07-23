import { configureStore } from '@reduxjs/toolkit'
import brandReducer from './brandSlice';

export const store = configureStore({
    reducer: {
        brands: brandReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;