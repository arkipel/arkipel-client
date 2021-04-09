import React, {
  Fragment,
  useContext,
  useState,
  FunctionComponent,
} from 'react';
import { useForm } from 'react-hook-form';

import { useQuery, useMutation, gql, useApolloClient } from '@apollo/client';
import { SendOrder, SendOrderVariables } from '../../generated/SendOrder';
import {
  GetBestOffers,
  GetBestOffersVariables,
} from '../../generated/GetBestOffers';
import {
  GetMyOpenOrders,
  GetMyOpenOrdersVariables,
} from '../../generated/GetMyOpenOrders';
import { CommodityType, OrderSide } from '../../generated/globalTypes';

import { DateTime, Duration } from 'luxon';

import { SessionContext } from '../../libs/session/session';
import { InventoryContext } from '../../libs/session/inventory';
import { BankAccountsContext } from '../../libs/session/bank_accounts';

import { Error, Info, Success } from '../../ui/dialog/Msg';
import TimeLeft from '../../ui/text/TimeLeft';

import styles from './Trade.scss';

const TradePage = () => {
  const [orderSent, setOrderSent] = useState(false);

  const session = useContext(SessionContext);
  const inventory = useContext(InventoryContext);
  const bankAccounts = useContext(BankAccountsContext);

  // Send order mutation
  const [sendOrder] = useMutation<SendOrder, SendOrderVariables>(
    gql`
      mutation SendOrder($input: SendOrderInput!) {
        sendOrder(input: $input) {
          __typename
          ... on Order {
            id
            createdAt
            expiresAt
            side
            currency {
              id
              code
              name
            }
            commodity
            commodityCurrency {
              id
              code
              name
            }
            quantity
            price
          }
        }
      }
    `,
    {},
  );

  const { register, handleSubmit, watch, reset } = useForm<sendOrderParams>({
    defaultValues: {
      orderType: 'sell',
      currencyId: 'ark',
      quantity: 0,
      price: 0,
    },
  });

  const orderParams = watch();

  let submitText = 'Sell';
  if (orderParams.orderType === 'buy') {
    submitText = 'Buy';
  }

  const isBuy = orderParams.orderType === 'buy';
  const isSell = orderParams.orderType === 'sell';

  let currencyCode = orderParams.currencyId.toUpperCase();

  const totalAmount = orderParams.quantity * orderParams.price;
  const totalQuantity = orderParams.quantity * 1_000_000;

  // Check quantity
  let quantityAboveZero = orderParams.quantity > 0;

  // Check liquidity
  let liquidity = 0;
  for (const bankAccount of bankAccounts) {
    if (bankAccount.currencyId === orderParams.currencyId) {
      liquidity = bankAccount.amount;
      break;
    }
  }

  let notEnoughMoney = false;
  if (isBuy && liquidity < totalAmount) {
    notEnoughMoney = true;
  }

  // Check commodity stock
  let commodityAvailable = inventory.material;
  let notEnoughCommodity = false;
  if (isSell && commodityAvailable < totalQuantity) {
    notEnoughCommodity = true;
  }

  let canSend =
    !orderSent && quantityAboveZero && !notEnoughMoney && !notEnoughCommodity;

  return (
    <Fragment>
      <h1>Trade</h1>
      <h2>Send order</h2>
      <form
        className={styles.searchForm}
        onSubmit={handleSubmit((params) => {
          setOrderSent(true);

          let side = OrderSide.SELL;
          if (params.orderType === 'buy') {
            side = OrderSide.BUY;
          }

          const variables: SendOrderVariables = {
            input: {
              userId: session.id,
              // 30 minutes
              expiresAt: DateTime.utc().plus(Duration.fromMillis(1800 * 1000)),
              side,
              currencyId: params.currencyId,
              commodity: CommodityType.MATERIAL_1M,
              quantity: params.quantity,
              price: params.price,
            },
          };

          sendOrder({ variables });
        })}
      >
        <div>
          {/* Buy or sell */}
          <input
            ref={register}
            type="radio"
            name="orderType"
            value="sell"
            id="sell"
            disabled={orderSent}
          />
          <label htmlFor="sell">Sell</label>
          <input
            ref={register}
            type="radio"
            name="orderType"
            value="buy"
            id="buy"
            disabled={orderSent}
          />
          <label htmlFor="buy">Buy</label>
          <br />

          {/* Commodity */}
          <select name="commodity" id="commodity" disabled={orderSent}>
            <option value="material_1m">Material (1M)</option>
          </select>

          {/* Currency */}
          <select
            ref={register}
            name="currencyId"
            id="currency"
            disabled={orderSent}
          >
            <option value="ark">Arki Dollar (ARK)</option>
            <option value="rck">Rock (RCK)</option>
          </select>
          <br />

          <Fragment>
            <input
              ref={register}
              type="number"
              name="quantity"
              id="quantity"
              placeholder="Quantity"
              min={0}
              disabled={orderSent}
            />

            <input
              ref={register}
              type="number"
              name="price"
              id="price"
              placeholder="Price"
              min={0}
              disabled={orderSent}
            />
          </Fragment>

          <p>
            {submitText} {orderParams.quantity}M of material for{' '}
            {orderParams.quantity * orderParams.price} {currencyCode} (
            {liquidity} {currencyCode} available).
          </p>

          <Error visible={!quantityAboveZero}>Quantity must be above 0.</Error>

          <Error visible={notEnoughMoney}>
            You don't have enough money to buy.
          </Error>

          <Error visible={notEnoughCommodity}>
            You don't have enough material to sell.
          </Error>

          <br />

          <input type="submit" value={submitText} disabled={!canSend} />
          {orderSent && (
            <input
              type="button"
              value={'Restart'}
              onClick={() => {
                setOrderSent(false);
                reset();
              }}
            />
          )}

          <Success visible={orderSent}>Order successfully sent!</Success>
        </div>
      </form>
      <h2>Best offers</h2>
      <BestOffers
        side={orderParams.orderType === 'sell' ? OrderSide.SELL : OrderSide.BUY}
        currencyId={orderParams.currencyId}
        commodity={CommodityType.MATERIAL_1M}
      />
      <h2>Open offers</h2>
      <OpenOffers />
    </Fragment>
  );
};

