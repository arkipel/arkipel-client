import React, { Fragment } from 'react';
import { Route, NavLink, Switch, useParams } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';
import { GetIsland, GetIslandVariables } from 'generated/GetIsland';

import Island from '../../models/Island';

import TileSummary from './Summary';
import TileManagement from './Management';
import TileActions from './Actions';

const TilePage = () => {
  const { islandID, tileID } = useParams();

  //   const { data, loading, error } = useQuery<GetIsland, GetIslandVariables>(
  //     gql`
  //       query GetIsland($islandID: String!) {
  //         island(islandID: $islandID) {
  //           ... on Island {
  //             id
  //             name
  //             dna
  //             active
  //           }
  //         }
  //       }
  //     `,
  //     { variables: { islandID } },
  //   );

  //   if (data?.island.__typename === 'NotFound') {
  //     return <p className="msg-error">Sorry, this island does not exist.</p>;
  //   }

  //   if (error || data?.island.__typename === 'NotAuthorized') {
  //     return <p className="msg-error">Sorry, an error occurred.</p>;
  //   }

  //   let island: Island;
  //   if (data?.island.__typename === 'Island') {
  //     island = new Island(data.island);
  //   } else if (loading) {
  //     island = new Island({ name: 'Loading...' });
  //   } else {
  //     island = new Island({});
  //   }

  return (
    <Fragment>
      <h2>Tile</h2>
      <nav>
        <ul>
          <li>
            <NavLink
              to={'/archipelago/islands/' + islandID + '/tiles/' + tileID}
              exact
            >
              Summary
            </NavLink>
          </li>
          <li>
            <NavLink
              to={
                '/archipelago/islands/' +
                islandID +
                '/tiles/' +
                tileID +
                '/management'
              }
            >
              Management
            </NavLink>
          </li>
          <li>
            <NavLink
              to={
                '/archipelago/islands/' +
                islandID +
                '/tiles/' +
                tileID +
                '/actions'
              }
            >
              Actions
            </NavLink>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/archipelago/islands/:islandID/tiles/:tileID" exact>
          <TileSummary />
        </Route>
        <Route
          path="/archipelago/islands/:islandID/tiles/:tileID/management"
          exact
        >
          <TileManagement />
        </Route>
        <Route
          path="/archipelago/islands/:islandID/tiles/:tileID/actions"
          exact
        >
          <TileActions />
        </Route>
      </Switch>
    </Fragment>
  );
};

export default TilePage;
