import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryProducts: [],
  searchProducts: [],
  wishListProducts: [],
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
  },
});

export const { setWishListProducts, setCategoryProducts, setSearchProducts } =
  productSlice.actions;

export default productSlice.reducer;
