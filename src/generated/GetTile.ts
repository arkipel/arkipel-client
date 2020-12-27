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

export interface GetTile_tile_Tile_constructionSite {
  readonly __typename: 'ConstructionSite';
  readonly id: string;
  readonly infrastructure: Infrastructure;
  readonly workloadLeft: number;
  readonly finishedAt: any;
}

export interface GetTile_tile_Tile_blueprints {
  readonly __typename: 'Blueprint';
  readonly infrastructure: Infrastructure;
  readonly materialCost: number;
  readonly workload: number;
}

export interface GetTile_tile_Tile {
  readonly __typename: 'Tile';
  readonly id: string;
  readonly position: number;
  readonly kind: TileKind;
  readonly infrastructure: Infrastructure;
  readonly level: number;
  readonly constructionSite: GetTile_tile_Tile_constructionSite | null;
  readonly blueprints: ReadonlyArray<GetTile_tile_Tile_blueprints>;
}

export type GetTile_tile = GetTile_tile_NotAuthorized | GetTile_tile_Tile;

export interface GetTile {
  readonly tile: GetTile_tile;
}

export interface GetTileVariables {
  readonly islandId: string;
  readonly position: number;
}
