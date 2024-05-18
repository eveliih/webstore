import axios from "axios";
const cartUrl = import.meta.env.VITE_CART_URL;
const cartItemUrl = import.meta.env.VITE_CARTITEM_URL;

const addCart = async (userId, total) => {
  try {
    const response = await axios.post(cartUrl, { userId, total });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const addItemToCart = async (cart_id, product_id, quantity) => {
  try {
    console.log(cart_id, product_id, quantity);
    const response = await axios.post(cartItemUrl, {
      cart_id,
      product_id,
      quantity,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getCart = async (userId) => {
  try {
    const response = await axios.get(`${cartUrl}/user/${userId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateCartTotal = async (cartId, total) => {
  console.log(cartId, total);
  try {
    const response = await axios.put(`${cartUrl}/${cartId}`, { total });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default { addCart, addItemToCart, getCart, updateCartTotal };
