/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: setEmailAddress
// ====================================================

export interface setEmailAddress_setEmailAddress_AlreadyExists {
  __typename: 'AlreadyExists' | 'NotAuthorized';
}

export interface setEmailAddress_setEmailAddress_User {
  __typename: 'User';
  id: string;
  emailAddress: string | null;
}

export type setEmailAddress_setEmailAddress =
  | setEmailAddress_setEmailAddress_AlreadyExists
  | setEmailAddress_setEmailAddress_User;

export interface setEmailAddress {
  setEmailAddress: setEmailAddress_setEmailAddress;
}

export interface setEmailAddressVariables {
  userID: string;
  emailAddress: string;
}
