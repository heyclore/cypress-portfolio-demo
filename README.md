# Cypress Portfolio Demo

This repository showcases an automated testing suite developed using **Cypress**. It is designed to demonstrate proficiency in building robust, maintainable, and scalable automated end-to-end (E2E) testing solutions for web applications. The suite covers critical functionalities, emphasizing best practices in test organization and locator management.

## Project Overview

This repository contains a collection of automated E2E tests for a sample web application. The primary goal is to demonstrate expertise in leveraging Cypress for effective web testing.

## Key Features Tested

The automation suite covers the following core application functionalities:

*   **Navigation:** Testing the application's navigation elements and flows.
*   **Search Functionality:** Verifying the search feature to ensure it returns accurate results.

## Technologies Used

*   **Cypress:** The primary E2E testing framework.
*   **TypeScript:** Used for writing test specifications and locator files, providing type safety.
*   **Node.js:** The runtime environment for Cypress.

## Project Structure

The project follows a structured organization to ensure maintainability and reusability, common in Cypress projects:

*   `cypress/`: The root directory for all Cypress-related files.
    *   `e2e/`: Contains the end-to-end test files (`.cy.ts` or `.spec.ts`).
        *   `navigations.cy.ts`: Test suite for navigation features.
        *   `search.cy.ts`: Test suite for search features.
    *   `fixtures/`: Stores static test data (e.g., JSON files) used across tests.
        *   `example.json`: An example fixture file.
    *   `locators/`: Houses files for managing UI element locators, promoting a Page Object Model (POM) pattern.
        *   `navbarComponents.ts`: Defines locators for navigation bar elements.
        *   `searchComponents.ts`: Defines locators for search-related elements.
    *   `screenshots/`: Automatically captures screenshots on test failures.
    *   `support/`: Contains custom commands, global configurations, and support files.
        *   `commands.ts`: For defining custom Cypress commands.
        *   `e2e.ts`: For global E2E test configuration.
*   `cypress.config.ts`: The main configuration file for Cypress.
*   `package.json`: Manages project dependencies and scripts.
*   `tsconfig.json`: TypeScript configuration for the project.

## Design Approach & Best Practices

This project adheres to several key principles for effective E2E testing with Cypress:

*   **Page Object Model (POM):** The `cypress/locators/` directory is used to maintain UI element locators in a centralized manner, improving test readability and maintainability.
*   **Modularity:** Test cases are organized into distinct files within `cypress/e2e/`, each focusing on a specific feature (e.g., navigation, search).
*   **Reusability:** Custom commands defined in `cypress/support/commands.ts` can be used to abstract common testing actions.
*   **Readability:** Using TypeScript for tests and locators enhances code clarity and reduces potential errors.

## Portfolio Value

This project demonstrates the ability to:

*   Set up and configure Cypress for E2E testing.
*   Write robust and maintainable E2E tests using Cypress and TypeScript.
*   Implement a Page Object Model pattern for efficient locator management.
*   Organize test suites logically for clarity and scalability.
*   Understand and apply core concepts of modern web automation frameworks.

## Project Tree
```tree
.
├── LICENSE
├── README.md
├── cypress
│   ├── e2e
│   │   ├── navigations.cy.ts
│   │   └── search.cy.ts
│   ├── fixtures
│   │   └── example.json
│   ├── locators
│   │   ├── navbarComponents.ts
│   │   └── searchComponents.ts
│   ├── screenshots
│   └── support
│       ├── commands.ts
│       └── e2e.ts
├── cypress.config.ts
├── package-lock.json
├── package.json
└── tsconfig.json
```
## Quick Test Overview
```typescript
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
```
```typescript
import { SearchComponents } from "../locators/searchComponents";

describe("Search components", () => {
  beforeEach(() => {
    cy.visit("https://docs.cypress.io/");
  });

  it("open search modal popup", () => {
    cy.get(SearchComponents.SearchButton).click();
    cy.get(SearchComponents.SearchInput).should("be.visible");
  });

  it("open search modal popup with a shortcut key", () => {
    cy.wait(1000);
    cy.get("body").type("{ctrl}k");
    cy.get(SearchComponents.SearchInput).should("be.visible");
  });

  it("close search modal popup", () => {
    cy.get(SearchComponents.SearchButton).click();
    cy.get(SearchComponents.SearchInput).should("be.visible");
    cy.get("body").type("{esc}");
    cy.get(SearchComponents.SearchInput).should("not.exist");
  });

  it("should show quick results when a query is entered in search modal", () => {
    cy.get(SearchComponents.SearchButton).click();
    cy.get(SearchComponents.SearchInput).type("a");
    cy.get(SearchComponents.FirstResult).should("be.visible");
  });

  it("should clear input when clear icon is clicked", () => {
    const text = "clock";
    cy.get(SearchComponents.SearchButton).click();
    cy.get(SearchComponents.SearchInput).type(text);
    cy.get(SearchComponents.SearchInput).should("have.value", text);
    cy.get(SearchComponents.ClearIcon).click();
    cy.get(SearchComponents.SearchInput).should("have.value", "");
  });

  it("should can use arrow key to navigate the quick results", () => {
    cy.get(SearchComponents.SearchButton).click();
    cy.get(SearchComponents.SearchInput).type("a");
    cy.get(SearchComponents.FirstResult).should(
      "have.attr",
      "aria-selected",
      "true",
    );
    cy.get(SearchComponents.SecondResult).should(
      "have.attr",
      "aria-selected",
      "false",
    );
    cy.get(SearchComponents.SearchInput).type("{downarrow}");
    cy.get(SearchComponents.FirstResult).should(
      "have.attr",
      "aria-selected",
      "false",
    );
    cy.get(SearchComponents.SecondResult).should(
      "have.attr",
      "aria-selected",
      "true",
    );
  });

  it("applies search when pressing Enter", () => {
    const text = "clock";
    cy.get(SearchComponents.SearchButton).click();
    cy.get(SearchComponents.SearchInput).type(text);
    cy.get(SearchComponents.FirstResult).should("have.text", text);
    cy.get(SearchComponents.SearchInput).type("{enter}");
    cy.title().should("include", text);
  });

  it("applies search when clicking a quick result", () => {
    const text = "clock";
    cy.get(SearchComponents.SearchButton).click();
    cy.get(SearchComponents.SearchInput).type(text);
    cy.get(SearchComponents.FirstResult).should("have.text", text);
    cy.get(SearchComponents.FirstResult).click();
    cy.title().should("include", text);
  });

  it("adds query to recent searches after applying search", () => {
    const text = "clock";
    cy.get(SearchComponents.SearchButton).click();
    cy.get(SearchComponents.SearchInput).type(text);
    cy.get(SearchComponents.FirstResult).should("have.text", text);
    cy.get(SearchComponents.FirstResult).click();
    cy.get(SearchComponents.SearchButton).click();
    cy.get(SearchComponents.RecentResult).should("have.text", text);
  });

  it("removes a search term from recent searches", () => {
    const text = "clock";
    cy.get(SearchComponents.SearchButton).click();
    cy.get(SearchComponents.SearchInput).type(text);
    cy.get(SearchComponents.FirstResult).should("have.text", text);
    cy.get(SearchComponents.FirstResult).click();
    cy.get(SearchComponents.SearchButton).click();
    cy.get(SearchComponents.RemoveRecentResult).click();
    cy.get(SearchComponents.RecentResult).should("not.exist");
  });
});
```
---

Feel free to reach out if you have any questions or would like to discuss this project further.
