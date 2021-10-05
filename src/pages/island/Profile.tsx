import React, { Fragment, useContext } from 'react';
import styled from 'styled-components';

import { SessionContext } from '../../libs/session/session';

import { useQuery, gql } from '@apollo/client';
import { GetIslandOverview } from '../../generated/GetIslandOverview';
import { GetPlayerProfile } from '../../generated/GetPlayerProfile';
import { CommodityType } from '../../generated/globalTypes';

import { FormatQuantity } from '../../ui/text/format';

const Profile = () => {
  const session = useContext(SessionContext);

  let { data, loading } = useQuery<GetIslandOverview>(
    gql`
      query GetIslandOverview($islandId: String!) {
        island(islandId: $islandId) {
          ... on Island {
            id
            name
            owner {
              id
              name
            }
          }
        }
      }
    `,
    { variables: { islandId: session.id } },
  );

  let ownerName = '';
  let islandName = '';
  if (data?.island?.__typename === 'Island') {
    ownerName = data.island.owner.name;
    islandName = data.island.name;
  } else if (loading) {
    ownerName = 'Loading...';
    islandName = 'Loading...';
  }

  let { data: dataPlayer } = useQuery<GetPlayerProfile>(
    gql`
      query GetPlayerProfile($input: PlayerInput!) {
        player(input: $input) {
          ... on Player {
            scoresheet {
              id
              score
              commodities {
                commodity
                score
              }
              buildings {
                score
              }
              currencies {
                currency {
                  id
                }
                score
              }
            }
          }
        }
      }
    `,
    {
      pollInterval: 60 * 1000,
      fetchPolicy: 'cache-and-network',
      variables: { input: { playerId: session.id } },
    },
  );

  let scoresheet = {
    material: 0,
    buildings: 0,
    currencies: 0,
    total: 0,
  };

  if (dataPlayer?.player.__typename === 'Player') {
    const sheet = dataPlayer.player.scoresheet;

    for (const cs of dataPlayer?.player.scoresheet.commodities) {
      switch (cs.commodity) {
        case CommodityType.MATERIAL_1M:
          scoresheet.material = cs.score;
          break;

        default:
          break;
      }
    }

    for (const bs of dataPlayer?.player.scoresheet.buildings) {
      scoresheet.buildings += bs.score;
    }

    for (const cs of dataPlayer?.player.scoresheet.currencies) {
      scoresheet.currencies += cs.score;
    }

    scoresheet.total = sheet.score;
  }

  return (
    <Fragment>
      <h1>Profile</h1>
      <p>
        <b>Owner name:</b> {ownerName}
        <br />
        <b>Island name:</b> {islandName}
      </p>
      <h2>Scoresheet</h2>
      <StyledTable>
        <tbody>
          <tr>
            <td>Material</td>
            <td>{FormatQuantity(scoresheet.material)}</td>
          </tr>
          <tr>
            <td>Buildings</td>
            <td>{FormatQuantity(scoresheet.buildings)}</td>
          </tr>
          <tr>
            <td>Currencies</td>
            <td>{FormatQuantity(scoresheet.currencies)}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>{FormatQuantity(scoresheet.total)}</td>
          </tr>
        </tfoot>
      </StyledTable>
    </Fragment>
  );
};

const StyledTable = styled.table`
  td:nth-child(2) {
    width: 20%;
    text-align: right;
  }

  td:last-child {
    width: 10%;
    text-align: right;
  }

  tfoot {
    font-weight: bold;
  }
`;

export default Profile;
