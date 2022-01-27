import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const Shadow: FunctionComponent<props> = ({ visible, onClick = () => {} }) => {
  let background = '';
  let pointerEvents = 'none';
  if (visible) {
    background = 'rgba(0, 0, 0, 0.8)';
    pointerEvents = 'all';
  }

  const styleVars = {
    '--background': background,
    '--pointerEvents': pointerEvents,
  } as React.CSSProperties;

  return <Style style={styleVars} onClick={onClick} />;
};

class props {
  visible?: boolean = true;
  onClick?: () => void;
}

const Style = styled.div`
  grid-column: 1 / span 3;
  grid-row: 1;
  min-height: 0;
  width: 100%;
  transition: background-color 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  background: var(--background);
  pointer-events: var(--pointerEvents);
  z-index: 80;

  // In medium size mode, we want the shadow to be below the
  // notification pane and above the menu pane.
  @media all and (min-width: 700px) and (max-width: 999px) {
    grid-column: 1 / span 2;
    z-index: 110;
  }
`;

export default Shadow;
