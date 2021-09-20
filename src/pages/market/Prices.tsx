import React, { Fragment, FunctionComponent, useState, useEffect } from 'react';
import { useForm, useWatch, Control } from 'react-hook-form';

import { useQuery, useLazyQuery, gql } from '@apollo/client';
import {
  GetMarketPrices,
  GetMarketPricesVariables,
} from '../../generated/GetMarketPrices';
import { CommodityType, Range } from '../../generated/globalTypes';

import { Duration } from 'luxon';

import LineChart from '../../ui/chart/LineChart';
import { Point } from '../../ui/chart/draw';
import { DateTime } from 'luxon';
import { Input, Submit, Select, Radio } from '../../ui/form/Input';

const PricesPage = () => {
  let [now, setNow] = useState(DateTime.now().toUTC());

  // Form (1st part)
  const defaultValues1: priceHistoryParams1 = {
    currencyId: 'ark',
    commodityType: CommodityType.MATERIAL_1M,
    commodityCurrencyId: null,
  };

  const {
    register: register1,
    control: control1,
    watch: watch1,
  } = useForm<priceHistoryParams1>({
    defaultValues: defaultValues1,
  });

  let commodityType = watch1('commodityType');
  let commodityIsCurrency = commodityType == CommodityType.CURRENCY;

  // Form (2nd part)
  const defaultValues2: priceHistoryParams2 = {
    range: 'PT60S',
  };

  const { register: register2, control: control2 } =
    useForm<priceHistoryParams2>({
      defaultValues: defaultValues2,
    });

  return (
    <Fragment>
      <h1>Prices</h1>
      <form style={{ display: 'grid', gap: '10px' }}>
        <div
          style={{
            display: 'grid',
            gridAutoColumns: '1fr auto',
            gridAutoFlow: 'column',
            gap: '10px',
          }}
        >
          <Select
            {...register1('currencyId')}
            id="currency"
            style={{ width: '100%' }}
          >
            <option value="ark">Arki Dollar (ARK)</option>
            <option value="rck">Rock (RCK)</option>
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
              setNow(DateTime.now().toUTC());
            }}
          >
            <img
              src="https://icons.arkipel.io/ui/refresh.svg"
              height="25px"
              alt="&#8635;"
            />
          </button>
        </div>
        <div
          style={{
            display: 'grid',
            gridAutoColumns: '1fr 1fr',
            gridAutoFlow: 'column',
            gap: '10px',
          }}
        >
          <Select {...register1('commodityType')} style={{ width: '100%' }}>
            <option value={CommodityType.MATERIAL_1M}>Material (1M)</option>
            <option value={CommodityType.CURRENCY}>Currency</option>
          </Select>

          <Select
            {...register1('commodityCurrencyId')}
            style={{ width: '100%' }}
            placeholder={'commodity crrency'}
            disabled={!commodityIsCurrency}
            defaultValue=""
          >
            <option value="" disabled>
              Select currency
            </option>
            <option value="ark">Arki Dollar (ARK)</option>
            <option value="rck">Rock (RCK)</option>
          </Select>
        </div>
      </form>
      <ControlledLineChart
        width={400}
        height={300}
        control1={control1}
        control2={control2}
        now={now}
      />
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
  width,
  height,
  control1,
  control2,
  now,
}) => {
  let currencyId = useWatch({ name: 'currencyId', control: control1 });
  let commodityType = useWatch({ name: 'commodityType', control: control1 });
  let commodityCurrencyId = useWatch({
    name: 'commodityCurrencyId',
    control: control1,
  });
  let range = useWatch({ name: 'range', control: control2 });

  console.log('currencyId:', currencyId);
  console.log('commodityType:', commodityType);
  console.log('commodityCurrencyId:', commodityCurrencyId);
  console.log('range:', range);
  console.log('now:', now);

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
          height: '302px',
          border: '1px solid #ddd',
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
          height: '302px',
          border: '1px solid #ddd',
          color: '#a00',
        }}
      >
        An error occurred
      </div>
    );
  }

  // Crunch the data points
  let points = new Array<Point>();
  if (data?.marketPrices.__typename === 'MarketPrices') {
    data.marketPrices.prices.forEach((mp) => {
      let x = DateTime.fromISO(mp.timestamp).toMillis();
      let y = mp.prevPrice;
      points.push({ x, y });
    });
  }

  return <LineChart width={width} height={height} points={points} />;
};

interface controlledLineChartProps {
  width: number;
  height: number;
  control1: Control<priceHistoryParams1, object>;
  control2: Control<priceHistoryParams2, object>;
  now: DateTime;
}

const convertRange = (range: string): Range => {
  switch (range) {
    case 'PT60S':
      return Range.SEC_60;
    case 'PT300S':
      return Range.SEC_300;
    case 'PT60M':
      return Range.MIN_60;
    case 'PT24H':
      return Range.HOUR_24;
    case 'PT168H':
      return Range.HOUR_168;
    case 'P30D':
      return Range.DAY_30;
    case 'P180D':
      return Range.DAY_180;
    case 'P365D':
      return Range.DAY_365;
    default:
      return Range.SEC_60;
  }
};

const getStartingDateFromRange = (now: DateTime, range: string): DateTime => {
  let dur = Duration.fromISO(range);
  return now.minus(dur);
};

export default PricesPage;
