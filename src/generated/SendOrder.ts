/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SendOrderInput, OrderSide, CommodityType } from './globalTypes';

// ====================================================
// GraphQL mutation operation: SendOrder
// ====================================================

export interface SendOrder_sendOrder_NotAuthorized {
  readonly __typename: 'NotAuthorized' | 'NotEnoughCommodity';
}

export interface SendOrder_sendOrder_Order_currency {
  readonly __typename: 'Currency';
  readonly id: string;
  readonly code: string;
  readonly name: string;
}

export interface SendOrder_sendOrder_Order_commodityCurrency {
  readonly __typename: 'Currency';
  readonly id: string;
  readonly code: string;
  readonly name: string;
}

export interface SendOrder_sendOrder_Order {
  readonly __typename: 'Order';
  readonly id: string;
  readonly createdAt: any;
  readonly expiresAt: any;
  readonly side: OrderSide;
  readonly currency: SendOrder_sendOrder_Order_currency;
  readonly commodity: CommodityType;
  readonly commodityCurrency: SendOrder_sendOrder_Order_commodityCurrency | null;
  readonly quantity: number;
  readonly price: any;
}

export type SendOrder_sendOrder =
  | SendOrder_sendOrder_NotAuthorized
  | SendOrder_sendOrder_Order;

export interface SendOrder {
  readonly sendOrder: SendOrder_sendOrder | null;
}

export interface SendOrderVariables {
  readonly input: SendOrderInput;
}
