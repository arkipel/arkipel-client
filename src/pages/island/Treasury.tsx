import React, { Fragment, useContext } from 'react';

import { BankAccountsContext } from '../../libs/session/bank_accounts';

import { FormatMoney } from '../../ui/text/format';

const TreasuryPage = () => {
  return (
    <Fragment>
      <h1>Treasury</h1>
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
