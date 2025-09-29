import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface VersionState {
  version: Version[];
}

const initialState: VersionState = {
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

    updateVersionState: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      state.version = state.version.map((u) =>
        u.id === id ? { ...u, activo: false } : u
      );
    },

    updateVersion: (state, action: PayloadAction<Version>) => {
      const updatedVersion = action.payload;
      state.version = state.version.map((u) =>
        u.id === updatedVersion.id ? { ...updatedVersion } : u
      );
    },

    createVersion: (state, action: PayloadAction<Version>) => {
      state.version = [...state.version, action.payload];
    },
  },
});

export const {
  setVersion,
  clearVersion,
  updateVersion,
  updateVersionState,
  createVersion,
} = versionSlice.actions;

export default versionSlice.reducer;
