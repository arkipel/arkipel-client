import React, { Fragment, FunctionComponent, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { useQuery, gql, useMutation } from '@apollo/client';
import { GetTile, GetTileVariables } from '../../generated/GetTile';
import { TileKind } from '../../generated/globalTypes';

import { SessionContext } from '../../libs/session/session';

import Tile from '../../models/Tile';
import ConstructionSite from '../../models/ConstructionSite';
import Blueprint from '../../models/Blueprint';

import { Error } from '../../ui/dialog/Msg';

import styles from './Tile.scss';

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
            constructionSite {
              infrastructure
              finishedAt
            }
            blueprints {
              infrastructure
              materialCost
              duration
            }
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
  let blueprints = new Array<Blueprint>();
  let constructionSite = new ConstructionSite(null);
  if (data?.tile.__typename === 'Tile') {
    tile = new Tile(data.tile);

    console.log('constructionSite', constructionSite);
    constructionSite = new ConstructionSite(data.tile.constructionSite);

    data.tile.blueprints.forEach((bp) => {
      blueprints.push(new Blueprint(bp));
    });
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
            {constructionSite.exists && (
              <Fragment>
                <br />
                <b>Construction in progress:</b>{' '}
                {constructionSite.infrastructure.toLowerCase()} (level{' '}
                {tile.level + 1}), done{' '}
                {constructionSite.finishedAt.toRelative()}
              </Fragment>
            )}
          </p>
          {tile.level === 0 && !constructionSite.exists && (
            <Fragment>
              <h2>Build</h2>
              <div className={styles.infraCatalog}>
                {blueprints.map((bp) => {
                  return (
                    <InfrastructureOption
                      key={Math.random()}
                      islandId={islandId}
                      position={position}
                      bp={bp}
                    />
                  );
                })}
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

const InfrastructureOption: FunctionComponent<{
  islandId: string;
  position: number;
  bp: Blueprint;
}> = ({ islandId, position, bp }) => {
  console.log('build option:', bp);
  let infra = bp.infrastructure;
  console.log('build option infra:', infra);

  const [build, { loading, error }] = useMutation(
    gql`
      mutation BuildInfrastructure(
        $islandId: String!
        $position: Int!
        $infrastructure: Infrastructure!
      ) {
        buildInfrastructure(
          islandId: $islandId
          position: $position
          infrastructure: $infrastructure
        ) {
          ... on Tile {
            id
            infrastructure
            level
            constructionSite {
              infrastructure
              finishedAt
            }
          }
        }
      }
    `,
    { variables: { islandId, position, infrastructure: infra } },
  );

  return (
    <div onClick={() => build()}>
      <img src={bp.iconUrl()} alt={bp.name()} />
      <div>
        {loading && <b>loading!</b>}
        {error && <b>error!</b>}
        <b>{bp.name()}</b>
      </div>
      <div className={styles.cost}>
        <img
          className={styles.materialIcon}
          src="https://icons.arkipel.io/res/material.svg"
        />
        <span>{bp.materialCost}</span>
      </div>
      <div className={styles.duration}>{bp.durationStr()}</div>
    </div>
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
