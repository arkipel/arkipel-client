import React, { Fragment } from 'react';

import { useQuery, gql } from '@apollo/client';
import { GetNumberIslandsQuery } from 'generated/graphql';

const ArchipelagoOverview = () => {
  let { data, loading, error } = useQuery<GetNumberIslandsQuery>(gql`
    query GetNumberIslands {
      archipelago {
        id
        numberIslands
      }
    }
  `);

  let numberIslands = '';
  if (data?.archipelago?.__typename === 'Archipelago') {
    numberIslands = data.archipelago.numberIslands.toString();
  } else if (loading) {
    numberIslands = 'Loading...';
  } else if (error) {
    numberIslands = '0';
  }

  return (
    <Fragment>
      <h1>Overview</h1>
      <p>
        <b>Number of islands:</b> {numberIslands}
      </p>
    </Fragment>
  );
};

export default ArchipelagoOverview;
