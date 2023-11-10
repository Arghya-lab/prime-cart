import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [], // [] || [ { productId, [ imgUrls ], name, price: { mrp, selling }, quantity } ]
  address: null,
};

export const checkoutSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { setProducts, setAddress } = checkoutSlice.actions;

export default checkoutSlice.reducer;
