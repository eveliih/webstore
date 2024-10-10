import { createSlice } from "@reduxjs/toolkit";
import cartService from "../services/cart";
import storageService from "../services/storage";

const initialState = {
  cart: storageService.loadCart() || null,
  cartItems: storageService.loadCartItems() || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
      storageService.saveCart(state.cart);
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
      storageService.saveCartItems(state.cartItems);
    },
    addItem: (state, action) => {
      state.cartItems.push(action.payload);
      storageService.saveCartItems(state.cartItems);
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      storageService.saveCartItems(state.cartItems);
    },
    clear: (state) => {
      state.cart = initialState.cart;
      state.cartItems = initialState.cartItems;
      storageService.saveCart(state.cart);
      storageService.saveCartItems(state.cartItems);
    },
    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
        storageService.saveCartItems(state.cartItems);
      }
    },
  },
});

export const {
  setCart,
  setCartItems,
  addItem,
  removeItem,
  clear,
  updateItemQuantity,
} = cartSlice.actions;

export const initializeCart = (userId) => {
  return async (dispatch) => {
    try {
      const savedCart = storageService.loadCart();
      const savedCartItems = storageService.loadCartItems();

      if (savedCart) {
        dispatch(setCart(savedCart));
      }
      if (savedCartItems) {
        dispatch(setCartItems(savedCartItems));
      }

      let cart = await cartService.getCart(userId);
      if (!cart) {
        cart = await cartService.addCart(userId, 0);
      }
      dispatch(setCart(cart));
      let cartItems = cart ? await cartService.getCartItems(cart.id) : [];
      dispatch(setCartItems(cartItems));
    } catch (error) {}
  };
};

export const clearCart = () => {
  return async (dispatch) => {
    dispatch(clear());
    storageService.removeCart();
    storageService.removeCartItems();
  };
};

export default cartSlice.reducer;
