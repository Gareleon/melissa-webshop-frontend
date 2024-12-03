import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import soapsApi from "./features/soaps/soapsApi";
import ordersApi from "./features/orders/ordersAPI";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [soapsApi.reducerPath]: soapsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(soapsApi.middleware, ordersApi.middleware),
});
