import React, { Fragment, FunctionComponent, useContext } from 'react';

import { useQuery, gql } from '@apollo/client';
import { GetIsland, GetIslandVariables } from 'generated/GetIsland';
import { Infrastructure } from '../../generated/globalTypes';

import { SessionContext } from '../../libs/session/session';

import Tile from '../../models/Tile';
import Island from '../../models/Island';

import MapTile from '../../components/MapTile';

import { Info, Error } from '../../ui/dialog/Msg';

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

  // Filter out the tiles that should not be shown.
  let filteredTiles = new Array<Tile>();
  island.tiles.forEach((t) => {
    if (t.level > 0 && t.infrastructure != Infrastructure.EMPTY) {
      filteredTiles.push(t);
    }
  });
  island.tiles = filteredTiles;

  if (!loading && island.tiles.length === 0) {
    return (
      <Fragment>
        <h2>Infrastructure</h2>
        <Info>You have no infrastructure.</Info>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <h1>Infrastructure</h1>
      {loading && <p>Loading...</p>}
      {!loading && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th colSpan={3}>Tile</th>
              <th>
                <img src="https://icons.arkipel.io/res/population.svg" />
              </th>
              <th>
                <img src="https://icons.arkipel.io/res/energy.svg" />
              </th>
              <th>
                <img src="https://icons.arkipel.io/res/material.svg" />
              </th>
            </tr>
          </thead>
          <tbody>
            {island.tiles.map((t) => {
              return <InfrastructureItem key={t.position} tile={t} />;
            })}
          </tbody>
        </table>
      )}
    </Fragment>
  );
};

const InfrastructureItem: FunctionComponent<props> = ({ tile }) => {
  return (
    <tr>
      <td>
        <MapTile tile={tile} />
      </td>
      <td>{tile.position}</td>
      <td>
        {tile.infrastructureName()} ({tile.level})
      </td>
      <td>{tile.housingCapacity - tile.requiredWorkforce}</td>
      <td>{tile.energyProduction - tile.energyConsumption}</td>
      <td>{tile.materialProduction}/s</td>
      {/* <td>
        <button disabled={true}>
          Manage
        </button>
      </td> */}
    </tr>
  );
};

class props {
  tile: Tile = new Tile({});
}

export default InfrastructurePage;
