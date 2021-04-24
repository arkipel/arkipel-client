import React, { Fragment, useContext, ReactElement } from 'react';

import { useQuery, gql } from '@apollo/client';
import { GetEvents, GetEventsVariables } from 'generated/GetEvents';

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
              __typename
              id
              happenedAt
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
    default:
      msg = <span>Unknown event.</span>;
  }

  let timestamp = DateTime.fromISO(ev.happenedAt);

  return (
    <div key={ev.id}>
      <span style={{ color: '#bbb' }}>{timestamp.toFormat('y-m-d')}</span> {msg}
    </div>
  );
};

interface event {
  __typename: string;
  id: number;
  happenedAt: any;
}

export default EventsPage;
