import React, { Fragment, useContext } from 'react';

import { useQuery, gql } from '@apollo/client';
import { GetInventory, GetInventoryVariables } from 'generated/GetInventory';

import { SessionContext } from '../../libs/session/session';

import Inventory from '../../models/Inventory';

import { Error, Info } from '../../ui/dialog/Msg';

import styles from './Trade.scss';

const TradePage = () => {
  // const session = useContext(SessionContext);

  // let islandId = session.id;

  // const { data, loading, error } = useQuery<
  //   GetInventory,
  //   GetInventoryVariables
  // >(
  //   gql`
  //     query GetInventory($userId: String!, $islandId: String!) {
  //       inventory(userId: $userId, islandId: $islandId) {
  //         ... on Inventory {
  //           __typename
  //           ... on Inventory {
  //             population
  //             workforce
  //             material
  //             materialProduction
  //             energyUsed
  //             energy
  //           }
  //         }
  //       }
  //     }
  //   `,
  //   { variables: { userId: session.id, islandId } },
  // );

  // if (data?.inventory.__typename === 'NotFound') {
  //   return <Error>Sorry, this island does not exist.</Error>;
  // }

  // if (error || data?.inventory.__typename === 'NotAuthorized') {
  //   return <Error>Sorry, an error occurred.</Error>;
  // }

  // let inventory = new Inventory({});
  // if (data?.inventory.__typename === 'Inventory') {
  //   inventory = new Inventory(data.inventory);
  // }

  return (
    <Fragment>
      <h1>Trade</h1>
      <h2>Send order</h2>
      <form className={styles.searchForm}>
        <div>
          <input type="radio" name="mode" value="buy" />
          <label htmlFor="buy">Buy</label>
          <input type="radio" name="mode" value="sell" />
          <label htmlFor="sell">Sell</label>

          <input
            type="number"
            name="quantity"
            id="quantity"
            placeholder="Quantity"
          />

          <input type="number" name="price" id="price" placeholder="Price" />

          <input type="submit" value="Sell/Buy" />
        </div>
      </form>
      <h2>Search</h2>
      <form className={styles.searchForm}>
        <div>
          {/* <label htmlFor="resource_type">Resource</label> */}
          <select name="resource_type" id="resource_type" value="none">
            <option value="none">Resource</option>
            <option value="material">Material</option>
          </select>
          {/* <label htmlFor="currency">Currency</label> */}
          <select name="currency" id="currency" value="none">
            <option value="none" disabled={true}>
              Currency
            </option>
            <option value="ark">Arkicoin (ARK)</option>
            <option value="end">eNote (ENO)</option>
            <option value="ocn">Ocean Drop (OCN)</option>
            <option value="nid">New Islander Dollar (NID)</option>
            <option value="free">Freedom Coin (FREE)</option>
            <option value="bmt">Black Market Tip (BMT)</option>
          </select>
        </div>
      </form>
      <h2>List</h2>
      <Info>No offers found.</Info>
    </Fragment>
  );
};

export default TradePage;
