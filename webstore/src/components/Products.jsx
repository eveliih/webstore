import React from 'react';
import {  Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Card from './Card'; 
import { useSelector } from 'react-redux';


const ProductList = () => {
   const products = useSelector(state => state.products)
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
                 pathname: `/products/${product.id}`,
                 state: { product }
            }}>
                  <Card imageUrl={product.image.url} title={product.name} price={product.price} />
                </Link>
              </Col>
            )}

    </Row>
          </>
  );
};

export default ProductList;