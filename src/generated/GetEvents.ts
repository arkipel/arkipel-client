/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EventsInput } from './globalTypes';

// ====================================================
// GraphQL query operation: GetEvents
// ====================================================

export interface GetEvents_events_NotAuthorized {
  readonly __typename: 'NotAuthorized';
}

export interface GetEvents_events_EventList_events {
  readonly __typename: 'AccountCreation';
  readonly id: number;
  readonly happenedAt: any;
}

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
