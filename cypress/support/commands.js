import { faker } from "@faker-js/faker";
import { APIEndpoints } from "../testTypes";
import { generateContactObject } from "../util";

Cypress.Commands.add("creteUserAndReturnToken", () => {
  const someNumber = Date.now();

  cy.request({
    method: "POST",
    url: APIEndpoints.Users,
    body: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: `example${someNumber}@justToShow.com`,
      password: Cypress.env("MY_SECRET_PASSWORD"),
    },
  }).its("body.token");
});

Cypress.Commands.add(
  "createRandomContact",
  (accessToken, contactObject = generateContactObject()) => {
    cy.request({
      method: "POST",
      url: APIEndpoints.Contacts,
      body: contactObject,
      headers: {
        Authorization: "Bearer " + accessToken,
        Awesome: "I love guitars",
      },
    });
  }
);
