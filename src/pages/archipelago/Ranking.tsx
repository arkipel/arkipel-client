import React, { Fragment } from 'react';
import styled from 'styled-components';

import { useQuery, gql } from '@apollo/client';
import { GetTopPlayers } from 'generated/GetTopPlayers';

import { FormatQuantity } from '../../ui/text/format';

const Ranking = () => {
  let { data } = useQuery<GetTopPlayers>(
    gql`
      query GetTopPlayers($input: TopPlayersInput!) {
        topPlayers(input: $input) {
          ... on TopPlayers {
            players {
              id
              name
              score
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
      score: data?.topPlayers.players[0].score,
    };
  }

  // Player 2
  let player2: player = {
    id: '',
    name: '',
    score: 0,
  };
  if (data?.topPlayers.players && data.topPlayers.players.length > 0) {
    player2 = {
      id: data?.topPlayers.players[1].id,
      name: data?.topPlayers.players[1].name,
      score: data?.topPlayers.players[1].score,
    };
  }

  // Player 3
  let player3: player = {
    id: '',
    name: '',
    score: 0,
  };
  if (data?.topPlayers.players && data.topPlayers.players.length > 0) {
    player3 = {
      id: data?.topPlayers.players[2].id,
      name: data?.topPlayers.players[2].name,
      score: data?.topPlayers.players[2].score,
    };
  }

  let remainingPlayers = new Array<player>();

  if (data?.topPlayers.players) {
    for (let i = 3; i < data?.topPlayers.players?.length; i++) {
      const p = data?.topPlayers.players[i];

      remainingPlayers.push({
        id: p.id,
        name: p.name,
        score: p.score,
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
                src="https://icons.arkipel.io/ui/medal_gold.svg"
                height="50"
              />
            </td>
            <td>
              <span>{player1.name}</span>
            </td>
            <td>
              <span>{FormatQuantity(player1.score)}</span>
            </td>
          </tr>
          <tr>
            <td>
              <img
                src="https://icons.arkipel.io/ui/medal_silver.svg"
                height="50"
              />
            </td>
            <td>
              <span>{player2.name}</span>
            </td>
            <td>
              <span>{FormatQuantity(player2.score)}</span>
            </td>
          </tr>
          <tr>
            <td>
              <img
                src="https://icons.arkipel.io/ui/medal_bronze.svg"
                height="50"
              />
            </td>
            <td>
              <span>{player3.name}</span>
            </td>
            <td>
              <span>{FormatQuantity(player3.score)}</span>
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
                    <span>{p.name}</span>
                  </td>
                  <td>
                    <span>{FormatQuantity(p.score)}</span>
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
