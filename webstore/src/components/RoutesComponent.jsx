import { Route, Routes } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import Products from "./Products";
import Cart from "./Cart";
import ThankYou from "./ThankYou";
import Orders from "./Orders";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/:category/:name/:id" element={<ProductDetails />} />
      <Route path="/:category" element={<Products />} />
      <Route path="/products" element={<Products />} />
      <Route path="/" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
};

export default RoutesComponent;
