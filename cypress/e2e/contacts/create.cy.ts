import { generateContactObject } from "@scr/util";

describe("Creates contact", () => {
  let accessToken: string;

  before(() => {
    cy.creteUserAndReturnToken().then((token) => {
      accessToken = token;
    });
  });

  for (let call = 0; call < 10; call++) {
    it(`successfully with index ${call}`, () => {
      const contact = generateContactObject();

      cy.createRandomContact(accessToken, contact).then(({ body, status }) => {
        expect(status).eq(201);
        expect(body).to.deep.include(contact);
      });
    });
  }
});
