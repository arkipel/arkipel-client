import React, { Fragment, useContext } from 'react';

import { useQuery, gql } from '@apollo/client';
import { GetIsland, GetIslandVariables } from 'generated/GetIsland';

import { SessionContext } from '../../libs/session/session';

import Island from '../../models/Island';

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

  let island = new Island({});
  if (data?.island.__typename === 'Island') {
    island = new Island(data.island);
  }

  console.log('island:', island);

  return (
    <Fragment>
      <h1>Infrastructure</h1>
      {loading && <p>Loading...</p>}
      <div>
        {island.tiles.map((t, i) => {
          return (
            <div>
              <div>
                <span>{i}</span>
                <span>{t.infrastructure} on land</span>
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default MapPage;
