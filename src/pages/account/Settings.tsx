import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, FormContext } from 'react-hook-form';

import { useMutation, gql, useApolloClient } from '@apollo/client';

import { SessionContext } from '../../libs/session/session';

import UsernameInput from '../../components/usernameInput';
import PasswordInput from '../../components/passwordInput';

const Settings = () => {
  // Router
  let history = useHistory();

  // Session
  const session = useContext(SessionContext);

  useEffect(() => {
    if (!session.loggedIn) {
      history.push('/');
    }
  });

  return (
    <Fragment>
      <h1>Settings</h1>
      <h2>Username</h2>
      <ChangeUsernameForm />
      <h2>Email address</h2>
      <p>
        Your email address will always be private and only used for necessary
        communication like password resets.
      </p>
      <ChangeEmailAddress />
      <p>
        There is currently no verification. Make sure the address is correct.
        The owner of the address is considered the owner of this account.
      </p>
      <p>
        It is impossible to recover a lost password without an email address.
      </p>
      <h2>Password</h2>
      <ChangePassword />
      <h2>Delete account</h2>
      <p>
        To delete your account, simply stop logging in. Accounts hold no
        personal information except for the email address (which is never public
        and can be deleted) and are deleted after 30 days of inactivity.
      </p>
    </Fragment>
  );
};

const ChangeUsernameForm = () => {
  const [updateSucceeded, setUpdateSuccess] = useState(false);
  const [updateFailed, setUpdateFailure] = useState(false);
  const [networkFailed, setNetworkailure] = useState(false);

  const client = useApolloClient();
  const session = useContext(SessionContext);

  const formFunctions = useForm<{
    username: string;
  }>({
    mode: 'onChange',
    validateCriteriaMode: 'all',
    defaultValues: { username: session.username },
  });
  const { handleSubmit, formState, watch } = formFunctions;

  let username = watch('username');

  let different = username !== session.username;

  return (
    <Fragment>
      <FormContext {...formFunctions}>
        <form
          onSubmit={handleSubmit(async ({ username }) => {
            setUpdateSuccess(false);
            setUpdateFailure(false);
            setNetworkailure(false);

            try {
              let response = await client.mutate({
                mutation: gql`
                  mutation setUsername($userID: String!, $username: String!) {
                    setUsername(userID: $userID, new: $username) {
                      __typename
                    }
                  }
                `,
                variables: { userID: session.id, username },
              });

              console.log('response', response);

              if (response?.data?.setUsername?.__typename === 'Result') {
                session.update({ username });
                setUpdateSuccess(true);
              }
            } catch {
              setNetworkailure(true);
            }
          })}
        >
          <UsernameInput current={session.username} />
          <p>
            <input
              type="submit"
              value="Update"
              disabled={!formState.isValid || !different}
            />
          </p>
        </form>
      </FormContext>
      {updateSucceeded && (
        <p className="msg-success">
          Your username has been updated.{' '}
          <a onClick={() => setUpdateSuccess(false)}>OK</a>
        </p>
      )}
      {updateFailed && (
        <p className="msg-error">Something went wrong, please try again.</p>
      )}
      {networkFailed && (
        <p className="msg-error">Request failed, please try again later.</p>
      )}
    </Fragment>
  );
};

const ChangeEmailAddress = () => {
  const [updateSucceeded, setUpdateSuccess] = useState(false);
  const [updateFailed, setUpdateFailure] = useState(false);
  const [networkFailed, setNetworkailure] = useState(false);

  const client = useApolloClient();
  const session = useContext(SessionContext);

  const formFunctions = useForm<{
    email_address: string;
  }>({
    mode: 'onChange',
    validateCriteriaMode: 'all',
    defaultValues: { email_address: '' },
  });
  const { handleSubmit, formState, register, watch } = formFunctions;

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit(async ({ email_address: emailAddress }) => {
          setUpdateSuccess(false);
          setUpdateFailure(false);
          setNetworkailure(false);

          try {
            let response = await client.mutate({
              mutation: gql`
                mutation setEmailAddress(
                  $userID: String!
                  $emailAddress: String!
                ) {
                  setUsername(userID: $userID, new: $emailAddress) {
                    __typename
                  }
                }
              `,
              variables: { userID: session.id, emailAddress },
            });

            console.log('response', response);

            if (response?.data?.setUsername?.__typename === 'Result') {
              setUpdateSuccess(true);
            }
          } catch {
            setNetworkailure(true);
          }
        })}
      >
        <p>
          <input
            type="email"
            placeholder="Email address"
            name="email_address"
            ref={register({
              required: true,
            })}
          />
        </p>
        <p>
          <input type="submit" value="Update" disabled={true} />{' '}
          <input type="submit" value="Delete" disabled={true} />
        </p>
      </form>
      {updateSucceeded && (
        <p className="msg-success">
          Your email address has been updated.{' '}
          <a onClick={() => setUpdateSuccess(false)}>OK</a>
        </p>
      )}
      {updateFailed && (
        <p className="msg-error">Something went wrong, please try again.</p>
      )}
      {networkFailed && (
        <p className="msg-error">Request failed, please try again later.</p>
      )}
    </Fragment>
  );
};

const ChangePassword = () => {
  const { register, handleSubmit } = useForm();

  const setEmailAddress = (formData: any) => {
    console.log('update username:', formData);
  };

  return (
    <form onSubmit={handleSubmit(setEmailAddress)}>
      {/* <PasswordInput /> */}
      <p>
        <input type="submit" value="Update" disabled={true} />
      </p>
    </form>
  );
};

export default Settings;
