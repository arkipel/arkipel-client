import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { useQuery, gql } from '@apollo/client';
import {
  GetAllConstructionSitesQuery,
  GetAllConstructionSitesQueryVariables,
} from '../generated/graphql';

const APIStatus: FunctionComponent = () => {
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

  return <Styled style={{ background: color }}></Styled>;
};

const Styled = styled.div`
  min-height: 12px;
  width: 12px;
  border-radius: 100px;
`;

export default APIStatus;
