import './App.css'
import NavBar from './components/NavBar'

import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import productsService from './services/products';
import ProductsBreadcrumb from './components/ProductsBreadcrumb';
 import {
  BrowserRouter as Router,
} from 'react-router-dom'
import RoutesComponent from './components/RoutesComponent';
 


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
    <Router>  
    <NavBar setFilter={handleCategoryChange} />
    <ProductsBreadcrumb  />
      <Container id='appContainer' >
          <RoutesComponent products={filteredProducts}></RoutesComponent>
      </Container>
  
    </Router>

    </>
  )
}


export default App
