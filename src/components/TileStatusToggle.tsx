import React, { FunctionComponent, useContext } from 'react';
import styled from 'styled-components';

import { gql, useMutation, useApolloClient, useQuery } from '@apollo/client';
import {
  GetTileStatusQuery,
  GetTileStatusQueryVariables,
  SetInfrastructureDesiredStatusMutation,
  SetInfrastructureDesiredStatusMutationVariables,
  InfrastructureStatus,
} from '../generated/graphql';

import { SessionContext } from '../libs/session/session';

const TileStatusToggle: FunctionComponent<props> = ({ islandId, position }) => {
  if (islandId === '') {
    return (
      <div>
        <img
          src="https://icons.arkipel.io/ui/question.svg"
          height={'100%'}
          width={'100%'}
        />
      </div>
    );
  }

  const session = useContext(SessionContext);
  const client = useApolloClient();

  const { data } = useQuery<GetTileStatusQuery, GetTileStatusQueryVariables>(
    gql`
      query GetTileStatus($islandId: String!, $position: Int!) {
        tile(islandId: $islandId, position: $position) {
          ... on Tile {
            id
            desiredStatus
          }
        }
      }
    `,
    { variables: { islandId, position }, fetchPolicy: 'cache-first' },
  );

  let desiredStatus: InfrastructureStatus;
  if (data?.tile.__typename === 'Tile') {
    desiredStatus = data.tile.desiredStatus;
  } else {
    desiredStatus = InfrastructureStatus.Off;
  }

  const [setDesiredStatus] = useMutation<
    SetInfrastructureDesiredStatusMutation,
    SetInfrastructureDesiredStatusMutationVariables
  >(
    gql`
      mutation SetInfrastructureDesiredStatus(
        $islandId: String!
        $position: Int!
        $status: InfrastructureStatus!
      ) {
        setInfrastructureDesiredStatus(
          islandId: $islandId
          position: $position
          status: $status
        ) {
          ... on Tile {
            id
            desiredStatus
            currentStatus
            population
            material
            energy
            island {
              id
              inventory {
                id
                populationUsed
                populationFree
                populationTotal
                energyUsed
                energyFree
                energyTotal
                materialProduction
                timestamp
              }
              tiles {
                id
                currentStatus
              }
            }
          }
        }
      }
    `,
    {
      variables: {
        islandId,
        position,
        status: InfrastructureStatus.On,
      },
      onCompleted: () => {
        client.cache.evict({
          id: 'Island:' + session.id,
          fieldName: 'constructionSites',
        });
      },
    },
  );

  return (
    <Style>
      {desiredStatus === InfrastructureStatus.On && (
        <img
          src="https://icons.arkipel.io/ui/pause.svg"
          height={'100%'}
          width={'100%'}
          onClick={() => {
            setDesiredStatus({
              variables: {
                islandId: session.id,
                position: position,
                status: InfrastructureStatus.Off,
              },
            });
          }}
        />
      )}
      {desiredStatus === InfrastructureStatus.Off && (
        <img
          src="https://icons.arkipel.io/ui/play.svg"
          onClick={() => {
            setDesiredStatus({
              variables: {
                islandId: session.id,
                position: position,
                status: InfrastructureStatus.On,
              },
            });
          }}
        />
      )}
    </Style>
  );
};

const Style = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;

  img {
    display: block;
  }
`;

class props {
  islandId: string = '';
  position: number = 0;
}

export default TileStatusToggle;
