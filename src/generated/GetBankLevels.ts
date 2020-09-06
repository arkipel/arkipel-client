/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBankLevels
// ====================================================

export interface GetBankLevels_inventory_NotAuthorized {
  readonly __typename: 'NotAuthorized' | 'NotFound';
}

export interface GetBankLevels_inventory_Inventory {
  readonly __typename: 'Inventory';
  readonly bankLevels: number;
}

export type GetBankLevels_inventory =
  | GetBankLevels_inventory_NotAuthorized
  | GetBankLevels_inventory_Inventory;

export interface GetBankLevels {
  readonly inventory: GetBankLevels_inventory;
}

export interface GetBankLevelsVariables {
  readonly userId: string;
  readonly islandId: string;
}
