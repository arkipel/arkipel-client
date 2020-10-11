import React, {
  Fragment,
  FunctionComponent,
  useContext,
  useState,
} from 'react';

import { useQuery, gql, useMutation } from '@apollo/client';
import { GetIsland, GetIslandVariables } from 'generated/GetIsland';
import {
  ActivateInfrastructure,
  ActivateInfrastructureVariables,
} from 'generated/ActivateInfrastructure';
import {
  DeactivateInfrastructure,
  DeactivateInfrastructureVariables,
} from 'generated/DeactivateInfrastructure';
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
              population
              material
              energy
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
              <th></th>
              <th></th>
              <th></th>
              <th>
                <img src="https://icons.arkipel.io/res/population.svg" />
              </th>
              <th>
                <img src="https://icons.arkipel.io/res/energy.svg" />
              </th>
              <th>
                <img src="https://icons.arkipel.io/res/material.svg" />
              </th>
              <th></th>
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
  const [showManage, setShowManage] = useState(false);

  const session = useContext(SessionContext);

  const [activate, { loading: loadingActivate }] = useMutation<
    ActivateInfrastructure,
    ActivateInfrastructureVariables
  >(
    gql`
      mutation ActivateInfrastructure($islandId: String!, $position: Int!) {
        activateInfrastructure(islandId: $islandId, position: $position) {
          ... on Tile {
            id
            isActive
          }
        }
      }
    `,
    { variables: { islandId: session.id, position: tile.position } },
  );

  const [deactivate, { loading: loadingDeactivate }] = useMutation<
    DeactivateInfrastructure,
    DeactivateInfrastructureVariables
  >(
    gql`
      mutation DeactivateInfrastructure($islandId: String!, $position: Int!) {
        deactivateInfrastructure(islandId: $islandId, position: $position) {
          ... on Tile {
            id
            isActive
          }
        }
      }
    `,
    { variables: { islandId: session.id, position: tile.position } },
  );

  if (!showManage) {
    return (
      <tr>
        <td>
          <MapTile tile={tile} size={36} />
        </td>
        <td>{tile.position}</td>
        <td>
          {tile.infrastructureName()} ({tile.level})
        </td>
        <td>{tile.population}</td>
        <td>{tile.energy}</td>
        <td>{tile.material}/s</td>
        <td>
          <img
            className={styles.manageBtn}
            src="https://icons.arkipel.io/ui/manage.svg"
            onClick={() => setShowManage(!showManage)}
          />
        </td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td>
          <MapTile tile={tile} size={36} />
        </td>
        <td>{tile.position}</td>
        <td colSpan={4}>
          <div className={styles.management}>
            <div>
              {tile.isActive && (
                <button onClick={() => deactivate()}>
                  {!loadingDeactivate && 'Deactivate'}
                  {loadingDeactivate && 'Deactivating...'}
                </button>
              )}
              {!tile.isActive && (
                <button onClick={() => activate()}>
                  {!loadingActivate && 'Activate'}
                  {loadingActivate && 'Activating...'}
                </button>
              )}
            </div>
          </div>
        </td>
        <td>
          <img
            className={styles.manageBtn}
            src="https://icons.arkipel.io/ui/manage.svg"
            onClick={() => setShowManage(!showManage)}
          />
        </td>
      </tr>
    );
  }
};

class props {
  tile: Tile = new Tile({});
}

export default InfrastructurePage;
