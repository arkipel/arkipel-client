import React, { Fragment, useContext, ReactElement } from 'react';

import { useQuery, gql } from '@apollo/client';
import {
  GetEvents,
  GetEventsVariables,
  GetEvents_events_EventList_events,
} from '../../generated/GetEvents';
import { CommodityType } from '../../generated/globalTypes';

import { DateTime } from 'luxon';

import { SessionContext } from '../../libs/session/session';

import { Error } from '../../ui/dialog/Msg';

const EventsPage = () => {
  const session = useContext(SessionContext);

  const { data, loading, error } = useQuery<GetEvents, GetEventsVariables>(
    gql`
      query GetEvents($input: EventsInput!) {
        events(input: $input) {
          ... on EventList {
            events {
              ... on AccountCreation {
                __typename
                id
                happenedAt
              }
              ... on SellOrderExecution {
                __typename
                id
                happenedAt
                currency {
                  code
                }
                commodity
                commodityCurrency {
                  code
                }
                quantity
                price
              }
              ... on BuyOrderExecution {
                __typename
                id
                happenedAt
                currency {
                  code
                }
                commodity
                commodityCurrency {
                  code
                }
                quantity
                price
              }
            }
          }
        }
      }
    `,
    { variables: { input: { userId: session.id, limit: 100 } } },
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || data?.events.__typename !== 'EventList') {
    return <Error>Sorry, an error occurred.</Error>;
  }

  return (
    <Fragment>
      <h1>Events</h1>
      {data.events.events.length === 0 && <p>There are no events.</p>}
      {data.events.events.length > 0 &&
        data.events.events.map((e) => {
          return eventToJSX(e);
        })}
    </Fragment>
  );
};

const eventToJSX = (ev: event): ReactElement => {
  let msg: ReactElement;

  switch (ev.__typename) {
    case 'AccountCreation':
      msg = <span>{'Account created.'}</span>;
      break;
    case 'SellOrderExecution':
      msg = (
        <span>
          {`${formatQtyAndCommodity(
            ev.quantity,
            ev.commodity,
            ev.commodityCurrency?.code,
          )} sold for ${ev.price} ${ev.currency.code.toUpperCase()}`}
          .
        </span>
      );
      break;
    case 'BuyOrderExecution':
      msg = (
        <span>
          {`${formatQtyAndCommodity(
            ev.quantity,
            ev.commodity,
            ev.commodityCurrency?.code,
          )} bought for ${ev.price} ${ev.currency.code.toUpperCase()}`}
          .
        </span>
      );
      break;
    default:
      msg = <span>Unknown event.</span>;
  }

  let timestamp = DateTime.fromISO(ev.happenedAt);

  return (
    <div key={ev.id}>
      <span style={{ color: '#bbb' }}>
        {timestamp.toFormat('yy/LL/dd H:mm')}
      </span>{' '}
      {msg}
    </div>
  );
};

type event = GetEvents_events_EventList_events;

const formatQtyAndCommodity = (
  qty: number,
  commodity: CommodityType,
  cur: String | undefined,
): string => {
  switch (commodity) {
    case CommodityType.MATERIAL_1M:
      return `${qty}M material`;

    case CommodityType.CURRENCY:
      return `${qty} ${cur?.toUpperCase()}`;

    default:
      return `Something unknown`;
  }
};

export default EventsPage;
