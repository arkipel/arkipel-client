/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTileOwner
// ====================================================

export interface GetTileOwner_tile_NotFound {
  readonly __typename: 'NotFound';
}

export interface GetTileOwner_tile_Tile_owner {
  readonly __typename: 'User';
  readonly id: string;
}

export interface GetTileOwner_tile_Tile {
  readonly __typename: 'Tile';
  readonly id: string;
  readonly owner: GetTileOwner_tile_Tile_owner | null;
}

export type GetTileOwner_tile =
  | GetTileOwner_tile_NotFound
  | GetTileOwner_tile_Tile;

export interface GetTileOwner {
  readonly tile: GetTileOwner_tile;
}

export interface GetTileOwnerVariables {
  readonly islandID: string;
  readonly position: number;
}
