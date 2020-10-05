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

export interface AssignWorkers_assignWorkers_Tile {
  readonly __typename: 'Tile';
  readonly id: string;
  readonly assignedWorkers: number;
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
