import React, { Fragment, useContext } from 'react';

import { SessionContext } from '../../libs/session/session';

import { useQuery, gql } from '@apollo/client';
import { GetIslandOverview } from 'generated/GetIslandOverview';

const IslandOverview = () => {
  const session = useContext(SessionContext);

  let { data, loading } = useQuery<GetIslandOverview>(
    gql`
      query GetIslandOverview($islandId: String!) {
        island(islandId: $islandId) {
          ... on Island {
            id
            name
            owner {
              id
              name
            }
          }
        }
      }
    `,
    { variables: { islandId: session.id } },
  );

  let ownerName = '';
  let islandName = '';
  if (data?.island?.__typename === 'Island') {
    ownerName = data.island.owner.name;
    islandName = data.island.name;
  } else if (loading) {
    ownerName = 'Loading...';
    islandName = 'Loading...';
  }

  return (
    <Fragment>
      <h2>Overview</h2>
      <p>
        <b>Owner name:</b> {ownerName}
        <br />
        <b>Island name:</b> {islandName}
      </p>
    </Fragment>
  );
};

export default IslandOverview;
