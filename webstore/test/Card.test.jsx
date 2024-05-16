import { render, screen } from "@testing-library/react";
import Card from "../src/components/Card";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore();
const store = mockStore({
  selectedProduct: {},
});

test.only("renders content", () => {
  const product = {
    id: 1,
    name: "Avocado",
    productCategory: 1,
    image: { url: "avocado.jpg" },
    price: 1.99,
  };

  render(
    <Provider store={store}>
      <Card
        imageUrl={product.image.url}
        title={product.name}
        price={product.price}
        id={product.id}
      />
    </Provider>
  );

  const element = screen.getByText("Avocado");
  expect(element).toBeDefined();
});
