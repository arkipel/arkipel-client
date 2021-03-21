/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrdersInput, OrderSide, CommodityType } from './globalTypes';

// ====================================================
// GraphQL query operation: GetBestOffers
// ====================================================

export interface GetBestOffers_orders_orders_currency {
  readonly __typename: 'Currency';
  readonly id: string;
  readonly code: string;
}

export interface GetBestOffers_orders_orders {
  readonly __typename: 'Order';
  readonly id: string;
  readonly side: OrderSide;
  readonly expiresAt: any;
  readonly currency: GetBestOffers_orders_orders_currency;
  readonly commodity: CommodityType;
  readonly quantity: number;
  readonly price: number;
}

export interface GetBestOffers_orders {
  readonly __typename: 'OrderList';
  readonly orders: ReadonlyArray<GetBestOffers_orders_orders>;
}

export interface GetBestOffers {
  readonly orders: GetBestOffers_orders;
}

export interface GetBestOffersVariables {
  readonly input: OrdersInput;
}
