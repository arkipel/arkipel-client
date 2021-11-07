import React, { FunctionComponent, useRef } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

import {
  Chart,
  LineController,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  TimeSeriesScale,
} from 'chart.js';
import 'chartjs-adapter-luxon';

const LineChart: FunctionComponent<props> = ({ points }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  Chart.register(
    LineController,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    TimeSeriesScale,
  );

  useEffect(() => {
    let chart: Chart;
    let ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      chart = new Chart(ctx, {
        type: 'line',
        options: {
          maintainAspectRatio: false,
          animation: false,
          responsive: true,
          interaction: {
            intersect: false,
            mode: 'index',
          },
          elements: {
            line: {
              borderColor: '#289486',
              borderWidth: 2,
            },
            point: {
              radius: 0,
            },
          },
          scales: {
            x: {
              type: 'timeseries',
              time: {
                tooltipFormat: 'yyyy-LL-dd HH:mm:ss',
                displayFormats: {
                  second: 'HH:mm:ss',
                  minute: 'HH:mm',
                  hour: 'HH:mm',
                  day: 'LL-dd',
                  month: 'yy-LL-dd',
                },
              },
              ticks: {
                align: 'start',
                padding: 0,
                labelOffset: 2,
                minRotation: 0,
                maxRotation: 0,
                autoSkip: true,
                // The following property seems
                // valid, but TS does not think so.
                // @ts-ignore
                maxTicksLimit: 5,
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
          datasets: [
            {
              data: points,
            },
          ],
        },
      });
    }

    return () => {
      chart.destroy();
    };
  }, [points]);

  return (
    <StyledLineChart style={{ overflow: 'hidden' }}>
      <canvas ref={canvasRef} />
    </StyledLineChart>
  );
};

interface props {
  points: { x: number; y: number }[];
}

const StyledLineChart = styled.div`
  width: var(--chartWidth);
  height: var(--chartHeight);

  & > canvas {
    display: block;
    width: 100%;
    height: 300px;
  }
`;

export default LineChart;
