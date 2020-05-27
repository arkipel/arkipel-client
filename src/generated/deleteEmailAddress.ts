/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteEmailAddress
// ====================================================

export interface deleteEmailAddress_deleteEmailAddress_NotAuthorized {
  __typename: 'NotAuthorized';
}

export interface deleteEmailAddress_deleteEmailAddress_User {
  __typename: 'User';
  id: string;
  emailAddress: string | null;
}

export type deleteEmailAddress_deleteEmailAddress =
  | deleteEmailAddress_deleteEmailAddress_NotAuthorized
  | deleteEmailAddress_deleteEmailAddress_User;

export interface deleteEmailAddress {
  deleteEmailAddress: deleteEmailAddress_deleteEmailAddress;
}

export interface deleteEmailAddressVariables {
  userID: string;
}
