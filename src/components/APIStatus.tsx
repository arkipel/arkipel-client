import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { useQuery, gql } from '@apollo/client';
import {
  GetAllConstructionSites,
  GetAllConstructionSitesVariables,
} from '../generated/GetAllConstructionSites';

const APIStatus: FunctionComponent = () => {
  const { loading, error } = useQuery<
    GetAllConstructionSites,
    GetAllConstructionSitesVariables
  >(
    gql`
      query GetAPIStatus {
        apiStatus {
          running
        }
      }
    `,
    { pollInterval: 60000 },
  );

  // Green
  let color = '#91bf9e';

  // Yellow
  if (loading) {
    color = '#d1cc88';
  }

  // Red
  if (error) {
    color = '#d68787';
  }

  return (
    <Style>
      <div style={{ background: color }}></div>
    </Style>
  );
};

const Style = styled.div`
  display: flex;
  justify-content: center;
  height: 50px;
  padding: 0 10px;

  div {
    height: 12px;
    width: 12px;
    border-radius: 100px;
  }
`;

export default APIStatus;
