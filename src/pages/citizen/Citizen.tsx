import React, { Fragment } from 'react';
import { useParams } from 'react-router';

import { useQuery, gql } from '@apollo/client';
import { GetCitizenQuery, GetCitizenQueryVariables } from 'generated/graphql';

import { Error } from '../../ui/dialog/Msg';
import { DateTime } from 'luxon';

const CitizenPage = () => {
  let { citizenId } = useParams<{ citizenId: string }>();

  const { data, loading, error } = useQuery<
    GetCitizenQuery,
    GetCitizenQueryVariables
  >(
    gql`
      query GetCitizen($input: CitizenInput!) {
        citizen(input: $input) {
          __typename
          ... on Citizen {
            id
            name
            createdAt
            stomach
          }
        }
      }
    `,
    { variables: { input: { citizenId: citizenId || '' } } },
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || data?.citizen.__typename !== 'Citizen') {
    return <Error>Sorry, an error occurred.</Error>;
  }

  let citizen = data.citizen;

  return (
    <Fragment>
      <h1>Citizen</h1>
      <p>
        <b>Name:</b> {citizen.name}
        <br />
        <b>Arrived:</b> {DateTime.fromISO(citizen.createdAt).toRelative()}
        <br />
        <b>Energy:</b> 100%
        <br />
        <b>Food:</b> {((data.citizen.stomach / 720) * 100).toFixed(0)}%
        <br />
        <b>Happiness:</b> 100%
      </p>
    </Fragment>
  );
};

export default CitizenPage;
