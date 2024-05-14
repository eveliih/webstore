import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../src/store";
import Products from "../src/components/Products";
import * as productService from "../src/services/products";

jest.mock("../src/services/products");

const mockProducts = [
  {
    id: 1,
    name: "Avocado",
    productCategory: { name: "Fruits" },
    image: { url: "avocado.jpg" },
    price: 1.99,
  },
  {
    id: 2,
    name: "Watermelon",
    productCategory: { name: "Fruits" },
    image: { url: "watermelon.jpg" },
    price: 2.99,
  },
  {
    id: 3,
    name: "Banana",
    productCategory: { name: "Fruits" },
    image: { url: "banana.jpg" },
    price: 0.99,
  },
];

test("renders the products", async () => {
  productService.getAll = jest.fn(() => Promise.resolve(mockProducts));

  render(
    <Provider store={store}>
      <Products />
    </Provider>
  );

  for (const product of mockProducts) {
    expect(await screen.findByText(product.name)).toBeInTheDocument();
  }
});
