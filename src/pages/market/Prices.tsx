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

import { extent, max } from 'd3-array';
import { withParentSize, ScaleSVG, ParentSize } from '@visx/responsive';
import { curveLinear } from '@visx/curve';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { scaleTime, scaleLinear } from '@visx/scale';
import {
  MarkerArrow,
  MarkerCross,
  MarkerX,
  MarkerCircle,
  MarkerLine,
} from '@visx/marker';
import generateDateValue, {
  DateValue,
} from '@visx/mock-data/lib/generators/genDateValue';

const lineCount = 5;
const series = new Array(lineCount).fill(null).map((_, i) =>
  // vary each series value deterministically
  generateDateValue(25, /* seed= */ i / 72).sort(
    (a: DateValue, b: DateValue) => a.date.getTime() - b.date.getTime(),
  ),
);
const allData = series.reduce((rec, d) => rec.concat(d), []);

// data accessors
const getX = (d: DateValue) => d.date;
const getY = (d: DateValue) => d.value;

// scales
const xScale = scaleTime<number>({
  domain: extent(allData, getX) as [Date, Date],
});
const yScale = scaleLinear<number>({
  domain: [0, max(allData, getY) as number],
});

// export type CurveProps = {
//   width: number;
//   height: number;
// };

const PricesPage = () => {
  // width = 500;
  // height = 300;

  // const lineHeight = height / lineCount;

  // update scale output ranges
  // xScale.range([0, width]);
  // yScale.range([lineHeight, 0]);

  let chart = (
    <div
      className="visx-curves-demo"
      style={{ border: '1px solid green', width: '100%', height: '300px' }}
    >
      <ParentSize>
        {({ width: visWidth, height: visHeight }) => {
          const lineHeight = visHeight / lineCount;

          console.log('width is', visWidth);
          console.log('height is', visHeight);

          xScale.range([0, visWidth]);
          yScale.range([lineHeight, 0]);

          return (
            <svg width={'100%'} height={'100%'}>
              <MarkerCircle id="marker-circle" fill="#333" size={2} refX={2} />
              <rect width={visWidth} height={visHeight} fill="#8ab" />
              {series.map((lineData, i) => {
                return (
                  <Group key={`lines-${i}`} top={i * lineHeight} left={13}>
                    <LinePath<DateValue>
                      curve={curveLinear}
                      data={lineData}
                      x={(d) => xScale(getX(d)) ?? 0}
                      y={(d) => yScale(getY(d)) ?? 0}
                      stroke="#333"
                      strokeWidth={2}
                      strokeOpacity={1}
                      shapeRendering="geometricPrecision"
                      markerMid="url(#marker-circle)"
                      markerStart="url(#marker-circle)"
                      markerEnd="url(#marker-circle)"
                    />
                  </Group>
                );
              })}
            </svg>
          );
        }}
      </ParentSize>
    </div>
  );

  // chart = withParentSize(chart);

  return chart;
};

export default PricesPage;
