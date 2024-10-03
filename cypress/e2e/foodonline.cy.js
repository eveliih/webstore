describe("Food online app", () => {
  beforeEach(function () {
    cy.visit("http://localhost:3001");
  });

  it("the front page can be opened", () => {
    cy.contains("Online Food Store");
    cy.contains(
      "Welcome to the FoodOnline Store. We have a wide variety of products for you to choose from. Feel free to browse our selection of fruits, drinks, and bakery products. We hope you find what you are looking for."
    );
    cy.contains("Create an account or log in to place your orders.");
  });

  it("login works", function () {
    cy.contains("Log in").click();
    cy.get("#username").type("test");
    cy.get("#password").type("Test1234!");
    cy.get("#login-button").click();

    cy.contains("Signed in as: Test");
  });

  it("login fails with wrong password", function () {
    cy.contains("Log in").click();
    cy.get("#username").type("test");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.contains("Wrong username or password.");
  });

  it("products are shown", function () {
    cy.contains("Watermelon");
    cy.contains("Water");
    cy.contains("Roll");
  });

  it("categories are shown and work", function () {
    cy.contains("Products").click();
    cy.contains("Fruits");
    cy.contains("Drinks");

    cy.contains("Bakery").click();
    cy.contains("Roll");

    cy.get("body").should("not.contain", "Orange");
    cy.get("body").should("not.contain", "Water");
  });

  it("product details are shown", function () {
    cy.contains("Watermelon").click();
    cy.contains("Watermelon");
    cy.contains("Price: 1.99 €/kg");
    cy.contains("Ingredients");
    cy.contains("Origin");
  });
});
