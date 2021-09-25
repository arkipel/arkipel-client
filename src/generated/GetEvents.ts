/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EventsInput, CommodityType } from './globalTypes';

// ====================================================
// GraphQL query operation: GetEvents
// ====================================================

export interface GetEvents_events_NotAuthorized {
  readonly __typename: 'NotAuthorized';
}

export interface GetEvents_events_EventList_events_AccountCreation {
  readonly __typename: 'AccountCreation';
  readonly id: number;
  readonly happenedAt: any;
}

export interface GetEvents_events_EventList_events_SellOrderExecution_currency {
  readonly __typename: 'Currency';
  readonly code: string;
}

export interface GetEvents_events_EventList_events_SellOrderExecution {
  readonly __typename: 'SellOrderExecution';
  readonly id: number;
  readonly happenedAt: any;
  readonly currency: GetEvents_events_EventList_events_SellOrderExecution_currency;
  readonly commodity: CommodityType;
  readonly quantity: number;
  readonly price: number;
}

export interface GetEvents_events_EventList_events_BuyOrderExecution_currency {
  readonly __typename: 'Currency';
  readonly code: string;
}

export interface GetEvents_events_EventList_events_BuyOrderExecution {
  readonly __typename: 'BuyOrderExecution';
  readonly id: number;
  readonly happenedAt: any;
  readonly currency: GetEvents_events_EventList_events_BuyOrderExecution_currency;
  readonly commodity: CommodityType;
  readonly quantity: number;
  readonly price: number;
}

export type GetEvents_events_EventList_events =
  | GetEvents_events_EventList_events_AccountCreation
  | GetEvents_events_EventList_events_SellOrderExecution
  | GetEvents_events_EventList_events_BuyOrderExecution;

export interface GetEvents_events_EventList {
  readonly __typename: 'EventList';
  readonly events: ReadonlyArray<GetEvents_events_EventList_events>;
}

export type GetEvents_events =
  | GetEvents_events_NotAuthorized
  | GetEvents_events_EventList;

export interface GetEvents {
  readonly events: GetEvents_events;
}

export interface GetEventsVariables {
  readonly input: EventsInput;
}
