import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Card from './Card'; 
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createSelector } from 'reselect';

const getFilter = state => state.filter;
const getProducts = state => state.products;

const getFilteredProducts = createSelector(
  [getFilter, getProducts],
  (filter, products) => {
    return (category) => {
      return products.filter(product => {
        const matchesFilter = filter === '' || product.category.toLowerCase() === filter.toLowerCase();
        const matchesCategory = category === undefined || product.category.toLowerCase() === category.toLowerCase();
        return matchesFilter && matchesCategory;
      });
    }
  }
);

const ProductList = () => {
  const { category } = useParams();
  const selectFilteredProducts = useSelector(getFilteredProducts);
  const products = selectFilteredProducts(category);

  return (
    <>  
      <Row>
        <Col>
          <h1 id='mainHeader'>Online Food Store</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <p id='introText'>
            Welcome to the online food store. We have a wide variety of products for you to choose from. 
            Feel free to browse our selection of fruits, drinks, dairy products, and bread. 
            We hope you find what you are looking for. moi
          </p>
        </Col>
      </Row>
      <Row>
        {products.map((product) => 
          <Col key={product.id} className="product-col">
            <Link to={{
              pathname: `/${product.category}/${product.name}/${product.id}`
            }}>
              <Card imageUrl={product.image.url} title={product.name} price={product.price} id={product.id}/>
            </Link>
          </Col>
        )}
      </Row>
    </>
  );
};

export default ProductList;