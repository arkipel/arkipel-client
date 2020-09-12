import React, {
  Fragment,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';

import { useQuery, gql, useMutation } from '@apollo/client';
import { GetTile, GetTileVariables } from '../../generated/GetTile';
import { NewConstructionSite } from '../../generated/NewConstructionSite';
import { TileKind } from '../../generated/globalTypes';

import { SessionContext } from '../../libs/session/session';

import Tile from '../../models/Tile';
import ConstructionSite from '../../models/ConstructionSite';
import Blueprint from '../../models/Blueprint';

import { Error } from '../../ui/dialog/Msg';

import styles from './Tile.scss';

const TilePage: FunctionComponent = () => {
  const [, forceUpdate] = useState(0);
  const session = useContext(SessionContext);
  const { position } = useParams();

  let islandId = session.id;

  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate(Math.random());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

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
            <b>Kind:</b> {positionToKind(position).toLowerCase()}
            <br />
            <b>Infrastructure:</b> {tile.infrastructure.toLowerCase()}
            <br />
            <b>Level:</b> {tile.level}
          </p>
          <Fragment>
            <h2>Infrastructure</h2>
            {tile.level === 0 && !constructionSite.exists && (
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
            )}
            {constructionSite.exists && (
              <Fragment>
                <p>
                  There is a construction in progress to upgrade this{' '}
                  <b>{constructionSite.infrastructure.toLowerCase()}</b> to{' '}
                  <b>level {tile.level + 1}</b>. It will be done{' '}
                  <b>{constructionSite.finishedAt.toRelative()}</b>.
                </p>
                <CancelButton islandId={islandId} position={position} />
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

  const [build] = useMutation(
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
              const newSiteRef = cache.writeFragment<NewConstructionSite>({
                data: data.data.buildInfrastructure,
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
    <div onClick={() => build()}>
      <img src={bp.iconUrl()} alt={bp.name()} />
      <div>
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
        Could not cancel. Maybe the construction was already done. If not, try
        again.
      </Error>
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
