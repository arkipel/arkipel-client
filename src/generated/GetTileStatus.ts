/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InfrastructureStatus } from './globalTypes';

// ====================================================
// GraphQL query operation: GetTileStatus
// ====================================================

export interface GetTileStatus_tile_NotAuthorized {
  readonly __typename: 'NotAuthorized' | 'NotFound';
}

export interface GetTileStatus_tile_Tile {
  readonly __typename: 'Tile';
  readonly id: string;
  readonly desiredStatus: InfrastructureStatus;
}

export type GetTileStatus_tile =
  | GetTileStatus_tile_NotAuthorized
  | GetTileStatus_tile_Tile;

export interface GetTileStatus {
  readonly tile: GetTileStatus_tile;
}

export interface GetTileStatusVariables {
  readonly islandId: string;
  readonly position: number;
}
