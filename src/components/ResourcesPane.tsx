import React, { FunctionComponent, useContext } from 'react';
import styled from 'styled-components';

import { InventoryContext } from '../libs/session/inventory';
import { BankAccountsContext } from '../libs/session/bank_accounts';

// Assets
import styles from './NotificationPane.scss';

const ResourcesPane: FunctionComponent = () => {
  const inventory = useContext(InventoryContext);
  const bankAccounts = useContext(BankAccountsContext);

  console.log('bankaccounts', bankAccounts);
  bankAccounts.sort((a, b) => {
    return b.amount - a.amount;
  });

  return (
    <Wrapper>
      <div>
        <img
          className={styles.miniIcon}
          src="https://icons.arkipel.io/res/population.svg"
        />
        <span>{inventory.populationFree}</span>
      </div>
      <div>
        <img
          className={styles.miniIcon}
          src="https://icons.arkipel.io/res/energy.svg"
        />
        <span style={{ paddingLeft: 0 }}>{inventory.energyFree}</span>
      </div>
      <div>
        <img
          className={styles.miniIcon}
          src="https://icons.arkipel.io/res/material.svg"
        />
        <span>{inventory.materialFormatted}</span>
      </div>
      <div>
        {bankAccounts.map((ba) => {
          return (
            <span>
              {ba.amountStr()} {ba.currencyCodeStr()}
            </span>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #ddd;

  div {
    display: flex;
    align-items: center;
    gap: 4px;
    width: calc(100% / 3 - (20px / 3));
    // padding: 4px;
    // border: 1px solid red;
  }

  & > div:last-child {
    display: flex;
    flex-direction: column;
    width: 100%;

    span {
      width: 100%;
      text-align: right;
    }
  }

  img {
    height: 20px;
    width: 20px;
  }
`;

export default ResourcesPane;
