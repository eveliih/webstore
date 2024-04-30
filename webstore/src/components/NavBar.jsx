import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LogIn from './LogIn';

const CreateNavBar = () => {
  const dispatch = useDispatch()
  const navigate =  useNavigate()

  const handleItemClick = (eventKey) => {
     dispatch(setFilter(eventKey))
      navigate(`/${eventKey}`)
  };

  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLoginClick = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <>
    <Navbar id='custom-nav' className="bg-body-tertiary custom-colors-nav" expand="lg">
      <Container fluid>
        <Navbar.Brand id='brand-col' href="/">FoodOnline</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Row>
            <Col md="auto">
              <NavDropdown title="Products" id="basic-nav-dropdown" onSelect={handleItemClick}>
                <NavDropdown.Item eventKey="">All products</NavDropdown.Item>
                <NavDropdown.Item eventKey="fruit">Fruits</NavDropdown.Item>
                <NavDropdown.Item eventKey="drinks">Drinks</NavDropdown.Item>
                <NavDropdown.Item eventKey="dairy">Dairy</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="bread">Bread</NavDropdown.Item>
              </NavDropdown>
            </Col>
            <Col md="auto">
              <Form>
                <Row>
                  <Col xs="auto">
                    <Form.Control
                      type="text"
                      placeholder="Search products..."
                      className=" mr-sm-2"
                    />
                  </Col>
                  <Col xs="auto">
                    <Button type="submit" variant="outline-dark" >Search</Button>
                  </Col>
                </Row>
              </Form>
            </Col>
             <Col xs="auto">
                    <Button type="button" variant="outline-dark" onClick={handleLoginClick}>Log in</Button>
                  </Col>
            <Col md="auto" >
              <Navbar.Text id='sign-in-color'>
                Signed in as: <a href="#login" id='sign-in-color'>Mark Otto</a>
              </Navbar.Text>
            </Col>
          </Row>
        </Navbar.Collapse>
      </Container>
    </Navbar>
     {showLoginForm && (
      <Container fluid>
        <Row>
          <Col>
            <LogIn />
          </Col>
        </Row>
      </Container>
    )}
   
    </>
  );
}


export default CreateNavBar;
