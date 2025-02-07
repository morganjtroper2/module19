import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice"; // Ensure this exists
import categoryReducer from "./slices/categorySlice"; // Ensure this exists
import productReducer from "./slices/productSlice"; // Ensure this exists

const store = configureStore({
  reducer: {
    cart: cartReducer,
    category: categoryReducer,
    product: productReducer,
  },
});

export default store;