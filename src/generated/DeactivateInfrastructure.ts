/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeactivateInfrastructure
// ====================================================

export interface DeactivateInfrastructure_deactivateInfrastructure_NotAuthorized {
  readonly __typename: 'NotAuthorized' | 'NotFound';
}

export interface DeactivateInfrastructure_deactivateInfrastructure_Tile {
  readonly __typename: 'Tile';
  readonly id: string;
  readonly isActive: boolean;
}

export type DeactivateInfrastructure_deactivateInfrastructure =
  | DeactivateInfrastructure_deactivateInfrastructure_NotAuthorized
  | DeactivateInfrastructure_deactivateInfrastructure_Tile;

export interface DeactivateInfrastructure {
  readonly deactivateInfrastructure: DeactivateInfrastructure_deactivateInfrastructure | null;
}

export interface DeactivateInfrastructureVariables {
  readonly islandId: string;
  readonly position: number;
}
