import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useState, useEffect } from "react";
import cartService from "../services/cart";
import { useNotification } from "../hooks/index";
import {
  addItem,
  updateTotal,
  updateItemQuantity,
} from "../reducers/cartReducer";

const CreateProductDetails = () => {
  const { id } = useParams();
  const user = useSelector(({ user }) => user);
  const product = useSelector((state) =>
    state.products.find((product) => product.id === Number(id))
  );
  const cart = useSelector((state) => state.cart.cart);
  const cartitems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    dispatch(initUser());
  }, []);

  useEffect(() => {
    if (product && cartitems) {
      const existingItem = cartitems.find(
        (item) => item.product_id === product.id
      );
      if (existingItem) {
        setQuantity(existingItem.quantity);
      }
    }
  }, [product, cartitems]);

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
      const price = parseFloat(product.price.split("/")[0]);

      if (!product) {
        notifyWith("Product not found. Please try again.", "error");
        return;
      }

      if (!cart || !cart.id) {
        notifyWith("Cart not found. Please try again.", "error");
        return;
      }

      const existingItem = cartitems.find(
        (item) => item.product_id === product.id
      );

      let newTotal = cart.total;

      if (existingItem) {
        const oldTotalForItem = existingItem.quantity * price;
        const newTotalForItem = quantity * price;
        newTotal = newTotal - oldTotalForItem + newTotalForItem;

        await cartService.updateItemQuantity(existingItem.id, quantity);

        dispatch(
          updateItemQuantity({
            id: existingItem.id,
            quantity: quantity,
          })
        );
      } else {
        const cartItem = await cartService.addItemToCart(
          cart.id,
          product.id,
          quantity
        );
        newTotal += price * quantity;
        dispatch(addItem(cartItem));
      }

      await cartService.updateCartTotal(cart.id, newTotal);
      dispatch(updateTotal(newTotal));

      notifyWith("Item added to cart successfully!", "success");
    } catch (error) {
      notifyWith("Failed to add item to cart. Please try again.", "error");
    }
  };

  if (product === undefined) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const price = parseFloat(product.price.split("/")[0]);
  const totalPrice = (price * quantity).toFixed(2);

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
          <h2>
            Price: {product.price} €/{product.unit}
          </h2>
          <h3 className="total">Total: {totalPrice} €</h3>
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
