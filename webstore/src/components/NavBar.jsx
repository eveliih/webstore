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
    console.log(eventKey);
    dispatch(setFilter(eventKey));
    navigate(`/${eventKey}`);
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
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    dispatch(setFilter(event.target.value || ""));
  };

  return (
    <>
      <Navbar
        id="custom-nav"
        className="bg-body-tertiary custom-colors-nav"
        expand="lg"
      >
        <Container fluid>
          <Navbar.Brand id="brand-col" href="/">
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
                  <NavDropdown.Item eventKey="bread">Bread</NavDropdown.Item>
                </NavDropdown>
              </Col>
              <Col md="auto" className="navbar-item">
                <Form>
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
              <Col xs="auto">
                <Button
                  className="shopping-cart-btn"
                  type="button"
                  variant="primary"
                  disabled={!user}
                  onClick={() => navigate("/cart")}
                >
                  Shopping Cart
                </Button>
              </Col>
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
