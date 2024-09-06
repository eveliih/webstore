import React, { useState } from "react";
import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import emailService from "../services/email";
import orderService from "../services/order";
import { notify } from "../reducers/notificationReducer";
import { generateEmailBody } from "../helpers/emailCreator";

const EmailModal = ({ show, handleClose, total }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);

  const handleSubmitEmail = async (event) => {
    console.log("submit");
    event.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    try {
      console.log("try");
      const userId = user ? user.id : null;
      const newOrder = await orderService.addOrder(userId, total);

      for (const item of cartItems) {
        await orderService.addItemToOrder(
          newOrder.id,
          item.product_id,
          item.quantity
        );
      }

      const emailBody = generateEmailBody(total, cartItems, products);
      await emailService.sendEmail(email, "Order Confirmation", emailBody);

      dispatch(notify("Order done and email sent!", "success"));
      handleClose();
      navigate("/thank-you");
    } catch (error) {
      console.error("Failed to process order", error);
      setErrorMessage("Failed to process order. Please try again.");
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
        <Form onSubmit={handleSubmitEmail}>
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
          <br />
          <p>
            Your email address will be used solely for sending your order
            details and will not be stored or shared.
          </p>
          <Modal.Footer>
            <Button
              variant="outline-dark"
              onClick={handleClose}
              disabled={loading}
            >
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="emailsubmit-btn"
              disabled={loading}
            >
              {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EmailModal;
