import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [], // [] || [ { productId, [ imgUrls ], name, price: { mrp, selling }, quantity } ]
  productIds: [],
  totalProductsPrice: 0,
  totalDeliveryCharge: 0,
  deliveryAddress: null,
  paymentMethod: null,
  paymentId: null,
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.productIds = action.payload.map((elem) => {
        return elem.productId;
      });
      state.totalProductsPrice = action.payload.reduce((prev, elem) => {
        return prev + elem.price.selling;
      }, 0);
      state.totalDeliveryCharge =
        action.payload.reduce((prev, elem) => {
          if (elem.price.selling < 500) return prev + 40;
        }, 0) || 0;
    },
    setDeliveryAddress: (state, action) => {
      state.deliveryAddress = action.payload;
    },
    setPayment: (state, action) => {
      const { paymentMethod, paymentId } = action.payload;
      state.paymentMethod = paymentMethod
      state.paymentMethod = paymentId
    },
  },
});

export const { setProducts, setDeliveryAddress, setPayment } =
  checkoutSlice.actions;

export default checkoutSlice.reducer;
