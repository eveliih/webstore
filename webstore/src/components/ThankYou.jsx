import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const ThankYou = () => {
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
        </Col>
      </Row>
    </Container>
  );
};

export default ThankYou;
