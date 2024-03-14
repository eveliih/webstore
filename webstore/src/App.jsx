import './App.css'
import NavBar from './components/NavBar'
import Card from './components/Card'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
 

  return (
    <>
    <NavBar />
      <Container id='appContainer' >
        <Row>
          <Col>
            <h1>Online Food Store</h1>
          </Col>
        </Row>
        <Row>  
          <Col>
            <p>
              Welcome to the online food store. We have a wide variety of products for you to choose from. 
              Feel free to browse our selection of fruits, drinks, dairy products, and bread. 
              We hope you find what you are looking for. moi
            </p>
          </Col>
          <Row>  
          <Col >
          <Card 
              imageUrl="https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              title="Bananas" 
              price="15.9/kg"
/>
          </Col>
          </Row>

        </Row>
      </Container>
    </>
  )
}

export default App
