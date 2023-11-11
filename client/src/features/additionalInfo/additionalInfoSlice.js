import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishList: [],
  addresses: [],
  expendedCheckoutAccordion: "address",
};

export const additionalInfoSlice = createSlice({
  name: "additionalInfo",
  initialState,
  reducers: {
    setWishList: (state, action) => {
      state.wishList = action.payload;
    },
    setAddresses: (state, action) => {
      state.addresses = action.payload;
    },
    addNewAddress: (state, action) => {
      state.addresses.push(action.payload);
    },
    setExpendedCheckoutAccordion: (state, action) => {
      state.expendedCheckoutAccordion = action.payload;
    },
  },
});

export const { setWishList, setAddresses, addNewAddress, setExpendedCheckoutAccordion } = additionalInfoSlice.actions;

export default additionalInfoSlice.reducer;
