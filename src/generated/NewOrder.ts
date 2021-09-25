/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderSide, CommodityType } from "./globalTypes";

// ====================================================
// GraphQL fragment: NewOrder
// ====================================================

export interface NewOrder_currency {
  readonly __typename: "Currency";
  readonly id: string;
  readonly code: string;
  readonly name: string;
}

export interface NewOrder_commodityCurrency {
  readonly __typename: "Currency";
  readonly id: string;
  readonly code: string;
  readonly name: string;
}

export interface NewOrder {
  readonly __typename: "Order";
  readonly id: string;
  readonly createdAt: any;
  readonly expiresAt: any;
  readonly side: OrderSide;
  readonly currency: NewOrder_currency;
  readonly commodity: CommodityType;
  readonly commodityCurrency: NewOrder_commodityCurrency | null;
  readonly quantity: number;
  readonly price: number;
}
