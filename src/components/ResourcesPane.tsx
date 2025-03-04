import React, { FunctionComponent, useContext } from 'react';
import styled from 'styled-components';

import { InventoryContext } from '../libs/session/inventory';
import { BankAccountsContext } from '../libs/session/bank_accounts';

const ResourcesPane: FunctionComponent = () => {
  const inventory = useContext(InventoryContext);
  const bankAccounts = useContext(BankAccountsContext);

  bankAccounts.sort((a, b) => {
    return b.amount - a.amount;
  });

  return (
    <StyledResourcesPane>
      <div>
        <img src="https://arkipel-icons.pages.dev/res2/housing.svg" />
        <span>{inventory.populationTotal}</span>
      </div>
      <div>
        <img src="https://arkipel-icons.pages.dev/res2/population.svg" />
        <span>{inventory.populationFree}</span>
      </div>
      <div>
        <img src="https://arkipel-icons.pages.dev/res2/energy.svg" />
        <span style={{ paddingLeft: 0 }}>{inventory.energyFree}</span>
      </div>
      <div>
        <img src="https://arkipel-icons.pages.dev/res2/food.svg" />
        <span>{inventory.foodFormatted}</span>
      </div>
      <div>
        <img src="https://arkipel-icons.pages.dev/res2/frozen_food.svg" />
        <span>{inventory.frozenFoodFormatted}</span>
      </div>
      <div>
        <img src="https://arkipel-icons.pages.dev/res2/material.svg" />
        <span>{inventory.materialFormatted}</span>
      </div>
    </StyledResourcesPane>
  );
};

const StyledResourcesPane = styled.div`
  display: grid;
  grid-template-columns: calc(100% / 3) calc(100% / 3) calc(100% / 3);
  grid-template-rows: 1fr 1fr;
  gap: 10px;

  div {
    display: grid;
    grid-template-columns: 20px 1fr;
    align-items: center;
    gap: 4px;
    width: calc(100% / 3 - (20px / 3));
  }

  img {
    height: 20px;
    width: 20px;
  }
`;

export default ResourcesPane;
