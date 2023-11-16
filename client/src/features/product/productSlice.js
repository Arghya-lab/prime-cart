import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryProducts: [],
  searchProducts: [],
  wishListProducts: [],
  pageNo: 1,
  hasMore: true,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCategoryProducts: (state, action) => {
      state.categoryProducts = action.payload;
    },
    setSearchProducts: (state, action) => {
      state.searchProducts = action.payload;
    },
    setWishListProducts: (state, action) => {
      state.wishListProducts = action.payload;
    },
    setProductPageNo(state, action) {
      state.pageNo = action.payload;
    },
    setHasMoreProduct(state, action) {
      state.hasMore = action.payload;
    },
  },
});

export const {
  setWishListProducts,
  setCategoryProducts,
  setSearchProducts,
  setProductPageNo,
  setHasMoreProduct,
} = productSlice.actions;

export default productSlice.reducer;
