import { createSlice } from "@reduxjs/toolkit";

const AuthReducer = createSlice({
  name: "AuthReducer",
  initialState: {
    status: null,
    data: null,
  },
  reducers: {
    setStatusLogin: (state, action) => {
      const { status, data } = action.payload;
      state.status = status;
      state.data = data;
    },
    delStatusLogin: (state, action) => {
      state.status = null;
      state.data = null;
    },
  },
});

export const { setStatusLogin, delStatusLogin } = AuthReducer.actions;
export default AuthReducer.reducer;
