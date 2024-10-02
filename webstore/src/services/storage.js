const KEY = "LoggedInUser";
const CART = "LoggedUserCart";
const CARTITEMS = "LoggedUserCartItems";

const saveUser = (user) => {
  localStorage.setItem(KEY, JSON.stringify(user));
};

const loadUser = () => {
  return JSON.parse(window.localStorage.getItem(KEY));
};

const removeUser = () => {
  localStorage.removeItem(KEY);
};

const saveCart = (cart) => {
  localStorage.setItem(CART, JSON.stringify(cart));
};

const loadCart = () => {
  return JSON.parse(window.localStorage.getItem(CART));
};

const removeCart = () => {
  localStorage.removeItem(CART);
};

const saveCartItems = (cartItems) => {
  localStorage.setItem(CARTITEMS, JSON.stringify(cartItems));
};

const loadCartItems = () => {
  return JSON.parse(window.localStorage.getItem(CARTITEMS));
};

const removeCartItems = () => {
  localStorage.removeItem(CARTITEMS);
};

export default {
  saveUser,
  loadUser,
  removeUser,
  saveCart,
  loadCart,
  saveCartItems,
  loadCartItems,
  removeCartItems,
  removeCart,
};
