import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { removeItem, updateTotal } from "../reducers/cartReducer";
import cartService from "../services/cart";
import EmailModal from "./EmailModal";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const total = useSelector((state) => state.cart.cart?.total || 0);
  const products = useSelector((state) => state.products);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleShowOrderDetails = () => {
    navigate("/orders");
  };

  const handleRemove = async (id) => {
    const item = cartItems.find((item) => item.id === id);
    const product = products.find((product) => product.id === item.product_id);

    dispatch(removeItem(id));

    dispatch(updateTotal(total - product.price * item.quantity));

    try {
      await cartService.deleteCartItem(id);
      await cartService.updateCartTotal(
        item.cart_id,
        total - product.price * item.quantity
      );
    } catch (error) {
      console.error("Failed to remove item from database", error);
    }
  };

  const handlePayment = () => {
    setShowModal(true);
  };

  return (
    <Container>
      <h1>Your Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <Row>
          <Col md={8}>
            {cartItems.map((item, index) => {
              const product = products.find(
                (product) => product.id === item.product_id
              );
              return (
                <Card key={index} className="mb-4">
                  <Card.Body className="d-flex align-items-center">
                    <Card.Img
                      variant="left"
                      src={product.image.url}
                      alt={product.image.alt}
                      className="cart-item-image"
                    />
                    <div className="flex-grow-1 ms-3">
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>
                        Price: {product.price} € <br />
                        Quantity: {item.quantity} <br />
                        Total: {product.price * item.quantity} €
                      </Card.Text>
                    </div>
                    <Button
                      variant="danger"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Total Sum</Card.Title>
                <Card.Text>{total.toFixed(2)} €</Card.Text>
                <Button variant="success" onClick={handlePayment}>
                  Order
                </Button>
              </Card.Body>
            </Card>
            <Button
              variant="outline-dark"
              onClick={handleShowOrderDetails}
              className="orders-btn"
            >
              Order history
            </Button>
          </Col>
        </Row>
      ) : (
        <>
          <p>Your cart is empty.</p>
          <Button
            variant="outline-dark"
            onClick={handleShowOrderDetails}
            className="orders-btn"
          >
            Order history
          </Button>
        </>
      )}

      <EmailModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        total={total}
      />
    </Container>
  );
};

export default Cart;
