/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetInventory
// ====================================================

export interface GetInventory_inventory {
  readonly __typename: 'Inventory' | 'NotAuthorized' | 'NotFound';
}

export interface GetInventory {
  readonly inventory: GetInventory_inventory;
}

export interface GetInventoryVariables {
  readonly userId: string;
  readonly islandId: string;
}
