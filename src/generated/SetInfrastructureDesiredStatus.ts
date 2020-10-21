/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InfrastructureStatus } from './globalTypes';

// ====================================================
// GraphQL mutation operation: SetInfrastructureDesiredStatus
// ====================================================

export interface SetInfrastructureDesiredStatus_setInfrastructureDesiredStatus_NotAuthorized {
  readonly __typename: 'NotAuthorized' | 'NotFound';
}

export interface SetInfrastructureDesiredStatus_setInfrastructureDesiredStatus_Tile {
  readonly __typename: 'Tile';
  readonly id: string;
  readonly desiredStatus: InfrastructureStatus;
  readonly currentStatus: InfrastructureStatus;
  readonly population: number;
  readonly material: number;
  readonly energy: number;
}

export type SetInfrastructureDesiredStatus_setInfrastructureDesiredStatus =
  | SetInfrastructureDesiredStatus_setInfrastructureDesiredStatus_NotAuthorized
  | SetInfrastructureDesiredStatus_setInfrastructureDesiredStatus_Tile;

export interface SetInfrastructureDesiredStatus {
  readonly setInfrastructureDesiredStatus: SetInfrastructureDesiredStatus_setInfrastructureDesiredStatus | null;
}

export interface SetInfrastructureDesiredStatusVariables {
  readonly islandId: string;
  readonly position: number;
  readonly status: InfrastructureStatus;
}
