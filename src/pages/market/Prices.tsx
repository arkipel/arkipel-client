import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';

import { useQuery, gql } from '@apollo/client';
import {
  GetMarketPrices,
  GetMarketPricesVariables,
} from '../../generated/GetMarketPrices';
import { Precision, CommodityType } from '../../generated/globalTypes';

import { Duration } from 'luxon';

import { Error } from '../../ui/dialog/Msg';
import LineChart from '../../ui/chart/LineChart';
import { Point } from '../../ui/chart/draw';
import { DateTime } from 'luxon';
import { Input, Submit, Select, Radio } from '../../ui/form/Input';

const PricesPage = () => {
  const defaultValues: priceHistoryParams = {
    currencyId: 'ark',
    commodityType: CommodityType.MATERIAL_1M,
    commodityCurrencyId: null,
    range: 'PT5M',
  };

  // Form
  const { register, handleSubmit, watch, reset } = useForm<priceHistoryParams>({
    defaultValues,
  });

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
          to: '2021-08-14T14:24:59Z',
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

  // Crunch the data points
  let points = new Array<Point>();
  data.marketPrices.prices.forEach((pp) => {
    let x = DateTime.fromISO(pp.timestamp).toMillis();
    let y = pp.price;
    points.push({ x, y });
  });

  return (
    <Fragment>
      <h1>Prices</h1>
      <div style={{}}>
        <Select
          {...register('currencyId')}
          id="currency"
          style={{ width: '100%' }}
        >
          <option value="ark">Arki Dollar (ARK)</option>
          <option value="rck">Rock (RCK)</option>
        </Select>
      </div>
      <div
        style={{
          display: 'grid',
          gridAutoColumns: '1fr 1fr',
          gridAutoFlow: 'column',
          gap: '10px',
        }}
      >
        <Select {...register('commodityType')} style={{ width: '100%' }}>
          <option value={CommodityType.MATERIAL_1M}>Material (1M)</option>
          <option value={CommodityType.CURRENCY}>Currency</option>
        </Select>

        <Select
          {...register('commodityCurrencyId')}
          style={{ width: '100%' }}
          placeholder={'commodity crrency'}
          defaultValue=""
        >
          <option value="" disabled>
            Select currency
          </option>
          <option value="ark">Arki Dollar (ARK)</option>
          <option value="rck">Rock (RCK)</option>
        </Select>
      </div>
      <LineChart width={400} height={300} points={points} />
      <div
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
        }}
      >
        <div>
          <Radio {...register('range')} label="1Y" value="P1Y" />
        </div>
        <div>
          <Radio {...register('range')} label="6M" value="P6M" />
        </div>
        <div>
          <Radio {...register('range')} label="1M" value="P1M" />
        </div>
        <div>
          <Radio {...register('range')} label="7D" value="P7D" />
        </div>
        <div>
          <Radio {...register('range')} label="1D" value="P1D" />
        </div>
        <div>
          <Radio {...register('range')} label="1H" value="PT1H" />
        </div>
        <div>
          <Radio {...register('range')} label="5M" value="PT5M" />
        </div>
      </div>
      <h2>Prices</h2>
      {data.marketPrices.prices.map((mp) => {
        return <p key={Math.random()}>{mp.price}</p>;
      })}
    </Fragment>
  );
};

interface priceHistoryParams {
  currencyId: string;
  commodityType: CommodityType;
  commodityCurrencyId: string | null;
  range: string;
}

export default PricesPage;
