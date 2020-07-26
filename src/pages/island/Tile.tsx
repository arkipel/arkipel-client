import React, { Fragment, FunctionComponent, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';
import { GetTile, GetTileVariables } from 'generated/GetTile';

import { SessionContext } from '../../libs/session/session';

import Tile from '../../models/Tile';

import { Error } from '../../ui/dialog/Msg';

const TilePage: FunctionComponent<props> = () => {
  const session = useContext(SessionContext);
  const { position } = useParams();

  let islandId = session.id;

  const { data, loading, error } = useQuery<GetTile, GetTileVariables>(
    gql`
      query GetTile($islandId: String!, $position: Int!) {
        tile(islandId: $islandId, position: $position) {
          ... on Tile {
            id
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
    return <Error>Sorry, this island does not exist.</Error>;
  }

  let tile: Tile;
  if (data?.tile.__typename === 'Tile') {
    tile = new Tile(data.tile);
  } else if (error) {
    return <Error>Sorry, an error occured.</Error>;
  } else {
    tile = new Tile({});
  }

  return (
    <Fragment>
      <h1>Tile {position}</h1>
      {loading && <p>Loading...</p>}
      {!loading && (
        <Fragment>
          <h2>Description</h2>
          <p>
            <b>Kind:</b> {tile.kind.toLowerCase()}
            <br />
            <b>Infrastructure:</b> {tile.infrastructure.toLowerCase()}
            <br />
            <b>Level:</b> {tile.level}
          </p>
        </Fragment>
      )}
    </Fragment>
  );
};

export default TilePage;
