import './App.css'
import NavBar from './components/NavBar'
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect} from 'react';
//import productsService from './services/products';
import ProductsBreadcrumb from './components/ProductsBreadcrumb';
import RoutesComponent from './components/RoutesComponent';
import { useDispatch } from "react-redux";
import { initializeProducts } from "./reducers/productReducer";
 import {
  BrowserRouter as Router,
} from 'react-router-dom'
 


function App() {
  //const [products, setProducts] = useState([]);
  //const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(initializeProducts());
    /* productsService.getAll().then((products) => { 
      setProducts(products);
      setFilteredProducts(products);
    }); */
  }, [dispatch]);
/* 
  const handleCategoryChange = (category) => {
   // const productsFilteredByCategory = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
    //setFilteredProducts(productsFilteredByCategory);
  } */


  return (
    <>
    <div className='top-bar'></div>
    <Router>  
    <NavBar /* setFilter={handleCategoryChange} */ />
    <ProductsBreadcrumb  />
      <Container id='appContainer' >
          <RoutesComponent /* products={filteredProducts} */></RoutesComponent>
      </Container>
  
    </Router>

    </>
  )
}


export default App
