import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import Products from "../src/components/Products";

test("renders product", async () => {
  const mockStore = configureStore()({
    filter: "",
  });

  render(
    <Provider store={mockStore}>
      <MemoryRouter initialEntries={["/Fruits"]}>
        <Products />
      </MemoryRouter>
    </Provider>
  );

  const element = await screen.findByText("Orange");
  expect(element).toBeInTheDocument();
});
