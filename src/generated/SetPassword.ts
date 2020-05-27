/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetPassword
// ====================================================

export interface SetPassword_setPassword {
  readonly __typename: 'User' | 'NotAuthorized';
}

export interface SetPassword {
  readonly setPassword: SetPassword_setPassword;
}

export interface SetPasswordVariables {
  readonly userID: string;
  readonly old: string;
  readonly new: string;
}
