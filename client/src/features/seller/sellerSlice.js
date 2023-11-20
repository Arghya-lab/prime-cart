import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sellerListings: [],
  sellerOrders: [],
};

export const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    setSellerListings: (state, action) => {
      state.sellerListings = action.payload;
    },
    setSellerOrders: (state, action) => {
      state.sellerOrders = action.payload;
    },
    setSellerOrderConfirm: (state, action) => {
      const id = action.payload;
      state.sellerOrders = state.sellerOrders.map((order) => {
        if (order._id === id) {
          return { ...order, status: "confirmed" };
        }
        return order
      });
    },
  },
});

export const { setSellerListings, setSellerOrders, setSellerOrderConfirm } = sellerSlice.actions;

export default sellerSlice.reducer;
