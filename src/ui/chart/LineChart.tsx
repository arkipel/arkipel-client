import React, { FunctionComponent, useRef } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

import { debounce } from 'lodash';

import draw from './draw';
import { Point } from '../../ui/chart/draw';

const LineChart: FunctionComponent<props> = ({ width, height, points }) => {
  if (!width) {
    width = '100%';
  }

  if (!height) {
    height = '100%';
  }

  let styleVars = {
    '--chartWidth': width,
    '--chartHeight': height,
  } as React.CSSProperties;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  let redraw = debounce(() => {
    let canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    canvas.width = canvas.width = canvas.clientWidth;
    canvas.height = canvas.height = canvas.clientHeight;

    draw(canvas, points);
  }, 200);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    redraw();

    window.addEventListener('resize', redraw);

    return () => {
      canvas.removeEventListener('resize', redraw);
    };
  }, [height, width, points]);

  return (
    <StyledLineChart style={styleVars}>
      <canvas ref={canvasRef} width={width} height={height} />
    </StyledLineChart>
  );
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
