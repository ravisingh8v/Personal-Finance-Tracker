import { createSlice } from "@reduxjs/toolkit";
import type { IUiHeader } from "../../components/UiHeader";
import { APP_SLICE_INITIAL_VALUES } from "../constants/constants";

const appSlice = createSlice({
  name: "app",
  initialState: APP_SLICE_INITIAL_VALUES,
  reducers: {
    setShowHeader(state, action) {
      state.showHeader = action.payload;
    },
    setGlobalBgColor(state, action) {
      state.bgColor = action.payload;
    },
    setSubHeader(state, action: { payload: IUiHeader }) {
      state.subHeader = {
        ...APP_SLICE_INITIAL_VALUES.subHeader,
        ...action.payload,
      };
    },
  },
});

export default appSlice.reducer;
export const { setShowHeader, setGlobalBgColor, setSubHeader } =
  appSlice.actions;
