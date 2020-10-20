import React, { Fragment, useContext } from 'react';

import { InventoryContext } from '../../libs/session/inventory';

import { FormatQuantity } from '../../ui/text/format';

import styles from './Resources.scss';

const ResourcesPage = () => {
  const inventory = useContext(InventoryContext);

  return (
    <Fragment>
      <h1>Inventory</h1>
      <h2>Resources</h2>
      <div className={styles.board}>
        <div className={styles.stat}>
          <div>
            <h3>Population</h3>
            <p>Citizens live in houses or apartments and work on the island.</p>
          </div>
          <div>
            {inventory.populationUsed}/{inventory.populationTotal}
          </div>
        </div>
        <div className={styles.stat}>
          <div>
            <h3>Builders</h3>
            <p>
              Builders are citizens without a job and spend their time building
              new tiles. Having more of them means that new tiles get built more
              quickly.
            </p>
          </div>
          <div>{inventory.populationFree}</div>
        </div>
        <div className={styles.stat}>
          <div>
            <h3>Energy</h3>
            <p>Energy is produced and consumed by tiles on the island.</p>
          </div>
          <div>
            {inventory.energyUsed}/{inventory.energyTotal}
          </div>
        </div>
        <div className={styles.stat}>
          <div>
            <h3>Material production</h3>
            <p>
              The rate at which the island produces and accumulates resources.
            </p>
          </div>
          <div>{inventory.materialProduction}/s</div>
        </div>
        <div className={styles.stat}>
          <div>
            <h3>Material</h3>
            <p>
              Material is used to build new infrastructure on empty tiles or
              upgrade current infrastructure.
            </p>
          </div>
          <div>{FormatQuantity(inventory.material)}</div>
        </div>
      </div>
      <h2>Infrastructure</h2>
      <div className={styles.board}>
        <div className={styles.stat}>
          <div>
            <h3>Banking</h3>
            <p>
              More banking infrastructure gives the island more powerful tools
              to trade with the rest of the archipelago.
            </p>
          </div>
          <div>{inventory.bankLevels}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default ResourcesPage;
