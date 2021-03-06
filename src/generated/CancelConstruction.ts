/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Infrastructure } from './globalTypes';

// ====================================================
// GraphQL mutation operation: CancelConstruction
// ====================================================

export interface CancelConstruction_cancelConstruction_NotAuthorized {
  readonly __typename: 'NotAuthorized' | 'NotFound';
}

export interface CancelConstruction_cancelConstruction_Tile_constructionSite {
  readonly __typename: 'ConstructionSite';
  readonly id: string;
}

export interface CancelConstruction_cancelConstruction_Tile_blueprints {
  readonly __typename: 'Blueprint';
  readonly infrastructure: Infrastructure;
  readonly materialCost: number;
  readonly workload: number;
}

export interface CancelConstruction_cancelConstruction_Tile_island_inventory {
  readonly __typename: 'Inventory';
  readonly id: string;
  readonly material: number;
}

export interface CancelConstruction_cancelConstruction_Tile_island {
  readonly __typename: 'Island';
  readonly id: string;
  readonly inventory: CancelConstruction_cancelConstruction_Tile_island_inventory;
}

export interface CancelConstruction_cancelConstruction_Tile {
  readonly __typename: 'Tile';
  readonly id: string;
  readonly position: number;
  readonly infrastructure: Infrastructure;
  readonly level: number;
  readonly constructionSite: CancelConstruction_cancelConstruction_Tile_constructionSite | null;
  readonly blueprints: ReadonlyArray<CancelConstruction_cancelConstruction_Tile_blueprints>;
  readonly island: CancelConstruction_cancelConstruction_Tile_island;
}

export type CancelConstruction_cancelConstruction =
  | CancelConstruction_cancelConstruction_NotAuthorized
  | CancelConstruction_cancelConstruction_Tile;

export interface CancelConstruction {
  readonly cancelConstruction: CancelConstruction_cancelConstruction | null;
}

export interface CancelConstructionVariables {
  readonly islandId: string;
  readonly position: number;
}
