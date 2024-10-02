import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { removeItem, initializeCart } from "../reducers/cartReducer";
import { initializeProducts } from "../reducers/productReducer";
import cartService from "../services/cart";
import EmailModal from "./EmailModal";
import { useNavigate } from "react-router-dom";
import { initUser } from "../reducers/userReducer";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const products = useSelector((state) => state.products);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const initialize = async () => {
      dispatch(initUser());
      if (user && user.id) {
        dispatch(initializeCart(user.id));
      }
      dispatch(initializeProducts());
      setLoading(false);
    };
    initialize();
  }, [dispatch]);

  const handleShowOrderDetails = () => {
    navigate("/orders");
  };

  const handleRemove = async (id) => {
    const item = cartItems.find((item) => item.id === id);
    const product = products.find((product) => product.id === item.product_id);

    dispatch(removeItem(id));

    try {
      await cartService.deleteCartItem(id);
      await cartService.updateCartTotal(
        item.cart_id,
        calculateTotal(cartItems.filter((item) => item.id !== id))
      );
    } catch (error) {
      console.error("Failed to remove item from database", error);
    }
  };

  const handlePayment = () => {
    setShowModal(true);
  };

  const calculateTotal = (items) => {
    return items.reduce((sum, item) => {
      const product = products.find(
        (product) => product.id === item.product_id
      );
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" />
      </Container>
    );
  }

  const total = calculateTotal(cartItems);

  return (
    <Container>
      <h1 className="cart-title">Your Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <Row>
          <Col md={8}>
            {cartItems.map((item, index) => {
              const product = products.find(
                (product) => product.id === item.product_id
              );
              if (!product) return null;
              return (
                <Card key={index} className="mb-4">
                  <Card.Body className="d-flex flex-column flex-md-row align-items-center">
                    <Card.Img
                      variant="left"
                      src={product.image.url}
                      alt={product.image.alt}
                      className="cart-item-image mb-4 mb-md-0"
                    />
                    <div className="flex-grow-1 ms-3">
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>
                        Price: {product.price} € <br />
                        Quantity: {item.quantity} <br />
                        Total: {(product.price * item.quantity).toFixed(2)} €
                      </Card.Text>
                    </div>
                    <Button
                      variant="danger"
                      onClick={() => handleRemove(item.id)}
                      className="mt-3 mt-md-0"
                    >
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </Col>
          <Col md={4} className="mt-4 mt-md-0">
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
              className="orders-btn mt-3"
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
