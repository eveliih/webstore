import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import LogIn from "./LogIn";
import { useSelector } from "react-redux";
import { clearUser } from "../reducers/userReducer";
import { clearCart } from "../reducers/cartReducer";
import RegisterForm from "./RegisterForm";
import Notification from "./Notification";

const CreateNavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleItemClick = (eventKey) => {
    dispatch(setFilter(eventKey));
    navigate(`/${eventKey}`);
  };

  const handleBrandClick = () => {
    navigate("/");
    dispatch(setFilter(""));
  };
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const user = useSelector(({ user }) => user);

  const handleLoginClick = () => {
    setShowLoginForm(!showLoginForm);
    setShowRegisterForm(false);
  };

  const handleLogoutClick = () => {
    dispatch(clearUser());
    dispatch(clearCart());
    dispatch(setFilter(""));
    navigate("/");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    dispatch(setFilter(event.target.value || ""));
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    dispatch(setFilter(searchTerm));
    setSearchTerm("");
    navigate("/products");
  };

  return (
    <>
      <Navbar
        id="custom-nav"
        className="bg-body-tertiary custom-colors-nav"
        expand="lg"
      >
        <Container fluid>
          <Navbar.Brand
            id="brand-col"
            onClick={handleBrandClick}
            style={{ cursor: "pointer" }}
          >
            <img
              src="/fruits.png"
              alt="Fruits"
              style={{ width: "30px", height: "30px", marginRight: "10px" }}
            />
            FoodOnline
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Row>
              <Col md="auto" className="navbar-item">
                <NavDropdown
                  title="Products"
                  id="basic-nav-dropdown"
                  onSelect={handleItemClick}
                >
                  <NavDropdown.Item eventKey="">All products</NavDropdown.Item>
                  <NavDropdown.Item eventKey="fruits">Fruits</NavDropdown.Item>
                  <NavDropdown.Item eventKey="bakery">Bakery</NavDropdown.Item>
                  <NavDropdown.Item eventKey="drinks">Drinks</NavDropdown.Item>
                </NavDropdown>
              </Col>
              <Col md="auto" className="navbar-item">
                <Form onSubmit={handleSearchSubmit}>
                  <Row>
                    <Col xs="auto" className="navbar-item">
                      <Form.Control
                        type="text"
                        placeholder="Search products..."
                        className=" mr-sm-2"
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                    </Col>
                    <Col xs="auto" className="navbar-item">
                      <Button type="submit" variant="outline-dark">
                        Search
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
              {user ? (
                <>
                  <Col xs="auto">
                    <Navbar.Text id="sign-in-color">
                      Signed in as:{" "}
                      <a href="#login" id="sign-in-color">
                        {user.name}
                      </a>
                    </Navbar.Text>
                  </Col>
                  <Col xs="auto">
                    <Button
                      type="button"
                      variant="outline-dark"
                      onClick={handleLogoutClick}
                    >
                      Log out
                    </Button>
                  </Col>
                  <Col xs="auto" className="mt-4 mt-md-0">
                    <Button
                      className="shopping-cart-btn"
                      type="button"
                      variant="primary"
                      onClick={() => navigate("/cart")}
                    >
                      Shopping Cart
                    </Button>
                  </Col>
                </>
              ) : (
                <Col xs="auto">
                  <Button
                    type="button"
                    variant="outline-dark"
                    onClick={handleLoginClick}
                  >
                    Log in
                  </Button>
                </Col>
              )}
            </Row>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {showLoginForm && (
        <Container fluid>
          <Row>
            <Col>
              <LogIn
                setShowLoginForm={setShowLoginForm}
                setShowRegisterForm={setShowRegisterForm}
              />
            </Col>
          </Row>
        </Container>
      )}
      {showRegisterForm && (
        <Container fluid>
          <Row>
            <Col>
              <RegisterForm setShowRegisterForm={setShowRegisterForm} />
            </Col>
          </Row>
        </Container>
      )}
      <Notification />
    </>
  );
};

export default CreateNavBar;
