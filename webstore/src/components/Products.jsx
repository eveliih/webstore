import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Card from "./Card";
import { useSelector } from "react-redux";
import productService from "../services/products"; // Import your service

const getFilter = (state) => state.filter;

const ProductList = () => {
  const { category } = useParams();
  const filter = useSelector(getFilter);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productService.getAll(category).then((fetchedProducts) => {
      const filteredProducts = fetchedProducts.filter((product) => {
        const matchesFilter =
          filter === "" ||
          product.productCategory.name.toLowerCase() === filter.toLowerCase();
        return matchesFilter;
      });
      setProducts(filteredProducts);
    });
  }, [category, filter]);

  return (
    <>
      <Row>
        <Col>
          <h1 id="mainHeader">Online Food Store</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <p id="introText">
            Welcome to the Online Food Store. We have a wide variety of products
            for you to choose from. Feel free to browse our selection of fruits,
            drinks, dairy products, and bread. We hope you find what you are
            looking for.
          </p>
        </Col>
      </Row>
      <Row>
        {products.map((product) => {
          return (
            <Col key={product.id} className="product-col">
              <Link
                to={{
                  pathname: `/${product.productCategory.name}/${product.name}/${product.id}`,
                }}
              >
                <Card
                  imageUrl={product.image.url}
                  title={product.name}
                  price={product.price}
                  id={product.id}
                />
              </Link>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default ProductList;
