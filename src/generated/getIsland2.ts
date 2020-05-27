/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getIsland2
// ====================================================

export interface getIsland2_island_NotFound {
  __typename: 'NotFound' | 'NotAuthorized';
}

export interface getIsland2_island_Island {
  __typename: 'Island';
  id: string;
  name: string;
  dna: string;
}

export type getIsland2_island =
  | getIsland2_island_NotFound
  | getIsland2_island_Island;

export interface getIsland2 {
  island: getIsland2_island | null;
}

export interface getIsland2Variables {
  islandID: string;
}
