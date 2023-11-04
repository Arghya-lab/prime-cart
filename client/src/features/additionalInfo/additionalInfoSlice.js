import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishList: [],
};

export const additionalInfoSlice = createSlice({
  name: "additionalInfo",
  initialState,
  reducers: {
    setWishList: (state, action) => {
      state.wishList = action.payload;
    },
    eraseAdditionalInfo: (state) => {
      state.wishList = [];
    },
  },
});

export const { setWishList, eraseAdditionalInfo } = additionalInfoSlice.actions;

export default additionalInfoSlice.reducer;
