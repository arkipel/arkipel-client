import React, { Fragment, FunctionComponent, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';
import { GetTile, GetTileVariables } from '../../generated/GetTile';
import { TileKind } from '../../generated/globalTypes';

import { SessionContext } from '../../libs/session/session';

import Tile from '../../models/Tile';

import { Error } from '../../ui/dialog/Msg';

const TilePage: FunctionComponent = () => {
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
            <b>Kind:</b> {positionToKind(position).toLowerCase()}
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

const positionToKind = (pos: number): TileKind => {
  let k = dna[pos];

  switch (k) {
    case '1':
      return TileKind.WATER;
    case '2':
      return TileKind.SAND;
    case '3':
      return TileKind.LAND;
    default:
      return TileKind.DEEP_WATER;
  }
};

const dna =
  '0000000000000000' +
  '0000011111100000' +
  '0001112222111000' +
  '0011222332221100' +
  '0012233333322100' +
  '0112333333332110' +
  '0122333333332210' +
  '0123333333333210' +
  '0123333333333210' +
  '0122333333332210' +
  '0112333333332110' +
  '0012233333322100' +
  '0011222332221100' +
  '0001112222111000' +
  '0000011111100000' +
  '0000000000000000';
