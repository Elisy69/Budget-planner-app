import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

const mockDataSlice = createSlice({
  name: "mockDataLoaded",
  initialState: initialState,
  reducers: {
    switchMockDataLoaded() {
      return true;
    },
  },
});

export const { switchMockDataLoaded } = mockDataSlice.actions;

export default mockDataSlice.reducer;
