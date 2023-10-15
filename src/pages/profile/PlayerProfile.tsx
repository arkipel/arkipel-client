import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useQuery, gql } from '@apollo/client';
import {
  GetPublicPlayerProfileQuery,
  GetPublicPlayerProfileQueryVariables,
  CommodityType,
  BadgeType,
} from '../../generated/graphql';

import { DateTime } from 'luxon';

import IslandMap from '../../components/IslandMap';
import Island from '../../models/Island';
import { ShortenNumber } from '../../ui/text/format';

const Profile = () => {
  const { profileId } = useParams<{ profileId: string }>();

  let { data: dataPlayer } = useQuery<
    GetPublicPlayerProfileQuery,
    GetPublicPlayerProfileQueryVariables
  >(
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
            badges {
              id
              createdAt
              type
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
    food: 0,
    buildings: 0,
    currencies: 0,
    total: 0,
  };
  let island = new Island({});

  let badges = new Array<{
    id: string;
    createdAt: DateTime;
    type: BadgeType;
  }>();

  if (dataPlayer?.player.__typename === 'Player') {
    // Scoresheet
    const sheet = dataPlayer.player.scoresheet;

    for (const cs of dataPlayer?.player.scoresheet.commodities) {
      switch (cs.commodity) {
        case CommodityType.FrozenFood:
          scoresheet.food = cs.score;
          break;

        case CommodityType.Material:
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

    // Badges
    for (const b of dataPlayer.player.badges) {
      badges.push({
        id: b.id,
        createdAt: DateTime.fromISO(b.createdAt + ''),
        type: b.type,
      });
    }
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
            <td>{ShortenNumber(scoresheet.material)}</td>
          </tr>
          <tr>
            <td>Buildings</td>
            <td>{ShortenNumber(scoresheet.buildings)}</td>
          </tr>
          <tr>
            <td>Currencies</td>
            <td>{ShortenNumber(scoresheet.currencies)}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>{ShortenNumber(scoresheet.total)}</td>
          </tr>
        </tfoot>
      </StyledTable>
      <h2>Island</h2>
      <IslandMap island={island} clickable={false} />
      <h2>Badges</h2>
      <StyledBadgeShowcase>
        {badges.map((b) => {
          return (
            <div key={Math.random()}>
              <img
                src="https://icons.arkipel.io/badges/generic.svg"
                alt="Badge icon"
                height={50}
                width={50}
              />
              <span>{BadgeTypeToName(b.type)}</span>
              <span>({b.createdAt.toRelative()})</span>
            </div>
          );
        })}
      </StyledBadgeShowcase>
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

const StyledBadgeShowcase = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-gap: 10px;

  div {
    display: grid;
    grid-template-rows: 50px auto auto;
    justify-items: center;

    img {
      height: '50px';
      width: '50px';
    }

    span:nth-child(3) {
      font-size: small;
      color: #888;
    }
  }
`;

const BadgeTypeToName = (badgeType: BadgeType): string => {
  switch (badgeType) {
    case BadgeType.EarlyPlayer:
      return 'Early player';
    default:
      return 'Unknown';
  }
};

export default Profile;
