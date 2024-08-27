import { createSlice } from "@reduxjs/toolkit";
import cartService from "../services/cart";

const initialState = {
  cart: null,
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    addItem: (state, action) => {
      state.cartItems.push(action.payload);
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { setCart, setCartItems, addItem, removeItem } = cartSlice.actions;

export const initializeCart = (userId) => {
  return async (dispatch) => {
    const cart = await cartService.getCart(userId);
    dispatch(setCart(cart));
    const cartItems = await cartService.getCartItems(cart.id);
    dispatch(setCartItems(cartItems));
  };
};

export default cartSlice.reducer;
