import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const products = useSelector((state) => state.products);

  return (
    <div>
      <h1>Your Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item, index) => {
            const product = products.find(
              (product) => product.id === item.product_id
            );
            return (
              <li key={index}>
                {product.name} - {item.quantity} x ${product.price}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
