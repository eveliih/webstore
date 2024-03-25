import './App.css'
import NavBar from './components/NavBar'
import Card from './components/Card'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import productsService from './services/products';
import ProductsBreadcrumb from './components/ProductsBreadcrumb';
/* import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
 */

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

 
  useEffect(() => {
    productsService.getAll().then((products) => { 
      setProducts(products);
      setFilteredProducts(products);
    });
  }, []);

  const handleCategoryChange = (category) => {
    const productsFilteredByCategory = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
    setFilteredProducts(productsFilteredByCategory);
  }


  return (
    <>
    <div className='top-bar'></div>
    <NavBar setFilter={handleCategoryChange} />
    <ProductsBreadcrumb  />
      <Container id='appContainer' >
        <Row>
          <Col>
            <h1 id='mainHeader'>Online Food Store</h1>
          </Col>
        </Row>
        <Row>  
          <Col>
            <p id='introText'>
              Welcome to the online food store. We have a wide variety of products for you to choose from. 
              Feel free to browse our selection of fruits, drinks, dairy products, and bread. 
              We hope you find what you are looking for. moi
            </p>
          </Col>
        </Row>
          <Row>  
            {filteredProducts.map((product) => 
              <Col key={product.id} className="product-col">
                <Card imageUrl={product.image.url} title={product.name} price={product.price} />
              </Col>
            )}
          </Row>
      </Container>
      {/* <Routes> 
         <Route path="/products/:category/:name" element={<Card product={product} />} />
      </Routes> */}

    </>
  )
}

export default App
