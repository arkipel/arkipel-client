/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TileKind, Infrastructure } from './globalTypes';

// ====================================================
// GraphQL query operation: GetTile
// ====================================================

export interface GetTile_tile_NotAuthorized {
  readonly __typename: 'NotAuthorized' | 'NotFound';
}

export interface GetTile_tile_Tile {
  readonly __typename: 'Tile';
  readonly id: string;
  readonly kind: TileKind;
  readonly infrastructure: Infrastructure;
  readonly level: number;
}

export type GetTile_tile = GetTile_tile_NotAuthorized | GetTile_tile_Tile;

export interface GetTile {
  readonly tile: GetTile_tile;
}

export interface GetTileVariables {
  readonly islandId: string;
  readonly position: number;
}
