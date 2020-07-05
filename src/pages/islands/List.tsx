import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';
import { GetIslands } from '../../generated/GetIslands';

// Config
import { mapsEndpoint } from 'Config';

import Island from '../../models/Island';

import { Info, Error } from '../../ui/dialog/Msg';

import styles from './List.scss';

const IslandsList = () => {
  const { data, loading, error } = useQuery<GetIslands>(gql`
    query GetIslands {
      islands(sort: null) {
        id
        name
        active
      }
    }
  `);

  let islands = new Array<Island>();
  data?.islands.forEach((i) => {
    let island = new Island(i);
    islands.push(island);
  });

  return (
    <Fragment>
      <h1>Islands</h1>
      <Info visible={loading}>Loading...</Info>
      <Error visible={error !== undefined}>Sorry, an error occurred.</Error>
      {!error && (
        <Fragment>
          <div className={styles.album}>
            {islands.map((island: any) => {
              return (
                <NavLink
                  key={island.id}
                  to={'islands/' + island.id}
                  className={styles.miniature}
                >
                  <img
                    src={mapsEndpoint + island.id + '.png'}
                    alt={'Map of ' + island.name}
                  />
                  <span>{island.name}</span>
                </NavLink>
              );
            })}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default IslandsList;
