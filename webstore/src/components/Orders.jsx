import React, { useState, useEffect } from "react";
import orderService from "../services/order";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user && user.id) {
        try {
          const fetchedOrders = await orderService.getOrder(user.id);
          const sortedOrders = fetchedOrders.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

          const ordersWithItems = await Promise.all(
            sortedOrders.map(async (order) => {
              const items = await orderService.getOrderItems(order.id);
              return { ...order, items };
            })
          );

          setOrders(ordersWithItems);
        } catch (error) {
          console.error("Failed to fetch orders", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrders();
  }, [user]);

  const getProductDetails = (productId) => {
    const product = products.find((p) => p.id === productId);
    return product
      ? { name: product.name, price: product.price }
      : { name: "Unknown", price: 0 };
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1>Orders</h1>
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            orders.map((order) => (
              <Card key={order.id} className="mb-3">
                <Card.Body>
                  <Card.Title>Order ID: {order.id}</Card.Title>
                  <Card.Text>
                    <strong>Order made:</strong>{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </Card.Text>
                  <Card.Text>
                    <strong>Order Items:</strong>
                  </Card.Text>
                  <ListGroup variant="flush">
                    {order.items.map((item) => {
                      const { name, price } = getProductDetails(
                        item.product_id
                      );
                      return (
                        <ListGroup.Item key={item.id}>
                          <strong>Product Name:</strong> {name} -{" "}
                          {item.quantity} x {Number(price).toFixed(2)} €
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                  <Card.Text>
                    <strong>Total:</strong> ${order.total.toFixed(2)}
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
