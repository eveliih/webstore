import React, { useState } from "react";
import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import emailService from "../services/email";
import { notify } from "../reducers/notificationReducer";
import { generateEmailBody } from "../helpers/emailCreator";

const EmailModal = ({ show, handleClose, total }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const products = useSelector((state) => state.products);

  const handleSubmitEmail = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const emailBody = generateEmailBody(total, cartItems, products);
      await emailService.sendEmail(email, "Order Confirmation", emailBody);
      dispatch(notify("Order done and email sent!", "success"));
      handleClose();
    } catch (error) {
      console.error("Failed to send email", error);
      setErrorMessage("Failed to sent email. Please check your email address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Place your order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && (
          <Alert
            variant="danger"
            onClose={() => setErrorMessage(null)}
            dismissible
          >
            {errorMessage}
          </Alert>
        )}
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </Form.Group>
        </Form>
        <br />
        <p>
          Your email address will be used solely for sending your order details
          and will not be stored or shared.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={handleClose} disabled={loading}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmitEmail}
          className="emailsubmit-btn"
          disabled={loading}
        >
          {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmailModal;
