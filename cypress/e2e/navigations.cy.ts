import { NavbarButton } from "../locators/navbarComponents";

describe("Navbar navigation", () => {
  beforeEach(() => {
    cy.visit("https://docs.cypress.io/");
  });

  it("navigate to Api page", () => {
    cy.get(NavbarButton.ApiButton).click();
    cy.title().should("include", "API");
    cy.get(NavbarButton.ApiButton).should("have.attr", "aria-current", "page");
  });

  it("navigate to Cloud page", () => {
    cy.get(NavbarButton.CloudButton).click();
    cy.title().should("include", "Cloud");
    cy.get(NavbarButton.CloudButton).should(
      "have.attr",
      "aria-current",
      "page",
    );
  });

  it("navigate to Ui Coverage page", () => {
    cy.get(NavbarButton.UiCoverageButton).click();
    cy.title().should("include", "UI Coverage");
    cy.get(NavbarButton.UiCoverageButton).should(
      "have.attr",
      "aria-current",
      "page",
    );
  });

  it("navigate to Accessibility page", () => {
    cy.get(NavbarButton.AccessibilityButton).click();
    cy.title().should("include", "Accessibility");
    cy.get(NavbarButton.AccessibilityButton).should(
      "have.attr",
      "aria-current",
      "page",
    );
  });
});
