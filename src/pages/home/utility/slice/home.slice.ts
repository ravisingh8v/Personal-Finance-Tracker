import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "homeSlice",
  initialState: {
    activeTab: "1",
  },
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
  },
});

export default homeSlice.reducer;
export const { setActiveTab } = homeSlice.actions;
