import React, { Fragment } from 'react';
import { Route, NavLink, Switch, useParams } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';
import { GetIsland, GetIslandVariables } from 'generated/GetIsland';

import Island from '../../models/Island';

import IslandMap from './Map';
import IslandOverview from './Overview';

const IslandPage = () => {
  const { islandID } = useParams();

  const { data, loading, error } = useQuery<GetIsland, GetIslandVariables>(
    gql`
      query GetIsland($islandID: String!) {
        island(islandID: $islandID) {
          ... on Island {
            id
            name
            dna
            active
          }
        }
      }
    `,
    { variables: { islandID } },
  );

  if (loading || !data || error) {
    return <></>;
  }

  if (data.island.__typename === 'NotFound') {
    return <p>Island does not exist.</p>;
  }

  let island = new Island(data.island);

  return (
    <Fragment>
      <h1>{island.name}</h1>
      <nav>
        <ul>
          <li>
            <NavLink to={'/archipelago/islands/' + island.id} exact>
              Map
            </NavLink>
          </li>
          <li>
            <NavLink to={'/archipelago/islands/' + island.id + '/info'}>
              Overview
            </NavLink>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/archipelago/islands/:islandID" exact>
          <IslandMap island={island} />
        </Route>
        <Route path="/archipelago/islands/:islandID/info" exact>
          <IslandOverview island={island} />
        </Route>
      </Switch>
    </Fragment>
  );
};

export default IslandPage;
