import React, { Fragment, useContext } from 'react';

import { useQuery, gql } from '@apollo/client';
import { GetIsland, GetIslandVariables } from 'generated/GetIsland';

import { SessionContext } from '../../libs/session/session';

import Island from '../../models/Island';

import { Error } from '../../ui/dialog/Msg';

import styles from './Infrastructure.scss';

const MapPage = () => {
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

  console.log('island:', island);

  return (
    <Fragment>
      <h1>Infrastructure</h1>
      {loading && <p>Loading...</p>}
      <div className={styles.listTiles}>
        {island.tiles.map((t, i) => {
          return (
            <div key={i} className={styles.tileBox}>
              <div>
                <span>{i}</span>
                <span>
                  {t.infrastructureName()} on {t.kindName()}
                </span>
              </div>
              <div>
                <div className={styles.stats}>
                  <span>Level {t.level}</span>
                  <div className={styles.iconStat}>
                    <img
                      // className={styles.materialIcon}
                      src="https://icons.arkipel.io/res/population.svg"
                    />
                    <span>4</span>
                  </div>
                  <div className={styles.iconStat}>
                    <img
                      // className={styles.materialIcon}
                      src="https://icons.arkipel.io/res/energy.svg"
                    />
                    <span>5</span>
                  </div>
                  <div className={styles.iconStat}>
                    <img
                      // className={styles.materialIcon}
                      src="https://icons.arkipel.io/res/material.svg"
                    />
                    <span>20/s</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default MapPage;
