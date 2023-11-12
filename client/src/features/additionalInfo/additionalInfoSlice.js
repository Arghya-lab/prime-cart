import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishList: [],
  addresses: [],
  addressToUpdate: {},
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
    setAddressToUpdate: (state, action) => {
      const id = action.payload;
      const address = state.addresses.find((address) => address._id === id);
      if (address) {
        state.addressToUpdate = {
          fullName: address.fullName,
          mobileNumber: address.mobileNumber,
          pinCode: address.pinCode,
          landmark: address.landmark,
          area: address.area,
          city: address.city,
          state: address.state,
          isDefault: address.isDefault,
        };
      } else {
        state.addressToUpdate = {};
      }
    },
    updateAddress: (state, action) => {
      state.addresses = state.addresses.map((address) => {
        if (address._id === action.payload._id) {
          return action.payload;
        } else {
          return address;
        }
      });
    },
    setExpendedCheckoutAccordion: (state, action) => {
      state.expendedCheckoutAccordion = action.payload;
    },
  },
});

export const {
  setWishList,
  setAddresses,
  addNewAddress,
  setAddressToUpdate,
  updateAddress,
  setExpendedCheckoutAccordion,
} = additionalInfoSlice.actions;

export default additionalInfoSlice.reducer;
