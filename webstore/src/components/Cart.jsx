import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const products = useSelector((state) => state.products);

  const totalSum = cartItems.reduce((sum, item) => {
    const product = products.find((product) => product.id === item.product_id);
    return sum + product.price * item.quantity;
  }, 0);

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
                        Quantity: {item.quantity} <br />
                        Price: ${product.price}
                      </Card.Text>
                    </div>
                    <Button variant="danger">Remove</Button>
                  </Card.Body>
                </Card>
              );
            })}
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Total Sum</Card.Title>
                <Card.Text>${totalSum.toFixed(2)}</Card.Text>
                <Button variant="success">Proceed to Payment</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </Container>
  );
};

export default Cart;
