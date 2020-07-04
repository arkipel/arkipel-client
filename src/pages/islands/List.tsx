import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';
import { GetIslands } from '../../generated/GetIslands';

import Island from '../../models/Island';

import { Error } from '../../ui/dialog/Msg';

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
      <Error visible={error !== undefined}>Sorry, an error occurred.</Error>
      {!error && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Population</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={2} style={{ textAlign: 'center' }}>
                  Loading...
                </td>
              </tr>
            )}
            {islands.map((island: any) => {
              return (
                <tr key={island.id}>
                  <th>
                    <NavLink to={'islands/' + island.id}>{island.name}</NavLink>
                  </th>
                  <td>0</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </Fragment>
  );
};

export default IslandsList;
