import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: null, // null || [ { productId, [ imgUrls ], name, price: { mrp, selling }, quantity } ]
  totalPrice: 0,
  totalCount: 0,
};

const updateTotalPriceAndCount = (state) => {
  state.totalPrice = state.products.reduce((total, product) => {
    return (total += product.price.selling * product.quantity);
  }, 0);
  state.totalCount = state.products.reduce((total, product) => {
    return (total += product.quantity);
  }, 0);
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartProduct: (state, action) => {
      const products = action.payload;
      //  setting cart products
      state.products = products;
      //  setting total cost & product count of cart
      updateTotalPriceAndCount(state);
    },
    changeProductQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      // Find the product in the products array
      const productToUpdate = state.products.find(
        (product) => product.productId === productId
      );
      // If the product is found, update its quantity
      if (productToUpdate) {
        productToUpdate.quantity = quantity;
      }
      // Update total price and total count
      updateTotalPriceAndCount(state);
    },
    removeDeletedProduct: (state, action) => {
      const deleteProductId = action.payload;
      const updatedProducts = state.products.filter(
        (product) => product.productId !== deleteProductId
      );
      state.products = updatedProducts;
      // Update total price and total count
      updateTotalPriceAndCount(state);
    },
  },
});

export const { setCartProduct, changeProductQuantity, removeDeletedProduct } =
  cartSlice.actions;

export default cartSlice.reducer;
