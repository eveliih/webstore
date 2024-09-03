import React, { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import emailService from "../services/email";

const EmailModal = ({ show, handleClose, total }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const products = useSelector((state) => state.products);

  const handleSubmitEmail = async () => {
    setLoading(true);
    try {
      const emailBody = `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <div style="background-color: #f8f8f8; padding: 20px; text-align: center;">
            <h1 style="margin: 0; color: #0F612A;">FoodOnline</h1>
          </div>
          <div style="padding: 20px;">
            <h2 style="color: #0F612A;">Order Confirmation</h2>
            <p>Thank you for your purchase! Your total is <strong>${total.toFixed(
              2
            )} €</strong>.</p>
            <h3 style="color: #0F612A;">Ordered Items:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr>
                  <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Name</th>
                  <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Quantity</th>
                  <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Price</th>
                  <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${cartItems
                  .map((item) => {
                    const product = products.find(
                      (p) => p.id === item.product_id
                    );
                    const itemTotal = (
                      parseFloat(product.price) * item.quantity
                    ).toFixed(2);
                    return `
                      <tr>
                        <td style="border: 1px solid #ddd; padding: 8px;">${product.name}</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${product.price} €</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${itemTotal} €</td>
                      </tr>
                    `;
                  })
                  .join("")}
              </tbody>
            </table>
            <p style="margin-top: 20px;">If you have any questions, feel free to contact us.</p>
            <p>Best regards,<br />FoodOnline Team</p>
          </div>
          <div style="background-color: #f8f8f8; padding: 10px; text-align: center;">
            <p style="margin: 0;">&copy; 2024 FoodOnline. All rights reserved.</p>
          </div>
        </div>
      `;

      await emailService.sendEmail(email, "Order Confirmation", emailBody);
      alert("Payment processed and email sent!");
      handleClose();
    } catch (error) {
      console.error("Failed to send email", error);
      alert("Failed to process payment.");
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
