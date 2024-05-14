import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import filterReducer from "../src/reducers/filterReducer";
import NavBar from "../src/components/NavBar";
import RoutesComponent from "../src/components/RoutesComponent";
import { test, expect } from "vitest";

test('clicking the "Fruits" navbar item sets the filter and navigates', async () => {
  const store = configureStore({
    reducer: {
      filter: filterReducer,
      products: () => [
        {
          id: 1,
          name: "Avocado",
          category: "fruit",
          image: { url: "avocado.jpg" },
          price: 1.99,
        },
        {
          id: 2,
          name: "Watermelon",
          category: "fruit",
          image: { url: "watermelon.jpg" },
          price: 2.99,
        },
        {
          id: 3,
          name: "Banana",
          category: "fruit",
          image: { url: "banana.jpg" },
          price: 0.99,
        },
      ],
    },
    preloadedState: {
      filter: "",
    },
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <NavBar />
        <RoutesComponent />
      </MemoryRouter>
    </Provider>
  );

  const dropdown = screen.getByText("Products");
  userEvent.click(dropdown);

  const fruitItem = await screen.findByText("Fruits");
  userEvent.click(fruitItem);

  await waitFor(() => expect(store.getState().filter).toBe("fruits"));

  expect(await screen.findByText("Avocado")).toBeInTheDocument();
  expect(await screen.findByText("Watermelon")).toBeInTheDocument();
  expect(await screen.findByText("Banana")).toBeInTheDocument();
  expect(screen.queryByText("Orange")).not.toBeInTheDocument();
});
