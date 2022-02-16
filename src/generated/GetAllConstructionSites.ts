/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Infrastructure } from './globalTypes';

// ====================================================
// GraphQL query operation: GetAllConstructionSites
// ====================================================

export interface GetAllConstructionSites_island_NotFound {
  readonly __typename: 'NotFound' | 'NotAuthorized';
}

export interface GetAllConstructionSites_island_Island_constructionSites_tile {
  readonly __typename: 'Tile';
  readonly position: number;
  readonly level: number;
}

export interface GetAllConstructionSites_island_Island_constructionSites {
  readonly __typename: 'ConstructionSite';
  readonly id: string;
  readonly infrastructure: Infrastructure;
  readonly workloadLeft: number;
  readonly finishedAt: any;
  readonly tile: GetAllConstructionSites_island_Island_constructionSites_tile;
}

export interface GetAllConstructionSites_island_Island {
  readonly __typename: 'Island';
  readonly id: string;
  readonly constructionSites: ReadonlyArray<GetAllConstructionSites_island_Island_constructionSites>;
}

export type GetAllConstructionSites_island =
  | GetAllConstructionSites_island_NotFound
  | GetAllConstructionSites_island_Island;

export interface GetAllConstructionSites {
  readonly island: GetAllConstructionSites_island;
}

export interface GetAllConstructionSitesVariables {
  readonly islandId: string;
}
