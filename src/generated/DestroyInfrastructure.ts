/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Infrastructure } from './globalTypes';

// ====================================================
// GraphQL mutation operation: DestroyInfrastructure
// ====================================================

export interface DestroyInfrastructure_destroyInfrastructure_NotAuthorized {
  readonly __typename: 'NotAuthorized';
}

export interface DestroyInfrastructure_destroyInfrastructure_Tile_constructionSite {
  readonly __typename: 'ConstructionSite';
  readonly finishedAt: any;
}

export interface DestroyInfrastructure_destroyInfrastructure_Tile {
  readonly __typename: 'Tile';
  readonly id: string;
  readonly infrastructure: Infrastructure;
  readonly level: number;
  readonly constructionSite: DestroyInfrastructure_destroyInfrastructure_Tile_constructionSite | null;
}

export type DestroyInfrastructure_destroyInfrastructure =
  | DestroyInfrastructure_destroyInfrastructure_NotAuthorized
  | DestroyInfrastructure_destroyInfrastructure_Tile;

export interface DestroyInfrastructure {
  readonly destroyInfrastructure: DestroyInfrastructure_destroyInfrastructure | null;
}

export interface DestroyInfrastructureVariables {
  readonly islandId: string;
  readonly position: number;
}
