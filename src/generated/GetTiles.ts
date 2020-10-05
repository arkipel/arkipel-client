/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TileKind, Infrastructure } from './globalTypes';

// ====================================================
// GraphQL query operation: GetTiles
// ====================================================

export interface GetTiles_island_NotFound {
  readonly __typename: 'NotFound' | 'NotAuthorized';
}

export interface GetTiles_island_Island_tiles {
  readonly __typename: 'Tile';
  readonly id: string;
  readonly position: number;
  readonly kind: TileKind;
  readonly infrastructure: Infrastructure;
  readonly level: number;
  readonly isActive: boolean;
  readonly assignedWorkers: number;
  readonly assignedEnergy: number;
  readonly housingCapacity: number;
  readonly materialProduction: number;
  readonly energyProduction: number;
  readonly requiredWorkforce: number;
  readonly energyConsumption: number;
}

export interface GetTiles_island_Island {
  readonly __typename: 'Island';
  readonly id: string;
  readonly tiles: ReadonlyArray<GetTiles_island_Island_tiles>;
}

export type GetTiles_island = GetTiles_island_NotFound | GetTiles_island_Island;

export interface GetTiles {
  readonly island: GetTiles_island;
}

export interface GetTilesVariables {
  readonly islandId: string;
}
