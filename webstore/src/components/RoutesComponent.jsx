import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProductDetails from './ProductDetails';
import Products from './Products'; 

const RoutesComponent = () => {

 const products = useSelector(state => state.products)
 
  return (
    <Routes>
      <Route path="/products/:id" element={<ProductDetails products={products} />} />
      <Route path="/" element={<Products products={products}/>} />
    </Routes>
  )
}


export default RoutesComponent