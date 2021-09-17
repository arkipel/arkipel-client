/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MarketPricesInput, CommodityType } from './globalTypes';

// ====================================================
// GraphQL query operation: GetMarketPrices
// ====================================================

export interface GetMarketPrices_marketPrices_NotAuthorized {
  readonly __typename: 'NotAuthorized';
}

export interface GetMarketPrices_marketPrices_MarketPrices_prices_currency {
  readonly __typename: 'Currency';
  readonly id: string;
  readonly code: string;
}

export interface GetMarketPrices_marketPrices_MarketPrices_prices {
  readonly __typename: 'MarketPrice';
  readonly timestamp: any;
  readonly currency: GetMarketPrices_marketPrices_MarketPrices_prices_currency;
  readonly commodity: CommodityType;
  readonly numTrades: number;
  readonly quantity: number;
  readonly price: number;
  readonly prevNumTrades: number;
  readonly prevQuantity: number;
  readonly prevPrice: number;
}

export interface GetMarketPrices_marketPrices_MarketPrices {
  readonly __typename: 'MarketPrices';
  readonly prices: ReadonlyArray<GetMarketPrices_marketPrices_MarketPrices_prices>;
}

export type GetMarketPrices_marketPrices =
  | GetMarketPrices_marketPrices_NotAuthorized
  | GetMarketPrices_marketPrices_MarketPrices;

export interface GetMarketPrices {
  readonly marketPrices: GetMarketPrices_marketPrices;
}

export interface GetMarketPricesVariables {
  readonly input: MarketPricesInput;
}
