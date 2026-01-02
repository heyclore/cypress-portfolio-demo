Project Tree
```
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
Quick Test Overview
```
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
```
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
