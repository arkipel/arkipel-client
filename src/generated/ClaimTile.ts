/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ClaimTile
// ====================================================

export interface ClaimTile_claimTile_NotAuthorized {
  readonly __typename: 'NotAuthorized';
}

export interface ClaimTile_claimTile_Tile_owner {
  readonly __typename: 'User';
  readonly id: string;
}

export interface ClaimTile_claimTile_Tile {
  readonly __typename: 'Tile';
  readonly id: string;
  readonly owner: ClaimTile_claimTile_Tile_owner | null;
}

export type ClaimTile_claimTile =
  | ClaimTile_claimTile_NotAuthorized
  | ClaimTile_claimTile_Tile;

export interface ClaimTile {
  readonly claimTile: ClaimTile_claimTile | null;
}

export interface ClaimTileVariables {
  readonly userID: string;
  readonly islandID: string;
  readonly position: number;
}
