/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Infrastructure } from './globalTypes';

// ====================================================
// GraphQL fragment: NewConstructionSite
// ====================================================

export interface NewConstructionSite_tile {
  readonly __typename: 'Tile';
  readonly position: number;
}

export interface NewConstructionSite {
  readonly __typename: 'ConstructionSite';
  readonly id: string;
  readonly infrastructure: Infrastructure;
  readonly workloadLeft: number;
  readonly finishedAt: any;
  readonly tile: NewConstructionSite_tile;
}
