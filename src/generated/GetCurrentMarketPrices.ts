/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CurrentMarketPricesInput, CommodityType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCurrentMarketPrices
// ====================================================

export interface GetCurrentMarketPrices_currentMarketPrices_NotFound {
  readonly __typename: "NotFound";
}

export interface GetCurrentMarketPrices_currentMarketPrices_CurrentMarketPrices_commodityPrices {
  readonly __typename: "CommodityPrice";
  readonly commodity: CommodityType;
  readonly price: number;
}

export interface GetCurrentMarketPrices_currentMarketPrices_CurrentMarketPrices_currencyPrices_currency {
  readonly __typename: "Currency";
  readonly id: string;
  readonly code: string;
  readonly name: string;
}

export interface GetCurrentMarketPrices_currentMarketPrices_CurrentMarketPrices_currencyPrices {
  readonly __typename: "CurrencyPrice";
  readonly currency: GetCurrentMarketPrices_currentMarketPrices_CurrentMarketPrices_currencyPrices_currency;
  readonly price: number;
}

export interface GetCurrentMarketPrices_currentMarketPrices_CurrentMarketPrices {
  readonly __typename: "CurrentMarketPrices";
  readonly commodityPrices: ReadonlyArray<GetCurrentMarketPrices_currentMarketPrices_CurrentMarketPrices_commodityPrices>;
  readonly currencyPrices: ReadonlyArray<GetCurrentMarketPrices_currentMarketPrices_CurrentMarketPrices_currencyPrices>;
}

export type GetCurrentMarketPrices_currentMarketPrices = GetCurrentMarketPrices_currentMarketPrices_NotFound | GetCurrentMarketPrices_currentMarketPrices_CurrentMarketPrices;

export interface GetCurrentMarketPrices {
  readonly currentMarketPrices: GetCurrentMarketPrices_currentMarketPrices;
}

export interface GetCurrentMarketPricesVariables {
  readonly input: CurrentMarketPricesInput;
}
