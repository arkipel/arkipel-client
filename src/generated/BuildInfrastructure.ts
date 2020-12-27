/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Infrastructure } from './globalTypes';

// ====================================================
// GraphQL mutation operation: BuildInfrastructure
// ====================================================

export interface BuildInfrastructure_buildInfrastructure_NotAuthorized {
  readonly __typename: 'NotAuthorized' | 'NotFound' | 'NotEnoughMaterial';
}

export interface BuildInfrastructure_buildInfrastructure_Tile_constructionSite_tile {
  readonly __typename: 'Tile';
  readonly position: number;
}

export interface BuildInfrastructure_buildInfrastructure_Tile_constructionSite {
  readonly __typename: 'ConstructionSite';
  readonly id: string;
  readonly infrastructure: Infrastructure;
  readonly workloadLeft: number;
  readonly finishedAt: any;
  readonly tile: BuildInfrastructure_buildInfrastructure_Tile_constructionSite_tile;
}

export interface BuildInfrastructure_buildInfrastructure_Tile_blueprints {
  readonly __typename: 'Blueprint';
  readonly infrastructure: Infrastructure;
  readonly materialCost: number;
  readonly workload: number;
}

export interface BuildInfrastructure_buildInfrastructure_Tile {
  readonly __typename: 'Tile';
  readonly id: string;
  readonly infrastructure: Infrastructure;
  readonly level: number;
  readonly constructionSite: BuildInfrastructure_buildInfrastructure_Tile_constructionSite | null;
  readonly blueprints: ReadonlyArray<BuildInfrastructure_buildInfrastructure_Tile_blueprints>;
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
