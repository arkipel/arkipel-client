/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: register
// ====================================================

export interface register_register_User {
  __typename: 'User';
  id: string;
  username: string;
}

export interface register_register_AlreadyExists {
  __typename: 'AlreadyExists';
  identifier: string | null;
}

export type register_register =
  | register_register_User
  | register_register_AlreadyExists;

export interface register {
  register: register_register;
}

export interface registerVariables {
  username: string;
  password: string;
  captcha: string;
}
