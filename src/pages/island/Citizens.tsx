import React, { Fragment, FunctionComponent, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { useQuery, gql } from '@apollo/client';
import { GetCitizens, GetCitizensVariables } from 'generated/GetCitizens';

import { SessionContext } from '../../libs/session/session';

import { DateTime } from 'luxon';

const CitizensPage = () => {
  const session = useContext(SessionContext);

  let islandId = session.id;

  const { data, loading } = useQuery<GetCitizens, GetCitizensVariables>(
    gql`
      query GetCitizens($input: CitizensFromIslandInput!) {
        citizensFromIsland(input: $input) {
          ... on CitizenList {
            citizens {
              id
              createdAt
              name
            }
          }
        }
      }
    `,
    { variables: { input: { islandId } } },
  );

  let citizens = new Array<citizen>();

  if (data?.citizensFromIsland.__typename === 'CitizenList') {
    for (const c of data.citizensFromIsland.citizens) {
      citizens.push({
        id: c.id,
        createdAt: DateTime.fromISO(c.createdAt),
        name: c.name,
      });
    }
  }

  return (
    <Fragment>
      <h1>Citizens</h1>
      {loading && <p>Loading...</p>}
      {!loading && (
        <TableStyle>
          <thead>
            <tr>
              <th>Name</th>
              <th>Arrival</th>
            </tr>
          </thead>
          <tbody>
            {citizens.map((c) => {
              return <CitizenItem key={c.id} citizen={c} />;
            })}
          </tbody>
        </TableStyle>
      )}
    </Fragment>
  );
};

const TableStyle = styled.table`
  width: 100%;

  thead tr {
    height: 30px;
  }

  thead tr {
    th:nth-child(1) {
      width: 100%;
    }

    th:nth-child(2) {
      min-width: 160px;
    }
  }
`;

const CitizenItem: FunctionComponent<{ citizen: citizen }> = ({ citizen }) => {
  return (
    <tr>
      <td>
        <NavLink to={'/citizen/' + citizen.id}>{citizen.name}</NavLink>
      </td>
      <td>{citizen.createdAt.toRelative()}</td>
    </tr>
  );
};

interface citizen {
  id: string;
  createdAt: DateTime;
  name: string;
}

export default CitizensPage;
