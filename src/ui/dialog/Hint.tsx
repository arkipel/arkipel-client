import React, { FunctionComponent } from 'react';

const HintInfo: FunctionComponent<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return <span style={{ ...style, color: '#aaa' }}>{children}</span>;
};

const HintSuccess: FunctionComponent<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return <span style={{ ...style, color: '#080' }}>{children}</span>;
};

const HintError: FunctionComponent<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return <span style={{ ...style, color: '#a00' }}>{children}</span>;
};

const style = {
  fontSize: '14px',
};

export { HintInfo, HintSuccess, HintError };
