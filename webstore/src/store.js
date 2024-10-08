import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";
import filterReducer from "./reducers/filterReducer";
import selectedProductReducer from "./reducers/selectedProductReducer";
import notification from "./reducers/notificationReducer";
import user from "./reducers/userReducer";
import cartReducer from "./reducers/cartReducer";

const store = configureStore({
  reducer: {
    products: productReducer,
    filter: filterReducer,
    selectedProduct: selectedProductReducer,
    notification: notification,
    user: user,
    cart: cartReducer,
  },
});

export default store;
