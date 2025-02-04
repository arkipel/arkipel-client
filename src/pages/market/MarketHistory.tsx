import React, { Fragment, FunctionComponent } from 'react';
import { useForm, useWatch, Control } from 'react-hook-form';

import { useQuery, gql, useApolloClient } from '@apollo/client';
import {
  GetMarketPricesQuery,
  GetMarketPricesQueryVariables,
  CommodityType,
  Range,
} from '../../generated/graphql';

import LineChart from '../../ui/chart/LineChart';
import { DateTime } from 'luxon';
import { Select, Radio } from '../../ui/form/Input';

const MarketHistory = () => {
  let client = useApolloClient();

  // Form (1st part)
  const defaultValues1: priceHistoryParams1 = {
    currencyId: 'ark',
    commodityType: CommodityType.Material,
    commodityCurrencyId: null,
  };

  const { register: register1, control: control1 } =
    useForm<priceHistoryParams1>({
      defaultValues: defaultValues1,
    });

  // Form (2nd part)
  const defaultValues2: priceHistoryParams2 = {
    range: 'PT24H',
  };

  const { register: register2, control: control2 } =
    useForm<priceHistoryParams2>({
      defaultValues: defaultValues2,
    });

  return (
    <Fragment>
      <h1>History</h1>
      <form style={{ display: 'grid', gap: '10px' }}>
        <div
          style={{
            display: 'grid',
            gridAutoColumns: '1fr 1fr auto',
            gridAutoFlow: 'column',
            gap: '10px',
          }}
        >
          <Select {...register1('commodityType')} style={{ width: '100%' }}>
            <option value={CommodityType.FrozenFood}>Frozen food</option>
            <option value={CommodityType.Material}>Material</option>
          </Select>
          <Select
            {...register1('currencyId')}
            id="currency"
            disabled={true}
            style={{ width: '100%' }}
          >
            <option value="ark">Arki Dollar (ARK)</option>
          </Select>
          <button
            style={{
              display: 'grid',
              justifyItems: 'center',
              alignItems: 'center',
              padding: '0 10px 0 0',
              fontSize: '24px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={(e) => {
              e.preventDefault();
              client.refetchQueries({ include: ['GetMarketPricesQuery'] });
            }}
          >
            <img
              src="https://arkipel-icons.pages.dev/ui/refresh.svg"
              height="25px"
              alt="&#8635;"
            />
          </button>
        </div>
      </form>
      <ControlledLineChart control1={control1} control2={control2} />
      <div
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
        }}
      >
        <div>
          <Radio {...register2('range')} label="1Y" value="P365D" />
        </div>
        <div>
          <Radio {...register2('range')} label="6M" value="P180D" />
        </div>
        <div>
          <Radio {...register2('range')} label="1M" value="P30D" />
        </div>
        <div>
          <Radio {...register2('range')} label="7D" value="PT168H" />
        </div>
        <div>
          <Radio {...register2('range')} label="1D" value="PT24H" />
        </div>
        <div>
          <Radio {...register2('range')} label="1H" value="PT60M" />
        </div>
        <div>
          <Radio {...register2('range')} label="5M" value="PT300S" />
        </div>
        <div>
          <Radio {...register2('range')} label="1M" value="PT60S" />
        </div>
      </div>
    </Fragment>
  );
};

interface priceHistoryParams1 {
  currencyId: string;
  commodityType: CommodityType;
  commodityCurrencyId: string | null;
}

interface priceHistoryParams2 {
  range: string;
}

const ControlledLineChart: FunctionComponent<controlledLineChartProps> = ({
  control1,
  control2,
}) => {
  let currencyId = useWatch({ name: 'currencyId', control: control1 });
  let commodityType = useWatch({ name: 'commodityType', control: control1 });
  let commodityCurrencyId = useWatch({
    name: 'commodityCurrencyId',
    control: control1,
  });
  let range = useWatch({ name: 'range', control: control2 });

  const { data, loading, error } = useQuery<
    GetMarketPricesQuery,
    GetMarketPricesQueryVariables
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
              }
              commodity
              numTrades
              quantity
              price
              prevNumTrades
              prevQuantity
              prevPrice
            }
          }
        }
      }
    `,
    {
      fetchPolicy: 'network-only',
      variables: {
        input: {
          range: convertRange(range),
          currencyId: currencyId,
          commodity: commodityType,
          commodityCurrencyId: commodityCurrencyId,
        },
      },
    },
  );

  if (loading) {
    return (
      <div
        style={{
          display: 'grid',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '300px',
          color: '#ddd',
        }}
      >
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: 'grid',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '300px',
          color: '#a00',
        }}
      >
        An error occurred
      </div>
    );
  }

  // Crunch the data points
  let points = new Array<{ x: number; y: number }>();
  if (data?.marketPrices.__typename === 'MarketPrices') {
    data.marketPrices.prices.forEach((mp) => {
      let x = DateTime.fromISO(mp.timestamp).toMillis();
      let y =
        mp.numTrades !== 0
          ? mp.price / mp.quantity
          : mp.prevPrice / mp.prevQuantity;
      points.push({ x, y });
    });
  }

  return <LineChart points={points} />;
};

interface controlledLineChartProps {
  control1: Control<priceHistoryParams1, object>;
  control2: Control<priceHistoryParams2, object>;
}

const convertRange = (range: string): Range => {
  switch (range) {
    case 'PT60S':
      return Range.Sec_60;
    case 'PT300S':
      return Range.Sec_300;
    case 'PT60M':
      return Range.Min_60;
    case 'PT24H':
      return Range.Hour_24;
    case 'PT168H':
      return Range.Hour_168;
    case 'P30D':
      return Range.Day_30;
    case 'P180D':
      return Range.Day_180;
    case 'P365D':
      return Range.Day_365;
    default:
      return Range.Sec_60;
  }
};

export default MarketHistory;
