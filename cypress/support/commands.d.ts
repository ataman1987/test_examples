// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts

import { Contact } from "@scr/testTypes";

// with a <reference path="./component" /> at the top of your spec.
export {};

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to create a random user and to return his accessToken.
       * I've decided to add this command after
       * I've seen that the database of our test app might be deleted anytime.
       * @example cy.creteUserAndReturnToken('').then((token)=> {
       *              cy.requestThatRequiresToken(token)
       * })
       */
      creteUserAndReturnToken(): Cypress.Chainable;
      /**
       * Custom command to create a random contact. It requires an `accessToken: string`
       * to authorize request. There is also an optional param `contactObject` to be able to provide defined
       * data following `Contact` type schema.
       * @example cy.createRandomContact(accessToken)
       * })
       */
      createRandomContact(
        accessToken: string,
        contactObject?: Contact
      ): Cypress.Chainable;
    }
  }
}
