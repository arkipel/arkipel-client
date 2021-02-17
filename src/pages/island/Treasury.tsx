import React, { Fragment, useContext } from 'react';

import { useQuery, gql } from '@apollo/client';
import { GetBankLevels, GetBankLevelsVariables } from 'generated/GetBankLevels';
import { GetCurrencies } from 'generated/GetCurrencies';
import {
  GetBankAccounts,
  GetBankAccountsVariables,
} from 'generated/GetBankAccounts';

import { SessionContext } from '../../libs/session/session';

import { Error } from '../../ui/dialog/Msg';

import Currency from '../../models/Currency';
import BankAccount from '../../models/BankAccount';

import styles from './Treasury.scss';

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
      <h2>Currencies</h2>
      <Currencies />
    </Fragment>
  );
};

const BankAccounts = () => {
  const session = useContext(SessionContext);

  const { data, loading, error } = useQuery<
    GetBankAccounts,
    GetBankAccountsVariables
  >(
    gql`
      query GetBankAccounts($userId: String!) {
        bankAccounts(userId: $userId) {
          __typename
          ... on BankAccountList {
            bankAccounts {
              id
              amount
              currency {
                code
                name
              }
            }
          }
        }
      }
    `,
    { variables: { userId: session.id } },
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || data?.bankAccounts.__typename === 'NotAuthorized') {
    return <Error>Sorry, bank accounts could not be retrieved.</Error>;
  }

  let bankAccounts = new Array<BankAccount>();
  data?.bankAccounts.bankAccounts.forEach((bankAccount) => {
    bankAccounts.push(new BankAccount(bankAccount));
  });

  return (
    <Fragment>
      {bankAccounts.length === 0 && <p>There are no existing bank accounts.</p>}
      {bankAccounts.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {bankAccounts.map((ba) => {
              return (
                <tr key={ba.id}>
                  <td>{ba.currencyName}</td>
                  <td>
                    {ba.amountStr()} {ba.currencyCodeStr()}
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

const Currencies = () => {
  const { data, loading, error } = useQuery<GetCurrencies>(
    gql`
      query GetCurrencies {
        currencies {
          __typename
          ... on CurrencyList {
            currencies {
              id
              code
              name
            }
          }
        }
      }
    `,
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <Error>Sorry, currencies could not be retrieved.</Error>;
  }

  let currencies = new Array<Currency>();
  data?.currencies.currencies.forEach((currency) => {
    currencies.push(new Currency(currency));
  });

  return (
    <Fragment>
      {currencies.length === 0 && <p>There are no existing currencies.</p>}
      {currencies.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((c) => {
              return (
                <tr key={c.id}>
                  <td>{c.codeStr()}</td>
                  <td>{c.name}</td>
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
