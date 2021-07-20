import React, { FunctionComponent, useRef } from 'react';

import styled from 'styled-components';

const LineChart: FunctionComponent<props> = ({ height, width }) => {
  if (!height) {
    height = '100%';
  }

  if (!width) {
    width = '100%';
  }

  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <StyledLineChart>
      <canvas ref={canvasRef} height={height} width={width} />
    </StyledLineChart>
  );
};

interface props {
  height?: string | number;
  width?: string | number;
}

const StyledLineChart = styled.div`
  border: 1px solid black;
`;

export default LineChart;
