import React, { Fragment, useContext } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { useQuery, gql } from '@apollo/client';
import { GetBankLevels, GetBankLevelsVariables } from 'generated/GetBankLevels';

import { SessionContext } from '../../libs/session/session';

import { Error } from '../../ui/dialog/Msg';

// import styles from './Treasury.scss';

const TreasuryPage = () => {
  const session = useContext(SessionContext);

  let islandId = session.id;

  const { data, loading, error } = useQuery<
    GetBankLevels,
    GetBankLevelsVariables
  >(
    gql`
      query GetBankLevels($userId: String!, $islandId: String!) {
        inventory(userId: $userId, islandId: $islandId) {
          __typename
          ... on Inventory {
            id
            bankLevels
          }
        }
      }
    `,
    { variables: { userId: session.id, islandId } },
  );

  if (data?.inventory.__typename === 'NotFound') {
    return <Error>Sorry, this treasury does not exist.</Error>;
  }

  if (error || data?.inventory.__typename === 'NotAuthorized') {
    return <Error>Sorry, an error occurred.</Error>;
  }

  let bankLevels = 0;
  if (data?.inventory.__typename === 'Inventory') {
    bankLevels = data.inventory.bankLevels;
  }

  let canHaveAccounts = bankLevels >= 1;
  let canManageCurrencies = bankLevels >= 10;

  return (
    <Fragment>
      <h1>Treasury</h1>
      {loading && <p>Loading...</p>}
      <h2>Accounts</h2>
      {!canHaveAccounts && (
        <p>You need at least one bank to manage your treasury.</p>
      )}
      {canHaveAccounts && <p>You have no bank accounts.</p>}
      <h2>Currencies</h2>
      {!canManageCurrencies && (
        <p>
          All of your banks must have a cummulative number of levels of at least
          10 to manage currencies. You are currently at {bankLevels}.
        </p>
      )}
      {canManageCurrencies && <p>You have no currencies.</p>}
      <h2>Loans</h2>
      <p>You have no loans.</p>
      <h2>Take a loan</h2>
      <form>
        <p>
          <label htmlFor="currency">Currency:</label>
          <select name="currency" id="currency">
            <option value="ark">ARK</option>
            <option value="fdc">FDC</option>
            <option value="rck">RCK</option>
          </select>
        </p>
        <p>
          <input
            type="number"
            step={1}
            min={0}
            max={10000}
            placeholder={'Amount'}
          />
          @0.95%
        </p>
        <p>Maximum: 10,000&curren;</p>
        <p>
          <input type="submit" value={'Take loan'} />
        </p>
      </form>
    </Fragment>
  );
};

const BorrowMoney = () => {
  const [updateSucceeded, setUpdateSuccess] = useState(false);
  const [updateFailed, setUpdateFailure] = useState(false);
  const [networkFailed, setNetworkailure] = useState(false);

  const client = useApolloClient();
  const session = useContext(SessionContext);

  const formFunctions = useForm({
    mode: 'onChange',
    criteriaMode: 'all',
  });
  const { handleSubmit, register, formState, watch, errors } = formFunctions;

  const currentPassword = watch('current_password');

  let errorMsgs = Object.values(errors.current_password?.types || {}).join(
    ', ',
  );

  return (
    <FormProvider {...formFunctions}>
      <form onSubmit={() => {}}>
        <p>
          <label htmlFor="currency">Currency:</label>
          <select name="currency" id="currency">
            <option value="ark">ARK</option>
            <option value="fdc">FDC</option>
            <option value="rck">RCK</option>
          </select>
        </p>
        <p>
          <input
            type="number"
            step={1}
            min={0}
            max={10000}
            placeholder={'Amount'}
            ref={register({
              required: {
                value: true,
                message: 'required',
              },
            })}
          />
          @0.95%
        </p>
        <p>Maximum: 10,000&curren;</p>
        <p>
          <input type="submit" value={'Take loan'} />
        </p>
        <p>
          <input
            type="password"
            name="current_password"
            placeholder="Current password"
            ref={register({
              required: {
                value: true,
                message: 'required',
              },
            })}
          />
          {errorMsgs && (
            <Fragment>
              <br />
              <HintError>{errorMsgs}</HintError>
            </Fragment>
          )}
        </p>
        <p>
          <Submit
            text="Update"
            enabled={formState.isValid && currentPassword !== ''}
          />
        </p>
      </form>
      <Success
        visible={updateSucceeded}
        onConfirmation={() => setUpdateSuccess(false)}
      >
        Your password has been updated.
      </Success>
      <Error
        visible={updateFailed}
        onConfirmation={() => setUpdateFailure(false)}
      >
        Something went wrong, please try again.
      </Error>
      <Error
        visible={networkFailed}
        onConfirmation={() => setNetworkailure(false)}
      >
        Request could not be sent, please try again later.
      </Error>
    </FormProvider>
  );
};

export default TreasuryPage;
