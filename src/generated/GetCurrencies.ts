/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCurrencies
// ====================================================

export interface GetCurrencies_currencies_currencies {
  readonly __typename: "Currency";
  readonly id: string;
  readonly code: string;
  readonly name: string;
}

export interface GetCurrencies_currencies {
  readonly __typename: "CurrencyList";
  readonly currencies: ReadonlyArray<GetCurrencies_currencies_currencies>;
}

export interface GetCurrencies {
  readonly currencies: GetCurrencies_currencies;
}
