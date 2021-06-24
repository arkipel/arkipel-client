import React, { Fragment, FunctionComponent, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { useQuery, gql } from '@apollo/client';
import { GetIsland, GetIslandVariables } from 'generated/GetIsland';
import { Infrastructure } from '../../generated/globalTypes';

import { SessionContext } from '../../libs/session/session';

import Tile from '../../models/Tile';
import Island from '../../models/Island';

import TileStatusToggle from '../../components/TileStatusToggle';
import MapTile from '../../components/MapTile';

import { Info, Error } from '../../ui/dialog/Msg';
import Label from '../../ui/text/Label';

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
              island {
                id
              }
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
        <TableStyle>
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
        </TableStyle>
      )}
    </Fragment>
  );
};

const TableStyle = styled.table`
  width: 100%;

  thead tr {
    height: 30px;

    th:nth-child(4),
    th:nth-child(5),
    th:nth-child(6) {
      text-align: center;
    }

    th {
      img {
        height: 16px;
        width: 16px;
      }
    }
  }

  thead tr {
    th:nth-child(1) {
      width: 45px;
    }

    th:nth-child(2) {
      width: 40px;
    }

    th:nth-child(4) {
      width: 50px;
    }

    th:nth-child(5) {
      width: 50px;
    }

    th:nth-child(6) {
      width: 50px;
    }

    th:nth-child(7) {
      width: 40px;
    }
  }

  tbody tr {
    td:nth-child(2) {
      text-align: right;
    }

    td:nth-child(4),
    td:nth-child(5),
    td:nth-child(6) {
      text-align: center;
    }
  }

  tbody tr {
    height: 60px;
  }
`;

const InfrastructureItem: FunctionComponent<props> = ({ tile }) => {
  return (
    <tr>
      <td>
        <MapTile tile={tile} size={36} />
      </td>
      <td>{tile.position}</td>
      <td>
        <NavLink exact to={'/island/tiles/' + tile.position}>
          {tile.infrastructureName()} ({tile.level}){' '}
        </NavLink>
        {tile.isStalled() && (
          <Label text="Stalled" textColor="#fff" backgroundColor="#b66" />
        )}
      </td>
      <td>{tile.population}</td>
      <td>{tile.energy}</td>
      <td>{tile.material}/s</td>
      <td>
        <TileStatusToggle islandId={tile.islandId} position={tile.position} />
      </td>
    </tr>
  );
};

class props {
  tile: Tile = new Tile({});
}

export default InfrastructurePage;
