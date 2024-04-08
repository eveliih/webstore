import {configureStore} from '@reduxjs/toolkit'
import productReducer from './reducers/productReducer'
import filterReducer from './reducers/filterReducer' 
import selectedProductReducer from './reducers/selectedProductReducer'


const store = configureStore({
  reducer: {
    products: productReducer,
    filter: filterReducer,
    selectedProduct: selectedProductReducer
  }
})

export default store