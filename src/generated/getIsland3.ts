/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getIsland3
// ====================================================

export interface getIsland3_island_NotFound {
  __typename: 'NotFound' | 'NotAuthorized';
}

export interface getIsland3_island_Island {
  __typename: 'Island';
  name: string;
}

export type getIsland3_island =
  | getIsland3_island_NotFound
  | getIsland3_island_Island;

export interface getIsland3 {
  island: getIsland3_island | null;
}

export interface getIsland3Variables {
  islandID: string;
}
