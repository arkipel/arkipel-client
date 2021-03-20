/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBankAccounts
// ====================================================

export interface GetBankAccounts_bankAccounts_NotAuthorized {
  readonly __typename: 'NotAuthorized';
}

export interface GetBankAccounts_bankAccounts_BankAccountList_bankAccounts_currency {
  readonly __typename: 'Currency';
  readonly id: string;
  readonly code: string;
  readonly name: string;
}

export interface GetBankAccounts_bankAccounts_BankAccountList_bankAccounts {
  readonly __typename: 'BankAccount';
  readonly id: string;
  readonly amount: number;
  readonly currency: GetBankAccounts_bankAccounts_BankAccountList_bankAccounts_currency;
}

export interface GetBankAccounts_bankAccounts_BankAccountList {
  readonly __typename: 'BankAccountList';
  readonly bankAccounts: ReadonlyArray<GetBankAccounts_bankAccounts_BankAccountList_bankAccounts>;
}

export type GetBankAccounts_bankAccounts =
  | GetBankAccounts_bankAccounts_NotAuthorized
  | GetBankAccounts_bankAccounts_BankAccountList;

export interface GetBankAccounts {
  readonly bankAccounts: GetBankAccounts_bankAccounts;
}

export interface GetBankAccountsVariables {
  readonly userId: string;
}
