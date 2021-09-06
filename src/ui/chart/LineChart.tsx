import React, { FunctionComponent, useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

import { debounce } from 'lodash';

import draw from './draw';
import { Point } from '../../ui/chart/draw';

let calls = 0;

const LineChart: FunctionComponent<props> = ({ height, width, points }) => {
  let [canvasWidth, setCanvasWidth] = useState(width);
  let [canvasHeight, setCanvasHeight] = useState(height);
  const [scale, setScale] = React.useState({ x: 1, y: 1 });

  console.log('LINECHART');

  if (!width) {
    width = '100%';
  }
  // else if (typeof width == 'number' && width > 20) {
  //   console.log('width is a number:', width);
  //   width -= 2;
  // }

  if (!height) {
    height = '100%';
  }
  //  else if (typeof height == 'number' && height > 20) {
  //   console.log('height is a number:', height);
  //   height -= 2;
  // }

  let styleVars = {
    '--chartWidth': width,
    '--chartHeight': height,
  } as React.CSSProperties;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // const calculateScaleX = () =>
  //   !canvasRef.current ? 0 : canvasRef.current.clientWidth / 100;
  // const calculateScaleY = () =>
  //   !canvasRef.current ? 0 : canvasRef.current.clientHeight / 300;

  let redraw = debounce(() => {
    let canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    canvas.width = canvas.width = canvas.clientWidth;
    canvas.height = canvas.height = canvas.clientHeight;

    console.log('redraw!');

    draw(canvas, points);

    calls++;

    console.log(`the function was called ${calls} times`);

    // canvas.width = canvas.clientWidth;
    // canvas.height = canvas.clientHeight;
    // setScale({ x: calculateScaleX(), y: calculateScaleY() });
  }, 600);

  useEffect(() => {
    const currentCanvas = canvasRef.current;

    if (!currentCanvas) {
      return;
    }

    draw(currentCanvas, points);

    window.addEventListener('resize', redraw);

    return () => currentCanvas.removeEventListener('resize', redraw);
  });

  // useEffect(() => {
  //   const currentCanvas = canvasRef.current;

  //   if (!currentCanvas) {
  //     return;
  //   }

  //   draw(currentCanvas);
  // }, [scale]);

  // let canvasResizeObsvr: ResizeObserver;

  // let resizeFunc = debounce(
  //   () => {
  //     let newWidth = canvasRef.current?.parentElement?.clientWidth || 100;
  //     // let newHeight = canvasRef.current?.clientHeight || 0;

  //     // console.log(
  //     //   'canvasRef.current?.parentElement:',
  //     //   canvasRef.current?.parentElement,
  //     // );

  //     console.log(
  //       'canvasRef.current?.parentElement.clientWidth:',
  //       canvasRef.current?.parentElement?.clientWidth,
  //     );

  //     console.log('width:', canvasWidth);
  //     console.log('newWidth:', newWidth);
  //     // console.log('height:', canvasHeight);
  //     // console.log('newHeight:', newWidth);

  //     if (newWidth !== canvasWidth) {
  //       setCanvasWidth(newWidth);
  //     }

  //     calls++;

  //     console.log(`the function was called ${calls} times`);

  //     // if (newHeight !== canvasHeight) {
  //     //   setCanvasHeight(newHeight);
  //     // }
  //   },
  //   1000,
  //   // { leading: true },
  // );

  // useEffect(() => {
  //   if (canvasResizeObsvr) {
  //     canvasResizeObsvr.disconnect();
  //   }

  //   if (canvasRef.current) {
  //     //   console.log('about to register and observe');

  //     canvasResizeObsvr = new ResizeObserver(resizeFunc);

  //     canvasResizeObsvr.observe(canvasRef.current);

  //     draw(canvasRef.current);
  //   }
  // });

  return (
    <StyledLineChart style={styleVars}>
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
    </StyledLineChart>
  );
};

interface props {
  height?: string | number;
  width?: string | number;
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
    /* border: 2px solid red; */
  }
`;

export default LineChart;
