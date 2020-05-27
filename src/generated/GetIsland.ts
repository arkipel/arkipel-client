/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetIsland
// ====================================================

export interface GetIsland_island_NotFound {
  readonly __typename: 'NotFound' | 'NotAuthorized';
}

export interface GetIsland_island_Island {
  readonly __typename: 'Island';
  readonly id: string;
  readonly name: string;
  readonly dna: string;
  readonly active: boolean;
}

export type GetIsland_island =
  | GetIsland_island_NotFound
  | GetIsland_island_Island;

export interface GetIsland {
  readonly island: GetIsland_island;
}

export interface GetIslandVariables {
  readonly islandID: string;
}
