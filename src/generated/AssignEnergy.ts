/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AssignEnergy
// ====================================================

export interface AssignEnergy_assignEnergy_NotAuthorized {
  readonly __typename: 'NotAuthorized' | 'NotFound';
}

export interface AssignEnergy_assignEnergy_Tile {
  readonly __typename: 'Tile';
  readonly id: string;
  readonly assignedEnergy: number;
}

export type AssignEnergy_assignEnergy =
  | AssignEnergy_assignEnergy_NotAuthorized
  | AssignEnergy_assignEnergy_Tile;

export interface AssignEnergy {
  readonly assignEnergy: AssignEnergy_assignEnergy | null;
}

export interface AssignEnergyVariables {
  readonly islandId: string;
  readonly position: number;
  readonly numEnergy: number;
}
