/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteEmailAddress
// ====================================================

export interface DeleteEmailAddress_deleteEmailAddress_NotAuthorized {
  readonly __typename: 'NotAuthorized';
}

export interface DeleteEmailAddress_deleteEmailAddress_User {
  readonly __typename: 'User';
  readonly id: string;
  readonly emailAddress: string | null;
}

export type DeleteEmailAddress_deleteEmailAddress =
  | DeleteEmailAddress_deleteEmailAddress_NotAuthorized
  | DeleteEmailAddress_deleteEmailAddress_User;

export interface DeleteEmailAddress {
  readonly deleteEmailAddress: DeleteEmailAddress_deleteEmailAddress;
}

export interface DeleteEmailAddressVariables {
  readonly userId: string;
}
