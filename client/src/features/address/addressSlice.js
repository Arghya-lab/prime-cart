import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addresses: [],
  addressToUpdate: {},
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddresses: (state, action) => {
      state.addresses = action.payload;
    },
    addNewAddress: (state, action) => {
      state.addresses.push(action.payload);
    },
    setToDefaultAddress: (state, action) => {
      const id = action.payload;
      state.addresses = state.addresses.map((address) => {
        if (address._id !== id) {
          return { ...address, isDefault: false };
        } else {
          return { ...address, isDefault: true };
        }
      });
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
    deleteAddress: (state, action) => {
      const id = action.payload;
      state.addresses = state.addresses.filter((address) => {
        return address._id !== id;
      });
    },
  },
});

export const {
  setAddresses,
  addNewAddress,
  setToDefaultAddress,
  setAddressToUpdate,
  updateAddress,
  deleteAddress,
} = addressSlice.actions;

export default addressSlice.reducer;
