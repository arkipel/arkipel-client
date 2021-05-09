import React, {
  Fragment,
  useContext,
  useState,
  FunctionComponent,
} from 'react';
import { useForm } from 'react-hook-form';

import { useQuery, useMutation, gql, useApolloClient } from '@apollo/client';
import { SendOrder, SendOrderVariables } from '../../generated/SendOrder';
import {
  GetBestOffers,
  GetBestOffersVariables,
} from '../../generated/GetBestOffers';
import {
  GetMyOpenOrders,
  GetMyOpenOrdersVariables,
} from '../../generated/GetMyOpenOrders';
import { NewOrder } from 'generated/NewOrder';
import { CommodityType, OrderSide } from '../../generated/globalTypes';

import { DateTime, Duration } from 'luxon';

import { SessionContext } from '../../libs/session/session';
import { InventoryContext } from '../../libs/session/inventory';
import { BankAccountsContext } from '../../libs/session/bank_accounts';

import { Error, Info, Success } from '../../ui/dialog/Msg';
import TimeLeft from '../../ui/text/TimeLeft';

import styles from './Trade.scss';

import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Brush,
} from 'recharts';

const PricesPage = () => {
  return (
    <ResponsiveContainer width={'100%'} height={200}>
      <LineChart data={data}>
        {/* <XAxis dataKey="name" /> */}
        {/* <YAxis /> */}
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line
          type="monotone"
          dataKey="uv"
          stroke="#bbb"
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#888"
          isAnimationActive={false}
        />
        <Brush />
      </LineChart>
    </ResponsiveContainer>
  );
};

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default PricesPage;
