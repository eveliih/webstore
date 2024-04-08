import { createSlice } from '@reduxjs/toolkit';
import productsService from '../services/products';

const initialState = [];

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      const { products } = action.payload;
      return products;
    },
  },
});

export const { setProducts } = productSlice.actions;

export const initializeProducts = () => {
  return async dispatch => {
    const products = await productsService.getAll();
    dispatch(setProducts({ products }));
  };
};

export default productSlice.reducer;
