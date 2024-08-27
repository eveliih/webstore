import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useState } from "react";
import cartService from "../services/cart";
import { useNotification } from "../hooks/index";

const CreateProductDetails = () => {
  const { id } = useParams();
  const user = useSelector(({ user }) => user);
  const product = useSelector((state) =>
    state.products.find((product) => product.id === Number(id))
  );

  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = () =>
    setQuantity((prevQuantity) => prevQuantity + 1);
  const decreaseQuantity = () =>
    setQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0));

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value) && value >= 0) {
      setQuantity(parseInt(value));
    }
  };

  const notifyWith = useNotification();

  const handleAddToCart = async () => {
    if (!user) {
      notifyWith("Please log in before adding items to the cart.", "error");
      return;
    }

    try {
      console.log("Fetching cart for user ID:", user.id); // Log before fetching cart
      let cart = await cartService.getCart(user.id);
      console.log("Cart retrieved:", cart); // Log after fetching cart

      if (!cart) {
        console.log("Creating new cart"); // Log before creating new cart
        cart = await cartService.addCart(user.id, 0);
        console.log("New cart created:", cart); // Log after creating new cart
      }

      const price = parseFloat(product.price.split("/")[0]);
      console.log("Product price:", price); // Log product price

      // Check if product exists
      if (!product) {
        console.error("Product not found:", product);
        notifyWith("Product not found. Please try again.", "error");
        return;
      }

      // Check if cart exists
      if (!cart || !cart.id) {
        console.error("Cart not found or invalid:", cart);
        notifyWith("Cart not found. Please try again.", "error");
        return;
      }

      console.log("Adding item to cart"); // Log before adding item to cart
      await cartService.addItemToCart(cart.id, product.id, quantity);
      console.log("Item added to cart"); // Log after adding item to cart

      console.log("Updating cart total"); // Log before updating cart total
      await cartService.updateCartTotal(cart.id, cart.total + price * quantity);
      console.log("Cart total updated"); // Log after updating cart total

      notifyWith("Item added to cart successfully!", "success");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      notifyWith("Failed to add item to cart. Please try again.", "error");
    }
    // update cart items in state?
  };

  if (product === undefined) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <img
            id="productDetailsImage"
            src={product.image.url}
            alt={product.name}
          />
        </Col>
        <Col>
          <h1>{product.name}</h1>
          <h2>{product.price}</h2>
          <div className="quantity-control">
            <Button variant="light" onClick={decreaseQuantity}>
              -
            </Button>
            <Form.Control
              className="hide-input-arrows quantity-input"
              type="number"
              min="0"
              value={quantity}
              onChange={handleInputChange}
            />
            <Button variant="light" onClick={increaseQuantity}>
              +
            </Button>
          </div>
          <Button
            onClick={handleAddToCart}
            disabled={quantity === 0}
            className="cart-button"
          >
            Add to Cart
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Accordion defaultActiveKey="0" className="custom-accordion">
            <Accordion.Item eventKey="1">
              <Accordion.Header>Ingredients</Accordion.Header>
              <Accordion.Body>{product.ingredients}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Origin</Accordion.Header>
              <Accordion.Body>{product.origin}</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateProductDetails;
