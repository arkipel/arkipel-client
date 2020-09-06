import React, { Fragment, useContext } from 'react';

import { useQuery, gql } from '@apollo/client';
import { GetBankLevels, GetBankLevelsVariables } from 'generated/GetBankLevels';

import { SessionContext } from '../../libs/session/session';

import { Error } from '../../ui/dialog/Msg';

// import styles from './Treasury.scss';

const TreasuryPage = () => {
  const session = useContext(SessionContext);

  let islandId = session.id;

  const { data, loading, error } = useQuery<
    GetBankLevels,
    GetBankLevelsVariables
  >(
    gql`
      query GetBankLevels($userId: String!, $islandId: String!) {
        inventory(userId: $userId, islandId: $islandId) {
          __typename
          ... on Inventory {
            id
            bankLevels
          }
        }
      }
    `,
    { variables: { userId: session.id, islandId } },
  );

  if (data?.inventory.__typename === 'NotFound') {
    return <Error>Sorry, this treasury does not exist.</Error>;
  }

  if (error || data?.inventory.__typename === 'NotAuthorized') {
    return <Error>Sorry, an error occurred.</Error>;
  }

  let bankLevels = 0;
  if (data?.inventory.__typename === 'Inventory') {
    bankLevels = data.inventory.bankLevels;
  }

  let canHaveAccounts = bankLevels >= 1;
  let canManageCurrencies = bankLevels >= 10;

  return (
    <Fragment>
      <h1>Treasury</h1>
      {loading && <p>Loading...</p>}
      <h2>Accounts</h2>
      {!canHaveAccounts && (
        <p>You need at least one bank to manage your treasury.</p>
      )}
      {canHaveAccounts && <p>You have no bank accounts.</p>}
      <h2>Currencies</h2>
      {!canManageCurrencies && (
        <p>
          All of your banks must have a cummulative number of levels of at least
          10 to manage currencies.
        </p>
      )}
    </Fragment>
  );
};

export default TreasuryPage;
