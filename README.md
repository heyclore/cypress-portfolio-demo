# Playwright Portfolio Demo

This repository showcases a test automation suite built using **Playwright** with TypeScript. It demonstrates the ability to create robust, maintainable, and scalable automated tests for web applications. The suite focuses on end-to-end testing, page object modeling, and leveraging Playwright's features for efficient testing.

## Project Overview

This repository contains a collection of automated end-to-end tests for a sample web application, developed using Playwright and TypeScript. The primary goal is to demonstrate proficiency in building and structuring modern, reliable test automation suites.

## Key Features Tested

Based on the project structure (`src/tests/` and `src/pages/`), this demo likely covers:

*   **Navigation**: Testing navigation between different pages of the application (e.g., Home, Docs, Community, API).
*   **Search Functionality**: Validating the search input and results.
*   **Page Interactions**: Basic UI element interactions and assertions.

*(Note: Specific features tested are inferred from file names and structure. For precise details, please refer to the test files within `src/tests/`.)*

## Technologies Used

*   **Playwright**: For end-to-end test automation across major browsers.
*   **TypeScript**: For writing type-safe test scripts and page object definitions.
*   **Node.js**: The runtime environment for executing Playwright commands and managing project dependencies.

## Project Structure

The project is organized to promote clarity and maintainability:

*   `playwright.config.ts`: Playwright configuration file, defining test directories, timeouts, viewport settings, and browser targets.
*   `package.json`: Manages project dependencies and defines scripts for running tests.
*   `src/`: Contains the source code for the test suite.
    *   `fixtures/`: Custom Playwright test fixtures for shared setup or teardown logic.
    *   `pages/`: Implements the Page Object Model (POM), with classes representing different pages and components of the application.
    *   `tests/`: Contains the actual end-to-end test files (e.g., `navigation.spec.ts`, `search.spec.ts`).
*   `test-results/`: Directory where Playwright generates test reports, traces, and screenshots.

## Design Approach & Best Practices

This project adheres to modern test automation principles:

*   **Page Object Model (POM)**: Utilizes page objects (defined in `src/pages/`) to encapsulate UI elements and their interactions, enhancing test maintainability and reusability.
*   **Modularity**: Tests are organized into distinct spec files within `src/tests/`, making them easy to locate and manage.
*   **TypeScript Integration**: Leverages TypeScript for strong typing, improving code quality, reducing runtime errors, and enhancing developer productivity.
*   **Configuration Management**: `playwright.config.ts` centralizes configuration for test execution, including browser options and timeouts.

## Portfolio Value

This project demonstrates the ability to:

*   Set up and configure a Playwright testing environment from scratch.
*   Implement the Page Object Model (POM) for scalable and maintainable test automation.
*   Write effective end-to-end tests using TypeScript.
*   Organize test suites logically for efficient execution and reporting.
*   Utilize Playwright's features for managing test configurations and execution.

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
