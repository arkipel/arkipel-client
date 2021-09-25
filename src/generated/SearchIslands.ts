/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchIslands
// ====================================================

export interface SearchIslands_searchIslands_NotAuthorized {
  readonly __typename: 'NotAuthorized';
}

export interface SearchIslands_searchIslands_IslandList_islands {
  readonly __typename: 'Island';
  readonly id: string;
  readonly name: string;
}

export interface SearchIslands_searchIslands_IslandList {
  readonly __typename: 'IslandList';
  readonly islands: ReadonlyArray<SearchIslands_searchIslands_IslandList_islands>;
}

export type SearchIslands_searchIslands =
  | SearchIslands_searchIslands_NotAuthorized
  | SearchIslands_searchIslands_IslandList;

export interface SearchIslands {
  readonly searchIslands: SearchIslands_searchIslands;
}

export interface SearchIslandsVariables {
  readonly term: string;
}
