import React, { Fragment } from 'react';
import styled from 'styled-components';

import { useQuery, gql } from '@apollo/client';
import { GetNumberIslands } from 'generated/GetNumberIslands';

const Ranking = () => {
  let { data, loading, error } = useQuery<GetNumberIslands>(gql`
    query GetNumberIslands {
      archipelago {
        id
        numberIslands
      }
    }
  `);

  let numberIslands = '';
  if (data?.archipelago?.__typename === 'Archipelago') {
    numberIslands = data.archipelago.numberIslands.toString();
  } else if (loading) {
    numberIslands = 'Loading...';
  } else if (error) {
    numberIslands = '0';
  }

  return (
    <Fragment>
      <h1>Overview</h1>
      <p>
        <b>Number of islands:</b> {numberIslands}
      </p>
      <StyledTable>
        <tr>
          <td>
            <img src="https://icons.arkipel.io/ui/medal_gold.svg" height="50" />
          </td>
          <td>
            <span>Player 1</span>
          </td>
          <td>
            <span>1,000,000</span>
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
            <span>Player 2</span>
          </td>
          <td>
            <span>450,000</span>
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
            <span>Player 3</span>
          </td>
          <td>
            <span>18,000</span>
          </td>
        </tr>
        {(() => {
          let list = new Array<any>();
          for (let i = 4; i <= 100; i++) {
            list.push(
              <tr>
                <td>
                  <span>{i}</span>
                </td>
                <td>
                  <span>Player {i}</span>
                </td>
                <td>
                  <span>{10000 - i * i}</span>
                </td>
              </tr>,
            );
          }

          return list;
        })()}
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
