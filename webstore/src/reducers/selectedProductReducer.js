import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const productSlice = createSlice({
  name: 'selectedProduct',
  initialState,
  reducers: {
    setProduct: (state, action) => {
      return action.payload;
    },
  },
});

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;