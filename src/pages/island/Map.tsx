import React, { Fragment, useContext } from 'react';

import { useQuery, gql } from '@apollo/client';
import { GetIsland, GetIslandVariables } from 'generated/GetIsland';

import { SessionContext } from '../../libs/session/session';

import Island from '../../models/Island';

import IslandMap from '../../components/IslandMap';

import { Error } from '../../ui/dialog/Msg';

const MapPage = () => {
  const session = useContext(SessionContext);

  let islandId = session.id;

  const { data, loading, error } = useQuery<GetIsland, GetIslandVariables>(
    gql`
      query GetIsland($islandId: String!) {
        island(islandId: $islandId) {
          ... on Island {
            id
            owner {
              username
            }
            tiles {
              id
              position
              infrastructure
              level
            }
          }
        }
      }
    `,
    { variables: { islandId } },
  );

  if (data?.island.__typename === 'NotFound') {
    return <Error>Sorry, this island does not exist.</Error>;
  }

  if (error || data?.island.__typename === 'NotAuthorized') {
    return <Error>Sorry, an error occurred.</Error>;
  }

  let island: Island;
  if (data?.island.__typename === 'Island') {
    island = new Island(data.island);
  } else if (loading) {
    island = new Island({ owner: { username: 'Loading...' } });
  } else {
    island = new Island({});
  }

  return (
    <Fragment>
      <h1>Map</h1>
      <IslandMap island={island} />
    </Fragment>
  );
};

export default MapPage;
