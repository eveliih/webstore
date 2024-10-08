import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white p-4 text-center">
      <Container>
        <Row>
          <Col>
            <p>
              &copy; {new Date().getFullYear()} FoodOnline. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
