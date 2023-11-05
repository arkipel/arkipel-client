import React, { Fragment, useContext } from 'react';
import styled from 'styled-components';

import { InventoryContext } from '../../libs/session/inventory';

import { FormatNumber } from '../../ui/text/format';

const ResourcesPage = () => {
  const inventory = useContext(InventoryContext);

  return (
    <Fragment>
      <h1>Inventory</h1>
      <h2>Resources</h2>
      <Style>
        <StatStyle>
          <div>
            <h3>Population</h3>
            <span>
              {inventory.populationUsed}/{inventory.populationTotal}
            </span>
          </div>
          <div>
            <p>Citizens live in houses or apartments and work on the island.</p>
          </div>
        </StatStyle>
        <StatStyle>
          <div>
            <h3>Builders</h3>
            <span>{inventory.populationFree}</span>
          </div>
          <div>
            <p>
              Builders are citizens without a job and spend their time building
              new tiles. Having more of them means that new tiles get built more
              quickly.
            </p>
          </div>
        </StatStyle>
        <StatStyle>
          <div>
            <h3>Energy</h3>
            <span>
              {inventory.energyUsed}/{inventory.energyTotal}
            </span>
          </div>
          <div>
            <p>Energy is produced and consumed by tiles on the island.</p>
          </div>
        </StatStyle>
        <StatStyle>
          <div>
            <h3>Material production</h3>
            <span>{inventory.materialProduction}/s</span>
          </div>
          <div>
            <p>
              The rate at which the island produces and accumulates resources.
            </p>
          </div>
        </StatStyle>
        <StatStyle>
          <div>
            <h3>Material</h3>
            <span>{FormatNumber(inventory.material)}</span>
          </div>
          <div>
            <p>
              Material is used to build new infrastructure on empty tiles or
              upgrade current infrastructure.
            </p>
          </div>
        </StatStyle>
        <StatStyle>
          <div>
            <h3>Food production</h3>
            <span>{inventory.foodProduction}/s</span>
          </div>
          <div>
            <p>The rate at which the island produces food.</p>
          </div>
        </StatStyle>
        <StatStyle>
          <div>
            <h3>Food</h3>
            <span>{FormatNumber(inventory.food)}</span>
          </div>
          <div>
            <p>
              Food is used to feed citizens. Every hour, 10% of the food stock
              goes bad and is thrown away. It currently has no impact in the
              game.
            </p>
          </div>
        </StatStyle>
        <StatStyle>
          <div>
            <h3>Frozen food production</h3>
            <span>{inventory.frozenFoodProduction}/s</span>
          </div>
          <div>
            <p>The rate at which the island freezes food.</p>
          </div>
        </StatStyle>
        <StatStyle>
          <div>
            <h3>Food</h3>
            <span>{FormatNumber(inventory.frozenFood)}</span>
          </div>
          <div>
            <p>
              Frozen food is food that does not rot, but requires a warehouse
              and energy to remain frozen. It currently has no impact in the
              game.
            </p>
          </div>
        </StatStyle>
        <StatStyle>
          <div>
            <h3>Frozen food storage</h3>
            <span>{FormatNumber(inventory.frozenFoodStorage)}</span>
          </div>
          <div>
            <p>
              The maximum amount of frozen food that can be stored in the
              warehouses.
            </p>
          </div>
        </StatStyle>
      </Style>
      <h2>Infrastructure</h2>
      <Style>
        <StatStyle>
          <div>
            <h3>Banking</h3>
            <span>{inventory.bankLevels}</span>
          </div>
          <div>
            <p>
              More banking infrastructure gives the island more powerful tools
              to trade with the rest of the archipelago.
            </p>
          </div>
        </StatStyle>
      </Style>
    </Fragment>
  );
};

const Style = styled.div`
  display: grid;
  gap: 10px;
`;

const StatStyle = styled.div`
  div:nth-child(1) {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-weight: bold;
    }
  }

  div:nth-child(2) {
    p {
      font-style: italic;
      font-size: 16px;
    }
  }
`;

export default ResourcesPage;
