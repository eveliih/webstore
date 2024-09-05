import axios from "axios";
const orderUrl = import.meta.env.VITE_ORDER_URL;
const orderItemUrl = import.meta.env.VITE_ORDERITEM_URL;

const addOrder = async (userId, total, status) => {
  try {
    const response = await axios.post(orderUrl, {
      user_id: userId,
      total,
      status,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const addItemToOrder = async (order_id, product_id, quantity) => {
  try {
    const response = await axios.post(orderItemUrl, {
      order_id,
      product_id,
      quantity,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getOrder = async (userId) => {
  try {
    const response = await axios.get(`${orderUrl}/user/${userId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    } else {
      console.error("Error fetching order:", error);
      throw error;
    }
  }
};

const getOrderItems = async (orderId) => {
  try {
    const response = await axios.get(`${orderItemUrl}/order/${orderId}`);
    return response.data || [];
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return [];
    }
    throw error;
  }
};

const updateOrderTotal = async (orderId, total) => {
  try {
    const response = await axios.put(`${orderUrl}/${orderId}`, { total });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteOrderItem = async (orderItemId) => {
  try {
    const response = await axios.delete(`${orderItemUrl}/${orderItemId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateItemQuantity = async (orderItemId, quantity) => {
  try {
    const response = await axios.put(`${orderItemUrl}/${orderItemId}`, {
      quantity,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  addOrder,
  addItemToOrder,
  getOrder,
  getOrderItems,
  updateOrderTotal,
  deleteOrderItem,
  updateItemQuantity,
};
