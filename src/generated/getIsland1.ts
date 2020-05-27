/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getIsland1
// ====================================================

export interface getIsland1_island_NotFound {
  __typename: 'NotFound' | 'NotAuthorized';
}

export interface getIsland1_island_Island {
  __typename: 'Island';
  id: string;
  name: string;
  active: boolean;
}

export type getIsland1_island =
  | getIsland1_island_NotFound
  | getIsland1_island_Island;

export interface getIsland1 {
  island: getIsland1_island | null;
}

export interface getIsland1Variables {
  islandID: string;
}
