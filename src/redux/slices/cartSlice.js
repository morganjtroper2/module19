import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  cartOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
      state.cartOpen = true;
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
      state.cartOpen = state.cart.length > 0;
    },
    updateCartQuantity: (state, action) => {
      const item = state.cart.find((item) => item._id === action.payload._id);
      if (item) item.purchaseQuantity = action.payload.purchaseQuantity;
    },
    toggleCart: (state) => {
      state.cartOpen = !state.cartOpen;
    },
    clearCart: (state) => {
      state.cart = [];
      state.cartOpen = false;
    },
  },
});

export const { addToCart, removeFromCart, updateCartQuantity, toggleCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;