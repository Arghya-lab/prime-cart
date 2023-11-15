import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import additionalInfoSlice from "../features/additionalInfo/additionalInfoSlice";
import addressSlice from "../features/address/addressSlice";
import productSlice from "../features/product/productSlice";
import cartSlice from "../features/cart/cartSlice";
import checkoutSlice from "../features/checkout/checkoutSlice";

const loadStateFromLocalStorage = () => {
  try {
    const authState = localStorage.getItem("primeCart");
    if (authState === null) {
      return undefined;
    }
    return JSON.parse(authState);
  } catch (error) {
    console.error("Error while loading auth info.");
    return undefined;
  }
};

const reducers = combineReducers({
  auth: authSlice,
  additionalInfo: additionalInfoSlice,
  address: addressSlice,
  product: productSlice,
  cart: cartSlice,
  checkout: checkoutSlice,
});

const store = configureStore({
  reducer: reducers,
  preloadedState: { auth: loadStateFromLocalStorage() },
});

// Subscribe to Redux store changes and save the state to local storage
store.subscribe(() => {
  const state = store.getState().auth;
  try {
    localStorage.setItem("primeCart", JSON.stringify(state));
  } catch (error) {
    console.error("Error while saving auth info.");
  }
});

export default store;
