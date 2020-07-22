import React, { Fragment } from 'react';
import { Route, NavLink, Switch, useParams } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';
import { GetTile, GetTileVariables } from '../../generated/GetTile';

import TileSummary from './Summary';
import TileManagement from './Management';
import TileActions from './Actions';

import Tile from '../../models/Tile';

import { Error } from '../../ui/dialog/Msg';

const TilePage = () => {
  const { islandId, position } = useParams();

  const { data, loading, error } = useQuery<GetTile, GetTileVariables>(
    gql`
      query GetTile($islandId: String!, $position: Int!) {
        tile(islandId: $islandId, position: $position) {
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
    { variables: { islandId, position } },
  );

  if (data?.tile.__typename === 'NotFound') {
    return <Error>Sorry, this tile does not exist.</Error>;
  }

  if (error) {
    return <Error>Sorry, an error occurred.</Error>;
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
              to={'/archipelago/islands/' + islandId + '/tiles/' + position}
              exact
            >
              Summary
            </NavLink>
          </li>
          <li>
            <NavLink
              to={
                '/archipelago/islands/' +
                islandId +
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
                islandId +
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
        <Route path="/archipelago/islands/:islandId/tiles/:position" exact>
          <TileSummary tile={tile} />
        </Route>
        <Route
          path="/archipelago/islands/:islandId/tiles/:position/management"
          exact
        >
          <TileManagement />
        </Route>
        <Route
          path="/archipelago/islands/:islandId/tiles/:position/actions"
          exact
        >
          <TileActions islandId={islandId} position={position} />
        </Route>
      </Switch>
    </Fragment>
  );
};

export default TilePage;
