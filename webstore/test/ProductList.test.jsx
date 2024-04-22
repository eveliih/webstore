import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Products from '../src/components/Products';
import { test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';


test('renders product', () => {
  const product = {
    id: 1,
    category: 'fruit',
    name: 'Apple',
    price: 1,
    image: { url: 'apple.jpg' }
  }

  const dairyProduct = {
    id: 2,
    category: 'dairy',
    name: 'Milk',
    price: 2,
    image: { url: 'milk.jpg' }
  }

  const mockStore = configureMockStore()({
    products: [product, dairyProduct],
    filter: '',
  });

  render(
    <Provider store={mockStore}>
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    </Provider>
  );

  const element = screen.getByText('Apple');
  expect(element).toBeDefined();
});

test('renders header', () => {
  const product = {
    id: 1,
    category: 'fruit',
    name: 'Apple',
    price: 1,
    image: { url: 'apple.jpg' }
  }

  const dairyProduct = {
    id: 2,
    category: 'dairy',
    name: 'Milk',
    price: 2,
    image: { url: 'milk.jpg' }
  }

  const mockStore = configureMockStore()({
    products: [product, dairyProduct],
    filter: '',
  });

  render(
    <Provider store={mockStore}>
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    </Provider>
  );

  const headerElement = screen.getByText('Online Food Store');
  expect(headerElement).toBeInTheDocument();
});
