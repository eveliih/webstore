import axios from "axios";
const cartUrl = import.meta.env.VITE_CART_URL;
const cartItemUrl = import.meta.env.VITE_CARTITEM_URL;

const addCart = async (userId, total) => {
  try {
    const response = await axios.post(cartUrl, { user_id: userId, total });

    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteCart = async (cartId) => {
  try {
    const response = await axios.delete(`${cartUrl}/${cartId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const addItemToCart = async (cart_id, product_id, quantity) => {
  try {
    const response = await axios.post(cartItemUrl, {
      cart_id,
      product_id,
      quantity,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

const getCart = async (userId) => {
  try {
    const response = await axios.get(`${cartUrl}/user/${userId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    } else {
      console.error("Error fetching cart:", error);
      throw error;
    }
  }
};
const getCartItems = async (cartId) => {
  try {
    const response = await axios.get(`${cartItemUrl}/cart/${cartId}`);
    return response.data || [];
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return [];
    }
    throw error;
  }
};

const updateCartTotal = async (cartId, total) => {
  try {
    const response = await axios.put(`${cartUrl}/${cartId}`, { total });

    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteCartItem = async (cartItemId) => {
  try {
    console.log(`${cartItemUrl}/${cartItemId}`);
    const response = await axios.delete(`${cartItemUrl}/${cartItemId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateItemQuantity = async (cartItemId, quantity) => {
  try {
    const response = await axios.put(`${cartItemUrl}/${cartItemId}`, {
      quantity,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  addCart,
  addItemToCart,
  getCart,
  updateCartTotal,
  getCartItems,
  deleteCartItem,
  updateItemQuantity,
  deleteCart,
};
