import React, { useState, useEffect } from "react";
import orderService from "../services/order";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products); // Access products from Redux state

  useEffect(() => {
    const fetchOrders = async () => {
      if (user && user.id) {
        try {
          const fetchedOrders = await orderService.getOrder(user.id);
          const sortedOrders = fetchedOrders.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

          // Fetch order items for each order
          const ordersWithItems = await Promise.all(
            sortedOrders.map(async (order) => {
              const items = await orderService.getOrderItems(order.id);
              return { ...order, items };
            })
          );

          setOrders(ordersWithItems);
        } catch (error) {
          console.error("Failed to fetch orders", error);
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
          {orders.length === 0 ? (
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
                          {item.quantity} x {price} €
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
