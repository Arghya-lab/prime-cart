import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  sellerListings: [],
  sellerOrders: [],
  ordersStatusCount: {
    canceled: 0,
    confirmed: 0,
    delivered: 0,
    processing: 0,
    shipping: 0,
  },
  salesAndRevenue: [],
  productUpdateId: "",
  initialUpdateValue: {
    name: "",
    category: "",
    mrp: "",
    selling: "",
    description: "",
    highlights: "",
    stock: "",
  },
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
        return order;
      });
    },
    setOrdersStatusCount: (state, action) => {
      state.ordersStatusCount = action.payload;
    },
    setSalesAndRevenue: (state, action) => {
      state.salesAndRevenue = action.payload;
    },
    setProductUpdateValue: (state, action) => {
      const data = action.payload;
      state.productUpdateId = data._id;
      state.initialUpdateValue = {
        name: data.name,
        category: data.category,
        mrp: data.price.mrp,
        selling: data.price.selling,
        description: data.description,
        highlights: data.highlights.join("\n"),
        stock: data.stock,
      };
    },
  },
});

export const {
  setSellerListings,
  setSellerOrders,
  setSellerOrderConfirm,
  setOrdersStatusCount,
  setSalesAndRevenue,
  setProductUpdateValue,
} = sellerSlice.actions;

export default sellerSlice.reducer;
