import React, { Fragment, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { useQuery, gql } from '@apollo/client';
import { GetInventory, GetInventoryVariables } from 'generated/GetInventory';

import { SessionContext } from '../../libs/session/session';

import Inventory from '../../models/Inventory';

import { Error, Info } from '../../ui/dialog/Msg';

import styles from './Trade.scss';

const TradePage = () => {
  // const [orderType, setOrderType] = useState(true);

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

  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: { order_type: 'buy' },
  });

  const orderParams = watch([
    'order_type',
    'number_chunks',
    'chunk_size',
    'chunk_price',
    'quantity',
    'price',
  ]);
  console.log('orderParams:', orderParams);

  return (
    <Fragment>
      <h1>Trade</h1>
      <h2>Send order</h2>
      <form className={styles.searchForm} onSubmit={handleSubmit(() => {})}>
        <div>
          <input
            ref={register}
            type="radio"
            name="order_type"
            value="sell"
            id="sell"
          />
          <label htmlFor="sell">Sell</label>
          <input
            ref={register}
            type="radio"
            name="order_type"
            value="buy"
            id="buy"
          />
          <label htmlFor="buy">Buy</label>

          <br />

          {orderParams.order_type === 'sell' && (
            <Fragment>
              <input
                ref={register}
                type="number"
                name="number_chunks"
                id="number_chunks"
                placeholder="Number of chunks"
              />

              <input
                ref={register}
                type="number"
                name="chunk_size"
                id="chunk_size"
                placeholder="Chunk size"
              />

              <input
                ref={register}
                type="number"
                name="chunk_price"
                id="chunk_price"
                placeholder="Chunk price"
              />
            </Fragment>
          )}

          {orderParams.order_type === 'buy' && (
            <Fragment>
              <input
                ref={register}
                type="number"
                name="quantity"
                id="quantity"
                placeholder="Quantity"
              />

              <input
                ref={register}
                type="number"
                name="price"
                id="price"
                placeholder="Price"
              />
            </Fragment>
          )}

          <br />

          {orderParams.order_type === 'sell' && (
            <input type="submit" value={'Sell'} />
          )}
          {orderParams.order_type === 'buy' && (
            <input type="submit" value={'Buy'} />
          )}
        </div>
      </form>
      {/* <h2>Search</h2>
      <form className={styles.searchForm}>
        <div>
          <select name="resource_type" id="resource_type" value="none">
            <option value="none">Resource</option>
            <option value="material">Material</option>
          </select>
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
      </form> */}
      <h2>List</h2>
      <Info>No offers found.</Info>
    </Fragment>
  );
};

export default TradePage;
