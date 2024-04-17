import { Route, Routes } from 'react-router-dom'
import ProductDetails from './ProductDetails';
import Products from './Products'; 

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/:category/:name/:id" element={<ProductDetails />} />
      <Route path="/:category" element={<Products/>} />
      <Route path="/products" element={<Products/>} />
      <Route path="/" element={<Products/>} />
    </Routes>
  )
}

export default RoutesComponent