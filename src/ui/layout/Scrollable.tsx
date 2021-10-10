import React, { FunctionComponent } from 'react';

const Scrollable: FunctionComponent = ({ children }) => {
  return (
    <div
      style={{
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
    >
      {children}
    </div>
  );
};

export default Scrollable;
