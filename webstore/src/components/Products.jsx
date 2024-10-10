import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Card from "./Card";
import LoadingMessage from "./LoadingMessage";
import NoProductsFound from "./NoProductsFound";
import { useFilteredProducts, useInitializeCart } from "../helpers/hooks";
import { useSelector } from "react-redux";

const getFilter = (state) => state.filter;

const ProductList = () => {
  const filter = useSelector(getFilter);
  const { category } = useParams();
  const { products, isLoading } = useFilteredProducts(category);
  useInitializeCart();

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
          <LoadingMessage />
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
          <NoProductsFound />
        ) : null}
      </Row>
    </>
  );
};

export default ProductList;
