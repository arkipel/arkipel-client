/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UnassignWorkers
// ====================================================

export interface UnassignWorkers_unassignWorkers_NotAuthorized {
  readonly __typename: 'NotAuthorized' | 'NotFound';
}

export interface UnassignWorkers_unassignWorkers_Tile_island_inventory {
  readonly __typename: 'Inventory';
  readonly id: string;
  readonly assignedWorkers: number;
}

export interface UnassignWorkers_unassignWorkers_Tile_island {
  readonly __typename: 'Island';
  readonly id: string;
  readonly inventory: UnassignWorkers_unassignWorkers_Tile_island_inventory;
}

export interface UnassignWorkers_unassignWorkers_Tile {
  readonly __typename: 'Tile';
  readonly id: string;
  readonly assignedWorkers: number;
  readonly island: UnassignWorkers_unassignWorkers_Tile_island;
}

export type UnassignWorkers_unassignWorkers =
  | UnassignWorkers_unassignWorkers_NotAuthorized
  | UnassignWorkers_unassignWorkers_Tile;

export interface UnassignWorkers {
  readonly unassignWorkers: UnassignWorkers_unassignWorkers | null;
}

export interface UnassignWorkersVariables {
  readonly islandId: string;
  readonly position: number;
  readonly numWorkers: number;
}
