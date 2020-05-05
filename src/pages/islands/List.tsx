import React, { Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';

const IslandsList = () => {
  // const islands = useState<Array<Island>>();

  const { data, loading, error } = useQuery(
    gql`
      query listOfIslands {
        islands {
          name
        }
      }
    `,
  );

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
          {/* {islands.map((island) => {
            return (
              <tr key={island.id}>
                <th>
                  <NavLink to={'islands/' + island.id}>{island.name}</NavLink>
                </th>
                <td>0</td>
              </tr>
            );
          })} */}
        </tbody>
      </table>
    </Fragment>
  );
};

export default IslandsList;
