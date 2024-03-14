import './App.css'
import NavBar from './components/NavBar'
import Card from './components/Card'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import fruitService from './services/products';

function App() {
  const [fruits, setFruits] = useState([]);

  useEffect(() => {
    fruitService.getAll().then((fruits) => {
      setFruits(fruits);
    });
  });

  return (
    <>
    <div className='top-bar'></div>
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
        </Row>
          <Row>  
            {fruits.map((fruit) => 
              <Col key={fruit.id}>
                <Card imageUrl={fruit.url} title={fruit.name} price={fruit.price} />
              </Col>
            )}
          </Row>
      </Container>
    </>
  )
}

export default App
