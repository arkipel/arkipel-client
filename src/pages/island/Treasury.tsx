import React, { Fragment, useContext } from 'react';

import { useQuery, gql } from '@apollo/client';
import {
  GetBankLevelsQuery,
  GetBankLevelsQueryVariables,
} from 'generated/graphql';

import { SessionContext } from '../../libs/session/session';
import { BankAccountsContext } from '../../libs/session/bank_accounts';

import { Error } from '../../ui/dialog/Msg';
import { FormatMoney } from '../../ui/text/format';

const TreasuryPage = () => {
  const session = useContext(SessionContext);

  let islandId = session.id;

  const { data, loading, error } = useQuery<
    GetBankLevelsQuery,
    GetBankLevelsQueryVariables
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || data?.inventory.__typename !== 'Inventory') {
    return <Error>Sorry, an error occurred.</Error>;
  }

  let bankLevels = 0;
  if (data?.inventory.__typename === 'Inventory') {
    bankLevels = data.inventory.bankLevels;
  }

  return (
    <Fragment>
      <h1>Treasury</h1>
      <p>All of your banks total {bankLevels} levels together.</p>
      <h2>Bank accounts</h2>
      <BankAccounts />
    </Fragment>
  );
};

const BankAccounts = () => {
  const bankAccounts = useContext(BankAccountsContext);

  return (
    <Fragment>
      {bankAccounts.length === 0 && <p>There are no existing bank accounts.</p>}
      {bankAccounts.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Code</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {bankAccounts.map((ba) => {
              if (ba.currencyCode !== 'ark') {
                return;
              }

              return (
                <tr key={ba.id}>
                  <td>{ba.currencyName}</td>
                  <td>{ba.currencyCodeStr()}</td>
                  <td>
                    {FormatMoney(ba.amount)} {ba.currencyCodeStr()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </Fragment>
  );
};

export default TreasuryPage;
