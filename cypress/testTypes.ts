export enum APIEndpoints {
  Contacts = "/contacts",
  Users = "/users",
}

export enum Routes {
  ContactList = "contactList",
  ContactDetails = "contactDetails",
}

export type Contact = {
  firstName: string;
  lastName: string;
  birthdate: string;
  phone: string;
  street1: string;
  street2: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  email: string;
};
