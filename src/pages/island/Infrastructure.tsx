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
      query GetTiles($islandId: String!) {
        island(islandId: $islandId) {
          ... on Island {
            id
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

  if (
    error ||
    data?.island.__typename === 'NotFound' ||
    data?.island.__typename === 'NotAuthorized'
  ) {
    return <Error>Sorry, an error occured</Error>;
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
      <h2>Infrastructure</h2>
      <div>
        {island.tiles.forEach((i) => {
          <p>{i}</p>;
        })}
      </div>
    </Fragment>
  );
};

export default MapPage;
