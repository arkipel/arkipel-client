/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetUsername
// ====================================================

export interface SetUsername_setUsername {
  readonly __typename: 'User' | 'AlreadyExists' | 'NotAuthorized';
}

export interface SetUsername {
  readonly setUsername: SetUsername_setUsername;
}

export interface SetUsernameVariables {
  readonly userId: string;
  readonly username: string;
}
