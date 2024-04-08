import {configureStore} from '@reduxjs/toolkit'
import productReducer from './reducers/productReducer'
import filterReducer from './reducers/filterReducer' // Import the 'filterReducer' module


const store = configureStore({
  reducer: {
    products: productReducer,
    filter: filterReducer
  }
})

export default store