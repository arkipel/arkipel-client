import React, { FunctionComponent } from 'react';
import Media from 'react-media';
import styled from 'styled-components';

const Header: FunctionComponent<props> = ({
  background = '',
  onMenuOpen,
  onNotificationOpen,
}) => {
  const styleVars = {
    '--background': background,
  } as React.CSSProperties;

  return (
    <HeaderStyle style={styleVars}>
      <div>
        <Media
          query="(max-width: 699px)"
          render={() => (
            <Box onClick={onMenuOpen}>
              <img
                src="https://arkipel-icons.pages.dev/ui/menu.svg"
                alt="&#10092;"
              />
            </Box>
          )}
        />
      </div>
      <div>
        <h1>Arkipel</h1>
      </div>
      <div>
        <Media
          query="(max-width: 999px)"
          render={() => (
            <Box onClick={onNotificationOpen}>
              <img
                src="https://arkipel-icons.pages.dev/ui/notification.svg"
                alt="&#128276;"
              />
            </Box>
          )}
        />
      </div>
    </HeaderStyle>
  );
};

const HeaderStyle = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  grid-row: 1;
  grid-column: 1;
  height: 50px;
  background: #fff;
  justify-items: center;
  padding: 0 10px;
  border-bottom: 4px solid black;
  z-index: 110;

  div {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    align-items: center;
    height: 100%;
  }

  h1 {
    text-transform: uppercase;
  }

  /* Left side */
  & div:nth-child(1) {
    justify-content: flex-start;
  }

  /* Right side */
  & div:nth-child(2) {
    justify-content: flex-end;
  }

  /* TODO: Should the following be defined here? */
  img {
    height: 30px;
    // filter: invert(1);
  }

  @media all and (max-width: 999px) {
    padding-right: 0;
    border-radius: 0;
  }

  @media all and (max-width: 699px) {
    padding-left: 0;
  }
`;

type props = {
  onMenuOpen: () => void;
  onNotificationOpen: () => void;
  background?: string;
};

const Box: FunctionComponent<boxProps> = ({ style, onClick, children }) => {
  let cursor = '';
  if (onClick) {
    cursor = 'pointer';
  }

  const styleVars = {
    '--cursor': cursor,
    ...style,
  } as React.CSSProperties;

  return (
    <BoxStyle style={styleVars} onClick={onClick}>
      {children}
    </BoxStyle>
  );
};

const BoxStyle = styled.div`
  display: grid;
  align-content: center;
  padding: 0 10px;
  cursor: var(--cursor);
`;

type boxProps = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
};

export default Header;
