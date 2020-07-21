/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetNumberTiles
// ====================================================

export interface GetNumberTiles_me_NotFound {
  readonly __typename: 'NotFound' | 'NotAuthorized';
}

export interface GetNumberTiles_me_User {
  readonly __typename: 'User';
  readonly id: string;
  readonly numberTiles: number;
}

export type GetNumberTiles_me =
  | GetNumberTiles_me_NotFound
  | GetNumberTiles_me_User;

export interface GetNumberTiles {
  readonly me: GetNumberTiles_me;
}

export interface GetNumberTilesVariables {
  readonly userId: string;
}
