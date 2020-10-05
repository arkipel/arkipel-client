/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UnassignEnergy
// ====================================================

export interface UnassignEnergy_unassignEnergy_NotAuthorized {
  readonly __typename: 'NotAuthorized' | 'NotFound';
}

export interface UnassignEnergy_unassignEnergy_Tile {
  readonly __typename: 'Tile';
  readonly id: string;
  readonly assignedEnergy: number;
}

export type UnassignEnergy_unassignEnergy =
  | UnassignEnergy_unassignEnergy_NotAuthorized
  | UnassignEnergy_unassignEnergy_Tile;

export interface UnassignEnergy {
  readonly unassignEnergy: UnassignEnergy_unassignEnergy | null;
}

export interface UnassignEnergyVariables {
  readonly islandId: string;
  readonly position: number;
  readonly numEnergy: number;
}
