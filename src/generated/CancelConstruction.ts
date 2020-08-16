/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Infrastructure } from './globalTypes';

// ====================================================
// GraphQL mutation operation: CancelConstruction
// ====================================================

export interface CancelConstruction_cancelConstruction_NotAuthorized {
  readonly __typename: 'NotAuthorized' | 'NotFound';
}

export interface CancelConstruction_cancelConstruction_Tile_constructionSite {
  readonly __typename: 'ConstructionSite';
  readonly finishedAt: any;
}

export interface CancelConstruction_cancelConstruction_Tile {
  readonly __typename: 'Tile';
  readonly id: string;
  readonly infrastructure: Infrastructure;
  readonly level: number;
  readonly constructionSite: CancelConstruction_cancelConstruction_Tile_constructionSite | null;
}

export type CancelConstruction_cancelConstruction =
  | CancelConstruction_cancelConstruction_NotAuthorized
  | CancelConstruction_cancelConstruction_Tile;

export interface CancelConstruction {
  readonly cancelConstruction: CancelConstruction_cancelConstruction | null;
}

export interface CancelConstructionVariables {
  readonly islandId: string;
  readonly position: number;
}