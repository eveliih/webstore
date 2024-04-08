import productsService from '../services/products'


const initialState = []
 
const reducer = (state = initialState, action) => {
  switch(action.type){
case 'SET':
  return action.data.products
  
case 'SET_CLICKED_PRODUCT':
      return state.map(product =>
        product.id !== action.data.id ? product : { ...product, clicked: true }
      )

    default:
      return state 
  }
}

export const setClickedProduct = (id) => {
  return {
    type: 'SET_CLICKED_PRODUCT',
    data: { id }
  }
}

export const setProducts = (products) => {
  return {
    type: 'SET',
    data: { products }
  }
}

export const initializeProducts = () => {
  return async dispatch => {
    const products = await productsService.getAll()
    dispatch(setProducts(products))
  }
}



export default reducer