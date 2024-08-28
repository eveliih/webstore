import { createSlice } from "@reduxjs/toolkit";
import cartService from "../services/cart";
import storageService from "../services/storage";

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
        (item) => item.id !== action.payload
      );
    },
    clear: (state) => {
      state.cart = initialState.cart;
      state.cartItems = initialState.cartItems;
    },
    updateTotal: (state, action) => {
      state.cart.total = action.payload;
    },
  },
});

export const {
  setCart,
  setCartItems,
  addItem,
  removeItem,
  clear,
  updateTotal,
} = cartSlice.actions;

export const initializeCart = (userId) => {
  return async (dispatch) => {
    try {
      let cart = await cartService.getCart(userId);
      dispatch(setCart(cart));
      let cartItems = cart ? await cartService.getCartItems(cart.id) : [];
      dispatch(setCartItems(cartItems));
    } catch (error) {
      console.error("Failed to initialize cart:", error);
    }
  };
};

export const clearCart = () => {
  return async (dispatch) => {
    storageService.removeCart();
    dispatch(clear());
  };
};

export default cartSlice.reducer;
