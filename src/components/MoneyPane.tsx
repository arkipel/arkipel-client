import React, { FunctionComponent, useContext } from 'react';
import styled from 'styled-components';

import { BankAccountsContext } from '../libs/session/bank_accounts';

import { FormatMoney } from '../ui/text/format';

const MoneyPane: FunctionComponent = () => {
  const bankAccounts = useContext(BankAccountsContext);

  bankAccounts.sort((a, b) => {
    return b.amount - a.amount;
  });

  let amount = 0;

  bankAccounts.forEach((ba) => {
    if (ba.currencyId === 'ark') {
      amount = ba.amount;
    }
  });

  return (
    <StyledMoneyPane>
      <div>
        <span>{FormatMoney(amount)} ARK</span>
      </div>
    </StyledMoneyPane>
  );
};

const StyledMoneyPane = styled.div`
  width: 100%;
  text-align: right;

  img {
    height: 20px;
    width: 20px;
  }
`;

export default MoneyPane;
