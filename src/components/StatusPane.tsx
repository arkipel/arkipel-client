import React, { FunctionComponent, useContext, useState } from 'react';
import APIStatus, { APIStatusType } from './APIStatus';
import styled from 'styled-components';

import { SessionContext } from '../libs/session/session';

const StatusPane: FunctionComponent = () => {
  const session = useContext(SessionContext);

  const [apiStatus, setApiStatus] = useState<APIStatusType>('loading');

  const loggedIn = session.id !== '';

  let color = '#d1cc88';
  let status = 'Checking...';

  switch (apiStatus) {
    case 'loading':
      color = '#d1cc88';
      status = 'Checking...';
      break;
    case 'up':
      color = '#91bf9e';
      status = 'Up';
      break;
    case 'down':
      color = '#d68787';
      status = 'Down';
      break;
  }

  return (
    <StyledStatusPane>
      {loggedIn && (
        <>
          <span style={{ color: '#666' }}>Logged in</span>
          <span style={{ color: '#666' }}>master</span>
        </>
      )}
      {!loggedIn && (
        <>
          <span></span>
          <span style={{ color: '#666' }}>Not logged in</span>
        </>
      )}
      <APIStatus onStatusChange={(status) => setApiStatus(status)} />
      <span style={{ color }}>{status}</span>
    </StyledStatusPane>
  );
};

const StyledStatusPane = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: auto 1fr;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: right;
  font-size: 12px;

  img {
    height: 20px;
    width: 20px;
  }
`;

export default StatusPane;
