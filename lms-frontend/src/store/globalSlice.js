import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated:false
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setGlobalData: (state, action) => {
      state.globalData = action.payload;
    },
    setAuthenticated:(state,action)=>{
      state.globalData.isAuthenticated=action.payload
    }
  },
});

export const { setGlobalData, setAuthenticated } = globalSlice.actions;
export default globalSlice.reducer;
