import React, { FunctionComponent } from 'react';

const Scrollable: FunctionComponent<{ style?: React.CSSProperties }> = ({
  style,
  children,
}) => {
  style = {
    ...style,
    overflowX: 'hidden',
    overflowY: 'auto',
  };

  return <div style={style}>{children}</div>;
};

export default Scrollable;
