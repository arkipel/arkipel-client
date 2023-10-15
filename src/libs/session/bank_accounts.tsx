import React, {
  FunctionComponent,
  useState,
  useContext,
  useEffect,
} from 'react';

import { useQuery, gql } from '@apollo/client';
import {
  GetBankAccountsQuery,
  GetBankAccountsQueryVariables,
} from '../../generated/graphql';

import { SessionContext } from './session';

const BankAccountsProvider: FunctionComponent = ({ children }) => {
  const [bankAccounts, setBankAccounts] = useState(new Array<BankAccount>());

  const session = useContext(SessionContext);

  const { data } = useQuery<
    GetBankAccountsQuery,
    GetBankAccountsQueryVariables
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
                id
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

  useEffect(() => {
    const tempList = new Array<BankAccount>();
    if (data?.bankAccounts.__typename === 'BankAccountList') {
      for (const bankAccount of data.bankAccounts.bankAccounts) {
        tempList.push(new BankAccount(bankAccount));
      }

      setBankAccounts(tempList);
    }
  }, [data]);

  let value = bankAccounts;

  if (session.id === '') {
    value = new Array<BankAccount>();
  }

  return (
    <BankAccountsContext.Provider value={value}>
      {children}
    </BankAccountsContext.Provider>
  );
};

const BankAccountsContext = React.createContext<Array<BankAccount>>(
  new Array<BankAccount>(),
);

class BankAccount {
  constructor(obj: any) {
    this.id = obj?.id || '';
    this.currencyId = obj?.currency.id || '';
    this.currencyCode = obj?.currency.code || '';
    this.currencyName = obj?.currency.name || '';
    this.owner = obj?.owner || '';
    this.amount = obj?.amount || 0;
  }

  id: string;
  currencyId: string;
  currencyCode: string;
  currencyName: string;
  owner: string;
  amount: number;

  currencyCodeStr(): string {
    return this.currencyCode.toUpperCase();
  }

  amountStr(): string {
    return this.amount.toLocaleString('en', {});
  }
}

export { BankAccount, BankAccountsContext, BankAccountsProvider };
