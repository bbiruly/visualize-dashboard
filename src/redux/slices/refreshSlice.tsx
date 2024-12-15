import { createSlice } from "@reduxjs/toolkit";

const refreshSlice = createSlice({
  name: "refresh",
  initialState: { key: 0 },
  reducers: {
    triggerRefresh: (state) => {
      state.key += 1;
    },
  },
});

export const { triggerRefresh } = refreshSlice.actions;
export default refreshSlice.reducer;
