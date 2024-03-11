import './App.css'
import NavBar from './components/NavBar'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
 

  return (
    <>
    <NavBar />
      <Container>
      <Row>   </Row>
        <Row>
          <Col>
            <h1>Online Food Store</h1>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
