/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AssignWorkers
// ====================================================

export interface AssignWorkers_assignWorkers_NotAuthorized {
  readonly __typename: 'NotAuthorized' | 'NotFound';
}

export interface AssignWorkers_assignWorkers_Tile_island_inventory {
  readonly __typename: 'Inventory';
  readonly id: string;
  readonly assignedWorkers: number;
}

export interface AssignWorkers_assignWorkers_Tile_island {
  readonly __typename: 'Island';
  readonly id: string;
  readonly inventory: AssignWorkers_assignWorkers_Tile_island_inventory;
}

export interface AssignWorkers_assignWorkers_Tile {
  readonly __typename: 'Tile';
  readonly id: string;
  readonly assignedWorkers: number;
  readonly island: AssignWorkers_assignWorkers_Tile_island;
}

export type AssignWorkers_assignWorkers =
  | AssignWorkers_assignWorkers_NotAuthorized
  | AssignWorkers_assignWorkers_Tile;

export interface AssignWorkers {
  readonly assignWorkers: AssignWorkers_assignWorkers | null;
}

export interface AssignWorkersVariables {
  readonly islandId: string;
  readonly position: number;
  readonly numWorkers: number;
}
