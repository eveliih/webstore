import './App.css'
import NavBar from './components/NavBar'
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect} from 'react';
import ProductsBreadcrumb from './components/ProductsBreadcrumb';
import RoutesComponent from './components/RoutesComponent';
import { useDispatch } from "react-redux";
import { initializeProducts } from "./reducers/productReducer";
 import {
  BrowserRouter as Router,
} from 'react-router-dom'
 


function App() {
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(initializeProducts());
  }, [dispatch]);

  return (
    <>
    <div className='top-bar'></div>
    <Router>  
    <NavBar />
    <Container id='custom-container'>
       <ProductsBreadcrumb  />
    </Container>
      <Container id='appContainer' >
          <RoutesComponent ></RoutesComponent>
      </Container>
    </Router>

    </>
  )
}


export default App
