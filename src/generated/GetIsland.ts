/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Infrastructure } from './globalTypes';

// ====================================================
// GraphQL query operation: GetIsland
// ====================================================

export interface GetIsland_island_NotFound {
  readonly __typename: 'NotFound' | 'NotAuthorized';
}

export interface GetIsland_island_Island_owner {
  readonly __typename: 'User';
  readonly id: string;
  readonly username: string;
}

export interface GetIsland_island_Island_tiles {
  readonly __typename: 'Tile';
  readonly id: string;
  readonly position: number;
  readonly infrastructure: Infrastructure;
  readonly level: number;
}

export interface GetIsland_island_Island {
  readonly __typename: 'Island';
  readonly id: string;
  readonly owner: GetIsland_island_Island_owner;
  readonly tiles: ReadonlyArray<GetIsland_island_Island_tiles>;
}

export type GetIsland_island =
  | GetIsland_island_NotFound
  | GetIsland_island_Island;

export interface GetIsland {
  readonly island: GetIsland_island;
}

export interface GetIslandVariables {
  readonly islandId: string;
}
