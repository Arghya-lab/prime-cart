import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryProducts: [],
  searchProducts: [],
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
  },
});

export const { setCategoryProducts, setSearchProducts } = productSlice.actions;

export default productSlice.reducer;