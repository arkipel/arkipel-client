import React, { Fragment, useContext } from 'react';

import { InventoryContext } from '../../libs/session/inventory';

import { FormatQuantity } from '../../ui/text/format';

import styles from './Resources.scss';

const ResourcesPage = () => {
  const inventory = useContext(InventoryContext);

  return (
    <Fragment>
      <h1>Inventory</h1>
      <ul className={styles.list}>
        <li>
          <b>Population:</b> {inventory.population}
        </li>
        <li>
          <b>Assigned workers:</b> {inventory.assignedWorkers}/
          {inventory.workforce}
        </li>
        <li>
          <b>Free workers:</b>{' '}
          {inventory.population - inventory.assignedWorkers}
        </li>
        <li>
          <b>Population:</b> {inventory.population}
        </li>
        <li>
          <b>Material:</b> {FormatQuantity(inventory.material)}
        </li>
        <li>
          <b>Material production:</b> {inventory.materialProduction}/s
        </li>
        <li>
          <b>Energy production:</b> {inventory.energy}
        </li>
        <li>
          <b>Assigned energy:</b> {inventory.assignedEnergy}/
          {inventory.energyUsed}
        </li>
        <li>
          <b>Free energy:</b> {inventory.energy - inventory.assignedEnergy}
        </li>
      </ul>
      <p>The data above is refreshed every 10 seconds.</p>
    </Fragment>
  );
};

export default ResourcesPage;
