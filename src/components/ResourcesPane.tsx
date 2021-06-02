import React, { FunctionComponent, useContext } from 'react';
import styled from 'styled-components';

import { InventoryContext } from '../libs/session/inventory';
import { BankAccountsContext } from '../libs/session/bank_accounts';

// Assets

const ResourcesPane: FunctionComponent = () => {
  const inventory = useContext(InventoryContext);
  const bankAccounts = useContext(BankAccountsContext);

  bankAccounts.sort((a, b) => {
    return b.amount - a.amount;
  });

  return (
    <Style>
      <div>
        <img src="https://icons.arkipel.io/res/population.svg" />
        <span>{inventory.populationFree}</span>
      </div>
      <div>
        <img src="https://icons.arkipel.io/res/energy.svg" />
        <span style={{ paddingLeft: 0 }}>{inventory.energyFree}</span>
      </div>
      <div>
        <img src="https://icons.arkipel.io/res/material.svg" />
        <span>{inventory.materialFormatted}</span>
      </div>
      <div>
        {bankAccounts.map((ba) => {
          return (
            <span key={ba.id}>
              {ba.amountStr()} {ba.currencyCodeStr()}
            </span>
          );
        })}
      </div>
    </Style>
  );
};

const Style = styled.div`
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
