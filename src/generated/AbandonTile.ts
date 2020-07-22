/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AbandonTile
// ====================================================

export interface AbandonTile_abandonTile_NotAuthorized {
  readonly __typename: 'NotAuthorized';
}

export interface AbandonTile_abandonTile_Tile_owner {
  readonly __typename: 'User';
  readonly id: string;
  readonly numberTiles: number;
}

export interface AbandonTile_abandonTile_Tile {
  readonly __typename: 'Tile';
  readonly id: string;
  readonly owner: AbandonTile_abandonTile_Tile_owner | null;
}

export type AbandonTile_abandonTile =
  | AbandonTile_abandonTile_NotAuthorized
  | AbandonTile_abandonTile_Tile;

export interface AbandonTile {
  readonly abandonTile: AbandonTile_abandonTile | null;
}

export interface AbandonTileVariables {
  readonly userId: string;
  readonly islandId: string;
  readonly position: number;
}
