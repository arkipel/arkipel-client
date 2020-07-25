import React, { Fragment } from 'react';

import { useQuery, gql } from '@apollo/client';
import { GetNumberIslands } from 'generated/GetNumberIslands';

const ArchipelagoOverview = () => {
  let { data, loading, error } = useQuery<GetNumberIslands>(gql`
    query GetNumberIslands {
      archipelago {
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
      <h2>Overview</h2>
      <p>
        <b>Number of islands:</b> {numberIslands}
      </p>
    </Fragment>
  );
};

export default ArchipelagoOverview;
