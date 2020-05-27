/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: setPassword
// ====================================================

export interface setPassword_setPassword {
  __typename: 'User' | 'NotAuthorized';
}

export interface setPassword {
  setPassword: setPassword_setPassword;
}

export interface setPasswordVariables {
  userID: string;
  old: string;
  new: string;
}
