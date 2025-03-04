import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { useQuery, gql } from '@apollo/client';
import { GetTopPlayersQuery } from 'generated/graphql';

import { ShortenNumber } from '../../ui/text/format';

const Ranking = () => {
  let { data } = useQuery<GetTopPlayersQuery>(
    gql`
      query GetTopPlayers($input: TopPlayersInput!) {
        topPlayers(input: $input) {
          ... on TopPlayers {
            players {
              id
              name
              scoresheet {
                id
                score
              }
            }
          }
        }
      }
    `,
    {
      pollInterval: 60 * 1000,
      fetchPolicy: 'network-only',
      variables: { input: { limit: 100 } },
    },
  );

  type player = { id: string; name: string; score: number };

  // Player 1
  let player1: player = {
    id: '',
    name: '',
    score: 0,
  };
  if (data?.topPlayers.players && data.topPlayers.players.length > 0) {
    player1 = {
      id: data?.topPlayers.players[0].id,
      name: data?.topPlayers.players[0].name,
      score: data?.topPlayers.players[0].scoresheet.score,
    };
  }

  // Player 2
  let player2: player = {
    id: '',
    name: '',
    score: 0,
  };
  if (data?.topPlayers.players && data.topPlayers.players.length > 1) {
    player2 = {
      id: data?.topPlayers.players[1].id,
      name: data?.topPlayers.players[1].name,
      score: data?.topPlayers.players[1].scoresheet.score,
    };
  }

  // Player 3
  let player3: player = {
    id: '',
    name: '',
    score: 0,
  };
  if (data?.topPlayers.players && data.topPlayers.players.length > 2) {
    player3 = {
      id: data?.topPlayers.players[2].id,
      name: data?.topPlayers.players[2].name,
      score: data?.topPlayers.players[2].scoresheet.score,
    };
  }

  let remainingPlayers = new Array<player>();

  if (data?.topPlayers.players) {
    for (let i = 3; i < data?.topPlayers.players?.length; i++) {
      const p = data?.topPlayers.players[i];

      remainingPlayers.push({
        id: p.id,
        name: p.name,
        score: p.scoresheet.score,
      });
    }
  }

  return (
    <Fragment>
      <h1>Ranking</h1>
      <StyledTable>
        <tbody>
          <tr>
            <td>
              <img
                src="https://arkipel-icons.pages.dev/ui/medal_gold.svg"
                height="50"
              />
            </td>
            <td>
              <span>
                <NavLink to={'/profile/' + player1.id}>{player1.name}</NavLink>
              </span>
            </td>
            <td>
              <span>{ShortenNumber(player1.score)}</span>
            </td>
          </tr>
          <tr>
            <td>
              <img
                src="https://arkipel-icons.pages.dev/ui/medal_silver.svg"
                height="50"
              />
            </td>
            <td>
              <span>
                <NavLink to={'/profile/' + player2.id}>{player2.name}</NavLink>
              </span>
            </td>
            <td>
              <span>{ShortenNumber(player2.score)}</span>
            </td>
          </tr>
          <tr>
            <td>
              <img
                src="https://arkipel-icons.pages.dev/ui/medal_bronze.svg"
                height="50"
              />
            </td>
            <td>
              <span>
                <NavLink to={'/profile/' + player3.id}>{player3.name}</NavLink>
              </span>
            </td>
            <td>
              <span>{ShortenNumber(player3.score)}</span>
            </td>
          </tr>
          {(() => {
            let list = new Array<any>();
            let pos = 3;

            for (const p of remainingPlayers) {
              pos++;
              list.push(
                <tr key={p.id}>
                  <td>
                    <span>{pos}</span>
                  </td>
                  <td>
                    <span>
                      <NavLink to={'/profile/' + p.id}>{p.name}</NavLink>
                    </span>
                  </td>
                  <td>
                    <span>{ShortenNumber(p.score)}</span>
                  </td>
                </tr>,
              );
            }

            return list;
          })()}
        </tbody>
      </StyledTable>
    </Fragment>
  );
};

const StyledTable = styled.table`
  margin: 0px;
  padding: 0px;

  td:nth-child(1) {
    margin: 0px;
    padding: 4px 0;
    width: 50px;
    color: grey;
    text-align: center;
  }

  td:nth-child(3) {
    text-align: right;
  }

  tr:nth-child(1) {
    font-size: x-large;

    img {
      display: block;
      height: 50px;
    }
  }

  tr:nth-child(2) {
    font-size: x-large;

    img {
      display: block;
      height: 50px;
    }
  }

  tr:nth-child(3) {
    font-size: x-large;

    img {
      display: block;
      height: 50px;
    }
  }
`;

export default Ranking;
