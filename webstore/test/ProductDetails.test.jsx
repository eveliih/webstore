import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { describe, it, test } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import CreateProductDetails from "../src/components/ProductDetails";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();

function renderComponent(store, initialRoute = "/product/1") {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/product/:id" element={<CreateProductDetails />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
}

describe("CreateProductDetails", () => {
  it("renders product details", async () => {
    const store = mockStore({
      products: [
        {
          id: 1,
          name: "Avocado",
          productCategory: 1,
          image: { url: "avocado.jpg" },
          price: 1.99,
        },
      ],
    });

    renderComponent(store);

    const addToCartButton = await waitFor(() =>
      screen.getByText("Add to Cart")
    );
    expect(addToCartButton).toBeDisabled();
  });

  test("displays loading state", async () => {
    const store = mockStore({ products: [] });
    renderComponent(store);
    expect(await screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("displays product not found state", async () => {
    const store = mockStore({ products: [] });
    renderComponent(store, "/product/999");
    expect(await screen.getByText("Product not found")).toBeInTheDocument();
  });

  test("controls quantity correctly", async () => {
    const store = mockStore({
      products: [
        {
          id: 1,
          name: "Avocado",
          productCategory: 1,
          image: { url: "avocado.jpg" },
          price: 1.99,
        },
      ],
    });

    renderComponent(store);

    const increaseButton = await screen.getByText("+");
    const decreaseButton = await screen.getByText("-");
    const quantityInput = await screen.getByRole("spinbutton");

    fireEvent.click(increaseButton);
    expect(quantityInput.value).toBe("1");

    fireEvent.click(decreaseButton);
    expect(quantityInput.value).toBe("0");
  });

  test("enables and disables add to cart button correctly", async () => {
    const store = mockStore({
      products: [
        {
          id: 1,
          name: "Avocado",
          productCategory: 1,
          image: { url: "avocado.jpg" },
          price: 1.99,
        },
      ],
    });

    renderComponent(store);

    const increaseButton = await screen.getByText("+");
    const addToCartButton = await screen.getByText("Add to Cart");

    expect(addToCartButton).toBeDisabled();

    fireEvent.click(increaseButton);
    expect(addToCartButton).not.toBeDisabled();
  });

  test("displays product details correctly", async () => {
    const store = mockStore({
      products: [
        {
          id: 1,
          name: "Avocado",
          productCategory: 1,
          image: { url: "avocado.jpg" },
          price: 1.99,
        },
      ],
    });

    renderComponent(store);

    expect(await screen.getByText("Avocado")).toBeInTheDocument();
    expect(await screen.getByText("1.99")).toBeInTheDocument();
    expect(await screen.getByAltText("Avocado")).toHaveAttribute(
      "src",
      "avocado.jpg"
    );
  });
});
