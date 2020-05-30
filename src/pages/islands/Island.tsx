import React, { Fragment } from 'react';
import { Route, NavLink, Switch, useParams } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';
import { GetIsland, GetIslandVariables } from 'generated/GetIsland';

import Island from '../../models/Island';

import IslandMap from './Map';
import IslandOverview from './Overview';
import TilePage from '../tile/Tile';

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

  if (data?.island.__typename === 'NotFound') {
    return <p className="msg-error">Sorry, this island does not exist.</p>;
  }

  if (error || data?.island.__typename === 'NotAuthorized') {
    return <p className="msg-error">Sorry, an error occurred.</p>;
  }

  let island: Island;
  if (data?.island.__typename === 'Island') {
    island = new Island(data.island);
  } else if (loading) {
    island = new Island({ name: 'Loading...' });
  } else {
    island = new Island({});
  }

  return (
    <Fragment>
      <h1>{island.name}</h1>
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
        <Route path="/archipelago/islands/:islandID" exact>
          <IslandMap island={island} />
        </Route>
        <Route path="/archipelago/islands/:islandID/info" exact>
          <IslandOverview island={island} />
        </Route>
        <Route path="/archipelago/islands/:islandID/tiles/:position">
          <TilePage />
        </Route>
      </Switch>
    </Fragment>
  );
};

export default IslandPage;
