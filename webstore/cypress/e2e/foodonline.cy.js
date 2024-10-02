describe("Food online app", () => {
  beforeEach(function () {
    cy.visit("http://localhost:5173");
  });

  it("the front page can be opened", () => {
    cy.contains("Online Food Store");
    cy.contains(
      "Welcome to the FoodOnline Store. We have a wide variety of products for you to choose from. Feel free to browse our selection of fruits, drinks, and bakery products. We hope you find what you are looking for."
    );
    cy.contains("Create an account or log in to place your orders.");
  });

  it("login form can be opened", function () {
    cy.contains("Log in").click();
    cy.get("#username").type("test");
    cy.get("#password").type("Test1234!");
    cy.get("#login-button").click();

    cy.contains("Signed in as: Test");
  });
});
