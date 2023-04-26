import { Routes } from "@scr/testTypes";

describe("Delete contacts", () => {
  let accessToken: string;

  const rowInTableSelector = 'table[id="myTable"] > tr';
  const deleteButtonSelector = 'button[id="delete"]';

  const tableRawAtIndex = (index: number): Cypress.Chainable => {
    return cy.get(rowInTableSelector).eq(index);
  };

  const urlEquals = (url: Routes): void => {
    cy.url().should("eq", Cypress.config("baseUrl") + url);
  };

  const assertDeletionById = (id: string): void => {
    cy.wait("@deleteRequest").then((request) => {
      expect(request.request.url).to.include(id);
      expect(request.response.statusCode).equal(200);
    });
    urlEquals(Routes.ContactList);
    cy.get(rowInTableSelector).should("have.length", 5);
  };

  beforeEach(() => {
    cy.creteUserAndReturnToken()
      .then((token) => {
        accessToken = token;
        cy.setCookie("token", accessToken);
      })
      .then(() => {
        for (let call = 1; call < 7; call++) {
          cy.createRandomContact(accessToken);
        }
        cy.visit(Routes.ContactList);
        cy.intercept("DELETE", "**/contacts/**").as("deleteRequest");
        cy.get(rowInTableSelector).should("have.length", 6);
      });
  });

  it("from the first row", () => {
    cy.get(rowInTableSelector)
      .first()
      .find("td:hidden")
      .invoke("text")
      .then((id) => {
        cy.get(rowInTableSelector).first().click();
        urlEquals(Routes.ContactDetails);
        cy.get(deleteButtonSelector).click();
        assertDeletionById(id);
      });
  });

  it("from the 6th row", () => {
    tableRawAtIndex(5)
      .find("td:hidden")
      .invoke("text")
      .then((id) => {
        tableRawAtIndex(5).click();
        urlEquals(Routes.ContactDetails);
        cy.get(deleteButtonSelector).click();
        assertDeletionById(id);
      });
  });
});
