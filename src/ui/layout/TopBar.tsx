import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const TopBar: FunctionComponent<topBarProps> = ({
  background = '',
  children,
}) => {
  const styleVars = {
    '--background': background,
  } as React.CSSProperties;

  return <TopBarStyle style={styleVars}>{children}</TopBarStyle>;
};

const TopBarStyle = styled.div`
  display: grid;
  height: 50px;
  background: var(--background, rgba(24, 19, 19, 0.06));
  /* background: #1d1f26; */
  grid-template-columns: 1fr 1fr;

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
  }
`;

type topBarProps = {
  background?: string;
};

const Box: FunctionComponent<boxProps> = ({ onClick, children }) => {
  let cursor = '';
  if (onClick) {
    cursor = 'pointer';
  }

  const styleVars = {
    '--cursor': cursor,
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
  /* padding: 10px; */
  border: 1px solid red;
  cursor: var(--cursor);
`;

type boxProps = {
  onClick?: () => void;
};

export { TopBar, Box };
