import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { useQuery, gql } from '@apollo/client';
import {
  GetCurrentMarketPrices,
  GetCurrentMarketPricesVariables,
} from 'generated/GetCurrentMarketPrices';

import { Select } from '../../ui/form/Input';

import { FormatMoney } from '../../ui/text/format';

const MarketPrices = () => {
  // Currency selection form
  const defaultSelection = {
    currencyId: 'ark',
  };

  const { register, watch } = useForm<{ currencyId: string }>({
    defaultValues: defaultSelection,
  });

  const currencyId = watch('currencyId');

  let { data, loading } = useQuery<
    GetCurrentMarketPrices,
    GetCurrentMarketPricesVariables
  >(
    gql`
      query GetCurrentMarketPrices($input: CurrentMarketPricesInput!) {
        currentMarketPrices(input: $input) {
          ... on CurrentMarketPrices {
            commodityPrices {
              commodity
              price
            }
            currencyPrices {
              currency {
                id
                code
                name
              }
              price
            }
          }
        }
      }
    `,
    { fetchPolicy: 'network-only', variables: { input: { currencyId } } },
  );

  return (
    <Fragment>
      <h1>Prices</h1>
      <Select {...register('currencyId')} id="currency">
        <option value="ark">Arki Dollar (ARK)</option>
        <option value="rck">Rock (RCK)</option>
      </Select>
      <h2>Commodities</h2>
      {loading && <p>Loading...</p>}
      {data && (
        <StyledList>
          {data.currentMarketPrices.__typename === 'CurrentMarketPrices' &&
            data.currentMarketPrices.commodityPrices.map((cp) => {
              return (
                <li key={cp.commodity}>
                  <b>{cp.commodity}:</b> {FormatMoney(cp.price)}{' '}
                  {currencyId.toUpperCase()}
                </li>
              );
            })}
        </StyledList>
      )}
      <h2>Currencies</h2>
      {loading && <p>Loading...</p>}
      {data && (
        <StyledList>
          {data.currentMarketPrices.__typename === 'CurrentMarketPrices' &&
            data.currentMarketPrices.currencyPrices.map((cp) => {
              return (
                <li key={cp.currency.id}>
                  <b>
                    {cp.currency.name} ({cp.currency.code.toUpperCase()}):
                  </b>{' '}
                  {FormatMoney(cp.price)} {currencyId.toUpperCase()}
                </li>
              );
            })}
        </StyledList>
      )}
    </Fragment>
  );
};

const StyledList = styled.ul`
  margin-left: 20px;
`;

export default MarketPrices;
