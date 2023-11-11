import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [], // [] || [ { productId, [ imgUrls ], name, price: { mrp, selling }, quantity } ]
  deliveryAddress: null,
  paymentMethod: null,
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setDeliveryAddress: (state, action) => {
      state.deliveryAddress = action.payload;
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
  },
});

export const { setProducts, setDeliveryAddress, setPaymentMethod } = checkoutSlice.actions;

export default checkoutSlice.reducer;
