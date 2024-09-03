import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const EmailModal = ({ show, handleClose, total }) => {
  const [email, setEmail] = useState("");

  const handleSubmitEmail = async () => {
    try {
      await axios.post("http://localhost:3001/send-email", {
        email: email,
        subject: "Payment Confirmation",
        text: `Thank you for your purchase! Your total is ${total.toFixed(
          2
        )} €.`,
      });
      alert("Payment processed and email sent!");
      handleClose();
    } catch (error) {
      console.error("Failed to send email", error);
      alert("Failed to process payment.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Enter Your Email</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmitEmail}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmailModal;
