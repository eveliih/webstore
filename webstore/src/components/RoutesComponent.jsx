import { Route, Routes } from 'react-router-dom'
import ProductDetails from './ProductDetails';
import PropTypes from 'prop-types';
import Products from './Products'; 

const RoutesComponent = ({ products }) => {

  return (
    <Routes>
      <Route path="/products/:id" element={<ProductDetails products={products} />} />
      <Route path="/" element={<Products products={products}/>} />
    </Routes>
  )
}


RoutesComponent.propTypes = {
  products: PropTypes.array.isRequired
}

export default RoutesComponent