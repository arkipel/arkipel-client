import React, { Fragment } from 'react';
import styled from 'styled-components';

import { useQuery, gql } from '@apollo/client';
import {
  GetCurrentMarketPrices,
  GetCurrentMarketPricesVariables,
} from 'generated/GetCurrentMarketPrices';

import { FormatPrice } from '../../ui/text/format';

const MarketPrices = () => {
  let { data, loading } = useQuery<
    GetCurrentMarketPrices,
    GetCurrentMarketPricesVariables
  >(
    gql`
      query GetCurrentMarketPrices($input: CurrentMarketPricesInput!) {
        currentMarketPrices(input: $input) {
          ... on CurrentMarketPrices {
            commodityPrices {
              commodity
              price
            }
            currencyPrices {
              currency {
                id
                code
                name
              }
              price
            }
          }
        }
      }
    `,
    {
      fetchPolicy: 'network-only',
      variables: { input: { currencyId: 'ark' } },
    },
  );

  return (
    <Fragment>
      <h1>Prices</h1>
      <h2>Commodities</h2>
      {loading && <p>Loading...</p>}
      {data && (
        <StyledList>
          {data.currentMarketPrices.__typename === 'CurrentMarketPrices' &&
            data.currentMarketPrices.commodityPrices.map((cp) => {
              return (
                <li key={cp.commodity}>
                  <b>{cp.commodity}:</b> {FormatPrice(cp.price)} ARK
                </li>
              );
            })}
        </StyledList>
      )}
    </Fragment>
  );
};

const StyledList = styled.ul`
  margin-left: 20px;
`;

export default MarketPrices;
