import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  // Access cart items from the Redux state
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <div>
      <h1>Your Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.name} - {item.quantity} x ${item.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
