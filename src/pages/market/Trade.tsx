import React, { Fragment, useContext, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import { useQuery, useMutation, gql, useApolloClient } from '@apollo/client';
import { SendOrder, SendOrderVariables } from '../../generated/SendOrder';
import {
  GetMyOpenOrders,
  GetMyOpenOrdersVariables,
} from '../../generated/GetMyOpenOrders';
import { NewOrder } from 'generated/NewOrder';
import { CommodityType, OrderSide } from '../../generated/globalTypes';

import { DateTime, Duration } from 'luxon';

import { SessionContext } from '../../libs/session/session';
import { InventoryContext } from '../../libs/session/inventory';
import { BankAccountsContext } from '../../libs/session/bank_accounts';

import { Error, Info, Success } from '../../ui/dialog/Msg';
import TimeLeft from '../../ui/text/TimeLeft';
import { Form } from '../../ui/form/Form';
import { Input, Submit, Select, Radio } from '../../ui/form/Input';
import { Button } from '../../ui/form/Button';
import { FormatNumber, ShortenNumber } from '../../ui/text/format';

const TradePage = () => {
  const [orderSent, setOrderSent] = useState(false);
  const [sendingError, setSendingError] = useState(false);

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
            quantity
            price
          }
        }
      }
    `,
    {
      update: (cache, { data }) => {
        let newOrder: NewOrder;
        if (data?.sendOrder?.__typename === 'Order') {
          newOrder = data.sendOrder;
        } else {
          return;
        }

        cache.modify({
          fields: {
            myOpenOrders(existingOrders = []) {
              const newOrderRefs = cache.writeFragment<NewOrder>({
                data: newOrder,
                fragment: gql`
                  fragment NewOrder on Order {
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
                    quantity
                    price
                  }
                `,
              });

              return { orders: [...existingOrders.orders, newOrderRefs] };
            },
          },
        });
      },
      refetchQueries: ['GetBankAccounts', 'GetCurrentInventory'],
    },
  );

  const defaultValues = {
    orderType: 'sell',
    currencyId: 'ark',
    commodityType: CommodityType.MATERIAL,
    duration: 'PT1H',
    quantity: undefined,
    price: undefined,
  };

  const { register, handleSubmit, watch, reset } = useForm<sendOrderParams>({
    defaultValues,
  });

  let orderParams = watch();

  if (!orderParams.orderType) {
    orderParams = defaultValues;
  }

  let submitText = 'Sell';
  if (orderParams.orderType === 'buy') {
    submitText = 'Buy';
  }

  orderParams.price = orderParams.price || 0;

  const isBuy = orderParams.orderType === 'buy';
  const isSell = orderParams.orderType === 'sell';

  let currencyCode = orderParams.currencyId.toUpperCase();

  const price = Number(orderParams.price);
  let totalQuantity = orderParams.quantity || 0;
  const totalAmount = totalQuantity * price;

  // Check quantity
  let quantityAboveZero =
    orderParams.quantity !== undefined && totalQuantity > 0;

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
  let commodityAvailable = 0;
  let notEnoughErrorMsg = '';
  switch (orderParams.commodityType) {
    case CommodityType.FROZEN_FOOD:
      commodityAvailable = inventory.frozenFood;
      notEnoughErrorMsg = "You don't have enough frozen food to sell.";
      totalQuantity = totalQuantity;
      break;

    case CommodityType.MATERIAL:
      commodityAvailable = inventory.material;
      notEnoughErrorMsg = "You don't have enough material to sell.";
      totalQuantity = totalQuantity;
      break;

    default:
      break;
  }

  let notEnoughCommodity = false;
  if (isSell && commodityAvailable < totalQuantity) {
    notEnoughCommodity = true;
  }

  let canSend =
    !orderSent && quantityAboveZero && !notEnoughMoney && !notEnoughCommodity;
  let formDisabled = orderSent || sendingError;

  return (
    <Fragment>
      <h1>Trade</h1>
      <h2>Send order</h2>
      <StyledForm
        onSubmit={handleSubmit((params) => {
          let side = OrderSide.SELL;
          if (params.orderType === 'buy') {
            side = OrderSide.BUY;
          }

          const variables: SendOrderVariables = {
            input: {
              userId: session.id,
              expiresAt: DateTime.utc().plus(Duration.fromISO(params.duration)),
              side,
              currencyId: params.currencyId,
              commodity: params.commodityType,
              quantity: params.quantity || 0,
              price: params.price || 0,
            },
          };

          sendOrder({ variables })
            .then(() => {
              setSendingError(false);
              setOrderSent(true);
            })
            .catch(() => {
              setSendingError(true);
              setOrderSent(false);
            });
        })}
      >
        <div
          style={{
            gridArea: 'sell-buy',
            display: 'grid',
            gridAutoFlow: 'column',
          }}
        >
          {/* Buy or sell */}
          <div>
            <Radio
              label="Sell"
              {...register('orderType')}
              value="sell"
              disabled={formDisabled}
            />
          </div>

          <div>
            <Radio
              label="Buy"
              {...register('orderType')}
              value="buy"
              disabled={formDisabled}
            />
          </div>
        </div>

        <div style={{ gridArea: 'commodity-amount' }}>
          {/* Commodity */}
          <Input
            {...register('quantity')}
            type="number"
            id="quantity"
            placeholder="Quantity"
            min={1}
            disabled={formDisabled}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ gridArea: 'commodity-type' }}>
          <Select
            {...register('commodityType')}
            disabled={formDisabled}
            style={{ width: '100%' }}
          >
            <option value={CommodityType.FROZEN_FOOD}>Fozen food</option>
            <option value={CommodityType.MATERIAL}>Material</option>
          </Select>
        </div>

        <div style={{ gridArea: 'price-amount' }}>
          {/* Currency */}
          <Input
            {...register('price')}
            type="number"
            id="price"
            placeholder="Price"
            defaultValue={0}
            min={0}
            step="any"
            disabled={formDisabled}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ gridArea: 'price-currency' }}>
          <Select
            {...register('currencyId')}
            id="currency"
            disabled={true}
            style={{ width: '100%' }}
          >
            <option value="ark">Arki Dollar (ARK)</option>
          </Select>
        </div>

        <div
          style={{
            gridArea: 'expires-in',
            display: 'grid',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <p>Expires in</p>
        </div>

        <div style={{ gridArea: 'order-duration' }}>
          <Select
            {...register('duration')}
            id="duration"
            disabled={formDisabled}
            style={{ width: '100%' }}
          >
            <option value="PT1M">1 minute</option>
            <option value="PT5M">5 minutes</option>
            <option value="PT30M">30 minutes</option>
            <option value="PT1H">1 hour</option>
            <option value="PT12H">12 hours</option>
            <option value="PT24H">24 hours</option>
            <option value="PT48H">48 hours</option>
          </Select>
        </div>

        <StyledPriceSummary style={{ gridArea: 'price-summary' }}>
          <div>
            <span>{ShortenNumber(totalQuantity)}</span>
          </div>
          <div>
            <span>@</span>
          </div>
          <div>
            <span>{FormatNumber(price)}</span>
          </div>
          <div>
            <span>=</span>
          </div>
          <div>
            <span>{ShortenNumber(totalAmount)}</span>
          </div>
          <div>
            <span>material</span>
          </div>
          <div></div>
          <div>
            <span>/unit</span>
          </div>
          <div></div>
          <div>
            <span>{currencyCode}</span>
          </div>
        </StyledPriceSummary>

        <div style={{ gridArea: 'submit' }}>
          {!formDisabled && <Submit value={submitText} disabled={!canSend} />}

          {formDisabled && (
            <Button
              onClick={() => {
                setOrderSent(false);
                setSendingError(false);
                reset(
                  { currencyId: 'ark', orderType: orderParams.orderType },
                  { keepDefaultValues: true },
                );
              }}
            >
              Restart
            </Button>
          )}
        </div>

        <div
          style={{
            gridArea: 'errors',
            display: 'grid',
            alignItems: 'center',
          }}
        >
          <Success visible={orderSent}>Order successfully sent!</Success>

          <Error visible={sendingError}>
            Sorry, an unexpected error occurred.
          </Error>

          <Error visible={!quantityAboveZero && !orderSent}>
            Quantity must be above 0.
          </Error>

          <Error visible={notEnoughMoney && !orderSent}>
            You don't have enough money to buy.
          </Error>

          <Error visible={notEnoughCommodity && !orderSent}>
            {notEnoughErrorMsg}
          </Error>

          <Info visible={canSend && !orderSent}>
            The order is ready to be sent.
          </Info>
        </div>
      </StyledForm>
      <h2>Open offers</h2>
      <OpenOffers />
    </Fragment>
  );
};

interface sendOrderParams {
  orderType: string;
  currencyId: string;
  commodityType: CommodityType;
  duration: string;
  quantity?: number;
  price?: number;
}

const StyledForm = styled(Form)`
  grid-template-areas:
    'sell-buy         _'
    'commodity-amount commodity-type'
    'price-amount     price-currency'
    'expires-in       order-duration'
    'price            price'
    'price-summary    price-summary'
    'submit           submit'
    'errors           errors';
  grid-template-columns: 1fr 1fr;

  @media all and (max-width: 499px) {
    grid-template-areas:
      'sell-buy         sell-buy'
      'commodity-amount commodity-type'
      'price-amount     price-currency'
      'expires-in       order-duration'
      'price-summary    price-summary'
      'submit           submit'
      'errors           errors';
    grid-template-columns: 1fr 1fr;
  }
`;

const StyledPriceSummary = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  grid-template-rows: auto auto;
  gap: 4px 10px;
  font-size: 18px;

  div {
    text-align: center;
  }

  div:nth-child(6) {
    font-size: 16px;
    color: #666;
  }

  div:nth-child(8) {
    font-size: 16px;
    color: #666;
  }

  div:nth-child(10) {
    font-size: 16px;
    color: #666;
  }
`;

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
      {offers.length === 0 && <Info>You have currently no open offers.</Info>}
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
                  <td>{ShortenNumber(offer.quantity)}</td>
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
  commodity: CommodityType = CommodityType.MATERIAL;
  quantity: number = 0;
  price: number = 0;
}

const commodityToString = (
  commodity: CommodityType,
  currencyCode?: string,
): string => {
  switch (commodity) {
    case CommodityType.FROZEN_FOOD:
      return 'Frozen food';
    case CommodityType.MATERIAL:
      return 'Material';
    case CommodityType.CURRENCY:
      return currencyCode || '¤';
    default:
      return '';
  }
};

export default TradePage;
