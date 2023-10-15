import React, { FunctionComponent, useContext } from 'react';
import Media from 'react-media';
import styled from 'styled-components';
import { SessionContext } from '../libs/session/session';
import APIStatus from './APIStatus';

const Header: FunctionComponent<props> = ({
  background = '',
  onMenuOpen,
  onNotificationOpen,
}) => {
  const session = useContext(SessionContext);

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
              <img src="https://icons.arkipel.io/ui/menu.svg" alt="&#10092;" />
            </Box>
          )}
        />
        <Box>{session.loggedIn && <span>{session.username}</span>}</Box>
      </div>
      <div>
        <Box>
          <APIStatus />
        </Box>
        <Media
          query="(max-width: 999px)"
          render={() => (
            <Box onClick={onNotificationOpen}>
              <img
                src="https://icons.arkipel.io/ui/notification.svg"
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
  grid-template-columns: 1fr 1fr;
  grid-row: 1;
  grid-column: 1;
  height: 50px;
  border-radius: 0 0 4px 4px;
  background: #423d39;
  padding: 0 10px;
  color: #fff;
  z-index: 110;

  div {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    align-items: center;
    height: 100%;
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
    filter: invert(1);
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
