import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import Products from "../src/components/Products";
import { test, expect } from "vitest";
import fetch from "node-fetch";
import { Response } from "node-fetch";

global.fetch = fetch;

test("renders product", async ({ is }) => {
  global.fetch = () =>
    Promise.resolve(
      new Response(
        JSON.stringify([
          {
            id: 1,
            name: "Orange",
            category: "Fruits",
            image: { url: "orange.jpg" },
            price: 0.99,
          },
        ])
      )
    );

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
  assert.equal(element.textContent, "Orange");
});
