import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { initializeCart } from "../reducers/cartReducer";
import { initUser } from "../reducers/userReducer";

const getFilter = (state) => state.filter;
const getProducts = (state) => state.products;
const getUser = (state) => state.user;

const ProductList = () => {
  const { category } = useParams();
  const filter = useSelector(getFilter);
  const allProducts = useSelector(getProducts);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  useEffect(() => {
    setIsLoading(true);
    const filteredProducts = allProducts.filter((product) => {
      const matchesFilter =
        filter === "" ||
        product.productCategory.name.toLowerCase() === filter.toLowerCase() ||
        product.name.toLowerCase().includes(filter.toLowerCase());
      return matchesFilter;
    });
    setProducts(filteredProducts);
    setIsLoading(false);
  }, [category, filter, allProducts]);

  useEffect(() => {
    if (user) {
      dispatch(initializeCart(user.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(initUser());
  }, [dispatch]);

  return (
    <>
      <Row>
        <Col>
          <h1 id="mainHeader">Online Food Store</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            Welcome to the FoodOnline Store. We have a wide variety of products
            for you to choose from. Feel free to browse our selection of fruits,
            drinks, and bakery products. We hope you find what you are looking
            for.
          </p>
          <p id="introText">
            Create an account or log in to place your orders.
          </p>
        </Col>
      </Row>
      <Row>
        {isLoading ? (
          <Col>
            <p>Loading products...</p>
          </Col>
        ) : products.length > 0 ? (
          <Row>
            {products.map((product) => (
              <Col
                key={product.id}
                className="product-col"
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={4}
                xxl={3}
              >
                <Link
                  to={{
                    pathname: `/${product.productCategory.name}/${product.name}/${product.id}`,
                  }}
                >
                  <Card
                    imageUrl={product.image.url}
                    title={product.name}
                    price={product.price}
                    unit={product.unit}
                    id={product.id}
                  />
                </Link>
              </Col>
            ))}
          </Row>
        ) : filter !== "" ? (
          <Col>
            <p>
              No products found matching your search term. Please try a
              different keyword.
            </p>
          </Col>
        ) : null}
      </Row>
    </>
  );
};

export default ProductList;
