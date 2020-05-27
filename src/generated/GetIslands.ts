/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetIslands
// ====================================================

export interface GetIslands_islands {
  readonly __typename: 'Island';
  readonly id: string;
  readonly name: string;
  readonly active: boolean;
}

export interface GetIslands {
  readonly islands: ReadonlyArray<GetIslands_islands>;
}
