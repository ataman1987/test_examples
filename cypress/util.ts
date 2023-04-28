import { faker } from "@faker-js/faker";

export const generateContactObject = () => {
  const contactObject = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    birthdate: "1970-02-12",
    phone: faker.phone.number("#########"),
    street1: faker.address.streetName(),
    street2: faker.address.streetName(),
    city: faker.address.city(),
    stateProvince: faker.address.stateAbbr(),
    postalCode: faker.address.zipCode(),
    country: faker.address.countryCode(),
    email: faker.internet.email().toLowerCase(),
  };
  return contactObject;
};
