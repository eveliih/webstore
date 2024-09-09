import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  const handleShowOrderDetails = () => {
    navigate("/orders");
  };

  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1>Thank You for Your Order!</h1>
          <p>
            Your order has been successfully placed. You will receive a
            confirmation email shortly.
          </p>
          <p>We appreciate your business and hope you enjoy your purchase!</p>
          <Button
            variant="primary"
            onClick={handleShowOrderDetails}
            className="order-btn"
          >
            Show Order Details
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ThankYou;
