import React, { Fragment, useContext } from 'react';
import styled from 'styled-components';

import { InventoryContext } from '../../libs/session/inventory';

import { FormatQuantity } from '../../ui/text/format';

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
            <p>Citizens live in houses or apartments and work on the island.</p>
          </div>
          <div>
            {inventory.populationUsed}/{inventory.populationTotal}
          </div>
        </StatStyle>
        <StatStyle>
          <div>
            <h3>Builders</h3>
            <p>
              Builders are citizens without a job and spend their time building
              new tiles. Having more of them means that new tiles get built more
              quickly.
            </p>
          </div>
          <div>{inventory.populationFree}</div>
        </StatStyle>
        <StatStyle>
          <div>
            <h3>Energy</h3>
            <p>Energy is produced and consumed by tiles on the island.</p>
          </div>
          <div>
            {inventory.energyUsed}/{inventory.energyTotal}
          </div>
        </StatStyle>
        <StatStyle>
          <div>
            <h3>Material production</h3>
            <p>
              The rate at which the island produces and accumulates resources.
            </p>
          </div>
          <div>{inventory.materialProduction}/s</div>
        </StatStyle>
        <StatStyle>
          <div>
            <h3>Material</h3>
            <p>
              Material is used to build new infrastructure on empty tiles or
              upgrade current infrastructure.
            </p>
          </div>
          <div>{FormatQuantity(inventory.material)}</div>
        </StatStyle>
        <StatStyle>
          <div>
            <h3>Food production</h3>
            <p>The rate at which the island produces food.</p>
          </div>
          <div>{inventory.foodProduction}/s</div>
        </StatStyle>
        <StatStyle>
          <div>
            <h3>Food</h3>
            <p>
              Food is used to feed citizens. Every hour, 10% of the food stock
              goes abd and is thrown away. It currently has no impact in the
              game.
            </p>
          </div>
          <div>{FormatQuantity(inventory.food)}</div>
        </StatStyle>
        <StatStyle>
          <div>
            <h3>Frozen food production</h3>
            <p>The rate at which the island freezes food.</p>
          </div>
          <div>{inventory.frozenFoodProduction}/s</div>
        </StatStyle>
        <StatStyle>
          <div>
            <h3>Food</h3>
            <p>
              Frozen food is food that does not rot, but requires a warehouse
              and energy to remain frozen. It currently has no impact in the
              game.
            </p>
          </div>
          <div>{FormatQuantity(inventory.frozenFood)}</div>
        </StatStyle>
        <StatStyle>
          <div>
            <h3>Frozen food storage</h3>
            <p>
              The maximum amount of frozen food that can be stored in the
              warehouses.
            </p>
          </div>
          <div>{FormatQuantity(inventory.frozenFoodStorage)}</div>
        </StatStyle>
      </Style>
      <h2>Infrastructure</h2>
      <Style>
        <StatStyle>
          <div>
            <h3>Banking</h3>
            <p>
              More banking infrastructure gives the island more powerful tools
              to trade with the rest of the archipelago.
            </p>
          </div>
          <div>{inventory.bankLevels}</div>
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
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr 120px;
  gap: 10px;

  div:nth-child(1) {
    p {
      font-size: 16px;
      font-style: italic;
    }
  }

  div:nth-child(2) {
    font-size: 20px;
    text-align: right;
  }
`;

export default ResourcesPage;
