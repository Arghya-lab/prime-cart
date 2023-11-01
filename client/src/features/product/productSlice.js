import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryProducts: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCategoryProducts: (state, action) => {
      state.categoryProducts = action.payload;
    },
  },
});

export const { setCategoryProducts, } = productSlice.actions;

export default productSlice.reducer;