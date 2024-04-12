import { Route, Routes } from 'react-router-dom'
import ProductDetails from './ProductDetails';
import Products from './Products'; 

const RoutesComponent = () => {

  return (
    <Routes>
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/" element={<Products/>} />
    </Routes>
  )
}


export default RoutesComponent