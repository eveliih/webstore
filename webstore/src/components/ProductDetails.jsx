import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useState, useEffect } from "react";
import cartService from "../services/cart";
import { useNotification } from "../hooks/index";

const CreateProductDetails = () => {
  const { id } = useParams();
  const user = useSelector(({ user }) => user);
  const product = useSelector((state) =>
    state.products.find((product) => product.id === Number(id))
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(initializeCart(user.id));
    }
  }, [dispatch, user]);

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
      let cart = await cartService.getCart(user.id);

      if (!cart) {
        cart = await cartService.addCart(user.id, 0);
      }

      const price = parseFloat(product.price.split("/")[0]);

      if (!product) {
        notifyWith("Product not found. Please try again.", "error");
        return;
      }

      if (!cart || !cart.id) {
        notifyWith("Cart not found. Please try again.", "error");
        return;
      }

      await cartService.addItemToCart(cart.id, product.id, quantity);
      await cartService.updateCartTotal(cart.id, cart.total + price * quantity);

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
