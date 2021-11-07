import React, { FunctionComponent, useRef } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import { debounce } from 'lodash';
import { DateTime } from 'luxon';

import draw from './draw';
import { Point } from '../../ui/chart/draw';

const LineChart: FunctionComponent<props> = ({ width, height, points }) => {
  // if (!width) {
  width = '100%';
  // }

  // if (!height) {
  height = '100%';
  // }

  let styleVars = {
    '--chartWidth': width,
    '--chartHeight': height,
  } as React.CSSProperties;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // let redraw = debounce(() => {
  //   let canvas = canvasRef.current;

  //   if (!canvas) {
  //     return;
  //   }

  //   canvas.width = canvas.width = canvas.clientWidth;
  //   canvas.height = canvas.height = canvas.clientHeight;

  //   draw(canvas, points);
  // }, 200);

  // useEffect(() => {
  //   const canvas = canvasRef.current;

  //   if (!canvas) {
  //     return;
  //   }

  //   redraw();

  //   window.addEventListener('resize', redraw);

  //   return () => {
  //     canvas.removeEventListener('resize', redraw);
  //   };
  // }, [height, width, points]);

  Chart.register(
    LineController,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
  );

  console.log('points', points);

  let labels = new Array<string>();
  let data = new Array<number>();

  for (const p of points) {
    labels.push(String(p.x));
    data.push(p.y);
  }

  let points2 = new Array<Point2>();

  for (const i in points) {
    let x = points[i].x;

    points2.push({
      x: DateTime.fromMillis(x).toISO(),
      y: points[i].y,
    });
  }

  console.log('points after', points2);

  useEffect(() => {
    let ctx = canvasRef.current?.getContext('2d');
    let chart: any;
    if (ctx) {
      chart = new Chart(ctx, {
        type: 'line',
        options: {
          animation: false,
          responsive: true,
          scales: {
            x: {
              ticks: {
                align: 'start',
                maxRotation: 0,
              },
            },
          },
          plugins: {
            tooltip: {
              enabled: true,
            },
          },
        },
        data: {
          // labels,
          datasets: [
            {
              data: points2,
            },
          ],
        },
      });
    }
  }, []);

  return (
    <StyledLineChart style={styleVars}>
      <canvas ref={canvasRef} width={width} height={height} />
    </StyledLineChart>
  );
};

type Point2 = {
  x: string;
  y: number;
};

interface props {
  width?: string | number;
  height?: string | number;
  points: Point[];
}

const StyledLineChart = styled.div`
  width: var(--chartWidth);
  height: var(--chartHeight);
  border: 1px solid #ddd;

  & > canvas {
    display: block;
    width: 100%;
    height: 300px;
  }
`;

export default LineChart;
