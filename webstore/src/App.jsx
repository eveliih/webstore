import './App.css'
import NavBar from './components/NavBar'
import Card from './components/Card'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import productsService from './services/products';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productsService.getAll().then((products) => {
      setProducts(products);
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
            {products.map((product) => 
              <Col key={product.id}>
                <Card imageUrl={product.image.url} title={product.name} price={product.price} />
              </Col>
            )}
          </Row>
      </Container>
    </>
  )
}

export default App
