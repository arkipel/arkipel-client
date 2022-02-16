/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCurrentInventory
// ====================================================

export interface GetCurrentInventory_inventory_NotAuthorized {
  readonly __typename: 'NotAuthorized' | 'NotFound';
}

export interface GetCurrentInventory_inventory_Inventory_island {
  readonly __typename: 'Island';
  readonly lastUpdateAt: any;
}

export interface GetCurrentInventory_inventory_Inventory {
  readonly __typename: 'Inventory';
  readonly id: string;
  readonly populationUsed: number;
  readonly populationFree: number;
  readonly populationTotal: number;
  readonly energyUsed: number;
  readonly energyFree: number;
  readonly energyTotal: number;
  readonly materialProduction: number;
  readonly material: number;
  readonly foodProduction: number;
  readonly food: number;
  readonly frozenFoodProduction: number;
  readonly frozenFood: number;
  readonly frozenFoodStorage: number;
  readonly bankLevels: number;
  readonly timestamp: any;
  readonly island: GetCurrentInventory_inventory_Inventory_island;
}

export type GetCurrentInventory_inventory =
  | GetCurrentInventory_inventory_NotAuthorized
  | GetCurrentInventory_inventory_Inventory;

export interface GetCurrentInventory {
  readonly inventory: GetCurrentInventory_inventory;
}

export interface GetCurrentInventoryVariables {
  readonly islandId: string;
  readonly userId: string;
}
