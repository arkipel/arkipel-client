/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetEmailAddress
// ====================================================

export interface SetEmailAddress_setEmailAddress_AlreadyExists {
  readonly __typename: 'AlreadyExists' | 'NotAuthorized';
}

export interface SetEmailAddress_setEmailAddress_User {
  readonly __typename: 'User';
  readonly id: string;
  readonly emailAddress: string | null;
}

export type SetEmailAddress_setEmailAddress =
  | SetEmailAddress_setEmailAddress_AlreadyExists
  | SetEmailAddress_setEmailAddress_User;

export interface SetEmailAddress {
  readonly setEmailAddress: SetEmailAddress_setEmailAddress;
}

export interface SetEmailAddressVariables {
  readonly userId: string;
  readonly emailAddress: string;
}
