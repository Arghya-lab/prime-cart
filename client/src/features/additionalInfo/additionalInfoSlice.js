import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishList: [],
  expendedCheckoutAccordion: "address",
  loadingProgress: 0,
};

export const additionalInfoSlice = createSlice({
  name: "additionalInfo",
  initialState,
  reducers: {
    setWishList: (state, action) => {
      state.wishList = action.payload;
    },
    setExpendedCheckoutAccordion: (state, action) => {
      state.expendedCheckoutAccordion = action.payload;
    },
    setLoadingProgress: (state, action) => {
      state.loadingProgress = action.payload;
    },
  },
});

export const { setWishList, setExpendedCheckoutAccordion, setLoadingProgress } =
  additionalInfoSlice.actions;

export default additionalInfoSlice.reducer;
