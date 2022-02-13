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
  display: none;
  grid-column: 1;
  grid-row: 1 / span 2;
  min-height: 0;
  width: 100%;
  background: var(--background);
  pointer-events: var(--pointerEvents);

  // In medium size mode, we want the shadow to be below the
  // notification pane and above the menu pane.
  @media all and (min-width: 700px) and (max-width: 999px) {
    grid-column: 1;
    display: block;
    margin-bottom: -10px;
    z-index: 110;
  }

  @media all and (max-width: 699px) {
    display: block;
    z-index: 110;
  }
`;

export default Shadow;
