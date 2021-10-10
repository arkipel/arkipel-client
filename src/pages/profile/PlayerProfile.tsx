import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useQuery, gql } from '@apollo/client';
import { GetPublicPlayerProfile } from '../../generated/GetPublicPlayerProfile';
import { CommodityType } from '../../generated/globalTypes';

import IslandMap from '../../components/IslandMap';
import Island from '../../models/Island';
import { FormatQuantity } from '../../ui/text/format';

const Profile = () => {
  const { profileId } = useParams<{ profileId: string }>();

  let { data: dataPlayer } = useQuery<GetPublicPlayerProfile>(
    gql`
      query GetPublicPlayerProfile($input: PlayerInput!) {
        player(input: $input) {
          ... on Player {
            id
            name
            island {
              name
              tiles {
                id
                position
                infrastructure
                level
              }
            }
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
      variables: { input: { playerId: profileId } },
    },
  );

  let ownerName = '';
  let islandName = '';
  let scoresheet = {
    material: 0,
    buildings: 0,
    currencies: 0,
    total: 0,
  };
  let island = new Island({});

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

    ownerName = dataPlayer.player.name;

    // Island
    islandName = dataPlayer.player.island.name;

    island = new Island(dataPlayer.player.island);
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
      <h2>Island</h2>
      <IslandMap island={island} clickable={false} />
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
