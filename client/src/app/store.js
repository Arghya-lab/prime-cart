import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import authSlice from "../features/auth/authSlice";
import additionalInfoSlice from "../features/additionalInfo/additionalInfoSlice";
import productSlice from "../features/product/productSlice";
import cartSlice from "../features/cart/cartSlice";

const persistConfig = {
  key: "prime-cart",
  storage,
};

const reducers = combineReducers({
  auth: authSlice,
  additionalInfo: additionalInfoSlice,
  product: productSlice,
  cart: cartSlice,
});
const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
