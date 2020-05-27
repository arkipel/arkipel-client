import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';

const IslandsList = () => {
  const { data, loading, error } = useQuery(
    gql`
      query islands {
        islands(sort: null) {
          id
          name
          active
        }
      }
    `,
  );

  if (loading || error) {
    return <></>;
  }

  return (
    <Fragment>
      <h1>Islands</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          {data.islands.map((island: any) => {
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
    </Fragment>
  );
};

export default IslandsList;
