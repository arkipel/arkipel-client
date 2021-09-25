/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Register
// ====================================================

export interface Register_register_User {
  readonly __typename: "User";
  readonly id: string;
  readonly username: string;
}

export interface Register_register_AlreadyExists {
  readonly __typename: "AlreadyExists";
  readonly identifier: string | null;
}

export type Register_register = Register_register_User | Register_register_AlreadyExists;

export interface Register {
  readonly register: Register_register;
}

export interface RegisterVariables {
  readonly username: string;
  readonly password: string;
  readonly captcha: string;
}
