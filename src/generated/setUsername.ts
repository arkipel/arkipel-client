/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: setUsername
// ====================================================

export interface setUsername_setUsername {
  __typename: 'User' | 'AlreadyExists' | 'NotAuthorized';
}

export interface setUsername {
  setUsername: setUsername_setUsername;
}

export interface setUsernameVariables {
  userID: string;
  username: string;
}
