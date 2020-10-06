/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetInventory
// ====================================================

export interface GetInventory_inventory_NotAuthorized {
  readonly __typename: 'NotAuthorized' | 'NotFound';
}

export interface GetInventory_inventory_Inventory {
  readonly __typename: 'Inventory';
  readonly id: string;
  readonly population: number;
  readonly workforce: number;
  readonly assignedWorkers: number;
  readonly material: number;
  readonly materialProduction: number;
  readonly energyUsed: number;
  readonly energy: number;
  readonly assignedEnergy: number;
}

export type GetInventory_inventory =
  | GetInventory_inventory_NotAuthorized
  | GetInventory_inventory_Inventory;

export interface GetInventory {
  readonly inventory: GetInventory_inventory;
}

export interface GetInventoryVariables {
  readonly userId: string;
  readonly islandId: string;
}
