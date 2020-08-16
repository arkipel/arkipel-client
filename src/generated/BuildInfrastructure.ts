/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Infrastructure } from './globalTypes';

// ====================================================
// GraphQL mutation operation: BuildInfrastructure
// ====================================================

export interface BuildInfrastructure_buildInfrastructure_NotAuthorized {
  readonly __typename: 'NotAuthorized' | 'NotFound';
}

export interface BuildInfrastructure_buildInfrastructure_Tile_constructionSite {
  readonly __typename: 'ConstructionSite';
  readonly finishedAt: any;
}

export interface BuildInfrastructure_buildInfrastructure_Tile {
  readonly __typename: 'Tile';
  readonly id: string;
  readonly infrastructure: Infrastructure;
  readonly level: number;
  readonly constructionSite: BuildInfrastructure_buildInfrastructure_Tile_constructionSite | null;
}

export type BuildInfrastructure_buildInfrastructure =
  | BuildInfrastructure_buildInfrastructure_NotAuthorized
  | BuildInfrastructure_buildInfrastructure_Tile;

export interface BuildInfrastructure {
  readonly buildInfrastructure: BuildInfrastructure_buildInfrastructure | null;
}

export interface BuildInfrastructureVariables {
  readonly islandId: string;
  readonly position: number;
  readonly infrastructure: Infrastructure;
}
