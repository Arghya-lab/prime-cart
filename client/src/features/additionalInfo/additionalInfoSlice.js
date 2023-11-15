import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishList: [],
  expendedCheckoutAccordion: "address",
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
  },
});

export const { setWishList, setExpendedCheckoutAccordion } =
  additionalInfoSlice.actions;

export default additionalInfoSlice.reducer;
