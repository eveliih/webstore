import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function createNavBar() {
  return (
    <Navbar id='custom-nav' className="bg-body-tertiary custom-colors-nav" expand="lg">
      <Container fluid>
        <Navbar.Brand id='brand-col' href="#home">FoodOnline</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Row>
            <Col md="auto">
          <NavDropdown title="Products" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Fruits</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Drinks
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Dairy</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Bread
              </NavDropdown.Item>
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
      <Col md="auto" >
          <Navbar.Text id='sign-in-color'>
            Signed in as: <a href="#login" id='sign-in-color'>Mark Otto</a>
          </Navbar.Text>
      </Col>

          </Row>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default createNavBar;