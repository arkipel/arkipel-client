import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const Info: FunctionComponent<props> = ({
  children,
  visible = true,
  onConfirmation,
}) => {
  return (
    <Msg kind="info" visible={visible} onConfirmation={onConfirmation}>
      {children}
    </Msg>
  );
};

const Success: FunctionComponent<props> = ({
  children,
  visible = true,
  onConfirmation,
}) => {
  return (
    <Msg kind="success" visible={visible} onConfirmation={onConfirmation}>
      {children}
    </Msg>
  );
};

const Error: FunctionComponent<props> = ({
  children,
  visible = true,
  onConfirmation,
}) => {
  return (
    <Msg kind="error" visible={visible} onConfirmation={onConfirmation}>
      {children}
    </Msg>
  );
};

const Msg: FunctionComponent<props> = ({
  children,
  kind,
  visible = true,
  onConfirmation,
}) => {
  if (!visible) {
    return <></>;
  }

  let OK = <></>;
  if (onConfirmation) {
    OK = <a onClick={onConfirmation}>OK</a>;
  }

  let color = '#000';
  switch (kind) {
    case 'info':
      color = '#222';
      break;
    case 'success':
      color = '#080';
      break;
    case 'error':
      color = '#a00';
      break;
    default:
      break;
  }

  const styleVars = {
    '--color': color,
  } as React.CSSProperties;

  return (
    <Style style={styleVars}>
      <>
        {children}
        {OK}
      </>
    </Style>
  );
};

class props {
  kind?: 'info' | 'success' | 'error' = 'info';
  visible?: boolean = true;
  onConfirmation?: () => void;
}

const Style = styled.p`
  color: var(--color);

  a {
    margin-left: 4px;
  }
`;

export { Info, Success, Error };
