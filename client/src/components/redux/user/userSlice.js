import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currUser: null,
  loading: false,
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currUser = action.payload;
      state.loading = false;
    },
    signInFailure: (state, action) => {
      state.loading = false;
    },
  },
});

export const { signInFailure, signInStart, signInSuccess } = userSlice.actions;
export default userSlice.reducer;
