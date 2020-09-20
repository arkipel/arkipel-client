import React, { FunctionComponent } from 'react';

const Scrollable: FunctionComponent = ({ children }) => {
  return <div style={{ overflow: 'auto' }}>{children}</div>;
};

export default Scrollable;
