import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { useQuery, gql } from '@apollo/client';
import {
  GetAllConstructionSitesQuery,
  GetAllConstructionSitesQueryVariables,
} from '../generated/graphql';

const APIStatus: FunctionComponent<props> = ({ onStatusChange = () => {} }) => {
  const { loading, error } = useQuery<
    GetAllConstructionSitesQuery,
    GetAllConstructionSitesQueryVariables
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

  let color = '#d1cc88';

  if (loading) {
    // Yellow
    onStatusChange('loading');
  } else if (error) {
    // Red
    color = '#d68787';
    onStatusChange('down');
  } else {
    // Green
    color = '#91bf9e';
    onStatusChange('up');
  }

  return <Styled style={{ background: color }}></Styled>;
};

type props = {
  onStatusChange: (status: 'up' | 'loading' | 'down') => void;
};

const Styled = styled.div`
  height: 12px;
  width: 12px;
  border-radius: 100px;
`;

export type APIStatusType = 'up' | 'loading' | 'down';

export default APIStatus;
