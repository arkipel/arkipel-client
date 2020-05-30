import React, { Fragment } from 'react';
import { Route, NavLink, Switch, useParams } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';
import { GetTile, GetTileVariables } from '../../generated/GetTile';

import TileSummary from './Summary';
import TileManagement from './Management';
import TileActions from './Actions';

import Tile from '../../models/Tile';

const TilePage = () => {
  const { islandID, position } = useParams();

  const { data, loading, error } = useQuery<GetTile, GetTileVariables>(
    gql`
      query GetTile($islandID: String!, $position: Int!) {
        tile(islandID: $islandID, position: $position) {
          ... on Tile {
            id
            position
            kind
            infrastructure
            level
          }
        }
      }
    `,
    { variables: { islandID, position } },
  );

  if (data?.tile.__typename === 'NotFound') {
    return <p className="msg-error">Sorry, this tile does not exist.</p>;
  }

  if (error) {
    return <p className="msg-error">Sorry, an error occurred.</p>;
  }

  let tile: Tile;
  if (data?.tile.__typename === 'Tile') {
    tile = new Tile(data.tile);
  } else if (loading) {
    tile = new Tile({ name: 'Loading...' });
  } else {
    tile = new Tile({});
  }

  return (
    <Fragment>
      <h2>Tile</h2>
      <nav>
        <ul>
          <li>
            <NavLink
              to={'/archipelago/islands/' + islandID + '/tiles/' + position}
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
                position +
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
                position +
                '/actions'
              }
            >
              Actions
            </NavLink>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/archipelago/islands/:islandID/tiles/:position" exact>
          <TileSummary tile={tile} />
        </Route>
        <Route
          path="/archipelago/islands/:islandID/tiles/:position/management"
          exact
        >
          <TileManagement />
        </Route>
        <Route
          path="/archipelago/islands/:islandID/tiles/:position/actions"
          exact
        >
          <TileActions />
        </Route>
      </Switch>
    </Fragment>
  );
};

export default TilePage;
