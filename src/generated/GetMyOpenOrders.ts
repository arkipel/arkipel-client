/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderSide, CommodityType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetMyOpenOrders
// ====================================================

export interface GetMyOpenOrders_myOpenOrders_NotAuthorized {
  readonly __typename: "NotAuthorized";
}

export interface GetMyOpenOrders_myOpenOrders_OrderList_orders_currency {
  readonly __typename: "Currency";
  readonly id: string;
  readonly code: string;
}

export interface GetMyOpenOrders_myOpenOrders_OrderList_orders {
  readonly __typename: "Order";
  readonly id: string;
  readonly side: OrderSide;
  readonly expiresAt: any;
  readonly currency: GetMyOpenOrders_myOpenOrders_OrderList_orders_currency;
  readonly commodity: CommodityType;
  readonly quantity: number;
  readonly price: number;
}

export interface GetMyOpenOrders_myOpenOrders_OrderList {
  readonly __typename: "OrderList";
  readonly orders: ReadonlyArray<GetMyOpenOrders_myOpenOrders_OrderList_orders>;
}

export type GetMyOpenOrders_myOpenOrders = GetMyOpenOrders_myOpenOrders_NotAuthorized | GetMyOpenOrders_myOpenOrders_OrderList;

export interface GetMyOpenOrders {
  readonly myOpenOrders: GetMyOpenOrders_myOpenOrders;
}

export interface GetMyOpenOrdersVariables {
  readonly userId: string;
}