interface sendOrderParams {
  orderType: string;
  currencyId: string;
  quantity: number;
  price: number;
}

const BestOffers: FunctionComponent<bestOffersProps> = (props) => {
  const client = useApolloClient();

  const input = {
    side: props.side,
    currencyId: props.currencyId,
    commodity: props.commodity,
  };

  const { data, loading, error } = useQuery<
    GetBestOffers,
    GetBestOffersVariables
  >(
    gql`
      query GetBestOffers($input: OrdersInput!) {
        orders(input: $input) {
          __typename
          ... on OrderList {
            orders {
              id
              side
              expiresAt
              currency {
                id
                code
              }
              commodity
              quantity
              price
            }
          }
        }
      }
    `,
    { variables: { input }, pollInterval: 10000 },
  );

  let offers = new Array<offer>();

  if (data?.orders.__typename === 'OrderList') {
    for (const o of data.orders.orders) {
      offers.push({
        id: o.id,
        side: o.side,
        expiresAt: DateTime.fromISO(o.expiresAt),
        currencyCode: o.currency.code,
        commodity: o.commodity,
        quantity: o.quantity,
        price: o.price,
      });
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || data?.orders.__typename !== 'OrderList') {
    return <Error>Sorry, an error occurred.</Error>;
  }

  return (
    <Fragment>
      <p>
        The following are the best offers that correspond to the commodity
        selected above.
      </p>
      {offers.length === 0 && <Info>No offers found.</Info>}
      {offers.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Side</th>
              <th>Qty</th>
              <th>Commodity</th>
              <th>Price</th>
              <th>Time left</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => {
              return (
                <tr key={offer.id}>
                  <td>{offer.side}</td>
                  <td>{offer.quantity}</td>
                  <td>{commodityToString(offer.commodity)}</td>
                  <td>{offer.price}</td>
                  <td>
                    <TimeLeft
                      target={offer.expiresAt}
                      onReach={() => {
                        client.cache.evict({
                          id: 'Offer:' + offer.id,
                        });
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </Fragment>
  );
};

interface bestOffersProps {
  side: OrderSide;
  currencyId: string;
  commodity: CommodityType;
}

const OpenOffers = () => {
  const session = useContext(SessionContext);
  const client = useApolloClient();

  const { data, loading, error } = useQuery<
    GetMyOpenOrders,
    GetMyOpenOrdersVariables
  >(
    gql`
      query GetMyOpenOrders($userId: String!) {
        myOpenOrders(userId: $userId) {
          __typename
          ... on OrderList {
            orders {
              id
              side
              expiresAt
              currency {
                id
                code
              }
              commodity
              quantity
              price
            }
          }
        }
      }
    `,
    { variables: { userId: session.id }, pollInterval: 10000 },
  );

  let offers = new Array<offer>();

  if (data?.myOpenOrders.__typename === 'OrderList') {
    for (const o of data.myOpenOrders.orders) {
      offers.push({
        id: o.id,
        side: o.side,
        expiresAt: DateTime.fromISO(o.expiresAt),
        currencyCode: o.currency.code,
        commodity: o.commodity,
        quantity: o.quantity,
        price: o.price,
      });
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || data?.myOpenOrders.__typename !== 'OrderList') {
    return <Error>Sorry, an error occurred.</Error>;
  }

  return (
    <Fragment>
      {offers.length === 0 && <Info>You have currently open offers.</Info>}
      {offers.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Side</th>
              <th>Qty</th>
              <th>Commodity</th>
              <th>Price</th>
              <th>Time left</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => {
              return (
                <tr key={offer.id}>
                  <td>{offer.side}</td>
                  <td>{offer.quantity}</td>
                  <td>{commodityToString(offer.commodity)}</td>
                  <td>{offer.price}</td>
                  <td>
                    <TimeLeft
                      target={offer.expiresAt}
                      onReach={() => {
                        client.cache.evict({
                          id: 'Offer:' + offer.id,
                        });
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </Fragment>
  );
};

class offer {
  id: string = '';
  side: OrderSide = OrderSide.SELL;
  expiresAt: DateTime = DateTime.now();
  currencyCode: string = '';
  commodity: CommodityType = CommodityType.MATERIAL_1M;
  quantity: number = 0;
  price: number = 0;
}

const commodityToString = (
  commodity: CommodityType,
  currencyCode?: string,
): string => {
  switch (commodity) {
    case CommodityType.MATERIAL_1M:
      return 'Material (1M)';
    case CommodityType.CURRENCY:
      return currencyCode || '¤';
    default:
      return '';
  }
};

export default TradePage;
