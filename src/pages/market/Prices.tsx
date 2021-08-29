import React, { Fragment } from 'react';

import { useQuery, gql } from '@apollo/client';
import {
  GetMarketPrices,
  GetMarketPricesVariables,
} from '../../generated/GetMarketPrices';
import { Precision, CommodityType } from '../../generated/globalTypes';

import { Error } from '../../ui/dialog/Msg';
import LineChart from '../../ui/chart/LineChart';

const PricesPage = () => {
  const { data, loading, error } = useQuery<
    GetMarketPrices,
    GetMarketPricesVariables
  >(
    gql`
      query GetMarketPrices($input: MarketPricesInput!) {
        marketPrices(input: $input) {
          __typename
          ... on MarketPrices {
            prices {
              timestamp
              currency {
                id
                code
              }
              commodity
              numTrades
              quantity
              price
              prevNumTrades
              prevQuantity
              prevNumTrades
            }
          }
        }
      }
    `,
    {
      variables: {
        input: {
          from: '2021-08-14T14:24:00Z',
          to: '2021-08-14T14:25:00Z',
          precision: Precision.SECOND,
          currencyId: 'ark',
          commodity: CommodityType.MATERIAL_1M,
        },
      },
    },
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || data?.marketPrices.__typename !== 'MarketPrices') {
    return <Error>Sorry, an error occurred.</Error>;
  }

  return (
    <Fragment>
      <h1>Prices</h1>
      <LineChart width={'100%'} height={300} />
      <h2>Prices</h2>
      {data.marketPrices.prices.map((mp) => {
        return <p key={Math.random()}>{mp.price}</p>;
      })}
    </Fragment>
  );
};

export default PricesPage;
