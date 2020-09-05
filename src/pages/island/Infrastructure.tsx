import React, { Fragment, FunctionComponent, useContext } from 'react';

import { useQuery, gql } from '@apollo/client';
import { GetIsland, GetIslandVariables } from 'generated/GetIsland';

import { SessionContext } from '../../libs/session/session';

import Tile from '../../models/Tile';
import Island from '../../models/Island';

import MapTile from '../../components/MapTile';

import { Error } from '../../ui/dialog/Msg';

import styles from './Infrastructure.scss';

const InfrastructurePage = () => {
  const session = useContext(SessionContext);

  let islandId = session.id;

  const { data, loading, error } = useQuery<GetIsland, GetIslandVariables>(
    gql`
      query GetTiles($islandId: String!) {
        island(islandId: $islandId) {
          ... on Island {
            id
            tiles {
              id
              position
              kind
              infrastructure
              level
              housingCapacity
              materialProduction
              energyProduction
              requiredWorkforce
              energyConsumption
            }
          }
        }
      }
    `,
    { variables: { islandId } },
  );

  if (
    error ||
    data?.island.__typename === 'NotFound' ||
    data?.island.__typename === 'NotAuthorized'
  ) {
    return <Error>Sorry, an error occured</Error>;
  }

  let island = new Island({});
  if (data?.island.__typename === 'Island') {
    island = new Island(data.island);
  }

  // console.log('about to return');

  return (
    <Fragment>
      <h1>Infrastructure</h1>
      {loading && <p>Loading...</p>}
      <div className={styles.listTiles}>
        {island.tiles.map((t) => {
          return <InfrastructureItem key={t.position} tile={t} />;
        })}
      </div>
    </Fragment>
  );
};

const InfrastructureItem: FunctionComponent<props> = ({ tile }) => {
  return (
    <div className={styles.tile}>
      <div className={styles.logo}>
        <MapTile tile={tile} />
      </div>
      <span className={styles.title}>
        {tile.infrastructureName()} on {tile.kindName()}
      </span>
      <div className={styles.level}>
        <span>Level {tile.level}</span>
      </div>
      <div className={styles.population}>
        <img src="https://icons.arkipel.io/res/population.svg" />
        <span>4</span>
      </div>
      <div className={styles.material}>
        <img src="https://icons.arkipel.io/res/energy.svg" />
        <span>5</span>
      </div>
      <div className={styles.energy}>
        <img src="https://icons.arkipel.io/res/material.svg" />
        <span>20/s</span>
      </div>
      <button className={styles.more} disabled={true}>
        More
      </button>
    </div>
  );
};

class props {
  tile: Tile = new Tile({});
}

export default InfrastructurePage;
