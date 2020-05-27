import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';

const IslandOverview = () => {
  const { islandID } = useParams();

  const { data, loading, error } = useQuery(
    gql`
      query getIsland3($islandID: String!) {
        island(islandID: $islandID) {
          ... on Island {
            name
          }
        }
      }
    `,
    { variables: { islandID } },
  );

  if (loading || error) {
    return <></>;
  }

  if (data.__typename === 'NotFound') {
    return <p>Island does not exist.</p>;
  }

  return (
    <Fragment>
      <h2>Overview</h2>
      <p>
        <b>Name:</b> {data.island.name}
        <br />
        <b>Population:</b> 0
      </p>
    </Fragment>
  );
};

export default IslandOverview;
