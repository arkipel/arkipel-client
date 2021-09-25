/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Infrastructure } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpgradeInfrastructure
// ====================================================

export interface UpgradeInfrastructure_upgradeInfrastructure_NotAuthorized {
  readonly __typename: "NotAuthorized" | "NotFound" | "NotEnoughMaterial";
}

export interface UpgradeInfrastructure_upgradeInfrastructure_Tile_constructionSite_tile {
  readonly __typename: "Tile";
  readonly position: number;
}

export interface UpgradeInfrastructure_upgradeInfrastructure_Tile_constructionSite {
  readonly __typename: "ConstructionSite";
  readonly id: string;
  readonly infrastructure: Infrastructure;
  readonly workloadLeft: number;
  readonly finishedAt: any;
  readonly tile: UpgradeInfrastructure_upgradeInfrastructure_Tile_constructionSite_tile;
}

export interface UpgradeInfrastructure_upgradeInfrastructure_Tile_blueprints {
  readonly __typename: "Blueprint";
  readonly infrastructure: Infrastructure;
  readonly materialCost: number;
  readonly workload: number;
}

export interface UpgradeInfrastructure_upgradeInfrastructure_Tile_island_inventory {
  readonly __typename: "Inventory";
  readonly id: string;
  readonly material: number;
}

export interface UpgradeInfrastructure_upgradeInfrastructure_Tile_island {
  readonly __typename: "Island";
  readonly id: string;
  readonly inventory: UpgradeInfrastructure_upgradeInfrastructure_Tile_island_inventory;
}

export interface UpgradeInfrastructure_upgradeInfrastructure_Tile {
  readonly __typename: "Tile";
  readonly id: string;
  readonly infrastructure: Infrastructure;
  readonly level: number;
  readonly constructionSite: UpgradeInfrastructure_upgradeInfrastructure_Tile_constructionSite | null;
  readonly blueprints: ReadonlyArray<UpgradeInfrastructure_upgradeInfrastructure_Tile_blueprints>;
  readonly island: UpgradeInfrastructure_upgradeInfrastructure_Tile_island;
}

export type UpgradeInfrastructure_upgradeInfrastructure = UpgradeInfrastructure_upgradeInfrastructure_NotAuthorized | UpgradeInfrastructure_upgradeInfrastructure_Tile;

export interface UpgradeInfrastructure {
  readonly upgradeInfrastructure: UpgradeInfrastructure_upgradeInfrastructure | null;
}

export interface UpgradeInfrastructureVariables {
  readonly islandId: string;
  readonly position: number;
}
