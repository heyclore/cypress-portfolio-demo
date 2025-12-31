describe("My First Test", () => {
  it("Visits example.com", () => {
    cy.visit("https://docs.cypress.io/");
    cy.title().should("include", "testing");
  });
});
