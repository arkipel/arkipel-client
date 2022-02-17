import React, { Fragment, useContext } from 'react';
import styled from 'styled-components';

import { SessionContext } from '../../libs/session/session';

import { gql } from '@apollo/client';
import {
  useGetIslandOverviewQuery,
  useGetPlayerProfileQuery,
} from '../../generated/graphql';
import { BadgeType, CommodityType } from '../../generated/graphql';

import { ShortenNumber } from '../../ui/text/format';
import { DateTime } from 'luxon';

const Profile = () => {
  const session = useContext(SessionContext);

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
  `;

  let { data, loading } = useGetIslandOverviewQuery({
    variables: { islandId: session.id },
  });

  let ownerName = '';
  let islandName = '';
  if (data?.island?.__typename === 'Island') {
    ownerName = data.island.owner.name;
    islandName = data.island.name;
  } else if (loading) {
    ownerName = 'Loading...';
    islandName = 'Loading...';
  }

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
          badges {
            id
            createdAt
            type
          }
        }
      }
    }
  `;

  let { data: dataPlayer } = useGetPlayerProfileQuery({
    pollInterval: 60 * 1000,
    fetchPolicy: 'cache-and-network',
    variables: { input: { playerId: session.id } },
  });

  let scoresheet = {
    material: 0,
    food: 0,
    buildings: 0,
    currencies: 0,
    total: 0,
  };

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
            <td>Food</td>
            <td>{ShortenNumber(scoresheet.food)}</td>
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
