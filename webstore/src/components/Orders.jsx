import React, { useState, useEffect } from "react";
import orderService from "../services/order";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await orderService.getOrder(user.id);
        const sortedOrders = fetchedOrders.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(sortedOrders);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1>Orders</h1>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            orders.map((order) => (
              <Card key={order.id} className="mb-3">
                <Card.Body>
                  <Card.Title>Order ID: {order.id}</Card.Title>
                  <Card.Text>
                    <strong>Total:</strong> ${order.total.toFixed(2)}
                  </Card.Text>
                  <Card.Text>
                    <strong>Order made:</strong>{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Orders;
