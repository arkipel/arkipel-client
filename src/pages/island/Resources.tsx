import React, { Fragment, useContext } from 'react';

import { useQuery, gql } from '@apollo/client';
import { GetInventory, GetInventoryVariables } from 'generated/GetInventory';

import { SessionContext } from '../../libs/session/session';

import Inventory from '../../models/Inventory';

import { Error } from '../../ui/dialog/Msg';

import styles from './Resources.scss';

const ResourcesPage = () => {
  const session = useContext(SessionContext);

  let islandId = session.id;

  const { data, loading, error } = useQuery<
    GetInventory,
    GetInventoryVariables
  >(
    gql`
      query GetInventory($userId: String!, $islandId: String!) {
        inventory(userId: $userId, islandId: $islandId) {
          __typename
          ... on Inventory {
            id
            population
            workforce
            material
            materialProduction
            energyUsed
            energy
          }
        }
      }
    `,
    { variables: { userId: session.id, islandId } },
  );

  if (data?.inventory.__typename === 'NotFound') {
    return <Error>Sorry, this island does not exist.</Error>;
  }

  if (error || data?.inventory.__typename === 'NotAuthorized') {
    return <Error>Sorry, an error occurred.</Error>;
  }

  let inventory = new Inventory({});
  if (data?.inventory.__typename === 'Inventory') {
    inventory = new Inventory(data.inventory);
  }

  return (
    <Fragment>
      <h1>Inventory</h1>
      {loading && <p>Loading...</p>}
      {!loading && (
        <ul className={styles.list}>
          <li>
            <b>Workers:</b> {inventory.workforce}
          </li>
          <li>
            <b>Population:</b> {inventory.population}
          </li>
          <li>
            <b>Material:</b> {inventory.material}
          </li>
          <li>
            <b>Material production:</b> {inventory.materialProduction}/s
          </li>
          <li>
            <b>Energy:</b> {inventory.energyUsed}/{inventory.energy}
          </li>
        </ul>
      )}
    </Fragment>
  );
};

export default ResourcesPage;
