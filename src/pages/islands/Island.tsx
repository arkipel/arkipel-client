import React, { Fragment } from 'react';
import { Route, NavLink, Switch, useParams } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';

import IslandMap from './Map';
import IslandOverview from './Overview';

const IslandPage = () => {
  const { islandID } = useParams();

  const { data, loading, error } = useQuery(
    gql`
      query getIsland($islandID: String!) {
        island(islandID: $islandID) {
          ... on Island {
            id
            name
            active
          }
        }
      }
    `,
    { variables: { islandID } },
  );

  if (loading || error) {
    return <></>;
  }

  if (data.island.__typename === 'NotFound') {
    return <p>Island does not exist.</p>;
  }

  return (
    <Fragment>
      <h1>{data.island.name}</h1>
      <nav>
        <ul>
          <li>
            <NavLink to={'/archipelago/islands/' + islandID} exact>
              Map
            </NavLink>
          </li>
          <li>
            <NavLink to={'/archipelago/islands/' + islandID + '/info'}>
              Overview
            </NavLink>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route
          path="/archipelago/islands/:islandID"
          exact
          component={IslandMap}
        />
        <Route
          path="/archipelago/islands/:islandID/info"
          exact
          component={IslandOverview}
        />
      </Switch>
    </Fragment>
  );
};

export default IslandPage;
