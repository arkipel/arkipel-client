import React, { Fragment, useContext, ReactElement } from 'react';

import { useQuery, gql } from '@apollo/client';
import {
  GetEventsQuery,
  GetEventsQueryVariables,
  CommodityType,
} from '../../generated/graphql';

import { DateTime } from 'luxon';
import { ShortenNumber } from '../../ui/text/format';

import { SessionContext } from '../../libs/session/session';

import { Error } from '../../ui/dialog/Msg';

const EventsPage = () => {
  const session = useContext(SessionContext);

  const { data, loading, error } = useQuery<
    GetEventsQuery,
    GetEventsQueryVariables
  >(
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

type extractElementType<A> = A extends readonly (infer T)[] ? T : never;
type event = extractElementType<
  Extract<GetEventsQuery['events'], { __typename?: 'EventList' }>['events']
>;

const formatQtyAndCommodity = (
  qty: number,
  commodity: CommodityType,
  cur: String | undefined,
): string => {
  switch (commodity) {
    case CommodityType.FrozenFood:
      return `${ShortenNumber(qty)} frozen food`;

    case CommodityType.Material:
      return `${ShortenNumber(qty)} material`;

    case CommodityType.Currency:
      return `${qty} ${cur?.toUpperCase()}`;

    default:
      return `Something unknown`;
  }
};

export default EventsPage;
