import React, { Fragment, FunctionComponent, useContext } from 'react';

import { useQuery, gql, useMutation } from '@apollo/client';
import { GetIsland, GetIslandVariables } from 'generated/GetIsland';
import {
  SetInfrastructureDesiredStatus,
  SetInfrastructureDesiredStatusVariables,
} from 'generated/SetInfrastructureDesiredStatus';
import {
  Infrastructure,
  InfrastructureStatus,
} from '../../generated/globalTypes';

import { SessionContext } from '../../libs/session/session';

import Tile from '../../models/Tile';
import Island from '../../models/Island';

import MapTile from '../../components/MapTile';

import { Info, Error } from '../../ui/dialog/Msg';
import Label from '../../ui/text/Label';

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
              desiredStatus
              currentStatus
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
  const session = useContext(SessionContext);

  const [setDesiredStatus] = useMutation<
    SetInfrastructureDesiredStatus,
    SetInfrastructureDesiredStatusVariables
  >(
    gql`
      mutation SetInfrastructureDesiredStatus(
        $islandId: String!
        $position: Int!
        $status: InfrastructureStatus!
      ) {
        setInfrastructureDesiredStatus(
          islandId: $islandId
          position: $position
          status: $status
        ) {
          ... on Tile {
            id
            desiredStatus
            currentStatus
            population
            material
            energy
            island {
              inventory {
                id
                populationUsed
                populationFree
                populationTotal
                energyUsed
                energyFree
                energyTotal
                materialProduction
                timestamp
              }
              tiles {
                id
                currentStatus
              }
            }
          }
        }
      }
    `,
    {
      variables: {
        islandId: session.id,
        position: tile.position,
        status: InfrastructureStatus.ON,
      },
    },
  );

  return (
    <tr>
      <td>
        <MapTile tile={tile} size={36} />
      </td>
      <td>{tile.position}</td>
      <td>
        {tile.infrastructureName()} ({tile.level}){' '}
        {tile.isStalled() && (
          <Label text="Stalled" textColor="#fff" backgroundColor="#b66" />
        )}
      </td>
      <td>{tile.population}</td>
      <td>{tile.energy}</td>
      <td>{tile.material}/s</td>
      <td>
        {tile.desiredStatus === InfrastructureStatus.ON && (
          <img
            className={styles.statusBtn}
            src="https://icons.arkipel.io/ui/pause.svg"
            onClick={() =>
              setDesiredStatus({
                variables: {
                  islandId: session.id,
                  position: tile.position,
                  status: InfrastructureStatus.OFF,
                },
              })
            }
          />
        )}
        {tile.desiredStatus === InfrastructureStatus.OFF && (
          <img
            className={styles.statusBtn}
            src="https://icons.arkipel.io/ui/play.svg"
            onClick={() =>
              setDesiredStatus({
                variables: {
                  islandId: session.id,
                  position: tile.position,
                  status: InfrastructureStatus.ON,
                },
              })
            }
          />
        )}
      </td>
    </tr>
  );
};

class props {
  tile: Tile = new Tile({});
}

export default InfrastructurePage;
