import React, { Fragment, FunctionComponent, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { useQuery, gql, useMutation, useApolloClient } from '@apollo/client';
import { GetTile, GetTileVariables } from '../../generated/GetTile';
import { NewConstructionSite } from '../../generated/NewConstructionSite';

import { SessionContext } from '../../libs/session/session';

import Tile from '../../models/Tile';
import ConstructionSite from '../../models/ConstructionSite';
import Blueprint from '../../models/Blueprint';

import { Error } from '../../ui/dialog/Msg';
import { FormatQuantity } from '../../ui/text/format';
import TimeLeft from '../../ui/text/TimeLeft';

import styles from './Tile.scss';
import {
  BuildInfrastructure,
  BuildInfrastructureVariables,
} from 'generated/BuildInfrastructure';

const TilePage: FunctionComponent = () => {
  const session = useContext(SessionContext);
  const { position: positionParam } = useParams<{ position: string }>();

  // Position as number
  const position = parseInt(positionParam);
  if (position < 0 || position > 255) {
    return <Error>Invalid tile number.</Error>;
  }

  let islandId = session.id;

  const client = useApolloClient();

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
            constructionSite {
              id
              infrastructure
              workloadLeft
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
            <b>Kind:</b> {tile.kindName()}
            <br />
            <b>Infrastructure:</b> {tile.infrastructure.toLowerCase()}
            <br />
            <b>Level:</b> {tile.level}
          </p>
          <Fragment>
            <h2>Infrastructure</h2>
            {tile.level === 0 && !constructionSite.exists && (
              <table className={styles.upgradeTable}>
                <tbody>
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
                </tbody>
              </table>
            )}
            {constructionSite.exists && (
              <Fragment>
                <p>
                  There is a construction in progress to upgrade this{' '}
                  <b>{tile.infrastructure.toLowerCase()}</b> to{' '}
                  <b>level {tile.level + 1}</b>. It will be done{' '}
                  <b>
                    <TimeLeft
                      target={constructionSite.finishedAt}
                      onReach={() => {
                        client.cache.evict({
                          id: 'ConstructionSite:' + constructionSite.id,
                        });
                      }}
                    />
                  </b>
                  .
                </p>
                <CancelButton islandId={islandId} position={position} />
              </Fragment>
            )}
            {tile.level !== 0 &&
              blueprints.length === 1 &&
              !constructionSite.exists && (
                <Fragment>
                  <UpgradeButton islandId={islandId} position={position} />
                  <span>
                    You can upgrade for{' '}
                    {FormatQuantity(blueprints[0].materialCost)} material. It
                    would take {blueprints[0].durationStr()}.
                  </span>
                </Fragment>
              )}
            {tile.level !== 0 && !constructionSite.exists && (
              <Fragment>
                <DestroyButton islandId={islandId} position={position} />
              </Fragment>
            )}
          </Fragment>
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
  let infra = bp.infrastructure;

  const [build] = useMutation<
    BuildInfrastructure,
    BuildInfrastructureVariables
  >(
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
              id
              infrastructure
              workloadLeft
              finishedAt
              tile {
                position
              }
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
    {
      variables: { islandId, position, infrastructure: infra },
      update: (cache, data) => {
        cache.modify({
          id: 'Island:' + islandId,
          fields: {
            constructionSites: (currentConstructionSites) => {
              if (
                data.data?.buildInfrastructure?.__typename !== 'Tile' ||
                !data.data.buildInfrastructure.constructionSite
              ) {
                return;
              }

              const newSiteRef = cache.writeFragment<NewConstructionSite>({
                data: data.data.buildInfrastructure.constructionSite,
                fragment: gql`
                  fragment NewConstructionSite on ConstructionSite {
                    id
                    infrastructure
                    workloadLeft
                    finishedAt
                    tile {
                      position
                    }
                  }
                `,
              });
              return [...currentConstructionSites, newSiteRef];
            },
          },
        });
      },
    },
  );

  return (
    <tr>
      <td>
        <img src={bp.iconUrl()} alt={bp.name()} height={32} width={32} />
      </td>
      <td>
        <b>{bp.name()}</b>
      </td>
      <td>
        <div>
          <img src="https://icons.arkipel.io/res/material.svg" />
          <span> {FormatQuantity(bp.materialCost)}</span>
        </div>
      </td>
      <td>{bp.durationStr()}</td>
      <td>
        <button onClick={() => build()}>Build</button>
      </td>
    </tr>
  );
};

const CancelButton: FunctionComponent<{
  islandId: string;
  position: number;
}> = ({ islandId, position }) => {
  const [cancel, { loading, error }] = useMutation(
    gql`
      mutation CancelConstruction($islandId: String!, $position: Int!) {
        cancelConstruction(islandId: $islandId, position: $position) {
          ... on Tile {
            id
            position
            infrastructure
            level
            constructionSite {
              id
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
    {
      variables: { islandId, position },
      update: (cache) => {
        cache.modify({
          id: 'Island:' + islandId,
          fields: {
            constructionSites: (currentConstructionSites) => {
              return currentConstructionSites.filter((cs: any) => {
                let ref = cs.__ref as string;
                return !ref.includes('_' + position + '_');
              });
            },
          },
        });
      },
    },
  );

  return (
    <Fragment>
      <button
        onClick={() => {
          cancel();
        }}
        disabled={loading}
      >
        {loading && 'Cancelling...'}
        {!loading && 'Cancel'}
      </button>
      <Error visible={error !== undefined}>
        Could not cancel. Maybe the construction was already done. If not, try
        again.
      </Error>
    </Fragment>
  );
};

const UpgradeButton: FunctionComponent<{
  islandId: string;
  position: number;
}> = ({ islandId, position }) => {
  const [upgrade, { loading, error }] = useMutation(
    gql`
      mutation UpgradeInfrastructure($islandId: String!, $position: Int!) {
        upgradeInfrastructure(islandId: $islandId, position: $position) {
          ... on Tile {
            id
            infrastructure
            level
            constructionSite {
              id
              infrastructure
              workloadLeft
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
    {
      variables: { islandId, position },
      update: (cache, data) => {
        cache.modify({
          id: 'Island:' + islandId,
          fields: {
            constructionSites: (currentConstructionSites) => {
              const newSiteRef = cache.writeFragment<NewConstructionSite>({
                data: data.data.upgradeInfrastructure.constructionSite,
                fragment: gql`
                  fragment NewConstructionSite on ConstructionSite {
                    id
                    infrastructure
                    workloadLeft
                    finishedAt
                    tile {
                      position
                    }
                  }
                `,
              });
              return [...currentConstructionSites, newSiteRef];
            },
          },
        });
      },
    },
  );

  return (
    <Fragment>
      <button
        onClick={() => {
          upgrade();
        }}
        disabled={loading}
      >
        {loading && 'Upgrading...'}
        {!loading && 'Upgrade'}
      </button>
      <Error visible={error !== undefined}>Could not upgrade, try again.</Error>
    </Fragment>
  );
};

const DestroyButton: FunctionComponent<{
  islandId: string;
  position: number;
}> = ({ islandId, position }) => {
  const [cancel, { loading, error }] = useMutation(
    gql`
      mutation DestroyInfrastructure($islandId: String!, $position: Int!) {
        destroyInfrastructure(islandId: $islandId, position: $position) {
          ... on Tile {
            id
            infrastructure
            level
            constructionSite {
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

  return (
    <Fragment>
      <button
        onClick={() => {
          cancel();
        }}
        disabled={loading}
      >
        {loading && 'Destroying...'}
        {!loading && 'Destroy'}
      </button>
      <Error visible={error !== undefined}>
        Could not destroy. Maybe the infrastructure was already destroyed. If
        not, try again.
      </Error>
    </Fragment>
  );
};

export default TilePage;
