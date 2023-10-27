import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  token: "",
  sellerToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCustomerLogin: (state, action) => {
      // const { name, email, token } = action.payload;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.name = "";
      state.email = "";
      state.token = "";
      state.sellerToken = "";
    },
    setSellerToken: (state, action) => {
      state.sellerToken = action.payload.sellerToken;
    }
  },
});

export const { setCustomerLogin, setLogout, setSellerToken } = authSlice.actions;

export default authSlice.reducer;
