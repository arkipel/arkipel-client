/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getEmailAddress
// ====================================================

export interface getEmailAddress_me_NotFound {
  __typename: 'NotFound' | 'NotAuthorized';
}

export interface getEmailAddress_me_User {
  __typename: 'User';
  id: string;
  emailAddress: string | null;
}

export type getEmailAddress_me =
  | getEmailAddress_me_NotFound
  | getEmailAddress_me_User;

export interface getEmailAddress {
  me: getEmailAddress_me;
}

export interface getEmailAddressVariables {
  userID: string;
}
