/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEmailAddress
// ====================================================

export interface GetEmailAddress_me_NotFound {
  readonly __typename: 'NotFound' | 'NotAuthorized';
}

export interface GetEmailAddress_me_User {
  readonly __typename: 'User';
  readonly id: string;
  readonly emailAddress: string | null;
}

export type GetEmailAddress_me =
  | GetEmailAddress_me_NotFound
  | GetEmailAddress_me_User;

export interface GetEmailAddress {
  readonly me: GetEmailAddress_me;
}

export interface GetEmailAddressVariables {
  readonly userID: string;
}
