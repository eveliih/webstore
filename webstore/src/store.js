import {configureStore} from '@reduxjs/toolkit'
import productReducer from './reducers/productReducer'
import filterReducer from './reducers/filterReducer' 
import selectedProductReducer from './reducers/selectedProductReducer'
import notification from './reducers/notification'


const store = configureStore({
  reducer: {
    products: productReducer,
    filter: filterReducer,
    selectedProduct: selectedProductReducer,
    notification: notification
  }
})

export default store