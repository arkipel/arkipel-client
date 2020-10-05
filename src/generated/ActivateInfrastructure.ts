/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ActivateInfrastructure
// ====================================================

export interface ActivateInfrastructure_activateInfrastructure_NotAuthorized {
  readonly __typename: 'NotAuthorized' | 'NotFound';
}

export interface ActivateInfrastructure_activateInfrastructure_Tile {
  readonly __typename: 'Tile';
  readonly id: string;
  readonly isActive: boolean;
}

export type ActivateInfrastructure_activateInfrastructure =
  | ActivateInfrastructure_activateInfrastructure_NotAuthorized
  | ActivateInfrastructure_activateInfrastructure_Tile;

export interface ActivateInfrastructure {
  readonly activateInfrastructure: ActivateInfrastructure_activateInfrastructure | null;
}

export interface ActivateInfrastructureVariables {
  readonly islandId: string;
  readonly position: number;
}
